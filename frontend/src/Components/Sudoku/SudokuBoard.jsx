const SudokuBoard = ({
  board,
  editableCells,
  onCellChange,
  onCellFocus,
  onCellBlur,
  highlightedCell,
  highlightedValue,
}) => {
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
                onFocus={() => onCellFocus(rowIndex, colIndex)}
                onBlur={onCellBlur}
                onChange={(event) => onCellChange(event, rowIndex, colIndex)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SudokuBoard;
