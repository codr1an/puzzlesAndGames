import React, { useState, useEffect } from "react";
import "./Chessboard.css";

const Chessboard = ({ pieceLogic, pieceImage, pieceAlt, knightLogic }) => {
  const createBoard = () => {
    return Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));
  };

  const [board, setBoard] = useState(createBoard());
  const [attackedSquares, setAttackedSquares] = useState([]);
  const [knightSquares, setKnightSquares] = useState([]);

  const getAttackedSquaresForQueens = () => {
    let queens = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row][col] === "Q") {
          queens.push({ row, col });
        }
      }
    }

    let attackSquares = [];

    for (let i = 0; i < queens.length; i++) {
      for (let j = i + 1; j < queens.length; j++) {
        const queen1 = queens[i];
        const queen2 = queens[j];

        if (
          queen1.row === queen2.row ||
          queen1.col === queen2.col ||
          Math.abs(queen1.row - queen2.row) ===
            Math.abs(queen1.col - queen2.col)
        ) {
          attackSquares.push([queen1.row, queen1.col]);
          attackSquares.push([queen2.row, queen2.col]);
        }
      }
    }

    return attackSquares;
  };

  const getAttackedSquaresForKnights = () => {
    const knightMoves = [
      [-2, -1],
      [-2, 1],
      [2, -1],
      [2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
    ];

    let attackedSquares = [];
    let knightSquaresTemp = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row][col] === "N") {
          knightSquaresTemp.push([row, col]);
          attackedSquares.push([row, col]);

          knightMoves.forEach(([rOffset, cOffset]) => {
            const newRow = row + rOffset;
            const newCol = col + cOffset;

            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
              attackedSquares.push([newRow, newCol]);
            }
          });
        }
      }
    }

    return { attackedSquares, knightSquares: knightSquaresTemp };
  };

  const toggleSquare = (row, col) => {
    const newBoard = board.map((r, rowIndex) => {
      if (rowIndex === row) {
        return r.map((cell, colIndex) => {
          if (colIndex === col) {
            return pieceLogic(cell);
          }
          return cell;
        });
      }
      return r;
    });

    setBoard(newBoard);
  };

  useEffect(() => {
    const attackSquaresForQueens = getAttackedSquaresForQueens();
    setAttackedSquares(attackSquaresForQueens);

    const { attackedSquares, knightSquares: knightSquaresTemp } =
      getAttackedSquaresForKnights();
    setAttackedSquares((prevAttacks) => [...prevAttacks, ...attackedSquares]);
    setKnightSquares(knightSquaresTemp);
  }, [board]);

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

        const isKnightSquare = knightSquares.some(
          ([knightRow, knightCol]) =>
            knightRow === rowIndex && knightCol === colIndex
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
            className={`${squareClass} ${
              isAttacked || isKnightSquare ? "attacked" : ""
            }`}
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
            {cell && <img src={pieceImage} alt={pieceAlt} className="piece" />}
          </div>
        );
      })
    );
  };

  return <div className="chessboard">{renderBoard()}</div>;
};

export default Chessboard;
