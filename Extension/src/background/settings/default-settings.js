import { settings } from './user-settings';
import {
    DEFAULT_ANTIBANNER_FILTERS_ID,
    DEFAULT_ANTIBANNER_GROUPS_ID
} from '../../common/constants';
import { localStorage } from '../storage';

/**
 * Default settings set
 */
const isUseDefaultSettings = !!localStorage.getItem('useDefaultSettings');
export const defaultSettings = {
    'general-settings': {
        'allow-acceptable-ads': isUseDefaultSettings,
        'show-blocked-ads-count': !settings.defaultProperties[settings.DISABLE_SHOW_PAGE_STATS],
        'autodetect-filters': !settings.defaultProperties[settings.DISABLE_DETECT_FILTERS],
        'safebrowsing-enabled': !settings.defaultProperties[settings.DISABLE_SAFEBROWSING],
        'filters-update-period': settings.defaultProperties[settings.FILTERS_UPDATE_PERIOD],
        'appearance-theme': settings.defaultProperties[settings.APPEARANCE_THEME]
    },
    'extension-specific-settings': {
        'use-optimized-filters': settings.defaultProperties[settings.USE_OPTIMIZED_FILTERS],
        'collect-hits-count': !settings.defaultProperties[settings.DISABLE_COLLECT_HITS],
        'show-context-menu': !settings.defaultProperties[settings.DISABLE_SHOW_CONTEXT_MENU],
        'show-info-about-adguard': !settings.defaultProperties[settings.DISABLE_SHOW_ADGUARD_PROMO_INFO],
        'show-app-updated-info': !settings.defaultProperties[settings.DISABLE_SHOW_APP_UPDATED_NOTIFICATION],
        'hide-rate-adguard': settings.defaultProperties[settings.HIDE_RATE_BLOCK],
        'user-rules-editor-wrap': settings.defaultProperties[settings.USER_RULES_EDITOR_WRAP]
    },
    'filters': {
        'enabled-groups': isUseDefaultSettings ? DEFAULT_ANTIBANNER_GROUPS_ID : [],
        'enabled-filters': isUseDefaultSettings ? DEFAULT_ANTIBANNER_FILTERS_ID : [],
        'custom-filters': [],
        'user-filter': {
            'rules': '',
            'disabled-rules': '',
            'enabled': settings.defaultProperties[settings.USER_FILTER_ENABLED]
        },
        'whitelist': {
            'inverted': !settings.defaultProperties[settings.DEFAULT_ALLOWLIST_MODE],
            'domains': [],
            'inverted-domains': [],
            'enabled': settings.defaultProperties[settings.ALLOWLIST_ENABLED]
        }
    },
    'stealth': {
        'stealth_disable_stealth_mode': settings.defaultProperties[settings.DISABLE_STEALTH_MODE],
        'stealth-hide-referrer': settings.defaultProperties[settings.HIDE_REFERRER],
        'stealth-hide-search-queries': settings.defaultProperties[settings.HIDE_SEARCH_QUERIES],
        'stealth-send-do-not-track': settings.defaultProperties[settings.SEND_DO_NOT_TRACK],
        'stealth-block-webrtc': settings.defaultProperties[settings.BLOCK_WEBRTC],
        'stealth-remove-x-client': settings.defaultProperties[settings.BLOCK_CHROME_CLIENT_DATA],
        'stealth-block-third-party-cookies':
            settings.defaultProperties[settings.SELF_DESTRUCT_THIRD_PARTY_COOKIES],
        'stealth-block-third-party-cookies-time':
            settings.defaultProperties[settings.SELF_DESTRUCT_THIRD_PARTY_COOKIES_TIME],
        'stealth-block-first-party-cookies':
            settings.defaultProperties[settings.SELF_DESTRUCT_FIRST_PARTY_COOKIES],
        'stealth-block-first-party-cookies-time':
            settings.defaultProperties[settings.SELF_DESTRUCT_FIRST_PARTY_COOKIES_TIME],
        'block-known-trackers': false,
        'strip-tracking-parameters': false
    }
};