import { useState, useRef } from 'react'
import Layout from '../components/Layout'

// ─── PUZZLE CONTENT ──────────────────────────────────────────────────────────
// A 5x5 crossword. Use '#' for black squares, a letter for the answer.
// Change AUTHOR, GRID, CLUES_ACROSS, CLUES_DOWN below.

const AUTHOR = 'Your Friends' // ← CHANGE THIS

//   Col:  0    1    2    3    4
const ANSWER_GRID = [
  //Row 0:
  ['C', 'A', 'K', 'E', 'S'], // ← CHANGE THESE
  //Row 1:
  ['A', '#', 'I', '#', 'U'],
  //Row 2:
  ['N', 'I', 'N', 'E', 'N'],
  //Row 3:
  ['D', '#', 'D', '#', 'N'],
  //Row 4:
  ['Y', 'E', 'A', 'R', 'Y'],
]

const CLUES_ACROSS = [
  { number: 1, clue: 'Birthday dessert (5)', row: 0, col: 0 }, // ← CHANGE
  { number: 5, clue: 'Number of fingers on a hand × 2 minus one (4)', row: 2, col: 0 }, // ← CHANGE
  { number: 6, clue: '"___ lived happily ever after"', row: 4, col: 0 }, // ← CHANGE
]

const CLUES_DOWN = [
  { number: 1, clue: 'Sweet treat on a stick', row: 0, col: 0 }, // ← CHANGE
  { number: 2, clue: 'Birthday ___ (song)', row: 0, col: 2 }, // ← CHANGE
  { number: 3, clue: 'How old? Another ___ older!', row: 0, col: 4 }, // ← CHANGE
]
// ─────────────────────────────────────────────────────────────────────────────

const ROWS = 5
const COLS = 5

function buildNumberGrid(grid) {
  let num = 1
  const numbers = Array.from({ length: ROWS }, () => Array(COLS).fill(null))
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === '#') continue
      const startsAcross = (c === 0 || grid[r][c - 1] === '#') && c + 1 < COLS && grid[r][c + 1] !== '#'
      const startsDown = (r === 0 || grid[r - 1][c] === '#') && r + 1 < ROWS && grid[r + 1][c] !== '#'
      if (startsAcross || startsDown) {
        numbers[r][c] = num++
      }
    }
  }
  return numbers
}

const NUMBER_GRID = buildNumberGrid(ANSWER_GRID)

export default function Crossword() {
  const [userGrid, setUserGrid] = useState(
    Array.from({ length: ROWS }, () => Array(COLS).fill(''))
  )
  const [selected, setSelected] = useState(null) // { r, c }
  const [direction, setDirection] = useState('across') // 'across' | 'down'
  const [revealed, setRevealed] = useState(false)
  const [checked, setChecked] = useState(false)
  const inputRefs = useRef({})

  const isBlack = (r, c) => ANSWER_GRID[r][c] === '#'

  const setCell = (r, c, val) => {
    setUserGrid(g => {
      const next = g.map(row => [...row])
      next[r][c] = val.toUpperCase().slice(-1)
      return next
    })
  }

  const handleCellClick = (r, c) => {
    if (isBlack(r, c)) return
    if (selected?.r === r && selected?.c === c) {
      setDirection(d => d === 'across' ? 'down' : 'across')
    } else {
      setSelected({ r, c })
    }
    inputRefs.current[`${r}-${c}`]?.focus()
  }

  const handleKeyDown = (e, r, c) => {
    if (e.key === 'Backspace') {
      if (userGrid[r][c]) {
        setCell(r, c, '')
      } else {
        // Move back
        const [dr, dc] = direction === 'across' ? [0, -1] : [-1, 0]
        const nr = r + dr, nc = c + dc
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !isBlack(nr, nc)) {
          setSelected({ r: nr, c: nc })
          inputRefs.current[`${nr}-${nc}`]?.focus()
        }
      }
    } else if (e.key === 'ArrowRight') {
      setDirection('across')
      moveTo(r, c + 1)
    } else if (e.key === 'ArrowLeft') {
      setDirection('across')
      moveTo(r, c - 1)
    } else if (e.key === 'ArrowDown') {
      setDirection('down')
      moveTo(r + 1, c)
    } else if (e.key === 'ArrowUp') {
      setDirection('down')
      moveTo(r - 1, c)
    } else if (/^[a-zA-Z]$/.test(e.key)) {
      setCell(r, c, e.key)
      // Advance
      const [dr, dc] = direction === 'across' ? [0, 1] : [1, 0]
      let nr = r + dr, nc = c + dc
      while (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && isBlack(nr, nc)) {
        nr += dr; nc += dc
      }
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
        setSelected({ r: nr, c: nc })
        inputRefs.current[`${nr}-${nc}`]?.focus()
      }
    }
    e.preventDefault()
  }

  const moveTo = (r, c) => {
    if (r >= 0 && r < ROWS && c >= 0 && c < COLS && !isBlack(r, c)) {
      setSelected({ r, c })
      inputRefs.current[`${r}-${c}`]?.focus()
    }
  }

  const isInSelectedWord = (r, c) => {
    if (!selected || isBlack(r, c)) return false
    if (direction === 'across') return r === selected.r
    return c === selected.c
  }

  const checkGrid = () => setChecked(true)
  const revealGrid = () => setRevealed(true)

  const isCorrect = (r, c) => userGrid[r][c] === ANSWER_GRID[r][c]
  const isWon = !revealed && ANSWER_GRID.every((row, r) =>
    row.every((cell, c) => cell === '#' || userGrid[r][c] === cell)
  )

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Puzzle by {AUTHOR}</p>
          <h2 className="playfair text-3xl font-bold text-black mb-2">Mini Crossword</h2>
          <p className="text-sm text-gray-600">Click a square and start typing. Click again to switch direction.</p>
        </div>

        {isWon && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center mb-4">
            <p className="text-green-700 font-bold">🎉 Well done! Puzzle complete!</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-8 items-start justify-center">
          {/* Grid */}
          <div className="flex-shrink-0">
            <div className="inline-grid gap-px bg-black p-px border-2 border-black" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
              {ANSWER_GRID.map((row, r) =>
                row.map((cell, c) => {
                  const num = NUMBER_GRID[r][c]
                  const black = isBlack(r, c)
                  const isSel = selected?.r === r && selected?.c === c
                  const inWord = isInSelectedWord(r, c)
                  const wrong = checked && !revealed && !black && !isCorrect(r, c) && userGrid[r][c]

                  return (
                    <div
                      key={`${r}-${c}`}
                      className={`relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center cursor-pointer
                        ${black ? 'bg-black' : isSel ? 'bg-yellow-200' : inWord ? 'bg-blue-100' : 'bg-white'}
                      `}
                      onClick={() => handleCellClick(r, c)}
                    >
                      {!black && num && (
                        <span className="absolute top-0.5 left-0.5 text-[9px] font-bold text-black leading-none">{num}</span>
                      )}
                      {!black && (
                        <>
                          <input
                            ref={el => inputRefs.current[`${r}-${c}`] = el}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onKeyDown={(e) => handleKeyDown(e, r, c)}
                            onFocus={() => setSelected({ r, c })}
                            readOnly
                          />
                          <span className={`text-lg font-bold uppercase select-none
                            ${revealed ? 'text-gray-400' : wrong ? 'text-red-500' : 'text-black'}
                          `}>
                            {revealed ? ANSWER_GRID[r][c] : userGrid[r][c]}
                          </span>
                        </>
                      )}
                    </div>
                  )
                })
              )}
            </div>

            <div className="flex gap-2 mt-3 justify-center">
              <button onClick={checkGrid} className="px-4 py-2 text-sm border border-gray-400 rounded-full hover:bg-gray-100 font-semibold">
                Check
              </button>
              <button onClick={revealGrid} className="px-4 py-2 text-sm border border-gray-400 rounded-full hover:bg-gray-100 font-semibold">
                Reveal
              </button>
              <button
                onClick={() => { setUserGrid(Array.from({ length: ROWS }, () => Array(COLS).fill(''))); setChecked(false); setRevealed(false) }}
                className="px-4 py-2 text-sm border border-gray-400 rounded-full hover:bg-gray-100 font-semibold"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Clues */}
          <div className="flex-1 min-w-0 text-sm space-y-5">
            <div>
              <p className="font-bold uppercase tracking-wider text-xs text-gray-500 mb-2 border-b pb-1">Across</p>
              {CLUES_ACROSS.map(({ number, clue }) => (
                <p key={number} className="mb-1.5">
                  <span className="font-bold">{number}.</span> {clue}
                </p>
              ))}
            </div>
            <div>
              <p className="font-bold uppercase tracking-wider text-xs text-gray-500 mb-2 border-b pb-1">Down</p>
              {CLUES_DOWN.map(({ number, clue }) => (
                <p key={number} className="mb-1.5">
                  <span className="font-bold">{number}.</span> {clue}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
