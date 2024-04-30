import React from 'react';

const Board = ({ boardState, canvasRef }) => {
  // Define a mapping from letters to colors
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

  return (
    <div className="board">
      {boardState.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className="cell"
              style={{ backgroundColor: letterColors[cell] || 'black' }} // Use color based on letter
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
