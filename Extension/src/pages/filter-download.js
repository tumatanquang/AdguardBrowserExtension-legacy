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

import Nanobar from 'nanobar';
import Swal from 'sweetalert2';

import { localStorage } from '../background/storage';
import { contentPage } from '../content-script/content-script';
import { MESSAGE_TYPES } from '../common/constants';

import '../common/i18n'; // !!! DO NOT REMOVE, THIS MODULE HANDLES TRANSLATIONS
import { i18n } from '../common/common-script';

export const init = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const nanobar = new Nanobar({
            classname: 'adg-progress-bar'
        });

        nanobar.go(15);

        const onLoaded = () => {
            nanobar.go(100);
            setTimeout(() => {
                if (window) {
                    contentPage.sendMessage({ type: MESSAGE_TYPES.OPEN_THANKYOU_PAGE });
                }
            }, 500);
        };

        const checkRequestFilterReady = async () => {
            const response = await contentPage.sendMessage({
                type: MESSAGE_TYPES.CHECK_REQUEST_FILTER_READY
            });
            if (response.ready) {
                onLoaded();
            }
            else {
                setTimeout(checkRequestFilterReady, 500);
            }
        };

        if (localStorage.hasItem('useDefaultSettings')) {
            checkRequestFilterReady();
        }
        else {
            setTimeout(() => {
                Swal.fire({
                    titleText: i18n.getMessage('filters_download_confirm_title'),
                    text: i18n.getMessage('filters_download_confirm_text'),
                    icon: 'question',
                    theme: 'auto',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: true,
                    showDenyButton: true,
                    confirmButtonText: i18n.getMessage('yes_button_title'),
                    denyButtonText: i18n.getMessage('no_button_title'),
                    confirmButtonColor: '#68BC86',
                    denyButtonColor: '#BF4829',
                    showLoaderOnConfirm: true,
                    preConfirm: async () => {
                        nanobar.go(50);
                    }
                }).then(result => {
                    localStorage.setItem('useDefaultSettings', result.isConfirmed);
                    if (result.isConfirmed) {
                        contentPage.sendMessage({
                            type: MESSAGE_TYPES.INITIALIZE_ONINSTALL_DEFAULT_FILTERS
                        });
                        checkRequestFilterReady();
                    }
                    else {
                        onLoaded();
                    }
                });
            }, 233);
        }
    });
};

export const filterDownload = {
    init
};