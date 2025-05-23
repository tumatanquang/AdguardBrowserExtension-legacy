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

/**
 * This is an abstract safebrowsing module with methods throwing errors if used.
 * It should be replaced by webpack during compilation
 */

const errorFunction = () => {
    throw new Error('Seems like webpack did not provide proper safebrowsing module');
};

const abstractSafebrowsing = {
    checkSafebrowsingFilter: errorFunction,
    lookupUrl: errorFunction,
    addToSafebrowsingTrusted: errorFunction,
    getErrorPageURL: errorFunction,
    extractHosts: errorFunction,
    createHashesMap: errorFunction,
    processSbResponse: errorFunction,
    clearCache: errorFunction,
};

export default abstractSafebrowsing;
