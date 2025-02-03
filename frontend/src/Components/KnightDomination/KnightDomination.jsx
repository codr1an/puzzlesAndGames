import React, { useState } from "react";
import "./KnightDomination.css";
import Sidebar from "../Home/Sidebar";
import Chessboard from "../QueenPlacement/Chessboard";

const KnightDomination = () => {
  const pieceLogic = (currentCell) => {
    return currentCell === "N" ? null : "N";
  };

  const pieceImage = "/DarkKnight.webp";
  const pieceAlt = "Knight";

  return (
    <div>
      <div className="game-selection-container">
        <Sidebar />
        <div className="knight-domination-container">
          <div className="knight-game-elements">
            <div className="info-container">
              <h4>Knight Domination</h4>
              <p>
                The Knight Domination problem is about placing knights on the
                chessboard so that every square is either occupied by a knight
                or threatened by one.
              </p>
              <h5>How to play:</h5>
              <p>1. Place knights on the board</p>
              <p>2. Each knight must cover a square by attacking it</p>
              <p>3. Click on a tile to place/remove a knight</p>
            </div>
            <div className="board-container">
              <Chessboard
                pieceLogic={pieceLogic}
                pieceImage={pieceImage}
                pieceAlt={pieceAlt}
              />
            </div>
            <div className="moves-container">
              <h4>Moves</h4>
              <p>NA1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnightDomination;
