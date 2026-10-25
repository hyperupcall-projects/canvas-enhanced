// Browser regression: node tests/render-privacy-fixture.cjs /tmp/privacy-check.html
const fs = require('node:fs');
const content = fs.readFileSync('js/content.js', 'utf8');
const privacy = content.slice(content.indexOf('const FAKE_COURSES'), content.indexOf('/* \nDashboard grades'));
const label = content.slice(content.indexOf('function courseRingLabel('), content.indexOf('// True when the course is hidden from the dashboard card grid'));
const preview = content.slice(content.indexOf('function hideTodoPreview('), content.indexOf('async function showTodoPreview('));
const lines = content.slice(content.indexOf('function renderProgressLines('), content.indexOf('// Mode "line":'));
fs.writeFileSync(process.argv[2] || '/tmp/privacy-check.html', `<!doctype html>
<style>.ic-avatar{display:block;width:48px;height:48px;background-image:url(private-avatar.png)}img{width:48px;height:48px}</style>
<a id="global_nav_profile_link" title="Private user" aria-label="Private user account"><span class="ic-avatar"><img src="private-avatar.png" srcset="private-avatar-2x.png 2x" alt="Private user"></span></a>
<div class="ic-DashboardCard" aria-label="Private course">
<a class="ic-DashboardCard__link" href="/courses/42"><h2 class="ic-DashboardCard__header-title" title="Private course"><span>Private course</span></h2></a>
<div class="ic-DashboardCard__header-subtitle" title="Private course">Private course</div>
<div class="ic-DashboardCard__header-term">2026 - Private school - Fall</div>
<span class="screenreader-only">Visit Private course</span>
</div>
<div class="recent_feedback"><a href="/courses/42/assignments/84"><div class="event-details"><span class="event-details__context">Private course</span><span class="recent_feedback_title">Private assignment</span><p><strong>99 out of 100</strong></p><p>Private teacher comment</p></div></a></div>
<div id="canvasrefined-global-search-modal">Private search query and results</div><div id="canvasrefined-todo-preview" style="display:block">Private preview</div><a class="canvasrefined-reminder-content" href="/courses/42/assignments/84"><h2 class="canvasrefined-reminder-title">Private assignment</h2></a><div id="progress"></div><div class="canvasrefined-dashboard-notes">Private notes</div><div class="canvasrefined-gpa-card">Real GPA</div><div class="canvasrefined-gpa">Private grades</div><div id="better-todo-add-task-menu">Private task details</div>
<pre id="result">RUNNING</pre>
<script>
let options = {hide_personal_details:true, custom_cards:{42:{default:'Private course'}}};
const logError = error => {throw error};
let todoPreviewToken = 0; ${preview}
const courseRingColor = () => '#abcdef';
const progressFilterDim = () => false; const attachProgressFilterClick = () => {};
${privacy}\n${label}\n${lines}
(async () => {
 const errors = []; const check = (value, message) => { if (!value) errors.push(message); };
 const el = selector => document.querySelector(selector);
 const wait = () => new Promise(resolve => setTimeout(resolve, 100));
 const originals = ['.ic-DashboardCard', '.recent_feedback', '#global_nav_profile_link'].map(s => el(s).outerHTML);
 const progress = () => renderProgressLines(el('#progress'), [{courseId:'42', completed:2, total:3}]);
 setupPersonalDetailsHiding(); progress();
 check(!el('#canvasrefined-global-search-modal'), 'open search closed');
 check(el('#canvasrefined-todo-preview').style.display === 'none', 'open preview hidden');
 check(el('.canvasrefined-reminder-title').textContent === anonTitleForItem({plannable_id:84}), 'reminder title masked consistently');
 const fake = el('.ic-DashboardCard__header-title span').textContent;
 check(el('.cr-pl-label').textContent === fake, 'bar matches card');
 check(anonCourseNameForItem({course_id:42}) === fake, 'task matches card');
 check(el('.event-details__context').textContent === fake, 'feedback matches card');
 check(getComputedStyle(el('#global_nav_profile_link img')).content.includes('data:image/svg+xml'), 'avatar image masked');
 check(getComputedStyle(el('.ic-avatar')).backgroundImage.includes('data:image/svg+xml'), 'background avatar masked');
 check(el('#global_nav_profile_link img').alt === 'Anonymous user', 'avatar accessible name masked');
 for (const s of ['.canvasrefined-dashboard-notes','.canvasrefined-gpa-card','.canvasrefined-gpa','#better-todo-add-task-menu']) check(getComputedStyle(el(s)).display === 'none', s + ' hidden');
 await wait();
 // Canvas rewrites an existing marked node, including attributes only.
 el('.ic-DashboardCard__header-title span').firstChild.data = 'Private course';
 el('.ic-DashboardCard').setAttribute('aria-label', 'Visit Private course');
 el('#global_nav_profile_link img').alt = 'New private user';
 const late = el('.ic-DashboardCard').cloneNode(true);
 late.querySelector('.ic-DashboardCard__header-title span').textContent = 'Private course';
 document.body.append(late);
 await wait(); anonymizePersonalDetails();
 check(el('.ic-DashboardCard__header-title span').textContent === fake, 'rewritten text masked');
 check(el('.ic-DashboardCard').getAttribute('aria-label') === 'Visit ' + fake, 'rewritten aria-label masked');
 check(el('#global_nav_profile_link img').alt === 'Anonymous user', 'rewritten avatar alt masked');
 check(late.querySelector('h2 span').textContent === fake, 'late card masked');
 let mutations = 0; const observer = new MutationObserver(records => mutations += records.length);
 observer.observe(document.body, {childList:true,subtree:true,attributes:true,characterData:true});
 anonymizePersonalDetails(); anonymizePersonalDetails(); await wait(); observer.disconnect();
 check(mutations === 0, 'observer settles without mutation loop');
 options.hide_personal_details = false; setupPersonalDetailsHiding(); progress();
 check(el('.cr-pl-label').textContent === 'Private course', 'bar restored');
 check(el('.canvasrefined-reminder-title').textContent === 'Private assignment', 'reminder restored');
 check(el('.ic-DashboardCard__header-title span').textContent === 'Private course', 'course restored');
 check(el('.recent_feedback').outerHTML === originals[1], 'feedback restored exactly');
 check(el('#global_nav_profile_link img').alt === 'New private user', 'latest avatar alt restored');
 check(!document.getElementById('canvasrefined-personal-details-privacy'), 'privacy stylesheet removed');
 check(getComputedStyle(el('.canvasrefined-dashboard-notes')).display !== 'none', 'notes restored');
 check(el('#global_nav_profile_link img').getAttribute('src') === 'private-avatar.png', 'avatar source preserved');
 document.querySelector('#result').textContent = errors.length ? 'FAIL: ' + errors.join('; ') : 'PASS: avatar, consistent course labels, private widgets, overlays, reminders, late rendering, node rewrites, observer settling, restoration';
})().catch(error => document.querySelector('#result').textContent = 'FAIL: ' + error.stack);
</script>`);
