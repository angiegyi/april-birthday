import PuzzleLobby from '../components/PuzzleLobby'
import puzzles from '../data/cryptic'

export default function CrypticClue() {
  return (
    <PuzzleLobby
      title="Cryptic Clues & Riddles"
      description="Decode a fiendishly tricky cryptic clue or solve a riddle. Pick a puzzle to play!"
      icon="🧩"
      basePath="/cryptic-clue"
      puzzles={puzzles}
    />
  )
}
