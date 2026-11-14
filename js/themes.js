// Built-in themes. Each theme has a light and a dark palette; the user's
// Light / Dark / System choice picks between them.
//
// Palette order: page, panel, raised, border, primary text, secondary text,
// muted text, link, sidebar, sidebar text. Every palette keeps primary text at
// 12:1 or more against all three surfaces, secondary text at 8:1, muted text
// and links at 5.5:1, and sidebar text at 7.5:1 (5:1 on the darker active nav
// item). content.js fits course titles to 7:1 on the card in both modes.
//
// Card photos are hotlinked from Unsplash and free to use under the Unsplash
// License (https://unsplash.com/license). Each photo is credited beside its id
// and in CREDITS.md.
const themes = [
	{
		title: 'Cinnamoroll',
		light: [
			'#f8fcff',
			'#f1f8fe',
			'#e5f0f9',
			'#9dbbd8',
			'#15263f',
			'#2c4466',
			'#486082',
			'#1d5fa6',
			'#cfe6f8',
			'#15263f',
		],
		dark: [
			'#0f1726',
			'#172238',
			'#213049',
			'#3f5677',
			'#eef6ff',
			'#cfe0f5',
			'#a7bfdc',
			'#8cc6ff',
			'#172238',
			'#eef6ff',
		],
		card_colors: ['#2f6db5', '#b0487a', '#4f5fb8', '#1f7a8c', '#7a4fae', '#3d6f9e'],
		// The first photo is also the theme's preview.
		photos: [
			// Photo by Emma Li: https://unsplash.com/photos/a-cinnamoroll-plush-toy-is-held-outdoors-kU15di70AXs
			'photo-1753079258957-4948083e42da',
			// Photo by Emma Li: https://unsplash.com/photos/someone-is-holding-a-cinnamoroll-plush-toy-F8z2tB5XwIg
			'photo-1753079258771-f042efb7be4d',
			// Photo by Srini Somanchi: https://unsplash.com/photos/a-few-white-clouds-in-a-clear-blue-sky-Dv_jWTtwroI
			'photo-1762179396527-e3ec983ad8b0',
			// Photo by Emma Li: https://unsplash.com/photos/cinnamoroll-plushie-next-to-a-yellow-dessert-agejxAktQzw
			'photo-1753079259052-c338e2288365',
			// Photo by Emma Li: https://unsplash.com/photos/a-person-holds-a-cute-plush-toy-ZPEztWpyVvk
			'photo-1753079275337-8d6ce0c46c31',
			// Photo by Billy Huynh: https://unsplash.com/photos/cloudy-sky-at-daytime-v9bnfMCyKbg
			'photo-1501630834273-4b5604d2ee31',
			// Photo by Emma Li: https://unsplash.com/photos/cinnamoroll-plush-nestled-amongst-greenery-vcq-3G-0zrE
			'photo-1753079275434-70e0d3793a0e',
			// Photo by Emma Li: https://unsplash.com/photos/a-cinnamoroll-plush-in-a-blue-elephant-costume-iR90ZKP2Egg
			'photo-1753079258961-d544153abe04',
		],
	},
	{
		title: 'Flowers',
		light: [
			'#fffafc',
			'#fdf4f7',
			'#f9eaef',
			'#d9a6b6',
			'#33141f',
			'#4f2433',
			'#713e50',
			'#af285a',
			'#f6cdda',
			'#33141f',
		],
		dark: [
			'#1c1015',
			'#26161d',
			'#331f28',
			'#6a4252',
			'#fff1f5',
			'#f2d3dd',
			'#cfa6b5',
			'#ff9fc0',
			'#2e1922',
			'#fff1f5',
		],
		card_colors: ['#b0285a', '#a3476b', '#7a3b8a', '#a3502e', '#5e7839', '#c2185b'],
		// The first photo is also the theme's preview.
		photos: [
			// Photo by Rikonavt: https://unsplash.com/photos/pink-roses-in-close-up-photography-oEWdQsbRVZk
			'photo-1582794543139-8ac9cb0f7b11',
			// Photo by TOMOKO UJI: https://unsplash.com/photos/pink-and-white-flowers-under-white-sky-during-daytime-kxvn1ogpTtE
			'photo-1602615576820-ea14cf3e476a',
			// Photo by Rikonavt: https://unsplash.com/photos/pink-flower-in-macro-lens-K3x_AkLVTAo
			'photo-1582794543462-0d7922e50cf5',
			// Photo by 雙 film: https://unsplash.com/photos/pink-cosmos-flowers-blooming-under-a-blue-sky-18yoQU4wEmM
			'photo-1773126305100-6f10b38a33b1',
			// Photo by Olia Gozha: https://unsplash.com/photos/photo-of-pink-petaled-flowers-9A_peGrSbZc
			'photo-1527061011665-3652c757a4d4',
			// Photo by Veronika Bykovich: https://unsplash.com/photos/pink-and-white-flower-in-tilt-shift-lens--umXNG5C544
			'photo-1616285720779-9e597265df0c',
			// Photo by Mi Min: https://unsplash.com/photos/pink-flowers-at-bloom-pkpqoBp11Jc
			'photo-1555231955-348aa2312e19',
			// Photo by Anya Chernykh: https://unsplash.com/photos/a-collection-of-soft-pink-and-peach-ranunculus-flowers-_GPxOouZI0w
			'photo-1767552659473-9a541393de94',
		],
	},
	{
		title: 'Forest',
		light: [
			'#f9fdf9',
			'#f3f9f2',
			'#e9f1e7',
			'#94a690',
			'#13241a',
			'#2a3e30',
			'#485c4c',
			'#1d6b3c',
			'#1f3a2a',
			'#eef5ec',
		],
		dark: [
			'#0d1511',
			'#141f19',
			'#1d2a22',
			'#3d5244',
			'#edf5ec',
			'#cfdccd',
			'#a5b8a4',
			'#7fd69a',
			'#162a1e',
			'#edf5ec',
		],
		card_colors: ['#1d6b3c', '#4a6b2a', '#6b4a2b', '#2e5e6b', '#6b6020', '#3f5f3f'],
		// The first photo is also the theme's preview.
		photos: [
			// Photo by Marita Kavelashvili: https://unsplash.com/photos/aerial-photo-of-green-trees-ugnrXk1129g
			'photo-1542273917363-3b1817f69a2d',
			// Photo by Sergei A: https://unsplash.com/photos/pine-trees-field-near-mountain-under-sunset--heLWtuAN3c
			'photo-1511497584788-876760111969',
			// Photo by Gustav Gullstrand: https://unsplash.com/photos/green-pine-trees-d6kSvT2xZQo
			'photo-1440581572325-0bea30075d9d',
			// Photo by Luca Bravo: https://unsplash.com/photos/body-of-water-surrounded-by-pine-trees-during-daytime-ESkw2ayO2As
			'photo-1473448912268-2022ce9509d8',
			// Photo by Sebastian Unrau: https://unsplash.com/photos/trees-on-forest-with-sun-rays-sp-p7uuT0tw
			'photo-1448375240586-882707db888b',
			// Photo by Irina Iriser: https://unsplash.com/photos/green-leafed-trees-2Y4dE8sdhlc
			'photo-1542202229-7d93c33f5d07',
			// Photo by Oleksii Rozanov: https://unsplash.com/photos/misty-forest-with-tall-pine-trees-on-a-hillside-_bN1UXyRSj0
			'photo-1773916543957-d370611ac764',
			// Photo by Steven Kamenar: https://unsplash.com/photos/photography-of-tall-trees-at-daytime-MMJx78V7xS8
			'photo-1425913397330-cf8af2ff40a1',
		],
	},
	{
		title: 'Ghibli',
		light: [
			'#fdfcf7',
			'#f8f7ef',
			'#f1efe2',
			'#aab49a',
			'#1f2a22',
			'#364538',
			'#556352',
			'#1f5f8b',
			'linear-gradient(#bfe0f5, #e3f0d0)',
			'#1f2a22',
		],
		dark: [
			'#121812',
			'#1a221b',
			'#252f26',
			'#4a5a4a',
			'#f4f6ec',
			'#d8decb',
			'#b0b9a3',
			'#8fc8f0',
			'linear-gradient(#17283a, #1c2a1d)',
			'#f4f6ec',
		],
		card_colors: ['#1f5f8b', '#3b6e3f', '#a3412b', '#6b4a8a', '#7a5f1a', '#2e6f6a'],
		// The first photo is also the theme's preview.
		photos: [
			// Photo by PJH: https://unsplash.com/photos/a-vibrant-red-bridge-leading-towards-a-lush-green-mountain-1hLvL7HEr1Y
			'photo-1783220829458-452d36024cdf',
			// Photo by Andrew Mascote: https://unsplash.com/photos/ghibli-clock-on-building-in-tokyo-yUCuFjx1hZQ
			'photo-1784321880961-b43450d95709',
			// Photo by Alexandra Tran: https://unsplash.com/photos/a-group-of-buildings-with-a-mountain-in-the-background-2K0fxI1mQ_U
			'photo-1728835804487-db019450bb07',
			// Photo by Mingwei Lim: https://unsplash.com/photos/a-group-of-masks-with-faces-drawn-on-them-Xj69EGAgs2s
			'photo-1641831705160-5d56ac4094cb',
			// Photo by Afif Ramdhasuma: https://unsplash.com/photos/girl-figurine-on-green-moss-zli4eDX3IPQ
			'photo-1631582053308-40f482e7ace5',
			// Photo by Isaac Resurreccion: https://unsplash.com/photos/a-view-of-a-train-track-with-a-bridge-in-the-background-RlnlP-EteI4
			'photo-1696454857021-fa3d94df281d',
			// Photo by Afif Ramdhasuma: https://unsplash.com/photos/red-haired-girl-in-green-dress-figurine-on-green-grass-during-daytime-eTMtdh85TOk
			'photo-1630207831419-3532bcb828d7',
			// Photo by Sylvia Xu: https://unsplash.com/photos/a-building-lit-up-at-night-with-lights-on-nCZLeMA7JmE
			'photo-1670736990625-ac75a09397cd',
		],
	},
	{
		title: 'Minecraft',
		light: [
			'#fbfdf8',
			'#f5f8f0',
			'#ecf1e4',
			'#9aa98a',
			'#1c2414',
			'#33402a',
			'#4f5c44',
			'#2f6b1f',
			'#5d4027',
			'#f4efe6',
		],
		dark: [
			'#121410',
			'#1b1f17',
			'#262b20',
			'#4b5540',
			'#eef4e4',
			'#d3dcc5',
			'#a9b59a',
			'#8fd46a',
			'#3b2a1a',
			'#f4efe6',
		],
		card_colors: [
			'#3f7a24',
			'#6b4a2b',
			'#5b5f66',
			'#1f6f78',
			'#9a2f1f',
			'#4b3f8f',
			'#2d6e3e',
			'#7a5a12',
		],
		// The first photo is also the theme's preview.
		photos: [
			// Photo by Anna Khromova: https://unsplash.com/photos/minecraft-figures-with-block-letters-WGihRw0tXqc
			'photo-1786919081692-8df9c2f778a9',
			// Photo by Addy Spartacus: https://unsplash.com/photos/lego-minecraft-character-holding-a-torch-GiC9s2MRMrw
			'photo-1759663174515-9057d83c8b8f',
			// Photo by Connor Gan: https://unsplash.com/photos/glowing-potion-bottle-lamp-and-blocks-F7zCI2jTR2A
			'photo-1697479670670-d2a299df749c',
			// Photo by Addy Spartacus: https://unsplash.com/photos/lego-sheep-surrounded-by-torches-on-black-surface-lBVAEKspFP0
			'photo-1759663177397-1580ecb15084',
			// Photo by Anna Khromova: https://unsplash.com/photos/minecraft-zombie-and-steve-action-figures-7jk5pK9vbYk
			'photo-1792982346313-52225b73551e',
			// Photo by Anna Khromova: https://unsplash.com/photos/enderman-and-steve-action-figures-YRALD6-VepU
			'photo-1787769573499-2ae4346f3ff0',
			// Photo by Addy Spartacus: https://unsplash.com/photos/minecraft-character-holding-a-shovel-on-a-blue-background-n2Ix-kDRf-0
			'photo-1759663175900-5f224551467c',
			// Photo by Anna Khromova: https://unsplash.com/photos/enderman-figure-with-creeper-and-blocks-5BhB1oLD4DU
			'photo-1793039539037-f6c834784cfa',
		],
	},
	{
		title: 'Pokemon',
		light: [
			'#fffaf9',
			'#fef4f3',
			'#faeae9',
			'#d9b54a',
			'#22201a',
			'#3f3a2c',
			'#625943',
			'#bb172b',
			'#a8121c',
			'#ffffff',
		],
		dark: [
			'#151417',
			'#1f1d22',
			'#2b2830',
			'#4a4552',
			'#fff8e1',
			'#f0e2b6',
			'#cbbd8f',
			'#ffd23f',
			'#8f101a',
			'#ffffff',
		],
		card_colors: [
			'#c4401c',
			'#2a63c4',
			'#2f7d32',
			'#8a6200',
			'#b0306a',
			'#5b3f8f',
			'#1f7a8c',
			'#4a3fb5',
		],
		// The first photo is also the theme's preview.
		photos: [
			// Photo by Michael Rivera: https://unsplash.com/photos/yellow-and-white-pokemon-character-toy-N7OocKwsJ0s
			'photo-1605979399824-542335ee35d5',
			// Photo by Thimo Pedersen: https://unsplash.com/photos/trading-cards-with-red-white-ball-dip9IIwUK6w
			'photo-1613771404721-1f92d799e49f',
			// Photo by Life Time Values: https://unsplash.com/photos/six-pokemon-figurines-lined-up-on-a-wooden-surface-caF_z0aTPtQ
			'photo-1759919440171-cdbc6b2f3554',
			// Photo by Branden Skeli: https://unsplash.com/photos/a-small-toy-on-a-rock-Y_-Pr7qLDf8
			'photo-1665762389848-8a6acfe934c0',
			// Photo by Halfcut Pokemon: https://unsplash.com/photos/a-group-of-pokemon-figurines-sitting-on-top-of-a-rock-WrUGh2DXfiw
			'photo-1637158881671-f6e4331887e5',
			// Photo by Connor Dickson: https://unsplash.com/photos/a-small-figurine-of-a-pokemon-sitting-on-the-ground-A1I8g8NccNg
			'photo-1642534270237-ae57b321c5bc',
			// Photo by Halfcut Pokemon: https://unsplash.com/photos/an-orange-toy-sitting-on-top-of-a-cement-ground-WC_Qjaryv4Y
			'photo-1640271443625-3276ed8f62b5',
			// Photo by Rodrigo Tadeo: https://unsplash.com/photos/a-couple-of-toy-figurines-sitting-on-top-of-a-wooden-table-9NNFmsEi1z4
			'photo-1730957296682-78ec10a09ce2',
		],
	},
	{
		title: 'Snoopy',
		light: [
			'#fdfcf9',
			'#f8f6f3',
			'#f1eee8',
			'#b9b19a',
			'#1a1a1a',
			'#333333',
			'#555149',
			'#b3261e',
			'#1f1f1f',
			'#fffdf7',
		],
		dark: [
			'#141414',
			'#1e1e1e',
			'#2a2a2a',
			'#4d4d4d',
			'#fbf8ef',
			'#e3dfd3',
			'#b9b4a6',
			'#ff8a7a',
			'#0f0f0f',
			'#fbf8ef',
		],
		card_colors: ['#b3261e', '#2f5fa8', '#3b7a3b', '#c1406e', '#8a5a00', '#3f3f3f'],
		// The first photo is also the theme's preview.
		photos: [
			// Photo by CHEN HENG: https://unsplash.com/photos/a-young-boy-riding-a-skateboard-past-a-cartoon-on-a-wall-ZBAy0MyVX1Q
			'photo-1739114855206-e2c07731c3d0',
			// Photo by Chris Boyer: https://unsplash.com/photos/a-red-and-white-airplane-with-a-cartoon-character-on-it-pxSbi1bS69I
			'photo-1736802079974-2a2627be6614',
			// Photo by ZENG YILI: https://unsplash.com/photos/a-bunch-of-small-figurines-that-are-on-a-table-9KC6aUtHJgc
			'photo-1711894021839-1546d49d2bc6',
			// Photo by NHN: https://unsplash.com/photos/snoopy-plush-toy-wearing-pilot-hat-and-scarf-zfRlsM_MBwY
			'photo-1764432550495-a0666f5e8c81',
			// Photo by Bernd 📷 Dittrich: https://unsplash.com/photos/white-snoopy-graffiti-on-a-colorful-wall-amidst-green-foliage-e8FWew0j1EM
			'photo-1778787880056-8362e49ed51d',
			// Photo by Sandy Ravaloniaina: https://unsplash.com/photos/a-person-holding-a-book-open-to-a-comic-strip-2XCW6fbGVpE
			'photo-1649179731119-b5491fc36f8e',
			// Photo by COSMOH: https://unsplash.com/photos/a-pillow-with-a-cartoon-on-it-sitting-on-a-couch-EJXKOrTXdyU
			'photo-1645352123624-3f68f6ff2942',
			// Photo by Joshua Carl: https://unsplash.com/photos/a-clock-with-a-cartoon-character-on-it-AWGwBpuIpTY
			'photo-1703124687062-f48f0be69ea3',
		],
	},
	{
		title: 'Totoro',
		light: [
			'#f8fdff',
			'#f1f8fb',
			'#e5f1f5',
			'#a6a796',
			'#1d2a2e',
			'#33454b',
			'#516268',
			'#2e6a4f',
			'#43575f',
			'#fefefb',
		],
		dark: [
			'#0f1513',
			'#17201c',
			'#222d28',
			'#43534b',
			'#f3f1e6',
			'#d9d6c6',
			'#aeb0a0',
			'#d8e86b',
			'#1c2a30',
			'#f3f1e6',
		],
		card_colors: ['#4f6b7a', '#2e6a4f', '#7a5a2e', '#3d5a80', '#a0521d', '#5a5f2e'],
		// The first photo is also the theme's preview.
		photos: [
			// Photo by Sou Jest: https://unsplash.com/photos/totoro-statue-holding-an-umbrella-with-a-smaller-creature-asR5NuzTGFU
			'photo-1777562475801-e37575090e44',
			// Photo by Yosuke Ota: https://unsplash.com/photos/a-group-of-small-figurines-sitting-on-top-of-a-table-nMA2WjsmjMU
			'photo-1679310446454-f94b53167675',
			// Photo by PJH: https://unsplash.com/photos/totoro-plush-toys-and-merchandise-displayed-outdoors-5IO6LB4ecio
			'photo-1760243875166-390e30ffe049',
			// Photo by Thức Trần: https://unsplash.com/photos/totoro-statue-holding-an-umbrella-on-a-wooden-deck-C1oGr5HU-U8
			'photo-1759165440298-08de9530d033',
			// Photo by Lee JH: https://unsplash.com/photos/totoro-peers-over-a-counter-in-a-cozy-room-Pk6Q6bAA4Sw
			'photo-1752123542027-d12963751b0d',
			// Photo by W il: https://unsplash.com/photos/totoro-figurine-with-fireflies-Xcb6eJfvLVg
			'photo-1650770052615-9b8ca0eb8f0c',
			// Photo by Hoyoun Lee: https://unsplash.com/photos/a-bunch-of-stuffed-animals-that-are-on-a-table-qQWH2j2rg2U
			'photo-1695747003790-1539fea7f53c',
			// Photo by Sung Jin Cho: https://unsplash.com/photos/brown-and-white-animal-plush-toy-SCXFgBoy-as
			'photo-1621146423724-ddedf4fc9304',
		],
	},
	{
		title: 'Lavender',
		light: [
			'#fcfbff',
			'#f8f5fd',
			'#f0ecf9',
			'#b3a6d6',
			'#221a38',
			'#3a2f57',
			'#5a4f78',
			'#5b3fae',
			'#e0d5f7',
			'#221a38',
		],
		dark: [
			'#15111f',
			'#1e182c',
			'#29213b',
			'#54487a',
			'#f5f1ff',
			'#ddd5f3',
			'#b8acd8',
			'#c4b0ff',
			'#241c36',
			'#f5f1ff',
		],
		card_colors: ['#5b3fae', '#7a4fa8', '#3f5fae', '#8a3f8a', '#4f6b5a', '#a0527a'],
		// The first photo is also the theme's preview.
		photos: [
			// Photo by Antony BEC: https://unsplash.com/photos/lavender-fields-in-valensole-france-nD9tEn63suc
			'photo-1600759487717-62bbb608106e',
			// Photo by Dimitri Iakymuk: https://unsplash.com/photos/purple-flower-field-under-blue-sky-during-daytime-mCR10j_B6sM
			'photo-1600699260716-d5ed9a3f9efe',
			// Photo by Annie Spratt: https://unsplash.com/photos/lavender-flower-field-blooms-at-daytime-NrflUuJJK0I
			'photo-1445510491599-c391e8046a68',
			// Photo by Léonard Cotte: https://unsplash.com/photos/lavender-field-c1Jp-fo53U8
			'photo-1499002238440-d264edd596ec',
			// Photo by Baraa Jalahej: https://unsplash.com/photos/purple-flower-in-tilt-shift-lens-qfZGhapxoa4
			'photo-1611625105602-42ee06be977e',
			// Photo by Mark Harpur: https://unsplash.com/photos/stone-path-to-lake-atitlan-pier-K2s_YE031CA
			'photo-1532274402911-5a369e4c4bb5',
			// Photo by Klara Kulikova: https://unsplash.com/photos/purple-flower-in-tilt-shift-lens-DQs1QUMNcjI
			'photo-1625215393266-d09797f4a441',
			// Photo by Grant Sams: https://unsplash.com/photos/a-field-of-vibrant-purple-lavender-under-a-blue-sky-7TzQ3q6_8Ig
			'photo-1769799188889-156739fa4f66',
		],
	},
	{
		title: 'Peach',
		light: [
			'#fffaf8',
			'#fef5f1',
			'#f9ebe5',
			'#e0ab8c',
			'#3a1d10',
			'#55301e',
			'#7a4a33',
			'#a43d18',
			'#ffcfb3',
			'#3a1d10',
		],
		dark: [
			'#1d130e',
			'#281b14',
			'#35241b',
			'#6e4a38',
			'#fff3ea',
			'#f5d9c6',
			'#d6b09a',
			'#ffab85',
			'#33211a',
			'#fff3ea',
		],
		card_colors: ['#b2421a', '#a3502e', '#8a3a3a', '#5e792d', '#af526a', '#9a5f12'],
		// The first photo is also the theme's preview.
		photos: [
			// Photo by NisonCo PR and SEO: https://unsplash.com/photos/a-pile-of-peaches-with-a-leaf-on-top-H4QpChoce7I
			'photo-1639588473831-dd9d014646ae',
			// Photo by Vlad Deep: https://unsplash.com/photos/peaches-with-halved-fruit-on-white-dAjYxJrcdd8
			'photo-1629828874514-c1e5103f2150',
			// Photo by Jessica Donnelly: https://unsplash.com/photos/ripe-peaches-hang-from-a-tree-branch-with-green-leaves-n7ojdn6lsUs
			'photo-1774329659426-1b83a12f0893',
			// Photo by Hamad Alahamad: https://unsplash.com/photos/a-couple-of-peaches-sitting-on-top-of-each-other-bNuil3PcTSM
			'photo-1642372849486-f88b963cb734',
			// Photo by The Matter of Food: https://unsplash.com/photos/sliced-red-and-yellow-fruit-lqwVe3qO6l4
			'photo-1595124245030-41448b199d6d',
			// Photo by Jared Subia: https://unsplash.com/photos/orange-peach-fruits-RJd6XkebL6A
			'photo-1565769583321-29e69b493031',
			// Photo by Scott Goodwill: https://unsplash.com/photos/soft-pink-and-orange-clouds-in-a-pastel-sky-A3u8Ugv1EAw
			'photo-1779380033776-ca3c5e64c893',
			// Photo by Sara Iovino: https://unsplash.com/photos/sliced-fruit-in-white-ceramic-bowl-wF9-2UljgVE
			'photo-1600707482842-ea7ec73daa90',
		],
	},
	{
		title: 'Lagoon',
		light: [
			'#f7fdfd',
			'#eff9f9',
			'#e2f2f2',
			'#87bfc0',
			'#0f2a2e',
			'#22444a',
			'#3d6268',
			'#0b6a70',
			'#08575e',
			'#f0fbfb',
		],
		dark: [
			'#0b1719',
			'#112124',
			'#182d31',
			'#33585e',
			'#ecfbfb',
			'#c9e9ea',
			'#9cc8ca',
			'#5fd9de',
			'#0d2a2e',
			'#ecfbfb',
		],
		card_colors: ['#0b6e75', '#1f5f8b', '#2e7a5a', '#a3502e', '#3f5fae', '#6b5a2e'],
		// The first photo is also the theme's preview.
		photos: [
			// Photo by Spencer Davis: https://unsplash.com/photos/man-sitting-in-body-of-water-EvS_yFY48VU
			'photo-1567062691477-fcbc8bbdf5b1',
			// Photo by Emmanuel Cassar: https://unsplash.com/photos/a-boat-is-in-the-clear-blue-water-CsA7i_gwc5Y
			'photo-1713722122973-bfa5e9ebca82',
			// Photo by Hamdhulla Shakeeb: https://unsplash.com/photos/an-aerial-view-of-a-pier-in-the-water-DChv9lYLhFw
			'photo-1639044486469-d92dbe38c641',
			// Photo by Chris Lawton: https://unsplash.com/photos/brown-wooden-bridge-during-daytime-rH810coWgTI
			'photo-1439725434120-c1b50e0cc329',
			// Photo by Barna Kovács: https://unsplash.com/photos/boats-dotting-a-turquoise-bay-near-a-rocky-island-Wth29UiSwWE
			'photo-1759472287837-927ac19d1065',
			// Photo by Hongbin: https://unsplash.com/photos/a-sandy-beach-with-clear-blue-water-on-a-sunny-day-w5qV59bXPZc
			'photo-1719041618930-be06e0d54ab7',
			// Photo by Nick Fewings: https://unsplash.com/photos/blue-body-of-water-1kknM5mP50Y
			'photo-1571674003841-16b36bda4bc8',
			// Photo by Jenny Marvin: https://unsplash.com/photos/top-view-of-body-of-water-surrounded-by-rocks-7elOJvUxVH8
			'photo-1528695476376-929468d542de',
		],
	},
	{
		title: 'Latte',
		light: [
			'#fffbf7',
			'#fcf6ef',
			'#f6ede3',
			'#b8a38c',
			'#2a1d14',
			'#45332a',
			'#66503f',
			'#8a4a24',
			'#3a2a21',
			'#f4eadf',
		],
		dark: [
			'#17110d',
			'#211913',
			'#2d221a',
			'#5b4636',
			'#f7efe6',
			'#e3d4c4',
			'#bfa995',
			'#e6b68a',
			'#2a1d15',
			'#f7efe6',
		],
		card_colors: ['#8a4a24', '#6b4a3a', '#5a6b4a', '#7a3f2e', '#4f5a6b', '#8a6a3f'],
		// The first photo is also the theme's preview.
		photos: [
			// Photo by tabitha turner: https://unsplash.com/photos/white-ceramic-cup-with-saucer-on-brown-wooden-table-3n3mPoGko8g
			'photo-1593443320739-77f74939d0da',
			// Photo by Nathan Dumlao: https://unsplash.com/photos/aerial-photography-of-cafe-latte-on-table-ikU3J1nr52w
			'photo-1529892485617-25f63cd7b1e9',
			// Photo by Fahmi Fakhrudin: https://unsplash.com/photos/person-making-latte-art-nzyzAUsbV0M
			'photo-1541167760496-1628856ab772',
			// Photo by nameless 3791: https://unsplash.com/photos/a-cup-of-coffee-with-latte-art-on-a-saucer-T3fFz5W0Foc
			'photo-1760163178873-7644a924519e',
			// Photo by Nathan Dumlao: https://unsplash.com/photos/top-view-photography-of-heart-latte-coffee-XOhI_kW_TaM
			'photo-1512568400610-62da28bc8a13',
			// Photo by Andie Jo: https://unsplash.com/photos/a-cup-of-coffee-with-a-saucer-on-a-saucer-SsZBVN3_thY
			'photo-1690609561635-f63c587b3aba',
			// Photo by Phil Desforges: https://unsplash.com/photos/cafe-latte-Nw8wbiDE3gU
			'photo-1559001724-fbad036dbc9e',
			// Photo by Ines Iachelini: https://unsplash.com/photos/several-cups-of-coffee-with-latte-art-zReWD06oMzU
			'photo-1775203291807-c086b69cba1a',
		],
	},
	{
		title: 'Nordic',
		light: [
			'#f9fcfe',
			'#f3f7fb',
			'#e9eff5',
			'#a2afbf',
			'#18202b',
			'#2f3a48',
			'#4c596a',
			'#275d8f',
			'#2c3e50',
			'#f3f6f9',
		],
		dark: [
			'#10151b',
			'#171e26',
			'#212a35',
			'#445264',
			'#eef2f7',
			'#d0d8e3',
			'#a8b4c4',
			'#8ab8e8',
			'#1a2430',
			'#eef2f7',
		],
		card_colors: ['#275d8f', '#a33a2e', '#3f6b5a', '#5a6b7a', '#6b5a8a', '#2e6f7a'],
		// The first photo is also the theme's preview.
		photos: [
			// Photo by Finge Holden: https://unsplash.com/photos/a-large-body-of-water-surrounded-by-mountains-ur1CldF6mNw
			'photo-1698307781486-7c63dadf5fb7',
			// Photo by admiratio: https://unsplash.com/photos/a-river-running-through-a-valley-between-mountains-p2D3wsu5pQM
			'photo-1664825381616-5cb8397fd9b1',
			// Photo by Danny Rienecker: https://unsplash.com/photos/coastal-village-nestled-among-dramatic-mountains-and-blue-water-wEQhRuDLahs
			'photo-1779991830181-f3493f08be2f',
			// Photo by Fernando Strabuli: https://unsplash.com/photos/body-of-water-surrounded-mountain-peak-W1FIkdPAB7E
			'photo-1508592931388-95bc7b61033d',
			// Photo by Seth kane: https://unsplash.com/photos/red-and-white-wooden-house-in-front-of-body-of-water-XOEAHbE_vO8
			'photo-1504233529578-6d46baba6d34',
			// Photo by René: https://unsplash.com/photos/small-boat-on-a-turquoise-lake-with-misty-mountains-13kNHpXeBQc
			'photo-1785704475232-4c035d80964e',
			// Photo by Danny Rienecker: https://unsplash.com/photos/henningsvaer-fishing-village-in-norway-GmgCJ0z2lyc
			'photo-1781444554216-60fa5ac34903',
			// Photo by Michael Fousert: https://unsplash.com/photos/colorful-wooden-houses-in-bergen-lE5-z4nTCTQ
			'photo-1544085311-11a028465b03',
		],
	},
	{
		title: 'Berry',
		light: [
			'#fffafb',
			'#fef4f6',
			'#f9eaee',
			'#d89aae',
			'#2e0f1b',
			'#4a1a2c',
			'#6e3348',
			'#a3154f',
			'#8c1d40',
			'#fff4f7',
		],
		dark: [
			'#1a0d12',
			'#25121a',
			'#321a24',
			'#6b3349',
			'#fff0f4',
			'#f2ccd8',
			'#d4a0b2',
			'#ff8fb5',
			'#3a1222',
			'#fff0f4',
		],
		card_colors: ['#a3154f', '#7a1f5a', '#3f4fa8', '#b0302e', '#4f7a2e', '#8a2a7a'],
		// The first photo is also the theme's preview.
		photos: [
			// Photo by Rodion Kutsaiev: https://unsplash.com/photos/black-berry-fruit-4k8xEFW4_3Q
			'photo-1577003833154-a92bbd63ae13',
			// Photo by Zach Inglis: https://unsplash.com/photos/macro-photography-of-raspberry-fruits-t0A2NCMhXRQ
			'photo-1577069861033-55d04cec4ef5',
			// Photo by Anto Meneghini: https://unsplash.com/photos/raspberry-fruits-gQyTxSrctvw
			'photo-1530983820165-35b7aa38a105',
			// Photo by Sneha Cecil: https://unsplash.com/photos/red-and-black-berries-on-black-surface-Qt6ojt3CacE
			'photo-1596591606975-97ee5cef3a1e',
			// Photo by Stan Slade: https://unsplash.com/photos/red-raspberry-fruit-in-close-up-photography-BM27BzBrhVM
			'photo-1593461802389-d57d73a36913',
			// Photo by Hamad Alahamad: https://unsplash.com/photos/a-pile-of-raspberries-on-a-white-background-2OZ7sJapNFk
			'photo-1642372849475-5a3ea061af8c',
			// Photo by Jim Petkiewicz: https://unsplash.com/photos/crates-of-fresh-raspberries-ready-for-sale-660EMCbT1cw
			'photo-1757812447944-13bf97703f49',
			// Photo by Olga Trosheva: https://unsplash.com/photos/frozen-raspberries-close-up-background-MprV7mzDD-E
			'photo-1761801982507-6366eb54f82e',
		],
	},
	{
		title: 'Citrus',
		light: [
			'#fcfcf6',
			'#f7f8ee',
			'#eff0e0',
			'#d8c25a',
			'#262106',
			'#3d3510',
			'#5e5420',
			'#3a6600',
			'#ffe14d',
			'#262106',
		],
		dark: [
			'#15140a',
			'#1e1c0f',
			'#2a2715',
			'#575026',
			'#fffbe0',
			'#efe8b8',
			'#cfc68a',
			'#ffe14d',
			'#22300f',
			'#fffbe0',
		],
		card_colors: ['#3a6600', '#9a5a00', '#6b6000', '#2e6b4a', '#a3402e', '#5a5a12'],
		// The first photo is also the theme's preview.
		photos: [
			// Photo by Vladimir Gladkov: https://unsplash.com/photos/lemons-on-white-fabric-with-shadows-HzswivUN-tI
			'photo-1608322368735-b6b6ec262af7',
			// Photo by Steve Doig: https://unsplash.com/photos/yellow-round-fruits-on-tree-during-daytime-FaMBWkmvPyY
			'photo-1605185189315-fc269c231e41',
			// Photo by Mustafa akın: https://unsplash.com/photos/several-whole-lemons-and-one-cut-in-half-C5o6xUEfg0E
			'photo-1774857244194-b2c66ac93e43',
			// Photo by Sama Hosseini: https://unsplash.com/photos/yellow-lemon-slices-citrus-fruit-tm7Mf8apKCQ
			'photo-1610126176343-3e1833a107e1',
			// Photo by Brave Sneakers: https://unsplash.com/photos/lemons-growing-on-a-tree-branch-with-leaves-HPW_Hjzw6ZA
			'photo-1775731677272-6be17f76d396',
			// Photo by Tati Niki: https://unsplash.com/photos/a-pile-of-fresh-yellow-lemons-with-green-leaves--s_TDs0IFv8
			'photo-1783083531142-519200c78e13',
			// Photo by Julia Zolotova: https://unsplash.com/photos/yellow-lemon-fruit-on-white-surface-2aFE-gUcCvc
			'photo-1610833805553-43556a0f821d',
			// Photo by Thitiphum Koonjantuek: https://unsplash.com/photos/yellow-citrus-fruits-on-black-surface-TFqjlTmkeyY
			'photo-1590502593747-42a996133562',
		],
	},
	{
		title: 'Midnight',
		light: [
			'#fafcff',
			'#f4f7ff',
			'#eaeefa',
			'#9ba7c7',
			'#121a33',
			'#283456',
			'#47527a',
			'#2d48a8',
			'#121a33',
			'#f6d77a',
		],
		dark: [
			'#0a0e1c',
			'#10162a',
			'#182038',
			'#34406a',
			'#eef1fb',
			'#ccd3ea',
			'#9fa9cc',
			'#f6d77a',
			'#070a16',
			'#f6d77a',
		],
		card_colors: ['#2d48a8', '#5a3fa8', '#1f6f8a', '#8a6a12', '#7a3f8a', '#3f5f8a'],
		// The first photo is also the theme's preview.
		photos: [
			// Photo by Nathan Anderson: https://unsplash.com/photos/milky-way-over-mountain-landscape-at-night-L95xDkSSuWw
			'photo-1488866022504-f2584929ca5f',
			// Photo by Jeremy Thomas: https://unsplash.com/photos/blue-and-purple-galaxy-digital-wallpaper-E0AHdsENmDg
			'photo-1464802686167-b939a6910659',
			// Photo by Joshua Woroniecki: https://unsplash.com/photos/silhouette-of-trees-under-blue-sky-0289jpHHk0o
			'photo-1595520519880-a86c48ea536c',
			// Photo by Tyler Clemmensen: https://unsplash.com/photos/silhouette-of-mountain-under-starry-night-DQ_KYf1LF6E
			'photo-1606247357835-d27fe83fc6a3',
			// Photo by Luca Nicoletti: https://unsplash.com/photos/the-night-sky-is-filled-with-stars-and-trees-jKZ2iUsaqXk
			'photo-1641895958846-19dab3471449',
			// Photo by Sobolev Maksim: https://unsplash.com/photos/a-dark-blue-background-with-many-small-white-dots-Th7o-HedRAE
			'photo-1768464864653-c5ab6400747e',
			// Photo by Olena Bohovyk: https://unsplash.com/photos/stars-in-the-sky-during-night-time-Cq5NaI0yKBE
			'photo-1628498188904-036f5e25e93e',
			// Photo by Ashwini Chaudhary(Monty): https://unsplash.com/photos/stars-scattered-across-dark-night-sky-rWkKNzxgFo8
			'photo-1788237860001-e2c9466c604a',
		],
	},
	{
		title: 'Aurora',
		light: [
			'#f7fdfb',
			'#f0f9f6',
			'#e4f2ed',
			'#8cb5ab',
			'#0f2722',
			'#24423b',
			'#42635a',
			'#0f6c59',
			'linear-gradient(#0f2e2a, #2a1f4a)',
			'#e8fff6',
		],
		dark: [
			'#0b1414',
			'#111e1d',
			'#192a28',
			'#345a52',
			'#ecfaf5',
			'#c8e8de',
			'#98c4b6',
			'#6ef0b8',
			'linear-gradient(#0d2a26, #24183f)',
			'#e8fff6',
		],
		card_colors: ['#0f6e5a', '#5a3fa8', '#1f6f8a', '#3f7a3a', '#7a3f8a', '#2e5f7a'],
		// The first photo is also the theme's preview.
		photos: [
			// Photo by Johny Goerend: https://unsplash.com/photos/aurora-borealis-over-reine-lofoten-x3WQMj5QkEE
			'photo-1593378026483-2a1fd46a35bd',
			// Photo by Vincent Guth: https://unsplash.com/photos/silhouette-of-trees-near-aurora-borealis-at-night-62V7ntlKgL8
			'photo-1483347756197-71ef80e95f73',
			// Photo by Juho Luomala: https://unsplash.com/photos/aurora-borealis-over-a-snowy-forest-road-pzBTqFBmEJc
			'photo-1771944163157-853c3d7325ae',
			// Photo by Lightscape: https://unsplash.com/photos/northern-lights-over-snow-capped-mountian-LtnPejWDSAY
			'photo-1531366936337-7c912a4589a7',
			// Photo by Johny Goerend: https://unsplash.com/photos/northern-lights-over-flakstad-beach-U_diPCXCBxU
			'photo-1507272931001-fc06c17e4f43',
			// Photo by Federico Di Dio photography: https://unsplash.com/photos/green-aurora-lights-during-night-time-JWHSIG1kM2c
			'photo-1609528911883-fc7e0ee63c51',
			// Photo by David Becker: https://unsplash.com/photos/aurora-borealis-over-a-snowy-forest-landscape-with-pine-trees-5_lSZqM4nMM
			'photo-1764957080454-dd997a855733',
			// Photo by Sami Matias Breilin: https://unsplash.com/photos/aurora-borealis-UZOpP-YHe9Q
			'photo-1568607689150-17e625c1586e',
		],
	},
	{
		title: 'Ember',
		light: [
			'#fffbf9',
			'#fbf5f2',
			'#f6ece8',
			'#bfa090',
			'#24150f',
			'#3d2519',
			'#5e4031',
			'#aa380d',
			'#1f1612',
			'#ffb27a',
		],
		dark: [
			'#120d0b',
			'#1b1411',
			'#261c17',
			'#553b2f',
			'#fbefe8',
			'#ead2c4',
			'#c8a594',
			'#ff9a5c',
			'#0e0907',
			'#ffb27a',
		],
		card_colors: ['#b23a0e', '#9a2a1f', '#a0521d', '#7a3a2a', '#8a5a12', '#5a3f3a'],
		// The first photo is also the theme's preview.
		photos: [
			// Photo by David Schultz: https://unsplash.com/photos/fire-on-bonfire-during-night-time-dFyh-5kn3_Q
			'photo-1596860899920-c3fe864485d9',
			// Photo by Clay Banks: https://unsplash.com/photos/photo-of-bonfire-sgM7vHx0D2s
			'photo-1571142191114-feec5c22f686',
			// Photo by Alican Leblebici: https://unsplash.com/photos/glowing-hot-embers-and-coals-in-a-fire-5w2hjEJ06b0
			'photo-1762202742459-4fcdc4beaab4',
			// Photo by Tolga Ahmetler: https://unsplash.com/photos/fire-in-the-middle-of-the-woods-W2WEfxBzT4Q
			'photo-1600102547096-b47c89b02055',
			// Photo by Albert Stoynov: https://unsplash.com/photos/a-fire-is-lit-up-in-the-dark-i-wDe3A03Hc
			'photo-1694757275164-8b3723412919',
			// Photo by Liam Briese: https://unsplash.com/photos/bonfire-ueWydDz00_4
			'photo-1570374953872-7ede4492beb1',
			// Photo by Pablo Martinez: https://unsplash.com/photos/a-close-up-of-lava-rocks-with-red-lights-Oq4dyPV5Vus
			'photo-1556660418-fc293a5d848d',
			// Photo by Samuel Kavanagh: https://unsplash.com/photos/glowing-embers-scattered-on-a-dark-background-GSCsJMZ7qJM
			'photo-1757773046827-aadb24de6046',
		],
	},
	{
		title: 'Dog',
		light: [
			'#fefbf7',
			'#fbf6ef',
			'#f5ede2',
			'#c2a47a',
			'#2a2015',
			'#45372a',
			'#64533f',
			'#8a4f0a',
			'#2e4a6e',
			'#fbf6ec',
		],
		dark: [
			'#16130f',
			'#1f1b16',
			'#2a251e',
			'#57492f',
			'#faf3e6',
			'#e8dcc6',
			'#c4b397',
			'#f0b860',
			'#1e2f45',
			'#f5efe3',
		],
		card_colors: [
			'#2e5a8a',
			'#a63a2a',
			'#8a5a12',
			'#3f7a2e',
			'#5e6b0f',
			'#6b4a2e',
			'#1f7380',
		],
		// The first photo is also the theme's preview.
		photos: [
			// Photo by Alvan Nee: https://unsplash.com/photos/a-happy-corgi-dog-sits-in-green-grass-Nms-W0u4J7c
			'photo-1763718205007-fb085a276026',
			// Photo by Oscar Sutton: https://unsplash.com/photos/dog-running-on-beach-during-daytime-yihlaRCCvd4
			'photo-1530281700549-e82e7bf110d6',
			// Photo by Milli: https://unsplash.com/photos/dogs-face-2l0CWTpcChI
			'photo-1543466835-00a7907e9de1',
			// Photo by charlesdeluvio: https://unsplash.com/photos/black-dog-wearing-blue-denim-collar-K4mSJ7kc0As
			'photo-1518020382113-a7e8fc38eac9',
			// Photo by Alvan Nee: https://unsplash.com/photos/short-coated-brown-and-white-puppy-sitting-on-floor-brFsZ7qszSY
			'photo-1537151625747-768eb6cf92b2',
			// Photo by Daniel J. Schwarz: https://unsplash.com/photos/border-collie-holding-wildflowers-in-berchtesgaden-mountains-XAfyShV-bAo
			'photo-1783936093098-2daf9e8ef72e',
			// Photo by Alvan Nee: https://unsplash.com/photos/two-brown-and-white-dogs-running-dirt-road-during-daytime-T-0EW-SEbsE
			'photo-1548199973-03cce0bbc87b',
			// Photo by Taylor Sondgeroth: https://unsplash.com/photos/golden-retriever-puppy-lying-on-white-textile-ltsKOg_q_Gc
			'photo-1625794084867-8ddd239946b1',
		],
	},
	{
		title: 'Cat',
		light: [
			'#fefafd',
			'#fbf5f9',
			'#f5ebf2',
			'#c4a6bb',
			'#2b1a27',
			'#46303f',
			'#66505f',
			'#8e3d6b',
			'#4a3346',
			'#fbf2f7',
		],
		dark: [
			'#18131a',
			'#211a23',
			'#2c232f',
			'#584659',
			'#f9f0f6',
			'#e6d5e1',
			'#c4adbd',
			'#f2a7cf',
			'#2a1e29',
			'#f9f0f6',
		],
		card_colors: [
			'#a8501c',
			'#8e3d6b',
			'#4f6378',
			'#3f7a4a',
			'#5a4a66',
			'#7a5a3a',
			'#b04a6a',
		],
		// The first photo is also the theme's preview.
		photos: [
			// Photo by Alvan Nee: https://unsplash.com/photos/white-and-brown-long-fur-cat-ZCHj_2lJP00
			'photo-1592194996308-7b43878e84a6',
			// Photo by Amber Kipp: https://unsplash.com/photos/selective-focus-photography-of-orange-and-white-cat-on-brown-table-75715CVEJhI
			'photo-1573865526739-10659fec78a5',
			// Photo by Raoul Droog: https://unsplash.com/photos/russian-blue-cat-wearing-yellow-sunglasses-yMSecCHsIBc
			'photo-1533738363-b7f9aef128ce',
			// Photo by Manja Vitolic: https://unsplash.com/photos/black-and-white-cat-lying-on-brown-bamboo-chair-inside-room-gKXKBY-C-Dk
			'photo-1514888286974-6c03e2ca1dba',
			// Photo by Marco Grosso: https://unsplash.com/photos/a-small-ginger-kitten-peeking-from-behind-a-plant-pot-k4_-66jcvzA
			'photo-1764323170445-37743bbb2ec1',
			// Photo by Nowbelov: https://unsplash.com/photos/a-curious-cat-peeks-through-a-hole-in-cardboard-lMjRzppANHY
			'photo-1774876267601-501fa7d17ac7',
			// Photo by Ansis Kančs: https://unsplash.com/photos/black-cat-with-white-chest-patch-BxyJvHbb4TA
			'photo-1787404200329-78b2aaee13c1',
			// Photo by Mikhail Vasilyev: https://unsplash.com/photos/white-and-gray-cat-IFxjDdqK_0U
			'photo-1472491235688-bdc81a63246e',
		],
	},
	{
		title: 'Fish',
		light: [
			'#f7fdff',
			'#eff9fb',
			'#e2f2f6',
			'#93b3cc',
			'#10233a',
			'#283f58',
			'#455c75',
			'#a63c0c',
			'#123d6a',
			'#f2f8ff',
		],
		dark: [
			'#08131f',
			'#0e1b2b',
			'#16263a',
			'#2f4a6a',
			'#ecf5ff',
			'#c9dcf0',
			'#9db6d2',
			'#ff9a6b',
			'#0c2340',
			'#ecf5ff',
		],
		card_colors: [
			'#b0420f',
			'#1f5f99',
			'#a3202f',
			'#13707a',
			'#a33a8a',
			'#3f6f2a',
			'#5a4fa8',
		],
		// The first photo is also the theme's preview.
		photos: [
			// Photo by Sou Jest: https://unsplash.com/photos/red-and-white-goldfish-swimming-ayOUamNaPpw
			'photo-1788195188809-92bec4db841b',
			// Photo by Alejandro Aro: https://unsplash.com/photos/orange-and-white-koi-fish-4QElkUC9sUQ
			'photo-1616989161881-6c788f319bd7',
			// Photo by Rachel Hisko: https://unsplash.com/photos/clown-fish-in-shallow-focus-photography-rEM3cK8F1pk
			'photo-1535591273668-578e31182c4f',
			// Photo by David Clode: https://unsplash.com/photos/gray-and-yellow-fish-iLwQIbWxv-s
			'photo-1516408388733-2f8364f2e00b',
			// Photo by André Filipe: https://unsplash.com/photos/colorful-koi-fish-with-open-mouths-swimming-in-water-tgquwJMTbZQ
			'photo-1784039798906-e00bd48d9f73',
			// Photo by Nuno Alves: https://unsplash.com/photos/colorful-tropical-fish-swim-among-coral-reefs-sr12AZDzi9o
			'photo-1761634853050-5300a09c223a',
			// Photo by Worachat Sodsri: https://unsplash.com/photos/two-siamese-fighting-fishes-nCz_ZgnbtaE
			'photo-1578507065211-1c4e99a5fd24',
			// Photo by Jason Leung: https://unsplash.com/photos/macro-photography-of-koi-fish-7rR_WSk4HM0
			'photo-1517361265-3bd77c6f1689',
		],
	},
]

// Palettes that earlier versions saved for the themes above. Saved presets
// that match one of these still resolve to the theme's current palettes.
const legacyThemePalettes = {
	Cinnamoroll: [
		[
			'#e0e2ff',
			'#b4b9fe',
			'#5b3960',
			'#b4b9fe',
			'#292929',
			'#000000',
			'#000000',
			'#707aff',
			'#b4b9fe',
			'#ffffff',
		],
		[
			'#141729',
			'#20243c',
			'#2c3250',
			'#626d9f',
			'#f0f2ff',
			'#d4daf7',
			'#afb9e0',
			'#aab5ff',
			'#20243c',
			'#f0f2ff',
		],
	],
	Flowers: [
		[
			'#fff0f0',
			'#ffafbd',
			'#ffafbd',
			'#ffafbd',
			'#e56182',
			'#e56183',
			'#ffafbd',
			'#e56182',
			'#ffafbd',
			'#fbeef2',
		],
		[
			'#251218',
			'#371d27',
			'#4a2936',
			'#94576e',
			'#fff0f5',
			'#f0ccd9',
			'#d5a6b9',
			'#f397b5',
			'#371d27',
			'#fff0f5',
		],
	],
	Forest: [
		[
			'#102623',
			'#102623',
			'#102623',
			'#3d714b',
			'#ffffff',
			'#ffffff',
			'#fff',
			'#8fffad',
			'#3d714b',
			'#ffffff',
		],
		[
			'#102019',
			'#192f22',
			'#243f2c',
			'#487553',
			'#ecfaeb',
			'#cee6ca',
			'#a6c79f',
			'#8fffad',
			'#1d3826',
			'#ecfaeb',
		],
	],
	Ghibli: [
		[
			'#e6e6e6',
			'#f5f5f5',
			'#d4d4d4',
			'#c7cdd1',
			'#4d5d53',
			'#777e72',
			'#a5a5a5',
			'#738678',
			'#738678',
			'#ffffff',
		],
		[
			'#161e18',
			'#222e25',
			'#303e31',
			'#66785e',
			'#edf3e8',
			'#d4dfcc',
			'#afc0a5',
			'#aec9ae',
			'#222e25',
			'#edf3e8',
		],
	],
	Minecraft: [
		[
			'#1a1008',
			'#1f3517',
			'#274420',
			'#4a3a20',
			'#f5f5f5',
			'#e2e2e2',
			'#ababab',
			'#88df81',
			'#2f5a14',
			'#f5f5f5',
		],
		[
			'#171d0e',
			'#202d16',
			'#2b3c1e',
			'#586e3c',
			'#eff5df',
			'#d4e0bf',
			'#b0c398',
			'#88df81',
			'#253d14',
			'#eff5df',
		],
	],
	Pokemon: [
		[
			'#110c12',
			'#704776',
			'#5b3960',
			'#9a7aa0',
			'#ffffff',
			'#ece0ef',
			'#d6c3db',
			'#f9c4ff',
			'linear-gradient(#000000c7, #000000c7), url("https://64.media.tumblr.com/c6e4deca70a7e430d8ebe7a6266c4cc1/tumblr_n6gqw4EGiW1tvub8wo1_500.png")',
			'#ffffff',
		],
		[
			'#180f1c',
			'#291b30',
			'#382640',
			'#795586',
			'#f9edfc',
			'#e5ceeb',
			'#c3a4cd',
			'#e7a8ff',
			'linear-gradient(#291b30c7, #291b30c7), url("https://64.media.tumblr.com/c6e4deca70a7e430d8ebe7a6266c4cc1/tumblr_n6gqw4EGiW1tvub8wo1_500.png")',
			'#f9edfc',
		],
	],
	Snoopy: [
		[
			'#f5f1d6',
			'#dda15e',
			'#bc6c25',
			'#283618',
			'#273517',
			'#283618',
			'#a5a5a5',
			'#dda15e',
			'#606c38',
			'#ffffff',
		],
		[
			'#1a1c10',
			'#292c19',
			'#3a3c24',
			'#74754a',
			'#f8f3d8',
			'#e0dab4',
			'#beb98f',
			'#edba7f',
			'#29331e',
			'#f8f3d8',
		],
	],
	Totoro: [
		[
			'#102623',
			'#204744',
			'#35573c',
			'#35573c',
			'#9dd0d4',
			'#fafcfb',
			'#fafcfb',
			'#72a06f',
			'#204744',
			'#9dd0d4',
		],
		[
			'#102623',
			'#19342f',
			'#25453b',
			'#52765f',
			'#dff5ed',
			'#c1ded1',
			'#9cc1aa',
			'#9dd0d4',
			'#19342f',
			'#dff5ed',
		],
	],
}
const themePaletteKeys = [
	'background-0',
	'background-1',
	'background-2',
	'borders',
	'text-0',
	'text-1',
	'text-2',
	'links',
	'sidebar',
	'sidebar-text',
]

// Crop on Unsplash's image CDN to the dashboard card's 16:9 hero, sized for
// high-density screens. The settings preview uses a smaller width.
function themePhotoURL(id, width = 1080) {
	return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${Math.round((width * 9) / 16)}&q=80`
}

for (const theme of themes) {
	const toPalette = (row) =>
		Object.fromEntries(themePaletteKeys.map((key, index) => [key, row[index]]))
	theme.modePalettes = [theme.light, theme.dark].map(toPalette)
	theme.lookupPalettes = [
		...theme.modePalettes,
		...(legacyThemePalettes[theme.title] || []).map(toPalette),
	]
	theme.preview = themePhotoURL(theme.photos[0], 480)
	// Applying a theme saves these settings; dark_preset identifies the theme.
	theme.exports = {
		disable_color_overlay: true,
		gradient_cards: false,
		card_colors: theme.card_colors,
		custom_cards: theme.photos.map((id) => themePhotoURL(id)),
		dark_preset: theme.modePalettes[1],
	}
}

function resolveThemeModePalette(preset, dark) {
	const theme = themes.find((theme) =>
		theme.lookupPalettes.some((candidate) =>
			themePaletteKeys.every(
				(key) => preset[key]?.toLowerCase() === candidate[key]?.toLowerCase(),
			),
		),
	)
	return theme ? { ...theme.modePalettes[dark ? 1 : 0] } : null
}
