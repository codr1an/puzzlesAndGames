import React from "react";

const SudokuControls = ({
  handleUndo,
  handleDelete,
  handleSolution,
  handleNumpadClick,
  setPreventBlur,
  handleHint,
  isSolved,
  solutionsCount,
}) => {
  const handleMouseDown = () => setPreventBlur(true);
  const handleMouseUp = () => setPreventBlur(false);

  return (
    <div className="sudoku-buttons-container">
      <div className="sudoku-info">
        {isSolved && <h3>Sudoku solved</h3>}
        {solutionsCount && isSolved && (
          <h4>This board has {solutionsCount} solutions</h4>
        )}
      </div>

      <div className="sudoku-numbers-buttons">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            type="button"
            className="numpad-button"
            onClick={() => handleNumpadClick(num)}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
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
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <i className="bi bi-arrow-counterclockwise"> Undo</i>
        </button>
        <button
          type="button"
          className="actions-button"
          onClick={handleDelete}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <i className="bi bi-eraser"> Erase</i>
        </button>
        <button
          type="button"
          className="actions-button"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={handleHint}
        >
          <i className="bi bi-lightbulb"> Hint</i>
        </button>
        <button
          type="button"
          className="actions-button"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={handleSolution}
        >
          <i className="bi bi-check2"> Solve</i>
        </button>
      </div>
    </div>
  );
};

export default SudokuControls;
