// Run with Node, then open the generated HTML in a browser for interaction checks.
const fs = require('node:fs');
const content = fs.readFileSync('js/content.js', 'utf8');
const script = content.slice(content.indexOf('function calculateGPA2()'), content.indexOf('/*\nSmaller features'));
const grading = content.slice(content.indexOf('function percentToLetterGrade('), content.indexOf('function insertGrades()'));
const privacy = content.slice(content.indexOf('function applyPersonalDetailsPrivacyStyle()'), content.indexOf('// Course image removal'));
const css = fs.readFileSync('css/content.css', 'utf8');
const fixture = `<!doctype html><meta charset="utf-8"><title>GPA dialog checks</title>
<style>body{font:15px sans-serif;margin:24px}.ic-Dashboard-header__actions{display:flex}button{cursor:pointer}</style>
<style>${css}</style>
<header class="ic-Dashboard-header"><div class="ic-Dashboard-header__actions"><h1 style="margin-right:auto">Dashboard</h1><button aria-label="Dashboard options">⋮</button></div></header>
<main id="DashboardCard_Container"><div class="ic-DashboardCard__box__container"><div class="ic-DashboardCard">Biology</div></div></main>
<pre id="result">RUNNING</pre>
<script>
const options = {
    gpa_calc: true, gpa_calc_weighted: false,
    gpa_calc_bounds: { A: { cutoff: 90, gpa: 4 }, B: { cutoff: 80, gpa: 3 }, F: { cutoff: 0, gpa: 0 } },
    custom_cards: {
        42: { credits: 3, weight: 'honors', gr: '75', name: 'Biology', img: 'biology.png' },
        43: { credits: 1, weight: 'regular', gr: null }
    }
};
const current_page = '/';
let grades = Promise.resolve([
    { id: 42, name: 'Biology', enrollments: [{ computed_current_score: 95 }] },
    { id: 43, name: 'History', enrollments: [{ has_grading_periods: true, computed_current_score: 99, current_period_computed_current_score: 85 }] }
]);
const stored = structuredClone(options);
const chrome = { runtime: { sendMessage() {} }, storage: { sync: {
    get(keys, callback) { setTimeout(() => callback(structuredClone(stored)), 0); },
    set(values, callback) {
        setTimeout(() => { Object.assign(stored, structuredClone(values)); if (callback) callback(); }, 0);
    }
} } };
function makeElement(tag, parent, props) { const el = Object.assign(document.createElement(tag), props); parent.appendChild(el); return el; }
const logError = error => { throw error; };
${grading}
${privacy}
${script}
(async () => {
    const errors = [];
    let checks = 0;
    function check(ok, message) { checks++; if (!ok) errors.push(message); }
    const visible = el => el.getClientRects().length > 0;
    const ready = () => new Promise(resolve => setTimeout(resolve, 0));
    setupGPACalc(); await ready();
    const view = document.querySelector('.canvasrefined-gpa-view-btn');
    const dialog = document.querySelector('.canvasrefined-gpa-dialog');
    const card = document.querySelector('.canvasrefined-gpa-card');
    const calculator = document.querySelector('.canvasrefined-gpa');
    if (location.hash.startsWith('#preview')) {
        document.getElementById('result').hidden = true;
        view.click();
        if (location.hash === '#preview-what-if') document.querySelector('.canvasrefined-gpa-what-if').click();
        return;
    }
    check(view.textContent === 'View GPA' && visible(view), 'compact View GPA button');
    check(!dialog.open && !visible(card) && !visible(calculator), 'all GPA details initially hidden');
    check(document.querySelector('.canvasrefined-gpa-header-mount').nextElementSibling.matches('.canvasrefined-gpa-customize-btn'), 'Customize remains beside View GPA');
    view.focus(); view.click();
    check(dialog.open && dialog.matches(':modal'), 'button opens a modal dialog');
    check(visible(card) && visible(calculator), 'summary and calculator appear together');
    const gpa = document.getElementById('canvasrefined-gpa-weighted');
    check(visible(gpa), 'weighted GPA visible even with the retired preference off');
    check(gpa.textContent === '4.13', 'initial GPA includes honors and unequal credits');
    check(card.querySelectorAll('p[id]').length === 1 && calculator.querySelectorAll('.canvasrefined-course-credit').length === 2, 'single GPA summary and editable credits for every course');
    const percent = document.querySelector('.canvasrefined-gpa-course .canvasrefined-course-percent');
    const toggle = document.querySelector('.canvasrefined-gpa-what-if');
    const reset = document.querySelector('.canvasrefined-gpa-reset-grades');
    check(document.querySelectorAll('.canvasrefined-gpa-what-if').length === 1 && !document.querySelector('.canvasrefined-course-customgr'), 'one global toggle replaces per-course checkboxes');
    check(!toggle.checked && percent.readOnly && percent.value === '95' && !visible(reset), 'normal mode locks grades and ignores saved overrides');
    percent.value = '80'; percent.dispatchEvent(new Event('input'));
    check(percent.value === '95' && options.custom_cards[42].gr === '75', 'normal mode cannot save grade edits');
    toggle.click();
    check(toggle.checked && !percent.readOnly && percent.value === '75' && visible(reset), 'what-if mode restores existing saved grades and enables reset');
    percent.value = '85'; percent.dispatchEvent(new Event('input'));
    check(gpa.textContent === '3.38', 'grade changes update the credit-weighted GPA');
    await gpaSettingsWrite; await ready();
    check(stored.custom_cards[42].gr === '85' && stored.gpa_what_if === true, 'what-if grade and mode persist');
    toggle.click();
    check(percent.readOnly && percent.value === '95' && gpa.textContent === '4.13' && !visible(reset), 'turning mode off restores live grades and GPA');
    toggle.click();
    check(percent.value === '85' && gpa.textContent === '3.38', 'turning mode back on retains saved what-if grades');
    const credits = document.querySelector('.canvasrefined-gpa-course .canvasrefined-course-credit');
    credits.value = '0.5'; credits.dispatchEvent(new Event('input'));
    check(gpa.textContent === '3.17' && options.custom_cards[42].credits === '0.5', 'fractional credits affect GPA and save');
    const historyWeight = document.querySelectorAll('.canvasrefined-course-weight')[1];
    historyWeight.value = 'ap'; historyWeight.dispatchEvent(new Event('change'));
    check(gpa.textContent === '3.83', 'AP weighting combines with course credits');
    historyWeight.value = 'dnc'; historyWeight.dispatchEvent(new Event('change'));
    check(gpa.textContent === '3.50', 'excluded courses do not affect GPA');
    historyWeight.value = 'regular'; historyWeight.dispatchEvent(new Event('change'));
    credits.value = '0'; credits.dispatchEvent(new Event('input'));
    check(gpa.textContent === '3.00', 'zero-credit course does not affect GPA');
    credits.value = '4'; credits.dispatchEvent(new Event('input'));
    check(gpa.textContent === '3.40' && options.custom_cards[42].credits === '4', 'credit changes update GPA and save');
    setupGPACalc(); await ready();
    check(dialog.open && percent.value === '85', 'dashboard refresh preserves open dialog and edits');
    check(document.querySelectorAll('.canvasrefined-gpa-view-btn').length === 1 && document.querySelectorAll('dialog').length === 1, 'refresh does not duplicate controls');
    check(dialog.getBoundingClientRect().width <= innerWidth && document.documentElement.scrollWidth <= innerWidth, 'dialog fits viewport');
    dialog.querySelector('button').click();
    check(!dialog.open && document.activeElement === view, 'Close restores focus to View GPA');
    view.click();
    dialog.dispatchEvent(new MouseEvent('click', { clientX: 0, clientY: 0 }));
    check(!dialog.open, 'backdrop click closes dialog');
    view.click(); options.gpa_calc = false; placeGpaWidgets(card, calculator);
    check(!dialog.open && !visible(view), 'disabling GPA closes dialog and hides entry point');
    options.gpa_calc = true; placeGpaWidgets(card, calculator); view.click();
    options.hide_personal_details = true; applyPersonalDetailsPrivacyStyle();
    check(!dialog.open && !visible(view), 'privacy closes dialog and hides GPA');
    options.hide_personal_details = false; applyPersonalDetailsPrivacyStyle();
    setupGPACalc(); await ready(); view.click();
    check(visible(gpa) && gpa.textContent === '3.40', 'weighted GPA remains visible after refresh');
    dialog.close();
    document.querySelector('.ic-Dashboard-header').remove();
    placeGpaWidgets(card, calculator);
    const fallback = document.querySelector('.canvasrefined-gpa-view-btn');
    check(visible(fallback), 'button falls back to card grid without header');
    options.gpa_calc_prepend = true; placeGpaWidgets(card, calculator);
    check(document.querySelector('.ic-DashboardCard__box__container').firstElementChild === fallback, 'fallback respects prepend preference');
    fallback.click(); check(dialog.open && visible(card) && visible(calculator), 'fallback opens all GPA information');
    dialog.close();

    const historyPercent = document.querySelectorAll('.canvasrefined-course-percent')[1];
    percent.value = '0'; percent.dispatchEvent(new Event('input'));
    historyPercent.value = ''; historyPercent.dispatchEvent(new Event('input'));
    await gpaSettingsWrite;
    check(stored.custom_cards[42].gr === '0' && stored.custom_cards[43].gr === '', 'rapid edits to multiple courses persist, including zero and blank grades');
    options.custom_cards = structuredClone(stored.custom_cards);
    options.gpa_what_if = stored.gpa_what_if;
    calculator.dataset.canvasrefinedGpaRendered = 'false';
    setupGPACalc(); await ready();
    const reloaded = [...document.querySelectorAll('.canvasrefined-course-percent')];
    check(reloaded[0].value === '0' && reloaded[1].value === '' && !reloaded[0].readOnly && document.querySelector('.canvasrefined-gpa-what-if').checked, 'saved mode and grades survive rebuilding the calculator');
    reloaded[0].value = '65'; reloaded[0].dispatchEvent(new Event('input'));
    reloaded[1].value = '75'; reloaded[1].dispatchEvent(new Event('input'));
    document.querySelector('.canvasrefined-gpa-reset-grades').click();
    await gpaSettingsWrite;
    check(reloaded[0].value === '95' && reloaded[1].value === '85' && document.getElementById('canvasrefined-gpa-weighted').textContent === '4.20', 'reset restores all current grades, including current grading period values');
    check(stored.custom_cards[42].gr === null && stored.custom_cards[43].gr === null, 'reset clears saved overrides after pending edits');
    check(stored.custom_cards[42].credits === '4' && stored.custom_cards[42].weight === 'honors' && stored.custom_cards[42].img === 'biology.png', 'reset preserves credits, weights and card preferences');
    check(options.gpa_what_if && !reloaded[0].readOnly, 'reset keeps what-if mode enabled');

    options.gpa_what_if = false; refreshGpaWhatIfMode();
    grades = Promise.resolve([
        { id: 42, name: 'Biology', enrollments: [{ computed_current_score: 0 }] },
        { id: 43, name: 'History', enrollments: [] }
    ]);
    calculator.dataset.canvasrefinedGpaRendered = 'false';
    setupGPACalc(); await ready();
    const noScores = [...document.querySelectorAll('.canvasrefined-course-percent')];
    check(noScores[0].value === '0' && noScores[1].value === '--' && noScores.every(input => input.readOnly), 'normal mode handles zero grades and missing scores');
    document.querySelector('.canvasrefined-gpa-what-if').click();
    noScores[0].value = '90'; noScores[0].dispatchEvent(new Event('input'));
    noScores[1].value = '80'; noScores[1].dispatchEvent(new Event('input'));
    document.querySelector('.canvasrefined-gpa-reset-grades').click();
    await gpaSettingsWrite;
    check(noScores[0].value === '0' && noScores[1].value === '--', 'reset preserves zero grades and missing scores');
    document.getElementById('result').textContent = errors.length ? 'FAIL: ' + errors.join('; ') : 'PASS: ' + checks + ' GPA dialog checks';
    document.title = errors.length ? 'FAIL' : 'PASS';
})().catch(error => { document.title = 'FAIL'; document.getElementById('result').textContent = 'FAIL: ' + error.stack; });
</script>`;
fs.writeFileSync(process.argv[2] || '/tmp/gpa-check.html', fixture);
