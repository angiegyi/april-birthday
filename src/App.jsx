import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Wordle from './pages/Wordle'
import Connections from './pages/Connections'
import Crossword from './pages/Crossword'
import WordSearch from './pages/WordSearch'
import CrypticClue from './pages/CrypticClue'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wordle" element={<Wordle />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/crossword" element={<Crossword />} />
        <Route path="/word-search" element={<WordSearch />} />
        <Route path="/cryptic-clue" element={<CrypticClue />} />
      </Routes>
    </BrowserRouter>
  )
}
