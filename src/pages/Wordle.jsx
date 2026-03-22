import PuzzleLobby from '../components/PuzzleLobby'
import puzzles from '../data/wordle'

export default function Wordle() {
  return (
    <PuzzleLobby
      title="Wordle"
      description="Guess the mystery 5-letter word in 6 tries. Pick a puzzle to play!"
      icon="🟩"
      basePath="/wordle"
      puzzles={puzzles}
    />
  )
}
