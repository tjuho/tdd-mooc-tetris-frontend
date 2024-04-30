import React, { useState, useEffect, useRef } from 'react';
import TetrisCanvas from './TetrisCanvas'; // Import the TetrisCanvas component
import Score from './Score';
import { Board as TetrisBoard } from 'backend/Board'; // Import your Board class

const TetrisGame = () => {
  const width = 5;
  const height = 10;
  const [board, setBoard] = useState(new TetrisBoard(5, 10));
  const [score, setScore] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Handle user input
  useEffect(() => {
    const handleKeyPress = (event) => {
      const presses = ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
      if (presses.includes(event.code)){
        if (event.code === 'ArrowLeft') {
          board.moveLeft();
        } else if (event.code === 'ArrowRight') {
          board.moveRight();
        } else if (event.code === 'ArrowDown') {
          board.moveDown();
        } else if (event.code === 'ArrowUp') {
          board.rotateRight();
        }
        setBoard(board);
     }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [board]);

  // Game loop
  useEffect(() => {
    const interval = setInterval(() => {
      board.tick();
      setBoard(new TetrisBoard(board.width, board.height)); // Create a new instance of TetrisBoard
      setScore(score + 1); // Update score (you can implement actual scoring logic)
    }, 1000);

    return () => clearInterval(interval);
  }, [board, score]);

  return (
    <div className="tetris-game">
      {/* Pass canvasRef to TetrisCanvas component */}
      <TetrisCanvas 
        boardState={board.boardState} 
        // canvasRef={canvasRef}
        width={width} 
        height={height}/>
      <Score score={score} />
    </div>
  );
};

export default TetrisGame;