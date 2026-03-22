import PuzzleLobby from '../components/PuzzleLobby'
import puzzles from '../data/wordsearch'

export default function WordSearch() {
  return (
    <PuzzleLobby
      title="Word Search"
      description="Find all the hidden words in the grid. Pick a puzzle to play!"
      icon="🔍"
      basePath="/word-search"
      puzzles={puzzles}
    />
  )
}
