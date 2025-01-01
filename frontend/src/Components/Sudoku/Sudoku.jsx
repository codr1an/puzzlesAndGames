import "./Sudoku.css";
import Sidebar from "../Home/Sidebar";

const Sudoku = () => {
  return (
    <div>
      <div className="game-selection-container">
        <Sidebar />
        <div className="game-container"></div>
      </div>
    </div>
  );
};
export default Sudoku;
