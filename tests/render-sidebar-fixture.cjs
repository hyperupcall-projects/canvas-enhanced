// Generate a standalone browser regression fixture for sidebar typography.
// Run: node tests/render-sidebar-fixture.cjs /tmp/sidebar-check.html
const fs = require('node:fs');
const content = fs.readFileSync('js/content.js', 'utf8');
const script = content.slice(content.indexOf('let boldSidebarObserver = null;'), content.indexOf('let insertTimer;'));
fs.writeFileSync(process.argv[2] || '/tmp/sidebar-check.html', `<!doctype html>
<style>body,a{font-weight:400}.menu-item__text{font-weight:400}</style>
<header class="ic-app-header"><ul id="menu"><li><a href="#"><span class="menu-item-icon-container"><i class="icon-dashboard">icon</i><svg stroke-width="1"><path d="M0 0L10 10"/></svg></span><span class="menu-item__text">Dashboard</span></a></li></ul></header>
<ul id="section-tabs"><li><a href="#"><i class="icon-home">icon</i> Home <span>nested label</span><svg stroke-width="2"></svg></a></li></ul>
<main><a>Unrelated text</a></main><pre id="result">RUNNING</pre>
<script>let options = {};
${script}
(async () => {
    const errors = [];
    const check = (ok, message) => { if (!ok) errors.push(message); };
    const weight = el => getComputedStyle(el).fontWeight;
    const icons = [...document.querySelectorAll('i,svg')];
    const originals = icons.map(el => [el.outerHTML, weight(el)]);
    const course = document.querySelector('#section-tabs a');
    const courseHTML = course.innerHTML;
    applyBoldSidebarText();
    check(!document.querySelector('.canvasrefined-sidebar-text'), 'disabled initially');
    options.bold_sidebar_text = true;
    applyBoldSidebarText(); applyBoldSidebarText();
    check(weight(document.querySelector('.menu-item__text span')) === '700', 'global label without #header');
    check([...course.querySelectorAll('.canvasrefined-sidebar-text')].length === 2, 'direct and nested course labels');
    check([...course.querySelectorAll('.canvasrefined-sidebar-text')].every(el => weight(el) === '700'), 'course labels bold');
    check(icons.every((el, i) => el.outerHTML === originals[i][0] && weight(el) === originals[i][1]), 'icons unchanged');
    check(weight(document.querySelector('main a')) === '400', 'unrelated text unchanged');
    check(document.querySelectorAll('#canvasrefined-bold-sidebar-text').length === 1, 'no duplicate styles');
    const late = document.createElement('li'); late.innerHTML = '<a>Grades</a>'; document.querySelector('#section-tabs').append(late);
    await new Promise(resolve => setTimeout(resolve, 0));
    check(weight(late.querySelector('.canvasrefined-sidebar-text')) === '700', 'late course label bold');
    options.bold_sidebar_text = false; applyBoldSidebarText();
    check(course.innerHTML === courseHTML, 'original course markup restored');
    check(!document.querySelector('.canvasrefined-sidebar-text'), 'all wrappers removed');
    check(weight(document.querySelector('.menu-item__text')) === '400', 'original global weight restored');
    check(!document.getElementById('canvasrefined-bold-sidebar-text'), 'style removed');
    document.querySelector('#result').textContent = errors.length ? 'FAIL: ' + errors.join('; ') : 'PASS: global/course labels, unchanged icons, late rendering, toggle restoration';
})().catch(error => document.querySelector('#result').textContent = 'FAIL: ' + error.stack);
</script>`);
