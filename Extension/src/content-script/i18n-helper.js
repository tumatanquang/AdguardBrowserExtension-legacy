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
export const I18nHelper = {
    translateElement(element, message) {
        try {
            for (; element.lastChild;) {
                element.removeChild(element.lastChild);
            }

            this.processString(message, element);
        }
        catch (ex) {
            // Ignore exceptions
        }
    },

    processString(str, element) {
        const PROCESS_STRING_MATCH1_PATTERN = /^([^]*?)<(a|strong|span|i)([^>]*)>(.*?)<\/\2>([^]*)$/m;
        const PROCESS_STRING_MATCH2_PATTERN = /^([^]*?)<(br|input)([^>]*)\/?>([^]*)$/m;
        const match1 = PROCESS_STRING_MATCH1_PATTERN.exec(str);
        const match2 = PROCESS_STRING_MATCH2_PATTERN.exec(str);
        if (match1) {
            this.processString(match1[1], element);

            const el = this.createElement(match1[2], match1[3]);

            this.processString(match1[4], el);
            element.appendChild(el);

            this.processString(match1[5], element);
        }
        else if (match2) {
            this.processString(match2[1], element);

            const el = this.createElement(match2[2], match2[3]);
            element.appendChild(el);

            this.processString(match2[4], element);
        }
        else {
            const PROCESS_STRING_NON_BREAKING_SPACE_PATTERN = /&nbsp;/g;
            const nodeValue = str.replace(PROCESS_STRING_NON_BREAKING_SPACE_PATTERN, '\u00A0');
            element.appendChild(document.createTextNode(nodeValue));
        }
    },

    createElement(tagName, attributes) {
        const el = document.createElement(tagName);
        if (!attributes) {
            return el;
        }

        const CREATE_ELEMENT_SPLIT_PATTERN = /([a-z]+='[^']+')/;
        const attrs = attributes.split(CREATE_ELEMENT_SPLIT_PATTERN);
        const len = attrs.length;
        for (let i = 0; i < len; ++i) {
            const attr = attrs[i].trim();
            if (!attr) {
                continue;
            }
            const index = attr.indexOf('=');
            let attrName;
            let attrValue;
            if (index > 0) {
                attrName = attr.substring(0, index);
                attrValue = attr.substring(index + 2, attr.length - 1);
            }
            if (attrName && attrValue) {
                el.setAttribute(attrName, attrValue);
            }
        }

        return el;
    }
};