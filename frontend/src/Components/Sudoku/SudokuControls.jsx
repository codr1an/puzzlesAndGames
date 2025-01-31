const SudokuControls = ({ onNumberClick, onUndo, onDelete, onSolve }) => {
  return (
    <div className="sudoku-buttons-container">
      <div className="sudoku-numbers-buttons">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            type="button"
            className="numpad-button"
            onClick={() => onNumberClick(num)}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="sudoku-actions-buttons">
        <button type="button" className="actions-button" onClick={onUndo}>
          <i className="bi bi-arrow-counterclockwise"> Undo</i>
        </button>
        <button type="button" className="actions-button" onClick={onDelete}>
          <i className="bi bi-eraser"> Erase</i>
        </button>
        <button type="button" className="actions-button" onClick={onSolve}>
          <i className="bi bi-check2"> Solve</i>
        </button>
      </div>
    </div>
  );
};

export default SudokuControls;
