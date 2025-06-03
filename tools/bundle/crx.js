import { promises as fs } from 'fs';
import path from 'path';
import Crx from 'crx';
import {
    ENVS,
    DIST_PATH,
    BUILD_PATH,
    CHROME_CERT,
    CHROME_UPDATE_URL,
    CHROME_CODEBASE_URL
} from '../constants';
import { getBrowserConf, getEnvConf } from '../helpers';

export const crx = async (browser) => {
    const buildEnv = process.env.BUILD_ENV;

    // Guards
    if (buildEnv === ENVS.DEV) {
        throw new Error('CRX is not build for dev');
    }

    const envConf = getEnvConf(buildEnv);
    const browserConf = getBrowserConf(browser);

    const envBuildPath = path.join(BUILD_PATH, envConf.outputPath);
    const browserBuildPath = path.join(envBuildPath, browserConf.buildDir);

    // add update url to the manifest
    const manifestPath = path.join(browserBuildPath, 'manifest.json');
    const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf-8'));
    const updatedManifest = { ...manifest, update_url: CHROME_UPDATE_URL };
    await fs.writeFile(manifestPath, JSON.stringify(updatedManifest, null, 4));

    const privateKey = await fs.readFile(CHROME_CERT, 'utf-8');

    const crx = new Crx({
        codebase: CHROME_CODEBASE_URL,
        privateKey
    });

    await crx.load(browserBuildPath);
    const crxBuffer = await crx.pack();
    const updateXml = await crx.generateUpdateXML();

    await fs.mkdir(DIST_PATH, { recursive: true });
    const crxBuildPath = path.join(DIST_PATH, 'chrome.crx');
    const updateXmlPath = path.join(DIST_PATH, 'update.xml');
    await fs.writeFile(crxBuildPath, crxBuffer);
    await fs.writeFile(updateXmlPath, updateXml);

    // revert manifest to prev state
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 4));
};