const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { test } = require('node:test');
const content = fs.readFileSync('js/content.js', 'utf8');
const settings = fs.readFileSync('js/settings.js', 'utf8');

function loadFunction(source, start, end, globals) {
    const context = vm.createContext(globals);
    vm.runInContext(source.slice(source.indexOf(start), source.indexOf(end)), context);
    return context;
}

test('course icons tolerate document_start before Canvas adds a favicon', () => {
    let icon = null;
    const context = loadFunction(content, 'function changeFavicon()', 'function getAssignments()', {
        options: { tab_icons: true, custom_cards_3: { 42: { color: '#123456' } } },
        current_page: '/courses/42',
        document: { querySelector: () => icon },
    });
    assert.doesNotThrow(() => context.changeFavicon());
    icon = {};
    context.changeFavicon();
    assert.match(icon.href, /^data:image\/svg\+xml/);
    assert.match(icon.href, /%23123456/);
    delete context.options.custom_cards_3;
    assert.doesNotThrow(() => context.changeFavicon());
});

test('dashboard grades skip courses without student enrollment scores', async () => {
    const errors = [];
    const badge = { style: {}, classList: { remove() {} }, setAttribute() {}, remove() {} };
    const link = { href: 'https://canvas.example/courses/42' };
    const card = {
        querySelector: selector => selector === '.ic-DashboardCard__link' ? link : badge,
        querySelectorAll: () => [link],
    };
    const context = loadFunction(content, 'function insertGrades()', 'function createCardAssignment(', {
        options: { dashboard_grades: true },
        grades: Promise.resolve([{ id: 42, enrollments: [] }, { id: 43 }]),
        document: { querySelectorAll: () => [card] },
        getData: async () => [],
        domain: 'https://canvas.example', logError: error => errors.push(error),
    });
    vm.runInContext(content.slice(content.indexOf('function getGrades()'), content.indexOf('function getColors()')), context);
    context.insertGrades();
    await new Promise(resolve => setImmediate(resolve));
    assert.deepEqual(errors, []);
    context.grades = Promise.resolve([{ id: 42, enrollments: [{ computed_current_score: 0 }] }]);
    context.insertGrades();
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(badge.textContent, '0%');
    context.grades = null;
    assert.doesNotThrow(() => context.insertGrades());
    await new Promise(resolve => setImmediate(resolve));
    assert.deepEqual(errors, []);
});

test('a failed grade request is handled even before dashboard elements render', async () => {
    const errors = [];
    const failure = new Error('Canvas API request failed (401)');
    const context = loadFunction(content, 'function getGrades()', 'function getColors()', {
        options: { gpa_calc: true }, domain: 'https://canvas.example', grades: null,
        getData: async () => { throw failure; }, logError: error => errors.push(error),
    });
    context.getGrades();
    assert.deepEqual(Array.from(await context.grades), []);
    assert.deepEqual(errors, [failure]);
});

test('GPA courses without scores remain uncounted and zero scores remain valid', () => {
    function element(props = {}) {
        const fields = new Map();
        return {
            ...props, children: [], dataset: {}, setAttribute() {}, addEventListener() {},
            querySelector(selector) {
                if (!fields.has(selector)) fields.set(selector, element());
                return fields.get(selector);
            },
        };
    }
    const context = loadFunction(content, 'function createGPACalcCourse(', 'function gpaIsOurControl(', {
        options: { custom_cards: { 42: { gr: null, credits: 1, weight: 'regular' } } },
        makeElement: (tag, parent, props) => {
            const child = element(props);
            parent.children.push(child);
            return child;
        },
    });
    for (const [enrollments, expected, weight] of [
        [undefined, '--', 'dnc'], [[], '--', 'dnc'],
        [[{ computed_current_score: 0 }], 0, 'regular'],
        [[{ has_grading_periods: true, current_period_computed_current_score: 85 }], 85, 'regular'],
    ]) {
        const course = context.createGPACalcCourse(element(), { id: 42, name: 'Biology', enrollments });
        const input = course.children.find(child => child.className === 'canvasrefined-gpa-percent-container').children[0];
        assert.equal(input.value, expected);
        const form = course.children.find(child => child.className === 'canvasrefined-course-weights');
        assert.equal(form.querySelector('.canvasrefined-course-weight').value, weight);
    }
});

test('missing custom assignment storage does not produce startup errors', () => {
    const errors = [];
    const context = loadFunction(content, 'function combineAssignments(', 'function cleanCustomAssignments()', {
        options: {}, logError: error => errors.push(error),
    });
    assert.deepEqual(Array.from(context.combineAssignments([])), []);
    assert.deepEqual(errors, []);
});

test('logging the original error works before the error log has been initialized', () => {
    for (const errors of [undefined, null, 'invalid', ['Earlier error']]) {
        let saved;
        const original = new Error('Original startup failure');
        const context = loadFunction(content, 'function logError(', 'const CSRFtoken', {
            chrome: { storage: { local: {
                get: (_, callback) => callback({ errors }),
                set: values => { saved = values; },
            } } }, console: { log() {} },
        });
        assert.doesNotThrow(() => context.logError(original));
        assert.equal(saved.errors.at(-1), original.stack);
        if (Array.isArray(errors)) assert.equal(saved.errors[0], errors[0]);
    }
});

test('settings opens with missing error-log storage', () => {
    const output = { value: '' };
    const context = loadFunction(settings, 'function displayErrors()', 'document.addEventListener("DOMContentLoaded"', {
        chrome: { storage: { local: { get: (_, callback) => callback({}) } } },
        document: { querySelector: () => output },
    });
    assert.doesNotThrow(() => context.displayErrors());
    assert.equal(output.value, '');
});
