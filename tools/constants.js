/* eslint-disable max-len */
import path from 'path';

export const ENVS = {
    DEV: 'dev',
    BETA: 'beta',
    RELEASE: 'release',
};

export const ENV_CONF = {
    [ENVS.DEV]: { outputPath: 'dev', mode: 'development' },
    [ENVS.BETA]: { outputPath: 'beta', mode: 'production' },
    [ENVS.RELEASE]: { outputPath: 'release', mode: 'production' },
};

export const BROWSERS = {
    CHROME: 'chrome',
    FIREFOX_AMO: 'firefox-amo',
    FIREFOX_STANDALONE: 'firefox-standalone',
    OPERA: 'opera',
    EDGE: 'edge',
    ADGUARD_API: 'adguard-api',
};

export const BROWSERS_CONF = {
    [BROWSERS.CHROME]: {
        browser: BROWSERS.CHROME,
        remoteScripts: true,
        devtools: true,
        buildDir: BROWSERS.CHROME,
    },
    [BROWSERS.FIREFOX_STANDALONE]: {
        browser: BROWSERS.FIREFOX_STANDALONE,
        remoteScripts: true,
        devtools: false,
        buildDir: BROWSERS.FIREFOX_STANDALONE,
    },
    [BROWSERS.FIREFOX_AMO]: {
        browser: BROWSERS.FIREFOX_AMO,
        remoteScripts: false,
        devtools: false,
        buildDir: BROWSERS.FIREFOX_AMO,
    },
    [BROWSERS.OPERA]: {
        browser: BROWSERS.OPERA,
        remoteScripts: true,
        devtools: true,
        buildDir: BROWSERS.OPERA,
    },
    [BROWSERS.EDGE]: {
        browser: BROWSERS.EDGE,
        remoteScripts: true,
        devtools: true,
        buildDir: BROWSERS.EDGE,
    },
    [BROWSERS.ADGUARD_API]: {
        browser: BROWSERS.ADGUARD_API,
        remoteScripts: true,
        devtools: false,
        buildDir: BROWSERS.ADGUARD_API,
    },
};

export const FIREFOX_APP_IDS_MAP = {
    [ENVS.DEV]: 'adguardadblockerdev@adguard.com',
    [ENVS.BETA]: 'adguardadblockerbeta@adguard.com',
    [ENVS.RELEASE]: 'adguardadblocker@adguard.com',
};

export const BUILD_PATH = path.resolve(__dirname, '../build');

// filters constants
export const EXTENSION_FILTERS_SERVER_URL_FORMAT = 'https://filters.adtidy.org/extension/%browser';
export const METADATA_DOWNLOAD_URL_FORMAT = `${EXTENSION_FILTERS_SERVER_URL_FORMAT}/filters.json`;
export const FILTERS_DEST = 'Extension/filters/%browser';
export const METADATA_I18N_DOWNLOAD_URL_FORMAT = `${EXTENSION_FILTERS_SERVER_URL_FORMAT}/filters_i18n.js`;
export const ADGUARD_FILTERS_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 224];
export const FILTER_DOWNLOAD_URL_FORMAT = `${EXTENSION_FILTERS_SERVER_URL_FORMAT}/filters/%filter.txt`;
export const OPTIMIZED_FILTER_DOWNLOAD_URL_FORMAT = `${EXTENSION_FILTERS_SERVER_URL_FORMAT}/filters/%s_optimized.txt`;
export const LOCAL_SCRIPT_RULES_COMMENT = `By the rules of AMO we cannot use remote scripts (and our JS rules can be counted as such). Because of that we use the following approach (that was accepted by AMO reviewers):

1. We pre-build JS rules from AdGuard filters into the add-on (see the file called "local_script_rules.json").
2. At runtime we check every JS rule if it's included into "local_script_rules.json". If it is included we allow this rule to work since it's pre-built. Other rules are discarded.
3. We also allow "User rules" to work since those rules are added manually by the user. This way filters maintainers can test new rules before including them in the filters.`;

// artifacts constants
export const CHROME_UPDATE_URL = 'https://static.adtidy.org/extensions/adguardadblocker/beta/update.xml';
export const CHROME_CERT = path.resolve(__dirname, '../private/AdguardBrowserExtension/certificate.pem');
export const CHROME_CODEBASE_URL = 'https://static.adtidy.org/extensions/adguardadblocker/beta/chrome.crx';
export const FIREFOX_CREDENTIALS = path.resolve(__dirname, '../private/AdguardBrowserExtension/mozilla_credentials.json');
export const FIREFOX_UPDATE_TEMPLATE = path.resolve(__dirname, './bundle/firefox/update_template.json');
export const FIREFOX_WEBEXT_UPDATE_URL = 'https://static.adtidy.org/extensions/adguardadblocker/beta/update.json';

// Separated chunks to reduce final pages/background.js size.
export const REACT_VENDOR_OUTPUT = 'vendors/react';
export const MOBX_VENDOR_OUTPUT = 'vendors/mobx';
export const XSTATE_VENDOR_OUTPUT = 'vendors/xstate';
export const LODASH_VENDOR_OUTPUT = 'vendors/lodash';
export const TSURLFILTER_VENDOR_OUTPUT = 'vendors/tsurlfilter';
