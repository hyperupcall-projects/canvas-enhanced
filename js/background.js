chrome.runtime.onInstalled.addListener(function () {

    let default_options = {
        "local": {
            "previous_colors": null,
            "previous_theme": null,
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
            "auto_dark": false,
            "auto_dark_start": { "hour": "20", "minute": "00" },
            "auto_dark_end": { "hour": "08", "minute": "00" },
            "num_assignments": 4,
            "custom_domain": [""],
            "custom_domain_denied": [],
            "auto_detect_disabled": false,
            "assignments_done": [],
            "dashboard_grades": true,
            "assignment_date_format": false,
            "dashboard_notes": false,
            "dashboard_notes_text": "",
            "dashboard_notes_mode": "edit",
            "better_todo": true,
            "todo_hr24": false,
			"todo_separate_scrollbar": false,
            "better_sidebar": false,
            "condensed_cards": false,
            "custom_cards": {},
            "custom_cards_2": {},
            "custom_cards_3": {},
            "custom_assignments": [],
            "custom_assignments_overflow": ["custom_assignments"],
            "grade_hover": false,
            "card_letter": true,
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
            "relative_dues": false,
            "equal_height_cards": false,
            "hide_new_canvas": true,
            "hide_sequence_footer": false,
            "hide_navbar": false,
            "quiz_safe_mode": false,
            "dark_mode_fix": [],
            "assignment_states": {},
            "tab_icons": false,
            "todo_hide_feedback": false,
            "todo_full_height": true,
            "todo_progress_rings": "rings",
            "todo_confetti": true,
            "todo_show_scores": false,
            "device_dark": false,
            "cumulative_gpa": { "name": "Cumulative GPA", "hidden": false, "weight": "dnc", "credits": 999, "gr": 3.21 },
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
            "gpa_calc_cumulative": false,
            "gpa_calc_weighted": true,
            "browser_show_likes": false,
            "imageSize": 100,
            "cardRoundness": 5,
            "imageRoundness": 0,
            'cardSpacing': 0,
            "cardWidth": 262,
            "cardHeight": 146,
            "global_search": false,
            "grade_analytics": true,
            "grade_analytics_zones": false,
        }
    };

    const updateMsg = "Canvas Refined was just updated!\nThis version added new themes, cumulative GPA into the GPA calculator, and a new sorting function for themes.";

    // The Styles feature (custom fonts, custom CSS, custom backgrounds and the
    // opacity/blur sliders) was removed. Its settings are no longer read by
    // anything, so drop them on install/update instead of leaving orphaned
    // values behind — a long custom stylesheet in particular would otherwise
    // sit in storage.sync forever, eating into the sync quota.
    const removedOptions = [
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
            Object.keys(default_options["sync"]).forEach(option => {
                if (sync[option] !== undefined) return;
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
