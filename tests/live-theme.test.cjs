const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { test } = require('node:test');
const content = fs.readFileSync('js/content.js', 'utf8');

test('course color storage changes redraw tasks and progress using the new cache', () => {
    const colors = { 42: { color: '#7777ff' } };
    const rendered = [];
    let clears = 0, favicons = 0;
    const context = vm.createContext({
        options: { better_todo: true },
        document: { getElementById: () => ({}), querySelector: () => ({}) },
        changeFavicon: () => favicons++, clearTodoList: () => clears++,
        createTodoSections: () => rendered.push(context.options.custom_cards_3[42].color)
    });
    vm.runInContext(content.slice(content.indexOf('function applyOptionsChanges('), content.indexOf('function checkDashboardReady(')), context);
    vm.runInContext(content.slice(content.indexOf('function refreshCourseColorUI()'), content.indexOf('let paletteChangeVersion')), context);
    context.applyOptionsChanges({ custom_cards_3: { newValue: colors } });
    assert.deepEqual(rendered, ['#7777ff']);
    assert.equal(clears, 1);
    assert.equal(favicons, 1);
});

test('overdue card badges use the theme unless always-red is selected', () => {
    const element = props => ({ ...props, children: [], classList: { values: new Set(), add(value) { this.values.add(value); } }, addEventListener() {} });
    const context = vm.createContext({
        options: { assignment_states: {} },
        document: { createElement: () => element({}) },
        makeElement: (tag, parent, props) => { const child = element(props); parent.children.push(child); return child; },
        anonTitleForItem: item => item.title, formatCardDue: () => '5w ago'
    });
    vm.runInContext(content.slice(content.indexOf('function createCardAssignment('), content.indexOf('let cardAssignments;')), context);
    for (const alwaysRed of [false, true]) {
        context.options.card_overdue_always_red = alwaysRed;
        for (const overdue of [false, true]) {
            const card = context.createCardAssignment({ overdue, plannable_id: 42, plannable_date: '2026-01-01' });
            const badge = card.children[1];
            assert.equal(badge.classList.values.has('canvasrefined-assignment-overdue'), overdue);
            assert.equal(badge.classList.values.has('canvasrefined-overdue-red'), overdue && alwaysRed);
        }
    }
    const css = fs.readFileSync('css/content.css', 'utf8');
    assert.match(css, /\.canvasrefined-assignment-overdue \{[^}]*var\(--bclinks, #db3754\)[^}]*var\(--bclink-text, #fff\)/);
});
