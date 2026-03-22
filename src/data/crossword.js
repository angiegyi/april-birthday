// ─── CROSSWORD PUZZLES ────────────────────────────────────────────────────────
// Each puzzle: { creator, answerGrid, cluesAcross, cluesDown }
// answerGrid: 5x5 array, '#' for black squares, uppercase letter for answers.
// Clues: { number, clue, row, col }

const crossword = [
  {
    creator: 'Your Friends',
    message: 'Happy Birthday April! 🎉', // ← CHANGE THIS
    answerGrid: [
      ['C', 'A', 'K', 'E', 'S'],
      ['A', '#', 'I', '#', 'U'],
      ['N', 'I', 'N', 'E', 'N'],
      ['D', '#', 'D', '#', 'N'],
      ['Y', 'E', 'A', 'R', 'Y'],
    ],
    cluesAcross: [
      { number: 1, clue: 'Birthday dessert (5)', row: 0, col: 0 },
      { number: 5, clue: 'How many lives a cat has (4)', row: 2, col: 0 },
      { number: 6, clue: '"Happy ___ to you" (4)', row: 4, col: 0 },
    ],
    cluesDown: [
      { number: 1, clue: 'Sweet treat on a stick', row: 0, col: 0 },
      { number: 2, clue: 'Birthday ___ (song)', row: 0, col: 2 },
      { number: 3, clue: 'How old? Another ___ older!', row: 0, col: 4 },
    ],
  },
  // ← Add more puzzles here
]

export default crossword
