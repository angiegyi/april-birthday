import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout'
import WinMessage from '../components/WinMessage'
import puzzles from '../data/make24'

export default function Make24Game() {
  const { index } = useParams()
  const puzzle = puzzles[Number(index)]

  const [tokens, setTokens] = useState([])
  const [status, setStatus] = useState(null) // null | 'correct' | 'wrong'
  const [error, setError] = useState('')
  const [solved, setSolved] = useState(false)

  if (!puzzle) {
    return (
      <Layout>
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">Puzzle not found.</p>
          <Link to="/make-24" className="mt-4 inline-block underline text-black">← Back</Link>
        </div>
      </Layout>
    )
  }

  const { numbers } = puzzle

  // Track which number tile indices (0–3) are currently used in the expression
  const usedIndices = new Set(
    tokens.filter(t => t.numIdx !== undefined).map(t => t.numIdx)
  )

  const expression = tokens.map(t => t.val).join('')

  // Pretty display: swap * → × and / → ÷
  const displayExpr = tokens.map(t => {
    if (t.val === '*') return '×'
    if (t.val === '/') return '÷'
    return t.val
  }).join('')

  const addNumber = (n, idx) => {
    if (usedIndices.has(idx)) return
    setStatus(null)
    setError('')
    setTokens(prev => [...prev, { val: String(n), numIdx: idx }])
  }

  const addOp = (op) => {
    setStatus(null)
    setError('')
    setTokens(prev => [...prev, { val: op }])
  }

  const backspace = () => {
    setStatus(null)
    setError('')
    setTokens(prev => prev.slice(0, -1))
  }

  const clear = () => {
    setStatus(null)
    setError('')
    setTokens([])
  }

  const submit = () => {
    const numTokens = tokens.filter(t => t.numIdx !== undefined)
    if (numTokens.length !== 4) {
      setStatus('wrong')
      setError('Use all 4 numbers in your expression!')
      return
    }
    if (!expression) return

    try {
      // Guard: only allow safe characters
      if (!/^[\d\s+\-*/().]+$/.test(expression)) {
        setError('Invalid expression.')
        return
      }
      // eslint-disable-next-line no-new-func
      const val = Function(`"use strict"; return (${expression})`)()
      if (!Number.isFinite(val)) {
        setStatus('wrong')
        setError("That's undefined (division by zero?).")
        return
      }
      if (Math.abs(val - 24) < 0.0001) {
        setStatus('correct')
        setSolved(true)
      } else {
        setStatus('wrong')
        setError(`That equals ${+val.toFixed(6)}, not 24. Keep going!`)
      }
    } catch {
      setStatus('wrong')
      setError('Invalid expression — check your brackets!')
    }
  }

  const OPERATORS = [
    { label: '(', val: '(' },
    { label: ')', val: ')' },
    { label: '+', val: '+' },
    { label: '−', val: '-' },
    { label: '×', val: '*' },
    { label: '÷', val: '/' },
  ]

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <div className="mb-1">
          <Link to="/make-24" className="text-sm text-gray-500 hover:text-black">← All Make 24 Puzzles</Link>
        </div>

        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Puzzle by {puzzle.creator}</p>
          <h2 className="text-3xl font-bold text-black mb-2">Make 24</h2>
          <p className="text-sm text-gray-600 max-w-xs mx-auto">
            Use all four numbers with +, −, ×, ÷ and brackets to make exactly 24.
          </p>
        </div>

        {/* Number tiles */}
        <div className="flex justify-center gap-4 mb-6">
          {numbers.map((n, i) => {
            const used = usedIndices.has(i)
            return (
              <button
                key={i}
                onClick={() => addNumber(n, i)}
                disabled={used || solved}
                className={`w-16 h-16 rounded-xl text-2xl font-bold border-2 transition-all
                  ${used
                    ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
                    : 'bg-orange-50 text-orange-700 border-orange-300 hover:bg-orange-100 hover:border-orange-400 active:scale-95'
                  }`}
              >
                {n}
              </button>
            )
          })}
        </div>

        {/* Expression display */}
        <div className={`rounded-xl border-2 px-5 py-4 mb-4 min-h-[3.5rem] flex items-center transition-colors
          ${status === 'correct' ? 'border-green-400 bg-green-50' : status === 'wrong' ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
        >
          <span className={`text-2xl font-mono tracking-wide flex-1 ${displayExpr ? 'text-black' : 'text-gray-300'}`}>
            {displayExpr || 'Tap numbers and operators…'}
          </span>
          {displayExpr && !solved && (
            <button onClick={backspace} className="ml-3 text-gray-400 hover:text-black text-xl">⌫</button>
          )}
        </div>

        {/* Feedback */}
        {status === 'wrong' && error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 font-medium">
            {error}
          </div>
        )}
        {status === 'correct' && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-700 font-semibold">
            🎉 That's 24! Brilliant!
          </div>
        )}

        {/* Operator buttons */}
        {!solved && (
          <>
            <div className="grid grid-cols-6 gap-2 mb-3">
              {OPERATORS.map(op => (
                <button
                  key={op.val}
                  onClick={() => addOp(op.val)}
                  className="h-12 rounded-lg border border-gray-300 bg-white text-lg font-semibold hover:bg-gray-100 active:scale-95 transition-all"
                >
                  {op.label}
                </button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={clear}
                className="flex-1 py-3 rounded-full border border-gray-300 text-sm font-semibold hover:bg-gray-100 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={submit}
                disabled={tokens.length === 0}
                className={`flex-1 py-3 rounded-full text-sm font-semibold transition-colors
                  ${tokens.length > 0 ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                Check Answer
              </button>
            </div>
          </>
        )}

        {solved && <WinMessage creator={puzzle.creator} message={puzzle.message} />}
      </div>
    </Layout>
  )
}
