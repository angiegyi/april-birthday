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
];

export default connections;
