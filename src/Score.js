import React from 'react';

const Score = ({ score, level }) => {
  return (
    <div>
      <div className="score">Level:{level} Score:{score}</div>
    </div>
  )
};

export default Score;
