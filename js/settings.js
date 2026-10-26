const syncedSwitches = ['remind', 'tab_icons', 'remlogo', 'full_width', 'assignments_due', 'gpa_calc', 'dashboard_grades', 'better_todo', 'condensed_cards', 'card_method_dashboard', 'hide_new_canvas', 'hide_sequence_footer', 'quiz_safe_mode', 'hide_personal_details'];
const syncedSubOptions = [
	"hide_course_images",
	"todo_hide_feedback",
	"todo_hide_read",
	"todo_full_height",

    "todo_progress_rings",
    "todo_timeframe",

	"relative_dues",
	"card_overdues",
	"card_future_dues",
	"card_overdue_always_red",
	"hide_completed_cards",
	"course_nickname_font_size",
	"course_id_font_size",
	// "todo_overdues",
	"gpa_calc_prepend",

	"num_assignments",
	"assignment_date_format",
	"todo_hr24",
	"todo_separate_scrollbar",
	"todo_alternate_colors",
	"todo_show_scores",
	"grade_hover",
	"auto_detect_disabled",
	// "hide_completed",
	"num_todo_items",
	"hover_preview",
	"imageSize",
	"cardMargin",
	"cardWidth",
	"cardPadding",
];
const localSwitches = [];

// Ignore obsolete settings in older exports and saved themes.
const removedStyleOptions = new Set([
    "todo_show_scrollbar", "todo_ignore_card_colors", "todo_remove_icons",
    "gpa_calc_cumulative", "cumulative_gpa", "gpa_calc_weighted",
    "equal_height_cards",
    "global_search",
    "grade_analytics",
    "bold_sidebar_text",
    "emphasize_course_name",
    "better_sidebar", "sidebar_scale", "hide_navbar",
    "auto_dark", "auto_dark_start", "auto_dark_end",
    "custom_font", "custom_font_skip_p", "custom_styles", "customCardStyles",
    "customBackgroundLink", "customBackgroundScale", "customBackgroundDaily",
    "customBackgroundNasaDaily", "nasaInfoOverlay", "fitImageToScreen",
    "nasaFitToScreen", "bg_opacity", "sidebar_opacity", "bg_blur",
    "sidebar_blur", "card_opacity", "card_blur", "card_transparency",
    "cardRoundness", "cardHeight", "cardSpacing",
    "imageRoundness", "card_grid", "card_grid_columns", "card_grid_rows", "card_grid_column_gap", "card_grid_row_gap", "card_grid_center_rows", "card_grid_flex",
]);

// Theme export only carries visual settings, never personal productivity data.
const exportCardColorToggles = ["gradient_cards", "disable_color_overlay"];
const exportCardStyles = ["course_nickname_font_size", "course_id_font_size", "imageSize", "cardMargin", "cardWidth", "cardPadding"];
const exportLayout = ["full_width", "center_cards", "condensed_cards", "remlogo", "hide_new_canvas", "tab_icons"];
const exportTodo = ["better_todo", "todo_hide_feedback", "todo_hide_read", "todo_full_height", "todo_confetti", "todo_progress_rings", "todo_timeframe", "todo_hr24", "todo_separate_scrollbar", "todo_alternate_colors", "todo_show_scores", "hover_preview"];
const exportGpa = ["gpa_calc", "gpa_calc_prepend", "gpa_threshold_mode", "gpa_course_bounds"];

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
        "better_todo": true,
        "todo_hr24": false,
		"todo_separate_scrollbar": false,
		"todo_alternate_colors": false,
		"todo_show_scores": false,
        "todo_hide_read": true,
        "condensed_cards": false,
        "course_nickname_font_size": "small",
        "course_id_font_size": "medium",
        "center_cards": false,
        "custom_cards": {},
        "custom_cards_2": {},
        "custom_cards_3": {},
        "custom_assignments": [],
        "custom_assignments_overflow": ["custom_assignments"],
        "grade_hover": false,
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
        "card_future_dues": true,
        "card_overdue_always_red": false,
        "hide_completed_cards": false,
        "relative_dues": false,
        "hide_new_canvas": true,
        "hide_sequence_footer": false,
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
        // "show_updates": false,
        "card_method_date": false,
        "card_method_dashboard": true,
        "card_limit": 25,
        "imageSize": 100,
        "cardMargin": 36,
        "cardWidth": 262,
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
        const errors = Array.isArray(storage.errors) ? storage.errors : [];
        errors.forEach(e => {
            document.querySelector("#error_log_output").value += (e + "\n\n");
        })
    });
}

document.addEventListener("DOMContentLoaded", setup);

function setupAssignmentsInput(initial) {
    const el = document.querySelector('#numAssignments');
    const toCount = (raw) => {
        const n = parseInt(raw, 10);
        if (!Number.isFinite(n)) return defaultOptions.sync.num_assignments;
        return Math.min(10, Math.max(0, n));
    };
    const persist = (raw) => {
        const next = toCount(raw);
        el.value = next;
        chrome.storage.sync.set({ "num_assignments": next });
    };
    el.value = toCount(initial);
    el.addEventListener('input', function () {
        if (this.value === '') return;
        const n = parseInt(this.value, 10);
        if (!Number.isFinite(n) || n < 0 || n > 10) return;
        chrome.storage.sync.set({ "num_assignments": n });
    });
    el.addEventListener('change', function () {
        persist(this.value);
    });
}

function setupTodoItemsInput(initial) {
    const el = document.querySelector('#numTodoItems');
    const toCount = (raw) => {
        const n = parseInt(raw, 10);
        if (!Number.isFinite(n)) return defaultOptions.sync.num_todo_items;
        return Math.min(12, Math.max(1, n));
    };
    const persist = (raw) => {
        const next = toCount(raw);
        el.value = next;
        chrome.storage.sync.set({ "num_todo_items": next });
    };
    el.value = toCount(initial);
    el.addEventListener('input', function () {
        if (this.value === '') return;
        const n = parseInt(this.value, 10);
        if (!Number.isFinite(n) || n < 1 || n > 12) return;
        chrome.storage.sync.set({ "num_todo_items": n });
    });
    el.addEventListener('change', function () {
        persist(this.value);
    });
}

// Keep saved settings, imports, and exports within the supported progress modes.
function normalizeProgressRingMode(value) {
    if (value === false) return "none";
    // Retired single-bar modes now use the per-course lines display.
    if (["line", "combined", "segmented"].includes(value)) return "lines";
    return ["none", "rings", "rainbow", "lines"].includes(value) ? value : "rings";
}

function setupProgressRingsSelect(initial) {
    const el = document.querySelector("#todo_progress_rings");
    if (!el) return;
    const value = normalizeProgressRingMode(initial);
    el.value = value;
    if (initial !== undefined && initial !== value) {
        chrome.storage.sync.set({ "todo_progress_rings": value });
    }
    el.addEventListener("change", function () {
        chrome.storage.sync.set({ "todo_progress_rings": normalizeProgressRingMode(this.value) });
    });
}

function setupCourseFontSizeSelects() {
    const keys = ["course_nickname_font_size", "course_id_font_size"];
    const allowed = ["small", "medium", "large", "extra_large"];
    chrome.storage.sync.get([...keys, "emphasize_course_name"], sync => {
        keys.forEach(key => {
            const select = document.getElementById(key);
            const fallback = sync.emphasize_course_name === true
                ? (key === "course_nickname_font_size" ? "medium" : "small")
                : defaultOptions.sync[key];
            select.value = allowed.includes(sync[key]) ? sync[key] : fallback;
            select.addEventListener("change", () => {
                chrome.storage.sync.set({ [key]: select.value });
            });
        });
    });
}

// Collapsible "More options" section for the Better Todo List sub-options.
// Persists whether it's expanded so the settings page reopens in the same state.
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

function setupCardDateFormatSelect() {
    const select = document.getElementById("card_date_format");
    // Retain the existing keys so saved preferences and older exports still work.
    chrome.storage.sync.get(["assignment_date_format", "relative_dues"], sync => {
        select.value = sync.relative_dues === true ? "relative" : sync.assignment_date_format === true ? "dd/mm" : "mm/dd";
    });
    select.addEventListener("change", () => {
        chrome.storage.sync.set({
            assignment_date_format: select.value === "dd/mm",
            relative_dues: select.value === "relative",
        });
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

// Custom card style inputs (margin, width) fire `chrome.storage.sync.set` on every keystroke/arrow press.
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

function setupCardStyleReset() {
    const button = document.getElementById("reset-card-styles");
    button.addEventListener("click", async () => {
        const keys = ["cardMargin", "cardWidth"];
        const defaults = Object.fromEntries(keys.map(key => [key, defaultOptions.sync[key]]));
        button.disabled = true;
        keys.forEach(key => {
            clearTimeout(cardStyleSetTimers[key]);
            delete cardStyleSetTimers[key];
        });
        try {
            await chrome.storage.sync.set(defaults);
            refreshAppliedThemeControls(defaults);
        } catch (error) {
            displayAlert(true, "Unable to reset card styles. Please try again.");
        } finally {
            button.disabled = false;
        }
    });
}

function setupCardMarginInput(initial) {
    let el = document.querySelector("#cardMargin");
    el.value = initial;
    el.addEventListener("input", (e) => {
        debouncedCardStyleSet("cardMargin", e.target.value);
    });
}

function setupCardWidthInput(initial) {
    let el = document.querySelector("#cardWidth");
    el.value = initial;
    el.addEventListener("input", (e) => {
        debouncedCardStyleSet("cardWidth", e.target.value);
    });
}

// "Alternate colors" (Better Todo List sub-option) only makes sense in light
// mode, so hide its checkbox whenever dark mode is on.
function toggleAlternateColorsVisibility(darkModeOn) {
    const wrap = document.getElementById("todo_alternate_colors_wrap");
    if (wrap) wrap.style.display = darkModeOn ? "none" : "";
}

// Keep dependent sections visible and dim the whole area when their toggle is off.
function setSubOptionsDisabled(subOptions, disabled) {
    subOptions.classList.toggle("section-disabled", disabled);
    subOptions.inert = disabled;
    subOptions.setAttribute("aria-disabled", String(disabled));
    subOptions.querySelectorAll("input, select, textarea, button").forEach(el => {
        el.disabled = disabled;
    });
}

function updateSubOptionsState(option, isOn) {
    const dependentOptions = ["gpa_calc", "assignments_due", "dashboard_grades", "better_todo", "hide_personal_details"];
    if (!dependentOptions.includes(option)) return;
    const optionEl = document.getElementById(option);
    if (!optionEl) return;
    const subOptions = optionEl.parentElement.querySelector(":scope > .sub-options");
    if (!subOptions) return;
    setSubOptionsDisabled(subOptions, !isOn);
}

function setup() {

    const menu = {
		switches: syncedSwitches,
		checkboxes: [
			// /*'card_method_date',*/ "show_updates",
            "todo_hide_feedback",
            "todo_hide_read",

			"todo_full_height",

			"card_overdues",
			"card_future_dues",
	"card_overdue_always_red",
			"hide_completed_cards",
			// "todo_overdues",

			"todo_hr24",
			"todo_separate_scrollbar",
			"todo_alternate_colors",
			"todo_show_scores",
			"grade_hover",
			"auto_detect_disabled",
			"hide_course_images",
			// "hide_completed",
			"hover_preview",
		],
		tabs: {
            "home-settings": { setup: null, tab: ".home-settings" },
			"advanced-settings": {
				setup: displayAdvancedCards,
				tab: ".advanced",
			},
			"gpa-bounds-btn": {
				setup: displayGPABounds,
				tab: ".gpa-bounds-container",
			},
			"todo-settings-btn": {
				setup: null,
				tab: ".todo-settings-container",
			},
			"import-export-btn": {
				setup: () => { displayThemeList(); displaySavedThemes(); checkHighContrastWarning(); },
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
				setup: (initial) => setupAssignmentsInput(initial),
			},
			{
				identifier: "num_todo_items",
				setup: (initial) => setupTodoItemsInput(initial),
			},

			{
				identifier: "cardMargin",
				setup: (initial) => setupCardMarginInput(initial),
			},
			{
				identifier: "cardWidth",
				setup: (initial) => setupCardWidthInput(initial),
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
                if (option === "card_method_dashboard") {
                    chrome.storage.sync.set({ "custom_cards": {}, "custom_cards_2": {}, "custom_cards_3": {}, "card_method_dashboard": status });
                } else {
                    chrome.storage.sync.set({ [option]: status });
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
                updateSubOptionsState(option, status);
            });
            updateSubOptionsState(option, sync[option] === true);
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

    setupCardDateFormatSelect();
    setupCourseFontSizeSelects();
    setupAppearanceMode();
    setupSavedThemes();
    setupEditThemeDialog();

    // Keep category navigation visible while switching the panel below it.
    const tabButtons = Array.from(document.querySelectorAll('.more-options-container [role="tab"]'));
    function selectSettingsTab(button) {
        if (button.getAttribute("aria-selected") === "true") return;
        tabButtons.forEach(tabButton => {
            const selected = tabButton === button;
            tabButton.setAttribute("aria-selected", String(selected));
            tabButton.tabIndex = selected ? 0 : -1;
            document.getElementById(tabButton.getAttribute("aria-controls")).hidden = !selected;
        });
        const setup = menu.tabs[button.id].setup;
        if (setup) setup();
    }
    tabButtons.forEach((button, index) => {
        button.addEventListener("click", () => selectSettingsTab(button));
        button.addEventListener("keydown", event => {
            let nextIndex;
            if (event.key === "ArrowRight") nextIndex = (index + 1) % tabButtons.length;
            else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
            else if (event.key === "Home") nextIndex = 0;
            else if (event.key === "End") nextIndex = tabButtons.length - 1;
            else return;
            event.preventDefault();
            tabButtons[nextIndex].focus();
            selectSettingsTab(tabButtons[nextIndex]);
        });
    });

    // give everything the appropirate i18n text
    document.querySelectorAll('[data-i18n]').forEach(text => {
        const msg = chrome.i18n.getMessage(text.dataset.i18n);
        // keep the in-HTML fallback text when a key is missing instead of blanking it
        if (msg) text.innerText = msg;
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const msg = chrome.i18n.getMessage(el.dataset.i18nTitle);
        if (msg) el.title = msg;
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
    setupCardStyleReset();

    document.querySelector("#alert").addEventListener("click", clearAlert);
    // TODO: maybe fix this at some point, idk what is causing the error here
    document.querySelectorAll(".preset-button.customization-button").forEach(btn => btn.addEventListener("click", changeToPresetCSS));

    // activate revert to original card colors button
    document.querySelector("#revert-colors").addEventListener("click", () => {
        chrome.storage.local.get("previous_colors", local => {
            const prev = local["previous_colors"];
            // Guard against unset/expired-shape entries and the empty lists
            // old list-mode runs stored — sending [] would be a silent no-op.
            if (prev && Array.isArray(prev.colors) && prev.colors.length > 0) {
                if (themeEditDraft) {
                    themeEditDraft.card_colors = prev.colors;
                    refreshPaletteSelection(prev.colors);
                    refreshCardColors(prev.colors);
                    sendFromPopup("preview-card-colors", prev.colors);
                    updateEditThemeExport(true);
                    return;
                }
                noteThemeEdit({ card_colors: prev.colors });
                chrome.storage.sync.set({ card_colors: prev.colors });
                sendFromPopup("setcolors", prev.colors);
            }
        })
    })

    // activate theme defaults button: restore the active theme's own card colors
    document.querySelector("#theme-defaults-colors").addEventListener("click", async () => {
        await themeSourceReady;
        let colors = null;
        if (activeThemeSource?.type === "builtin") {
            colors = themes.find(theme => theme.title === activeThemeSource.key)?.exports?.card_colors;
        } else if (activeThemeSource?.type === "saved") {
            const local = await chrome.storage.local.get("saved_themes");
            colors = local.saved_themes?.[activeThemeSource.key]?.card_colors;
        }
        if (!Array.isArray(colors) || colors.length === 0) return;
        if (themeEditDraft) {
            themeEditDraft.card_colors = colors;
            refreshPaletteSelection(colors);
            refreshCardColors(colors);
            sendFromPopup("preview-card-colors", colors);
            updateEditThemeExport(true);
            return;
        }
        noteThemeEdit({ card_colors: colors });
        chrome.storage.sync.set({ card_colors: colors });
        sendFromPopup("setcolors", colors);
    });

    // activate every card color palette button
    document.querySelectorAll(".preset-button.colors-button").forEach(btn => {
        const colors = getPalette(btn.querySelector("p").textContent);
        let preview = btn.querySelector(".colors-preview");
        colors.forEach(color => {
            let div = makeElement("div", preview, { "className": "color-preview"});
            div.style.background = color;
        });
        btn.addEventListener("click", () => {
            if (themeEditDraft) {
                themeEditDraft.card_colors = colors;
                refreshPaletteSelection(colors);
                refreshCardColors(colors);
                sendFromPopup("preview-card-colors", colors);
                updateEditThemeExport(true);
                return;
            }
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

    // The card-style number inputs (cardMargin, cardWidth) are wired via setup*Input
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
    ...syncedSwitches, ...syncedSubOptions, ...exportLayout,
    ...exportTodo, ...exportGpa, "gpa_calc_bounds",
    "card_method_dashboard", "card_method_date", "card_limit"
])].filter(key => ![...exportCardColorToggles, ...exportCardStyles].includes(key));

const themeExportKeys = [
    "dark_preset", "dark_mode", "device_dark", "custom_cards", "card_colors",
    ...exportCardColorToggles, ...exportCardStyles,
];

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
        if (storage.todo_progress_rings !== undefined) {
            storage.todo_progress_rings = normalizeProgressRingMode(storage.todo_progress_rings);
        }
        document.getElementById("settings-export-output").value = JSON.stringify(storage);
    });

    chrome.storage.sync.get(themeExportKeys).then(async storage => {
        const result = await getExport(storage, themeExportKeys);
        document.getElementById("export-output").value = JSON.stringify(result);
    });
}

async function getExport(storage, options) {
    let final = {};
    for (const option of options) {
        switch (option) {
            case "todo_progress_rings":
                final[option] = normalizeProgressRingMode(storage[option]);
                break;
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
    .concat(exportCardColorToggles, exportCardStyles, exportTodo);
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

let draftUnsavedTimer = null;

// The edit popup previews changes on the live page, so mirror the edited theme
// as an "Unsaved Theme" draft entry until the edit is saved or discarded.
function scheduleDraftUnsaved() {
    if (!themeEditDraft) return;
    clearTimeout(draftUnsavedTimer);
    draftUnsavedTimer = setTimeout(persistDraftUnsaved, 300);
}

function persistDraftUnsaved() {
    clearTimeout(draftUnsavedTimer);
    draftUnsavedTimer = null;
    if (!themeEditDraft) return;
    const snapshot = JSON.parse(JSON.stringify(themeEditDraft));
    updateSavedThemes(state => {
        state.saved_themes[UNSAVED_THEME_KEY] = snapshot;
        state.saved_theme_names[UNSAVED_THEME_KEY] = "Unsaved Theme";
        state.saved_theme_updated_at[UNSAVED_THEME_KEY] = Date.now();
    }).then(() => displaySavedThemes())
        .catch(error => console.warn("Canvas Enhanced: unable to save draft", error));
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

function noThemeSettings() {
    // Reset appearance controls as well as the palette. Keep feature choices
    // and personal course data separate from removing a theme.
    const keys = [...exportCardColorToggles, ...exportCardStyles];
    return {
        ...Object.fromEntries(keys.map(key => [key, defaultOptions.sync[key] ?? false])),
        dark_preset: emptyThemeValues(),
        custom_cards: [],
        card_colors: [],
    };
}

function refreshAppliedThemeControls(values) {
    exportCardStyles.forEach(key => {
        const input = document.getElementById(key);
        if (input && Object.hasOwn(values, key)) {
            if (input.type === "checkbox") input.checked = values[key] === true;
            else input.value = values[key];
        }
    });
    syncedSwitches.forEach(key => {
        if (!Object.hasOwn(values, key)) return;
        const control = document.getElementById(key);
        if (!control) return;
        const on = control.querySelector('#on');
        const off = control.querySelector('#off');
        if (!on || !off) return;
        on.checked = values[key] === true;
        off.checked = !on.checked;
        on.classList.toggle('checked', on.checked);
        off.classList.toggle('checked', off.checked);
        updateSubOptionsState(key, on.checked);
    });
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
    const listedThemes = themes.filter(theme => !["AdvTime", "Kirby", "McDonalds", "Purple"].includes(theme.title));
    listedThemes.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));
    const presets = [{
        title: "No Theme",
        exports: noThemeSettings()
    }, ...listedThemes];
    presets.forEach(theme => {
        const button = makeElement("button", container, { className: "theme-button customization-button" });
        if (theme.preview) button.style.backgroundImage = "linear-gradient(#00000070, #00000070), url(" + theme.preview + ")";
        makeElement("p", button, { className: "theme-button-title", textContent: theme.title });
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

function setupSavedThemes() {
    displaySavedThemes();
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === "local" && ["saved_themes", "saved_theme_names", "saved_theme_updated_at"].some(key => changes[key])) {
            displaySavedThemes();
        }
    });
}

let savedThemesRequest = 0;
function displaySavedThemes(force = false) {
    const request = ++savedThemesRequest;
    chrome.storage.local.get(["saved_themes", "saved_theme_names", "saved_theme_updated_at"], local => {
        const target = document.getElementById("saved-themes");
        if (!target || request !== savedThemesRequest) return;
        if (!force && target.querySelector(".saved-theme-rename:not([hidden])")) return;
        target.textContent = "";
        Object.entries(local.saved_themes || {}).forEach(([key, theme], index) => {
            const unsaved = key === UNSAVED_THEME_KEY;
            const name = unsaved ? "Unsaved Theme" : local.saved_theme_names?.[key] || `Theme ${index + 1}`;
            const row = makeElement("div", target, { className: "saved-theme" });
            const thumb = makeElement("button", row, { type: "button", className: "saved-theme-thumb", title: "Apply " + name });
            thumb.setAttribute("aria-label", "Apply " + name);
            thumb.style.backgroundImage = `linear-gradient(#00000070, #00000070), url(${theme.custom_cards?.[0] || ""})`;
            const info = makeElement("div", row, { className: "saved-theme-info" });
            const title = makeElement("button", info, { type: "button", className: "saved-theme-title", textContent: name, title: "Rename " + name });
            const updated = new Date(unsaved ? local.saved_theme_updated_at?.[key] || Date.now() : Number(key));
            makeElement("p", info, { className: "theme-button-creator", textContent: `${getRelativeDate(updated).time} ago` });
            const actions = makeElement("div", row, { className: "saved-theme-actions" });
            const edit = makeElement("button", actions, { type: "button", className: "saved-theme-action", textContent: "Edit", title: "Edit " + name });
            const remove = makeElement("button", actions, { type: "button", className: "saved-theme-action", textContent: "Delete", title: "Delete " + name });
            const form = makeElement("form", row, { className: "saved-theme-rename", hidden: true });
            const input = makeElement("input", form, { type: "text", className: "card-input", value: unsaved ? "" : name, maxLength: 100, required: true });
            input.setAttribute("aria-label", "Theme name");
            makeElement("button", form, { type: "submit", className: "saved-theme-action", textContent: "Save" });
            const cancel = makeElement("button", form, { type: "button", className: "saved-theme-action", textContent: "Cancel" });

            const apply = () => importTheme(theme, { type: unsaved ? "unsaved" : "saved", key });
            thumb.addEventListener("click", event => { event.stopPropagation(); apply(); });
            row.addEventListener("click", event => {
                if (event.target.closest(".saved-theme-title, .saved-theme-actions, .saved-theme-rename")) return;
                apply();
            });

            const startRename = () => {
                form.hidden = false;
                info.hidden = actions.hidden = true;
                input.focus();
                input.select();
            };
            title.addEventListener("click", event => { event.stopPropagation(); startRename(); });
            const cancelRename = () => {
                form.hidden = true;
                info.hidden = actions.hidden = false;
                title.focus();
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
            edit.addEventListener("click", event => {
                event.stopPropagation();
                openEditThemeDialog(key, theme, name);
            });
            remove.addEventListener("click", async event => {
                event.stopPropagation();
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

let editingThemeKey = null;
let editingThemeDraft = null;
// While a saved theme is open in the editor, the Theme Values controls write to
// this draft instead of the live theme.
let themeEditDraft = null;

function openEditThemeDialog(key, theme, name) {
    const dialog = document.getElementById("edit-theme-dialog");
    if (!dialog) return;
    // Persist any pending edit to the live theme before switching to the draft.
    if (presetChangeTimeout) saveThemeValues();
    editingThemeKey = key;
    editingThemeDraft = JSON.parse(JSON.stringify(theme || {}));
    themeEditDraft = editingThemeDraft;
    const heading = document.getElementById("edit-theme-heading");
    if (heading) heading.textContent = "Edit " + name;
    const error = document.getElementById("edit-theme-error");
    if (error) error.textContent = "";
    themeValues = readThemeValues(editingThemeDraft.dark_preset);
    refreshThemeInputs();
    refreshPaletteSelection(editingThemeDraft.card_colors);
    refreshCardColors(editingThemeDraft.card_colors);
    updateEditThemeExport();
    dialog.showModal();
}

function updateEditThemeExport(markUnsaved = false) {
    const output = document.getElementById("export-output");
    if (output) output.value = JSON.stringify(editingThemeDraft);
    if (markUnsaved) scheduleDraftUnsaved();
}

// Highlight the palette that matches the theme's current card colors.
function refreshPaletteSelection(colors) {
    const list = Array.isArray(colors) ? colors : [];
    document.querySelectorAll(".preset-button.colors-button").forEach(btn => {
        const palette = getPalette(btn.querySelector("p").textContent);
        const selected = palette.length === list.length &&
            palette.every((color, i) => color.toLowerCase() === String(list[i]).toLowerCase());
        btn.classList.toggle("selected", selected);
    });
}

// Show the per-class card colors the palette applied, so they are editable in
// the Theme Values list alongside the other palette colors.
function refreshCardColors(colors) {
    const host = document.getElementById("theme-card-color-list");
    if (!host) return;
    host.textContent = "";
    const list = Array.isArray(colors) ? colors : [];
    if (list.length === 0) {
        makeElement("span", host, { className: "sub-text", textContent: "No card colors yet \u2014 pick a palette above." });
        return;
    }
    list.forEach((color, index) => {
        const input = makeElement("input", host, { type: "color", className: "card-input", value: color });
        input.title = color;
        input.addEventListener("input", () => {
            if (!themeEditDraft) return;
            if (!Array.isArray(themeEditDraft.card_colors)) themeEditDraft.card_colors = [...list];
            themeEditDraft.card_colors[index] = input.value;
            input.title = input.value;
            refreshPaletteSelection(themeEditDraft.card_colors);
            sendFromPopup("preview-card-colors", themeEditDraft.card_colors);
            updateEditThemeExport(true);
        });
    });
}

function setupEditThemeDialog() {
    const dialog = document.getElementById("edit-theme-dialog");
    if (!dialog) return;
    document.getElementById("cancel-edit-theme").addEventListener("click", () => dialog.close());
    document.getElementById("close-edit-theme").addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => {
        themeEditDraft = null;
        editingThemeKey = null;
        editingThemeDraft = null;
        // Reload the live theme so later edits do not write the draft's values,
        // and undo any live preview the draft pushed to the Canvas tab.
        chrome.storage.sync.get(["dark_preset", "card_colors"], storage => {
            if (presetChangeTimeout) return;
            themeValues = readThemeValues(storage.dark_preset);
            refreshThemeInputs();
            sendFromPopup("preview-theme-values", themeValues);
            if (Array.isArray(storage.card_colors)) sendFromPopup("preview-card-colors", storage.card_colors);
        });
    });
    document.getElementById("save-edit-theme").addEventListener("click", async () => {
        if (!editingThemeKey || !editingThemeDraft) return;
        const key = editingThemeKey;
        const draft = editingThemeDraft;
        try {
            await updateSavedThemes(state => {
                if (!state.saved_themes[key]) return;
                state.saved_themes[key] = draft;
                // The edit is now saved into its theme, so the draft entry that
                // the live preview created is no longer needed.
                if (key !== UNSAVED_THEME_KEY) {
                    delete state.saved_themes[UNSAVED_THEME_KEY];
                    delete state.saved_theme_names[UNSAVED_THEME_KEY];
                    delete state.saved_theme_updated_at[UNSAVED_THEME_KEY];
                }
            });
            if (activeThemeSource?.key === key) await importTheme(draft, activeThemeSource);
            displaySavedThemes(true);
            dialog.close();
        } catch (error) {
            document.getElementById("edit-theme-error").textContent = "Unable to save this theme. Please try again.";
        }
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
        // A queued input write must not bring back a style after a theme reset.
        Object.values(cardStyleSetTimers).forEach(clearTimeout);
        // Built-in palettes support both appearances; selecting one must keep
        // the user's Light / Dark / System choice instead of forcing Dark.
        const keepAppearance = source.type === "builtin";
        const keys = Object.keys(theme).filter(key => !removedStyleOptions.has(key) &&
            !(keepAppearance && (key === "dark_mode" || key === "device_dark")));
        const final = {};
        // Convert the former size swap when applying an older saved theme.
        if (typeof theme.emphasize_course_name === "boolean") {
            if (theme.course_nickname_font_size === undefined) final.course_nickname_font_size = theme.emphasize_course_name ? "medium" : "small";
            if (theme.course_id_font_size === undefined) final.course_id_font_size = theme.emphasize_course_name ? "small" : "medium";
        }
        // Older themes stored twice the CSS margin, with numeric zero meaning native spacing.
        if (theme.cardMargin === undefined && theme.cardSpacing !== undefined) {
            const legacyMargin = theme.cardSpacing === 0 ? 36 : Number(theme.cardSpacing) / 2;
            if (Number.isFinite(legacyMargin) && legacyMargin >= 0) final.cardMargin = legacyMargin;
        }
        if (!keepAppearance && typeof theme.dark_mode === "boolean" && theme.device_dark === undefined) final.device_dark = false;
        const sync = await chrome.storage.sync.get("custom_cards");
        keys.forEach(key => {
            if (key === "todo_progress_rings") {
                final[key] = normalizeProgressRingMode(theme[key]);
            } else if (key === "dark_preset") {
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
        refreshAppliedThemeControls(final);
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

let cardWrite = Promise.resolve();

function updateCards(key, value) {
    cardWrite = cardWrite.catch(() => {}).then(() => new Promise(resolve => {
        chrome.storage.sync.get(["custom_cards"], result => {
            const cards = result.custom_cards || {};
            chrome.storage.sync.set({
                custom_cards: { ...cards, [key]: { ...cards[key], ...value } }
            }, () => {
                if (chrome.runtime?.lastError) {
                    displayAlert(true, "The card settings exceed the storage limit and could not be saved.");
                }
                resolve();
            });
        });
    }));
}

function courseDisplayName(courseId, course) {
    return course.fullName || course.default || `Course ${courseId}`;
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
            makeElement("option", picker, { value: id, textContent: course.fullName || course.default || `Class ${id}` });
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
    const alert = document.querySelector("#alert");
    alert.dataset.status = bad ? "error" : "success";
    alert.textContent = msg;
    alert.style.bottom = "0";
    removeAlert = setTimeout(() => {
        clearAlert();
    }, 15000);
}

async function displayAdvancedCards() {
    // Sync from Canvas only when needed: when there are no cards yet (fresh
    // install) or when older cards predate the stored fullName field. Once
    // every card has a fullName this is a no-op and the table renders instantly.
    const needsSync = await new Promise(resolve => {
        chrome.storage.sync.get("custom_cards", s => {
            const c = s.custom_cards || {};
            const ids = Object.keys(c);
            resolve(!ids.length || ids.some(id => !c[id]?.fullName));
        });
    });
    if (needsSync) await sendFromPopup("getCards");
    chrome.storage.sync.get(["custom_cards"], storage => {
        const host = document.getElementById("course-visibility");
        if (!host) {
            console.error("Course list element not found");
            return;
        }

        host.replaceChildren();
        const allCards = storage.custom_cards || {};
        const courseIds = Object.keys(allCards).filter(id => allCards[id] && typeof allCards[id] === "object");

        if (courseIds.length === 0) {
            const empty = document.createElement("p");
            empty.className = "course-visibility-empty";
            empty.textContent = "No courses found. Visit your Canvas dashboard to load courses.";
            host.appendChild(empty);
            return;
        }

        const table = document.createElement("table");
        table.className = "course-visibility-table";
        table.setAttribute("aria-labelledby", "course-visibility-heading");

        const thead = document.createElement("thead");
        const headRow = document.createElement("tr");
        [
            ["Name", "Course name"],
            ["Card grid", "Show this course on the dashboard card grid"],
            ["Todo list", "Show this course in the todo list"],
        ].forEach(([label, title], index) => {
            const th = document.createElement("th");
            th.scope = "col";
            th.textContent = label;
            th.title = title;
            if (index > 0) th.className = "course-visibility-check";
            headRow.appendChild(th);
        });
        thead.appendChild(headRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        courseIds.forEach(courseId => {
            const course = allCards[courseId];
            const name = courseDisplayName(courseId, course);
            const row = document.createElement("tr");
            const nameCell = document.createElement("th");
            nameCell.scope = "row";
            nameCell.textContent = name;
            nameCell.title = name;
            row.appendChild(nameCell);
            row.appendChild(courseVisibilityCell(courseId, name, "card", !(course.hidden || course.hide)));
            row.appendChild(courseVisibilityCell(courseId, name, "todo", course.hide_todo !== true));
            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        host.appendChild(table);
    });
}

function courseVisibilityCell(courseId, name, kind, shown) {
    const cell = document.createElement("td");
    cell.className = "course-visibility-check";
    const label = document.createElement("label");
    label.className = "course-visibility-toggle";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = shown;
    const where = kind === "card" ? "card grid" : "todo list";
    input.setAttribute("aria-label", `Show ${name} in the ${where}`);
    input.addEventListener("change", () => {
        updateCards(courseId, kind === "card"
            ? { hidden: !input.checked, hide: !input.checked }
            : { hide_todo: !input.checked });
    });
    label.appendChild(input);
    cell.appendChild(label);
    return cell;
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
        "Ocean": ["#050e20", "#082250", "#0d3470", "#144894", "#1b5fb8"],
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
    if (themeEditDraft) {
        themeEditDraft.dark_preset = { ...themeValues };
        updateEditThemeExport();
        return;
    }
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
    if (themeEditDraft) {
        themeEditDraft.dark_preset = { ...themeValues };
        sendFromPopup("preview-theme-values", { ...themeValues });
        updateEditThemeExport(true);
        return;
    }
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
    if (themeEditDraft) {
        themeEditDraft.dark_preset = { ...themeValues };
        sendFromPopup("preview-theme-values", themeValues);
        updateEditThemeExport(true);
        return;
    }
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
    const sendTo = async query => {
        const tabs = await chrome.tabs.query(query);
        let response = null;
        for (const tab of tabs) {
            try {
                const res = await chrome.tabs.sendMessage(tab.id, { "message": message, "options": options });
                if (res && response === null) response = res;
            } catch (e) {
                // This tab is not running the content script.
            }
        }
        return response;
    };
    // Prefer a Canvas tab in the settings window, but fall back to any window so
    // the settings page still reaches Canvas when it lives in its own window.
    const sameWindow = await sendTo({ currentWindow: true });
    if (sameWindow !== null) return sameWindow;
    return await sendTo({});
}
