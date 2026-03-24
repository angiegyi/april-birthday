// ─── CONNECTIONS PUZZLES ──────────────────────────────────────────────────────
// To add a new puzzle, add an object to this array.
// Each puzzle: { creator, groups: [{ label, color, words }] }
// Colors: 'yellow' (easiest) | 'green' | 'blue' | 'purple' (hardest)
// Each group needs exactly 4 words (all caps).

const connections = [
	{
		creator: "Angie",
		message: "Happy Birthday Apes my older sister! ",
		groups: [
			{
				label: "April's Dream Lineup",
				color: "blue",
				words: ["SEVEN LIONS", "SAN HOLO", "LANE 8", "BEN BÖHMER"],
			},
			{
				label: "Artists to See Together",
				color: "green",
				words: ["KASBO", "SHALLOU", "MITIS", "JAI WOLF"],
			},
			{
				label: "April's Ride or Dies",
				color: "yellow",
				words: ["MACY", "BOJACK", "KETAMINE", "NOLEY"],
			},
			{
				label: "April's Ops",
				color: "purple",
				words: ["NIR", "PEOPLE F***ING", "SUDHIR", "PAULINE"],
			},
		],
	},
	{
		creator: "Fei",
		message:
			"happy birthday april!! here's a fun list of things to do for unemployment HAHA enjoy your time off to rest, heal and more importantly still try to have fun!! i'm cheering you on and hope that this turning point will bring you a lot more joy in the future 💗 know that you are well loved and we're all here for you whenever you need",
		groups: [
			{
				label: "Things to Finally Declutter",
				color: "blue",
				words: ["CAMERA ROLL", "DOWNLOADS FOLDER", "TEXTS", "EMAILS"],
			},
			{
				label: "Things to Finally Organise",
				color: "green",
				words: [
					"MAPS SAVED PLACES",
					"SPOTIFY PLAYLISTS",
					"SAVED TIKTOKS",
					"NOTES APP",
				],
			},
			{
				label: "Games to Keep the Brain Cells Alive (barely)",
				color: "yellow",
				words: ["WORDLE", "CONNECTIONS", "WIKI GAME", "CRYPTIC CROSSWORD"],
			},
			{
				label: "Brain Rot Content Rabbit Holes",
				color: "purple",
				words: ["JUBILEE VIDEOS", "IG REELS", "HIKING STREAMS", "SETS"],
			},
		],
	},
	{
		creator: "Eric",
		message:
			"Happiest of birthdays slaypril!!!! Wish I was there in Thailand celebrating with you, but it's okay we can have a big party once you're back. Hope you get all the rest and recovery you need so you can also rampage Thailand 🙌",
		groups: [
			{
				label: "Things that gave us trauma",
				color: "blue",
				words: ["JLOVE", "SAPPORO SNOW FESTIVAL", "COD CUM", "HOSTEL"],
			},
			{
				label: "Best things I've eaten with April",
				color: "green",
				words: [
					"POLE TOWN FRUIT JUICE",
					"SAPPORO BLACK BEER",
					"DAIFUKU",
					"NISEKO EGG TARTS",
				],
			},
			{
				label: "Things that remind me of April",
				color: "yellow",
				words: ["HILARIOUS", "RIP BACK", "SELFLESS", "NOT THAT DEEP"],
			},
			{
				label: "Things April dropped in Japan",
				color: "purple",
				words: ["PHONE", "FACE MASK", "TISSUE", "CICAPLAST"],
			},
		],
	},
	{
		creator: "Reya",
		message:
			"Happiest of birthdays slaypril!!!! Wish I was there in Thailand celebrating with you, but it's okay we can have a big party once you're back. Hope you get all the rest and recovery you need so you can also rampage Thailand 🙌",
		groups: [
			{
				label: "Girlypops",
				color: "blue",
				words: ["Tate", "Madison", "Addison", "ARY"],
			},
			{
				label: "Soul",
				color: "green",
				words: ["Piano", "Cat", "Blob", "Dead"],
			},
			{
				label: "YorkSt",
				color: "yellow",
				words: ["Quiz", "ADHD", "Yap", "Mother"],
			},
			{
				label: "Piano",
				color: "purple",
				words: ["Panda", "Fingers", "Angie", "Golden"],
			},
		],
	},
	{
		creator: "Deepthi",
		message:
			"Happiest of birthdays slaypril!!!! Wish I was there in Thailand celebrating with you, but it's okay we can have a big party once you're back. Hope you get all the rest and recovery you need so you can also rampage Thailand 🙌",
		groups: [
			{
				label: "Swedish House Mafia + Friends",
				color: "yellow",
				words: ["Armin Van Burren", "Alesso", "Hardwell", "Afrojack"],
			},
			{
				label: "Tomorrowland 2024",
				color: "green",
				words: [
					"David Guetta",
					"Horsed Up Sub Zero",
					"I Follow Rivers",
					"Lost Mary",
				],
			},
			{
				label: "Iconic Memories",
				color: "blue",
				words: [
					"IT Ball 2019",
					"Panadol Gate",
					"Prince Bandroom",
					"Sydney Park Trip",
				],
			},
			{
				label: "Our Favourites",
				color: "purple",
				words: ["Gary De Snake", "No Doz Tim", "Oscar Piastri", "Pepe"],
			},
		],
	},
	{
		creator: "Chloe",
		message:
			"Happiest of birthdays to you April! From the big green dot to the big 30. So grateful to have been on this wild ride with you and to have kept in touch all these years later. Can't wait for more exciting adventures together, see you in BOOM BICH! Miss you, love you – Chloe.",
		groups: [
			{
				label: '"The Big D" — Deloitte Digital intern era',
				color: "yellow",
				words: ["GREEN DOT", "SLATE", "FATHER'S OFFICE", "VACATIONER"],
			},
			{
				label: '"Also April" — Things that share her name',
				color: "green",
				words: ["LAVIGNE", "FOOLS", "LUDGATE", "SHOWERS"],
			},
			{
				label: '"You Had To Be There" — Festivals she\'s attended',
				color: "blue",
				words: ["BOOM", "KINETIC FIELD", "POLO FIELDS", "HARDEST STYLES"],
			},
			{
				label: '"This Never Happened" — Lane 8 deep cuts',
				color: "purple",
				words: ["CHILDISH", "ANJUNADEEP", "NO PHONES", "BRIGHTEST LIGHTS"],
			},
		],
	},
];

export default connections;
