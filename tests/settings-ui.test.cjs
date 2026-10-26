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
    const settings = fs.readFileSync('js/settings.js', 'utf8');
    const elements = new Map();
    function element(id) {
        if (!elements.has(id)) elements.set(id, { id, value: '', textContent: id, checked: false, listeners: {}, addEventListener(type, fn) { this.listeners[type] = fn; } });
        return elements.get(id);
    }
    const stored = {
        bold_sidebar_text: true,
        gpa_calc_cumulative: true, cumulative_gpa: { gr: 3.21, credits: 999 }, gpa_calc_weighted: false,
        assignments_due: true, better_todo: false, gpa_calc_bounds: { A: { cutoff: 90, gpa: 4 } },
        dark_mode: false, device_dark: true, dark_preset: { links: '#123456' },
        cardRoundness: 7, cardHeight: 200, cardMargin: 24, gradient_cards: true,
        card_colors: ['#123456'], custom_cards: { 42: { img: 'https://example.com/card.png', name: 'Private course' } },
        custom_assignments: ['Private task'], assignment_states: { 123: true },
        custom_domain: ['private.example.com']
    };
    const context = vm.createContext({
        document: { getElementById: element },
        chrome: { storage: { sync: { get: async keys => Object.fromEntries(keys.filter(key => key in stored).map(key => [key, stored[key]])) } } },
        sendFromPopup: async () => null, setTimeout, navigator: {}, displayAlert: () => {}
    });
    vm.runInContext(settings.slice(0, settings.indexOf('const apiurl')), context);
    vm.runInContext(settings.slice(settings.indexOf('// Settings exports omit'), settings.indexOf('const trackedThemeOptions')), context);
    context.setupExports();
    await element('settings-export').listeners.click();
    const exportedSettings = JSON.parse(element('settings-export-output').value);
    assert.deepEqual(exportedSettings, { assignments_due: true, better_todo: false, gpa_calc_bounds: stored.gpa_calc_bounds });
    await new Promise(resolve => setImmediate(resolve));
    const theme = JSON.parse(element('export-output').value);
    assert.deepEqual(theme, {
        dark_preset: stored.dark_preset, dark_mode: false, device_dark: true,
        custom_cards: ['https://example.com/card.png'], card_colors: stored.card_colors,
        gradient_cards: true, cardMargin: 24
    });
});

test('every dependent section stays visible and dims as a whole when its parent toggle is off', () => {
    const settings = fs.readFileSync('js/settings.js', 'utf8');
    const sections = new Map();
    for (const id of ['assignments_due', 'dashboard_grades', 'gpa_calc', 'better_todo', 'hide_personal_details']) {
        const controls = ['input', 'select', 'textarea', 'button'].map(tag => ({ tag, disabled: false, value: 'saved value', checked: true }));
        const classes = new Set();
        const attributes = {};
        sections.set(id, {
            controls, attributes, classes,
            style: { display: '' },
            inert: false,
            classList: { toggle(name, on) { if (on) classes.add(name); else classes.delete(name); } },
            setAttribute(name, value) { attributes[name] = value; },
            querySelectorAll(selector) {
                assert.equal(selector, 'input, select, textarea, button');
                return controls;
            }
        });
    }
    const context = vm.createContext({
        document: {
            getElementById(id) {
                const sub = sections.get(id);
                return sub ? { parentElement: { querySelector(selector) {
                    assert.equal(selector, ':scope > .sub-options');
                    return sub;
                } } } : null;
            }
        }
    });
    vm.runInContext(settings.slice(settings.indexOf('function setSubOptionsDisabled'), settings.indexOf('function setup()')), context);
    for (const [id, section] of sections) {
        for (const isOn of [false, true, false, true]) {
            context.updateSubOptionsState(id, isOn);
            assert.equal(section.style.display, '', `${id} stays visible`);
            assert.equal(section.classes.has('section-disabled'), !isOn, `${id} dims the whole section`);
            assert.equal(section.inert, !isOn, `${id} blocks all interactions, including custom disclosure controls`);
            assert.equal(section.attributes['aria-disabled'], String(!isOn));
            assert.ok(section.controls.every(el => el.disabled === !isOn));
            assert.ok(section.controls.every(el => el.value === 'saved value' && el.checked), 'saved child values survive toggling');
        }
    }
    context.updateSubOptionsState('unknown_option', false);
});

test('course list is a visibility table and no longer renames courses', async () => {
    const settings = fs.readFileSync('js/settings.js', 'utf8');
    const html = fs.readFileSync('html/settings.html', 'utf8');
    const content = fs.readFileSync('js/content.js', 'utf8');
    const cardsPanel = html.slice(html.indexOf('id="cards-panel"'), html.indexOf('id="todo-panel"'));
    assert.match(cardsPanel, /id="course-visibility"/);
    assert.doesNotMatch(cardsPanel, /id="card-grid"|id="card-edit-menu"/);
    assert.doesNotMatch(settings, /card-name-input|card-code-input|Custom Name|Custom Code|showCardEditMenu/);
    const customize = content.slice(content.indexOf('function customizeCards'), content.indexOf('function calculateGPA2'));
    assert.doesNotMatch(customize, /cardOptions\.name|cardOptions\.code/);
    const created = content.match(/cards\[id\] = \{[^}]+\}/g);
    assert.ok(created && created.length >= 2);
    assert.ok(created.every(literal => !/"name"/.test(literal) && !/"code"/.test(literal)));

    function createElement(tag) {
        return {
            tagName: tag.toUpperCase(), children: [], style: {}, attrs: {}, listeners: {},
            className: '', textContent: '', title: '', checked: false, type: '', scope: '',
            setAttribute(name, value) { this.attrs[name] = value; },
            appendChild(child) { this.children.push(child); return child; },
            replaceChildren() { this.children.length = 0; },
            addEventListener(type, fn) { this.listeners[type] = fn; },
        };
    }
    const host = createElement('div');
    let cards = {
        2: { fullName: 'Biology', default: 'BIO101', hidden: true, hide_todo: false, name: 'Secret bio' },
        1: { fullName: '', name: 'Old custom name', code: 'OLD', default: 'ALG', hidden: false, hide: false, hide_todo: true },
    };
    let saved = null;
    const context = vm.createContext({
        document: { getElementById: id => id === 'course-visibility' ? host : null, createElement },
        chrome: { runtime: {}, storage: { sync: {
            get: (keys, callback) => callback({ custom_cards: cards }),
            set: (values, callback) => { cards = saved = values.custom_cards; callback(); },
        } } },
        sendFromPopup: async () => null,
    });
    vm.runInContext(settings.slice(settings.indexOf('let cardWrite'), settings.indexOf('// customization tab')), context);
    await context.displayAdvancedCards();
    const table = host.children[0];
    assert.equal(table.tagName, 'TABLE');
    assert.deepEqual(table.children[0].children[0].children.map(cell => cell.textContent), ['Name', 'Card grid', 'Todo list']);
    const rows = table.children[1].children;
    // Numeric course ids come back from Object.keys in ascending order.
    assert.equal(rows[0].children[0].textContent, 'ALG');
    assert.equal(rows[0].children[1].children[0].children[0].checked, true);
    assert.equal(rows[0].children[2].children[0].children[0].checked, false);
    assert.equal(rows[1].children[0].textContent, 'Biology');
    assert.equal(rows[1].children[1].children[0].children[0].checked, false);
    assert.equal(rows[1].children[2].children[0].children[0].checked, true);

    const cardBox = rows[0].children[1].children[0].children[0];
    cardBox.checked = false;
    cardBox.listeners.change();
    const todoBox = rows[1].children[2].children[0].children[0];
    todoBox.checked = false;
    todoBox.listeners.change();
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(saved[1].hidden, true);
    assert.equal(saved[1].hide, true);
    assert.equal(saved[1].name, 'Old custom name');
    assert.equal(saved[2].hide_todo, true);
    assert.equal(saved[2].hidden, true);
    assert.equal(saved[2].name, 'Secret bio');

    const filter = content.slice(content.indexOf('function isCourseHidden'), content.indexOf('function getTodoScopedData'));
    const visibility = vm.createContext({ options: { custom_cards: {
        1: { hidden: true, hide_todo: false },
        2: { hidden: false, hide_todo: true },
        3: { hidden: false, hide_todo: false },
    } } });
    vm.runInContext(filter, visibility);
    const items = [{ course_id: 1 }, { course_id: 2 }, { course_id: 3 }, { plannable: {} }];
    assert.deepEqual(visibility.filterHiddenCourses(items).map(item => item.course_id ?? 'personal'), [1, 3, 'personal']);
});

test('dashboard card method uses the same switch markup as other options', () => {
    const html = fs.readFileSync('html/settings.html', 'utf8');
    const cardsPanel = html.slice(html.indexOf('id="cards-panel"'), html.indexOf('id="todo-panel"'));
    const option = cardsPanel.match(/<div class="option" id="card_method_dashboard">[\s\S]*?<\/div>/);
    assert.ok(option, 'Cards tab should include a card_method_dashboard option');
    assert.match(option[0], /<input type="radio" id="off" name="card_method_dashboard">/);
    assert.match(option[0], /<input type="radio" id="on" name="card_method_dashboard">/);
    assert.match(option[0], /class="slider"/);
    assert.doesNotMatch(cardsPanel, /<input type="checkbox" id="card_method_dashboard"/);
    const settings = fs.readFileSync('js/settings.js', 'utf8');
    const switches = settings.match(/const syncedSwitches = \[([^\]]+)\]/)[1];
    assert.match(switches, /'card_method_dashboard'/);
});
