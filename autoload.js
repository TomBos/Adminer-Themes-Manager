document.addEventListener("DOMContentLoaded", function () {
    // Load saved theme from storage
    document.body.style.animation = "none";
    chrome.storage.sync.get("selectedTheme", function (data) {
        const themeFile = data.selectedTheme || "default-theme.minified.css"; // Default theme if no selection is saved

        fetch(chrome.runtime.getURL("themes/" + themeFile))
            .then(response => response.text())
            .then(css => {
                // Create a <style> element and inject the CSS directly into the document's head
                const style = document.createElement("style");
                style.textContent = css;
                document.head.appendChild(style);

                // Now that the CSS is applied, you can allow content to be visible
                document.documentElement.style.visibility = 'visible';
            });
    });
});
