import { Link, useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top thin bar */}
      <div className="bg-gray-900 text-white text-center py-1.5 text-[11px] tracking-widest uppercase font-medium">
        🎂 Happy Birthday, April! 🎂
      </div>

      {/* Main header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
            <div className="text-[11px] text-gray-400 hidden sm:block tracking-wide">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="text-[11px] text-gray-400 tracking-wide">
              Made with ❤️ by your friends
            </div>
          </div>

          <div className="py-5 text-center">
            <Link to="/">
              <h1 className="nyt-header-font text-5xl sm:text-7xl text-black leading-none hover:opacity-80 transition-opacity">
                The April Times
              </h1>
            </Link>
            <p className="text-sm text-gray-400 mt-1.5 italic">
              "All the Birthday News That's Fit to Play"
            </p>
          </div>

          {/* Nav */}
          <nav className="flex items-center justify-center gap-1 sm:gap-4 pb-0 overflow-x-auto -mb-px">
            {[
              { path: '/', label: 'Home' },
              { path: '/wordle', label: 'Wordle' },
              { path: '/connections', label: 'Connections' },
              { path: '/crossword', label: 'Crossword' },
              { path: '/word-search', label: 'Word Search' },
              { path: '/cryptic-clue', label: 'Cryptic Clue' },
            ].map(({ path, label }) => {
              const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
              return (
                <Link
                  key={path}
                  to={path}
                  className={`text-[13px] font-semibold whitespace-nowrap px-3 py-2.5 border-b-2 transition-all ${
                    isActive
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="nyt-header-font text-2xl text-black mb-2">The April Times</p>
          <p className="text-xs text-gray-400 tracking-wide">Happy Birthday, April! Wishing you all the joy in the world 🎉</p>
        </div>
      </footer>
    </div>
  )
}
