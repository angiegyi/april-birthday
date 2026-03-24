import { Link, useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top thin bar */}
      <div className="font-ui bg-black text-white text-center py-1 text-xs tracking-widest uppercase">
        🎂 Happy Birthday, April! 🎂
      </div>

      {/* Main header */}
      <header className="border-b-2 border-black">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between py-2 border-b border-gray-300">
            <div className="font-ui text-xs text-gray-500 hidden sm:block">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="font-ui text-xs text-gray-500">
              Made with ❤️ by your friends
            </div>
          </div>

          <div className="py-4 text-center">
            <Link to="/">
              <h1 className="nyt-header-font text-5xl sm:text-7xl text-black leading-none hover:opacity-80 transition-opacity">
                The April Times
              </h1>
            </Link>
            <p className="text-sm text-gray-600 mt-1 italic">
              "All the Birthday News That's Fit to Play"
            </p>
          </div>

          {/* Nav */}
          <nav className="font-ui flex items-center justify-center gap-6 pb-3 overflow-x-auto">
            {[
              { path: '/', label: 'Home' },
              { path: '/wordle', label: 'Wordle' },
              { path: '/connections', label: 'Connections' },
              { path: '/crossword', label: 'Mini Crossword' },
              { path: '/word-search', label: 'Word Search' },
              { path: '/cryptic-clue', label: 'Cryptic Clue' },
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`text-sm font-semibold whitespace-nowrap pb-1 border-b-2 transition-colors ${
                  location.pathname === path
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-black hover:border-gray-400'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-black mt-8 py-6">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="nyt-header-font text-2xl text-black mb-2">The April Times</p>
          <p className="font-ui text-xs text-gray-500">Happy Birthday, April! Wishing you all the joy in the world 🎉</p>
        </div>
      </footer>
    </div>
  )
}
