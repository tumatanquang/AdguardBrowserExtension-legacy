import React, { useContext } from 'react';
import { observer } from 'mobx-react';

import { reactTranslator } from '../../../../common/translators/reactTranslator';
import { popupStore } from '../../stores/PopupStore';
import { Icon } from '../../../common/components/ui/Icon';
import { FOOTER_LINK_TO_IOS, FOOTER_LINK_TO_ANDROID } from '../../../constants';

import './footer.pcss';

export const Footer = observer(() => {
    const store = useContext(popupStore);

    const isShowFooterContent = store.showAdguardPromoInfo;
    let footerContent;
    if (store.isEdgeBrowser) {
        const currentYear = new Date().getFullYear();
        const footerText = `© 2009 - ${currentYear} AdGuard Software Ltd`;
        footerContent = <div className='footer__text'>{footerText}</div>;
    }
    else {
        footerContent = (
            <>
                <div className='footer__text'>{reactTranslator.getMessage('popup_adguard_footer_title')}</div>
                <div className='footer__platforms'>
                    <a
                        href={FOOTER_LINK_TO_IOS}
                        target='_blank'
                        rel='noreferrer'
                        className='footer__link'
                        title={reactTranslator.getMessage('popup_adguard_for_ios')}
                    >
                        <Icon
                            id='#apple'
                            classname='footer__icon'
                        />
                    </a>
                    <a
                        href={FOOTER_LINK_TO_ANDROID}
                        target='_blank'
                        rel='noreferrer'
                        className='footer__link'
                        title={reactTranslator.getMessage('popup_adguard_for_android')}
                    >
                        <Icon
                            id='#android'
                            classname='footer__icon'
                        />
                    </a>
                </div>
            </>
        );
    }

    return (
        isShowFooterContent && <div className='footer'>{footerContent}</div>
    );
});