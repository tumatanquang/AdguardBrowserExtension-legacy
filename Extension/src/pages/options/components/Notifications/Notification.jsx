import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { rootStore } from '../../stores/RootStore';
import { Icon } from '../../../common/components/ui/Icon';

export const Notification = (props) => {
    const [notificationOnClose, setNotificationOnClose] = useState(false);

    const { id, title, description } = props;

    const { uiStore } = useContext(rootStore);

    const DISPLAY_DELAY_MS = 300;
    const DISPLAY_TIMEOUT_ANIMATION_MS = 5 * 1000;
    const DISPLAY_TIMEOUT_MS = DISPLAY_TIMEOUT_ANIMATION_MS + DISPLAY_DELAY_MS;

    useEffect(() => {
        const displayTimeoutAnimationId = setTimeout(() => {
            setNotificationOnClose(true);
        }, DISPLAY_TIMEOUT_ANIMATION_MS);

        const displayTimeout = setTimeout(() => {
            uiStore.removeNotification(id);
        }, DISPLAY_TIMEOUT_MS);

        return () => {
            clearTimeout(displayTimeoutAnimationId);
            clearTimeout(displayTimeout);
        };
    }, [id, uiStore, DISPLAY_TIMEOUT_ANIMATION_MS, DISPLAY_TIMEOUT_MS]);

    const notificationClassnames = classnames('notification', {
        'notification--close': notificationOnClose
    });

    const close = () => {
        setNotificationOnClose(true);
        setTimeout(() => {
            uiStore.removeNotification(id);
        }, DISPLAY_DELAY_MS);
    };

    return (
        <div className={notificationClassnames}>
            <Icon id='#info' classname='notification__icon notification__icon--info' />
            <div className='notification__message'>
                {title.length !== 0
                    && <div className='notification__title'>{title}</div>}
                <div className='notification__description'>{description}</div>
            </div>
            <button
                type='button'
                className='button notification__close'
                onClick={close}
            >
                <Icon id='#cross' classname='notification__icon notification__icon--close' />
            </button>
        </div>
    );
};

Notification.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};