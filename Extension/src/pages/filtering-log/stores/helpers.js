import { containsIgnoreCase } from '../../helpers';

export const matchesSearch = (filteringEvent, search) => {
    let matches = !search
        || containsIgnoreCase(filteringEvent.requestUrl, search) === true
        || containsIgnoreCase(filteringEvent.element, search) === true
        || containsIgnoreCase(filteringEvent.cookieName, search) === true
        || containsIgnoreCase(filteringEvent.cookieValue, search) === true;

    const { ruleText, filterName } = filteringEvent;
    if (ruleText) {
        matches = matches || containsIgnoreCase(ruleText, search) === true;
    }

    if (filterName) {
        matches = matches || containsIgnoreCase(filterName, search) === true;
    }

    return matches;
};