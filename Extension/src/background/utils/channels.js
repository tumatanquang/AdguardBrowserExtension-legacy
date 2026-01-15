/* eslint-disable prefer-rest-params */
/**
 * Simple publish-subscribe implementation
 */
export const channels = (() => {
    const EventChannels = (() => {
        const EventChannel = () => {
            let listeners = null;
            let listenerCallback = null;

            const addListener = (callback) => {
                if (typeof callback !== 'function') {
                    throw new Error('Illegal callback');
                }
                if (listeners !== null) {
                    listeners.push(callback);
                    return;
                }
                if (listenerCallback !== null) {
                    listeners = [];
                    listeners.push(listenerCallback);
                    listeners.push(callback);
                    listenerCallback = null;
                }
                else {
                    listenerCallback = callback;
                }
            };

            const removeListener = (callback) => {
                if (listenerCallback !== null) {
                    listenerCallback = null;
                }
                else if (listeners !== null) {
                    const index = listeners.indexOf(callback);
                    if (index >= 0) {
                        listeners.splice(index, 1);
                    }
                }
            };

            const notify = (...args) => {
                if (listenerCallback !== null) {
                    return listenerCallback.apply(listenerCallback, args);
                }
                if (listeners !== null) {
                    const len = listeners.length;
                    for (let i = 0; i < len; ++i) {
                        const listener = listeners[i];
                        listener.apply(listener, args);
                    }
                }
            };

            const notifyInReverseOrder = (...args) => {
                if (listenerCallback !== null) {
                    return listenerCallback.apply(listenerCallback, args);
                }
                if (listeners !== null) {
                    for (let i = listeners.length - 1; i >= 0; --i) {
                        const listener = listeners[i];
                        listener.apply(listener, args);
                    }
                }
            };

            return {
                addListener,
                removeListener,
                notify,
                notifyInReverseOrder
            };
        };

        const namedChannels = Object.create(null);

        const newChannel = () => {
            return EventChannel();
        };

        const newNamedChannel = (name) => {
            const channel = newChannel();
            namedChannels[name] = channel;
            return channel;
        };

        const getNamedChannel = (name) => {
            return namedChannels[name];
        };

        return {
            newChannel,
            newNamedChannel,
            getNamedChannel
        };
    })();

    return EventChannels;
})();