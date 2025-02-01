import "./QueenPlacement.css";
import Sidebar from "../Home/Sidebar";
import { Chessboard } from "react-chessboard";

const QueenPlacement = () => {
  return (
    <div>
      <div className="game-selection-container">
        <Sidebar />
        <div className="queen-container">
          <div className="info-container">
            <h4>8-Queens-Puzzle</h4>
            <p>
              The eight queens puzzle is the problem of placing eight chess
              queens on the chessboard so that no two queens threaten each
              other; thus, a solution requires that no two queens share the same
              row, column, or diagonal. There are 92 solutions.
            </p>
          </div>
          <div className="board-container">
            <Chessboard id="BasicBoard" position={"empty"} />
          </div>
          <div className="moves-container"></div>
        </div>
      </div>
    </div>
  );
};
export default QueenPlacement;
