import { useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout'
import WinMessage from '../components/WinMessage'
import puzzles from '../data/wordsearch'

const DIRECTIONS = [[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]]
const WORD_COLORS = [
  'bg-yellow-300 text-yellow-900','bg-green-300 text-green-900','bg-blue-300 text-blue-900',
  'bg-pink-300 text-pink-900','bg-orange-300 text-orange-900','bg-purple-300 text-purple-900',
  'bg-red-300 text-red-900','bg-teal-300 text-teal-900',
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
          if (nr < 0 || nr >= R || nc < 0 || nc >= C || grid[nr][nc] !== word[i]) { found = false; break }
          cells.push(`${nr}-${nc}`)
        }
        if (found) return cells
      }
    }
  }
  return null
}

export default function WordSearchGame() {
  const { index } = useParams()
  const puzzle = puzzles[Number(index)]

  const [foundWords, setFoundWords] = useState([])
  const [selecting, setSelecting] = useState(false)
  const [selStart, setSelStart] = useState(null)
  const [selCurrent, setSelCurrent] = useState(null)

  if (!puzzle) {
    return (
      <Layout>
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">Puzzle not found.</p>
          <Link to="/word-search" className="mt-4 inline-block underline text-black">← Back</Link>
        </div>
      </Layout>
    )
  }

  const { grid, creator } = puzzle
  // Support both plain strings and {word, clue} objects
  const hasClues = typeof puzzle.words[0] === 'object'
  const wordStrings = hasClues ? puzzle.words.map(w => w.word) : puzzle.words
  const clues = hasClues ? puzzle.words.map(w => w.clue) : null

  const cols = grid[0]?.length || 0
  const isLarge = cols > 16
  const cellClass = isLarge
    ? 'w-5 h-5 text-[10px]'
    : cols > 12
      ? 'w-6 h-6 sm:w-7 sm:h-7 text-[11px] sm:text-xs'
      : 'w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm'
  const WORD_LOCATIONS = Object.fromEntries(wordStrings.map(w => [w, findWord(grid, w)]))

  const getSelectionCells = useCallback(() => {
    if (!selStart || !selCurrent) return []
    const [r1, c1] = selStart, [r2, c2] = selCurrent
    const dr = Math.sign(r2 - r1), dc = Math.sign(c2 - c1)
    const dLen = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1))
    const isDiag = Math.abs(r2 - r1) === Math.abs(c2 - c1)
    const isStraight = r1 === r2 || c1 === c2
    if (!isDiag && !isStraight) return []
    const cells = []
    for (let i = 0; i <= dLen; i++) cells.push(`${r1 + dr * i}-${c1 + dc * i}`)
    return cells
  }, [selStart, selCurrent])

  const checkSelection = useCallback((cells) => {
    const letters = cells.map(k => { const [r,c] = k.split('-').map(Number); return grid[r][c] }).join('')
    const rev = letters.split('').reverse().join('')
    return wordStrings.find(w => (w === letters || w === rev) && !foundWords.includes(w)) || null
  }, [foundWords, grid, wordStrings])

  const handleMouseDown = (r, c) => { setSelecting(true); setSelStart([r, c]); setSelCurrent([r, c]) }
  const handleMouseEnter = (r, c) => { if (selecting) setSelCurrent([r, c]) }
  const handleMouseUp = () => {
    if (!selecting) return
    setSelecting(false)
    const cells = getSelectionCells()
    const word = checkSelection(cells)
    if (word) setFoundWords(fw => [...fw, word])
    setSelStart(null); setSelCurrent(null)
  }

  const selCells = new Set(getSelectionCells())
  const cellColorMap = {}
  foundWords.forEach((word, idx) => {
    (WORD_LOCATIONS[word] || []).forEach(cell => { cellColorMap[cell] = WORD_COLORS[idx % WORD_COLORS.length] })
  })

  const allFound = wordStrings.every(w => foundWords.includes(w))

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-1">
          <Link to="/word-search" className="text-[13px] text-gray-400 hover:text-black transition-colors">← All Word Searches</Link>
        </div>
        <div className="text-center mb-6">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-1 font-semibold">Puzzle by {creator}</p>
          <h2 className="playfair text-3xl font-bold text-black mb-2">Word Search</h2>
          <p className="text-[13px] text-gray-500">
            {clues
              ? 'Use the clues to figure out each word, then find it in the grid!'
              : 'Find all the hidden words — click and drag to select.'}
          </p>
        </div>

        {allFound && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center mb-4">
            <p className="text-green-700 font-bold">🎉 You found all the words!</p>
          </div>
        )}

        <div className={`flex flex-col ${isLarge ? '' : 'sm:flex-row'} gap-8 items-start justify-center`}>
          <div className="select-none cursor-crosshair flex-shrink-0" onMouseLeave={handleMouseUp} onMouseUp={handleMouseUp}>
            <div className="inline-flex flex-col gap-0.5 border border-gray-200 p-1.5 bg-white rounded-xl shadow-sm">
              {grid.map((row, r) => (
                <div key={r} className="flex gap-0.5">
                  {row.map((letter, c) => {
                    const key = `${r}-${c}`
                    const isSel = selCells.has(key)
                    const colorClass = cellColorMap[key]
                    return (
                      <div
                        key={c}
                        className={`${cellClass} flex items-center justify-center font-bold rounded-sm transition-colors
                          ${isSel ? 'bg-gray-400 text-white' : colorClass || 'hover:bg-gray-100 text-black'}`}
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

          <div className="flex-shrink-0">
            <p className="font-bold text-[11px] uppercase tracking-wider text-gray-400 mb-3 border-b border-gray-200 pb-1">
              {clues ? 'Clues' : 'Words to Find'}
            </p>
            <ul className="space-y-2">
              {wordStrings.map((word, idx) => {
                const done = foundWords.includes(word)
                return (
                  <li key={word} className="flex items-start gap-2">
                    {clues ? (
                      <>
                        <span className="text-gray-400 text-sm font-semibold w-5 shrink-0">{idx + 1}.</span>
                        <div>
                          <p className={`text-sm leading-snug ${done ? 'text-gray-400' : 'text-gray-700'}`}>{clues[idx]}</p>
                          {done && <span className={`inline-block mt-1 px-2 py-0.5 rounded-md text-xs font-bold ${WORD_COLORS[idx % WORD_COLORS.length]}`}>{word} ✓</span>}
                        </div>
                      </>
                    ) : (
                      <>
                        {done
                          ? <span className={`px-2 py-0.5 rounded-md text-sm font-semibold line-through ${WORD_COLORS[idx % WORD_COLORS.length]}`}>{word}</span>
                          : <span className="px-2 py-0.5 text-sm font-semibold text-gray-700">{word}</span>
                        }
                        {done && <span className="text-green-500 text-xs">✓</span>}
                      </>
                    )}
                  </li>
                )
              })}
            </ul>
            <p className="mt-4 text-[11px] text-gray-400">{foundWords.length}/{wordStrings.length} found</p>
          </div>
        </div>

        {allFound && <WinMessage creator={creator} message={puzzle.message} />}
      </div>
    </Layout>
  )
}
