import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout'
import WinMessage from '../components/WinMessage'
import puzzles from '../data/cryptic'

function ClueCard({ clue, answer, length, explanation, onSolved }) {
  const [input, setInput] = useState(Array(length).fill(''))
  const [revealed, setRevealed] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [correct, setCorrect] = useState(null)

  const userAnswer = input.join('')

  const handleChange = (i, val) => {
    const next = [...input]
    next[i] = val.toUpperCase().replace(/[^A-Z]/g, '').slice(-1)
    setInput(next)
    if (val && i < length - 1) document.getElementById(`cryptic-${answer}-${i + 1}`)?.focus()
  }

  const handleKeyDown = (e, i) => {
    if (e.key === 'Backspace' && !input[i] && i > 0) document.getElementById(`cryptic-${answer}-${i - 1}`)?.focus()
  }

  const submit = () => {
    const isCorrect = userAnswer === answer
    setSubmitted(true)
    setCorrect(isCorrect)
    if (isCorrect) onSolved?.()
  }

  return (
    <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm mb-6">
      <div className="mb-5">
        <p className="font-ui text-xs uppercase tracking-[0.2em] text-gray-400 mb-1 font-medium">The Clue</p>
        <p className="text-xl italic text-black leading-snug">"{clue}"</p>
      </div>
      <div className="mb-4">
        <p className="font-ui text-xs uppercase tracking-[0.2em] text-gray-400 mb-2 font-medium">Your Answer ({length} letters)</p>
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length }).map((_, i) => (
            <input
              key={i}
              id={`cryptic-${answer}-${i}`}
              maxLength={1}
              value={input[i]}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(e, i)}
              className={`font-grid w-10 h-12 text-center text-lg font-bold uppercase border-b-2 bg-white rounded-sm outline-none transition-colors
                ${submitted && !revealed
                  ? correct ? 'border-green-500 text-green-700' : 'border-red-400 text-red-600'
                  : revealed ? 'border-gray-300 text-gray-400' : 'border-black text-black focus:border-blue-500'
                }`}
              readOnly={revealed}
            />
          ))}
        </div>
      </div>
      {submitted && !revealed && (
        <div className={`mb-4 p-3 rounded-xl text-sm font-semibold ${correct ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {correct ? '🎉 Correct! Brilliantly solved!' : '❌ Not quite — try again or reveal the answer!'}
        </div>
      )}
      {revealed && (
        <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <p className="font-ui text-xs uppercase tracking-[0.2em] text-gray-400 mb-1 font-medium">Answer & Explanation</p>
          <p className="font-bold text-lg text-black mb-2">{answer}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{explanation}</p>
        </div>
      )}
      <div className="flex gap-2 flex-wrap">
        {!revealed && !correct && (
          <button
            onClick={submit}
            disabled={userAnswer.length < length}
            className={`font-ui px-5 py-2 rounded-full text-sm font-semibold transition-all
              ${userAnswer.length === length ? 'bg-black text-white hover:bg-gray-800 btn-primary' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            Submit
          </button>
        )}
        {!revealed && (
          <button
            onClick={() => { setRevealed(true); setInput(answer.split('')) }}
            className="font-ui px-5 py-2 rounded-full text-sm font-semibold border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            Reveal Answer
          </button>
        )}
      </div>
    </div>
  )
}

export default function CrypticClueGame() {
  const { index } = useParams()
  const puzzle = puzzles[Number(index)]
  const [solved, setSolved] = useState(false)
  const [solvedParts, setSolvedParts] = useState(new Set())
  const [showMegaAnswer, setShowMegaAnswer] = useState(false)

  if (!puzzle) {
    return (
      <Layout>
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">Puzzle not found.</p>
          <Link to="/cryptic-clue" className="mt-4 inline-block underline text-black">← Back</Link>
        </div>
      </Layout>
    )
  }

  const isMultiPart = puzzle.isMultiPart && puzzle.parts

  const handlePartSolved = (partIndex) => {
    const newSolved = new Set(solvedParts)
    newSolved.add(partIndex)
    setSolvedParts(newSolved)

    if (isMultiPart && newSolved.size === puzzle.parts.length) {
      setShowMegaAnswer(true)
      setSolved(true)
    }
  }

  const handleSingleClueComplete = () => {
    setSolved(true)
  }

  return (
    <Layout>
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-1">
          <Link to="/cryptic-clue" className="font-ui text-sm text-gray-400 hover:text-black transition-colors">← All Cryptic Clues</Link>
        </div>
        <div className="text-center mb-8">
          <p className="font-ui text-xs uppercase tracking-[0.2em] text-gray-400 mb-1 font-medium">Puzzle by {puzzle.creator}</p>
          <h2 className="playfair text-3xl font-bold text-black mb-2">{isMultiPart ? 'Multi-Part Cryptic Clue' : 'Cryptic Clue'}</h2>
          <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
            Cryptic clues have a definition hiding in plain sight, plus a wordplay twist.
            The number in brackets is the answer length.
          </p>
          {isMultiPart && (
            <p className="font-ui text-xs uppercase tracking-[0.2em] text-amber-600 mt-2 font-medium">
              {solvedParts.size} of {puzzle.parts.length} parts solved
            </p>
          )}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
          <p className="font-semibold mb-1">💡 Cryptic tips:</p>
          <ul className="list-disc list-inside space-y-1 text-xs leading-relaxed">
            <li>The clue contains a literal definition (usually at the start or end)</li>
            <li>The rest is wordplay: anagrams, hidden words, reversals, sounds-like…</li>
            <li>Words like "mixed", "confused", "chaotic" often signal an anagram</li>
            <li>The number in brackets tells you how many letters</li>
          </ul>
        </div>

        {isMultiPart ? (
          <>
            {puzzle.parts.map((part, partIndex) => (
              <div key={partIndex}>
                <div className={`font-ui mb-2 text-xs uppercase tracking-[0.2em] font-medium ${solvedParts.has(partIndex) ? 'text-green-600' : 'text-gray-400'}`}>
                  Part {partIndex + 1} of {puzzle.parts.length}
                </div>
                <ClueCard
                  clue={part.clue}
                  answer={part.answer}
                  length={part.length}
                  explanation={part.explanation}
                  onSolved={() => handlePartSolved(partIndex)}
                />
              </div>
            ))}

            {showMegaAnswer && (
              <div className="mt-8 border-2 border-gray-200 rounded-2xl p-8 bg-gradient-to-br from-yellow-50 to-amber-50 text-center shadow-sm">
                <p className="font-ui text-xs uppercase tracking-[0.2em] text-gray-400 mb-3 font-medium">Mega Answer</p>
                <p className="playfair text-4xl font-bold text-black mb-2">{puzzle.megaAnswer}</p>
                <p className="text-sm text-gray-600 mb-4">You solved all parts! 🎉</p>
                <div className="text-3xl">✨🎊✨</div>
              </div>
            )}
          </>
        ) : (
          <>
            <ClueCard clue={puzzle.clue} answer={puzzle.answer} length={puzzle.length} explanation={puzzle.explanation} onSolved={handleSingleClueComplete} />

            {puzzle.bonusClues?.length > 0 && (
              <>
                <p className="font-ui text-xs uppercase tracking-[0.2em] text-gray-400 mb-4 text-center font-medium">Bonus Clues</p>
                {puzzle.bonusClues.map((bc) => (
                  <ClueCard key={bc.answer} clue={bc.clue} answer={bc.answer} length={bc.length} explanation={bc.explanation} />
                ))}
              </>
            )}
          </>
        )}

        {solved && !isMultiPart && <WinMessage creator={puzzle.creator} message={puzzle.message} />}
        {solved && isMultiPart && <WinMessage creator={puzzle.creator} message={puzzle.message} />}
      </div>
    </Layout>
  )
}
