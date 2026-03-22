// ─── WORD SEARCH PUZZLES ──────────────────────────────────────────────────────
// Each puzzle: { creator, words, grid }
// grid: 2D array of uppercase letters (12x12 recommended)
// All words in `words` must be hidden in the grid.

const wordsearch = [
  {
    creator: 'Your Friends',
    message: 'Happy Birthday April! 🎉', // ← CHANGE THIS
    words: ['APRIL', 'BIRTHDAY', 'CAKE', 'FRIENDS', 'JOY', 'LOVE', 'STARS', 'WISHES'],
    grid: [
      ['A','P','R','I','L','X','J','O','Y','Q','Z','K'],
      ['B','W','I','S','H','E','S','C','T','R','S','A'],
      ['I','C','A','K','E','V','N','G','H','U','T','F'],
      ['R','O','X','L','A','P','Q','M','F','B','A','R'],
      ['T','L','Z','O','G','J','F','R','I','E','N','D'],
      ['H','O','K','V','Q','Y','Z','A','S','T','D','S'],
      ['D','V','M','E','W','N','B','P','P','X','U','W'],
      ['A','E','X','B','K','Z','C','R','I','Y','O','I'],
      ['Y','R','Q','J','F','T','H','L','C','A','K','S'],
      ['Z','S','T','A','R','S','M','Y','N','W','O','H'],
      ['M','W','I','L','O','V','E','Q','J','P','B','E'],
      ['X','K','B','C','G','U','F','D','A','Z','R','S'],
    ],
  },
  // ← Add more puzzles here
]

export default wordsearch
