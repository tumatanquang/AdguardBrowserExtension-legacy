const { log } = console;
document.addEventListener('DOMContentLoaded', () => {
    // Init
    const openAssistantButton = document.getElementById('openAssistant');
    openAssistantButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            const currentTab = tabs[0];
            const { url } = currentTab;
            log(`Opening Assistant UI for tab id=${currentTab.id} url=${url}`);
            await chrome.runtime.sendMessage({ type: 'openAssistantInTab', data: { tabId: currentTab.id } });
            window.close();
        });
    });
});
