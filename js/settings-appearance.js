// The settings pages share Canvas's existing Light / Dark / System preference.
(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    let preference = {};
    function apply() {
        const dark = preference.device_dark === true ? media.matches : preference.dark_mode !== false;
        document.documentElement.dataset.settingsTheme = dark ? "dark" : "light";
    }
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area !== "sync") return;
        for (const key of ["dark_mode", "device_dark"]) {
            if (changes[key]) preference[key] = changes[key].newValue;
        }
        apply();
    });
    media.addEventListener("change", apply);
    chrome.storage.sync.get(["dark_mode", "device_dark"], stored => {
        preference = stored;
        apply();
    });
})();
