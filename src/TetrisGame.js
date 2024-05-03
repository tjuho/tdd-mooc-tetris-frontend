import React, { useState, useEffect } from "react";
import TetrisCanvas from "./TetrisCanvas"; // Import the TetrisCanvas component
import Score from "./Score";
import { Board as TetrisBoard } from "backend/Board"; // Import your Board class
import { Score as TetrisScore } from "backend/Score"; // Import your Score class
import { MyShuffleBag } from "backend/MyShuffleBag";
import { Tetromino } from "backend/Tetromino.mjs";

const TetrisGame = () => {
  const width = 5;
  const height = 10;
  const tetrominoes = [
    ...Array(10).fill(Tetromino.T_SHAPE),
    ...Array(10).fill(Tetromino.I_SHAPE),
    ...Array(10).fill(Tetromino.O_SHAPE),
    ...Array(10).fill(Tetromino.S_SHAPE),
    ...Array(10).fill(Tetromino.Z_SHAPE),
    ...Array(10).fill(Tetromino.L_SHAPE),
    ...Array(10).fill(Tetromino.M_SHAPE),
  ];
  const [tetrisBoard, setTetrisBoard] = useState(
    new TetrisBoard(width, height)
  );
  const [tetrisShuffleBag, setTetrisShuffleBag] = useState(
    new MyShuffleBag(tetrominoes)
  );
  const [tetrisScore, setTetrisScore] = useState(new TetrisScore());

  const [boardState, setBoardState] = useState(tetrisBoard.getState());
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  useEffect(() => {
    const handleKeyPress = (event) => {
      const presses = ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"];
      if (presses.includes(event.code)) {
        if (event.code === "ArrowLeft") {
          tetrisBoard.moveLeft();
        } else if (event.code === "ArrowRight") {
          tetrisBoard.moveRight();
        } else if (event.code === "ArrowDown") {
          tetrisBoard.moveDown();
        } else if (event.code === "ArrowUp") {
          tetrisBoard.rotateRight();
        }
        setBoardState(tetrisBoard.getState());
      }
    };
    // console.log('add event listener')
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      // console.log('remove event listener')
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [tetrisBoard]);

  // Game loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (tetrisBoard.hasFalling()) {
        // console.log("tick");
        tetrisBoard.tick();
      } else {
        tetrisBoard.drop(tetrisShuffleBag.getRandomObject());
        // console.log("drop");
      }
      setBoardState(tetrisBoard.getState());
      // tetrisScore.score +=1000
      setScore(tetrisScore.score);
      setLevel(tetrisScore.level);
    // }, 2000);
  }, 2000/(level+1));   
    return () => {
      clearInterval(interval);
      // console.log("clear interval");
    };
  }, [level, tetrisBoard, tetrisScore.level, tetrisScore.score, tetrisShuffleBag]);

  // adds game over listener
  useEffect(() => {
    const gameOverObserver = { 
      update: function(isOver) {
        console.log('set game over', isOver)
        setGameOver(isOver);
      }
    };
    console.log('reset go and score obs')
    tetrisBoard.addGameOverObserver(gameOverObserver);
    const temp = new TetrisScore()
    tetrisBoard.addRowObserver(temp);
    setTetrisScore(temp);
    setTetrisShuffleBag(new MyShuffleBag(tetrominoes));
    return () => {
      tetrisBoard.removeGameOverObservers();
      tetrisBoard.removeRowObservers();
      console.log("remove go observers");
    };
  }, [tetrisBoard], tetrominoes);

  // new game -> new shufflebag and reset score
  useEffect(() => {
    if (gameOver) {
      console.log("reset board");
      setTetrisBoard(new TetrisBoard(width, height));
      setGameOver(false);
    }
    return () => {
    };
  }, [gameOver, tetrominoes]);

  return (
    <div className="tetris-game">
      <TetrisCanvas boardState={boardState} width={width} height={height} />
      <Score score={score} level={level} />
    </div>
  );
};

export default TetrisGame;
