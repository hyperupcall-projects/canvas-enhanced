// The toolbar button has no popup, so clicking it opens the settings page in a
// tab. The in-page "Customize" button asks for the same over runtime messaging.
function openSettingsPage() {
    chrome.tabs.create({ url: chrome.runtime.getURL("html/settings.html") });
}

chrome.action.onClicked.addListener(openSettingsPage);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request && request.message === "canvasrefined:open-settings") {
        openSettingsPage();
        sendResponse(true);
    }
    return false;
});

chrome.runtime.onInstalled.addListener(function () {

    let default_options = {
        "local": {
            "previous_colors": null,
            "errors": [],
            "saved_themes": {},
            "liked_themes": [],
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
            "gpa_calc": true,
            "dark_mode": true,
            "gradent_cards": false,
            "disable_color_overlay": false,

            "num_assignments": 4,
            "custom_domain": [""],
            "custom_domain_denied": [],
            "auto_detect_disabled": false,
            "assignments_done": [],
            "dashboard_grades": true,
            "assignment_date_format": false,
            "better_todo": true,
            "todo_hr24": false,
			"todo_separate_scrollbar": false,
            "condensed_cards": false,
            "course_nickname_font_size": "small",
            "course_id_font_size": "medium",
            "custom_cards": {},
            "custom_cards_2": {},
            "custom_cards_3": {},
            "custom_assignments": [],
            "custom_assignments_overflow": ["custom_assignments"],
            "grade_hover": false,
            // "hide_completed": false,
            "hide_completed_cards": false,
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
            "relative_dues": false,
            "hide_new_canvas": true,
            "hide_sequence_footer": false,
            "quiz_safe_mode": false,
            "assignment_states": {},
            "tab_icons": false,
            "todo_hide_feedback": false,
            "todo_full_height": true,
            "todo_progress_rings": "rings",
            "todo_confetti": true,
            "todo_show_scores": false,
            "device_dark": false,
            // "show_updates": false,
            "card_method_date": false,
            "card_method_dashboard": true,
            "card_limit": 25,
            "remind": false,
            "reminders": [],
            "reminder_count": 1,
            "multi_remind": false,
            "id": "",
            "new_browser": null,
            "imageSize": 100,
            "cardMargin": 36,
            "cardWidth": 262,
        }
    };

    const updateMsg = "Canvas Enhanced was just updated!\nThis version added new themes and a new sorting function for themes.";

    // The Styles feature (custom fonts, custom CSS, custom backgrounds and the
    // opacity/blur sliders) was removed. Its settings are no longer read by
    // anything, so drop them on install/update instead of leaving orphaned
    // values behind — a long custom stylesheet in particular would otherwise
    // sit in storage.sync forever, eating into the sync quota.
    const removedOptions = [
        "gpa_calc_cumulative",
        "cumulative_gpa",
        "gpa_calc_weighted",
        "equal_height_cards", // Card heights are always equal.
        "bold_sidebar_text",
        "global_search", // Search is always available from its buttons.
        "grade_analytics", // Grade Analytics now always runs on Grades pages.
        "custom_font",
        "custom_font_skip_p",
        "custom_styles",
        "customCardStyles",
        "customBackgroundLink",
        "customBackgroundScale",
        "customBackgroundDaily",
        "customBackgroundNasaDaily",
        "nasaInfoOverlay",
        "fitImageToScreen",
        "nasaFitToScreen",
        "bg_opacity",
        "sidebar_opacity",
        "bg_blur",
        "sidebar_blur",
        "card_opacity",
        "card_blur",
        "card_transparency",
        "cardRoundness",
        "cardHeight",
        "imageRoundness",
        "card_grid",
        "card_grid_columns",
        "card_grid_rows",
        "card_grid_column_gap",
        "card_grid_row_gap",
        "card_grid_center_rows",
        "card_grid_flex",
    ];
    chrome.storage.sync.remove(removedOptions);
    chrome.storage.local.remove(removedOptions);

    chrome.storage.local.get(null, local => {
        // Daily background images and APOD metadata are no longer used.
        const backgroundCacheKeys = Object.keys(local).filter(key =>
            key.startsWith("picsum_daily_") || key.startsWith("nasa_apod_")
        );
        if (backgroundCacheKeys.length > 0) {
            chrome.storage.local.remove(backgroundCacheKeys);
        }
        chrome.storage.sync.get(null, async sync => {
            let newSyncOptions = {"update_msg": updateMsg};
            let newLocalOptions = {};
            // Retired single-bar progress modes now use per-course lines.
            if (["line", "combined", "segmented"].includes(sync.todo_progress_rings)) {
                newSyncOptions.todo_progress_rings = "lines";
            }
            // Preserve the former emphasis toggle as independent font sizes.
            if (sync.emphasize_course_name === true) {
                if (sync.course_nickname_font_size === undefined) newSyncOptions.course_nickname_font_size = "medium";
                if (sync.course_id_font_size === undefined) newSyncOptions.course_id_font_size = "small";
            }
            // Preserve older custom margins; zero used to mean Canvas's native spacing.
            if (sync.cardMargin === undefined && sync.cardSpacing !== undefined) {
                const legacyMargin = sync.cardSpacing === 0 ? 36 : Number(sync.cardSpacing) / 2;
                newSyncOptions.cardMargin = Number.isFinite(legacyMargin) && legacyMargin >= 0 ? legacyMargin : 36;
            }
            Object.keys(default_options["sync"]).forEach(option => {
                if (sync[option] !== undefined || newSyncOptions[option] !== undefined) return;
                newSyncOptions[option] = default_options["sync"][option];
            });
            Object.keys(default_options["local"]).forEach(option => {
                if (local[option] !== undefined) return;
                newLocalOptions[option] = default_options["local"][option];
            })

            if (Object.keys(newLocalOptions).length > 0) {
                chrome.storage.local.set(newLocalOptions);
            }

            if (Object.keys(newSyncOptions).length > 0) {
                chrome.storage.sync.set(newSyncOptions).then(() => {
                    chrome.storage.sync.remove(["cardSpacing", "emphasize_course_name"]);
                    chrome.storage.local.remove("cardSpacing");
                    console.log(newSyncOptions);
                    if (newSyncOptions.new_install === true) {
                        chrome.runtime.openOptionsPage();
                        chrome.storage.sync.set({ new_install: false });
                    }
                });
            }
        });
    });
});
