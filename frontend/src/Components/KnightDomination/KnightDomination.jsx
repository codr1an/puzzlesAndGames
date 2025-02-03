import React, { useState, useEffect } from "react";
import "../QueenPlacement/ChessPuzzlePage.css";
import Sidebar from "../Home/Sidebar";
import Chessboard from "../QueenPlacement/Chessboard";
import ChessPuzzleControls from "../QueenPlacement/ChessPuzzleControls";

const KnightDomination = () => {
  const pieceLogic = (currentCell) => {
    return currentCell === 1 ? 0 : 1;
  };

  const pieceImage = "/DarkKnight.webp";
  const pieceAlt = "Knight";

  const [board, setBoard] = useState(
    Array(8)
      .fill(0)
      .map(() => Array(8).fill(0))
  );
  const [dominatedSquares, setDominatedSquares] = useState([]);
  const [moves, setMoves] = useState("");

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

  const resetHandler = () => {
    setMoves("");
    setBoard(
      Array(8)
        .fill(0)
        .map(() => Array(8).fill(0))
    );
    setDominatedSquares([]);
    console.log("Board Reset");
  };

  const solvePuzzle = () => {
    setMoves("Puzzle solved!");
    console.log("Puzzle Solved");
  };

  const getDominatedSquaresForKnights = () => {
    let knights = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row][col] === 1) {
          knights.push({ row, col });
        }
      }
    }

    let attackedSquares = new Set();
    knights.forEach((knight) => {
      attackedSquares.add(`${knight.row},${knight.col}`);

      knightMoves.forEach(([dx, dy]) => {
        const newRow = knight.row + dx;
        const newCol = knight.col + dy;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
          attackedSquares.add(`${newRow},${newCol}`);
        }
      });
    });

    return Array.from(attackedSquares).map((pos) => pos.split(",").map(Number));
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

    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const chessNotation = `N${files[col]}${8 - row}`;

    setMoves((prevMoves) => {
      const movesArray = prevMoves ? prevMoves.split(", ") : [];

      if (board[row][col] === 1) {
        return movesArray.filter((move) => move !== chessNotation).join(", ");
      } else {
        return [...movesArray, chessNotation].join(", ");
      }
    });

    setBoard(newBoard);
  };

  useEffect(() => {
    setDominatedSquares(getDominatedSquaresForKnights());
  }, [board]);

  const instructions = [
    "1. Place knights on the board by clicking on a tile.",
    "2. Remove a knight by clicking on it again.",
    "3. Ensure every square is either occupied or dominated by a knight.",
    "4. The puzzle is solved when every square is covered.",
  ];

  return (
    <div>
      <div className="game-selection-container">
        <Sidebar />
        <div className="chess-puzzle-container">
          <div className="chess-game-elements">
            <Chessboard
              board={board}
              attackedSquares={dominatedSquares}
              toggleSquare={toggleSquare}
              pieceImage={pieceImage}
              pieceAlt={pieceAlt}
            />
            <ChessPuzzleControls
              title="Knight Domination"
              description="Place knights so that every square is either occupied or attacked."
              instructions={instructions}
              moves={moves}
              resetHandler={resetHandler}
              solveHandler={solvePuzzle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnightDomination;
