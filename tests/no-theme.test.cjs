const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { test } = require('node:test');
const settings = fs.readFileSync('js/settings.js', 'utf8');
const content = fs.readFileSync('js/content.js', 'utf8');

test('No Theme resets appearance defaults and images while preserving course data and feature preferences', async () => {
    const stored = {
        dark_mode: false, device_dark: true, better_todo: false, gpa_calc: true,
        custom_assignments: ['Keep my task'],
        dark_preset: { sidebar: 'url("old.jpg")', links: '#ff0000' },
        cardWidth: 300, cardHeight: 200, cardPadding: 20, cardRoundness: 99,
        cardSpacing: 40, imageSize: 200, gradient_cards: true, disable_color_overlay: true,
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
    vm.runInContext(settings.slice(0, settings.indexOf('sendFromPopup("getCards")')), context);
    vm.runInContext(settings.slice(settings.indexOf('function emptyThemeValues()'), settings.indexOf('let highContrastWarningRequest')), context);
    vm.runInContext(settings.slice(settings.indexOf('async function importTheme('), settings.indexOf('function updateCards(')), context);
    await context.importTheme(context.noThemeSettings(), { type: 'builtin', key: 'No Theme' });
    assert.equal(stored.cardWidth, 262);
    assert.equal(stored.cardPadding, 0);
    assert.equal(stored.imageSize, 100);
    assert.equal(stored.cardMargin, 36);
    assert.equal(stored.gradient_cards, false);
    assert.equal(stored.disable_color_overlay, false);
    assert.ok(Object.values(stored.dark_preset).every(value => value === null));
    assert.deepEqual(stored.custom_cards[42], { img: '', name: 'My course', hidden: true });
    assert.equal(stored.dark_mode, false);
    assert.equal(stored.device_dark, true);
    assert.equal(stored.better_todo, false);
    assert.equal(stored.gpa_calc, true);
    assert.deepEqual(stored.custom_assignments, ['Keep my task']);
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

test('card margin uses actual pixels, supports zero and ignores removed height and border settings', () => {
    const style = { textContent: '' };
    const context = vm.createContext({
        options: {}, quizSafeModeActive: () => false,
        document: {
            querySelector: selector => selector === '#canvasrefined-aesthetics' ? style : null,
            documentElement: { appendChild() {} },
        },
    });
    vm.runInContext(content.slice(content.indexOf('function applyAestheticChanges()'), content.indexOf('function setupQuizSafeModeBanner()')), context);
    for (const [options, margin] of [
        [{}, null], [{ cardMargin: 36 }, null],
        [{ cardMargin: 0 }, 0], [{ cardMargin: '0' }, 0], [{ cardMargin: '24' }, 24],
        [{ cardSpacing: 0 }, null], [{ cardSpacing: '40' }, 20],
        [{ cardMargin: 12, cardSpacing: 100 }, 12],
    ]) {
        context.options = { ...options, cardHeight: 300, cardRoundness: 99 };
        context.applyAestheticChanges();
        assert.doesNotMatch(style.textContent, /height:|border-radius:/);
        if (margin === null) assert.doesNotMatch(style.textContent, /margin-/);
        else {
            assert.ok(style.textContent.includes(`margin-right: ${margin}px!important`));
            assert.ok(style.textContent.includes(`margin-bottom: ${margin}px!important`));
        }
    }
    context.options = { condensed_cards: true };
    context.applyAestheticChanges();
    assert.match(style.textContent, /height:60px!important/);
});

test('older themes preserve card spacing without restoring height or border controls', async () => {
    const stored = { custom_cards: {} };
    const context = vm.createContext({
        persistUnsavedTheme: async () => {}, themeSourceReady: Promise.resolve(),
        presetChangeTimeout: null, cardStyleSetTimers: {}, clearTimeout() {},
        chrome: { storage: {
            sync: { get: async () => stored, set: async values => Object.assign(stored, values) },
            local: { set: async () => {} },
        } },
        themeValues: null, refreshAppliedThemeControls() {}, refreshThemeInputs() {},
        displayAlert: (_, text) => assert.fail(text),
    });
    vm.runInContext(settings.slice(0, settings.indexOf('sendFromPopup("getCards")')), context);
    vm.runInContext(settings.slice(settings.indexOf('async function importTheme('), settings.indexOf('function updateCards(')), context);
    for (const [theme, margin] of [
        [{ cardSpacing: 0 }, 36], [{ cardSpacing: '40' }, 20],
        [{ cardSpacing: '0' }, 0], [{ cardMargin: 10, cardSpacing: 100 }, 10],
    ]) {
        await context.importTheme({ ...theme, cardRoundness: 99, cardHeight: 300, bold_sidebar_text: true,
            gpa_calc_cumulative: true, cumulative_gpa: { gr: 3.21, credits: 999 }, gpa_calc_weighted: false });
        assert.equal(stored.cardMargin, margin);
        for (const key of ['cardRoundness', 'cardHeight', 'cardSpacing', 'bold_sidebar_text', 'gpa_calc_cumulative', 'cumulative_gpa', 'gpa_calc_weighted']) assert.ok(!(key in stored));
    }
});

test('extension updates migrate legacy margins once before removing obsolete settings', async () => {
    const background = fs.readFileSync('js/background.js', 'utf8');
    for (const [initial, margin] of [
        [{}, 36], [{ cardSpacing: 0 }, 36], [{ cardSpacing: '40' }, 20],
        [{ cardSpacing: '0' }, 0], [{ cardMargin: 0, cardSpacing: 40 }, 0],
    ]) {
        const retiredGpa = { gpa_calc_cumulative: true, cumulative_gpa: { gr: 3.21, credits: 999 }, gpa_calc_weighted: false };
        const stored = { ...initial, ...retiredGpa, new_install: false, cardHeight: 300, cardRoundness: 99, bold_sidebar_text: true };
        const local = { bold_sidebar_text: true, ...retiredGpa };
        let installed;
        const area = data => ({
            get: (_, callback) => callback(structuredClone(data)),
            set: async values => Object.assign(data, values),
            remove: keys => { for (const key of [].concat(keys)) delete data[key]; },
        });
        const context = vm.createContext({
            console: { log() {} },
            chrome: {
                action: { onClicked: { addListener() {} } },
                runtime: { onMessage: { addListener() {} }, onInstalled: { addListener(fn) { installed = fn; } } },
                storage: { sync: area(stored), local: area(local) },
            },
        });
        vm.runInContext(background, context);
        installed();
        await new Promise(resolve => setImmediate(resolve));
        assert.equal(stored.cardMargin, margin);
        for (const key of ['cardSpacing', 'cardHeight', 'cardRoundness', 'bold_sidebar_text', ...Object.keys(retiredGpa)]) assert.ok(!(key in stored));
        assert.ok(!('bold_sidebar_text' in local));
        for (const key of Object.keys(retiredGpa)) assert.ok(!(key in local));
        installed();
        await new Promise(resolve => setImmediate(resolve));
        assert.equal(stored.cardMargin, margin);
    }
});
