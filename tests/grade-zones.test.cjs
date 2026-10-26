const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { test } = require('node:test');

const content = fs.readFileSync('js/content.js', 'utf8');
const settings = fs.readFileSync('js/settings.js', 'utf8');
const bounds = Object.fromEntries([
    ['A+', 97], ['A', 93], ['A-', 90], ['B+', 87], ['B', 83], ['B-', 80],
    ['C+', 77], ['C', 73], ['C-', 70], ['D+', 67], ['D', 63], ['D-', 60], ['F', 0],
].map(([letter, cutoff]) => [letter, { cutoff }]));

function gradingContext(options = {}) {
    const context = vm.createContext({ options: { gpa_calc_bounds: bounds, ...options } });
    vm.runInContext(content.slice(content.indexOf('function percentToLetterGrade('), content.indexOf('function insertGrades()')), context);
    vm.runInContext(content.slice(content.indexOf('const GA_GRADE_COLORS'), content.indexOf('const GA_OPEN_KEY')), context);
    return context;
}

test('zones use distinct letter colors and the configured grade boundaries', () => {
    const context = gradingContext();
    const zones = Array.from(context.gaGradeZones(42, 0, 100), zone => ({ ...zone }));
    assert.deepEqual(zones, [
        { bottom: 0, top: 60, color: '#9ca3af' },
        { bottom: 60, top: 63, color: '#ef4444' },
        { bottom: 63, top: 67, color: '#ef4444' },
        { bottom: 67, top: 70, color: '#ef4444' },
        { bottom: 70, top: 73, color: '#facc15' },
        { bottom: 73, top: 77, color: '#facc15' },
        { bottom: 77, top: 80, color: '#facc15' },
        { bottom: 80, top: 83, color: '#166534' },
        { bottom: 83, top: 87, color: '#22c55e' },
        { bottom: 87, top: 90, color: '#86efac' },
        { bottom: 90, top: 93, color: '#1e40af' },
        { bottom: 93, top: 97, color: '#3b82f6' },
        { bottom: 97, top: 100, color: '#93c5fd' },
    ]);
    const letters = ['F', 'D-', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+'];
    zones.forEach((zone, i) => {
        assert.equal(context.percentToLetterGrade(zone.bottom, 42), letters[i]);
        assert.equal(context.percentToLetterGrade(zone.top - 0.001, 42), letters[i]);
    });
});

test('course overrides, shared fallback, imported strings and cutoff ties match GPA grades', () => {
    const context = gradingContext({
        gpa_calc_bounds: { A: { cutoff: '90' }, 'A+': { cutoff: '98' }, B: { cutoff: 80 }, F: { cutoff: 0 }, C: { cutoff: 'invalid' } },
        gpa_threshold_mode: 'course',
        gpa_course_bounds: { 42: { A: 85, B: 70 } },
    });
    const ranges = id => Array.from(context.gaGradeZones(id, 0, 100), z => [z.bottom, z.top, context.percentToLetterGrade(z.bottom, id)]);
    assert.deepEqual(ranges(42), [[0, 70, 'F'], [70, 85, 'B'], [85, 98, 'A'], [98, 100, 'A+']]);
    assert.deepEqual(ranges(43), [[0, 80, 'F'], [80, 90, 'B'], [90, 98, 'A'], [98, 100, 'A+']]);
    context.options.gpa_threshold_mode = 'all';
    assert.deepEqual(ranges(42), ranges(43), 'shared mode ignores saved class overrides');
    context.options.gpa_calc_bounds = { A: { cutoff: 90 }, 'A+': { cutoff: 90 }, F: { cutoff: 0 } };
    assert.equal(context.percentToLetterGrade(95, 42), 'A');
    assert.equal(context.gaGradeZones(42, 90, 100)[0].color, '#3b82f6', 'ties keep the same first grade as the GPA calculator');
});

test('Fit Y clips bands and extends the top grade through extra credit', () => {
    const context = gradingContext();
    assert.deepEqual(Array.from(context.gaGradeZones(42, 92, 105), z => [z.bottom, z.top, z.color]), [
        [92, 93, '#1e40af'], [93, 97, '#3b82f6'], [97, 105, '#93c5fd'],
    ]);
    assert.deepEqual(Array.from(context.gaGradeZones(42, 101, 110), z => [z.bottom, z.top, z.color]), [[101, 110, '#93c5fd']]);
});

test('the line chart paints zones even with a previously saved false preference', () => {
    const context = gradingContext({ grade_analytics_zones: false, gpa_calc: false });
    const rects = [];
    const ctx = new Proxy({
        fillRect(x, y, width, height) { rects.push({ x, y, width, height, color: this.fillStyle, alpha: this.globalAlpha }); },
    }, { get(target, key) { return key in target ? target[key] : () => {}; } });
    Object.assign(context, {
        gaSetupCanvas: () => ({ ctx, w: 500, h: 238 }),
        gaData: { points: [{ grade: 95, due: '' }] }, gaFitY: false,
        getCurrentCourseId: () => 42, getComputedStyle: () => ({ color: '#111' }),
        document: { body: {} }, months: [],
    });
    vm.runInContext(content.slice(content.indexOf('function gaDrawLine('), content.indexOf('// Redraw open charts')), context);
    const canvas = { addEventListener() {}, removeEventListener() {} };
    context.gaDrawLine(canvas, {});
    assert.equal(rects.length, 13);
    assert.deepEqual(rects[0], { x: 38, y: 92, width: 450, height: 120, color: '#9ca3af', alpha: 0.3 });
    assert.deepEqual({ ...rects.at(-1), height: Math.round(rects.at(-1).height) },
        { x: 38, y: 12, width: 450, height: 6, color: '#93c5fd', alpha: 0.3 });
    assert.equal(ctx.globalAlpha, 1, 'line and text retain full opacity');
});

test('threshold settings redraw an open chart and the obsolete setting is removed', () => {
    let redraws = 0;
    const context = vm.createContext({
        options: {}, document: { querySelector: () => null }, insertGrades() {},
        gradeAnalyticsActive: () => true, gaOpen: true, gaData: {},
        renderGradeAnalytics: () => redraws++,
    });
    vm.runInContext(content.slice(content.indexOf('function applyOptionsChanges('), content.indexOf('function checkDashboardReady(')), context);
    for (const key of ['gpa_calc_bounds', 'gpa_course_bounds', 'gpa_threshold_mode']) {
        context.applyOptionsChanges({ [key]: { newValue: {} } });
    }
    assert.equal(redraws, 3);
    context.gaOpen = false;
    context.applyOptionsChanges({ gpa_calc_bounds: { newValue: bounds } });
    assert.equal(redraws, 3, 'closed panels defer drawing until opened');
    for (const source of [settings, fs.readFileSync('html/settings.html', 'utf8'), fs.readFileSync('js/background.js', 'utf8')]) {
        assert.doesNotMatch(source, /grade_analytics_zones/);
    }
});
