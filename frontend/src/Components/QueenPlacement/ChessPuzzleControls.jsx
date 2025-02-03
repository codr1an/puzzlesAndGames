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
    <div className="queen-controls-container">
      <div className="queen-title">
        <h1>{title}</h1>
      </div>
      <div className="queen-description">
        <h2>Instructions</h2>
        <p>{description}</p>
        {instructions &&
          instructions.map((step, index) => <p key={index}>{step}</p>)}
      </div>
      <div className="queen-moves">
        <h2>Moves</h2>
        {moves && <p>{moves}</p>}
      </div>
      <div className="queen-buttons">
        <button className="queen-button" onClick={resetHandler}>
          Reset
        </button>
        <button className="queen-button" onClick={solveHandler}>
          Solve
        </button>
      </div>
    </div>
  );
};

export default ChessPuzzleControls;
