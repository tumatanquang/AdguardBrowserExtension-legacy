/**
 * By the rules of AMO we cannot use remote scripts (and our JS rules can be counted as such).
 * Because of that we use the following approach (that was accepted by AMO reviewers):
 *
 * 1. We pre-build JS rules from AdGuard filters into the add-on (see the file called "local_script_rules.json").
 * 2. At runtime we check every JS rule if it's included into "local_script_rules.json".
 *  If it is included we allow this rule to work since it's pre-built. Other rules are discarded.
 * 3. We also allow "User rules" to work since those rules are added manually by the user.
 *  This way filters maintainers can test new rules before including them in the filters.
 */
import { promises as fs } from 'fs';
import {
    ADGUARD_DOWNLOAD_UPDATE_FILTERS_IDS,
    FILTERS_DEST,
    LOCAL_SCRIPT_RULES_COMMENT
} from '../constants';

/**
 * @param arr - array with elements [{domains: '', script: ''}, ...]
 * @param domainsToCheck String
 * @param scriptToCheck String
 * @returns {boolean}
 */
const isInArray = (arr, domainsToCheck, scriptToCheck) => {
    for (let i = 0; i < arr.length; ++i) {
        const element = arr[i];
        const { domains, script } = element;
        if (domains === domainsToCheck && script === scriptToCheck) {
            return true;
        }
    }
    return false;
};

const BROWSER_PATTERN = '%browser';
const LINE_SEPARATOR = '\n';
const JAVASCRIPT_PATTERN = '#%#';
const updateLocalScriptRulesForBrowser = async (browser) => {
    const folder = FILTERS_DEST.replace(BROWSER_PATTERN, browser);
    const rules = {
        comment: LOCAL_SCRIPT_RULES_COMMENT,
        rules: []
    };

    // eslint-disable-next-line no-restricted-syntax
    for (let i = 0; i < ADGUARD_DOWNLOAD_UPDATE_FILTERS_IDS.length; ++i) {
        const filterId = ADGUARD_DOWNLOAD_UPDATE_FILTERS_IDS[i];
        // eslint-disable-next-line no-await-in-loop
        const filters = (await fs.readFile(`${folder}/filter_${filterId}.txt`)).toString();
        const lines = filters.split(LINE_SEPARATOR);

        for (let j = 0; j < lines.length; ++j) {
            const line = lines[j].trim();
            if (line && line[0] !== '!' && line.indexOf(JAVASCRIPT_PATTERN) >= 0) {
                const m = line.split(JAVASCRIPT_PATTERN);
                m[0] = m[0] === '' ? '<any>' : m[0];
                // check that rule is not in array already
                if (!isInArray(rules.rules, m[0], m[1])) {
                    rules.rules.push({
                        domains: m[0],
                        script: m[1]
                    });
                }
            }
        }
    }

    await fs.writeFile(
        `${FILTERS_DEST.replace(BROWSER_PATTERN, browser)}/local_script_rules.json`,
        JSON.stringify(rules, null, 4)
    );
};

export const updateLocalScriptRules = async () => {
    await updateLocalScriptRulesForBrowser('chromium');
    await updateLocalScriptRulesForBrowser('edge');
    await updateLocalScriptRulesForBrowser('firefox');
    await updateLocalScriptRulesForBrowser('opera');
};