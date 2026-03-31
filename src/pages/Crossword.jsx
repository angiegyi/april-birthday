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
          <p className="text-[15px] text-gray-500 leading-relaxed">A birthday-themed crossword puzzle. Click a puzzle to play!</p>
        </div>

        {/* Puzzle list */}
        <div className="space-y-3">
          {puzzles.map((puzzle, index) => (
            <a
              key={index}
              href={puzzle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="lobby-item flex items-center justify-between p-5 border border-gray-200 bg-white hover:border-black hover:bg-black hover:text-white group"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-gray-300 group-hover:text-gray-500 w-8 select-none tabular-nums">
                  {index + 1}
                </span>
                <div>
                  <p className="text-base font-semibold">{puzzle.creator}</p>
                  <p className="text-[13px] text-gray-400 group-hover:text-gray-300">
                    {puzzle.message}
                  </p>
                  {puzzle.password && (
                    <p className="text-[12px] text-amber-600 group-hover:text-amber-300 mt-1 font-medium">
                      Password: {puzzle.password}
                    </p>
                  )}
                </div>
              </div>
              <span className="text-xl play-arrow">↗</span>
            </a>
          ))}
        </div>

        {puzzles.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-base">No puzzles yet — check back soon!</p>
          </div>
        )}
      </div>
    </Layout>
  )
}
