import PuzzleLobby from '../components/PuzzleLobby'
import puzzles from '../data/crossword'

export default function Crossword() {
  return (
    <PuzzleLobby
      title="Mini Crossword"
      description="A birthday-themed 5×5 crossword puzzle. Pick a puzzle to play!"
      icon="✏️"
      basePath="/crossword"
      puzzles={puzzles}
    />
  )
}
