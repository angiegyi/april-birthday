import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const PUZZLES = [
  {
    path: '/wordle',
    title: 'Wordle',
    description: 'Guess the mystery 5-letter word in 6 tries.',
    icon: '🟩',
    color: 'bg-green-50/80 border-green-200/60',
    accent: 'bg-green-600',
    label: 'Word Game',
  },
  {
    path: '/connections',
    title: 'Connections',
    description: 'Group 16 words into 4 secret categories.',
    icon: '🔗',
    color: 'bg-blue-50/80 border-blue-200/60',
    accent: 'bg-blue-600',
    label: 'Group Game',
  },
  {
    path: '/crossword',
    title: 'Mini Crossword',
    description: 'A birthday-themed 5×5 crossword puzzle.',
    icon: '✏️',
    color: 'bg-amber-50/80 border-amber-200/60',
    accent: 'bg-amber-600',
    label: 'Crossword',
  },
  {
    path: '/word-search',
    title: 'Word Search',
    description: 'Find all the hidden words in the grid.',
    icon: '🔍',
    color: 'bg-purple-50/80 border-purple-200/60',
    accent: 'bg-purple-600',
    label: 'Search',
  },
  {
    path: '/cryptic-clue',
    title: 'Clues & Riddles',
    description: 'Decode a cryptic clue or solve a riddle.',
    icon: '🧩',
    color: 'bg-rose-50/80 border-rose-200/60',
    accent: 'bg-rose-600',
    label: 'Clues & Riddles',
  },
  {
    path: '/make-24',
    title: 'Make 24',
    description: 'Use all four numbers with arithmetic to make exactly 24.',
    icon: '🔢',
    color: 'bg-orange-50 border-orange-200',
    accent: 'bg-orange-600',
    label: 'Numbers',
  },
]

export default function Home() {
  return (
    <Layout>
      {/* Hero section */}
      <div className="text-center mb-12 border-b border-gray-200 pb-12">
        <p className="text-[11px] text-gray-400 uppercase tracking-[0.25em] mb-4 font-semibold">🎂 Special Edition 🎂</p>
        <h2 className="playfair text-5xl sm:text-6xl font-bold text-black mb-5 leading-[1.1]">
          April's Birthday Games
        </h2>
        <p className="text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
          Personalised puzzles for everyone's puzzle queen. Made for our favourite, by your favourites 🩷
        </p>
      </div>

      {/* Puzzle grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        {PUZZLES.map((puzzle) => (
          <Link key={puzzle.path} to={puzzle.path} className="group block">
            <div className={`puzzle-card border p-6 h-full ${puzzle.color}`}>
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{puzzle.icon}</span>
                <span className={`text-[10px] text-white px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${puzzle.accent}`}>
                  {puzzle.label}
                </span>
              </div>
              <h3 className="playfair text-xl font-bold text-black mb-1.5">{puzzle.title}</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed">{puzzle.description}</p>
              <div className="mt-5 text-[13px] font-semibold text-black">
                Play now <span className="play-arrow">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Birthday message section */}
      <div className="border-t border-gray-200 border-b border-b-gray-200 py-10 text-center">
        <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-4 font-semibold">💌 A message from your friends</p>
        <blockquote className="playfair text-2xl italic text-black max-w-2xl mx-auto leading-relaxed">
          "Happy Birthday, April! We made you puzzles because you deserve only the best kind of suffering." 🥳
        </blockquote>
      </div>
    </Layout>
  )
}
