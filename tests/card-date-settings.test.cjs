const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { test } = require('node:test');

const settings = fs.readFileSync('js/settings.js', 'utf8');
const content = fs.readFileSync('js/content.js', 'utf8');

test('date dropdown preserves existing choices and switches card badges between all formats', () => {
    for (const stored of [{}, { assignment_date_format: true }, { relative_dues: true }, { assignment_date_format: true, relative_dues: true }]) {
        const options = { ...stored };
        const select = { addEventListener(type, callback) { this[type] = callback; } };
        const context = vm.createContext({
            options,
            document: { getElementById: () => select },
            chrome: { storage: { sync: {
                get: (_, callback) => callback(options),
                set: values => Object.assign(options, values),
            } } },
            getRelativeDate: () => ({ ms: -1000, time: '1 day' }),
        });
        vm.runInContext(settings.slice(settings.indexOf('function setupCardDateFormatSelect()'), settings.indexOf('// Keep the existing storage keys')), context);
        vm.runInContext(content.slice(content.indexOf('function formatCardDue('), content.indexOf('function logError(')), context);
        context.setupCardDateFormatSelect();
        assert.equal(select.value, stored.relative_dues ? 'relative' : stored.assignment_date_format ? 'dd/mm' : 'mm/dd');
        for (const [value, expected] of [['relative', 'in 1 day'], ['dd/mm', '23/10'], ['mm/dd', '10/23'], ['relative', 'in 1 day']]) {
            select.value = value;
            select.change();
            assert.equal(context.formatCardDue(new Date(2026, 9, 23)), expected);
        }
    }
});

test('card due filters support past only, future only, both, neither, and legacy preferences', async () => {
    const now = Date.now();
    const assignments = [
        { due: new Date(now - 86400000), type: 'assignment', el: 'past' },
        { due: new Date(now + 86400000), type: 'quiz', el: 'future' },
        { due: new Date(now + 86400000), type: 'assignment', override: true, el: 'completed' },
        { due: new Date(now + 86400000), type: 'calendar_event', el: 'event' },
    ];
    const rows = [];
    const container = {
        parentElement: { style: {} },
        set textContent(_) { rows.length = 0; },
        appendChild: el => rows.push(el),
    };
    const card = { querySelector: selector => selector === '.ic-DashboardCard__link' ? { href: 'https://canvas.example/courses/42' } : container };
    const context = vm.createContext({
        options: { assignments_due: true, num_assignments: 4 },
        cardAssignments: Promise.resolve({ 42: assignments }), cardRenderGen: 0,
        setupCardAssignments() {},
        logError: error => { throw error; },
        document: { querySelectorAll: () => [card] },
        makeElement: (_, parent, props) => {
            const el = { ...props, appendChild() {} };
            parent.appendChild(el);
            return el;
        },
    });
    vm.runInContext(content.slice(content.indexOf('function loadCardAssignments()'), content.indexOf('function setupCardAssignments()')), context);
    for (const [filters, expected] of [
        [{}, ['future']],
        [{ card_overdues: true }, ['past', 'future']],
        [{ card_overdues: false, card_future_dues: true }, ['future']],
        [{ card_overdues: true, card_future_dues: false }, ['past']],
        [{ card_overdues: true, card_future_dues: true }, ['past', 'future']],
        [{ card_overdues: false, card_future_dues: false }, []],
        [{ card_overdues: false, card_future_dues: true, num_assignments: 1 }, ['future']],
    ]) {
        context.options = { assignments_due: true, num_assignments: 4, ...filters };
        context.loadCardAssignments();
        await new Promise(resolve => setImmediate(resolve));
        assert.deepEqual(rows.filter(row => typeof row === 'string'), expected, JSON.stringify(filters));
        if (!expected.length) assert.equal(rows[0].className, 'canvasrefined-assignment-container');
    }
});
