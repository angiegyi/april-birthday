import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout'
import WinMessage from '../components/WinMessage'
import puzzles from '../data/connections'

const COLOR_CLASSES = {
  yellow: { bg: 'bg-yellow-300', text: 'text-yellow-900', border: 'border-yellow-400', light: 'bg-yellow-50' },
  green:  { bg: 'bg-green-400',  text: 'text-green-900',  border: 'border-green-500',  light: 'bg-green-50' },
  blue:   { bg: 'bg-blue-400',   text: 'text-blue-900',   border: 'border-blue-500',   light: 'bg-blue-50' },
  purple: { bg: 'bg-purple-400', text: 'text-purple-900', border: 'border-purple-500', light: 'bg-purple-50' },
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function ConnectionsGame() {
  const { index } = useParams()
  const puzzle = puzzles[Number(index)]

  const [words] = useState(() => shuffle(puzzle.groups.flatMap(g => g.words)))
  const [selected, setSelected] = useState([])
  const [solved, setSolved] = useState([]) // solved group labels
  const [mistakes, setMistakes] = useState(4)
  const [message, setMessage] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)

  if (!puzzle) {
    return (
      <Layout>
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">Puzzle not found.</p>
          <Link to="/connections" className="mt-4 inline-block underline text-black">← Back</Link>
        </div>
      </Layout>
    )
  }

  const showMessage = (msg, duration = 2200) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), duration)
  }

  const toggle = (word) => {
    if (gameOver) return
    const isSolved = solved.some(label => puzzle.groups.find(g => g.label === label)?.words.includes(word))
    if (isSolved) return
    setSelected(sel =>
      sel.includes(word) ? sel.filter(w => w !== word) : sel.length < 4 ? [...sel, word] : sel
    )
  }

  const submit = () => {
    if (selected.length !== 4) { showMessage('Pick exactly 4 words'); return }
    const match = puzzle.groups.find(g => selected.every(w => g.words.includes(w)))
    if (match) {
      const newSolved = [...solved, match.label]
      setSolved(newSolved)
      setSelected([])
      if (newSolved.length === puzzle.groups.length) {
        setWon(true)
        setGameOver(true)
        showMessage('🎉 Brilliant! You got them all!', 4000)
      } else {
        showMessage('✅ Correct!')
      }
    } else {
      const bestMatch = puzzle.groups.reduce((best, g) => {
        const overlap = selected.filter(w => g.words.includes(w)).length
        return overlap > best ? overlap : best
      }, 0)
      const newMistakes = mistakes - 1
      setMistakes(newMistakes)
      if (newMistakes === 0) {
        setGameOver(true)
        showMessage('No more attempts! 😅', 4000)
      } else if (bestMatch === 3) {
        showMessage(`One away! ${newMistakes} ${newMistakes === 1 ? 'mistake' : 'mistakes'} left`)
      } else {
        showMessage(`Not quite! ${newMistakes} ${newMistakes === 1 ? 'mistake' : 'mistakes'} left`)
      }
    }
  }

  const solvedGroups = puzzle.groups.filter(g => solved.includes(g.label))
  const remainingWords = words.filter(w => !solvedGroups.some(g => g.words.includes(w)))

  return (
    <Layout>
      <div className="max-w-xl mx-auto">
        <div className="flex items-center gap-3 mb-1">
          <Link to="/connections" className="text-sm text-gray-500 hover:text-black">← All Connections</Link>
        </div>
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Puzzle by {puzzle.creator}</p>
          <h2 className="text-3xl font-bold text-black mb-2">Connections</h2>
          <p className="text-sm text-gray-600">Find four groups of four related words.</p>
        </div>

        {message && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg text-center">
            {message}
          </div>
        )}

        {/* Solved groups */}
        <div className="flex flex-col gap-2 mb-2">
          {solvedGroups.map(g => {
            const c = COLOR_CLASSES[g.color]
            return (
              <div key={g.label} className={`${c.bg} rounded-lg p-4 text-center`}>
                <p className={`font-bold text-sm uppercase tracking-wider ${c.text}`}>{g.label}</p>
                <p className={`text-sm mt-1 ${c.text}`}>{g.words.join(', ')}</p>
              </div>
            )
          })}
        </div>

        {/* Remaining word grid */}
        {!won && (
          <div className="grid grid-cols-4 gap-2 mb-4">
            {remainingWords.map(word => {
              const isSel = selected.includes(word)
              return (
                <button
                  key={word}
                  onClick={() => toggle(word)}
                  className={`py-3 px-1 rounded-lg font-bold text-xs sm:text-sm uppercase text-center transition-all cursor-pointer select-none leading-tight
                    ${isSel
                      ? 'bg-gray-800 text-white ring-2 ring-black'
                      : 'bg-gray-100 text-black hover:bg-gray-200'
                    }`}
                >
                  {word}
                </button>
              )
            })}
          </div>
        )}

        {/* Game over reveal */}
        {gameOver && !won && (
          <div className="flex flex-col gap-2 mb-4">
            {puzzle.groups.filter(g => !solved.includes(g.label)).map(g => {
              const c = COLOR_CLASSES[g.color]
              return (
                <div key={g.label} className={`${c.light} border ${c.border} rounded-lg p-4 text-center`}>
                  <p className="font-bold text-sm uppercase tracking-wider text-gray-700">{g.label}</p>
                  <p className="text-sm mt-1 text-gray-600">{g.words.join(', ')}</p>
                </div>
              )
            })}
          </div>
        )}

        {/* Mistake dots */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-sm text-gray-500">Mistakes remaining:</span>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className={`w-3 h-3 rounded-full ${i < mistakes ? 'bg-gray-700' : 'bg-gray-200'}`} />
          ))}
        </div>

        {/* Controls */}
        {!gameOver && (
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setSelected([])}
              className="px-4 py-2 rounded-full border border-gray-400 text-sm font-semibold hover:bg-gray-100"
            >
              Deselect All
            </button>
            <button
              onClick={submit}
              disabled={selected.length !== 4}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors
                ${selected.length === 4
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
            >
              Submit
            </button>
          </div>
        )}

        {/* Color key */}
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-gray-500">
          {[['yellow','Easiest'],['green','Easy'],['blue','Hard'],['purple','Hardest']].map(([name, label]) => (
            <span key={name} className="flex items-center gap-1">
              <span className={`w-3 h-3 rounded-sm ${COLOR_CLASSES[name].bg}`}></span>
              {label}
            </span>
          ))}
        </div>

        {won && <WinMessage creator={puzzle.creator} message={puzzle.message} />}
      </div>
    </Layout>
  )
}
