import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout'
import WinMessage from '../components/WinMessage'
import puzzles from '../data/wordle'

const MAX_GUESSES = 6
const KEYBOARD_ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['ENTER','Z','X','C','V','B','N','M','⌫'],
]

function getTileState(guess, index, answer) {
  if (!guess) return 'empty'
  const letter = guess[index]
  if (!letter) return 'empty'
  if (answer[index] === letter) return 'correct'
  if (answer.includes(letter)) return 'present'
  return 'absent'
}

function getTileSize(wordLength) {
  if (wordLength <= 5) return 'w-12 h-12 sm:w-14 sm:h-14 text-xl'
  if (wordLength <= 7) return 'w-10 h-10 sm:w-12 sm:h-12 text-lg'
  return 'w-8 h-8 sm:w-10 sm:h-10 text-base'
}

function getTileClass(state, revealed, wordLength) {
  const size = getTileSize(wordLength)
  const base = `${size} flex items-center justify-center font-bold border-2 uppercase transition-all duration-300 select-none rounded-sm`
  if (!revealed) {
    if (state === 'empty') return `${base} border-gray-200 text-black`
    return `${base} border-gray-500 text-black`
  }
  switch (state) {
    case 'correct': return `${base} bg-green-600 border-green-600 text-white`
    case 'present': return `${base} bg-yellow-500 border-yellow-500 text-white`
    case 'absent':  return `${base} bg-gray-700 border-gray-700 text-white`
    default:        return `${base} border-gray-200 text-black`
  }
}

function getKeyClass(letter, guesses, answer) {
  let best = 'default'
  for (const guess of guesses) {
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === letter) {
        if (answer[i] === letter) { best = 'correct'; break }
        else if (answer.includes(letter) && best !== 'correct') best = 'present'
        else if (best === 'default') best = 'absent'
      }
    }
    if (best === 'correct') break
  }
  const base = 'h-14 px-2 sm:px-3 rounded-lg font-bold text-sm flex items-center justify-center cursor-pointer select-none transition-all min-w-[2rem] sm:min-w-[2.5rem]'
  switch (best) {
    case 'correct': return `${base} bg-green-600 text-white`
    case 'present': return `${base} bg-yellow-500 text-white`
    case 'absent':  return `${base} bg-gray-600 text-white`
    default:        return `${base} bg-gray-100 text-black hover:bg-gray-200`
  }
}

export default function WordleGame() {
  const { index } = useParams()
  const puzzle = puzzles[Number(index)]

  const [guesses, setGuesses] = useState([])
  const [current, setCurrent] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [shake, setShake] = useState(false)
  const [message, setMessage] = useState('')
  const [revealed, setRevealed] = useState([])
  const [showHint, setShowHint] = useState(false)

  if (!puzzle) {
    return (
      <Layout>
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">Puzzle not found.</p>
          <Link to="/wordle" className="mt-4 inline-block underline text-black">← Back</Link>
        </div>
      </Layout>
    )
  }

  const ANSWER = puzzle.answer
  const WORD_LENGTH = ANSWER.length

  const showMessage = (msg, duration = 2000) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), duration)
  }

  const submitGuess = useCallback(() => {
    if (current.length !== WORD_LENGTH) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      showMessage('Not enough letters')
      return
    }
    const newGuesses = [...guesses, current]
    setGuesses(newGuesses)
    setRevealed(r => [...r, false])
    setTimeout(() => {
      setRevealed(r => r.map((v, i) => i === newGuesses.length - 1 ? true : v))
    }, 50)
    if (current === ANSWER) {
      setTimeout(() => { setGameOver(true); setWon(true) }, WORD_LENGTH * 200 + 200)
    } else if (newGuesses.length >= MAX_GUESSES) {
      setTimeout(() => setGameOver(true), WORD_LENGTH * 200 + 200)
    }
    setCurrent('')
  }, [current, guesses, ANSWER])

  const handleKey = useCallback((key) => {
    if (gameOver) return
    if (key === 'ENTER') submitGuess()
    else if (key === '⌫' || key === 'BACKSPACE') setCurrent(c => c.slice(0, -1))
    else if (/^[A-Z]$/.test(key) && current.length < WORD_LENGTH) setCurrent(c => c + key)
  }, [gameOver, current, submitGuess])

  useEffect(() => {
    const onKey = (e) => handleKey(e.key.toUpperCase())
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleKey])

  const allRows = [
    ...guesses,
    ...(guesses.length < MAX_GUESSES && !gameOver ? [current] : []),
    ...Array(Math.max(0, MAX_GUESSES - guesses.length - (gameOver ? 0 : 1))).fill(''),
  ]

  return (
    <Layout>
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-1">
          <Link to="/wordle" className="text-[13px] text-gray-400 hover:text-black transition-colors">← All Wordles</Link>
        </div>
        <div className="text-center mb-6">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-1 font-semibold">Puzzle by {puzzle.creator}</p>
          <h2 className="playfair text-3xl font-bold text-black mb-2">Wordle</h2>
          <p className="text-[13px] text-gray-500">Guess the {WORD_LENGTH}-letter word in 6 tries.</p>
          <div className="text-[11px] text-gray-400 mt-2 space-x-4">
            <span className="inline-flex items-center gap-1"><span className="w-3 h-3 bg-green-600 inline-block rounded-sm"></span> Correct</span>
            <span className="inline-flex items-center gap-1"><span className="w-3 h-3 bg-yellow-500 inline-block rounded-sm"></span> Wrong spot</span>
            <span className="inline-flex items-center gap-1"><span className="w-3 h-3 bg-gray-700 inline-block rounded-sm"></span> Not in word</span>
          </div>
        </div>

        {message && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg">
            {message}
          </div>
        )}

        <div className="flex flex-col items-center gap-1.5 mb-6">
          {allRows.slice(0, MAX_GUESSES).map((guess, rowIdx) => {
            const isCurrentRow = rowIdx === guesses.length && !gameOver
            const isRevealed = revealed[rowIdx] ?? false
            return (
              <div key={rowIdx} className={`flex gap-1.5 ${isCurrentRow && shake ? 'animate-[shake_0.5s_ease]' : ''}`}>
                {Array.from({ length: WORD_LENGTH }).map((_, colIdx) => {
                  const letter = guess[colIdx] || ''
                  const state = rowIdx < guesses.length ? getTileState(guess, colIdx, ANSWER) : letter ? 'filled' : 'empty'
                  return (
                    <div
                      key={colIdx}
                      className={getTileClass(state, isRevealed && rowIdx < guesses.length, WORD_LENGTH)}
                      style={isRevealed && rowIdx < guesses.length ? { transitionDelay: `${colIdx * 200}ms` } : {}}
                    >
                      {letter}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>

        {gameOver && (
          <div className={`text-center mb-4 p-4 rounded-xl ${won ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <p className={`font-bold text-lg mb-1 ${won ? 'text-green-700' : 'text-red-700'}`}>
              {won ? '🎉 Brilliant!' : '😅 Better luck next time!'}
            </p>
            {won
              ? <p className="text-sm text-green-600">You got it in {guesses.length} {guesses.length === 1 ? 'guess' : 'guesses'}!</p>
              : <p className="text-sm text-red-600">The word was <strong>{ANSWER}</strong></p>
            }
          </div>
        )}

        {!gameOver && (
          <div className="text-center mb-4">
            <button onClick={() => setShowHint(h => !h)} className="text-xs text-gray-400 underline hover:text-gray-600 transition-colors">
              {showHint ? 'Hide hint' : 'Need a hint?'}
            </button>
            {showHint && <p className="text-sm text-gray-500 italic mt-1">{puzzle.hint}</p>}
          </div>
        )}

        <div className="flex flex-col items-center gap-1.5">
          {KEYBOARD_ROWS.map((row, i) => (
            <div key={i} className="flex gap-1">
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => handleKey(key)}
                  className={getKeyClass(key, guesses, ANSWER)}
                  style={key === 'ENTER' || key === '⌫' ? { minWidth: '3.5rem' } : {}}
                >
                  {key}
                </button>
              ))}
            </div>
          ))}
        </div>

        {won && <WinMessage creator={puzzle.creator} message={puzzle.message} />}
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </Layout>
  )
}
