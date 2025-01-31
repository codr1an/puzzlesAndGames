const SudokuDifficulty = ({ handleDifficultyChange }) => {
  return (
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
  );
};

export default SudokuDifficulty;
