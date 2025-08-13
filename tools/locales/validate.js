import { validator } from '@adguard/translate';

import { cliLog } from '../cli-log';

import {
    getLocaleTranslations,
    areArraysEqual
} from '../helpers';

import {
    BASE_LOCALE,
    LANGUAGES,
    REQUIRED_LOCALES,
    THRESHOLD_PERCENTAGE
} from './locales-constants';

const LOCALES = Object.keys(LANGUAGES);

/**
 * @typedef Result
 * @property {string} locale
 * @property {string} level % of translated
 * @property {Array} untranslatedStrings
 * @property {Array} invalidTranslations
 */

/**
 * Logs translations readiness (default validation process)
 * @param {Result[]} results
 * @param {boolean} [isMinimum=false]
 */
const printTranslationsResults = (results, isMinimum = false) => {
    cliLog.info('Translations readiness:');
    for (let i = 0; i < results.length; ++i) {
        const r = results[i];
        const record = `${r.locale} -- ${r.level}%`;
        if (r.level < THRESHOLD_PERCENTAGE) {
            cliLog.warningRed(record);
            const { untranslatedStrings } = r;
            if (untranslatedStrings.length !== 0) {
                cliLog.warning('  untranslated:');
                for (let j = 0; j < untranslatedStrings.length; ++j) {
                    const str = untranslatedStrings[j];
                    cliLog.warning(`    - ${str}`);
                }
            }
            if (isMinimum === false) {
                const { invalidTranslations } = r;
                if (invalidTranslations.length !== 0) {
                    cliLog.warning('  invalid:');
                    for (let j = 0; j < invalidTranslations.length; ++j) {
                        const obj = invalidTranslations[j];
                        cliLog.warning(`    - ${obj.key} -- ${obj.error}`);
                    }
                }
            }
        }
        else {
            cliLog.success(record);
        }
    }
};

/**
 * Logs invalid translations (critical errors)
 * @param {Result[]} criticals
 */
const printCriticalResults = (criticals) => {
    cliLog.warning('Invalid translated string:');
    for (let i = 0; i < criticals.length; ++i) {
        const cr = criticals[i];
        cliLog.warningRed(`${cr.locale}:`);
        const { invalidTranslations } = cr;
        for (let j = 0; j < invalidTranslations.length; ++j) {
            const obj = invalidTranslations[j];
            cliLog.warning(`   - ${obj.key} -- ${obj.error}`);
        }
    }
};

const validateMessage = (baseKey, baseLocaleTranslations, localeTranslations) => {
    const baseMessageValue = baseLocaleTranslations[baseKey].message;
    const localeMessageValue = localeTranslations[baseKey].message;
    try {
        const isTranslationValid = validator.isTranslationValid(baseMessageValue, localeMessageValue);
        if (!isTranslationValid) {
            throw new Error('Invalid translated string');
        }
    }
    catch (error) {
        return { key: baseKey, error };
    }
};

/**
 * @typedef ValidationFlags
 * @property {boolean} [isMinimum=false] for minimum level of validation:
 * critical errors for all and full translations level for our locales
 * @property {boolean} [isInfo=false] for logging translations info without throwing the error
 */

/**
 * Checks locales translations readiness
 * @param {string[]} locales - list of locales
 * @param {ValidationFlags} flags
 * @returns {Result[]} array of object with such properties:
 * locale, level of translation readiness, untranslated strings array and array of invalid translations
 */
export const checkTranslations = async (locales, flags) => {
    const { isMinimum = false, isInfo = false } = flags;
    const baseLocaleTranslations = await getLocaleTranslations(BASE_LOCALE);
    const baseMessages = Object.keys(baseLocaleTranslations);
    const baseMessagesCount = baseMessages.length;

    const translationResults = await Promise.all(locales.map(async (locale) => {
        const localeTranslations = await getLocaleTranslations(locale);
        const localeMessages = Object.keys(localeTranslations);
        const localeMessagesCount = localeMessages.length;

        const untranslatedStrings = [];
        const invalidTranslations = [];
        for (let i = 0; i < localeMessagesCount; ++i) {
            const baseKey = baseMessages[i];
            if (!localeMessages.includes(baseKey)) {
                untranslatedStrings.push(baseKey);
            }
            else {
                const validationError = validateMessage(baseKey, baseLocaleTranslations, localeTranslations);
                if (validationError) {
                    invalidTranslations.push(validationError);
                }
            }
        }

        const validLocaleMessagesCount = localeMessagesCount - invalidTranslations.length;

        const strictLevel = ((validLocaleMessagesCount / baseMessagesCount) * 100);
        const level = Math.round((strictLevel + Number.EPSILON) * 100) / 100;

        return {
            locale, level, untranslatedStrings, invalidTranslations
        };
    }));

    const filteredCriticalResults = translationResults.filter((result) => {
        return result.invalidTranslations.length !== 0;
    });

    const filteredReadinessResults = translationResults.filter((result) => {
        return isMinimum
            ? result.level < THRESHOLD_PERCENTAGE && REQUIRED_LOCALES.includes(result.locale)
            : result.level < THRESHOLD_PERCENTAGE;
    });

    if (isInfo) {
        printTranslationsResults(translationResults);
    }
    else {
        // critical errors and required locales translations levels check
        if (isMinimum) {
            let isSuccess = true;
            // check for invalid strings
            if (filteredCriticalResults.length === 0) {
                cliLog.success('No invalid translations found');
            }
            else {
                isSuccess = false;
                printCriticalResults(filteredCriticalResults);
                cliLog.warningRed('Locales above should not have invalid strings');
            }
            // check for translations readiness for required locales
            if (filteredReadinessResults.length === 0) {
                cliLog.success('Our locales have required level of translations');
            }
            else {
                isSuccess = false;
                printTranslationsResults(filteredReadinessResults, isMinimum);
                cliLog.warningRed('Our locales should be done for 100%');
            }
            if (isSuccess === false) {
                // throw error finally
                throw new Error('Locales validation failed!');
            }
        }
        // common translations check
        if (filteredReadinessResults.length === 0) {
            let message = `Level of translations is required for locales: ${locales.join(', ')}`;
            if (areArraysEqual(locales, LOCALES)) {
                message = 'All locales have required level of translations';
            }
            cliLog.success(message);
        }
        else {
            printTranslationsResults(filteredReadinessResults);
            throw new Error('Locales above should be done for 100%');
        }
    }

    return translationResults;
};