import { ANTIBANNER_FILTERS_ID } from '../../common/constants';

/**
 * Util class for detect filter type. Includes various filter identifiers
 */
export const filters = (() => {
    const FilterUtils = {

        isUserFilterRule(rule) {
            return rule.getFilterListId() === ANTIBANNER_FILTERS_ID.USER_FILTER_ID;
        },

        isAllowlistFilterRule(rule) {
            return rule.getFilterListId() === ANTIBANNER_FILTERS_ID.ALLOWLIST_FILTER_ID;
        }
    };

    // Make accessible only constants without functions. They will be passed to content-page
    FilterUtils.ids = ANTIBANNER_FILTERS_ID;

    // Copy filter ids to api
    const filterIds = Object.keys(ANTIBANNER_FILTERS_ID);
    for (let i = 0; i < filterIds.length; ++i) {
        const key = filterIds[i];
        FilterUtils[key] = ANTIBANNER_FILTERS_ID[key];
    }

    return FilterUtils;
})();