/* eslint-disable no-nested-ternary */

import { MESSAGE_TYPES } from '../common/constants';
import { APPEARANCE_THEMES } from './constants';

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

const browser = window.browser || chrome;

export const devtoolsElementsSidebar = (() => {
    const initPanel = () => {
        initTheme();
        initElements();
        bindEvents();

        const onElementSelected = () => {
            browser.devtools.inspectedWindow.eval('DevToolsRulesConstructor.getElementInfo($0)', {
                useContentScriptContext: true
            }, (info) => {
                if (!info) {
                    return;
                }

                // Sort attributes
                info.attributes.sort((a1, a2) => {
                    const i1 = a1.name === 'id' ? 0 : (a1.name === 'class' ? 1 : 2);
                    const i2 = a2.name === 'id' ? 0 : (a2.name === 'class' ? 1 : 2);
                    return i1 - i2;
                });

                window.selectedElementInfo = info;

                updateRule();
                handleShowBlockSettings(
                    info.haveUrlBlockParameter,
                    info.haveClassAttribute && !info.haveIdAttribute
                );
                setupAttributesInfo(info);
            });
        };

        const onPageChanged = () => {
            document.getElementById('preview-rule-button').value = 'Preview';
            delete window.adguardDevToolsPreview;
        };

        if (browser.devtools) {
            browser.devtools.panels.elements.onSelectionChanged.addListener(onElementSelected);
            browser.devtools.network.onNavigated.addListener(onPageChanged);
        }

        onElementSelected();
    };

    const initTheme = () => {
        const theme = browser.devtools.panels.themeName;
        switch (theme) {
            case APPEARANCE_THEMES.DARK:
                document.body.classList.add('-theme-with-dark-background');
                break;
        }
    };

    const initElements = () => {
        document.querySelector('#block-by-url-checkbox').checked = false;
        document.querySelector('#create-full-css-path').checked = false;
        document.querySelector('#one-domain-checkbox').checked = true;
        document.querySelector('#filter-rule-text').value = '';

        for (const placeholder = document.getElementById('attributes-block');
            placeholder.firstChild;) {
            placeholder.removeChild(placeholder.firstChild);
        }
    };

    const updateRule = () => {
        getInspectedPageUrl(url => {
            updateFilterRuleInput(window.selectedElementInfo, url);
        });
    };

    const bindEvents = () => {
        const previewRuleButton = document.getElementById('preview-rule-button');
        previewRuleButton.addEventListener('click', (e) => {
            e.preventDefault();

            if (window.selectedElementInfo) {
                if (window.adguardDevToolsPreview) {
                    // Remove preview
                    cancelPreview();
                    previewRuleButton.value = 'Preview';

                    delete window.adguardDevToolsPreview;
                    return;
                }

                const ruleText = document.getElementById('filter-rule-text').value;
                if (!ruleText) {
                    return;
                }
                applyPreview(ruleText);

                previewRuleButton.value = 'Cancel preview';

                window.adguardDevToolsPreview = true;
            }
        });

        document.getElementById('add-rule-button').addEventListener('click', (e) => {
            e.preventDefault();

            if (window.selectedElementInfo) {
                addRuleForElement();
            }
        });

        const updateRuleBlocks = document.querySelectorAll('.update-rule-block');
        for (let i = 0; i < updateRuleBlocks.length; ++i) {
            const block = updateRuleBlocks[i];
            block.addEventListener('click', () => {
                updatePanelElements();
                updateRule();
            });
        }

        document.getElementById('select-attributes-checkbox').addEventListener('click', (e) => {
            const { checked } = e.currentTarget;

            const attributeCheckBoxes = document.querySelectorAll('.attribute-check-box');
            for (let i = 0; i < attributeCheckBoxes.length; ++i) {
                const el = attributeCheckBoxes[i];
                el.checked = checked;
            }

            updatePanelElements();
            updateRule();
        });
    };

    const updatePanelElements = () => {
        const checkboxes = document.querySelectorAll('#one-domain-checkbox, #create-full-css-path, .attribute-check-box');

        // All checkboxes should be disabled if block by url is checked
        if (document.querySelector('#block-by-url-checkbox').checked) {
            for (let i = 0; i < checkboxes.length; ++i) {
                const checkbox = checkboxes[i];
                checkbox.setAttribute('disabled', 'disabled');
            }
        }
        else {
            for (let i = 0; i < checkboxes.length; ++i) {
                const checkbox = checkboxes[i];
                checkbox.removeAttribute('disabled');
            }
        }
    };

    const handleShowBlockSettings = (showBlockByUrl, createFullCssPath) => {
        if (showBlockByUrl) {
            document.querySelector('#block-by-url-checkbox-block').style.display = 'block';
        }
        else {
            document.querySelector('#block-by-url-checkbox').checked = false;
            document.querySelector('#block-by-url-checkbox-block').style.display = 'none';
        }
        if (createFullCssPath) {
            document.querySelector('#create-full-css-path-block').style.display = 'block';
            document.querySelector('#create-full-css-path').checked = false;
        }
        else {
            document.querySelector('#create-full-css-path').checked = true;
            document.querySelector('#create-full-css-path-block').style.display = 'none';
        }
    };

    const setupAttributesInfo = (info) => {
        const placeholder = document.getElementById('attributes-block');

        while (placeholder.firstChild) {
            placeholder.removeChild(placeholder.firstChild);
        }

        const createAttributeElement = (attributeName, attributeValue, defaultChecked) => {
            const checked = defaultChecked ? 'checked="true"' : '';

            const elHtml = `<li class="parent">
                <input class="enabled-button attribute-check-box" type="checkbox" id="attribute-check-box-${attributeName}" ${checked}>
                <span class="webkit-css-property">${attributeName}</span>:
                <span class="value attribute-check-box-value">${attributeValue}</span>
            </li>`;

            const tmpEl = document.createElement('div');
            tmpEl.innerHTML = elHtml;
            return tmpEl.firstElementChild;
        };

        if (info.tagName) {
            placeholder.appendChild(createAttributeElement('tag', info.tagName.toLowerCase(), true));
        }

        const { attributes } = info;
        for (let i = 0; i < attributes.length; ++i) {
            const attribute = attributes[i];

            if (attribute.name === 'class' && attribute.value) {
                const split = attribute.value.split(' ');
                for (let j = 0; j < split.length; ++j) {
                    const value = split[j];
                    if (value) { // Skip empty values. Like 'class1 class2   '
                        placeholder.appendChild(
                            createAttributeElement(attribute.name, value, true)
                        );
                    }
                }
            }
            else {
                placeholder.appendChild(createAttributeElement(attribute.name, attribute.value, attribute.name === 'id'));
            }
        }

        if (placeholder.childNodes.length > 2) {
            document.querySelector('#select-attributes-checkbox').style.display = 'inline';
        }
        else {
            document.querySelector('#select-attributes-checkbox').style.display = 'none';
        }
    };

    const getInspectedPageUrl = (callback) => {
        browser.devtools.inspectedWindow.eval('document.location && document.location.href', (result) => {
            callback(result);
        });
    };

    const updateFilterRuleInput = (info, url) => {
        const isBlockByUrl = document.querySelector('#block-by-url-checkbox').checked;
        const createFullCssPath = document.querySelector('#create-full-css-path').checked;
        const isBlockOneDomain = document.querySelector('#one-domain-checkbox').checked;

        let includeTagName = true;
        let includeElementId = true;
        const selectedClasses = [];
        let attributesSelector = '';
        const checkboxes = document.querySelectorAll('.attribute-check-box');
        for (let i = 0; i < checkboxes.length; ++i) {
            const el = checkboxes[i];
            const attrName = el.id.substring('attribute-check-box-'.length);
            if (attrName === 'tag') {
                includeTagName = el.checked;
            }
            else if (attrName === 'id') {
                includeElementId = el.checked;
            }
            else if (el.checked) {
                const attrValue = el.parentNode.querySelector('.attribute-check-box-value').innerText;
                if (attrName === 'class') {
                    selectedClasses.push(attrValue);
                }
                else {
                    attributesSelector += `[${attrName}="${attrValue}"]`;
                }
            }
        }

        const options = {
            urlMask: info.urlBlockAttributeValue,
            isBlockOneDomain: !isBlockOneDomain,
            url,
            ruleType: isBlockByUrl ? 'URL' : 'CSS',
            cssSelectorType: createFullCssPath ? 'STRICT_FULL' : 'STRICT',
            attributes: attributesSelector,
            excludeTagName: !includeTagName,
            excludeId: !includeElementId,
            classList: selectedClasses
        };

        const func = `DevToolsRulesConstructor.constructRuleText($0, ${JSON.stringify(options)});`;
        browser.devtools.inspectedWindow.eval(func, {
            useContentScriptContext: true
        }, (result) => {
            if (result) {
                document.getElementById('filter-rule-text').value = result;
            }
        });
    };

    const applyPreview = function (ruleText) {
        const func = `DevToolsHelper.applyPreview(${JSON.stringify({ ruleText })});`;
        browser.devtools.inspectedWindow.eval(func, { useContentScriptContext: true });
    };

    const cancelPreview = function () {
        const func = 'DevToolsHelper.cancelPreview();';
        browser.devtools.inspectedWindow.eval(func, { useContentScriptContext: true });
    };

    /**
     * Adds userrule via background page
     * We add rule via background page to mitigate vulnerabilities
     * related with messages from content script
     * @param {string} ruleText
     * @returns {Promise<void>}
     */
    const addRule = async (ruleText) => {
        browser.runtime.sendMessage({
            type: MESSAGE_TYPES.DEVTOOLS_ADD_USER_RULE,
            data: { ruleText }
        });
    };

    const addRuleForElement = async () => {
        if (window.adguardDevToolsPreview) {
            // Remove preview
            cancelPreview();
        }

        const ruleText = document.getElementById('filter-rule-text').value;
        if (!ruleText) {
            return;
        }

        await addRule(ruleText);

        applyPreview(ruleText);
        delete window.selectedElementInfo;
        initElements();
    };

    const init = () => {
        document.addEventListener('DOMContentLoaded', () => {
            initPanel();
        });
    };

    return {
        init
    };
})();