import React from 'react';
import classnames from 'classnames';

export function Tab({ title, active, onClick }) {
    const tabClass = classnames('tabs__tab', { tabs__tab_active: active });

    return (
        <button
            type='button'
            className={tabClass}
            onClick={onClick}
        >
            {title}
        </button>
    );
}