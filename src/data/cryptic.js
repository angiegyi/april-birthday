// ─── CRYPTIC CLUE PUZZLES ─────────────────────────────────────────────────────
// Each puzzle: { creator, clue, answer, length, explanation, bonusClues? }

const cryptic = [
	{
		creator: "Shiv",
		message:
			"Happy Birthday April! Thank you for showing everyone how to be the most supportive, kind and thoughtful friend every day. I’m so excited for this year to be such a turning point for you in your healing journey, your career, your personal life, and more. You’re the best unemployment buddy and I’ve loved our hours long yaps and getting to know you better. Here’s to many more years of raves, trips, trivia, minute cryptics and hangs ❤ love you lots, shiv",
		clue: "Rolls: bags endlessly holding energy and love (6)",
		answer: "BAGELS",
		length: 6,
		explanation:
			"BAG (bags endlessly = BAGS without its last letter) holding E (energy) + L (love) + S = BAGELS — and bagels are rolls!",
	},
	{
		creator: "Nelson",
		message:
			"HAPPPY BIRTHDAYYY APRIL ❤️!! So grateful and happy to be your friend in the past year and be part of your life! So excited to skank out with you at more gigs this year! (and have you play at my next rave 😉) Hope you have an amazing BDAY! Here is to another year of drinking GUINESS, buying festival tickets, watching gigs and living LIFE!!",
		clue: "Sent me to space at your party : I MAKE TEN MIXED (8)",
		answer: "KETAMINE",
		length: 8,
		explanation: "horse time",
	},
	{
		creator: "Marcus",
		message: "",
		isMultiPart: true,
		parts: [
			{
				clue: "Great explorers observe first, then plot. Why study old maps? (9)",
				answer: "GEOGRAPHY",
				length: 9,
				explanation: "Great explorers = definition; observe first (O) + then plot (anagram of 'then plot' minus 'then' = GEOGRAPHY)",
			},
			{
				clue: "Face card? A buried antique, been beheaded. (5)",
				answer: "QUEEN",
				length: 5,
				explanation: "Face card = definition; antique beheaded (ANTIQUEEN without first letter) = QUEEN",
			},
		],
		megaAnswer: "GEOGRAPHY QUEEN",
	},
	{
		creator: "Deepthi",
		message:
			"to my no1 forever yap buddy, happiest of happy birthdays!!! i can't believe ur finally 30 - feels like yesterday i was bullying u for being in the mature aged lounge at monash (u were only 23 😭). from 2019 MAC days, to long distance SHM and guessing all the countries of the world together, love u endlessly and i'm grateful to the universe for our friendship every day 🩷 i'll save the rest for ur bday card !!!",
		clue: `Crazy team's spirit comes first - swedish house mafia (9)`,
		answer: "SOULMATES",
		length: 9,
	},
];

export default cryptic;
