// ─── WORD SEARCH PUZZLES ──────────────────────────────────────────────────────
// Each puzzle: { creator, words, grid }
// grid: 2D array of uppercase letters (12x12 recommended)
// All words in `words` must be hidden in the grid.

const wordsearch = [
	{
		creator: "Your Friends",
		message: "Happy Birthday April! 🎉", // ← CHANGE THIS
		words: [
			"APRIL",
			"BIRTHDAY",
			"CAKE",
			"FRIENDS",
			"JOY",
			"LOVE",
			"STARS",
			"WISHES",
		],
		grid: [
			["A", "P", "R", "I", "L", "X", "J", "O", "Y", "Q", "Z", "K"],
			["B", "W", "I", "S", "H", "E", "S", "C", "T", "R", "S", "A"],
			["I", "C", "A", "K", "E", "V", "N", "G", "H", "U", "T", "F"],
			["R", "O", "X", "L", "A", "P", "Q", "M", "F", "B", "A", "R"],
			["T", "L", "Z", "O", "G", "J", "F", "R", "I", "E", "N", "D"],
			["H", "O", "K", "V", "Q", "Y", "Z", "A", "S", "T", "D", "S"],
			["D", "V", "M", "E", "W", "N", "B", "P", "P", "X", "U", "W"],
			["A", "E", "X", "B", "K", "Z", "C", "R", "I", "Y", "O", "I"],
			["Y", "R", "Q", "J", "F", "T", "H", "L", "C", "A", "K", "S"],
			["Z", "S", "T", "A", "R", "S", "M", "Y", "N", "W", "O", "H"],
			["M", "W", "I", "L", "O", "V", "E", "Q", "J", "P", "B", "E"],
			["X", "K", "B", "C", "G", "U", "F", "D", "A", "Z", "R", "S"],
		],
	},
	{
		creator: "Nicci",
		message: "Happy Birthday April! 🎉",
		words: [
			"MELBOURNE",
			"THAILAND",
			"KATSEYE",
			"PINKYJI",
			"COFFEE",
			"BOHMER",
			"RAVE",
			"NOLEY",
			"SYDNEY",
			"MUMU",
		],
		grid: [
			["D", "E", "B", "O", "H", "M", "E", "R", "P", "J"],
			["P", "I", "N", "K", "Y", "J", "I", "X", "U", "M"],
			["R", "A", "V", "E", "Y", "X", "K", "P", "Q", "E"],
			["J", "T", "H", "A", "I", "L", "A", "N", "D", "L"],
			["S", "C", "A", "T", "M", "M", "Y", "W", "A", "B"],
			["Y", "N", "O", "H", "U", "O", "R", "E", "R", "O"],
			["D", "O", "H", "H", "M", "P", "C", "D", "X", "U"],
			["N", "L", "E", "K", "U", "O", "A", "D", "J", "R"],
			["E", "E", "K", "A", "T", "S", "E", "Y", "E", "N"],
			["Y", "Y", "F", "K", "C", "O", "F", "F", "E", "E"],
		],
	},
	{
		creator: "Chris & Terry",
		message:
			"Happy 30th April! I can't believe we've known each other for over 5 years now. I'll never forget the first day I met you and it made that working from home experience 10 million times better during Covid. I'm so grateful to know someone as caring and thoughtful as you - but also to work with, travel with, party with, gossip with, and always have a great time hanging out <3. Every memory we've shared has been so much fun to experience. Have a wonderful day and can't wait to catch up next!! - Terry",
		url: "https://wordsearchlabs.com/view/1512386",
	},
];

export default wordsearch;
