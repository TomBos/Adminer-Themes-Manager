(function () {
    window.addEventListener('DOMContentLoaded', function () {
        chrome.storage.sync.get("selectedTheme", function (data) {
            const themeFile = data.selectedTheme;

            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                if (tabs.length === 0) return;

                chrome.scripting.executeScript({
                    target: {tabId: tabs[0].id},
                    func: applyThemeOnLoad,
                    args: [themeFile]
                });
            });
        });
    });
})();

function applyThemeOnLoad(themeFile) {
        const existingLink = document.getElementById("adminer-theme");
        if (existingLink) {
            existingLink.href = chrome.runtime.getURL("themes/" + themeFile);
        } else {
            const link = document.createElement("link");
            link.id = "adminer-theme";
            link.rel = "stylesheet";
            link.href = chrome.runtime.getURL("themes/" + themeFile);
            document.head.appendChild(link);
        }
}
