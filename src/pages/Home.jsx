import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const PUZZLES = [
  {
    path: '/wordle',
    title: 'Wordle',
    description: 'Guess the mystery 5-letter word in 6 tries.',
    icon: '🟩',
    color: 'bg-green-50 border-green-200',
    accent: 'bg-green-600',
    label: 'Word Game',
  },
  {
    path: '/connections',
    title: 'Connections',
    description: 'Group 16 words into 4 secret categories.',
    icon: '🔗',
    color: 'bg-blue-50 border-blue-200',
    accent: 'bg-blue-600',
    label: 'Group Game',
  },
  {
    path: '/crossword',
    title: 'Mini Crossword',
    description: 'A birthday-themed 5×5 crossword puzzle.',
    icon: '✏️',
    color: 'bg-yellow-50 border-yellow-200',
    accent: 'bg-yellow-600',
    label: 'Crossword',
  },
  {
    path: '/word-search',
    title: 'Word Search',
    description: 'Find all the hidden words in the grid.',
    icon: '🔍',
    color: 'bg-purple-50 border-purple-200',
    accent: 'bg-purple-600',
    label: 'Search',
  },
  {
    path: '/cryptic-clue',
    title: 'Cryptic Clue',
    description: 'Decode a fiendishly tricky cryptic crossword clue.',
    icon: '🧩',
    color: 'bg-red-50 border-red-200',
    accent: 'bg-red-600',
    label: 'Cryptic',
  },
]

export default function Home() {
  return (
    <Layout>
      {/* Hero section */}
      <div className="text-center mb-10 border-b border-gray-200 pb-10">
        <p className="font-ui text-base text-gray-500 uppercase tracking-widest mb-2">🎂 Special Edition 🎂</p>
        <h2 className="playfair text-4xl sm:text-5xl font-bold text-black mb-4 leading-tight">
          April's Birthday Games
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
          Personalised puzzles for everyone's puzzle queen. Made for our favourite, by your favourites 🩷
        </p>
      </div>

      {/* Puzzle grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {PUZZLES.map((puzzle) => (
          <Link key={puzzle.path} to={puzzle.path} className="group block">
            <div className={`border rounded-lg p-6 h-full transition-all group-hover:shadow-md group-hover:-translate-y-0.5 ${puzzle.color}`}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{puzzle.icon}</span>
                <span className={`font-ui text-xs text-white px-2 py-1 rounded-full font-semibold uppercase tracking-wide ${puzzle.accent}`}>
                  {puzzle.label}
                </span>
              </div>
              <h3 className="playfair text-xl font-bold text-black mb-2">{puzzle.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{puzzle.description}</p>
              <div className="font-ui mt-4 text-sm font-semibold text-black group-hover:underline">
                Play now →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Birthday message section */}
      <div className="border-t-2 border-black border-b-2 py-8 text-center">
        <p className="font-ui text-sm uppercase tracking-widest text-gray-500 mb-3">💌 A message from your friends</p>
        <blockquote className="playfair text-2xl italic text-black max-w-2xl mx-auto leading-relaxed">
          "Happy Birthday, April! We made you puzzles because you deserve only the best kind of suffering." 🥳
        </blockquote>
      </div>
    </Layout>
  )
}
