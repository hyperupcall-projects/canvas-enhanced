const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { test } = require('node:test');
const content = fs.readFileSync('js/content.js', 'utf8');

function context() {
    const ctx = vm.createContext({ options: { hide_personal_details: true, custom_cards: { 42: { default: 'Private course' } } } });
    vm.runInContext(content.slice(content.indexOf('const FAKE_COURSES'), content.indexOf('// Course image removal')), ctx);
    vm.runInContext(content.slice(content.indexOf('function courseRingLabel('), content.indexOf('// True when the course is hidden from the dashboard card grid')), ctx);
    return ctx;
}

test('cards, feedback, planner rows, progress labels, and task course options share one fake course identity', () => {
    const ctx = context();
    const label = ctx.fakeCourseLabel('id:42');
    assert.equal(ctx.courseRingLabel('42'), label);
    for (const item of [{ course_id: 42 }, { context_id: '42' }, { plannable: { course_id: 42 } }]) {
        assert.equal(ctx.anonCourseNameForItem({ ...item, context_name: 'Private course' }), label);
    }
    assert.equal(ctx.courseRingLabel('personal'), 'Personal tasks');
    const select = { options: [], set innerHTML(value) { this.options = [{ dataset: {} }]; } };
    ctx.getCurrentCourseId = () => null;
    ctx.makeElement = (_, parent, props) => { const el = { ...props, dataset: {}, style: {} }; parent.options.push(el); return el; };
    vm.runInContext(content.slice(content.indexOf('function fillTaskCourseOptions('), content.indexOf('function updateTaskCourseSelectColor(')), ctx);
    ctx.fillTaskCourseOptions(select);
    assert.equal(select.options[1].textContent, label);
    assert.equal(select.options[1].value, '42', 'display masking preserves the real course ID for actions');
    ctx.options.hide_personal_details = false;
    ctx.fillTaskCourseOptions(select);
    assert.equal(select.options[1].textContent, 'Private course');
    assert.equal(ctx.courseRingLabel(42), 'Private course');
});

test('anonymization survives Canvas rewriting existing text and attributes, and restores the latest originals', () => {
    const ctx = context();
    let writes = 0, text = 'First private course';
    const attrs = { title: 'First private tooltip' };
    const el = { dataset: {}, get textContent() { return text; }, set textContent(value) { writes++; text = value; },
        getAttribute: name => attrs[name] ?? null, setAttribute: (name, value) => { writes++; attrs[name] = value; } };
    const fake = () => 'Anonymous course';
    ctx.anonText(el, fake);
    ctx.anonAttr(el, 'title', fake);
    const firstWrites = writes;
    ctx.anonText(el, fake);
    ctx.anonAttr(el, 'title', fake);
    assert.equal(writes, firstWrites, 'repeated observer sweeps settle without further DOM mutations');
    text = 'Updated private course'; attrs.title = 'Updated private tooltip';
    ctx.anonText(el, fake); ctx.anonAttr(el, 'title', fake);
    assert.equal(text, 'Anonymous course'); assert.equal(attrs.title, 'Anonymous course');
    ctx.restoreAnonymized({ querySelectorAll: () => [el] });
    assert.equal(text, 'Updated private course'); assert.equal(attrs.title, 'Updated private tooltip');
});

test('dashboard scans save original course names and repair cached privacy placeholders', async () => {
    const ctx = context();
    const subtitle = { textContent: 'Physics — Jensen', dataset: { crAnonOrig: 'Calculus BC' } };
    const title = { textContent: 'Physics — Jensen', dataset: { crAnonOrig: 'Calculus BC — Fall' } };
    const card = { querySelector: selector => {
        if (selector === '.ic-DashboardCard__link') return { href: 'https://canvas.example/courses/42' };
        if (selector === '.ic-DashboardCard__header-subtitle') return subtitle;
        return title;
    } };
    const stored = { custom_cards: {}, custom_cards_3: {} };
    Object.assign(ctx, {
        domain: 'https://canvas.example', console: { log() {} },
        document: { querySelectorAll: () => [card] },
        logError: error => { throw error; },
        chrome: { storage: { sync: {
            get: (_, callback) => callback(structuredClone(stored)),
            set: (values, callback) => { Object.assign(stored, structuredClone(values)); callback(); },
        } } },
    });
    vm.runInContext(content.slice(content.indexOf('function getCardsFromDashboard()'), content.indexOf('async function getCards(')), ctx);
    await ctx.getCardsFromDashboard();
    assert.equal(stored.custom_cards[42].default, 'Calculus BC');
    assert.equal(stored.custom_cards[42].fullName, 'Calculus BC — Fall');

    // An older scan may already have saved the fake name. Turning privacy
    // off and scanning the real dashboard must repair it without losing settings.
    stored.custom_cards[42] = { ...stored.custom_cards[42], default: 'Physics — Jensen', fullName: 'Physics — Jensen', credits: 4, hide_todo: true };
    ctx.options.hide_personal_details = false;
    subtitle.textContent = subtitle.dataset.crAnonOrig;
    title.textContent = title.dataset.crAnonOrig;
    delete subtitle.dataset.crAnonOrig;
    delete title.dataset.crAnonOrig;
    await ctx.getCardsFromDashboard();
    ctx.options.custom_cards = stored.custom_cards;
    assert.equal(ctx.courseRingLabel(42), 'Calculus BC — Fall');
    assert.equal(stored.custom_cards[42].fullName, 'Calculus BC — Fall');
    assert.equal(stored.custom_cards[42].credits, 4);
    assert.equal(stored.custom_cards[42].hide_todo, true);
});
