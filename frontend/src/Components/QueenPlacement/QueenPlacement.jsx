import React, { useState } from "react";
import "./QueenPlacement.css";
import Sidebar from "../Home/Sidebar";
import Chessboard from "./Chessboard";

const QueenPlacement = () => {
  const pieceLogic = (currentCell) => {
    return currentCell === "Q" ? null : "Q";
  };

  const pieceImage = "/LightQueen.webp";
  const pieceAlt = "Queen";

  return (
    <div>
      <div className="game-selection-container">
        <Sidebar />
        <div className="queen-placement-container">
          <div className="queen-game-elements">
            <div className="info-container">
              <h4>8-Queens-Puzzle</h4>
              <p>
                The eight queens puzzle is the problem of placing eight chess
                queens on the chessboard so that no two queens threaten each
                other; thus, a solution requires that no two queens share the
                same row, column, or diagonal. There are 92 solutions.
              </p>
              <h5>How to play:</h5>
              <p>1. Place all 8 queens without any queen threatening another</p>
              <p>2. Click on a tile to place a queen</p>
              <p>3. Click on the same tile to remove the queen</p>
              <p>4. If you can't find a solution, you can generate one</p>
              <p>5. You can clear the board by pressing on the clear button</p>
            </div>
            <div className="board-container">
              <Chessboard
                pieceLogic={pieceLogic}
                pieceImage={pieceImage}
                pieceAlt={pieceAlt}
              />
            </div>
            <div className="moves-container">
              <h4>8-Queens-Puzzle</h4>
              <p>
                The eight queens puzzle is the problem of placing eight chess
                queens on the chessboard so that no two queens threaten each
                other; thus, a solution requires that no two queens share the
                same row, column, or diagonal. There are 92 solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueenPlacement;
