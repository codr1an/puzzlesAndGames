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
            <Chessboard
              pieceLogic={pieceLogic}
              pieceImage={pieceImage}
              pieceAlt={pieceAlt}
            />
            <div className="queen-controls-container">
              <div className="queen-title">
                <h1>8 Queens Puzzle</h1>
              </div>
              <div className="queen-description">
                <h2>Instructions</h2>
                <p>
                  The eight queens puzzle is the problem of placing eight chess
                  queens on the chessboard so that no two queens threaten each
                  other; thus, a solution requires that no two queens share the
                  same row, column, or diagonal. There are 92 solutions.
                </p>
                <p>1. Place queens on the board by clicking on a tile</p>
                <p>2. Remove a queen by clicking on it again</p>
                <p>3. Each queen must not be threatened by another queen</p>
                <p>
                  4. The puzzle is solved if you've placed 8 queens that don't
                  attack eachother
                </p>
              </div>
              <div className="queen-moves">
                <h2>Moves</h2>
              </div>
              <div className="queen-buttons">
                <button className="queen-button">Reset</button>
                <button className="queen-button">Solve</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueenPlacement;
