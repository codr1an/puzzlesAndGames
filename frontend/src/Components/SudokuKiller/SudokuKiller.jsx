import "./SudokuKiller.css";
import Sidebar from "../Home/Sidebar";

const SudokuKiller = () => {
  return (
    <div>
      <div className="game-selection-container">
        <Sidebar />
        <div className="game-container"></div>
      </div>
    </div>
  );
};
export default SudokuKiller;
