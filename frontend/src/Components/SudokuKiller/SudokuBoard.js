import React from "react";

const SudokuBoard = ({
  board,
  highlightedCell,
  highlightedValue,
  editableCells,
  solution,
  hintCells,
  handleFocus,
  handleBlur,
  handleChange,
  cages,
}) => {
  const renderBoard = (board) => {
    return (
      <div className="sudoku-grid">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => {
              // Find which cage the current cell belongs to
              const cageIndex = cages.findIndex((cage) =>
                cage.cage.some(([x, y]) => x === rowIndex && y === colIndex)
              );

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
              const isHint = hintCells.some(
                (hint) => hint.row === rowIndex && hint.col === colIndex
              );

              // Assign a background color based on the cage index
              const cageColor =
                cageIndex !== -1
                  ? `hsl(${(cageIndex * 60) % 360}, 70%, 80%)`
                  : "white";

              return (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  className={`sudoku-cell ${isHighlighted ? "highlight" : ""} 
                  ${isSameValue ? "value-highlight" : ""} 
                  ${isEditable ? "user-added" : ""} 
                  ${isIncorrect ? "incorrect" : ""} 
                  ${isHint ? "hint" : ""}`}
                  type="text"
                  maxLength="1"
                  value={cell !== 0 ? cell : ""}
                  readOnly={!isEditable || isHint}
                  onFocus={() => handleFocus(rowIndex, colIndex)}
                  onBlur={handleBlur}
                  onChange={(event) => handleChange(event, rowIndex, colIndex)}
                  style={{ backgroundColor: cageColor }} // Set background color here
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return renderBoard(board);
};

export default SudokuBoard;
