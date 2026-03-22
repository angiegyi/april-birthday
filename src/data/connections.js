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
	// ← Add more puzzles here, e.g.:
	// {
	//   creator: 'Sarah',
	//   groups: [
	//     { label: '...', color: 'yellow', words: ['WORD1', 'WORD2', 'WORD3', 'WORD4'] },
	//     { label: '...', color: 'green',  words: ['WORD5', 'WORD6', 'WORD7', 'WORD8'] },
	//     { label: '...', color: 'blue',   words: ['WORD9', 'WORD10', 'WORD11', 'WORD12'] },
	//     { label: '...', color: 'purple', words: ['WORD13', 'WORD14', 'WORD15', 'WORD16'] },
	//   ],
	// },
];

export default connections;
