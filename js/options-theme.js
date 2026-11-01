(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
        document.documentElement.dataset.settingsTheme = media.matches ? "dark" : "light";
    };
    apply();
    media.addEventListener("change", apply);
})();
