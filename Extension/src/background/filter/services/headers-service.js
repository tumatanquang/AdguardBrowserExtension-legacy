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

import { HeadersService } from '@adguard/tsurlfilter/dist/es/headers-service';

import { filteringLog } from '../filtering-log';
import { filteringApi } from '../filtering-api';
import { RequestTypes } from '../../utils/request-types';
import { frames } from '../../tabs/frames';

/**
 * Returns $removeheader rules matching request details
 *
 * @param tab
 * @param url
 * @param referrer
 * @return {NetworkRule[]}
 */
export const getRemoveHeaderRules = (tab, url, referrer) => {
    return filteringApi.getRemoveHeaderRules({
        requestUrl: url,
        frameUrl: referrer,
        requestType: RequestTypes.DOCUMENT,
        frameRule: frames.getFrameRule(tab),
    });
};

/**
 * Headers filtering service
 */
export const headersService = new HeadersService(filteringLog);
