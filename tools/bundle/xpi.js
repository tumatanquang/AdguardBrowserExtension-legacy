import path from 'path';
import { promises as fs } from 'fs';
import webExt from 'web-ext';
import {
    DIST_PATH,
    BUILD_PATH,
    ENVS,
    FIREFOX_CREDENTIALS,
    FIREFOX_UPDATE_TEMPLATE,
    FIREFOX_WEBEXT_UPDATE_URL
} from '../constants';
import { getBrowserConf, getEnvConf } from '../helpers';
import { version } from '../../package.json';

// IMPORTANT!!!
// Signing artifacts for Mozilla publishes build to the store simultaneously
// We sign only beta build, because we do not publish it the AMO store
export const xpi = async (browser) => {
    const buildEnv = process.env.BUILD_ENV;
    if (buildEnv === ENVS.DEV) {
        throw new Error('XPI is not build for dev');
    }

    const envConf = getEnvConf(buildEnv);
    const browserConf = getBrowserConf(browser);

    const buildDir = path.join(BUILD_PATH, envConf.outputPath);
    const sourceDir = path.join(buildDir, browserConf.buildDir);
    const manifestPath = path.join(sourceDir, 'manifest.json');

    const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf-8'));
    const updatedManifest = { ...manifest };
    updatedManifest.browser_specific_settings.gecko.update_url = FIREFOX_WEBEXT_UPDATE_URL;
    await fs.writeFile(manifestPath, JSON.stringify(updatedManifest, null, 4));

    // require called here in order to escape errors, until this module is really necessary
    // eslint-disable-next-line global-require, import/no-unresolved
    const cryptor = require('../../private/cryptor/dist');
    const credentialsContent = await cryptor(process.env.CREDENTIALS_PASSWORD)
        .getDecryptedContent(FIREFOX_CREDENTIALS);
    const { apiKey, apiSecret } = JSON.parse(credentialsContent);

    const { downloadedFiles } = await webExt.cmd.sign({
        apiKey,
        apiSecret,
        sourceDir,
        artifactsDir: buildDir,
        timeout: 15 * 60 * 1000 // 15 minutes
    }, {
        shouldExitProgram: false
    });

    if (!downloadedFiles) {
        throw new Error('An error occurred during xpi signing');
    }

    const [downloadedXpi] = downloadedFiles;
    // Rename
    await fs.mkdir(DIST_PATH, { recursive: true });
    const xpiPath = path.join(DIST_PATH, 'firefox.xpi');
    await fs.rename(downloadedXpi, xpiPath);

    // Revert manifest to prev state
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 4));

    const VERSION_PATTERN = /\%VERSION\%/g;
    // create update.json
    const updateJsonTemplate = (await fs.readFile(FIREFOX_UPDATE_TEMPLATE)).toString().replace(VERSION_PATTERN, version);
    await fs.writeFile(path.join(DIST_PATH, 'update.json'), updateJsonTemplate);
};