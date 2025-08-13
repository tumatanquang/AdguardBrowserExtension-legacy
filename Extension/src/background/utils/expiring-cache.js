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

import { localStorage } from '../storage';
import { log } from '../../common/log';

export const ExpiringCache = (() => {
    const EXPIRING_CACHE_SIZE = 1000;
    /**
     * Cache with maxCacheSize stored in local storage, which automatically clears expired values
     *
     * @param {string} storagePropertyName      Name of the local storage property.
     * @param {number} size                     Max cache size
     */
    function ExpiringCache(storagePropertyName, size) {
        const maxCacheSize = size || EXPIRING_CACHE_SIZE;

        let cache;
        let cacheSize;

        function getCacheFromLocalStorage() {
            let data = Object.create(null);
            try {
                const json = localStorage.getItem(storagePropertyName);
                if (json) {
                    data = JSON.parse(json);
                }
            }
            catch (ex) {
                // ignore
                log.error('Error read from {0} cache, cause: {1}', storagePropertyName, ex);
                localStorage.removeItem(storagePropertyName);
            }
            return data;
        }

        function saveCacheToLocalStorage() {
            try {
                localStorage.setItem(storagePropertyName, JSON.stringify(cache));
            }
            catch (ex) {
                log.error('Error save to {0} cache, cause: {1}', storagePropertyName, ex);
            }
        }

        /**
         * Retrieves value from cache and checks if saved data is not expired yet.
         * @param {string} key
         * @returns {null|object} saved data
         */
        function getValue(key) {
            const value = cache[key];
            if (value !== undefined) {
                const expires = +value.expires;
                if (Date.now() >= expires) {
                    return null;
                }
                return value.data;
            }
            return null;
        }

        function cleanup() {
            const cacheKeys = Object.keys(cache);
            for (let i = 0; i < cacheKeys.length; ++i) {
                const key = cacheKeys[i];
                const foundItem = getValue(key);
                if (!foundItem) {
                    delete cache[key];
                    --cacheSize;
                }
            }
            const halfMaxCacheSize = maxCacheSize >> 1;
            if (cacheSize > halfMaxCacheSize) {
                const cacheKeys = Object.keys(cache);
                for (let i = 0; i < cacheKeys.length; ++i) {
                    const key = cacheKeys[i];
                    delete cache[key];
                    if (--cacheSize <= halfMaxCacheSize) {
                        break;
                    }
                }
            }
            saveCacheToLocalStorage();
        }

        const saveValue = function (key, data, expires) {
            if (!key) {
                return;
            }
            if (cacheSize > maxCacheSize) {
                cleanup();
            }
            cache[key] = {
                data,
                expires
            };

            if (++cacheSize % 20 === 0) {
                saveCacheToLocalStorage();
            }
        };

        // Load cache
        cache = getCacheFromLocalStorage();
        cacheSize = Object.keys(cache).length;

        cleanup();

        return {
            getValue,
            saveValue
        };
    }

    /**
     * Expose
     */
    return ExpiringCache;
})();