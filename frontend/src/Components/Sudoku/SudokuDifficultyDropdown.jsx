const SudokuDifficultyDropdown = ({ generateNewSudoku }) => {
  return (
    <div class="dropdown">
      <a
        class="btn btn-success dropdown-toggle"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="bi bi-plus">New game</i>
      </a>

      <ul class="dropdown-menu">
        <li>
          <a class="dropdown-item" onClick={() => generateNewSudoku("easy")}>
            Easy
          </a>
        </li>
        <li>
          <a class="dropdown-item" onClick={() => generateNewSudoku("medium")}>
            Medium
          </a>
        </li>
        <li>
          <a class="dropdown-item" onClick={() => generateNewSudoku("hard")}>
            Hard
          </a>
        </li>
      </ul>
    </div>
  );
};
export default SudokuDifficultyDropdown;
