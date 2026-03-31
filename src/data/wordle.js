// ─── WORDLE PUZZLES ───────────────────────────────────────────────────────────
// Each puzzle: { creator, answer, hint }
// answer must be all caps. Any length is supported.

const wordle = [
	{
		creator: "Lucy",
		answer: "KIMCHI",
		message: `happy birthday April!! Sad I can’t be there to celebrate with you but I hope you have the most amazing day and get absolutely spoilt!! ❤️❤️`,
	},
	{
		creator: "Izzy",
		answer: "JELLYCAT",
		message: `Happy Birthday April 🥳🥳 I hope you are getting everything you need overseas. Can’t wait to celebrate with you when you are back ❤️`,
	},
	{
		creator: "David",
		answer: "BLOOM",
		message: `Happy Birthday April! 🎉 Just wanted to say thanks for being such a great friend these past couple of years you've been an amazing support, and I'm so glad I have you in my corner. Hoping you're getting the rest and treatment you so deserve over in Thailand. Hope you're having the best one and catch you when you're back!! 🙌`,
	},
	{
		creator: "Kalvin",
		answer: "KASBO",
		message: `Happy birthday April!!! 🎉 Hope you have an absolutely baller day, you deserve nothing less. Thanks for always bringing the best energy and for introducing me to Sultan + Shepard and that one mashup with Lane 8 LOL`,
	},
	{
		creator: "Gabe",
		answer: "WHATTHEHELLY",
		message: `Happy birthday April you absolute legend ❤️ Sad we're not there to see you but can't wait to see you and celebrate properly when we next see you. Maybe come visit? So much love.`,
	},
	{
		creator: "Mike",
		url: "https://mywordle.strivemath.com/?word=xzrfvjnwudj",
		message: `Happy birthday April!! 🎉🍾 Thanks for taking care of everyone, planning ahead and making sure we all have a good time. Wishing you swift progress on your treatment in Thailand and hope you have the greatest 30th with the gang! See you again soon!`,
	},
	{
		creator: "Gerald",
		answer: "APRIL",
		hint: "5 letter word that reminds me of you - it is a month.",
		message: `Happy happy birthday April! It's been really inspiring to see how you've grown since we've met. Wow, I think we've spent more time together overseas than back home, so all my memories of you are my most memorable and joyous ones, which I'm forever grateful to you for. Thanks for being the caring, kind, selfless person you are and I can't wait to create more lifetime memories in Europe this year! See you very soon - Gerald`,
	},
	{
		creator: "Deepthi",
		answer: "TWOCB",
		message: `to my no1 forever yap buddy, happiest of happy birthdays!!! i can't believe ur finally 30 - feels like yesterday i was bullying u for being in the mature aged lounge at monash (u were only 23 😭). from 2019 MAC days, to long distance SHM and guessing all the countries of the world together, love u endlessly and i'm grateful to the universe for our friendship every day 🩷 i'll save the rest for ur bday card !!!`,
	},
	{
		creator: "Jord",
		answer: "CODING",
		message: `Happy 30th birthday April, how time flies!!! Wish you all the best and let's catch up soon!!!`,
	},
	{
		creator: "Viv",
		answer: "ARIES",
		message: `Happy 30th April!! Hope you have the best day in Thailand with lots of good food and Thai milk tea. Thanks for being such a good friend over the years and always love catching up with you and getting the life update. Will always have you to thank for everyone else I've met from MAC as well!! Wishing you a smooth recovery and fingers crossed we get to meet again in July. Lots of love, Viv <33`,
	},
	{
		creator: "Ary",
		answer: "BOHMER",
		message: `Happy 30th babes! There's something special about us both stepping into this decade together. Every milestone just hits different when you get to share it with the right person. Can't wait for all the ones still ahead with you ❤️`,
	},
	{
		creator: "Cindy",
		answer: "PEANUT",
		hint: "Nickname I used to call you during our Killester days 😆",
		message: `HAPPY 30TH BIRTHDAY MY LITTLE APPLE TREE 🍎 Who would've thought we'd be here together in old (lmao) age, still hanging out so many years after we first met in Killester. And how naive we were back then, remember how we wanted our siblings to get married so we could be sisters? But then there'd be no Noley 🥺 I'm so blessed to have a friend as wonderful as you in my life. Even though we live in different cities, when we get together it's as if the time we have been apart just turns into a tiny blip. Thank you for making the time to catch up, whether it's you coming down to hang with the girls or coming with me to Midnight Mafia hehehe Although we can't see each other for a little while yet, I hope you have an amazing REGENERATIVE year so that we can meet again in peak health. 💕💕`,
	},
	{
		creator: "Lisa",
		answer: "SALONPAS",
		message: `Happy birthday April!! Three decades around the sun and I'm so proud of everything you've achieved along the way. I hope you have the most amazing day and that Thailand is giving you all the healing, rest, and sunshine you deserve ❤️`,
	},
	{
		creator: "Naomi",
		answer: "HEALS",
		message: `Dear Apes, thank you so much for your friendship and kindness over the last 16 years?! I can't believe we are all 30 now :') it's ok, hopefully we don't actually look 30.... hahahaha I am so grateful to have met you and travel with you (despite nearly dying)! Hopefully we can look back at it and continue to be thankful we're alive!! I'm praying that you will rest and heal during your time in Thailand. It may be a long and tiring journey ahead, but just know we are here to support you anytime! You are not alone 🧡 Wishing you a wonderful 30th! HAPPY BIRTHDAY 😆`,
	},
	{
		creator: "Kim",
		answer: "NOLEY",
		message: `Happy 30th April!! I am always so so in awe of everything you've accomplished in your 30 years on earth - your drive, passion and ambition are such an inspiration to witness. Thank you for always being such a kind hearted and warm friend, always cheering us on and bringing us together, I am always so grateful to you. Hope you make this year as amazing as you are ❤️`,
	},
	{
		creator: "Daphne",
		answer: "HEDGEHOG",
		message: `Dearest April, happy 30th birthday!!! Thank you for your friendship for all these years and for the kindness and generosity that you always extend to others. We're so proud of all that you've achieved, but more importantly, who you are as a person- may this next chapter in Thailand be the well deserved R&R that you need 💖 love you lots and can't wait to catch up with you again soon!! Miss you 🥰`,
	},
];

export default wordle;
