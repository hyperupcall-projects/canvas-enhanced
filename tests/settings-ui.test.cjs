const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { test } = require('node:test');

test('settings appearance follows saved modes and live OS changes', () => {
    for (const initial of [{}, { dark_mode: false }, { device_dark: true }]) {
        const root = { dataset: {} };
        let storageChange, mediaChange;
        const media = { matches: false, addEventListener: (_, fn) => { mediaChange = fn; } };
        vm.runInNewContext(fs.readFileSync('js/settings-appearance.js', 'utf8'), {
            document: { documentElement: root }, window: { matchMedia: () => media },
            chrome: { storage: {
                sync: { get: (_, callback) => callback(initial) },
                onChanged: { addListener: fn => { storageChange = fn; } }
            } }
        });
        assert.equal(root.dataset.settingsTheme, initial.dark_mode === false || initial.device_dark ? 'light' : 'dark');
        const update = values => storageChange(Object.fromEntries(Object.entries(values).map(([key, newValue]) => [key, { newValue }])), 'sync');
        update({ dark_mode: false, device_dark: false });
        media.matches = true; mediaChange();
        assert.equal(root.dataset.settingsTheme, 'light', 'explicit Light ignores OS');
        update({ dark_mode: true });
        media.matches = false; mediaChange();
        assert.equal(root.dataset.settingsTheme, 'dark', 'explicit Dark ignores OS');
        update({ device_dark: true });
        assert.equal(root.dataset.settingsTheme, 'light');
        media.matches = true; mediaChange();
        assert.equal(root.dataset.settingsTheme, 'dark');
        storageChange({ dark_mode: { newValue: false } }, 'local');
        assert.equal(root.dataset.settingsTheme, 'dark', 'local changes do not affect sync preferences');
    }
});

test('settings and theme exports contain separate fields and keep personal data out', async () => {
    const popup = fs.readFileSync('js/popup.js', 'utf8');
    const elements = new Map();
    function element(id) {
        if (!elements.has(id)) elements.set(id, { id, value: '', textContent: id, checked: false, listeners: {}, addEventListener(type, fn) { this.listeners[type] = fn; } });
        return elements.get(id);
    }
    const checks = ['export-dark', 'export-cards', 'export-colors', 'export-card-styles'].map(element);
    const stored = {
        assignments_due: true, better_todo: false, gpa_calc_bounds: { A: { cutoff: 90, gpa: 4 } },
        dark_mode: false, device_dark: true, dark_preset: { links: '#123456' },
        cardRoundness: 7, gradient_cards: true,
        card_colors: ['#123456'], custom_cards: { 42: { img: 'https://example.com/card.png', name: 'Private course' } },
        dashboard_notes_text: 'Private notes', custom_assignments: ['Private task'], assignment_states: { 123: true },
        custom_domain: ['private.example.com']
    };
    const context = vm.createContext({
        document: { getElementById: element, querySelectorAll: () => checks },
        chrome: { storage: { sync: { get: async keys => Object.fromEntries(keys.filter(key => key in stored).map(key => [key, stored[key]])) } } },
        sendFromPopup: async () => null, setTimeout, navigator: {}, displayAlert: () => {}
    });
    vm.runInContext(popup.slice(0, popup.indexOf('const apiurl')), context);
    vm.runInContext(popup.slice(popup.indexOf('// Settings exports omit'), popup.indexOf('const trackedThemeOptions')), context);
    context.setupExports();
    await element('settings-export').listeners.click();
    const settings = JSON.parse(element('settings-export-output').value);
    assert.deepEqual(settings, { assignments_due: true, better_todo: false, gpa_calc_bounds: stored.gpa_calc_bounds });
    await element('export-check-all').listeners.click();
    // The click handler starts an async storage read followed by getExport.
    await new Promise(resolve => setImmediate(resolve));
    const theme = JSON.parse(element('export-output').value);
    assert.deepEqual(theme, {
        dark_preset: stored.dark_preset, dark_mode: false, device_dark: true,
        custom_cards: ['https://example.com/card.png'], card_colors: stored.card_colors,
        gradient_cards: true, cardRoundness: 7
    });
    await element('export-check-none').listeners.click();
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(element('export-output').value, '{}');
});
