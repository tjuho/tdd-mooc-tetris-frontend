import React, { useEffect, useRef } from 'react';

const TetrisCanvas = ({ boardState, width, height }) => {
  const canvasRef = useRef(null);
  const cellSize = 20; // Adjust the cell size as needed

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const letterColors = {
      '.': 'black', // Empty cell color
      'T': 'purple', // Letter 'T' color
      'I': 'cyan', // Letter 'I' color
      'O': 'yellow', // Letter 'O' color
      'S': 'green', // Letter 'S' color
      'Z': 'red', // Letter 'Z' color
      'L': 'orange', // Letter 'L' color
      'M': 'blue', // Letter 'M' color
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each cell based on the board state
    for (let y = 0; y < boardState.length; y++) {
      for (let x = 0; x < boardState[y].length; x++) {
        const cellValue = boardState[y][x];
        const color = letterColors[cellValue] || 'black';

        ctx.fillStyle = color;
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
    console.log('Board State:', boardState);
  }, [boardState]);

  return <canvas ref={canvasRef} 
    width={width*cellSize}
    height={height*cellSize}
    // style={{ border: "2px solid black" }}
  />;
};

export default TetrisCanvas;
