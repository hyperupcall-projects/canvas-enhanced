const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { test } = require('node:test');
const content = fs.readFileSync('js/content.js', 'utf8');
const settings = fs.readFileSync('js/settings.js', 'utf8');

test('course font sizes use native anchors, extrapolate equally and update independently', () => {
    const style = { textContent: '' };
    const span = { fontSize: '14px' };
    const title = { querySelector: () => span };
    const subtitle = { fontSize: '20px' };
    let cardsReady = true;
    const context = vm.createContext({
        options: {}, quizSafeModeActive: () => false,
        getComputedStyle: element => {
            assert.doesNotMatch(style.textContent, /font-size:/, 'measure without our previous font overrides');
            return element;
        },
        document: {
            querySelector: selector => {
                if (selector === '#canvasrefined-aesthetics') return style;
                if (!cardsReady) return null;
                return selector.endsWith('__header-title') ? title : subtitle;
            },
            documentElement: { appendChild() {} },
        },
    });
    vm.runInContext(content.slice(content.indexOf('function applyAestheticChanges()'), content.indexOf('function setupQuizSafeModeBanner()')), context);
    context.applyAestheticChanges();
    assert.doesNotMatch(style.textContent, /font-size:/, 'defaults preserve Canvas typography');
    const levels = { small: 14, medium: 20, large: 26, extra_large: 32 };
    for (const [nickname, nicknamePx] of Object.entries(levels)) {
        for (const [id, idPx] of Object.entries(levels)) {
            context.options = { course_nickname_font_size: nickname, course_id_font_size: id };
            context.applyAestheticChanges();
            if (nickname === 'small' && id === 'medium') continue;
            assert.ok(style.textContent.includes(`span{font-size:${nicknamePx}px!important}`));
            assert.ok(style.textContent.includes(`__header-subtitle{font-size:${idPx}px!important}`));
        }
    }
    // School font changes and late-arriving cards must not reuse stale sizes.
    cardsReady = false;
    context.applyAestheticChanges();
    assert.ok(style.textContent.includes('font-size:2rem!important'));
    cardsReady = true;
    span.fontSize = '12px'; subtitle.fontSize = '16px';
    context.applyAestheticChanges();
    assert.ok(style.textContent.includes('font-size:24px!important'));
    context.options = { emphasize_course_name: true };
    context.applyAestheticChanges();
    assert.ok(style.textContent.includes('span{font-size:16px!important}'));
    assert.ok(style.textContent.includes('__header-subtitle{font-size:12px!important}'));
    context.options = { emphasize_course_name: true, course_nickname_font_size: 'small', course_id_font_size: 'medium' };
    context.applyAestheticChanges();
    assert.doesNotMatch(style.textContent, /font-size:/, 'new preferences override the old toggle');
});

test('font size controls load saved or legacy choices and persist each dropdown independently', () => {
    for (const stored of [{}, { emphasize_course_name: true }, { course_nickname_font_size: 'extra_large', course_id_font_size: 'large' }]) {
        const inputs = {}, writes = [];
        const context = vm.createContext({
            document: { getElementById: key => inputs[key] ||= { addEventListener(type, fn) { this[type] = fn; } } },
            chrome: { storage: { sync: {
                get: (_, callback) => callback(stored),
                set: values => writes.push(JSON.parse(JSON.stringify(values))),
            } } },
        });
        vm.runInContext(settings.slice(0, settings.indexOf('sendFromPopup("getCards")')), context);
        vm.runInContext(settings.slice(settings.indexOf('function setupCourseFontSizeSelects()'), settings.indexOf('// Collapsible "More options"')), context);
        context.setupCourseFontSizeSelects();
        assert.equal(inputs.course_nickname_font_size.value, stored.course_nickname_font_size || (stored.emphasize_course_name ? 'medium' : 'small'));
        assert.equal(inputs.course_id_font_size.value, stored.course_id_font_size || (stored.emphasize_course_name ? 'small' : 'medium'));
        inputs.course_nickname_font_size.value = 'large';
        inputs.course_nickname_font_size.change();
        inputs.course_id_font_size.value = 'extra_large';
        inputs.course_id_font_size.change();
        assert.deepEqual(writes, [{ course_nickname_font_size: 'large' }, { course_id_font_size: 'extra_large' }]);
    }
    const html = fs.readFileSync('html/settings.html', 'utf8');
    for (const key of ['course_nickname_font_size', 'course_id_font_size']) {
        const select = html.match(new RegExp(`<select id="${key}"[\\s\\S]*?</select>`))[0];
        assert.equal((select.match(/<option /g) || []).length, 4);
        for (const label of ['Small', 'Medium', 'Large', 'Extra Large']) assert.ok(select.includes(`>${label}</option>`));
    }
    assert.ok(!html.includes('id="emphasize_course_name"'));
});

test('install migration preserves emphasis and any explicit font selections', async () => {
    for (const initial of [{}, { emphasize_course_name: false }, { emphasize_course_name: true }, { emphasize_course_name: true, course_nickname_font_size: 'extra_large' }]) {
        const stored = { ...initial };
        let installed;
        const context = vm.createContext({
            console: { log() {} },
            chrome: {
                action: { onClicked: { addListener() {} } },
                runtime: { onMessage: { addListener() {} }, onInstalled: { addListener(fn) { installed = fn; } }, openOptionsPage() {} },
                storage: {
                    local: { get: (_, callback) => callback({}), remove() {}, set() {} },
                    sync: {
                        get: (_, callback) => callback(stored),
                        set: async values => Object.assign(stored, values),
                        remove: keys => { for (const key of Array.isArray(keys) ? keys : [keys]) delete stored[key]; },
                    },
                },
            },
        });
        vm.runInContext(fs.readFileSync('js/background.js', 'utf8'), context);
        installed();
        await new Promise(resolve => setImmediate(resolve));
        assert.equal(stored.course_nickname_font_size, initial.course_nickname_font_size || (initial.emphasize_course_name ? 'medium' : 'small'));
        assert.equal(stored.course_id_font_size, initial.emphasize_course_name ? 'small' : 'medium');
        assert.ok(!Object.hasOwn(stored, 'emphasize_course_name'));
    }
});
