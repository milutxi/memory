import React from "react";
import "./GameOver.css";

const GameOver = ({ onRestart }) => {
  return (
    <div className="game-over">
      <h5>Time Finished</h5>
      <h1>Game Over</h1>
      <button onClick={onRestart}>Restart Game</button>
    </div>
  );
};

export default GameOver;
