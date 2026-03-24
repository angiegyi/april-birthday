import PuzzleLobby from '../components/PuzzleLobby'
import puzzles from '../data/make24'

export default function Make24() {
  return (
    <PuzzleLobby
      title="Make 24"
      description="Use all four numbers with arithmetic to make exactly 24. Can you figure it out?"
      icon="🔢"
      basePath="/make-24"
      puzzles={puzzles}
    />
  )
}
