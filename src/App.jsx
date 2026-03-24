import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Wordle from './pages/Wordle'
import WordleGame from './pages/WordleGame'
import Connections from './pages/Connections'
import ConnectionsGame from './pages/ConnectionsGame'
import Crossword from './pages/Crossword'
import CrosswordGame from './pages/CrosswordGame'
import WordSearch from './pages/WordSearch'
import WordSearchGame from './pages/WordSearchGame'
import CrypticClue from './pages/CrypticClue'
import CrypticClueGame from './pages/CrypticClueGame'
import Make24 from './pages/Make24'
import Make24Game from './pages/Make24Game'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wordle" element={<Wordle />} />
        <Route path="/wordle/:index" element={<WordleGame />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/connections/:index" element={<ConnectionsGame />} />
        <Route path="/crossword" element={<Crossword />} />
        <Route path="/crossword/:index" element={<CrosswordGame />} />
        <Route path="/word-search" element={<WordSearch />} />
        <Route path="/word-search/:index" element={<WordSearchGame />} />
        <Route path="/cryptic-clue" element={<CrypticClue />} />
        <Route path="/cryptic-clue/:index" element={<CrypticClueGame />} />
        <Route path="/make-24" element={<Make24 />} />
        <Route path="/make-24/:index" element={<Make24Game />} />
      </Routes>
    </BrowserRouter>
  )
}
