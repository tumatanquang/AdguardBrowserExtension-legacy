import { CUSTOM_FILTERS_GROUP_DISPLAY_NUMBER } from '../../common/constants';

/**
 * We collect here all workarounds and ugly hacks:)
 */
export const workaround = (() => {
    const WorkaroundUtils = {
        /**
         * Converts blocked counter to the badge text.
         * Workaround for FF - make 99 max.
         *
         * @param {string} blocked Blocked requests count
         */
        getBlockedCountText(blocked) {
            if (blocked === '0') {
                return '';
            }
            if (blocked > CUSTOM_FILTERS_GROUP_DISPLAY_NUMBER) {
                return '\u221E';
            }
            return blocked;
        }
    };

    return WorkaroundUtils;
})();