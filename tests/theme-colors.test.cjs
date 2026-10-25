const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { test } = require('node:test');

const content = fs.readFileSync('js/content.js', 'utf8');
const context = vm.createContext({
    options: {},
    window: { matchMedia: () => ({ matches: false }) }
});
vm.runInContext(fs.readFileSync('js/themes.js', 'utf8') + '\n' +
    fs.readFileSync('css/darkmodecss.js', 'utf8') + '\n' +
    content.slice(content.indexOf('const BC_LIGHT_DEFAULTS'), content.indexOf('let darkStyleInserted')) + '\n' +
    'globalThis.paletteAPI = { themes, activeThemeValues, generateDarkModeCSS, isDarkModeActive, themeRGB, themeLuminance, themeContrast };', context);
const api = context.paletteAPI;
const luminance = value => api.themeLuminance(api.themeRGB(value));
const contrast = (a, b) => api.themeContrast(api.themeRGB(a), api.themeRGB(b));
const urls = value => value.match(/url\([^)]*\)/gi) || [];

for (const theme of api.themes) {
    test(`${theme.title}: both modes have themed surfaces and readable colors`, () => {
        const original = JSON.stringify(theme.exports);
        context.options = theme.exports;
        for (const dark of [false, true]) {
            const palette = api.activeThemeValues(dark);
            for (const bg of ['background-0', 'background-1', 'background-2']) {
                assert.ok(dark ? luminance(palette[bg]) <= 0.08 : luminance(palette[bg]) >= 0.65, `${bg}: ${palette[bg]}`);
                for (const text of ['text-0', 'text-1', 'text-2', 'links']) {
                    assert.ok(contrast(palette[text], palette[bg]) >= (text === 'text-0' ? 7 : 4.5), `${text} on ${bg}`);
                }
            }
            if (!dark) assert.ok(luminance(palette['text-0']) <= 0.035);
            assert.ok(contrast(palette.borders, palette['background-0']) >= 1.5, 'visible borders');
            const stops = palette.sidebar.replace(/url\([^)]*\)/gi, '').match(/#[a-f\d]{8}\b|#[a-f\d]{6}\b|#[a-f\d]{3}\b/gi) || [];
            for (const hex of stops) {
                const rgb = api.themeRGB(hex.length === 9 ? hex.slice(0, 7) : hex);
                const alpha = hex.length === 9 ? parseInt(hex.slice(7), 16) / 255 : 1;
                const bg = rgb.map(c => c * alpha + (dark ? 255 : 0) * (1 - alpha));
                assert.ok(api.themeContrast(api.themeRGB(palette['sidebar-text']), bg) >= 4.5, 'sidebar text contrast');
            }
            assert.deepEqual(urls(palette.sidebar), urls(theme.exports.dark_preset.sidebar));
        }
        assert.equal(JSON.stringify(theme.exports), original, 'saved colors and images must remain intact');
    });
}

test('suitable existing colors survive unchanged', () => {
    context.options = api.themes.find(theme => theme.title === 'Ocean').exports;
    const palette = api.activeThemeValues(true);
    assert.equal(palette['background-0'], context.options.dark_preset['background-0']);
    assert.equal(palette.links, context.options.dark_preset.links);
    assert.equal(palette['text-0'], context.options.dark_preset['text-0']);
});

test('explicit light and dark modes apply full color rules and native control appearance', () => {
    for (const dark_mode of [false, true]) {
        context.options = { ...api.themes[0].exports, dark_mode };
        const css = api.generateDarkModeCSS();
        assert.ok(css.includes('#breadcrumbs'));
        assert.ok(css.includes('color: var(--bclink-text, #ffffff)'));
        const selectedText = css.match(/--bclink-text: (#[a-f\d]{6})/i)[1];
        assert.ok(contrast(selectedText, api.activeThemeValues(dark_mode).links) >= 4.5);
        assert.ok(css.includes(`--bcbackground-0: ${api.activeThemeValues(dark_mode)['background-0']}`));
        assert.ok(css.includes(`color-scheme: ${dark_mode ? 'dark' : 'light'}`));
        assert.equal(api.isDarkModeActive(), dark_mode);
    }
});

test('system mode supplies both palettes and follows OS changes', () => {
    context.options = { ...api.themes[0].exports, device_dark: true };
    const css = api.generateDarkModeCSS();
    const mediaIndex = css.indexOf('@media (prefers-color-scheme: dark)');
    assert.ok(mediaIndex > 0);
    assert.ok(css.slice(0, mediaIndex).includes(api.activeThemeValues(false)['background-0']));
    assert.ok(css.slice(mediaIndex).includes(api.activeThemeValues(true)['background-0']));
    for (const matches of [false, true]) {
        context.window.matchMedia = () => ({ matches });
        assert.equal(api.isDarkModeActive(), matches);
        assert.equal(api.activeThemeValues()['background-0'], api.activeThemeValues(matches)['background-0']);
    }
});

test('no theme and partial themes leave unset colors to Canvas', () => {
    context.options = { dark_preset: { 'background-0': null }, dark_mode: true };
    assert.equal(api.generateDarkModeCSS(), '');
    assert.equal(api.isDarkModeActive(), false);
    context.options = { dark_preset: { links: '#809cb7' }, dark_mode: false };
    const css = api.generateDarkModeCSS();
    assert.ok(css.includes('--bclinks:'));
    assert.ok(!css.includes('--bcbackground-0:'));
    assert.ok(!css.includes('var(--bcbackground-0)'));
});

test('sidebar URL fragments are not interpreted as palette colors', () => {
    context.options = { dark_preset: { sidebar: 'linear-gradient(#000000c7, #000000c7), url("https://example.com/#ffffff")' } };
    assert.deepEqual(urls(api.activeThemeValues(false).sidebar), ['url("https://example.com/#ffffff")']);
});

test('selecting a built-in theme preserves Light / Dark / System', async () => {
    const settings = fs.readFileSync('js/settings.js', 'utf8');
    let saved;
    const imports = vm.createContext({
        persistUnsavedTheme: async () => {}, themeSourceReady: Promise.resolve(),
        clearTimeout: () => {}, presetChangeTimeout: null, removedStyleOptions: new Set(),
        cardStyleSetTimers: {}, refreshAppliedThemeControls: () => {},
        chrome: { storage: {
            sync: { get: async () => ({ custom_cards: {} }), set: async value => { saved = value; } },
            local: { set: async () => {} }
        } },
        readThemeValues: preset => ({ ...preset }), sendFromPopup: () => {},
        refreshThemeInputs: () => {}, displayAlert: () => { throw new Error('Import failed'); }
    });
    vm.runInContext(settings.slice(settings.indexOf('async function importTheme('), settings.indexOf('function updateCards(')), imports);
    await imports.importTheme(api.themes[0].exports, { type: 'builtin' });
    assert.ok(!Object.hasOwn(saved, 'dark_mode'));
    assert.ok(!Object.hasOwn(saved, 'device_dark'));
    assert.ok(saved.dark_preset);
    await imports.importTheme(api.themes[0].exports, { type: 'saved' });
    assert.equal(saved.dark_mode, true, 'saved themes retain their explicitly saved appearance');
});

test('legacy saved built-ins resolve to their individual light and dark palettes', () => {
    for (const theme of api.themes) {
        context.options = { dark_preset: { ...theme.originalPreset } };
        for (const dark of [false, true]) {
            assert.deepEqual(api.activeThemeValues(dark), theme.modePalettes[dark ? 1 : 0], theme.title);
        }
    }
});

test('Kirby uses pink surfaces in both modes, with distinct surface levels', () => {
    const kirby = api.themes.find(theme => theme.title.startsWith('Kirby'));
    context.options = { dark_preset: kirby.originalPreset };
    const light = api.activeThemeValues(false), dark = api.activeThemeValues(true);
    assert.equal(light['background-0'], '#fff3f7');
    assert.equal(light['background-1'], '#ffe5ee');
    assert.equal(light['background-2'], '#ffd6e5');
    assert.equal(dark['background-0'], '#240f19');
    assert.equal(dark['background-1'], '#351725');
    assert.equal(dark['background-2'], '#482034');
    for (const palette of [light, dark]) {
        for (const key of ['background-0', 'background-1', 'background-2']) {
            const [r, g, b] = api.themeRGB(palette[key]);
            assert.ok(r > b && b > g, 'pink hue is retained at every surface level');
        }
        assert.equal(new Set(['background-0', 'background-1', 'background-2'].map(key => palette[key])).size, 3);
    }
});

test('all palettes preserve original sidebar image URLs', () => {
    for (const theme of api.themes) for (const palette of theme.modePalettes) {
        assert.deepEqual(urls(palette.sidebar), urls(theme.originalPreset.sidebar));
    }
});

test('built-in palette definitions load before the content script', () => {
    const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
    for (const script of manifest.content_scripts) {
        if (script.js.includes('js/content.js')) {
            assert.ok(script.js.indexOf('js/themes.js') >= 0);
            assert.ok(script.js.indexOf('js/themes.js') < script.js.indexOf('js/content.js'));
        }
    }
});

test('an empty palette releases the extension base styling from Canvas', () => {
    const classes = new Set();
    const style = { id: '', textContent: '', className: '' };
    const toggleContext = vm.createContext({
        options: {},
        document: {
            querySelector: () => style,
            createElement: () => style,
            documentElement: {
                classList: { toggle(name, force) { force ? classes.add(name) : classes.delete(name); } }
            }
        },
        generateDarkModeCSS: () => 'palette css',
        isDarkModeActive: () => false,
        teardownSubmissionTrayFixes() {}, setupSubmissionTrayWatcher() {}, runiframeChecker() {},
    });
    vm.runInContext(content.slice(content.indexOf('const BC_LIGHT_DEFAULTS'), content.indexOf('function sourceThemeValues()')), toggleContext);
    vm.runInContext(content.slice(content.indexOf('function sourceThemeValues()'), content.indexOf('function isDarkModeActive()')), toggleContext);
    vm.runInContext(content.slice(content.indexOf('function toggleDarkMode()'), content.indexOf('let iframeObserver')), toggleContext);

    toggleContext.options = { dark_preset: { links: '#809cb7' } };
    toggleContext.toggleDarkMode();
    assert.ok(classes.has('canvasrefined-theme-active'), 'active palettes keep the theme styling');
    toggleContext.options = { dark_preset: { links: null } };
    toggleContext.toggleDarkMode();
    assert.ok(!classes.has('canvasrefined-theme-active'), 'No Theme removes the theme styling class');

    const css = fs.readFileSync('css/content.css', 'utf8');
    assert.match(css, /:root\.canvasrefined-theme-active:has\(\.ic-app-header\) body/);
    assert.match(css, /:root\.canvasrefined-theme-active:has\(\.ic-app-header\) \.ic-DashboardCard/);
    assert.doesNotMatch(css, /^\.ic-DashboardCard__header_hero \{border:0/m, 'the card chrome reset must be theme-scoped');
});
