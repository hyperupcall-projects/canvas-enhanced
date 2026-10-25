const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { test } = require('node:test');

const settings = fs.readFileSync('js/settings.js', 'utf8');
const content = fs.readFileSync('js/content.js', 'utf8');

test('saved themes render on setup and local changes, ignoring stale reads and preserving renames', () => {
    const reads = [];
    let onChanged;
    const target = {
        children: [], renaming: false,
        set textContent(value) { this.children = []; },
        querySelector() { return this.renaming; }
    };
    const makeElement = (tag, parent, props) => {
        const el = { ...props, children: [], style: {}, addEventListener() {}, setAttribute() {} };
        parent.children.push(el);
        return el;
    };
    const context = vm.createContext({
        document: { getElementById: () => target }, makeElement,
        chrome: { storage: {
            local: { get: (_, callback) => reads.push(callback) },
            onChanged: { addListener: fn => { onChanged = fn; } }
        } }, UNSAVED_THEME_KEY: 'unsaved', getRelativeDate: () => ({ time: '1 min' })
    });
    vm.runInContext(settings.slice(settings.indexOf('function setupSavedThemes()'), settings.indexOf('async function importTheme(')), context);
    const state = name => ({ saved_themes: { 123: { custom_cards: [] } }, saved_theme_names: { 123: name } });
    const name = () => target.children[0].children[1].children[0].textContent;
    context.setupSavedThemes();
    assert.equal(reads.length, 1, 'initial load reads saved themes');
    reads.shift()(state('My Kirby'));
    assert.equal(name(), 'My Kirby');
    onChanged({ planner_cache_v1: {} }, 'local');
    onChanged({ saved_themes: {} }, 'sync');
    assert.equal(reads.length, 0, 'unrelated storage changes do not redraw themes');
    onChanged({ saved_theme_names: {} }, 'local');
    onChanged({ saved_themes: {} }, 'local');
    const oldRead = reads.shift(), newRead = reads.shift();
    newRead(state('Updated'));
    oldRead(state('Stale'));
    assert.equal(name(), 'Updated');
    target.renaming = true;
    onChanged({ saved_themes: {} }, 'local');
    reads.shift()(state('Incoming'));
    assert.equal(name(), 'Updated', 'refresh does not erase an in-progress rename');
    target.renaming = false;
    context.displaySavedThemes();
    reads.shift()({ saved_themes: {} });
    assert.equal(target.children.length, 0, 'deleted themes disappear');
});

test('Todo layout supports visible and hidden scrollbars and reserves dashboard spacing', () => {
    const elements = new Map();
    const sidebar = { style: { removeProperty(key) { delete this[key]; } } };
    elements.set('right-side-wrapper', sidebar);
    const context = vm.createContext({
        options: { todo_full_height: true, todo_separate_scrollbar: true },
        isDashboardPage: () => true, todoViewportOffsetPx: () => 0,
        document: {
            getElementById: id => elements.get(id),
            createElement: () => ({ style: {} }),
            documentElement: { append: el => elements.set(el.id, el) }
        }
    });
    vm.runInContext(content.slice(content.indexOf('function applyTodoSidebarLayout()'), content.indexOf('function clearTodoList()')), context);
    context.applyTodoSidebarLayout();
    const css = () => elements.get('canvasrefined-right-sidebar-scrollbar').textContent;
    assert.equal(sidebar.style.marginTop, '24px');
    assert.equal(sidebar.style.top, '24px');
    assert.equal(sidebar.style.height, 'calc(100vh - 48px)');
    assert.equal(sidebar.style.overflowY, 'auto');
    assert.match(css(), /scrollbar-width: none/);
    context.options.todo_show_scrollbar = true;
    context.applyTodoSidebarLayout();
    assert.match(css(), /scrollbar-width: thin/);
    assert.match(css(), /width: 8px !important/);
    assert.doesNotMatch(css(), /display: none/);
    context.options.todo_separate_scrollbar = false;
    context.options.todo_full_height = false;
    context.applyTodoSidebarLayout();
    for (const key of ['position', 'top', 'height', 'minHeight', 'overflowY']) assert.equal(sidebar.style[key], '');
    context.isDashboardPage = () => false;
    context.todoViewportOffsetPx = () => 72;
    context.options.todo_separate_scrollbar = true;
    context.applyTodoSidebarLayout();
    assert.equal(sidebar.style.marginTop, '');
    assert.equal(sidebar.style.height, 'calc(100vh - 72px)');
});
