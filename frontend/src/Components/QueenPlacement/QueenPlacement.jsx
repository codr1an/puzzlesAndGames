import "./QueenPlacement.css";
import Sidebar from "../Home/Sidebar";

const QueenPlacement = () => {
  return (
    <div>
      <div className="game-selection-container">
        <Sidebar />
        <div className="game-container"></div>
      </div>
    </div>
  );
};
export default QueenPlacement;
