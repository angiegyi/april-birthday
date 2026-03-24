import Layout from '../components/Layout'
import puzzles from '../data/crossword'

export default function Crossword() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-5xl block mb-3">✏️</span>
          <h2 className="playfair text-4xl font-bold text-black mb-3">Mini Crossword</h2>
          <p className="text-gray-600">A birthday-themed crossword puzzle. Click a puzzle to play!</p>
        </div>

        {/* Puzzle list */}
        <div className="space-y-3">
          {puzzles.map((puzzle, index) => (
            <a
              key={index}
              href={puzzle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 border-2 border-black rounded-xl hover:bg-black hover:text-white transition-colors group"
            >
              <div className="flex items-center gap-4">
                <span className="font-grid text-2xl font-bold text-gray-300 group-hover:text-gray-500 w-8 select-none">
                  {index + 1}
                </span>
                <div>
                  <p className="text-lg font-bold">{puzzle.creator}</p>
                  <p className="text-sm text-gray-500 group-hover:text-gray-300">
                    {puzzle.message}
                  </p>
                </div>
              </div>
              <span className="text-2xl">↗</span>
            </a>
          ))}
        </div>

        {puzzles.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No puzzles yet — check back soon!</p>
          </div>
        )}
      </div>
    </Layout>
  )
}
