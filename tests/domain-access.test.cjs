const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { test } = require('node:test');
const manifest = JSON.parse(fs.readFileSync('manifest.json'));
const helper = fs.readFileSync('js/domain-access.js', 'utf8');

test('injection is limited to HTTPS Instructure with no all-sites permissions', () => {
    assert.deepEqual(manifest.content_scripts[0].matches, ['https://*.instructure.com/*']);
    assert.deepEqual(manifest.optional_host_permissions || [], []);
    assert.deepEqual(manifest.host_permissions || [], []);
    assert.ok(!manifest.permissions.includes('scripting'));
    assert.ok(manifest.content_scripts[0].js.includes('js/domain-access.js'));
});

test('domain validation rejects unsafe schemes, wildcards, credentials and malformed hosts', () => {
    const context = vm.createContext({ URL });
    vm.runInContext(helper, context);
    for (const input of ['http://canvas.school.edu', 'https://*.school.edu', 'https://user@school.edu', 'school.edu:8443', '-bad.edu', 'https://evil..edu', 'file:///tmp/test', '']) {
        assert.equal(context.normalizeCanvasDomain(input), null, input);
    }
    assert.equal(context.normalizeCanvasDomain('https://Canvas.School.edu/courses/123'), 'canvas.school.edu');
    assert.equal(context.normalizeCanvasDomain('canvas.school.edu'), 'canvas.school.edu');
});

