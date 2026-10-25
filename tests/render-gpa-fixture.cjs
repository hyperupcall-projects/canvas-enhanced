// Run with Node, then open the generated HTML in a browser for interaction checks.
const fs = require('node:fs');
const content = fs.readFileSync('js/content.js', 'utf8');
const script = content.slice(content.indexOf('function calculateGPA2()'), content.indexOf('/*\nDashboard notes'));
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
    gpa_calc: true, gpa_calc_weighted: true, gpa_calc_cumulative: true,
    gpa_calc_bounds: { A: { cutoff: 90, gpa: 4 }, B: { cutoff: 80, gpa: 3 }, F: { cutoff: 0, gpa: 0 } },
    cumulative_gpa: { name: 'Cumulative GPA', credits: 10, gr: 3.5 },
    custom_cards: { 42: { credits: 3, weight: 'honors', gr: null } }
};
const current_page = '/';
const grades = Promise.resolve([{ id: 42, name: 'Biology', enrollments: [{ computed_current_score: 95 }] }]);
const chrome = { runtime: { sendMessage() {} }, storage: { sync: {
    get(keys, callback) { callback(options); }, set(values) { Object.assign(options, values); }
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
    if (location.hash === '#preview') {
        document.getElementById('result').hidden = true;
        view.click();
        return;
    }
    check(view.textContent === 'View GPA' && visible(view), 'compact View GPA button');
    check(!dialog.open && !visible(card) && !visible(calculator), 'all GPA details initially hidden');
    check(document.querySelector('.canvasrefined-gpa-header-mount').nextElementSibling.matches('.canvasrefined-gpa-customize-btn'), 'Customize remains beside View GPA');
    view.focus(); view.click();
    check(dialog.open && dialog.matches(':modal'), 'button opens a modal dialog');
    check(visible(card) && visible(calculator), 'summary and calculator appear together');
    for (const type of ['unweighted', 'weighted', 'cumulative']) check(visible(document.getElementById('canvasrefined-gpa-' + type)), type + ' GPA visible');
    check(document.getElementById('canvasrefined-gpa-unweighted').textContent === '4.00', 'initial GPA calculated');
    const percent = document.querySelector('.canvasrefined-gpa-course .canvasrefined-course-percent');
    percent.value = '85'; percent.dispatchEvent(new Event('input'));
    check(document.getElementById('canvasrefined-gpa-unweighted').textContent === '3.00', 'calculator updates GPA');
    check(document.getElementById('canvasrefined-gpa-weighted').textContent === '3.50', 'weighted GPA updates');
    const credits = document.querySelector('.canvasrefined-gpa-course .canvasrefined-course-credit');
    credits.value = '4'; credits.dispatchEvent(new Event('input'));
    check(options.custom_cards[42].credits === '4', 'calculator settings still save');
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
    options.gpa_calc_weighted = false; options.gpa_calc_cumulative = false;
    setupGPACalc(); await ready(); view.click();
    check(!visible(document.getElementById('canvasrefined-gpa-weighted')) && !visible(document.getElementById('canvasrefined-gpa-cumulative')), 'GPA display preferences respected');
    dialog.close();
    document.querySelector('.ic-Dashboard-header').remove();
    placeGpaWidgets(card, calculator);
    const fallback = document.querySelector('.canvasrefined-gpa-view-btn');
    check(visible(fallback), 'button falls back to card grid without header');
    options.gpa_calc_prepend = true; placeGpaWidgets(card, calculator);
    check(document.querySelector('.ic-DashboardCard__box__container').firstElementChild === fallback, 'fallback respects prepend preference');
    fallback.click(); check(dialog.open && visible(card) && visible(calculator), 'fallback opens all GPA information');
    dialog.close();
    document.getElementById('result').textContent = errors.length ? 'FAIL: ' + errors.join('; ') : 'PASS: ' + checks + ' GPA dialog checks';
    document.title = errors.length ? 'FAIL' : 'PASS';
})().catch(error => { document.title = 'FAIL'; document.getElementById('result').textContent = 'FAIL: ' + error.stack; });
</script>`;
fs.writeFileSync(process.argv[2] || '/tmp/gpa-check.html', fixture);
