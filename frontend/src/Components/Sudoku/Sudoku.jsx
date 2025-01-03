import "./Sudoku.css";
import Sidebar from "../Home/Sidebar";
import { useState, useEffect } from "react";

const Sudoku = () => {
  const [board, setBoard] = useState([]);
  const [highlightedCell, setHighlightedCell] = useState(null);
  const [highlightedValue, setHighlightedValue] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/sudoku")
      .then((response) => response.json())
      .then((data) => {
        setBoard(data);
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
    setHighlightedCell(null);
    setHighlightedValue(null);
  };

  const handleChange = (event, rowIndex, colIndex) => {
    const value = event.target.value;

    if (/^[1-9]$/.test(value)) {
      const newBoard = [...board];
      newBoard[rowIndex][colIndex] = parseInt(value, 10);
      setBoard(newBoard);
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

              const isUserAdded = cell !== 0 && board[rowIndex][colIndex] !== 0;

              return (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  className={`sudoku-cell ${isHighlighted ? "highlight" : ""} ${
                    isSameValue ? "value-highlight" : ""
                  } ${isUserAdded ? "user-added" : ""}`}
                  type="text"
                  maxLength="1"
                  value={cell !== 0 ? cell : ""}
                  readOnly={cell !== 0}
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
              <button type="button" className="difficulty-button">
                Easy
              </button>
              <button type="button" className="difficulty-button">
                Medium
              </button>
              <button type="button" className="difficulty-button">
                Hard
              </button>
            </div>
            <div className="sudoku-controls-container">
              <div className="sudoku-board-container">{renderBoard(board)}</div>
              <div className="sudoku-buttons-container">
                <div className="sudoku-actions-buttons">
                  <button type="button" className="actions-button">
                    <i class="bi bi-arrow-counterclockwise"></i>
                  </button>
                  <button type="button" className="actions-button">
                    <i class="bi bi-eraser"></i>
                  </button>
                  <button type="button" className="actions-button">
                    <i class="bi bi-lightbulb"></i>
                  </button>
                  <button type="button" className="actions-button">
                    <i class="bi bi-check2"></i>
                  </button>
                </div>
                <div className="sudoku-numbers-buttons">
                  <button type="button" className="numpad-button">
                    1
                  </button>
                  <button type="button" className="numpad-button">
                    2
                  </button>
                  <button type="button" className="numpad-button">
                    3
                  </button>
                  <button type="button" className="numpad-button">
                    4
                  </button>
                  <button type="button" className="numpad-button">
                    5
                  </button>
                  <button type="button" className="numpad-button">
                    6
                  </button>
                  <button type="button" className="numpad-button">
                    7
                  </button>
                  <button type="button" className="numpad-button">
                    8
                  </button>
                  <button type="button" className="numpad-button">
                    9
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
