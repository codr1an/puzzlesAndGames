import { useState, useEffect } from "react";
import "./SudokuKiller.css";
import Sidebar from "../Home/Sidebar";
import SudokuControls from "../Sudoku/SudokuControls";
import SudokuBoard from "./SudokuBoard";

const SudokuKiller = () => {
  const [board, setBoard] = useState([]);
  const [editableCells, setEditableCells] = useState([]);
  const [highlightedCell, setHighlightedCell] = useState(null);
  const [highlightedValue, setHighlightedValue] = useState(null);
  const [changeStack, setChangeStack] = useState([]);
  const [preventBlur, setPreventBlur] = useState(false);
  const [solution, setSolution] = useState(null);
  const [hintCell, setHintCell] = useState(null);
  const [hintCells, setHintCells] = useState([]);
  const [isSolved, setIsSolved] = useState(false);
  const [cages, setCages] = useState([]);

  useEffect(() => {
    setEditableCells(
      Array(9)
        .fill()
        .map(() => Array(9).fill(true))
    );

    fetch("http://127.0.0.1:5000/api/killer_sudoku")
      .then((response) => response.json())
      .then((data) => {
        setCages(data);
      })
      .catch((error) => console.error("Error fetching data:", error));

    setBoard([
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);

    fetch("http://127.0.0.1:5000/api/killer_sudoku_solution")
      .then((response) => response.json())
      .then((solutionData) => setSolution(solutionData))
      .catch((error) =>
        console.error("Error fetching Sudoku solution:", error)
      );
  }, []);

  const handleHint = () => {
    if (solution) {
      const emptyCells = [];
      for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
          if (board[row][col] === 0 && editableCells[row][col]) {
            emptyCells.push({ row, col });
          }
        }
      }

      if (emptyCells.length > 0) {
        const randomCell =
          emptyCells[Math.floor(Math.random() * emptyCells.length)];
        setHintCells((prevHintCells) => [...prevHintCells, randomCell]);
        const newBoard = [...board];
        newBoard[randomCell.row][randomCell.col] =
          solution[randomCell.row][randomCell.col];
        setBoard(newBoard);
      }
    }
  };

  const handleFocus = (rowIndex, colIndex) => {
    setHighlightedCell({ row: rowIndex, col: colIndex });
    const cellValue = board[rowIndex][colIndex];
    setHighlightedValue(cellValue !== 0 ? cellValue : null);
  };

  const handleBlur = () => {
    if (!preventBlur) {
      setHighlightedCell(null);
      setHighlightedValue(null);
    }
  };

  const handleChange = (event, rowIndex, colIndex) => {
    const value = event.target.value;

    if (/^[1-9]$/.test(value)) {
      const newBoard = [...board];
      newBoard[rowIndex][colIndex] = parseInt(value, 10);

      setChangeStack((prevStack) => [
        ...prevStack,
        { row: rowIndex, col: colIndex },
      ]);
      setBoard(newBoard);

      if (solution) {
        const isCorrect = solution[rowIndex][colIndex] === parseInt(value, 10);
        const cellElement = event.target;
        if (!isCorrect) {
          cellElement.classList.add("incorrect");
        } else {
          cellElement.classList.remove("incorrect");
        }
      }

      checkIfSolved(newBoard);
    }
  };

  const checkIfSolved = (newBoard) => {
    if (!solution) return;
    const isBoardSolved = newBoard.every((row, rowIndex) =>
      row.every((cell, colIndex) => cell === solution[rowIndex][colIndex])
    );
    if (isBoardSolved) {
      setIsSolved(true);
    }
  };

  const handleNumpadClick = (value) => {
    if (highlightedCell) {
      const { row, col } = highlightedCell;

      if (
        editableCells[row][col] &&
        !(hintCell && hintCell.row === row && hintCell.col === col)
      ) {
        const newBoard = [...board];
        newBoard[row][col] = parseInt(value, 10);
        setChangeStack((prevStack) => [...prevStack, { row, col }]);
        setBoard(newBoard);
        checkIfSolved(newBoard);
      }
    }
  };

  const handleUndo = () => {
    setChangeStack((prevStack) => {
      if (prevStack.length === 0) return prevStack;
      const lastChange = prevStack[prevStack.length - 1];
      const newBoard = [...board];
      newBoard[lastChange.row][lastChange.col] = 0;
      setBoard(newBoard);

      checkIfSolved(newBoard);
      return prevStack.slice(0, -1);
    });
  };

  const handleDelete = () => {
    if (highlightedCell) {
      const { row, col } = highlightedCell;

      if (
        editableCells[row][col] &&
        board[row][col] !== 0 &&
        !(hintCell && hintCell.row === row && hintCell.col === col)
      ) {
        const newBoard = [...board];
        newBoard[row][col] = 0;

        setChangeStack((prevStack) => [...prevStack, { row, col }]);
        setBoard(newBoard);
        checkIfSolved(newBoard);
      }
    }
  };

  const handleSolution = () => {
    if (solution) {
      setBoard(solution);
      setIsSolved(true);
    }
  };

  const handleNewGame = () => {
    setSolution(null);
    setHintCell(null);
    setHintCells([]);
    setIsSolved(false);

    fetch("http://127.0.0.1:5000/api/generate_new_killer_sudoku")
      .then((response) => response.json())
      .then((data) => {
        setCages(data);
      })
      .catch((error) => console.error("Error fetching data:", error));

    setBoard([
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);

    fetch("http://127.0.0.1:5000/api/killer_sudoku_solution")
      .then((response) => response.json())
      .then((solutionData) => setSolution(solutionData))
      .catch((error) =>
        console.error("Error fetching Sudoku solution:", error)
      );
  };

  return (
    <div>
      <div className="game-selection-container">
        <Sidebar />
        <div className="sudoku-container">
          <div className="sudoku-components-container">
            <div className="sudoku-controls-container">
              <div className="sudoku-board-container">
                <SudokuBoard
                  board={board}
                  highlightedCell={highlightedCell}
                  highlightedValue={highlightedValue}
                  editableCells={editableCells}
                  solution={solution}
                  hintCells={hintCells}
                  handleFocus={handleFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  cages={cages}
                />
                <button
                  type="button"
                  className="new-game-button"
                  onClick={handleNewGame}
                >
                  <i class="bi bi-plus">New game</i>
                </button>
              </div>
              <SudokuControls
                handleUndo={handleUndo}
                handleDelete={handleDelete}
                handleSolution={handleSolution}
                preventBlur={preventBlur}
                handleNumpadClick={handleNumpadClick}
                setPreventBlur={setPreventBlur}
                handleHint={handleHint}
                isSolved={isSolved}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SudokuKiller;
