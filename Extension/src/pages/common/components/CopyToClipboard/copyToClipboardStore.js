import { createContext } from 'react';
import { observable, action, makeObservable } from 'mobx';

import { copyToClipboard } from '../../../helpers';

class CopyToClipboardStore {
    constructor() {
        makeObservable(this);
    }

    @observable
    currentContainerId = null;

    tooltipTimer = null;

    @action
    copyText = (containerId, text) => {
        clearTimeout(this.tooltipTimer);
        copyToClipboard(text);
        this.currentContainerId = containerId;
        this.tooltipTimer = setTimeout(() => {
            this.resetTooltipId();
        }, 1500);
    };

    @action
    resetTooltipId = () => {
        this.currentContainerId = null;
    };
}

export const copyToClipboardStore = createContext(new CopyToClipboardStore());