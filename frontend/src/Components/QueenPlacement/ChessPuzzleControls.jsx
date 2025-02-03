import React from "react";

const ChessPuzzleControls = ({
  title,
  description,
  instructions,
  moves,
  resetHandler,
  solveHandler,
}) => {
  return (
    <div className="chess-controls-container">
      <div className="chess-puzzle-title">
        <h1>{title}</h1>
      </div>
      <div className="chess-puzzle-description">
        <h2>Instructions</h2>
        <p>{description}</p>
        {instructions &&
          instructions.map((step, index) => <p key={index}>{step}</p>)}
      </div>
      <div className="chess-puzzle-moves-container">
        <h2>Moves</h2>
        <div className="chess-puzzle-moves">
          {moves && (
            <ol>
              {moves.split(", ").map((move, index) => (
                <li key={index}>{move}</li>
              ))}
            </ol>
          )}
        </div>
      </div>
      <div className="info-message-container">
        <div className="info-message">
          <p>No solution found for current board</p>
        </div>
      </div>

      <div className="chess-puzzle-buttons">
        <button className="chess-reset-button" onClick={resetHandler}>
          Reset
        </button>
        <button className="chess-solve-button" onClick={solveHandler}>
          Solve
        </button>
      </div>
    </div>
  );
};

export default ChessPuzzleControls;
