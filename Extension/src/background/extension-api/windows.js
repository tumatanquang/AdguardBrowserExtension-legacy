/**
 * This function patches if necessary browser.windows implementation for Firefox for Android
 */
export const patchWindows = (browser) => {
    // Make compatible with Android WebExt
    if (typeof browser.windows === 'undefined') {
        browser.windows = (() => {
            const defaultWindow = {
                id: 1,
                type: 'normal'
            };

            const emptyListener = {
                addListener() {
                    // Doing nothing
                }
            };

            const create = () => {
                return Promise.resolve(defaultWindow);
            };

            const update = () => {
                return Promise.resolve();
            };

            const getAll = () => {
                return Promise.resolve(defaultWindow);
            };

            const getLastFocused = () => {
                return Promise.resolve(defaultWindow);
            };

            return {
                onCreated: emptyListener,
                onRemoved: emptyListener,
                onFocusChanged: emptyListener,
                create,
                update,
                getAll,
                getLastFocused
            };
        })();
    }
};