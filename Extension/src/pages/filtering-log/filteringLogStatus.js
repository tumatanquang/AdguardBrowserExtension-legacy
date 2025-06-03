/**
 * @typedef {Object} StatusMode
 * @property {string} REGULAR
 * @property {string} MODIFIED
 * @property {string} BLOCKED
 * @property {string} ALLOWED
 */
export const StatusMode = {
    REGULAR: 'regular',
    MODIFIED: 'modified',
    BLOCKED: 'blocked',
    ALLOWED: 'allowed'
};

/**
 * Returns filtering log status
 * @param {Object} event - filtering log event
 * @returns {string}
 */
export const getStatusMode = (event) => {
    const {
        cspReportBlocked,
        replaceRules,
        requestRule,
        removeParam,
        removeHeader
    } = event;

    if (cspReportBlocked) {
        return StatusMode.BLOCKED;
    }

    if (replaceRules) {
        return StatusMode.MODIFIED;
    }

    if (requestRule) {
        if (requestRule.allowlistRule) {
            return StatusMode.ALLOWED;
        }
        if (requestRule.cssRule || requestRule.scriptRule || requestRule.cspRule || removeParam || removeHeader) {
            return StatusMode.MODIFIED;
        }
        if (requestRule.cookieRule) {
            return requestRule.isModifyingCookieRule ? StatusMode.MODIFIED : StatusMode.BLOCKED;
        }
        return StatusMode.BLOCKED;
    }

    return StatusMode.REGULAR;
};