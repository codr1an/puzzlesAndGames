import React from "react";
import "./Chessboard.css";

const Chessboard = ({
  board,
  attackedSquares,
  toggleSquare,
  pieceImage,
  pieceAlt,
}) => {
  const renderBoard = () => {
    return board.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        const squareClass = `${
          (rowIndex + colIndex) % 2 === 0 ? "white" : "black"
        } square`;

        const isAttacked = attackedSquares.some(
          ([attackedRow, attackedCol]) =>
            attackedRow === rowIndex && attackedCol === colIndex
        );

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
            className={`${squareClass} ${isAttacked ? "attacked" : ""}`}
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
            {cell === 1 && (
              <img src={pieceImage} alt={pieceAlt} className="piece" />
            )}
          </div>
        );
      })
    );
  };

  return <div className="chessboard">{renderBoard()}</div>;
};

export default Chessboard;
