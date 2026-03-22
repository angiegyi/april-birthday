import { useState } from 'react'
import Layout from '../components/Layout'

// ─── PUZZLE CONTENT ──────────────────────────────────────────────────────────
// A cryptic crossword-style clue puzzle.
// Change AUTHOR, CLUE, ANSWER, ANSWER_LENGTH, and EXPLANATION.

const AUTHOR = 'Your Friends' // ← CHANGE THIS

const CLUE = 'Celebration for the one they call "The Life of the Party" (8)' // ← CHANGE THIS
const ANSWER = 'BIRTHDAY' // ← CHANGE THIS (all caps, no spaces)
const ANSWER_LENGTH = 8   // ← CHANGE THIS (must match ANSWER.length)
const EXPLANATION =
  'BIRTH (the arrival) + DAY (a celebration) = BIRTHDAY — the most important day of the year for April!' // ← CHANGE THIS

// Optional: add extra clues for a set of cryptic clues
// Leave this array empty to show just one clue
const BONUS_CLUES = [
  {
    clue: 'Month that sounds like a shower (5)',          // ← CHANGE OR REMOVE
    answer: 'APRIL',                                      // ← CHANGE OR REMOVE
    length: 5,
    explanation: 'APRIL sounds like "a pril" — and April showers bring May flowers!', // ← CHANGE OR REMOVE
  },
] // ← Set to [] to remove bonus clues
// ─────────────────────────────────────────────────────────────────────────────

function ClueCard({ clue, answer, length, explanation }) {
  const [input, setInput] = useState(Array(length).fill(''))
  const [revealed, setRevealed] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [correct, setCorrect] = useState(null)

  const userAnswer = input.join('')

  const handleChange = (i, val) => {
    const next = [...input]
    next[i] = val.toUpperCase().replace(/[^A-Z]/g, '').slice(-1)
    setInput(next)
    // Auto-advance
    if (val && i < length - 1) {
      document.getElementById(`cryptic-${answer}-${i + 1}`)?.focus()
    }
  }

  const handleKeyDown = (e, i) => {
    if (e.key === 'Backspace' && !input[i] && i > 0) {
      document.getElementById(`cryptic-${answer}-${i - 1}`)?.focus()
    }
  }

  const submit = () => {
    setSubmitted(true)
    setCorrect(userAnswer === answer)
  }

  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-gray-50 mb-6">
      {/* Clue */}
      <div className="mb-5">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">The Clue</p>
        <p className="playfair text-xl italic text-black leading-snug">"{clue}"</p>
      </div>

      {/* Letter boxes */}
      <div className="mb-4">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Your Answer ({length} letters)</p>
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length }).map((_, i) => (
            <input
              key={i}
              id={`cryptic-${answer}-${i}`}
              maxLength={1}
              value={input[i]}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(e, i)}
              className={`w-10 h-12 text-center text-lg font-bold uppercase border-b-2 bg-white rounded-sm outline-none
                ${submitted && !revealed
                  ? correct ? 'border-green-500 text-green-700' : 'border-red-400 text-red-600'
                  : revealed ? 'border-gray-300 text-gray-400' : 'border-black text-black focus:border-blue-500'
                }
              `}
              readOnly={revealed}
            />
          ))}
        </div>
      </div>

      {/* Feedback */}
      {submitted && !revealed && (
        <div className={`mb-4 p-3 rounded-lg text-sm font-semibold ${correct ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {correct ? '🎉 Correct! Brilliantly solved!' : '❌ Not quite — try again or reveal the answer!'}
        </div>
      )}

      {/* Revealed explanation */}
      {revealed && (
        <div className="mb-4 p-4 bg-white border border-gray-200 rounded-lg">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Answer & Explanation</p>
          <p className="font-bold text-lg text-black mb-2">{answer}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{explanation}</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-2 flex-wrap">
        {!revealed && !correct && (
          <button
            onClick={submit}
            disabled={userAnswer.length < length}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors
              ${userAnswer.length === length
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
          >
            Submit
          </button>
        )}
        {!revealed && (
          <button
            onClick={() => { setRevealed(true); setInput(answer.split('')) }}
            className="px-5 py-2 rounded-full text-sm font-semibold border border-gray-400 hover:bg-gray-100"
          >
            Reveal Answer
          </button>
        )}
      </div>
    </div>
  )
}

export default function CrypticClue() {
  return (
    <Layout>
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Puzzle by {AUTHOR}</p>
          <h2 className="playfair text-3xl font-bold text-black mb-2">Cryptic Clue</h2>
          <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
            Cryptic clues have a definition hiding in plain sight, plus a wordplay twist.
            The number in brackets is the answer length.
          </p>
        </div>

        {/* Tips */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-sm text-amber-800">
          <p className="font-semibold mb-1">💡 Cryptic tips:</p>
          <ul className="list-disc list-inside space-y-1 text-xs leading-relaxed">
            <li>The clue contains a literal definition (usually at the start or end)</li>
            <li>The rest is wordplay: anagrams, hidden words, reversals, sounds-like…</li>
            <li>Words like "mixed", "confused", "chaotic" often signal an anagram</li>
            <li>The number in brackets tells you how many letters</li>
          </ul>
        </div>

        {/* Main clue */}
        <ClueCard
          clue={CLUE}
          answer={ANSWER}
          length={ANSWER_LENGTH}
          explanation={EXPLANATION}
        />

        {/* Bonus clues */}
        {BONUS_CLUES.length > 0 && (
          <>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 text-center">Bonus Clues</p>
            {BONUS_CLUES.map((bc) => (
              <ClueCard
                key={bc.answer}
                clue={bc.clue}
                answer={bc.answer}
                length={bc.length}
                explanation={bc.explanation}
              />
            ))}
          </>
        )}
      </div>
    </Layout>
  )
}
