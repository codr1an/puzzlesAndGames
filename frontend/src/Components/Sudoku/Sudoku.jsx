import { useState, useEffect } from "react";
import "./Sudoku.css";
import Sidebar from "../Home/Sidebar";

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

        const initialEditableCells = data.map((row) =>
          row.map((cell) => cell === 0)
        );
        setEditableCells(initialEditableCells);
      })
      .catch((error) => {
        console.error("Error fetching Sudoku board:", error);
      });
  }, []);

  let preventBlur = false;

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
      "http://127.0.0.1:5000/api/generate_new_sudoku?difficulty=" + difficulty
    )
      .then((response) => response.json())
      .then((data) => {
        setBoard(data);

        const newSudokuCells = data.map((row) => row.map((cell) => cell === 0));
        setEditableCells(newSudokuCells);
      })
      .catch((error) => {
        console.error("Error fetching Sudoku board:", error);
      });
  };
  const handleSolution = () => {
    fetch("http://127.0.0.1:5000/api/sudoku_solution")
      .then((response) => response.json())
      .then((data) => {
        setBoard(data);

        const solvedSudoku = data.map((row) => row.map((cell) => cell === 0));
        setEditableCells(solvedSudoku);
      })
      .catch((error) => {
        console.error("Error fetching Sudoku board:", error);
      });
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

              return (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  className={`sudoku-cell ${isHighlighted ? "highlight" : ""} ${
                    isSameValue ? "value-highlight" : ""
                  } ${isEditable ? "user-added" : ""}`}
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
            <div className="difficulty-container">
              <h3>Difficulty: </h3>
              <button
                type="button"
                className="difficulty-button"
                onClick={() => handleDifficultyChange("easy")}
              >
                Easy
              </button>
              <button
                type="button"
                className="difficulty-button"
                onClick={() => handleDifficultyChange("medium")}
              >
                Medium
              </button>
              <button
                type="button"
                className="difficulty-button"
                onClick={() => handleDifficultyChange("hard")}
              >
                Hard
              </button>
            </div>
            <div className="sudoku-controls-container">
              <div className="sudoku-board-container">{renderBoard(board)}</div>
              <div className="sudoku-buttons-container">
                <div className="sudoku-numbers-buttons">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className="numpad-button"
                      onClick={() => handleNumpadClick(num)}
                      onMouseDown={() => (preventBlur = true)}
                      onMouseUp={() => (preventBlur = false)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <div className="sudoku-actions-buttons">
                  <button
                    type="button"
                    className="actions-button"
                    onClick={handleUndo}
                    onMouseDown={() => (preventBlur = true)}
                    onMouseUp={() => (preventBlur = false)}
                  >
                    <i className="bi bi-arrow-counterclockwise"> Undo</i>
                  </button>
                  <button
                    type="button"
                    className="actions-button"
                    onClick={handleDelete}
                    onMouseDown={() => (preventBlur = true)}
                    onMouseUp={() => (preventBlur = false)}
                  >
                    <i className="bi bi-eraser"> Erase</i>
                  </button>
                  <button
                    type="button"
                    className="actions-button"
                    onMouseDown={() => (preventBlur = true)}
                    onMouseUp={() => (preventBlur = false)}
                  >
                    <i className="bi bi-lightbulb"> Hint</i>
                  </button>
                  <button
                    type="button"
                    className="actions-button"
                    onMouseDown={() => (preventBlur = true)}
                    onMouseUp={() => (preventBlur = false)}
                    onClick={() => handleSolution()}
                  >
                    <i className="bi bi-check2"> Solve</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sudoku;
