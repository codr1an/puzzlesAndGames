import "./Sudoku.css";
import Sidebar from "../Home/Sidebar";
import { useState } from "react";

const Sudoku = () => {
  const initialBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];

  const [highlightedCell, setHighlightedCell] = useState(null);

  const handleFocus = (rowIndex, colIndex) => {
    setHighlightedCell({ row: rowIndex, col: colIndex });
  };

  const handleBlur = () => {
    setHighlightedCell(null);
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

              return (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  className={`sudoku-cell ${isHighlighted ? "highlight" : ""}`}
                  type="text"
                  maxLength="1"
                  value={cell !== 0 ? cell : ""}
                  readOnly={cell !== 0}
                  onFocus={() => handleFocus(rowIndex, colIndex)}
                  onBlur={handleBlur}
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
              <div className="sudoku-board-container">
                {renderBoard(initialBoard)}
              </div>
              <div className="sudoku-buttons-container"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sudoku;
