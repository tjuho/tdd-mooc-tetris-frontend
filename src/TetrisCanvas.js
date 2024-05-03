import React, { useEffect, useRef } from 'react';

const TetrisCanvas = ({ boardState, width, height }) => {
  const canvasRef = useRef(null);
  const cellSize = 20;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const letterColors = {
      '.': 'grey', 
      'T': 'orange', 
      'I': 'blue', 
      'O': 'cyan', 
      'S': 'green', 
      'Z': 'red', 
      'L': 'purple', 
      'M': 'yellow', 
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let r = 0; r < boardState.length; r++) {
      for (let c = 0; c < width; c++) {
        const cellValue = boardState[r][c];
        const color = letterColors[cellValue];
        ctx.fillStyle = color;
        ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
    }
  }, [boardState, width, height, cellSize]);

  return <canvas ref={canvasRef} 
    width={width*cellSize}
    height={height*cellSize}
  />;
};

export default TetrisCanvas;
