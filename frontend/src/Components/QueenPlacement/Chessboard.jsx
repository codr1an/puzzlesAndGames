import React, { useState } from "react";
import "./Chessboard.css";

const Chessboard = () => {
  const createBoard = () => {
    return Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));
  };

  const [board, setBoard] = useState(createBoard());

  const toggleSquare = (row, col) => {
    const newBoard = board.map((r, rowIndex) => {
      if (rowIndex === row) {
        return r.map((cell, colIndex) => {
          if (colIndex === col) {
            return cell === "Q" ? null : "Q";
          }
          return cell;
        });
      }
      return r;
    });
    setBoard(newBoard);
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        const squareClass = `${
          (rowIndex + colIndex) % 2 === 0 ? "white" : "black"
        } square`;

        let tileNotationTopLeft = "";
        let tileNotationBottomRight = "";

        if (colIndex === 0) {
          tileNotationTopLeft = `${8 - rowIndex}`;
        } else if (rowIndex === 7) {
          tileNotationBottomRight = `${String.fromCharCode(97 + colIndex)}`;
        }

        if (rowIndex === 7 && colIndex === 0) {
          tileNotationTopLeft = `${8 - rowIndex}`;
          tileNotationBottomRight = `${String.fromCharCode(97 + colIndex)}`;
        }

        return (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={squareClass}
            onClick={() => toggleSquare(rowIndex, colIndex)}
          >
            {tileNotationTopLeft && (
              <div className="notation-top-left">{tileNotationTopLeft}</div>
            )}
            {tileNotationBottomRight && (
              <div className="notation-bottom-right">
                {tileNotationBottomRight}
              </div>
            )}
            {cell && (
              <img src="/LightQueen.webp" alt="Queen" className="piece" />
            )}
          </div>
        );
      })
    );
  };

  return <div className="chessboard">{renderBoard()}</div>;
};

export default Chessboard;
