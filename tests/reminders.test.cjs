const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { test } = require('node:test');

test('reminders skip incomplete planner entries and preserve valid reminders', async () => {
    const source = fs.readFileSync('js/content.js', 'utf8');
    const due = new Date(Date.now() + 86400000).toISOString();
    const valid = { plannable_date: due, plannable: { title: 'Assignment' }, html_url: '/courses/1/assignments/2' };
    let reminders;
    const context = vm.createContext({
        domain: 'https://canvas.example',
        assignments: Promise.resolve([
            null, { ...valid, plannable: null }, { ...valid, plannable: undefined },
            { ...valid, html_url: null }, { ...valid, plannable_date: 'invalid' },
            { ...valid, plannable_type: 'announcement' }, valid,
            { ...valid, submissions: { submitted: true } },
        ]),
        insertReminders: list => { reminders = list; },
    });
    vm.runInContext(source.slice(source.indexOf('function updateReminders()'), source.indexOf('function showExampleReminder()')), context);
    await context.updateReminders();
    assert.deepEqual(JSON.parse(JSON.stringify(reminders)), [0, -1].map(c => ({
        d: Date.parse(due), t: 'Assignment', h: 'https://canvas.example/courses/1/assignments/2', c,
    })));
    reminders = undefined;
    context.assignments = Promise.resolve({ errors: ['Unavailable'] });
    await context.updateReminders();
    assert.equal(reminders, undefined);
});
