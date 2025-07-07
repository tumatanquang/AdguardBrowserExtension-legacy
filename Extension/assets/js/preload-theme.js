import { APPEARANCE_THEMES } from '../../src/pages/constants';
/*
    this script is injected at the top of the page to display
    the desired color theme before the main bundle is loaded
*/
(function () {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const theme = urlSearchParams.get('theme');
    /*
        if theme parameter is missing or a system theme is selected,
        the desired color is selected using the css media query
    */
    if (!theme || theme === APPEARANCE_THEMES.SYSTEM) {
        return;
    }
    // the color changes through the selector so that it could be rewritten by css from the main bundle
    switch (theme) {
        case APPEARANCE_THEMES.DARK:
            document.body.classList.add('body_dark');
            break;
        case APPEARANCE_THEMES.LIGHT:
            document.body.classList.add('body_light');
            break;
    }
})();