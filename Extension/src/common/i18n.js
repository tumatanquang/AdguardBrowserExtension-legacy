/**
 * This file is part of Adguard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).
 *
 * Adguard Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Adguard Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Adguard Browser Extension. If not, see <http://www.gnu.org/licenses/>.
 */

import { i18n } from './common-script';
import { I18nHelper } from '../content-script/i18n-helper';

const i18nPatched = (() => {
    function translateElement(element, messageId, args) {
        const message = i18n.getMessage(messageId, args);
        I18nHelper.translateElement(element, message);
    }

    function init() {
        document.addEventListener('DOMContentLoaded', () => {
            const i18nElements = document.querySelectorAll('[i18n]');
            for (let i = 0; i < i18nElements.length; ++i) {
                const el = i18nElements[i];
                const message = i18n.getMessage(el.getAttribute('i18n'));
                I18nHelper.translateElement(el, message);
            }
            const i18nPlhr = document.querySelectorAll('[i18n-plhr]');
            for (let i = 0; i < i18nPlhr.length; ++i) {
                const el = i18nPlhr[i];
                el.setAttribute('placeholder', i18n.getMessage(el.getAttribute('i18n-plhr')));
            }
            const i18nHref = document.querySelectorAll('[i18n-href]');
            for (let i = 0; i < i18nHref.length; ++i) {
                const el = i18nHref[i];
                el.setAttribute('href', i18n.getMessage(el.getAttribute('i18n-href')));
            }
            const i18nTitle = document.querySelectorAll('[i18n-title]');
            for (let i = 0; i < i18nTitle.length; ++i) {
                const el = i18nTitle[i];
                el.setAttribute('title', i18n.getMessage(el.getAttribute('i18n-title')));
            }
        });
    }

    i18n.translateElement = translateElement;
    i18n.init = init;

    return i18n;
})();

// Init
i18nPatched.init();

export { i18nPatched as i18n };