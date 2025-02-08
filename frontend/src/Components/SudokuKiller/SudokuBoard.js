import React from "react";

// Function to check if two cages are neighbors
const areCagesNeighbors = (cage1, cage2) => {
  return cage1.some(([x1, y1]) =>
    cage2.some(([x2, y2]) => Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1)
  );
};

// Function to get a unique color for each cage
const getUniqueCageColor = (cageIndex, cages) => {
  let color = `hsl(${(cageIndex * 60) % 360}, 70%, 80%)`;

  // Compare with other cages to ensure no neighbors have the same color
  for (let i = 0; i < cageIndex; i++) {
    if (areCagesNeighbors(cages[cageIndex].cage, cages[i].cage)) {
      if (color === cages[i].color) {
        color = `hsl(${(color.match(/\d+/)[0] + 60) % 360}, 70%, 80%)`;
      }
    }
  }

  return color;
};

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
  // Assign colors to cages dynamically
  cages.forEach((cage, index) => {
    cages[index].color = getUniqueCageColor(index, cages);
  });

  const renderBoard = (board) => {
    return (
      <div className="sudoku-grid">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => {
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

              const cageColor =
                cageIndex !== -1 ? cages[cageIndex].color : "white";

              const renderCageSum =
                cageIndex !== -1 &&
                cages[cageIndex].cage[0][0] === rowIndex &&
                cages[cageIndex].cage[0][1] === colIndex
                  ? cages[cageIndex].sum
                  : null;

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="sudoku-cell-container"
                >
                  <input
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
                    onChange={(event) =>
                      handleChange(event, rowIndex, colIndex)
                    }
                    style={{
                      backgroundColor: cageColor,
                    }}
                  />
                  {renderCageSum !== null && (
                    <span className="cage-sum">{renderCageSum}</span>
                  )}
                </div>
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
