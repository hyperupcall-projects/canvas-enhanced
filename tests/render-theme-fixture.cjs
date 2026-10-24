// Build a standalone browser fixture using the production palettes and CSS.
// Open the output in Firefox/Chrome to run computed-style checks for every
// built-in in both modes, plus live light/dark switching and image retention.
const fs = require('node:fs');
const content = fs.readFileSync('js/content.js', 'utf8');
const script = fs.readFileSync('js/themes.js', 'utf8') + '\n' +
    fs.readFileSync('css/darkmodecss.js', 'utf8') + '\n' +
    'let options = {};\n' +
    content.slice(content.indexOf('const BC_LIGHT_DEFAULTS'), content.indexOf('let darkStyleInserted'));
const fixture = `<!doctype html><meta charset="utf-8"><title>Theme rendering checks</title>
<style>body{font:15px sans-serif;background:#eceef1;color:#222;margin:20px}h1{font-size:24px}#cases{display:grid;grid-template-columns:1fr 1fr;gap:14px}iframe{width:100%;height:255px;border:0;border-radius:8px}#result{white-space:pre-wrap;padding:15px;background:white}</style>
<h1>Canvas Enhanced — light and dark palette checks</h1><pre id="result">RUNNING</pre><div id="cases"></div>
<script>${script.replace(/<\/script/gi, '<\\/script')}
const errors = [];
let checks = 0;
function check(ok, message) { checks++; if (!ok) errors.push(message); }
function normalize(doc, color) { const el = doc.createElement('div'); el.style.color = color; doc.body.append(el); const result = doc.defaultView.getComputedStyle(el).color; el.remove(); return result; }
(async () => {
    // Put Kirby first for the visual regression that motivated these checks.
    const ordered = [...themes].sort((a, b) => Number(b.title.startsWith('Kirby')) - Number(a.title.startsWith('Kirby')));
    for (const theme of ordered) for (const dark of [false, true]) {
        options = { ...theme.exports, dark_mode: dark, device_dark: false };
        const expected = activeThemeValues(dark);
        const css = generateDarkModeCSS();
        const frame = document.createElement('iframe');
        document.getElementById('cases').append(frame);
        const loaded = new Promise(resolve => frame.onload = resolve);
        frame.srcdoc = '<!doctype html><meta http-equiv="Content-Security-Policy" content="img-src data:"><style>body{font:14px sans-serif;margin:0;background:white;color:black}#wrapper,#main,#content-wrapper,#content{background:white}.ic-app-header{float:left;width:80px;height:255px;padding:12px;box-sizing:border-box}.ic-Layout-contentMain{margin-left:90px;padding:12px}.ic-DashboardCard{border:1px solid var(--bcborders);border-radius:6px;padding:10px}.card-image{height:20px;background-image:linear-gradient(90deg,red,blue)}.btn,input,.alert-info{border:1px solid var(--bcborders);padding:5px;margin-top:6px}.alert-info{display:block}</style><style id="darkcss">' + css + '</style><body><header class="ic-app-header"><span class="menu-item__text">Canvas<br>Courses</span></header><div id="wrapper"><div id="main"><div id="content-wrapper"><main id="content" class="ic-Layout-contentMain"><b>' + theme.title + ' · ' + (dark ? 'Dark' : 'Light') + '</b><div class="ic-DashboardCard"><div class="card-image"></div><div class="ic-DashboardCard__header_content">Course card <a href="#">Assignments</a></div></div><button class="btn">Button</button><input aria-label="Input" value="Input"><div class="alert-info">Raised / interactive surface</div><aside id="right-side">Todo / feedback panel</aside></main></div></div></div>';
        await loaded;
        const doc = frame.contentDocument;
        const style = selector => frame.contentWindow.getComputedStyle(doc.querySelector(selector));
        for (const selector of ['body', '#wrapper', '#main', '#content-wrapper', '#content']) {
            check(style(selector).backgroundColor === normalize(doc, expected['background-0']), theme.title + ' ' + dark + ' page surface ' + selector);
        }
        for (const selector of ['.ic-DashboardCard', '.ic-DashboardCard__header_content', '#right-side', '.btn', 'input']) {
            check(style(selector).backgroundColor === normalize(doc, expected['background-1']), theme.title + ' ' + dark + ' panel surface ' + selector);
        }
        check(style('.alert-info').backgroundColor === normalize(doc, expected['background-2']), theme.title + ' ' + dark + ' raised surface');
        check(style('body').color === normalize(doc, expected['text-0']), theme.title + ' text');
        check(style('a').color === normalize(doc, expected.links), theme.title + ' link');
        const image = style('.card-image').backgroundImage;
        options.dark_mode = !dark;
        doc.querySelector('#darkcss').textContent = generateDarkModeCSS();
        check(style('#content').backgroundColor === normalize(doc, activeThemeValues(!dark)['background-0']), theme.title + ' live switch');
        check(style('.card-image').backgroundImage === image, theme.title + ' image unchanged');
        doc.querySelector('#darkcss').textContent = css;
    }
    document.getElementById('result').textContent = errors.length ? 'FAIL: ' + errors.length + ' / ' + checks + '\\n' + errors.join('\\n') : 'PASS: ' + checks + ' computed-style checks across all 24 themes, both modes, and live switching. Images unchanged.';
    document.title = errors.length ? 'FAIL' : 'PASS';
})();
</script>`;
const output = process.argv[2] || '/tmp/canvas-theme-rendering.html';
fs.writeFileSync(output, fixture);
console.log(output);
