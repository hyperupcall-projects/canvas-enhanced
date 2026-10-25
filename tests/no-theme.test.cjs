const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { test } = require('node:test');
const popup = fs.readFileSync('js/popup.js', 'utf8');
const content = fs.readFileSync('js/content.js', 'utf8');

test('No Theme resets appearance defaults and images while preserving course data and feature preferences', async () => {
    const stored = {
        dark_mode: false, device_dark: true, better_todo: false, gpa_calc: true,
        dashboard_notes_text: 'Keep my notes',
        dark_preset: { sidebar: 'url("old.jpg")', links: '#ff0000' },
        cardWidth: 300, cardHeight: 200, cardPadding: 20, cardRoundness: 99,
        cardSpacing: 40, imageSize: 200, gradient_cards: true, disable_color_overlay: true,
        bold_sidebar_text: true,
        custom_cards: { 42: { img: 'old.jpg', name: 'My course', hidden: true } },
    };
    const messages = [], cancelled = [], inputs = {};
    const context = vm.createContext({
        persistUnsavedTheme: async () => {}, themeSourceReady: Promise.resolve(),
        presetChangeTimeout: 100, cardStyleSetTimers: { cardWidth: 101 },
        clearTimeout: id => cancelled.push(id),
        chrome: { storage: {
            sync: { get: async () => structuredClone(stored), set: async values => Object.assign(stored, values) },
            local: { set: async () => {} },
        } },
        document: { getElementById: key => inputs[key] ||= { querySelector: () => null } },
        sendFromPopup: (...args) => messages.push(args), refreshThemeInputs: () => {},
        displayAlert: (_, text) => assert.fail(text),
    });
    vm.runInContext(popup.slice(0, popup.indexOf('sendFromPopup("getCards")')), context);
    vm.runInContext(popup.slice(popup.indexOf('function emptyThemeValues()'), popup.indexOf('let highContrastWarningRequest')), context);
    vm.runInContext(popup.slice(popup.indexOf('async function importTheme('), popup.indexOf('function updateCards(')), context);
    await context.importTheme(context.noThemeSettings(), { type: 'builtin', key: 'No Theme' });
    assert.equal(stored.cardWidth, 262);
    assert.equal(stored.cardHeight, 146);
    assert.equal(stored.cardPadding, 0);
    assert.equal(stored.imageSize, 100);
    assert.equal(stored.cardRoundness, 5);
    assert.equal(stored.cardSpacing, 0);
    assert.equal(stored.gradient_cards, false);
    assert.equal(stored.disable_color_overlay, false);
    assert.equal(stored.bold_sidebar_text, false);
    assert.ok(Object.values(stored.dark_preset).every(value => value === null));
    assert.deepEqual(stored.custom_cards[42], { img: '', name: 'My course', hidden: true });
    assert.equal(stored.dark_mode, false);
    assert.equal(stored.device_dark, true);
    assert.equal(stored.better_todo, false);
    assert.equal(stored.gpa_calc, true);
    assert.equal(stored.dashboard_notes_text, 'Keep my notes');
    assert.equal(inputs.cardWidth.value, 262);
    assert.ok(cancelled.includes(101), 'pending input cannot overwrite reset');
    assert.ok(messages.some(([name, colors]) => name === 'setcolors' && colors.length === 0));
});

test('clearing a theme image restores the original image and opacity, including cards without an image', () => {
    for (const hasImage of [true, false]) {
        const hero = { style: { opacity: '' } };
        let container = hasImage ? { style: { backgroundImage: 'url("course.jpg")' }, appendChild() {} } : null;
        const original = container;
        const header = { prepend() {} };
        const card = { querySelector(selector) {
            if (selector.endsWith('__header_hero')) return hero;
            if (selector.endsWith('__header_image')) return container;
            return header;
        } };
        const context = vm.createContext({ makeElement: () => container = {
            style: {}, appendChild() {}, remove() { container = null; },
        } });
        vm.runInContext(content.slice(content.indexOf('const originalCardImages'), content.indexOf('function customizeCards(')), context);
        context.applyCardImage(card, 'theme.jpg');
        context.applyCardImage(card, 'other-theme.jpg');
        assert.equal(container.style.backgroundImage, 'url("other-theme.jpg")');
        context.applyCardImage(card, '');
        assert.equal(container, original);
        if (hasImage) assert.equal(container.style.backgroundImage, 'url("course.jpg")');
        assert.equal(hero.style.opacity, '');
    }
});

test('empty palette restores pre-theme colors by school and course after previews, reordering and theme changes', async () => {
    const local = {}, puts = [], timers = new Map();
    let timerId = 0, school = 'https://school.example';
    let ids = ['42', '70'];
    const colors = { course_42: '#123456', course_70: '#abcdef' };
    const context = vm.createContext({
        domain: school, colorChanges: [], changeColorInterval: null,
        options: { custom_cards_3: { 42: { name: "Keep metadata" } } }, changeFavicon() {},
        document: { querySelectorAll: () => [] },
        getPaletteCards: async () => ({ cards: ids.map(id => ({ href: school + '/courses/' + id, el: null })), apiColors: colors }),
        CSRFtoken: () => 'token', changeGradientCards() {}, logError: error => assert.fail(error),
        clearInterval: id => timers.delete(id), setInterval: fn => { timers.set(++timerId, fn); return timerId; },
        chrome: { storage: { sync: { set: async () => {} }, local: {
            get: async (_, callback) => callback ? callback(structuredClone(local)) : structuredClone(local),
            set: async values => Object.assign(local, structuredClone(values)),
        } } },
        fetch: async (url, options) => {
            const id = url.split('courses_')[1];
            const color = JSON.parse(options.body).hexcode;
            colors['course_' + id] = color;
            puts.push([id, color]);
        },
    });
    vm.runInContext(content.slice(content.indexOf('function refreshCourseColorUI()'), content.indexOf('/*\nDark mode')), context);
    const drain = () => { for (let i = 0; i < 5; i++) for (const fn of [...timers.values()]) fn(); };
    await context.changeColorPreset(['#ff0000'], true);
    assert.equal(puts.length, 0, 'preview never writes to Canvas');
    assert.equal(context.options.custom_cards_3[42].color, '#ff0000');
    assert.equal(context.options.custom_cards_3[42].name, 'Keep metadata');
    assert.deepEqual(local, {}, 'preview never changes saved revert colors');
    await context.changeColorPreset(['#ff0000']); drain();
    await context.changeColorPreset(['#00ff00']); drain();
    ids = ['70', '42'];
    puts.length = 0;
    await context.changeColorPreset([]); drain();
    assert.deepEqual(puts, [['70', '#abcdef'], ['42', '#123456']]);
    assert.equal(context.options.custom_cards_3[42].color, '#123456');
    assert.equal(context.options.custom_cards_3[70].color, '#abcdef');
    assert.deepEqual(local.theme_original_colors[school], { 42: '#123456', 70: '#abcdef' });
    context.domain = school = 'https://other.example';
    colors.course_42 = '#112233'; colors.course_70 = '#445566';
    await context.changeColorPreset(['#ff0000']); drain();
    puts.length = 0;
    await context.changeColorPreset([]); drain();
    assert.deepEqual(puts, [['70', '#445566'], ['42', '#112233']]);
});
