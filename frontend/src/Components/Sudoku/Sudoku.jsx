import { useState, useEffect } from "react";
import "./Sudoku.css";
import Sidebar from "../Home/Sidebar";
import SudokuControls from "./SudokuControls";
import SudokuDifficulty from "./SudokuDifficulty";

const Sudoku = () => {
  const [board, setBoard] = useState([]);
  const [editableCells, setEditableCells] = useState([]);
  const [highlightedCell, setHighlightedCell] = useState(null);
  const [highlightedValue, setHighlightedValue] = useState(null);
  const [changeStack, setChangeStack] = useState([]);
  const [preventBlur, setPreventBlur] = useState(false);
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/current_sudoku")
      .then((response) => response.json())
      .then((data) => {
        setBoard(data);

        const initialEditableCells = data.map((row) =>
          row.map((cell) => cell === 0)
        );
        setEditableCells(initialEditableCells);

        fetch("http://127.0.0.1:5000/api/sudoku_solution")
          .then((response) => response.json())
          .then((solutionData) => setSolution(solutionData))
          .catch((error) =>
            console.error("Error fetching Sudoku solution:", error)
          );
      })
      .catch((error) => {
        console.error("Error fetching Sudoku board:", error);
      });
  }, []);

  const handleFocus = (rowIndex, colIndex) => {
    setHighlightedCell({ row: rowIndex, col: colIndex });
    const cellValue = board[rowIndex][colIndex];
    setHighlightedValue(cellValue !== 0 ? cellValue : null);
  };

  const handleBlur = () => {
    if (!preventBlur) {
      setHighlightedCell(null);
      setHighlightedValue(null);
    }
  };

  const handleChange = (event, rowIndex, colIndex) => {
    const value = event.target.value;

    if (/^[1-9]$/.test(value)) {
      const newBoard = [...board];
      newBoard[rowIndex][colIndex] = parseInt(value, 10);

      setChangeStack((prevStack) => [
        ...prevStack,
        { row: rowIndex, col: colIndex },
      ]);
      setBoard(newBoard);
      if (solution) {
        const isCorrect = solution[rowIndex][colIndex] === parseInt(value, 10);
        const cellElement = event.target;
        if (!isCorrect) {
          cellElement.classList.add("incorrect");
        } else {
          cellElement.classList.remove("incorrect");
        }
      }
    }
  };

  const handleNumpadClick = (value) => {
    if (highlightedCell) {
      const { row, col } = highlightedCell;

      if (editableCells[row][col]) {
        const newBoard = [...board];
        newBoard[row][col] = parseInt(value, 10);
        setChangeStack((prevStack) => [...prevStack, { row, col }]);
        setBoard(newBoard);
      }
    }
  };

  const handleUndo = () => {
    setChangeStack((prevStack) => {
      if (prevStack.length === 0) return prevStack;
      const lastChange = prevStack[prevStack.length - 1];
      const newBoard = [...board];
      newBoard[lastChange.row][lastChange.col] = 0;
      setBoard(newBoard);

      return prevStack.slice(0, -1);
    });
  };

  const handleDelete = () => {
    if (highlightedCell) {
      const { row, col } = highlightedCell;

      if (editableCells[row][col] && board[row][col] !== 0) {
        const newBoard = [...board];
        newBoard[row][col] = 0;

        setChangeStack((prevStack) => [...prevStack, { row, col }]);
        setBoard(newBoard);
      }
    }
  };

  const handleDifficultyChange = (difficulty) => {
    fetch(
      `http://127.0.0.1:5000/api/generate_new_sudoku?difficulty=${difficulty}`
    )
      .then((response) => response.json())
      .then((data) => {
        setBoard(data);

        const newSudokuCells = data.map((row) => row.map((cell) => cell === 0));
        setEditableCells(newSudokuCells);

        fetch("http://127.0.0.1:5000/api/sudoku_solution")
          .then((response) => response.json())
          .then((solutionData) => setSolution(solutionData))
          .catch((error) =>
            console.error("Error fetching Sudoku solution:", error)
          );
      })
      .catch((error) => {
        console.error("Error fetching Sudoku board:", error);
      });
  };

  const handleSolution = () => {
    if (solution) {
      setBoard(solution);
    }
  };

  const renderBoard = (board) => {
    return (
      <div className="sudoku-grid">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => {
              const isHighlighted =
                highlightedCell &&
                (highlightedCell.row === rowIndex ||
                  highlightedCell.col === colIndex ||
                  (Math.floor(rowIndex / 3) ===
                    Math.floor(highlightedCell.row / 3) &&
                    Math.floor(colIndex / 3) ===
                      Math.floor(highlightedCell.col / 3)));

              const isSameValue =
                highlightedValue !== null && cell === highlightedValue;
              const isEditable = editableCells[rowIndex][colIndex];
              const isIncorrect =
                solution && cell !== 0 && cell !== solution[rowIndex][colIndex];

              return (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  className={`sudoku-cell ${isHighlighted ? "highlight" : ""} 
                  ${isSameValue ? "value-highlight" : ""} 
                  ${isEditable ? "user-added" : ""} 
                  ${isIncorrect ? "incorrect" : ""}`}
                  type="text"
                  maxLength="1"
                  value={cell !== 0 ? cell : ""}
                  readOnly={!isEditable}
                  onFocus={() => handleFocus(rowIndex, colIndex)}
                  onBlur={handleBlur}
                  onChange={(event) => handleChange(event, rowIndex, colIndex)}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="game-selection-container">
        <Sidebar />
        <div className="sudoku-container">
          <div className="sudoku-components-container">
            <SudokuDifficulty handleDifficultyChange={handleDifficultyChange} />
            <div className="sudoku-controls-container">
              <div className="sudoku-board-container">{renderBoard(board)}</div>
              <SudokuControls
                handleUndo={handleUndo}
                handleDelete={handleDelete}
                handleSolution={handleSolution}
                preventBlur={preventBlur}
                handleNumpadClick={handleNumpadClick}
                setPreventBlur={setPreventBlur}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sudoku;
