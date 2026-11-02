// Shared by the content script and the settings page: the course navigation
// tabs that can be given a background color, and the palette to pick from.
// Canvas gives every tab's anchor an `#<tab>-link` id and leaves it out of the
// page when the tab is disabled for a course, so a missing tab has no effect.
const NAV_TABS = [
	{ tab: 'home', label: 'Home' },
	{ tab: 'announcements', label: 'Announcements' },
	{ tab: 'syllabus', label: 'Syllabus' },
	{ tab: 'modules', label: 'Modules' },
	{ tab: 'grades', label: 'Grades' },
	{ tab: 'people', label: 'People' },
	{ tab: 'assignments', label: 'Assignments' },
	{ tab: 'pages', label: 'Pages' },
	{ tab: 'discussions', label: 'Discussions' },
	{ tab: 'files', label: 'Files' },
	{ tab: 'quizzes', label: 'Quizzes' },
]

// The light tints (shades 1 and 2) of every Open Color group,
// https://yeun.github.io/open-color/. `null` keeps the current theme's styling.
const NAV_COLORS = {
	None: null,
	'Gray 1': '#f1f3f5',
	'Gray 2': '#e9ecef',
	'Red 1': '#ffe3e3',
	'Red 2': '#ffc9c9',
	'Pink 1': '#ffdeeb',
	'Pink 2': '#fcc2d7',
	'Grape 1': '#f3d9fa',
	'Grape 2': '#eebefa',
	'Violet 1': '#e5dbff',
	'Violet 2': '#d0bfff',
	'Indigo 1': '#dbe4ff',
	'Indigo 2': '#bac8ff',
	'Blue 1': '#d0ebff',
	'Blue 2': '#a5d8ff',
	'Cyan 1': '#c5f6fa',
	'Cyan 2': '#99e9f2',
	'Teal 1': '#c3fae8',
	'Teal 2': '#96f2d7',
	'Green 1': '#d3f9d8',
	'Green 2': '#b2f2bb',
	'Lime 1': '#e9fac8',
	'Lime 2': '#d8f5a2',
	'Yellow 1': '#fff3bf',
	'Yellow 2': '#ffec99',
	'Orange 1': '#ffe8cc',
	'Orange 2': '#ffd8a8',
}
