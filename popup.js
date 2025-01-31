document.addEventListener("DOMContentLoaded", function () {
    const themeSelector = document.getElementById("theme-selector");
    const applyButton = document.getElementById("apply-theme");

    // Load saved theme
    chrome.storage.sync.get("selectedTheme", function (data) {
        if (data.selectedTheme) {
            themeSelector.value = data.selectedTheme;
        }
    });

    applyButton.addEventListener("click", function () {
        const selectedTheme = themeSelector.value;

        // Save selection
        chrome.storage.sync.set({ selectedTheme });

        // Send message to content script
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length === 0) return;
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: applyTheme,
                args: [selectedTheme]
            });
        });
    });
});

// Function to inject the selected theme
function applyTheme(themeFile) {
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
