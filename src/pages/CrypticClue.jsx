import PuzzleLobby from '../components/PuzzleLobby'
import puzzles from '../data/cryptic'

export default function CrypticClue() {
  return (
    <PuzzleLobby
      title="Cryptic Clue"
      description="Decode a fiendishly tricky cryptic crossword clue. Pick a puzzle to play!"
      icon="🧩"
      basePath="/cryptic-clue"
      puzzles={puzzles}
    />
  )
}
