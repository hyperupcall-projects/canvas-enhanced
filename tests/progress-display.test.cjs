const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { test } = require('node:test');

const settings = fs.readFileSync('js/settings.js', 'utf8');
const content = fs.readFileSync('js/content.js', 'utf8');
const modes = ['none', 'rings', 'rainbow', 'lines'];
const retired = ['line', 'combined', 'segmented'];
const cases = [...modes.map(mode => [mode, mode]), ...retired.map(mode => [mode, 'lines']),
    [true, 'rings'], [false, 'none'], [undefined, 'rings'], [null, 'rings'], ['invalid', 'rings']];
const settingsHelpers = settings.slice(settings.indexOf('function normalizeProgressRingMode('), settings.indexOf('function setupCourseFontSizeSelects()'));

test('settings and task rendering resolve saved progress modes consistently', () => {
    const select = { addEventListener(type, callback) { this[type] = callback; } };
    const writes = [];
    const context = vm.createContext({
        options: {}, document: { querySelector: () => select },
        chrome: { storage: { sync: { set: values => writes.push({ ...values }) } } },
    });
    vm.runInContext(settingsHelpers, context);
    vm.runInContext(content.slice(content.indexOf('function getProgressRingMode()'), content.indexOf('function courseRingColor(')), context);
    for (const [initial, expected] of cases) {
        context.options.todo_progress_rings = initial;
        assert.equal(context.getProgressRingMode(), expected);
        context.setupProgressRingsSelect(initial);
        assert.equal(select.value, expected);
        assert.equal(context.progressRingsEnabled(), expected !== 'none');
        if (initial !== undefined && initial !== expected) assert.equal(writes.at(-1).todo_progress_rings, expected);
    }
    for (const mode of modes) {
        select.value = mode;
        select.change();
        assert.equal(writes.at(-1).todo_progress_rings, mode);
    }
    const html = fs.readFileSync('html/settings.html', 'utf8');
    const dropdown = html.match(/<select id="todo_progress_rings"[\s\S]*?<\/select>/)[0];
    assert.deepEqual([...dropdown.matchAll(/<option value="([^"]+)"/g)].map(match => match[1]), modes);
    assert.doesNotMatch(content, /renderProgressOneLine|canvasrefined-progress-oneline|cr-ol-/);
});

test('retired saved progress modes render per-course lines and retain task counts', () => {
    const wrapper = { dataset: {}, innerHTML: '' };
    let rendered;
    const context = vm.createContext({
        options: {}, isTodoTaskType: () => true, getTodoTimeframeBounds: () => null,
        isPinnedIncomplete: () => false, getDashboardCourseOrder: () => new Map(),
        renderProgressLines: (_, entries) => { rendered = entries; },
    });
    vm.runInContext(content.slice(content.indexOf('function getProgressRingMode()'), content.indexOf('function courseRingColor(')), context);
    vm.runInContext(content.slice(content.indexOf('function renderProgressRings(container, scopedData)'), content.indexOf('function buildPlannerNotePayload(')), context);
    for (const mode of retired) {
        context.options.todo_progress_rings = mode;
        context.renderProgressRings({ querySelector: () => wrapper }, [
            { course_id: 42, submissions: { submitted: true } }, { course_id: 42 }, { course_id: 84 },
        ]);
        assert.equal(wrapper.dataset.mode, 'lines');
        assert.deepEqual(JSON.parse(JSON.stringify(rendered)), [
            { courseId: '42', total: 2, completed: 1 }, { courseId: '84', total: 1, completed: 0 },
        ]);
    }
});

test('old themes import and export supported progress modes', async () => {
    const stored = { custom_cards: {} };
    const context = vm.createContext({
        persistUnsavedTheme: async () => {}, themeSourceReady: Promise.resolve(),
        presetChangeTimeout: null, cardStyleSetTimers: {}, clearTimeout() {},
        chrome: { storage: {
            sync: { get: async () => stored, set: async values => Object.assign(stored, values) },
            local: { set: async () => {} },
        } },
        themeValues: null, refreshAppliedThemeControls() {}, refreshThemeInputs() {},
        displayAlert: (_, message) => assert.fail(message),
    });
    vm.runInContext(settings.slice(0, settings.indexOf('sendFromPopup("getCards")')), context);
    vm.runInContext(settingsHelpers, context);
    vm.runInContext(settings.slice(settings.indexOf('async function getExport('), settings.indexOf('const UNSAVED_THEME_KEY')), context);
    vm.runInContext(settings.slice(settings.indexOf('async function importTheme('), settings.indexOf('function updateCards(')), context);
    for (const [initial, expected] of cases) {
        await context.importTheme({ todo_progress_rings: initial });
        assert.equal(stored.todo_progress_rings, expected);
        const exported = await context.getExport({ todo_progress_rings: initial }, ['todo_progress_rings']);
        assert.equal(exported.todo_progress_rings, expected);
    }
});

test('extension updates migrate retired progress modes and preserve current choices', async () => {
    for (const initial of [...modes, ...retired, undefined]) {
        const stored = { new_install: false, todo_progress_rings: initial };
        let installed;
        const context = vm.createContext({
            console: { log() {} },
            chrome: {
                action: { onClicked: { addListener() {} } },
                runtime: { onMessage: { addListener() {} }, onInstalled: { addListener(fn) { installed = fn; } } },
                storage: {
                    local: { get: (_, callback) => callback({}), remove() {}, set() {} },
                    sync: {
                        get: (_, callback) => callback(stored),
                        set: async values => Object.assign(stored, values), remove() {},
                    },
                },
            },
        });
        vm.runInContext(fs.readFileSync('js/background.js', 'utf8'), context);
        installed();
        await new Promise(resolve => setImmediate(resolve));
        assert.equal(stored.todo_progress_rings, retired.includes(initial) ? 'lines' : initial || 'rings');
    }
});
