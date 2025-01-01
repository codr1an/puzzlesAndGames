import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Sudoku from "./Components/Sudoku/Sudoku";
import SudokKiller from "./Components/SudokuKiller/SudokuKiller";
import QueenPlacement from "./Components/QueenPlacement/QueenPlacement";
import KnightDomination from "./Components/KnightDomination/KnightDomination";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sudoku" element={<Sudoku />} />
        <Route path="/sudoku_killer" element={<SudokKiller />} />
        <Route path="/queen_placement_2" element={<QueenPlacement />} />
        <Route path="/knight_domination" element={<KnightDomination />} />
      </Routes>
    </Router>
  );
}

export default App;
