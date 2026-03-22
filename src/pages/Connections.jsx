import PuzzleLobby from '../components/PuzzleLobby'
import puzzles from '../data/connections'

export default function Connections() {
  return (
    <PuzzleLobby
      title="Connections"
      description="Group 16 words into 4 secret categories. Pick a puzzle to play!"
      icon="🔗"
      basePath="/connections"
      puzzles={puzzles}
    />
  )
}
