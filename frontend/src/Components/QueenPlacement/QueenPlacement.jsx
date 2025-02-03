import React, { useState, useEffect } from "react";
import "./ChessPuzzlePage.css";
import Sidebar from "../Home/Sidebar";
import Chessboard from "./Chessboard";
import ChessPuzzleControls from "./ChessPuzzleControls";

const QueenPlacement = () => {
  const pieceLogic = (currentCell) => {
    return currentCell === 1 ? 0 : 1;
  };

  const pieceImage = "/LightQueen.webp";
  const pieceAlt = "Queen";
  const [infoMessage, setInfoMessage] = useState("");
  const [moves, setMoves] = useState("");
  const [board, setBoard] = useState(
    Array(8)
      .fill(0)
      .map(() => Array(8).fill(0))
  );
  const [attackedSquares, setAttackedSquares] = useState([]);

  const resetHandler = () => {
    setMoves("");
    setInfoMessage("");
    setBoard(
      Array(8)
        .fill(0)
        .map(() => Array(8).fill(0))
    );
    setAttackedSquares([]);
    console.log("Board Reset");
  };

  const solvePuzzle = async () => {
    if (board.flat().every((cell) => cell === 0)) {
      setInfoMessage("Generating solution...");

      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/random_queens_solution"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch solution");
        }

        const solutionText = await response.json();
        const parsedSolution = JSON.parse(solutionText);
        setBoard(parsedSolution);

        const movesArray = [];
        const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

        parsedSolution.forEach((row, rowIndex) => {
          row.forEach((cell, colIndex) => {
            if (cell === 1) {
              const chessNotation = `Q${files[colIndex]}${8 - rowIndex}`;
              movesArray.push(chessNotation);
            }
          });
        });

        setMoves(movesArray.join(", "));
        setAttackedSquares(getAttackedSquaresForQueens());

        setInfoMessage("Solution found");
      } catch (error) {
        console.error("Error fetching solution:", error);
        setInfoMessage("Failed to generate solution");
      }
    } else {
      setInfoMessage("Checking current board...");

      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/eight_queens_solution",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ board }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch solution");
        }

        const solutionText = await response.json();

        if (solutionText === null) {
          setInfoMessage("No solution found for current board");
        } else {
          const parsedSolution = JSON.parse(solutionText);
          setBoard(parsedSolution);

          const movesArray = [];
          const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

          parsedSolution.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
              if (cell === 1) {
                const chessNotation = `Q${files[colIndex]}${8 - rowIndex}`;
                movesArray.push(chessNotation);
              }
            });
          });

          setMoves(movesArray.join(", "));
          setAttackedSquares(getAttackedSquaresForQueens());

          setInfoMessage("Solution found");
        }
      } catch (error) {
        console.error("Error fetching solution:", error);
        setInfoMessage("Failed to generate solution");
      }
    }
  };

  const getAttackedSquaresForQueens = () => {
    let queens = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row][col] === 1) {
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
    console.log(attackSquares.length);
    return attackSquares;
  };

  const toggleSquare = (row, col) => {
    const queenCount = board.flat().filter((cell) => cell === 1).length;

    if (board[row][col] === 0 && queenCount >= 8) {
      setInfoMessage("Maximum of 8 queens reached!");
      return;
    }

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
    const chessNotation = `Q${files[col]}${8 - row}`;

    setMoves((prevMoves) => {
      const movesArray = prevMoves ? prevMoves.split(", ") : [];

      if (board[row][col] === 1) {
        setInfoMessage("");
        return movesArray.filter((move) => move !== chessNotation).join(", ");
      } else {
        return [...movesArray, chessNotation].join(", ");
      }
    });

    setBoard(newBoard);
  };

  useEffect(() => {
    const attackSquaresForQueens = getAttackedSquaresForQueens();
    setAttackedSquares(attackSquaresForQueens);

    const queenCount = board.flat().filter((cell) => cell === 1).length;
    if (queenCount === 8 && attackSquaresForQueens.length === 0) {
      setInfoMessage("Valid solution found");
    } else if (queenCount === 8 && attackSquaresForQueens.length != 0) {
      setInfoMessage("Invalid, queens are attacking each other");
    }
  }, [board]);

  const instructions = [
    "1. Place queens on the board by clicking on a tile.",
    "2. Remove a queen by clicking on it again.",
    "3. Each queen must not be threatened by another queen.",
    "4. The puzzle is solved if you've placed 8 queens that don't attack each other.",
  ];

  return (
    <div>
      <div className="game-selection-container">
        <Sidebar />
        <div className="chess-puzzle-container">
          <div className="chess-game-elements">
            <Chessboard
              board={board}
              attackedSquares={attackedSquares}
              toggleSquare={toggleSquare}
              pieceImage={pieceImage}
              pieceAlt={pieceAlt}
            />
            <ChessPuzzleControls
              title="Queen Placement II"
              description="The eight queens puzzle is the problem of placing eight chess queens on the chessboard so that no two queens threaten each other."
              instructions={instructions}
              moves={moves}
              resetHandler={resetHandler}
              solveHandler={solvePuzzle}
              infoMessage={infoMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueenPlacement;
