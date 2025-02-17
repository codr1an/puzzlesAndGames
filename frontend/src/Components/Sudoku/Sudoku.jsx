import { useState, useEffect } from "react";
import "./Sudoku.css";
import Sidebar from "../Home/Sidebar";
import SudokuControls from "./SudokuControls";

const Sudoku = () => {
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

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/sudokus/current")
      .then((response) => response.json())
      .then((data) => {
        setBoard(data);

        const initialEditableCells = data.map((row) =>
          row.map((cell) => cell === 0)
        );
        setEditableCells(initialEditableCells);

        fetch("http://127.0.0.1:5000/api/sudokus/current/solution")
          .then((response) => response.json())
          .then((solutionData) => setSolution(solutionData))
          .catch((error) =>
            console.error("Error fetching Sudoku solution:", error)
          );
      })
      .catch((error) => {
        console.error("Error fetching Sudoku board:", error);
      });
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
    handleUpdateBoard();
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
          handleUpdateBoard();
        }
      }

      checkIfSolved(newBoard);
    }
  };

  const checkIfSolved = (newBoard) => {
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

  const handleDifficultyChange = (difficulty) => {
    setSolution(null);
    setHintCell(null);
    setHintCells([]);
    setIsSolved(false);

    fetch("http://127.0.0.1:5000/api/sudokus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ difficulty: difficulty }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBoard(data);

        const newSudokuCells = data.map((row) => row.map((cell) => cell === 0));
        setEditableCells(newSudokuCells);

        fetch("http://127.0.0.1:5000/api/sudokus/current/solution")
          .then((response) => response.json())
          .then((solutionData) => setSolution(solutionData))
          .catch((error) =>
            console.error("Error fetching Sudoku solution:", error)
          );
      })
      .catch((error) => {
        console.error("Error fetching Sudoku board:", error);
      });
  };

  const handleUpdateBoard = () => {
    fetch("http://127.0.0.1:5000/api/sudokus", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ board: board }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error fetching Sudoku board:", error);
      });
  };

  const handleSolution = () => {
    if (solution) {
      setBoard(solution);
      setIsSolved(true);
    }
  };

  const renderBoard = (board) => {
    return (
      <div className="sudoku-grid">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => {
              const isHighlighted =
                highlightedCell &&
                (highlightedCell.row === rowIndex ||
                  highlightedCell.col === colIndex ||
                  (Math.floor(rowIndex / 3) ===
                    Math.floor(highlightedCell.row / 3) &&
                    Math.floor(colIndex / 3) ===
                      Math.floor(highlightedCell.col / 3)));

              const isSameValue =
                highlightedValue !== null && cell === highlightedValue;
              const isEditable = editableCells[rowIndex][colIndex];
              const isIncorrect =
                solution && cell !== 0 && cell !== solution[rowIndex][colIndex];
              const isHint = hintCells.some(
                (hint) => hint.row === rowIndex && hint.col === colIndex
              );

              return (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  className={`sudoku-cell ${isHighlighted ? "highlight" : ""} 
                ${isSameValue ? "value-highlight" : ""} 
                ${isEditable ? "user-added" : ""} 
                ${isIncorrect ? "incorrect" : ""} 
                ${isHint ? "hint" : ""}`}
                  type="text"
                  maxLength="1"
                  value={cell !== 0 ? cell : ""}
                  readOnly={!isEditable || isHint}
                  onFocus={() => handleFocus(rowIndex, colIndex)}
                  onBlur={handleBlur}
                  onChange={(event) => handleChange(event, rowIndex, colIndex)}
                />
              );
            })}
          </div>
        ))}
      </div>
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
                {renderBoard(board)}
                <div class="dropdown">
                  <a
                    class="btn btn-success dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="bi bi-plus">New game</i>
                  </a>

                  <ul class="dropdown-menu">
                    <li>
                      <a
                        class="dropdown-item"
                        onClick={() => handleDifficultyChange("easy")}
                      >
                        Easy
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        onClick={() => handleDifficultyChange("hard")}
                      >
                        Hard
                      </a>
                    </li>
                  </ul>
                </div>
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

export default Sudoku;
