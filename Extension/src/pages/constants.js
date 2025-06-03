// eslint-disable max-len
export const ADGUARD_EXTENSION_STORE_URL = (action) => {
    return `https://link.adtidy.org/forward.html?action=${action}&from=options_screen&app=browser_extension`;
};
export const ADGUARD_OPEN_SITE_REPORT_URL = (url, from) => {
    return `https://link.adtidy.org/forward.html?action=site_report_page&domain=${url}&from=${from}&app=browser_extension`;
};
export const ADGUARD_UNINSTALL_URL = 'https://link.adtidy.org/forward.html?action=adguard_uninstal_ext&from=background&app=browser_extension';
export const ADGUARD_COMPARE_URL = 'https://link.adtidy.org/forward.html?action=compare&from=popup&app=browser_extension';
export const ADGUARD_ADBLOCKED_URL = 'https://link.adtidy.org/forward.html?action=adguard_site&from=adblocked&app=browser_extension';
export const ADGUARD_OFFER_BUTTON_URL = 'https://link.adtidy.org/forward.html?action=learn_about_adguard&from=version_popup&app=browser_extension';
export const ADGUARD_CHANGELOG_URL = 'https://link.adtidy.org/forward.html?action=github_version_popup&from=version_popup&app=browser_extension';
export const ADGUARD_SAFEBROWSING_URL = 'https://link.adtidy.org/forward.html?action=adguard_site&from=safebrowsing&app=browser_extension';
export const THANKYOU_PAGE_URL = 'https://link.adtidy.org/forward.html?action=thank_you_page&from=background&app=browser_extension';
export const PRIVACY_URL = 'https://link.adtidy.org/forward.html?action=privacy&from=options_screen&app=browser_extension';
export const ACKNOWLEDGMENTS_URL = 'https://link.adtidy.org/forward.html?action=acknowledgments&from=options_screen&app=browser_extension';
export const GITHUB_URL = 'https://link.adtidy.org/forward.html?action=github_options&from=options_screen&app=browser_extension';
export const WEBSITE_URL = 'https://link.adtidy.org/forward.html?action=adguard_site&from=options_screen_footer&app=browser_extension';
export const DISCUSS_URL = 'https://link.adtidy.org/forward.html?action=discuss&from=options_screen&app=browser_extension';
export const COMPARE_URL = 'https://link.adtidy.org/forward.html?action=compare&from=options_screen&app=browser_extension';
export const CHANGELOG_URL = 'https://link.adtidy.org/forward.html?action=github_version_popup&from=options_screen&app=browser_extension';
export const GLOBAL_PRIVACY_CONTROL_URL = 'https://link.adtidy.org/forward.html?action=global_privacy_control&from=options_screen&app=browser_extension';
export const DO_NOT_TRACK_URL = 'https://link.adtidy.org/forward.html?action=do_not_track&from=options_screen&app=browser_extension';
export const HOW_TO_CREATE_RULES_URL = 'https://link.adtidy.org/forward.html?action=userfilter_description&from=options&app=browser_extension';
export const ACCEPTABLE_ADS_LEARN_MORE_URL = 'https://link.adtidy.org/forward.html?action=self_promotion&from=options_screen&app=browser_extension';
export const SAFEBROWSING_LEARN_MORE_URL = 'https://link.adtidy.org/forward.html?action=protection_works&from=options_screen&app=browser_extension';
export const COLLECT_HITS_LEARN_MORE_URL = 'https://link.adtidy.org/forward.html?action=filter_rules&from=options_screen&app=browser_extension';
export const FOOTER_LINK_TO_IOS = 'https://link.adtidy.org/forward.html?action=ios_about&from=popup&app=browser_extension';
export const FOOTER_LINK_TO_ANDROID = 'https://link.adtidy.org/forward.html?action=android_about&from=popup&app=browser_extension';
export const DEFAULT_FIRST_PARTY_COOKIES_SELF_DESTRUCT_MIN = 4320;
export const DEFAULT_THIRD_PARTY_COOKIES_SELF_DESTRUCT_MIN = 2880;

export const APPEARANCE_THEMES = {
    SYSTEM: 'system',
    DARK: 'dark',
    LIGHT: 'light'
};

export const BROWSER_ADDON_STORE_LINKS = {
    CHROME: 'https://agrd.io/extension_chrome',
    FIREFOX: 'https://agrd.io/extension_firefox',
    OPERA: 'https://agrd.io/extension_opera',
    EDGE: 'https://agrd.io/extension_edge'
};