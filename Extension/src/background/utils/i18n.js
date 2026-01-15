import { collections } from './collections';

/**
 * Simple i18n utils
 */
export const i18n = (() => {
    const isArrayElement = (array, elem) => {
        return array.indexOf(elem) >= 0;
    };

    const isObjectKey = (object, key) => {
        return key in object;
    };

    return {
        /**
         * Tries to find locale in the given collection of locales
         * @param locales Collection of locales (array or object)
         * @param locale Locale (e.g. en, en_GB, pt_BR)
         * @returns matched locale from the locales collection or null
         */
        normalize(locales, locale) {
            if (!locale) {
                return null;
            }

            // Transform Language-Country => Language_Country
            locale = locale.replace('-', '_');

            let search;

            if (collections.isArray(locales) === true) {
                search = isArrayElement;
            }
            else {
                search = isObjectKey;
            }

            if (search(locales, locale) === true) {
                return locale;
            }

            // Try to search by the language
            const parts = locale.split('_');
            const [language] = parts;
            if (search(locales, language) === true) {
                return language;
            }

            return null;
        }
    };
})();