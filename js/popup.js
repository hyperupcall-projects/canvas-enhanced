const syncedSwitches = ['remind', 'tab_icons', 'remlogo', 'full_width', 'assignments_due', 'gpa_calc', 'gradient_cards', 'disable_color_overlay', 'dashboard_grades', 'dashboard_notes', 'better_todo', 'better_sidebar', 'condensed_cards', 'hide_new_canvas', 'hide_sequence_footer', 'center_cards', 'quiz_safe_mode', 'global_search', 'grade_analytics', 'hide_personal_details'];
const syncedSubOptions = [
	"grade_analytics_zones",
	"hide_course_images",
	"todo_hide_feedback",
	"todo_hide_read",
	"todo_full_height",
    "todo_confetti",
    "todo_progress_rings",
    "todo_timeframe",

	"relative_dues",
	"card_overdues",
	"hide_completed_cards",
	"equal_height_cards",
	// "todo_overdues",
	"gpa_calc_prepend",
	"gpa_calc_cumulative",
	"gpa_calc_weighted",

	"num_assignments",
	"assignment_date_format",
	"todo_hr24",
	"todo_separate_scrollbar",
	"todo_alternate_colors",
	"todo_ignore_card_colors",
	"todo_remove_icons",
	"todo_show_scores",
	"grade_hover",
	"card_letter",
	"auto_detect_disabled",
	// "hide_completed",
	"num_todo_items",
	"hover_preview",
	"imageSize",
	"cardRoundness",
	"cardSpacing",
	"cardWidth",
	"cardHeight",
	"cardPadding",
    "sidebar_scale",
];
const localSwitches = [];

// Ignore obsolete settings in older exports and saved themes.
const removedStyleOptions = new Set([
    "auto_dark", "auto_dark_start", "auto_dark_end",
    "custom_font", "custom_font_skip_p", "custom_styles", "customCardStyles",
    "customBackgroundLink", "customBackgroundScale", "customBackgroundDaily",
    "customBackgroundNasaDaily", "nasaInfoOverlay", "fitImageToScreen",
    "nasaFitToScreen", "bg_opacity", "sidebar_opacity", "bg_blur",
    "sidebar_blur", "card_opacity", "card_blur", "card_transparency",
    "imageRoundness", "card_grid", "card_grid_columns", "card_grid_rows", "card_grid_column_gap", "card_grid_row_gap", "card_grid_center_rows", "card_grid_flex",
]);

// Theme export only carries visual settings, never personal productivity data.
const exportCardColorToggles = ["gradient_cards", "disable_color_overlay"];
const exportCardStyles = ["imageSize", "cardRoundness", "cardSpacing", "cardWidth", "cardHeight", "cardPadding"];
const exportLayout = ["full_width", "center_cards", "condensed_cards", "equal_height_cards", "remlogo", "hide_new_canvas", "hide_navbar", "tab_icons"];
const exportSidebar = ["better_sidebar", "sidebar_scale"];
const exportTodo = ["better_todo", "todo_hide_feedback", "todo_hide_read", "todo_full_height", "todo_confetti", "todo_progress_rings", "todo_timeframe", "todo_hr24", "todo_separate_scrollbar", "todo_alternate_colors", "todo_ignore_card_colors", "todo_remove_icons", "todo_show_scores", "hover_preview"];
const exportGpa = ["gpa_calc", "gpa_calc_prepend", "gpa_calc_cumulative", "gpa_calc_weighted", "gpa_threshold_mode", "gpa_course_bounds"];

const apiurl = "none";

const defaultOptions = {
    "local": {
        "previous_colors": null,
        "errors": [],
    },
    "sync": {
        "dark_preset": {
            "background-0": "#161616",
            "background-1": "#1e1e1e",
            "background-2": "#262626",
            "borders": "#3c3c3c",
            "text-0": "#f5f5f5",
            "text-1": "#e2e2e2",
            "text-2": "#ababab",
            "links": "#56Caf0",
            "sidebar": "#1e1e1e",
            "sidebar-text": "#f5f5f5"
        },
        "new_install": true,
        "assignments_due": true,
        "hide_personal_details": false,
        "hide_course_images": false,
        "gpa_calc": false,
        "dark_mode": true,
        "gradent_cards": false,
        "disable_color_overlay": false,

        "num_assignments": 4,
        "custom_domain": [""],
        "custom_domain_denied": [],
        "auto_detect_disabled": false,
        "assignments_done": [],
        "dashboard_grades": false,
        "assignment_date_format": false,
        "dashboard_notes": false,
        "dashboard_notes_text": "",
        "dashboard_notes_mode": "edit",
        "better_todo": true,
        "better_sidebar": false,
        "sidebar_scale": 100,
        "todo_hr24": false,
		"todo_separate_scrollbar": false,
		"todo_alternate_colors": false,
		"todo_ignore_card_colors": false,
		"todo_remove_icons": false,
		"todo_show_scores": false,
        "todo_hide_read": true,
        "condensed_cards": false,
        "center_cards": false,
        "custom_cards": {},
        "custom_cards_2": {},
        "custom_cards_3": {},
        "custom_assignments": [],
        "custom_assignments_overflow": ["custom_assignments"],
        "grade_hover": false,
        "card_letter": true,
        // "hide_completed": false,
        "num_todo_items": 10,
        "hover_preview": true,
        "full_width": null,
        "remlogo": null,
        "gpa_threshold_mode": "all",
        "gpa_course_bounds": {},
        "gpa_calc_bounds": {
            "A+": { "cutoff": 97, "gpa": 4.0 },
            "A": { "cutoff": 93, "gpa": 4 },
            "A-": { "cutoff": 90, "gpa": 3.7 },
            "B+": { "cutoff": 87, "gpa": 3.3 },
            "B": { "cutoff": 83, "gpa": 3 },
            "B-": { "cutoff": 80, "gpa": 2.7 },
            "C+": { "cutoff": 77, "gpa": 2.3 },
            "C": { "cutoff": 73, "gpa": 2 },
            "C-": { "cutoff": 70, "gpa": 1.7 },
            "D+": { "cutoff": 67, "gpa": 1.3 },
            "D": { "cutoff": 63, "gpa": 1 },
            "D-": { "cutoff": 60, "gpa": .7 },
            "F": { "cutoff": 0, "gpa": 0 }
        },
        // "todo_overdues": false,
        "card_overdues": false,
        "hide_completed_cards": false,
        "relative_dues": false,
        "equal_height_cards": false,
        "hide_new_canvas": true,
        "hide_sequence_footer": false,
        "hide_navbar": false,
        "grade_analytics_zones": false,
        "quiz_safe_mode": false,
        "assignment_states": {},
        "tab_icons": false,
        "todo_hide_feedback": false,
		"todo_full_height": false,
        "todo_progress_rings": "rings",
		"todo_timeframe": "all",
		"todo_more_expanded": false,
		"todo_confetti": true,
        "device_dark": false,
        "cumulative_gpa": { "name": "Cumulative GPA", "hidden": false, "weight": "dnc", "credits": 999, "gr": 3.21 },
        // "show_updates": false,
        "card_method_date": false,
        "card_method_dashboard": true,
        "card_limit": 25,
        "imageSize": 100,
        "cardRoundness": 5,
        "cardSpacing": 0,
        "cardWidth": 262,
        "cardHeight": 146,
        "cardPadding": 0,
    }
};

sendFromPopup("getCards");

// refresh the cards if new ones were just recieved
chrome.storage.onChanged.addListener((changes) => {
    if (changes["custom_cards"]) {
        if (Object.keys(changes["custom_cards"].oldValue || {}).length !== Object.keys(changes["custom_cards"].newValue || {}).length) {
            displayAdvancedCards();
        }
    }
});

function displayErrors() {
    chrome.storage.local.get("errors", storage => {
        storage["errors"].forEach(e => {
            document.querySelector("#error_log_output").value += (e + "\n\n");
        })
    });
}

document.addEventListener("DOMContentLoaded", setup);

function setupAssignmentsSlider(initial) {
    let el = document.querySelector('#numAssignmentsSlider');
    el.value = initial;
    document.querySelector('#numAssignments').textContent = initial;
    el.addEventListener('input', function () {
        document.querySelector('#numAssignments').textContent = this.value;
        chrome.storage.sync.set({ "num_assignments": this.value });
    });
}

function setupTodoSlider(initial) {
    let el = document.querySelector('#numTodoItemsSlider');
    el.value = initial;
    document.querySelector('#numTodoItems').textContent = initial;
    document.querySelector('#numTodoItemsSlider').addEventListener('input', function () {
        document.querySelector('#numTodoItems').textContent = this.value;
        chrome.storage.sync.set({ "num_todo_items": this.value });
    });
}

function setupSidebarScaleSlider(initial) {
    let el = document.querySelector("#sidebarScaleSlider");
    if (!el) return;
    el.value = initial;
    document.querySelector("#sidebarScaleValue").textContent = initial;
    el.addEventListener("input", function () {
        document.querySelector("#sidebarScaleValue").textContent = this.value;
        chrome.storage.sync.set({ "sidebar_scale": parseInt(this.value) });
    });
}

// Progress display dropdown. Normalizes legacy boolean values:
// true -> rings, false/undefined -> none.
function setupProgressRingsSelect(initial) {
    const el = document.querySelector("#todo_progress_rings");
    if (!el) return;
    let value = initial;
    if (value === true) value = "rings";
    else if (value === false || value === undefined || value === null) value = "none";
    const allowed = ["none", "rings", "rainbow", "lines", "line"];
    if (!allowed.includes(value)) value = "rings";
    el.value = value;
    el.addEventListener("change", function () {
        chrome.storage.sync.set({ "todo_progress_rings": this.value });
    });
}

// Collapsible "More options" section for the Better Todo List sub-options.
// Persists whether it's expanded so the popup reopens in the same state.
function setupTodoMoreOptions(initial) {
    const wrap = document.getElementById("todo-more-options");
    const toggle = document.getElementById("todo-more-toggle");
    if (!wrap || !toggle) return;
    const setExpanded = (expanded) => {
        wrap.classList.toggle("expanded", expanded === true);
        toggle.setAttribute("aria-expanded", expanded === true ? "true" : "false");
    };
    setExpanded(initial === true);
    const flip = () => {
        const expanded = !wrap.classList.contains("expanded");
        setExpanded(expanded);
        chrome.storage.sync.set({ "todo_more_expanded": expanded });
    };
    toggle.addEventListener("click", flip);
    toggle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            flip();
        }
    });
}

// Timeframe dropdown for the upcoming Tasks tab. Persisted so the Better Todo
// List remembers the selected range across sessions.
function setupTimeframeSelect(initial) {
    const el = document.querySelector("#todo_timeframe");
    if (!el) return;
    const allowed = ["all", "1week", "2week", "month", "2month"];
    let value = allowed.includes(initial) ? initial : "all";
    el.value = value;
    el.addEventListener("change", function () {
        chrome.storage.sync.set({ "todo_timeframe": this.value });
    });
}

// Keep the existing storage keys compatible with saved themes.
function setupAppearanceMode() {
    const select = document.getElementById("appearance-mode");
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    function refresh() {
        chrome.storage.sync.get(["dark_mode", "device_dark"], sync => {
            select.value = sync.device_dark === true ? "system" : sync.dark_mode === false ? "light" : "dark";
            toggleAlternateColorsVisibility(select.value === "system" ? media.matches : select.value === "dark");
        });
    }
    select.addEventListener("change", () => {
        chrome.storage.sync.set({
            dark_mode: select.value === "dark",
            device_dark: select.value === "system",
        });
    });
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === "sync" && (changes.dark_mode || changes.device_dark)) refresh();
    });
    media.addEventListener("change", refresh);
    refresh();
}

function setupCardLimitSlider(initial) {
    let el = document.querySelector("#card_limit");
    el.value = initial;
    document.querySelector("#card_limit_num").textContent = initial;
    el.addEventListener("change", (e) => {
        chrome.storage.sync.set({ "custom_cards": {}, "custom_cards_2": {}, "custom_cards_3": {}, "card_limit": parseInt(e.target.value)});
    });
    el.addEventListener("input", (e) => {
        document.querySelector("#card_limit_num").textContent = e.target.value;
    })
}

function setupDashboardMethod(initial) {
    const el = document.getElementById("card_method_dashboard");
    el.checked = initial === true ? true : false;

    el.addEventListener("change", (e) => {
        chrome.storage.sync.set({ "custom_cards": {}, "custom_cards_2": {}, "custom_cards_3": {}, "card_method_dashboard": e.target.checked });
    });
}

// Custom card style inputs (image size, roundness, spacing, width, height,
// padding) fire `chrome.storage.sync.set` on every keystroke/arrow press.
// chrome.storage.sync caps writes at MAX_WRITE_OPERATIONS_PER_MINUTE (120/min),
// so rapidly adjusting these number inputs used to hit the quota and surface
// a "quota exceeded" error. Coalesce rapid edits into a single write with a
// short (200ms) debounce — barely noticeable to the user, but stays well
// under the write quota even when dragging arrows or typing fast.
const cardStyleSetTimers = {};
function debouncedCardStyleSet(key, value, delay = 200) {
    if (cardStyleSetTimers[key]) clearTimeout(cardStyleSetTimers[key]);
    cardStyleSetTimers[key] = setTimeout(() => {
        chrome.storage.sync.set({ [key]: value });
    }, delay);
}

function setupImageSizeInput(initial) {
    let el = document.querySelector("#imageSize");
    el.value = initial;
    el.addEventListener("input", (e) => {
        debouncedCardStyleSet("imageSize", e.target.value);
    });
}

function setupCardRoundnessInput(initial) {
    let el = document.querySelector("#cardRoundness");
    el.value = initial;
    el.addEventListener("input", (e) => {
        debouncedCardStyleSet("cardRoundness", e.target.value);
    });
}

function setupCardSpacingInput(initial) {
    let el = document.querySelector("#cardSpacing");
    el.value = initial;
    el.addEventListener("input", (e) => {
        debouncedCardStyleSet("cardSpacing", e.target.value);
    });
}

function setupCardWidthInput(initial) {
    let el = document.querySelector("#cardWidth");
    el.value = initial;
    el.addEventListener("input", (e) => {
        debouncedCardStyleSet("cardWidth", e.target.value);
    });
}

function setupCardHeightInput(initial) {
	let el = document.querySelector("#cardHeight");
	el.value = initial;
	el.addEventListener("input", (e) => {
		debouncedCardStyleSet("cardHeight", e.target.value);
	});
}

function setupCardPaddingInput(initial) {
    let el = document.querySelector("#cardPadding");
    el.value = initial;
    el.addEventListener("input", (e) => {
        debouncedCardStyleSet("cardPadding", e.target.value);
    });
}

function toggleBetterSidebarSubOptions(betterSidebarOn) {
    const remlogoEl = document.getElementById("remlogo");
    if (remlogoEl) {
        remlogoEl.style.display = betterSidebarOn ? "none" : "flex";
    }
    const sidebarScaleEl = document.getElementById("sidebarScaleSub");
    if (sidebarScaleEl) {
        sidebarScaleEl.style.display = betterSidebarOn ? "block" : "none";
    }
}

// "Alternate colors" (Better Todo List sub-option) only makes sense in light
// mode, so hide its checkbox whenever dark mode is on.
function toggleAlternateColorsVisibility(darkModeOn) {
    const wrap = document.getElementById("todo_alternate_colors_wrap");
    if (wrap) wrap.style.display = darkModeOn ? "none" : "";
}

// Hide a toggle's sub-options when it's off.
function toggleSubOptionsVisibility(option, isOn) {
    const togglesWithSubOptions = ["gpa_calc", "assignments_due", "better_todo", "grade_analytics", "hide_personal_details"];
    if (!togglesWithSubOptions.includes(option)) return;
    const optionEl = document.getElementById(option);
    if (!optionEl) return;
    const subOptions = optionEl.parentElement.querySelector(":scope > .sub-options");
    if (!subOptions) return;
    subOptions.style.display = isOn ? "" : "none";
}

function setupFeatureSearch(menu) {
    const searchInput = document.querySelector("#feature-search");
    const resultsEl = document.querySelector("#feature-search-results");
    const headerSearch = document.querySelector("#header-search");
    if (!searchInput || !resultsEl || !headerSearch) return;

    // Map (reference-keyed) each .tab element -> the button id that opens it.
    // A plain object won't work: DOM elements stringify to the same key.
    const tabElToBtnId = new Map();
    Object.entries(menu.tabs).forEach(([btnId, info]) => {
        const tabEl = document.querySelector(info.tab);
        if (tabEl) tabElToBtnId.set(tabEl, btnId);
    });

    function shouldSkip(el) {
        // Skip overlays / scrapped containers that aren't real features
        if (el.closest('#submit-popup, #opt-in, #card-edit-menu')) return true;
        // Skip statically-hidden containers but keep dynamically-hidden sub-options.
        let node = el;
        while (node && node !== document.body) {
            if (node.classList && node.classList.contains('option-container') && node.style.display === 'none') return true;
            node = node.parentElement;
        }
        return false;
    }

    function labelOf(sub) {
        const label = sub.querySelector("label");
        if (label) return label.textContent.trim();
        const st = sub.querySelector(".sub-text");
        if (st) return st.textContent.trim();
        // Bare <span> label (e.g. Export Settings checkboxes have no label/.sub-text).
        const span = sub.querySelector("span");
        if (span) return span.textContent.trim();
        return "";
    }

    function keyIdOf(sub) {
        const label = sub.querySelector("label");
        if (label && label.getAttribute("for")) return label.getAttribute("for");
        const input = sub.querySelector("input");
        if (input && input.id) return input.id;
        return labelOf(sub);
    }

    function categoryFor(el) {
        const tabEl = el.closest(".tab");
        if (tabEl) {
            const btnId = tabElToBtnId.get(tabEl);
            if (btnId) {
                const btn = document.getElementById(btnId);
                const span = btn && btn.querySelector("span");
                if (span) return span.textContent.trim();
            }
            return "Section";
        }
        if (el.classList && el.classList.contains("tab-btn")) return "Section";
        if (el.classList && el.classList.contains("option")) return "Settings";
        const owner = el.closest(".option");
        if (owner) {
            const name = owner.querySelector(".option-name");
            if (name) return name.textContent.trim();
        }
        return "Settings";
    }

    function openTab(btnId) {
        const btn = document.getElementById(btnId);
        if (btn) btn.click();
    }

    function showMain() {
        const back = document.querySelector(".back-btn");
        if (back) back.click();
    }

    // Reveal any hidden sub-option blocks between el and .main so the target
    // is visible (purely visual; doesn't change stored settings).
    function revealAncestors(el) {
        const main = document.querySelector(".main");
        let node = el;
        while (node && node !== main && node !== document.body) {
            if (node.style && node.style.display === "none") node.style.display = "";
            node = node.parentElement;
        }
        // Expand the Better Todo "More options" collapsible if the target lives inside it.
        const moreWrap = el.closest ? el.closest("#todo-more-options") : null;
        if (moreWrap && !moreWrap.classList.contains("expanded")) {
            const toggle = document.getElementById("todo-more-toggle");
            if (toggle) toggle.click();
        }
    }

    function highlight(el) {
        el.classList.add("search-highlight");
        setTimeout(() => el.classList.remove("search-highlight"), 2000);
    }

    function goToMainElement(el) {
        showMain();
        revealAncestors(el);
        requestAnimationFrame(() => {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            highlight(el);
        });
    }

    function goToTabElement(el) {
        const tabEl = el.closest(".tab");
        const btnId = tabElToBtnId.get(tabEl);
        if (btnId) openTab(btnId);
        requestAnimationFrame(() => {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            highlight(el);
        });
    }

    let featureIndex = null;
    let currentMatches = [];
    let activeIndex = -1;

    function buildIndex() {
        const index = [];
        const seen = new Set();
        function add(entry) {
            if (!entry.text || seen.has(entry.key)) return;
            seen.add(entry.key);
            index.push(entry);
        }

        // Big section buttons (Cards, Themes, GPA Settings, Debug)
        document.querySelectorAll(".more-options-container .tab-btn").forEach(btn => {
            const span = btn.querySelector("span");
            add({ key: "tab:" + btn.id, text: span ? span.textContent.trim() : "", el: btn, action: () => openTab(btn.id) });
        });

        // Home: option toggles
        document.querySelectorAll(".options .option").forEach(opt => {
            if (!opt.id) return;
            const name = opt.querySelector(".option-name");
            if (!name) return;
            if (shouldSkip(opt)) return;
            add({ key: "option:" + opt.id, text: name.textContent.trim(), el: opt, action: () => goToMainElement(opt) });
        });

        // Home: sub-options / timesets / labelled rows (e.g. "Use dd/mm", "Start time", max-items)
        document.querySelectorAll(".options .sub-option, .options .timeset, .options .sub-options > div").forEach(sub => {
            if (shouldSkip(sub)) return;
            // Skip statically-hidden sub-options; dynamically-hidden ones stay indexed.
            if (sub.classList.contains("sub-option") && sub.style.display === "none") return;
            const text = labelOf(sub);
            if (!text) return;
            add({ key: "sub:" + keyIdOf(sub), text, el: sub, action: () => goToMainElement(sub) });
        });

        // Home: custom Canvas URLs
        const customDomain = document.querySelector(".customDomain");
        if (customDomain && !shouldSkip(customDomain)) {
            const wrap = customDomain.closest(".customDomain");
            const label = wrap ? wrap.querySelector("[data-i18n='enter_url']") : null;
            add({ key: "custom:customDomain", text: label ? label.textContent.trim() : "Canvas URL", el: wrap || customDomain, action: () => goToMainElement(wrap || customDomain) });
        }

        // Tabs: section headings (e.g. "Presets", "Popular Palettes")
        document.querySelectorAll(".tab .header-small").forEach(h => {
            if (shouldSkip(h)) return;
            const text = h.textContent.trim();
            if (!text) return;
            const btnId = tabElToBtnId.get(h.closest(".tab"));
            add({ key: "heading:" + (btnId || "?") + ":" + text, text, el: h, action: () => goToTabElement(h) });
        });

        // Tabs: checkbox sub-options (e.g. "Center uneven rows", "Flexible grid")
        document.querySelectorAll(".tab .sub-option").forEach(sub => {
            if (shouldSkip(sub)) return;
            const text = labelOf(sub);
            if (!text) return;
            const btnId = tabElToBtnId.get(sub.closest(".tab"));
            add({ key: "tabsub:" + (btnId || "?") + ":" + keyIdOf(sub), text, el: sub, action: () => goToTabElement(sub) });
        });

        // Dark mode color fields (e.g. "Sidebar Text", "Background Main")
        document.querySelectorAll(".tab .color-type-header").forEach(h => {
            if (shouldSkip(h)) return;
            const text = h.textContent.trim();
            if (!text) return;
            const btnId = tabElToBtnId.get(h.closest(".tab"));
            add({ key: "color:" + (btnId || "?") + ":" + text, text, el: h, action: () => goToTabElement(h) });
        });

        // Tab: preset buttons (dark mode presets + popular color palettes).
        document.querySelectorAll(".tab .preset-button").forEach(btn => {
            if (shouldSkip(btn)) return;
            const text = btn.textContent.trim().replace(/\s+/g, " ");
            if (!text || text === "placeholder") return;
            const btnId = tabElToBtnId.get(btn.closest(".tab"));
            add({ key: "preset:" + (btnId || "?") + ":" + (btn.id || text), text, el: btn, action: () => goToTabElement(btn) });
        });

        // Tab: standalone action buttons with distinct labels (GPA scale presets, revert colors).
        ["gpa-plus-minus", "gpa-by-letter", "revert-colors", "save-theme", "import-theme"].forEach(id => {
            const btn = document.getElementById(id);
            if (!btn || shouldSkip(btn)) return;
            const text = btn.textContent.trim();
            if (!text) return;
            add({ key: "action:" + id, text, el: btn, action: () => goToTabElement(btn) });
        });

        // Tab: checkbox/radio controls whose label is a bare sibling span and that
        // aren't wrapped in .sub-option (e.g. "Get Active Cards From Dashboard",
        // sidebar background "Solid/Gradient/Image").
        document.querySelectorAll(".tab input[type='checkbox'], .tab input[type='radio']").forEach(input => {
            if (!input.id) return;
            if (input.closest(".sub-option") || input.closest(".option")) return;
            if (shouldSkip(input)) return;
            const text = (input.parentElement && input.parentElement.textContent.trim()) || "";
            if (!text) return;
            const btnId = tabElToBtnId.get(input.closest(".tab"));
            add({ key: "control:" + (btnId || "?") + ":" + input.id, text, el: input, action: () => goToTabElement(input) });
        });

        return index;
    }

    function filterFeatures(query) {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        if (!featureIndex) featureIndex = buildIndex();
        const scored = [];
        for (const entry of featureIndex) {
            const t = entry.text.toLowerCase();
            let score = -1;
            if (t === q) score = 1000;
            else if (t.startsWith(q)) score = 500 - t.length;
            else {
                const idx = t.indexOf(q);
                if (idx !== -1) score = 200 - idx;
                else if (t.split(/\s+/).some(w => w.toLowerCase().startsWith(q))) score = 50;
            }
            if (score >= 0) scored.push({ entry, score });
        }
        scored.sort((a, b) => b.score - a.score || a.entry.text.length - b.entry.text.length);
        return scored.slice(0, 12).map(s => s.entry);
    }

    function renderResults(matches) {
        currentMatches = matches;
        activeIndex = matches.length ? 0 : -1;
        resultsEl.innerHTML = "";
        if (!matches.length) {
            const empty = document.createElement("div");
            empty.className = "search-result empty";
            empty.textContent = "No features found";
            resultsEl.appendChild(empty);
            resultsEl.classList.add("open");
            return;
        }
        matches.forEach((entry, i) => {
            const item = document.createElement("div");
            item.className = "search-result" + (i === activeIndex ? " active" : "");
            item.setAttribute("role", "option");
            const title = document.createElement("span");
            title.className = "search-result-title";
            title.textContent = entry.text;
            const cat = document.createElement("span");
            cat.className = "search-result-category";
            cat.textContent = categoryFor(entry.el);
            item.appendChild(title);
            item.appendChild(cat);
            item.addEventListener("mousedown", (e) => {
                e.preventDefault();
                selectResult(i);
            });
            resultsEl.appendChild(item);
        });
        resultsEl.classList.add("open");
    }

    function setActive(i) {
        activeIndex = i;
        const items = resultsEl.querySelectorAll(".search-result");
        items.forEach((el, idx) => el.classList.toggle("active", idx === i));
        const active = resultsEl.querySelector(".search-result.active");
        if (active) active.scrollIntoView({ block: "nearest" });
    }

    function closeResults() {
        resultsEl.classList.remove("open");
        resultsEl.innerHTML = "";
        currentMatches = [];
        activeIndex = -1;
    }

    function selectResult(i) {
        const entry = currentMatches[i];
        if (!entry) return;
        closeResults();
        searchInput.value = "";
        searchInput.blur();
        entry.action();
    }

    searchInput.addEventListener("input", () => {
        if (!searchInput.value.trim()) { closeResults(); return; }
        renderResults(filterFeatures(searchInput.value));
    });
    searchInput.addEventListener("focus", () => {
        if (searchInput.value.trim()) renderResults(filterFeatures(searchInput.value));
    });
    searchInput.addEventListener("keydown", (e) => {
        if (!currentMatches.length) {
            if (e.key === "Escape") searchInput.blur();
            return;
        }
        if (e.key === "ArrowDown") { e.preventDefault(); setActive((activeIndex + 1) % currentMatches.length); }
        else if (e.key === "ArrowUp") { e.preventDefault(); setActive((activeIndex - 1 + currentMatches.length) % currentMatches.length); }
        else if (e.key === "Enter") { e.preventDefault(); if (activeIndex >= 0) selectResult(activeIndex); }
        else if (e.key === "Escape") { e.preventDefault(); closeResults(); searchInput.blur(); }
    });
    searchInput.addEventListener("blur", () => setTimeout(closeResults, 150));

    const icon = headerSearch.querySelector(".header-search-icon");
    if (icon) icon.addEventListener("click", () => searchInput.focus());

    document.addEventListener("click", (e) => {
        if (!e.target.closest("#header-search")) closeResults();
    });
}

function setup() {

    const menu = {
		switches: syncedSwitches,
		checkboxes: [
			"hide_navbar",
			"gpa_calc_weighted",
			"gpa_calc_cumulative",
			// /*'card_method_date',*/ "show_updates",
            "todo_hide_feedback",
            "todo_hide_read",
            "todo_confetti",
			"todo_full_height",

			"relative_dues",
			"card_overdues",
			"hide_completed_cards",
			"equal_height_cards",
			// "todo_overdues",
			"gpa_calc_prepend",

			"assignment_date_format",
			"todo_hr24",
			"todo_separate_scrollbar",
			"todo_alternate_colors",
			"todo_ignore_card_colors",
			"todo_remove_icons",
			"todo_show_scores",
			"grade_hover",
			"card_letter",
			"auto_detect_disabled",
			"hide_course_images",
			// "hide_completed",
			"hover_preview",
			"grade_analytics_zones",
		],
		tabs: {
			"advanced-settings": {
				setup: displayAdvancedCards,
				tab: ".advanced",
			},
			"gpa-bounds-btn": {
				setup: displayGPABounds,
				tab: ".gpa-bounds-container",
			},
			"import-export-btn": {
				setup: () => { displayThemeList(); checkHighContrastWarning(); },
				tab: ".import-export",
			},
			"debug-btn": {
				setup: displayErrors,
				tab: ".debug-container",
			},
			"updates-btn": { setup: null, tab: ".updates-container" },
		},
		special: [
			{
				identifier: "num_assignments",
				setup: (initial) => setupAssignmentsSlider(initial),
			},
			{
				identifier: "num_todo_items",
				setup: (initial) => setupTodoSlider(initial),
			},
            {
                identifier: "sidebar_scale",
                setup: (initial) => setupSidebarScaleSlider(initial),
            },

			{
				identifier: "card_limit",
				setup: (initial) => setupCardLimitSlider(initial),
			},
			{
				identifier: "card_method_dashboard",
				setup: (initial) => setupDashboardMethod(initial),
			},

			{
				identifier: "imageSize",
				setup: (initial) => setupImageSizeInput(initial),
			},
			{
				identifier: "cardRoundness",
				setup: (initial) => setupCardRoundnessInput(initial),
			},
			{
				identifier: "cardSpacing",
				setup: (initial) => setupCardSpacingInput(initial),
			},
			{
				identifier: "cardWidth",
				setup: (initial) => setupCardWidthInput(initial),
			},
			{
				identifier: "cardHeight",
				setup: (initial) => setupCardHeightInput(initial),
			},
			{
				identifier: "cardPadding",
				setup: (initial) => setupCardPaddingInput(initial),
			},

			{
				identifier: "todo_progress_rings",
				setup: (initial) => setupProgressRingsSelect(initial),
			},
			{
				identifier: "todo_timeframe",
				setup: (initial) => setupTimeframeSelect(initial),
			},
			{
				identifier: "todo_more_expanded",
				setup: (initial) => setupTodoMoreOptions(initial),
			},
		],
	};

    chrome.storage.sync.get(menu.switches, sync => {
        menu.switches.forEach(option => {
            let optionSwitch = document.getElementById(option);
            let status = sync[option] === true ? "#on" : "#off";
            optionSwitch.querySelector(status).checked = true;
            optionSwitch.querySelector(status).classList.add('checked');

            optionSwitch.querySelector(".slider").addEventListener("mouseup", () => {
                let status = !optionSwitch.querySelector("#on").checked;
                optionSwitch.querySelector("#on").checked = status;
                optionSwitch.querySelector("#on").classList.toggle("checked");
                optionSwitch.querySelector("#off").classList.toggle("checked");
                chrome.storage.sync.set({ [option]: status });
                if (option === "better_sidebar") {
                    toggleBetterSidebarSubOptions(status);
                }
                if (option === "hide_personal_details" && status === false) {
                    // "Temporarily remove all course images" is a sub-option of
                    // the privacy mode: switching the mode off restores the
                    // images too (the content script listens for this key and
                    // removes its hiding stylesheet).
                    const imgCheckbox = document.getElementById("hide_course_images");
                    if (imgCheckbox) imgCheckbox.checked = false;
                    chrome.storage.sync.set({ "hide_course_images": false });
                }
                toggleSubOptionsVisibility(option, status);
            });
        });
        toggleBetterSidebarSubOptions(sync["better_sidebar"] === true);
        ["gpa_calc", "assignments_due", "better_todo", "grade_analytics", "hide_personal_details"].forEach(opt => {
            toggleSubOptionsVisibility(opt, sync[opt] === true);
        });

    });

    chrome.storage.sync.get(menu.checkboxes, sync => {
        menu.checkboxes.forEach(option => {
			const checkbox = document.querySelector("#" + option);
			if (!checkbox) {console.log(option); return;}
            checkbox.addEventListener("change", function (e) {
                let status = this.checked;
                chrome.storage.sync.set(JSON.parse(`{"${option}": ${status}}`));
            });
            const value = sync[option] !== undefined ? sync[option] : defaultOptions.sync[option];
            document.querySelector("#" + option).checked = value;
        });

    });

    const specialOptions = menu.special.map(obj => obj.identifier);
    chrome.storage.sync.get(specialOptions, sync => {
        console.log(sync);
        menu.special.forEach(option => {
            if (option.setup !== null) {
                const value = sync[option.identifier] !== undefined ? sync[option.identifier] : defaultOptions.sync[option.identifier];
                option.setup(value);
            }
        });
    })

    setupAppearanceMode();

    // activate tab buttons
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if (menu.tabs[btn.id].setup !== null) menu.tabs[btn.id].setup();
            document.querySelector(".main").style.display = "none";
            document.querySelector(menu.tabs[btn.id].tab).style.display = "block";
            window.scrollTo(0, 0);
        });
    });

    // activate the back buttons on each tab
    document.querySelectorAll(".back-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            document.querySelectorAll(".tab").forEach(tab => {
                tab.style.display = "none";
            });
            document.querySelector(".main").style.display = "block";
        });
    });

    // give everything the appropirate i18n text
    document.querySelectorAll('[data-i18n]').forEach(text => {
        const msg = chrome.i18n.getMessage(text.dataset.i18n);
        // keep the in-HTML fallback text when a key is missing instead of blanking it
        if (msg) text.innerText = msg;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const msg = chrome.i18n.getMessage(el.dataset.i18nPlaceholder);
        if (msg) el.placeholder = msg;
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const msg = chrome.i18n.getMessage(el.dataset.i18nTitle);
        if (msg) el.title = msg;
    });

    // header feature search (search bar that jumps to features)
    setupFeatureSearch(menu);

    // activate dark mode inspector button
    document.querySelector("#inspector-btn").addEventListener("click", async function () {
        document.querySelector("#inspector-output").textContent = (await sendFromPopup("inspect"))["selectors"];
    });

    // activate storage dump button
    document.querySelector("#rk_btn").addEventListener("click", () => {
        chrome.storage.local.get(null, local => {
            chrome.storage.sync.get(null, sync => {
                document.querySelector("#rk_output").value = JSON.stringify(local) + JSON.stringify(sync);
            })
        })
    });

    // activate storage reset button
    document.querySelector("#storage-reset-btn").addEventListener("click", () => {
        chrome.storage.sync.set(defaultOptions["sync"]);
        updateStorageUsage();
    });

    // activate planner cache clear button (Debug tab). Clears the
    // cached planner items locally, then tells any open Canvas tabs to
    // re-fetch fresh data so the clear takes effect without a refresh.
    // Keep the key in sync with PLANNER_CACHE_KEY in content.js.
    document.querySelector("#planner-cache-clear-btn").addEventListener("click", async () => {
        displayAlert(false, "Planner cache cleared.");
        try {
            await chrome.storage.local.remove("planner_cache_v1");
        } catch (e) { /* nothing stored yet */ }
        await sendFromPopup("clearPlannerCache");
        updateStorageUsage();
    });

    // ---- Storage usage display (Debug tab) ----
    // Shows how much space the extension's settings, planner cache, and
    // other local data take, plus the storage quota available to it.
    function formatStorageBytes(bytes) {
        if (bytes == null) return "unknown";
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / 1048576).toFixed(2) + " MB";
    }

    // getBytesInUse is exact but not implemented everywhere (older Firefox),
    // so fall back to measuring the serialized data as a Blob.
    async function storageBytesInUse(area, keys) {
        try {
            const bytes = await area.getBytesInUse(keys ?? null);
            if (typeof bytes === "number") return bytes;
        } catch (e) { /* not supported */ }
        try {
            const data = await area.get(keys ?? null);
            return new Blob([JSON.stringify(data)]).size;
        } catch (e) {
            return null;
        }
    }

    async function updateStorageUsage() {
        const set = (id, text) => {
            const el = document.querySelector(id);
            if (el) el.textContent = text;
        };

        // Sync settings vs the 100 KB chrome.storage.sync quota.
        const syncBytes = await storageBytesInUse(chrome.storage.sync);
        set("#storage-usage-sync", syncBytes == null ? "unknown" : formatStorageBytes(syncBytes) + " of 100 KB quota");

        // Planner cache: size plus item count, so users can see what the
        // to-do cache actually costs (and that clearing it worked).
        const cacheBytes = await storageBytesInUse(chrome.storage.local, "planner_cache_v1");
        let cacheText = "empty";
        if (cacheBytes) {
            try {
                const result = await chrome.storage.local.get("planner_cache_v1");
                const count = result?.["planner_cache_v1"]?.items?.length;
                cacheText = formatStorageBytes(cacheBytes) + (typeof count === "number" ? ` (${count} items)` : "");
            } catch (e) {
                cacheText = formatStorageBytes(cacheBytes);
            }
        }
        set("#storage-usage-cache", cacheText);

        // Everything else in local storage (settings the extension keeps
        // locally, state like the analytics toggle, etc.).
        const localBytes = await storageBytesInUse(chrome.storage.local);
        if (localBytes == null) {
            set("#storage-usage-local", "unknown");
        } else {
            const other = cacheBytes != null ? Math.max(localBytes - cacheBytes, 0) : null;
            set("#storage-usage-local", other == null ? formatStorageBytes(localBytes) : formatStorageBytes(other));
        }

        // Quota available to the extension. With the unlimitedStorage
        // permission this is a large slice of free disk space, so it reads
        // big — that is expected.
        try {
            const est = await navigator.storage.estimate();
            if (est && est.quota) {
                set("#storage-usage-quota", formatStorageBytes(est.quota) + " available");
            }
        } catch (e) { /* estimate unsupported */ }
    }
    updateStorageUsage();

    // Canvas URL list — each school gets its own text box
    const domainListEl = document.querySelector("#custom-domain-list");
    const addDomainBtn = document.querySelector("#add-domain-btn");

    // Normalize a single entry: a full URL becomes its hostname, anything else
    // is kept as typed. Idempotent — rows store bare hostnames
    // ("canvas.school.edu"), which fail new URL() without a scheme, so they're
    // validated as hostnames instead of re-flagged as invalid on every save.
    function sanitizeDomainEntry(val, showAlert = true) {
        let trimmed = val.trim().replace(/ /g, "");
        if (trimmed === "") return "";
        try {
            const host = new URL(trimmed).hostname;
            if (host) {
                clearAlert();
                return host;
            }
        } catch (e) { /* not a full URL — may still be a bare hostname */ }
        // strip scheme/path if new URL couldn't parse it, then validate as a hostname
        const host = trimmed.replace(/^https?:\/\//i, "").replace(/\/.*$/, "");
        if (host && /^[a-z0-9][a-z0-9.-]*$/i.test(host)) {
            clearAlert();
            return host;
        }
        if (showAlert) displayAlert(true, "The URL you entered appears to be invalid, so it might not work.");
        return trimmed;
    }

    function saveDomainList() {
        const domains = [];
        domainListEl.querySelectorAll(".domain-row input").forEach(input => {
            const val = sanitizeDomainEntry(input.value);
            if (val !== "") domains.push(val);
        });
        // keep the legacy [""]-when-empty shape the rest of the code expects
        chrome.storage.sync.set({ custom_domain: domains.length ? domains : [""] });
    }

    function makeDomainRow(value) {
        const row = document.createElement("div");
        row.className = "domain-row";
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "canvas.myschool.edu";
        input.value = value || "";
        input.spellcheck = false;
        input.addEventListener("input", saveDomainList);
        input.addEventListener("blur", () => {
            // normalize what's shown and drop rows left empty
            if (input.value.trim() === "") {
                if (domainListEl.querySelectorAll(".domain-row").length > 1) row.remove();
            } else {
                input.value = sanitizeDomainEntry(input.value);
            }
            saveDomainList();
        });
        const remove = document.createElement("button");
        remove.className = "domain-remove";
        remove.type = "button";
        remove.textContent = "\u2715";
        remove.title = "Remove";
        remove.addEventListener("click", () => {
            const val = sanitizeDomainEntry(input.value, false);
            row.remove();
            saveDomainList();
            // clear any past "no thanks" for this canvas so the detection
            // prompt can ask again if it's visited later
            if (val) {
                chrome.storage.sync.get(["custom_domain_denied"], storage => {
                    const denied = (storage.custom_domain_denied || []).filter(d => d !== val);
                    chrome.storage.sync.set({ custom_domain_denied: denied });
                });
            }
        });
        row.appendChild(input);
        row.appendChild(remove);
        return row;
    }

    chrome.storage.sync.get(["custom_domain"], storage => {
        const domains = (storage.custom_domain || []).filter(d => d && d.trim() !== "");
        domains.forEach(d => domainListEl.appendChild(makeDomainRow(d)));
    });

    addDomainBtn.addEventListener("click", () => {
        domainListEl.appendChild(makeDomainRow(""));
        const rows = domainListEl.querySelectorAll(".domain-row input");
        rows[rows.length - 1].focus();
    });

    const importDialog = document.getElementById("import-theme-dialog");
    const importInput = document.getElementById("import-input");
    const importError = document.getElementById("import-theme-error");
    document.getElementById("import-theme").addEventListener("click", () => {
        importInput.value = "";
        importError.textContent = "";
        importDialog.showModal();
        importInput.focus();
    });
    document.getElementById("cancel-import-theme").addEventListener("click", () => importDialog.close());
    document.getElementById("import-theme-form").addEventListener("submit", e => {
        e.preventDefault();
        try {
            const theme = JSON.parse(importInput.value);
            if (!theme || typeof theme !== "object" || Array.isArray(theme) || !Object.keys(theme).length) {
                throw new Error("Paste a theme object.");
            }
            if (theme.dark_preset !== undefined && theme.dark_preset !== null && theme.dark_preset !== "" && (typeof theme.dark_preset !== "object" || Array.isArray(theme.dark_preset))) {
                throw new Error("Invalid theme colors.");
            }
            if (theme.custom_cards !== undefined && (!Array.isArray(theme.custom_cards) || theme.custom_cards.some(image => typeof image !== "string"))) {
                throw new Error("Invalid theme images.");
            }
            importTheme(theme);
            importDialog.close();
        } catch (error) {
            importError.textContent = "Unable to import. Paste valid exported theme JSON.";
        }
    });

    setupExports();

    document.querySelector("#alert").addEventListener("click", clearAlert);
    // TODO: maybe fix this at some point, idk what is causing the error here
    document.querySelectorAll(".preset-button.customization-button").forEach(btn => btn.addEventListener("click", changeToPresetCSS));

    // Preview while dragging/typing; persist to Canvas when the edit completes.
    const applyCardColors = async (gradient, preview) => {
        let colors = [document.querySelector("#singleColorInput").value];
        if (gradient) {
            const sync = await chrome.storage.sync.get("custom_cards");
            const count = Math.max(2, Object.values(sync.custom_cards || {}).filter(card => !card.hidden).length);
            const from = document.querySelector("#gradientColorFrom").value;
            const to = document.querySelector("#gradientColorTo").value;
            colors = Array.from({ length: count }, (_, i) => getColorInGradient(i / (count - 1), from, to));
        }
        noteThemeEdit({ card_colors: colors });
        if (!preview) chrome.storage.sync.set({ card_colors: colors });
        sendFromPopup(preview ? "preview-card-colors" : "setcolors", colors);
    };
    [
        ["singleColorInput", "singleColorText", false],
        ["gradientColorFrom", "gradientColorFromText", true],
        ["gradientColorTo", "gradientColorToText", true],
    ].forEach(([pickerId, textId, gradient]) => {
        const picker = document.getElementById(pickerId);
        const text = document.getElementById(textId);
        [picker, text].forEach(input => {
            input.addEventListener("input", () => {
                if (!/^#[a-f\d]{6}$/i.test(input.value)) return;
                picker.value = text.value = input.value;
                applyCardColors(gradient, true);
            });
            input.addEventListener("change", () => {
                if (/^#[a-f\d]{6}$/i.test(input.value)) applyCardColors(gradient, false);
            });
        });
    });

    // activate revert to original card colors button
    document.querySelector("#revert-colors").addEventListener("click", () => {
        chrome.storage.local.get("previous_colors", local => {
            const prev = local["previous_colors"];
            // Guard against unset/expired-shape entries and the empty lists
            // old list-mode runs stored — sending [] would be a silent no-op.
            if (prev && Array.isArray(prev.colors) && prev.colors.length > 0) {
                noteThemeEdit({ card_colors: prev.colors });
                chrome.storage.sync.set({ card_colors: prev.colors });
                sendFromPopup("setcolors", prev.colors);
            }
        })
    })

    // activate every card color palette button
    document.querySelectorAll(".preset-button.colors-button").forEach(btn => {
        const colors = getPalette(btn.querySelector("p").textContent);
        let preview = btn.querySelector(".colors-preview");
        colors.forEach(color => {
            let div = makeElement("div", preview, { "className": "color-preview"});
            div.style.background = color;
        });
        btn.addEventListener("click", () => {
            noteThemeEdit({ card_colors: colors });
            chrome.storage.sync.set({ card_colors: colors });
            sendFromPopup("setcolors", colors);
        })
    });

    // activate theme save button
    document.getElementById("save-theme").addEventListener("click", saveCurrentTheme);

    // activate submit theme button

    document.getElementById("submit-theme-btn-1").addEventListener("click", () => {
        document.getElementById("submit-popup").classList.add("open");
    });

    document.getElementById("cancel-theme-btn").addEventListener("click", () => {
        document.getElementById("submit-popup").classList.remove("open");
    })

    // update theme button preview on input
    document.getElementById("submit-title").addEventListener("input", (e) => {
        document.getElementById("theme-button-title-preview").textContent = e.target.value.replaceAll(" ", "");
    });

    // update theme button preview on input
    document.getElementById("submit-credits").addEventListener("input", (e) => {
        document.getElementById("theme-button-creator-preview").textContent = e.target.value;
    });

    // activate the show button to open the theme submission drawer
    document.getElementById("show-submit-form").addEventListener("click",  (e) => {
        const drawer = document.getElementById("submit-drawer");
        if (drawer.style.display === "none") {
            drawer.style.display = "block";
            e.target.textContent = "Hide";
        } else {
            drawer.style.display = "none";
            e.target.textContent = "Show";
        }
    });

    document.getElementById("submit-form-btn").addEventListener("click", displayThemeSubmissionForm);

    document.getElementById("gpa-plus-minus").addEventListener("click", () => {
        applyGPAPreset({
            "A+": { "cutoff": 97, "gpa": 4.0 },
            "A": { "cutoff": 93, "gpa": 4.0 },
            "A-": { "cutoff": 90, "gpa": 3.7 },
            "B+": { "cutoff": 87, "gpa": 3.3 },
            "B": { "cutoff": 83, "gpa": 3.0 },
            "B-": { "cutoff": 80, "gpa": 2.7 },
            "C+": { "cutoff": 77, "gpa": 2.3 },
            "C": { "cutoff": 73, "gpa": 2.0 },
            "C-": { "cutoff": 70, "gpa": 1.7 },
            "D+": { "cutoff": 67, "gpa": 1.3 },
            "D": { "cutoff": 63, "gpa": 1.0 },
            "D-": { "cutoff": 60, "gpa": 0.7 },
            "F": { "cutoff": 0, "gpa": 0 }
        });
    });
    document.getElementById("gpa-by-letter").addEventListener("click", () => {
        applyGPAPreset({
            "A+": { "cutoff": 97, "gpa": 4.0 },
            "A": { "cutoff": 93, "gpa": 4.0 },
            "A-": { "cutoff": 90, "gpa": 4.0 },
            "B+": { "cutoff": 87, "gpa": 3.0 },
            "B": { "cutoff": 83, "gpa": 3.0 },
            "B-": { "cutoff": 80, "gpa": 3.0 },
            "C+": { "cutoff": 77, "gpa": 2.0 },
            "C": { "cutoff": 73, "gpa": 2.0 },
            "C-": { "cutoff": 70, "gpa": 2.0 },
            "D+": { "cutoff": 67, "gpa": 1.0 },
            "D": { "cutoff": 63, "gpa": 1.0 },
            "D-": { "cutoff": 60, "gpa": 1.0 },
            "F": { "cutoff": 0, "gpa": 0 }
        });
    });

    // Note: the card-style number inputs (imageSize, cardRoundness,
    // cardSpacing, cardWidth, cardHeight, cardPadding) are wired
    // via their setup*Input
    // handlers in menu.special above, which debounce the storage writes. The
    // duplicate listeners that used to live here referenced nonexistent
    // #*Value spans (threw on every input) and double-wrote to storage, which
    // is what blew the sync write quota when adjusting card styles quickly.

}

function applyGPAPreset(bounds) {
    // Presets change the global letter-to-points scale, preserving all cutoffs.
    chrome.storage.sync.get(["gpa_calc_bounds"], storage => {
        const current = storage.gpa_calc_bounds || defaultOptions.sync.gpa_calc_bounds;
        const updated = Object.fromEntries(Object.entries(current).map(([letter, values]) =>
            [letter, { ...values, gpa: bounds[letter].gpa }]));
        chrome.storage.sync.set({ gpa_calc_bounds: updated }, () => {
            displayGPABounds(document.getElementById("gpa-threshold-course").value);
        });
    });
}

function displayThemeSubmissionForm() {
    document.getElementById("submit-form").style.display = "block";
    document.getElementById("view-submissions").style.display = "none";
    document.getElementById("submit-form-btn").classList.add("active");
    document.getElementById("view-submissions-btn").classList.remove("active");
}

// Settings exports omit theme visuals, saved themes, notes, and task data.
const settingsExportKeys = [...new Set([
    ...syncedSwitches, ...syncedSubOptions, ...exportLayout, ...exportSidebar,
    ...exportTodo, ...exportGpa, "gpa_calc_bounds", "hide_navbar",
    "card_method_dashboard", "card_method_date", "card_limit"
])].filter(key => ![...exportCardColorToggles, ...exportCardStyles].includes(key));

const themeExportGroups = {
    "export-dark": ["dark_preset", "dark_mode", "device_dark"],
    "export-cards": ["custom_cards"],
    "export-colors": ["card_colors", ...exportCardColorToggles],
    "export-card-styles": exportCardStyles,
};

function setupExports() {
    function wireCopy(buttonId, outputId) {
        const button = document.getElementById(buttonId);
        const output = document.getElementById(outputId);
        button.addEventListener("click", async () => {
            if (!output.value) {
                displayAlert(true, "Generate an export first.");
                return;
            }
            try {
                await navigator.clipboard.writeText(output.value);
            } catch (error) {
                output.select();
                if (!document.execCommand("copy")) {
                    displayAlert(true, "Unable to copy. Select and copy the JSON manually.");
                    return;
                }
            }
            const label = button.textContent;
            button.textContent = "Copied!";
            setTimeout(() => { button.textContent = label; }, 1200);
        });
    }
    wireCopy("export-copy", "export-output");
    wireCopy("settings-export-copy", "settings-export-output");
    document.getElementById("settings-export").addEventListener("click", async () => {
        const storage = await chrome.storage.sync.get(settingsExportKeys);
        document.getElementById("settings-export-output").value = JSON.stringify(storage);
    });

    const checkboxes = [...document.querySelectorAll(".export-details input")];
    let generation = 0;
    async function refreshExport() {
        const current = ++generation;
        const keys = checkboxes.filter(input => input.checked).flatMap(input => themeExportGroups[input.id]);
        const storage = await chrome.storage.sync.get(keys);
        const result = await getExport(storage, keys);
        if (current === generation) document.getElementById("export-output").value = JSON.stringify(result);
    }
    checkboxes.forEach(input => input.addEventListener("change", refreshExport));
    for (const [id, checked] of [["export-check-all", true], ["export-check-none", false]]) {
        document.getElementById(id).addEventListener("click", () => {
            checkboxes.forEach(input => { input.checked = checked; });
            refreshExport();
        });
    }
}

async function getExport(storage, options) {
    let final = {};
    for (const option of options) {
        switch (option) {
            case "custom_cards":
                let arr = [];
                Object.keys(storage["custom_cards"] || {}).forEach(key => {
                    const img = storage["custom_cards"][key].img;
                    if (img && img !== "none" && img.trim() !== "") arr.push(img);
                });
                final["custom_cards"] = arr;
                break;
            case "card_colors":
                final["card_colors"] = [];
                try {
                    final["card_colors"] = (await sendFromPopup("getcolors")) || storage.card_colors || [];
                } catch (e) {
                    console.log(e);
                }
                break;

            default:
                final[option] = storage[option];
        }
    }
    return final;
}

const UNSAVED_THEME_KEY = "unsaved";
const trackedThemeOptions = ["dark_mode", "device_dark", "dark_preset", "custom_cards", "card_colors"]
    .concat(exportCardColorToggles, exportCardStyles, exportSidebar, exportTodo);
let activeThemeSource = null;
let themeImportInProgress = false;
let expectedThemeChanges = {};
let workingThemeOverrides = {};
let unsavedThemeTimer = null;
let savedThemeWrites = Promise.resolve();
let unsavedThemeWrite = Promise.resolve();
const themeSourceReady = chrome.storage.local.get("active_theme").then(local => {
    activeThemeSource = local.active_theme || null;
});

// Serialize read/modify/write operations so a draft cannot erase a rename,
// deletion, or newly saved theme while local storage is being read.
function updateSavedThemes(update) {
    const operation = savedThemeWrites.then(async () => {
        const local = await chrome.storage.local.get(["saved_themes", "saved_theme_names", "saved_theme_updated_at"]);
        const state = {
            saved_themes: local.saved_themes || {},
            saved_theme_names: local.saved_theme_names || {},
            saved_theme_updated_at: local.saved_theme_updated_at || {},
        };
        await update(state);
        await chrome.storage.local.set(state);
    });
    savedThemeWrites = operation.catch(error => console.warn("Canvas Enhanced: unable to save theme", error));
    return operation;
}

async function captureCurrentTheme() {
    const sync = await chrome.storage.sync.get(trackedThemeOptions);
    const current = { ...defaultOptions.sync, custom_cards: {}, ...sync, ...workingThemeOverrides };
    const theme = await getExport(current, trackedThemeOptions.filter(key => key !== "card_colors"));
    theme.card_colors = current.card_colors;
    if (!Array.isArray(theme.card_colors)) theme.card_colors = await sendFromPopup("getcolors") || [];
    return JSON.parse(JSON.stringify(theme));
}

function noteThemeEdit(values = {}) {
    if (themeImportInProgress) return;
    Object.assign(workingThemeOverrides, JSON.parse(JSON.stringify(values)));
    clearTimeout(unsavedThemeTimer);
    unsavedThemeTimer = setTimeout(() => {
        persistUnsavedTheme().catch(() => displayAlert(true, "Unable to save the Unsaved Theme. Please try again."));
    }, 200);
}

function persistUnsavedTheme() {
    if (!unsavedThemeTimer) return unsavedThemeWrite;
    clearTimeout(unsavedThemeTimer);
    unsavedThemeTimer = null;
    const operation = unsavedThemeWrite.then(async () => {
        await themeSourceReady;
        if (!activeThemeSource) return;
        const current = await captureCurrentTheme();
        await updateSavedThemes(state => {
            state.saved_themes[UNSAVED_THEME_KEY] = current;
            state.saved_theme_names[UNSAVED_THEME_KEY] = "Unsaved Theme";
            state.saved_theme_updated_at[UNSAVED_THEME_KEY] = Date.now();
        });
        activeThemeSource = { type: "unsaved", key: UNSAVED_THEME_KEY };
        await chrome.storage.local.set({ active_theme: activeThemeSource });
        displaySavedThemes();
    });
    unsavedThemeWrite = operation.catch(error => console.warn("Canvas Enhanced: unable to save draft", error));
    return operation;
}

function themeSettingValue(key, value) {
    // Course discovery, grades, and course names are not theme edits.
    return key === "custom_cards"
        ? Object.values(value || {}).map(card => card.img || "").filter(Boolean)
        : value;
}

chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") return;
    const edits = {};
    Object.entries(changes).forEach(([key, change]) => {
        if (!trackedThemeOptions.includes(key)) return;
        if (Object.hasOwn(expectedThemeChanges, key)) {
            const expected = expectedThemeChanges[key];
            delete expectedThemeChanges[key];
            if (JSON.stringify(change.newValue) === JSON.stringify(expected)) return;
        }
        if (JSON.stringify(themeSettingValue(key, change.oldValue)) !== JSON.stringify(themeSettingValue(key, change.newValue))) edits[key] = change.newValue;
    });
    if (Object.keys(edits).length) noteThemeEdit(edits);
});

window.addEventListener("pagehide", () => {
    persistUnsavedTheme().catch(error => console.warn("Canvas Enhanced: unable to save draft", error));
});

function nextSavedThemeKey(saved) {
    let key = Date.now();
    while (saved[key]) key++;
    return String(key);
}

async function flushThemeValueSave() {
    if (!presetChangeTimeout) return;
    expectedThemeChanges.dark_preset = { ...themeValues };
    await saveThemeValues();
}

async function saveCurrentTheme() {
    const button = document.getElementById("save-theme");
    button.disabled = true;
    try {
        await flushThemeValueSave();
        await persistUnsavedTheme();
        await themeSourceReady;
        const current = await captureCurrentTheme();
        let key;
        await updateSavedThemes(state => {
            key = nextSavedThemeKey(state.saved_themes);
            state.saved_themes[key] = current;
            state.saved_theme_names[key] = `Theme ${Object.keys(state.saved_themes).filter(id => id !== UNSAVED_THEME_KEY).length}`;
            if (activeThemeSource?.type === "unsaved") {
                delete state.saved_themes[UNSAVED_THEME_KEY];
                delete state.saved_theme_names[UNSAVED_THEME_KEY];
                delete state.saved_theme_updated_at[UNSAVED_THEME_KEY];
            }
        });
        activeThemeSource = { type: "saved", key };
        workingThemeOverrides = {};
        await chrome.storage.local.set({ active_theme: activeThemeSource });
        displaySavedThemes();
    } catch (error) {
        displayAlert(true, "Unable to add the theme. Please try again.");
    } finally {
        button.disabled = false;
    }
}

async function renameSavedTheme(key, name) {
    name = name.trim();
    if (!name) return;
    await flushThemeValueSave();
    await persistUnsavedTheme();
    let newKey = key;
    await updateSavedThemes(state => {
        if (!state.saved_themes[key]) return;
        if (key === UNSAVED_THEME_KEY) {
            newKey = nextSavedThemeKey(state.saved_themes);
            state.saved_themes[newKey] = state.saved_themes[key];
            delete state.saved_themes[key];
            delete state.saved_theme_names[key];
            delete state.saved_theme_updated_at[key];
        }
        state.saved_theme_names[newKey] = name;
    });
    if (activeThemeSource?.key === key) {
        activeThemeSource = { type: "saved", key: newKey };
        await chrome.storage.local.set({ active_theme: activeThemeSource });
    }
    displaySavedThemes(true);
}

// Empty values mean Canvas keeps control of that part of the page.
function emptyThemeValues() {
    return Object.fromEntries(Object.keys(defaultOptions.sync.dark_preset).map(key => [key, null]));
}

function readThemeValues(preset) {
    return { ...emptyThemeValues(), ...preset };
}

let highContrastWarningRequest = 0;
async function checkHighContrastWarning() {
    const warning = document.getElementById("theme-high-contrast-warning");
    const request = ++highContrastWarningRequest;
    warning.hidden = true;
    try {
        const tabs = await chrome.tabs.query({ currentWindow: true });
        tabs.sort((a, b) => Number(b.active) - Number(a.active));
        for (const tab of tabs) {
            if (request !== highContrastWarningRequest) return;
            try {
                const result = await chrome.tabs.sendMessage(tab.id, { message: "canvasrefined:check-high-contrast" });
                if (result?.canvasRefined !== true) continue;
                if (request === highContrastWarningRequest) warning.hidden = result.highContrast !== true;
                return; // Use the active Canvas page, not another school's setting.
            } catch (_) { /* This tab is not running the Canvas content script. */ }
        }
    } catch (_) { /* Leave the warning hidden when no Canvas page is available. */ }
}

function displayThemeList() {
    const container = document.getElementById("premade-themes");
    container.textContent = "";
    // Retain palette definitions for previously saved themes, but omit these
    // retired presets from the picker.
    const listedThemes = themes.filter(theme => !["McDonalds by cmoon3611", "Purple by otulpp"].includes(theme.title));
    const presets = [...listedThemes, {
        title: "_No Theme",
        exports: { dark_preset: emptyThemeValues(), custom_cards: [], card_colors: [], gradient_cards: false, disable_color_overlay: false, better_sidebar: false }
    }]
        .sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));
    presets.forEach(theme => {
        const button = makeElement("button", container, { className: "theme-button customization-button" });
        if (theme.preview) button.style.backgroundImage = "linear-gradient(#00000070, #00000070), url(" + theme.preview + ")";
        const [title, creator] = theme.title.split(" by ");
        makeElement("p", button, { className: "theme-button-title", textContent: title });
        if (creator) makeElement("p", button, { className: "theme-button-creator", textContent: creator });
        button.addEventListener("click", async () => {
            button.disabled = true;
            try {
                await importTheme(theme.exports, { type: "builtin", key: theme.title });
            } catch (error) {
                displayAlert(true, error.message || "Unable to load this theme.");
            } finally {
                button.disabled = false;
            }
        });
    });
}

function getRelativeDate(date, short = false) {
    let now = new Date();
    let timeSince = (now.getTime() - date.getTime()) / 60000;
    let time = "min";
    timeSince = Math.abs(timeSince);
    if (timeSince >= 60) {
        timeSince /= 60;
        time = short ? "h" : "hour";
        if (timeSince >= 24) {
            timeSince /= 24;
            time = short ? "d" : "day";
            if (timeSince >= 7) {
                timeSince /= 7;
                time = short ? "w" : "week";
            }
        }
    }
    timeSince = Math.round(timeSince);
    let relative = timeSince + (short ? "" : " ") + time + (timeSince > 1 && !short ? "s" : "");
    return { time: relative, ms: now.getTime() - date.getTime() };
}

function displaySavedThemes(force = false) {
    chrome.storage.local.get(["saved_themes", "saved_theme_names", "saved_theme_updated_at"], local => {
        const target = document.getElementById("saved-themes");
        if (!force && target.querySelector(".saved-theme-rename:not([hidden])")) return;
        target.textContent = "";
        Object.entries(local.saved_themes || {}).forEach(([key, theme], index) => {
            const unsaved = key === UNSAVED_THEME_KEY;
            const name = unsaved ? "Unsaved Theme" : local.saved_theme_names?.[key] || `Theme ${index + 1}`;
            const btn = makeElement("div", target, { className: "saved-theme" });
            const select = makeElement("button", btn, { type: "button", className: "saved-theme-select", title: "Apply " + name });
            makeElement("p", select, { className: "theme-button-title", textContent: name });
            const updated = new Date(unsaved ? local.saved_theme_updated_at?.[key] || Date.now() : Number(key));
            makeElement("p", select, { className: "theme-button-creator", textContent: `${getRelativeDate(updated).time} ago` });
            const actions = makeElement("div", btn, { className: "saved-theme-actions" });
            const rename = makeElement("button", actions, { type: "button", className: "saved-theme-action", textContent: unsaved ? "Save as…" : "Rename" });
            const remove = makeElement("button", actions, { type: "button", className: "saved-theme-action", textContent: "Delete", title: "Delete " + name });
            const form = makeElement("form", btn, { className: "saved-theme-rename", hidden: true });
            const input = makeElement("input", form, { type: "text", className: "card-input", value: unsaved ? "" : name, maxLength: 100, required: true });
            input.setAttribute("aria-label", "Theme name");
            makeElement("button", form, { type: "submit", className: "saved-theme-action", textContent: "Save" });
            const cancel = makeElement("button", form, { type: "button", className: "saved-theme-action", textContent: "Cancel" });
            btn.style.backgroundImage = `linear-gradient(#00000070, #00000070), url(${theme.custom_cards?.[0] || ""})`;
            select.addEventListener("click", () => importTheme(theme, { type: unsaved ? "unsaved" : "saved", key }));
            rename.addEventListener("click", () => {
                form.hidden = false;
                select.hidden = actions.hidden = true;
                input.focus();
                input.select();
            });
            const cancelRename = () => {
                form.hidden = true;
                select.hidden = actions.hidden = false;
                rename.focus();
            };
            cancel.addEventListener("click", cancelRename);
            input.addEventListener("keydown", event => {
                if (event.key === "Escape") { event.preventDefault(); cancelRename(); }
            });
            form.addEventListener("submit", async event => {
                event.preventDefault();
                if (!input.value.trim()) { input.focus(); return; }
                try { await renameSavedTheme(key, input.value); }
                catch (error) { displayAlert(true, "Unable to rename this theme. Please try again."); }
            });
            remove.addEventListener("click", async () => {
                try {
                    await persistUnsavedTheme();
                    await updateSavedThemes(state => {
                        delete state.saved_themes[key];
                        delete state.saved_theme_names[key];
                        delete state.saved_theme_updated_at[key];
                    });
                    if (activeThemeSource?.key === key) {
                        activeThemeSource = null;
                        await chrome.storage.local.set({ active_theme: null });
                    }
                    displaySavedThemes();
                } catch (error) { displayAlert(true, "Unable to delete this theme. Please try again."); }
            });
        });
    });
}

async function importTheme(theme, source = { type: "imported" }) {
    try {
        await persistUnsavedTheme();
        await themeSourceReady;
        if (source.type === "unsaved") {
            const local = await chrome.storage.local.get("saved_themes");
            theme = local.saved_themes?.[UNSAVED_THEME_KEY] || theme;
        }
        themeImportInProgress = true;
        clearTimeout(presetChangeTimeout);
        presetChangeTimeout = null;
        // Built-in palettes support both appearances; selecting one must keep
        // the user's Light / Dark / System choice instead of forcing Dark.
        const keepAppearance = source.type === "builtin";
        const keys = Object.keys(theme).filter(key => !removedStyleOptions.has(key) &&
            !(keepAppearance && (key === "dark_mode" || key === "device_dark")));
        const final = {};
        if (!keepAppearance && typeof theme.dark_mode === "boolean" && theme.device_dark === undefined) final.device_dark = false;
        const sync = await chrome.storage.sync.get("custom_cards");
        keys.forEach(key => {
            if (key === "dark_preset") {
                themeValues = readThemeValues(theme.dark_preset);
                final.dark_preset = { ...themeValues };
                sendFromPopup("preview-theme-values", themeValues);
            } else if (key === "card_colors") {
                final.card_colors = theme.card_colors || [];
                sendFromPopup("setcolors", final.card_colors);
            } else if (key === "custom_cards") {
                const images = (theme.custom_cards || []).filter(url => url && url !== "none" && url.trim());
                const cards = sync.custom_cards || {};
                Object.values(cards).forEach((card, index) => { card.img = images.length ? images[index % images.length] : ""; });
                final.custom_cards = cards;
            } else {
                final[key] = theme[key];
            }
        });
        expectedThemeChanges = JSON.parse(JSON.stringify(final));
        await chrome.storage.sync.set(final);
        workingThemeOverrides = {};
        activeThemeSource = source;
        await chrome.storage.local.set({ active_theme: source });
        if (themeValues) refreshThemeInputs();
    } catch (error) {
        displayAlert(true, "Unable to apply this theme. Please try again.");
    } finally {
        themeImportInProgress = false;
    }
}

function updateCards(key, value) {
    chrome.storage.sync.get(["custom_cards"], result => {
        chrome.storage.sync.set({ "custom_cards": { ...result["custom_cards"], [key]: { ...result["custom_cards"][key], ...value } } }, () => {
            if (chrome.runtime.lastError) {
                displayAlert(true, "The card settings exceed the storage limit and could not be saved. Try using shorter names or codes.");
            }
        })
    });
}

function displayGPABounds(selectedCourse) {
    chrome.storage.sync.get(["gpa_calc_bounds", "gpa_threshold_mode", "gpa_course_bounds", "custom_cards"], storage => {
        const order = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];
        const bounds = storage.gpa_calc_bounds || defaultOptions.sync.gpa_calc_bounds;
        const mode = document.getElementById("gpa-threshold-mode");
        const picker = document.getElementById("gpa-threshold-course");
        const perCourse = storage.gpa_threshold_mode === "course";
        mode.value = perCourse ? "course" : "all";
        document.getElementById("gpa-course-picker").hidden = !perCourse;
        document.getElementById("gpa-course-help").hidden = !perCourse;
        picker.textContent = "";
        Object.entries(storage.custom_cards || {}).forEach(([id, course]) => {
            makeElement("option", picker, { value: id, textContent: course.name || course.fullName || course.default || `Class ${id}` });
        });
        if (selectedCourse && Array.from(picker.options).some(option => option.value === selectedCourse)) picker.value = selectedCourse;
        const courseId = picker.value;
        document.getElementById("gpa-no-courses").hidden = !!courseId;
        picker.hidden = !courseId;
        mode.onchange = () => chrome.storage.sync.set({ gpa_threshold_mode: mode.value }, () => displayGPABounds(courseId));
        picker.onchange = () => displayGPABounds(picker.value);

        function renderRows(container, field) {
            container.textContent = "";
            order.forEach(letter => {
                const row = makeElement("label", container, { className: "gpa-setting-row" });
                makeElement("span", row, { textContent: letter });
                const savedCutoff = perCourse ? storage.gpa_course_bounds?.[courseId]?.[letter] : undefined;
                const value = field === "cutoff" ? (savedCutoff ?? bounds[letter].cutoff) : bounds[letter].gpa;
                const input = makeElement("input", row, {
                    className: "gpa-bounds-input", type: "number", min: "0", step: "any", value,
                    disabled: field === "cutoff" && perCourse && !courseId
                });
                if (field === "cutoff") input.max = "101";
                input.setAttribute("aria-label", `${letter} ${field === "cutoff" ? "minimum percentage" : "GPA points"}`);
                makeElement("span", row, { textContent: field === "cutoff" ? "%" : "points" });
                input.addEventListener("change", () => {
                    if (!input.checkValidity() || !Number.isFinite(input.valueAsNumber)) {
                        input.value = value;
                        return;
                    }
                    const number = input.valueAsNumber;
                    chrome.storage.sync.get(["gpa_calc_bounds", "gpa_course_bounds"], existing => {
                        const current = existing.gpa_calc_bounds || defaultOptions.sync.gpa_calc_bounds;
                        let update;
                        if (field === "cutoff" && perCourse) {
                            const courses = existing.gpa_course_bounds || {};
                            const cutoffs = courses[courseId] || Object.fromEntries(order.map(key => [key, current[key].cutoff]));
                            update = { gpa_course_bounds: { ...courses, [courseId]: { ...cutoffs, [letter]: number } } };
                        } else {
                            update = { gpa_calc_bounds: { ...current, [letter]: { ...current[letter], [field]: number } } };
                        }
                        chrome.storage.sync.set(update, () => {
                            if (chrome.runtime.lastError) displayAlert(true, "GPA settings could not be saved: " + chrome.runtime.lastError.message);
                        });
                    });
                });
            });
        }
        renderRows(document.querySelector(".gpa-bounds"), "cutoff");
        renderRows(document.querySelector(".gpa-points"), "gpa");
    });
}

let removeAlert = null;

function clearAlert() {
    clearTimeout(removeAlert);
    document.querySelector("#alert").style.bottom = "-400px";
}

function displayAlert(bad, msg) {
    clearTimeout(removeAlert);
    document.querySelector("#alert").style.bottom = "0";
    document.querySelector("#alert").textContent = msg;
    document.querySelector("#alert").style.background = bad ? "#e7495ed9" : "#468b46d9";
    removeAlert = setTimeout(() => {
        clearAlert();
    }, 15000);
}

async function displayAdvancedCards() {
    // Sync from Canvas only when needed: when there are no cards yet (fresh
    // install) or when older cards predate the stored fullName field. Once
    // every card has a fullName this is a no-op and the grid renders instantly.
    const needsSync = await new Promise(resolve => {
        chrome.storage.sync.get("custom_cards", s => {
            const c = s.custom_cards || {};
            const ids = Object.keys(c);
            resolve(!ids.length || ids.some(id => !c[id].fullName));
        });
    });
    if (needsSync) await sendFromPopup("getCards");
    chrome.storage.sync.get(["custom_cards", "custom_cards_2"], storage => {

		const cardGrid = document.getElementById("card-grid");
        if (!cardGrid) {
            console.error("Card grid element not found");
            return;
        }

        cardGrid.innerHTML = "";
        const customCards = storage.custom_cards || {};
        const customCards2 = storage.custom_cards_2 || {};
		const allCards = {};
		Object.keys(customCards).forEach((courseId) => {
			allCards[courseId] = {
				...customCards[courseId],
				...(customCards2[courseId] || {}),
			};
		});

		Object.keys(customCards2).forEach((courseId) => {
			if (!allCards[courseId]) {
				allCards[courseId] = customCards2[courseId];
			}
		});

        if (Object.keys(allCards).length === 0) {
            cardGrid.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No course cards found. Visit your Canvas dashboard to load courses.</p>';
            return;
        }

        Object.keys(allCards).forEach(courseId => {
            const course = allCards[courseId];
            if (course && typeof course === 'object') {
                const courseButton = createCourseButton(courseId, course);
                cardGrid.appendChild(courseButton);
            }
        });

        // showCardEditMenu sets an inline display:none on the grid; clear it
        // so reopening the menu shows the cards again (CSS default = grid).
        cardGrid.style.display = "";
        const editMenu = document.getElementById("card-edit-menu");
        if (editMenu) {
            editMenu.style.display = "none";
        }
    });
}

function createCourseButton(courseId, courseData) {
	const button = document.createElement("button");
	button.className = "course-card-button";
	const displayName =
		courseData.name ||
		courseData.fullName ||
		courseData.default ||
		courseData.code ||
		`Course ${courseId}`;
	button.textContent = displayName;
	button.dataset.courseId = courseId;

	if (courseData.img || courseData.hidden || courseData.hide || courseData.hide_todo) {
		button.classList.add("customized");
	}

	button.addEventListener("click", () => {
		document.querySelectorAll(".course-card-button").forEach(btn => btn.classList.remove("active"));
		button.classList.add("active");
		showCardEditMenu(courseId, courseData);
	});

	return button;
}

function showCardEditMenu(courseId, courseData) {
	const editMenu = document.getElementById("card-edit-menu");
	const cardGrid = document.getElementById("card-grid");
	if (cardGrid) cardGrid.style.display = "none";
	editMenu.style.display = "block";

	const displayName =
		courseData.name ||
		courseData.fullName ||
		courseData.default ||
		courseData.code ||
		`Course ${courseId}`;

	editMenu.innerHTML = `
        <div class="card-edit-header">
            <h3 class="card-edit-title">${displayName}</h3>
            <button class="card-close-btn" id="card-close-btn">close</button>
        </div>
        
        <div class="card-edit-section">
            <label class="card-edit-label">Custom Name</label>
            <input type="text" class="card-input" id="card-name-input" 
                   value="${courseData.name || ""}" placeholder="Enter custom course name">
        </div>
        
        <div class="card-edit-section">
            <label class="card-edit-label">Custom Code</label>
            <input type="text" class="card-input" id="card-code-input" 
                   value="${courseData.code || ""}" placeholder="Enter custom course code">
        </div>
        
        <div class="card-edit-section">
            <label class="card-edit-label">Hide Card</label>
            <div style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" id="card-hide-input" ${courseData.hidden || courseData.hide ? "checked" : ""}>
                <span>Hide this card from dashboard</span>
            </div>
        </div>
        
        <div class="card-edit-section">
            <label class="card-edit-label">Better Todo List</label>
            <div style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" id="card-todo-hidden-input" ${courseData.hide_todo === true ? "checked" : ""}>
                <span>Hide this course from the Better Todo list</span>
            </div>
        </div>
        
        <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button class="big-button" id="save-card-btn">Save Changes</button>
            <button class="customization-button" id="reset-card-btn">Reset to Default</button>
        </div>
    `;

	document
		.getElementById("card-close-btn")
		.addEventListener("click", hideCardEditMenu);
	document
		.getElementById("save-card-btn")
		.addEventListener("click", () => saveCardChanges(courseId));
	document
		.getElementById("reset-card-btn")
		.addEventListener("click", () => resetCardToDefault(courseId));

}

function saveCardChanges(courseId) {
	const nameInput = document.getElementById("card-name-input");
	const codeInput = document.getElementById("card-code-input");
	const hideInput = document.getElementById("card-hide-input");
	const todoHiddenInput = document.getElementById("card-todo-hidden-input");

	const updates = {
		name: nameInput.value,
		code: codeInput.value,
		hidden: hideInput.checked,
		hide: hideInput.checked,
		hide_todo: todoHiddenInput.checked,
	};

	updateCards(courseId, updates);

	displayAlert(false, "Card settings saved successfully!");

	hideCardEditMenu();

	setTimeout(() => {
		displayAdvancedCards();
	}, 500);
}

function resetCardToDefault(courseId) {
	updateCards(courseId, { name: "", code: "", hidden: false, hide: false, hide_todo: false });
	displayAlert(false, "Card reset to default settings!");

	setTimeout(() => {
		displayAdvancedCards();
	}, 500);
}

function hideCardEditMenu() {
	const editMenu = document.getElementById("card-edit-menu");
	const cardGrid = document.getElementById("card-grid");

	if (editMenu) editMenu.style.display = "none";
	if (cardGrid) cardGrid.style.display = "grid";

	document
		.querySelectorAll(".course-card-button")
		.forEach((btn) => btn.classList.remove("active"));
}

// customization tab

function getPalette(name) {
    const colors = {
        "Blues": ["#ade8f4", "#90e0ef", "#48cae4", "#00b4d8", "#0096c7"],
        "Reds": ["#e01e37", "#c71f37", "#b21e35", "#a11d33", "#6e1423"],
        "Rainbow": ["#ff0000", "#ff5200", "#efea5a", "#3cf525", "#147df5", "#be0aff"],
        "Candy": ["#cdb4db", "#ffc8dd", "#ffafcc", "#bde0fe", "#a2d2ff"],
        "Purples": ["#e0aaff", "#c77dff", "#9d4edd", "#7b2cbf", "#5a189a"],
        "Pastels": ["#fff1e6", "#fde2e4", "#fad2e1", "#bee1e6", "#cddafd"],
        "Ocean": ["#22577a", "#38a3a5", "#57cc99", "#80ed99", "#c7f9cc"],
        "Sunset": ["#eaac8b", "#e56b6f", "#b56576", "#6d597a", "#355070"],
        "Army": ["#6b705c", "#a5a58d", "#b7b7a4", "#ffe8d6", "#ddbea9", "#cb997e"],
        "Pinks": ["#ff0a54", "#ff5c8a", "#ff85a1", "#ff99ac", "#fbb1bd"],
        "Watermelon": ["#386641", "#6a994e", "#a7c957", "#f2e8cf", "#bc4749"],
        "Popsicle": ["#70d6ff", "#ff70a6", "#ff9770", "#ffd670", "#e9ff70"],
        "Chess": ["#ffffff", "#000000"],
        "Greens": ["#d8f3dc", "#b7e4c7", "#95d5b2", "#74c69d", "#52b788"],
        "Fade": ["#ff69eb", "#ff86c8", "#ffa3a5", "#ffbf81", "#ffdc5e"],
        "Oranges": ["#ffc971", "#ffb627", "#ff9505", "#e2711d", "#cc5803"],
        "Mesa": ["#f6bd60", "#f28482", "#f5cac3", "#84a59d", "#f7ede2"],
        "Berries": ["#4cc9f0", "#4361ee", "#713aed", "#9348c3", "#f72585"],
        "Fade2": ["#f2f230", "#C2F261", "#91f291", "#61F2C2", "#30f2f2"],
        "Muted": ["#E7E6F7", "#E3D0D8", "#AEA3B0", "#827081", "#C6D2ED"],
        "Base": ["#e3b505", "#95190C", "#610345", "#107E7D", "#044B7F"],
        "Fruit": ["#7DDF64", "#C0DF85", "#DEB986", "#DB6C79", "#ED4D6E"],
        "Night": ["#25171A", "#4B244A", "#533A7B", "#6969B3", "#7F86C6"]
    }
    return colors[name] || [];
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function getColorInGradient(d, from, to) {
    let pat = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    var exec1 = pat.exec(from);
    var exec2 = pat.exec(to);
    let a1 = [parseInt(exec1[1], 16), parseInt(exec1[2], 16), parseInt(exec1[3], 16)];
    let a2 = [parseInt(exec2[1], 16), parseInt(exec2[2], 16), parseInt(exec2[3], 16)];
    let rgb = a1.map((x, i) => Math.floor(a1[i] + d * (a2[i] - a1[i])));
    return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
}

function setThemeValueInput(input, value) {
    input.value = value || "";
    input.title = value || "No override — Canvas controls this value";
    if (input.type === "text") input.placeholder = "Canvas default";
    // Native color inputs cannot display an empty swatch; dim unset pickers.
    if (input.type === "color") input.style.opacity = value ? "" : "0.25";
}

function displaySidebarMode(mode, style) {
    style = style || "";
    const match = style.match(/linear-gradient\(\s*(?<color1>#[a-f\d]{6}(?:[a-f\d]{2})?)\s*,\s*(?<color2>#[a-f\d]{6}(?:[a-f\d]{2})?)\s*\)/i);
    let c1 = "", c2 = "";

    if (mode === "image") {
        document.querySelector("#radio-sidebar-image").checked = true;
        document.querySelector("#sidebar-color2").style.display = "flex";
        document.querySelector("#sidebar-image").style.display = "flex";
        if (style.includes("url") && match) {
            if (match.groups.color1) c1 = match.groups.color1.slice(0, 7);
            if (match.groups.color2) c2 = match.groups.color2.slice(0, 7);
        }
        let url = style.match(/url\(\"(?<url>.*)\"\)/);
        document.querySelector('#sidebar-image input[type="text"]').value = url && url.groups.url ? url.groups.url : "";
    } else if (mode === "gradient") {
        document.querySelector("#radio-sidebar-gradient").checked = true;
        document.querySelector("#sidebar-color2").style.display = "flex";
        document.querySelector("#sidebar-image").style.display = "none";
        if (!style.includes("url") && match) {
            if (match.groups.color1) c1 = match.groups.color1;
            if (match.groups.color2) c2 = match.groups.color2;
        }
    } else {
        document.querySelector("#radio-sidebar-solid").checked = true;
        document.querySelector("#sidebar-color2").style.display = "none";
        document.querySelector("#sidebar-image").style.display = "none";
        c1 = match ? "#000000" : style;
    }

    ["text", "color"].forEach(type => {
        setThemeValueInput(document.querySelector(`#sidebar-color1 input[type="${type}"]`), c1);
        setThemeValueInput(document.querySelector(`#sidebar-color2 input[type="${type}"]`), c2);
    });
    if (mode !== "image") document.querySelector('#sidebar-image input[type="text"]').value = "";
}

// Keep one in-memory preset so rapid edits to different fields cannot overwrite
// each other. Live messages are independent of the debounced storage write.
let themeValues = null;
let presetChangeTimeout = null;
function saveThemeValues() {
    clearTimeout(presetChangeTimeout);
    presetChangeTimeout = null;
    if (themeValues) return chrome.storage.sync.set({ dark_preset: { ...themeValues } });
}

window.addEventListener("pagehide", () => {
    if (presetChangeTimeout) saveThemeValues();
});

chrome.storage.sync.get(["dark_preset"], storage => {
    themeValues = readThemeValues(storage.dark_preset);
    refreshThemeInputs();
    Object.keys(themeValues).forEach(key => {
        if (key === "sidebar") return;
        const group = document.getElementById("dp_" + key);
        if (!group) return;
        const color = group.querySelector('input[type="color"]');
        const text = group.querySelector('input[type="text"]');
        [color, text].forEach(input => {
            input.addEventListener("input", () => {
                if (input.value.trim() && !CSS.supports("color", input.value)) return;
                const value = input.value;
                setThemeValueInput(color, value);
                setThemeValueInput(text, value);
                changeCSS(key, input.value.trim() || null);
            });
            input.addEventListener("change", saveThemeValues);
        });
    });
    const changeSidebar = () => {
        const c1 = document.querySelector('#sidebar-color1 input[type="text"]').value;
        const c2 = document.querySelector('#sidebar-color2 input[type="text"]').value;
        const url = document.querySelector('#sidebar-image input').value;
        const solid = document.getElementById("radio-sidebar-solid").checked;
        if (!c1.trim() || (!solid && !c2.trim())) {
            changeCSS("sidebar", null);
            return;
        }
        if (!/^#[a-f\d]{6}$/i.test(c1) || (!solid && !/^#[a-f\d]{6}$/i.test(c2))) return;
        if (document.getElementById("radio-sidebar-image").checked) {
            changeCSS("sidebar", `linear-gradient(${c1}c7, ${c2}c7), center url("${url.replace(/["\\\n\r]/g, "")}")`);
        } else if (document.getElementById("radio-sidebar-gradient").checked) {
            changeCSS("sidebar", `linear-gradient(${c1}, ${c2})`);
        } else {
            changeCSS("sidebar", c1);
        }
    };
    ["sidebar-color1", "sidebar-color2"].forEach(id => {
        const group = document.getElementById(id);
        group.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", () => {
                if (input.value.trim() && !/^#[a-f\d]{6}$/i.test(input.value)) return;
                group.querySelectorAll("input").forEach(peer => { setThemeValueInput(peer, input.value); });
                changeSidebar();
            });
            input.addEventListener("change", saveThemeValues);
        });
    });
    const image = document.querySelector("#sidebar-image input");
    image.addEventListener("input", changeSidebar);
    image.addEventListener("change", saveThemeValues);
    ["solid", "gradient", "image"].forEach(mode => {
        document.getElementById("radio-sidebar-" + mode).addEventListener("change", () => {
            // Only change visibility; retain the user's two colors and URL.
            document.getElementById("sidebar-color2").style.display = mode === "solid" ? "none" : "flex";
            document.getElementById("sidebar-image").style.display = mode === "image" ? "flex" : "none";
            changeSidebar();
            saveThemeValues();
        });
    });
});

function refreshThemeInputs() {
    Object.entries(themeValues).forEach(([key, value]) => {
        if (key === "sidebar") return;
        const group = document.getElementById("dp_" + key);
        if (group) group.querySelectorAll("input").forEach(input => setThemeValueInput(input, value));
    });
    const sidebar = themeValues.sidebar || "";
    displaySidebarMode(sidebar.includes("url") ? "image" : sidebar.includes("gradient") ? "gradient" : "solid", sidebar);
}

function refreshColors() {
    chrome.storage.sync.get(["dark_preset"], storage => {
        if (presetChangeTimeout) return;
        themeValues = readThemeValues(storage.dark_preset);
        refreshThemeInputs();
    });
}

function changeCSS(name, color) {
    themeValues[name] = color;
    noteThemeEdit({ dark_preset: { ...themeValues } });
    sendFromPopup("preview-theme-values", { ...themeValues });
    clearTimeout(presetChangeTimeout);
    presetChangeTimeout = setTimeout(saveThemeValues, 500);
}

function changeToPresetCSS(e, preset = null) {
    const presets = {
        "dark-lighter": { "background-0": "#272727", "background-1": "#353535", "background-2": "#404040", "borders": "#454545", "sidebar": "#353535", "text-0": "#f5f5f5", "text-1": "#e2e2e2", "text-2": "#ababab", "links": "#56Caf0", "sidebar-text": "#f5f5f5" },
        "dark-light": { "background-0": "#202020", "background-1": "#2e2e2e", "background-2": "#4e4e4e", "borders": "#404040", "sidebar": "#2e2e2e", "text-0": "#f5f5f5", "text-1": "#e2e2e2", "text-2": "#ababab", "links": "#56Caf0", "sidebar-text": "#f5f5f5" },
        "dark-default": { "background-0": "#161616", "background-1": "#1e1e1e", "background-2": "#262626", "borders": "#3c3c3c", "text-0": "#f5f5f5", "text-1": "#e2e2e2", "text-2": "#ababab", "links": "#56Caf0", "sidebar": "#1e1e1e", "sidebar-text": "#f5f5f5" },
        "dark-dark": { "background-0": "#101010", "background-1": "#121212", "background-2": "#1a1a1a", "borders": "#272727", "sidebar": "#121212", "text-0": "#f5f5f5", "text-1": "#e2e2e2", "text-2": "#ababab", "links": "#56Caf0", "sidebar-text": "#f5f5f5" },
        "dark-darker": { "background-0": "#000000", "background-1": "#000000", "background-2": "#000000", "borders": "#000000", "sidebar": "#000000", "text-0": "#c5c5c5", "text-1": "#c5c5c5", "text-2": "#c5c5c5", "links": "#c5c5c5", "sidebar-text": "#c5c5c5" },
        "dark-blue": { "background-0": "#14181d", "background-1": "#1a2026", "background-2": "#212930", "borders": "#2e3943", "sidebar": "#1a2026", "text-0": "#f5f5f5", "text-1": "#e2e2e2", "text-2": "#ababab", "links": "#56Caf0", "sidebar-text": "#f5f5f5" },
        "dark-mint": { "background-0": "#0f0f0f", "background-1": "#0c0c0c", "background-2": "#141414", "borders": "#1e1e1e", "sidebar": "#0c0c0c", "text-0": "#f5f5f5", "text-1": "#e2e2e2", "text-2": "#ababab", "links": "#7CF3CB", "sidebar-text": "#f5f5f5" },
        "dark-burn": { "background-0": "#ffffff", "background-1": "#ffffff", "background-2": "#ffffff", "borders": "#cccccc", "sidebar": "#ffffff", "text-0": "#cccccc", "text-1": "#cccccc", "text-2": "#cccccc", "links": "#cccccc", "sidebar-text": "#cccccc" },
        "dark-unicorn": { "background-0": "#ff6090", "background-1": "#00C1FF", "background-2": "#FFFF00", "borders": "#FFFF00", "sidebar": "#00C1FF", "text-0": "#ffffff", "text-1": "#ffffff", "text-2": "#ffffff", "links": "#000000", "sidebar-text": "#ffffff" },
        "dark-lightmode": { "background-0": "#ffffff", "background-1": "#f5f5f5", "background-2": "#d4d4d4", "borders": "#c7cdd1", "links": "#04ff00", "sidebar": "#04ff00", "sidebar-text": "#ffffff", "text-0": "#2d3b45", "text-1": "#919191", "text-2": "#a5a5a5" },
        "dark-catppuccin": { "background-0": "#11111b", "background-1": "#181825", "background-2": "#1e1e2e", "borders": "#4f5463", "text-0": "#cdd6f4", "text-1": "#7f849c", "text-2": "#a6e3a1", "links": "#f5c2e7", "sidebar": "#181825", "sidebar-text": "#7f849c" },
        "dark-sage": { "background-0": "#2f3e46", "background-1": "#354f52", "background-2": "#52796f", "borders": "#84a98c", "links": "#d8f5c7", "sidebar": "#354f52", "sidebar-text": "#e2e8de", "text-0": "#e2e8de", "text-1": "#cad2c5", "text-2": "#adb1aa" },
        "dark-pink": { "background-0": "#ffffff", "background-1": "#ffe0ed", "background-2": "#ff0066", "borders": "#ff007b", "links": "#ff0088", "sidebar": "#f490b3", "sidebar-text": "#ffffff", "text-0": "#ff0095", "text-1": "#ff8f8f", "text-2": "#ff5c5c" },
        "dark-coral": {"background-0":"#131c26","background-1":"#0e1721","background-2":"#151c24","borders":"#0e1721","links":"#f88379","sidebar":"#131c26","sidebar-text":"#f88379","text-0":"#f88379","text-1":"#f88379","text-2":"#f88379"},
    }
    if (preset === null) preset = presets[e.target.id] || presets["default"];
    applyPreset(preset);
}

function applyPreset(preset) {
    clearTimeout(presetChangeTimeout);
    presetChangeTimeout = null;
    themeValues = readThemeValues(preset);
    noteThemeEdit({ dark_preset: { ...themeValues } });
    sendFromPopup("preview-theme-values", themeValues);
    chrome.storage.sync.set({ "dark_preset": themeValues }).then(() => refreshColors());
}

function makeElement(element, location, options) {
    let creation = document.createElement(element);
    Object.keys(options).forEach(key => {
        creation[key] = options[key];
    });
    location.appendChild(creation);
    return creation
}

async function sendFromPopup(message, options = {}) {

    let response = new Promise((resolve, reject) => {
        chrome.tabs.query({ currentWindow: true }).then(async tabs => {
            for (let i = 0; i < tabs.length; i++) {
                try {
                    let res = await chrome.tabs.sendMessage(tabs[i].id, { "message": message, "options": options });
                    if (res) resolve(res);
                } catch (e) {
                }
            }
            resolve(null);
        });
    })

    return await response;
}
