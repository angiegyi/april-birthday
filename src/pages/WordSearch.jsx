import { useState, useCallback } from 'react'
import Layout from '../components/Layout'

// ─── PUZZLE CONTENT ──────────────────────────────────────────────────────────
// Change AUTHOR, WORDS, and optionally the GRID below.
// The GRID must contain all WORDS hidden in it (forward, backward, diagonal, etc.)
// Tip: build the grid around the words, then fill remaining cells with random letters.

const AUTHOR = 'Your Friends' // ← CHANGE THIS

const WORDS = [
  'APRIL', 'BIRTHDAY', 'CAKE', 'FRIENDS',
  'JOY', 'LOVE', 'STARS', 'WISHES',
] // ← CHANGE THESE

// 12×12 grid (must contain all WORDS above)
const GRID = [
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
] // ← CHANGE THIS GRID (ensure all WORDS are hidden inside)

// Directions: [dr, dc]
const DIRECTIONS = [
  [0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]
]

function findWord(grid, word) {
  const R = grid.length, C = grid[0].length
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      for (const [dr, dc] of DIRECTIONS) {
        let found = true
        const cells = []
        for (let i = 0; i < word.length; i++) {
          const nr = r + dr * i, nc = c + dc * i
          if (nr < 0 || nr >= R || nc < 0 || nc >= C || grid[nr][nc] !== word[i]) {
            found = false; break
          }
          cells.push(`${nr}-${nc}`)
        }
        if (found) return cells
      }
    }
  }
  return null
}

const WORD_LOCATIONS = Object.fromEntries(WORDS.map(w => [w, findWord(GRID, w)]))

const WORD_COLORS = [
  'bg-yellow-300 text-yellow-900',
  'bg-green-300 text-green-900',
  'bg-blue-300 text-blue-900',
  'bg-pink-300 text-pink-900',
  'bg-orange-300 text-orange-900',
  'bg-purple-300 text-purple-900',
  'bg-red-300 text-red-900',
  'bg-teal-300 text-teal-900',
]

export default function WordSearch() {
  const [foundWords, setFoundWords] = useState([]) // array of word strings
  const [selecting, setSelecting] = useState(false)
  const [selStart, setSelStart] = useState(null)
  const [selCurrent, setSelCurrent] = useState(null)

  const getSelectionCells = useCallback(() => {
    if (!selStart || !selCurrent) return []
    const [r1, c1] = selStart
    const [r2, c2] = selCurrent
    const dr = Math.sign(r2 - r1), dc = Math.sign(c2 - c1)
    // Allow only 8 directions
    const dLen = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1))
    const isDiag = Math.abs(r2 - r1) === Math.abs(c2 - c1)
    const isStraight = r1 === r2 || c1 === c2
    if (!isDiag && !isStraight) return []
    const cells = []
    for (let i = 0; i <= dLen; i++) {
      cells.push(`${r1 + dr * i}-${c1 + dc * i}`)
    }
    return cells
  }, [selStart, selCurrent])

  const checkSelection = useCallback((cells) => {
    const letters = cells.map(k => { const [r,c] = k.split('-').map(Number); return GRID[r][c] }).join('')
    const rev = letters.split('').reverse().join('')
    const match = WORDS.find(w => (w === letters || w === rev) && !foundWords.includes(w))
    return match || null
  }, [foundWords])

  const handleMouseDown = (r, c) => {
    setSelecting(true)
    setSelStart([r, c])
    setSelCurrent([r, c])
  }

  const handleMouseEnter = (r, c) => {
    if (selecting) setSelCurrent([r, c])
  }

  const handleMouseUp = () => {
    if (!selecting) return
    setSelecting(false)
    const cells = getSelectionCells()
    const word = checkSelection(cells)
    if (word) {
      setFoundWords(fw => [...fw, word])
    }
    setSelStart(null)
    setSelCurrent(null)
  }

  const selCells = new Set(getSelectionCells())

  // Build cell → found word color map
  const cellColorMap = {}
  foundWords.forEach((word, idx) => {
    const locs = WORD_LOCATIONS[word] || []
    locs.forEach(cell => {
      cellColorMap[cell] = WORD_COLORS[idx % WORD_COLORS.length]
    })
  })

  const allFound = WORDS.every(w => foundWords.includes(w))

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Puzzle by {AUTHOR}</p>
          <h2 className="playfair text-3xl font-bold text-black mb-2">Word Search</h2>
          <p className="text-sm text-gray-600">Find all the hidden words — click and drag to select.</p>
        </div>

        {allFound && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center mb-4">
            <p className="text-green-700 font-bold">🎉 You found all the words!</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-8 items-start justify-center">
          {/* Grid */}
          <div
            className="select-none cursor-crosshair flex-shrink-0"
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
          >
            <div className="inline-flex flex-col gap-0.5 border-2 border-black p-1 bg-white">
              {GRID.map((row, r) => (
                <div key={r} className="flex gap-0.5">
                  {row.map((letter, c) => {
                    const key = `${r}-${c}`
                    const isSel = selCells.has(key)
                    const colorClass = cellColorMap[key]
                    return (
                      <div
                        key={c}
                        className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold rounded transition-colors
                          ${isSel ? 'bg-gray-400 text-white' : colorClass || 'hover:bg-gray-100 text-black'}
                        `}
                        onMouseDown={() => handleMouseDown(r, c)}
                        onMouseEnter={() => handleMouseEnter(r, c)}
                      >
                        {letter}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Word list */}
          <div className="flex-shrink-0">
            <p className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-3 border-b pb-1">Words to Find</p>
            <ul className="space-y-2">
              {WORDS.map((word, idx) => {
                const done = foundWords.includes(word)
                return (
                  <li key={word} className="flex items-center gap-2">
                    {done ? (
                      <span className={`px-2 py-0.5 rounded text-sm font-semibold line-through ${WORD_COLORS[idx % WORD_COLORS.length]}`}>
                        {word}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-sm font-semibold text-gray-700">{word}</span>
                    )}
                    {done && <span className="text-green-500 text-xs">✓</span>}
                  </li>
                )
              })}
            </ul>
            <p className="mt-4 text-xs text-gray-400">
              {foundWords.length}/{WORDS.length} found
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
