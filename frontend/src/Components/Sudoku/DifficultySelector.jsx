import { useState, useEffect } from "react";
import "./Sudoku.css";
import Sidebar from "../Home/Sidebar";
import SudokuBoard from "./SudokuBoard";
import SudokuControls from "./SudokuControls";
import DifficultySelector from "./DifficultySelector";

const Sudoku = () => {
  const [board, setBoard] = useState([]);
  const [editableCells, setEditableCells] = useState([]);
  const [highlightedCell, setHighlightedCell] = useState(null);
  const [highlightedValue, setHighlightedValue] = useState(null);
  const [changeStack, setChangeStack] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/current_sudoku")
      .then((response) => response.json())
      .then((data) => {
        setBoard(data);
        setEditableCells(data.map((row) => row.map((cell) => cell === 0)));
      })
      .catch(console.error);
  }, []);

  const handleCellFocus = (row, col) => {
    setHighlightedCell({ row, col });
    setHighlightedValue(board[row][col] !== 0 ? board[row][col] : null);
  };

  const handleCellBlur = () => {
    setHighlightedCell(null);
    setHighlightedValue(null);
  };

  const handleCellChange = (event, row, col) => {
    const value = event.target.value;
    if (/^[1-9]$/.test(value)) {
      const newBoard = [...board];
      newBoard[row][col] = parseInt(value, 10);
      setChangeStack([...changeStack, { row, col }]);
      setBoard(newBoard);
    }
  };

  const handleNumberClick = (value) => {
    if (highlightedCell) {
      const { row, col } = highlightedCell;
      if (editableCells[row][col]) {
        const newBoard = [...board];
        newBoard[row][col] = value;
        setChangeStack([...changeStack, { row, col }]);
        setBoard(newBoard);
      }
    }
  };

  const handleUndo = () => {
    if (changeStack.length > 0) {
      const lastChange = changeStack.pop();
      const newBoard = [...board];
      newBoard[lastChange.row][lastChange.col] = 0;
      setBoard(newBoard);
      setChangeStack([...changeStack]);
    }
  };

  const handleDelete = () => {
    if (highlightedCell) {
      const { row, col } = highlightedCell;
      if (editableCells[row][col]) {
        const newBoard = [...board];
        newBoard[row][col] = 0;
        setChangeStack([...changeStack, { row, col }]);
        setBoard(newBoard);
      }
    }
  };

  const handleSolution = () => {
    fetch("http://127.0.0.1:5000/api/sudoku_solution")
      .then((response) => response.json())
      .then(setBoard)
      .catch(console.error);
  };

  const handleDifficultyChange = (difficulty) => {
    fetch(
      `http://127.0.0.1:5000/api/generate_new_sudoku?difficulty=${difficulty}`
    )
      .then((response) => response.json())
      .then((data) => {
        setBoard(data);
        setEditableCells(data.map((row) => row.map((cell) => cell === 0)));
      })
      .catch(console.error);
  };

  return (
    <div className="game-selection-container">
      <Sidebar />
      <div className="sudoku-container">
        <DifficultySelector onDifficultyChange={handleDifficultyChange} />
        <SudokuBoard
          board={board}
          editableCells={editableCells}
          onCellChange={handleCellChange}
          onCellFocus={handleCellFocus}
          onCellBlur={handleCellBlur}
          highlightedCell={highlightedCell}
          highlightedValue={highlightedValue}
        />
        <SudokuControls
          onNumberClick={handleNumberClick}
          onUndo={handleUndo}
          onDelete={handleDelete}
          onSolve={handleSolution}
        />
      </div>
    </div>
  );
};

export default Sudoku;
