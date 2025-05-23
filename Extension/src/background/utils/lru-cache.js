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

import { LRUMap } from 'lru_map';
import { localStorage } from '../storage';
import { log } from '../../common/log';

/**
 * Cache with maxCacheSize stored in local storage, which automatically clears less recently used entries
 *
 * @param {string} storagePropertyName      Name of the local storage property.
 * @param {number} size                     Max cache size
 */
export function LruCache(storagePropertyName, size) {
    const CACHE_SIZE = 1000;

    const maxCacheSize = size || CACHE_SIZE;

    let cache;
    let cacheSize;

    function getCacheFromLocalStorage() {
        let entries = null;
        try {
            const json = localStorage.getItem(storagePropertyName);
            if (json) {
                const data = JSON.parse(json);
                entries = data.map(x => [x.key, x.value]);
            }
        } catch (ex) {
            // ignore
            log.error('Error read from {0} cache, cause: {1}', storagePropertyName, ex);
            localStorage.removeItem(storagePropertyName);
        }

        return new LRUMap(maxCacheSize, entries);
    }

    function saveCacheToLocalStorage() {
        try {
            localStorage.setItem(storagePropertyName, JSON.stringify(cache.toJSON()));
        } catch (ex) {
            log.error('Error save to {0} cache, cause: {1}', storagePropertyName, ex);
        }
    }

    /**
     * Retrieves value from cache and checks if saved data is not expired yet.
     * @param {string} key
     * @returns {null|object} saved data
     */
    function getValue(key) {
        return cache.get(key);
    }

    const saveValue = function (key, data) {
        if (!key) {
            return;
        }

        cache.set(key, data);
        cacheSize += 1;

        if (cacheSize % 20 === 0) {
            saveCacheToLocalStorage();
        }
    };

    /**
     * Clears cache
     */
    const clear = () => {
        cache = new LRUMap(maxCacheSize, null);
        cacheSize = cache.size;
        saveCacheToLocalStorage();
    };

    // Load cache
    cache = getCacheFromLocalStorage();
    cacheSize = cache.size;

    return {
        getValue,
        saveValue,
        clear,
    };
}
