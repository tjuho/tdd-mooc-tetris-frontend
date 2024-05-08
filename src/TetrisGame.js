import React, { useState, useEffect } from "react";
import TetrisCanvas from "./TetrisCanvas"; // Import the TetrisCanvas component
import Score from "./Score";
import Guide from "./Guide";
import { Board as TetrisBoard } from "backend/Board"; // Import your Board class
import { Score as TetrisScore } from "backend/Score"; // Import your Score class
import { MyShuffleBag } from "backend/MyShuffleBag";
import { Tetromino } from "backend/Tetromino.mjs";

const TetrisGame = () => {
  const width = 10;
  const height = 20;
  const [tetrisBoard, setTetrisBoard] = useState(
    new TetrisBoard(width, height)
  );
  // const [tetrisShuffleBag, setTetrisShuffleBag] = useState(
    // new MyShuffleBag(tetrominoes)
  // );
  const [tetrisShuffleBag, setTetrisShuffleBag] = useState(null);
  const [tetrisScore, setTetrisScore] = useState(new TetrisScore());

  const [boardState, setBoardState] = useState(tetrisBoard.getState());
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  useEffect(() => {
    const handleKeyPress = (event) => {
      const presses = ["KeyA", "KeyD", "KeyS", "KeyE", "KeyQ", "Space"];
      if (presses.includes(event.code)) {
        if (event.code === "KeyA") {
          tetrisBoard.moveLeft();
        } else if (event.code === "KeyD") {
          tetrisBoard.moveRight();
        } else if (event.code === "KeyS") {
          tetrisBoard.moveDown();
        } else if (event.code === "KeyE") {
          tetrisBoard.rotateRight();
        } else if (event.code === "KeyQ") {
          tetrisBoard.rotateLeft();
        } else if (event.code === "Space") {
          tetrisBoard.fallDown();
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
        if (!tetrisBoard.hasFalling()) {
          tetrisBoard.drop(tetrisShuffleBag.getRandomObject());
        }
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
    tetrisBoard.addGameOverObserver(gameOverObserver);
    const temp = new TetrisScore()
    tetrisBoard.addRowObserver(temp);
    setTetrisScore(temp);
    const tetrominoes = [
      ...Array(10).fill(Tetromino.T_SHAPE),
      ...Array(10).fill(Tetromino.I_SHAPE),
      ...Array(10).fill(Tetromino.O_SHAPE),
      ...Array(10).fill(Tetromino.S_SHAPE),
      ...Array(10).fill(Tetromino.Z_SHAPE),
      ...Array(10).fill(Tetromino.L_SHAPE),
      ...Array(10).fill(Tetromino.M_SHAPE),
    ];
    setTetrisShuffleBag(new MyShuffleBag(tetrominoes));
    return () => {
      tetrisBoard.removeGameOverObservers();
      tetrisBoard.removeRowObservers();
      console.log("remove go observers");
    };
  }, [tetrisBoard]);

  // new game -> new shufflebag and reset score
  useEffect(() => {
    if (gameOver) {
      console.log("reset board");
      setTetrisBoard(new TetrisBoard(width, height));
      setGameOver(false);
    }
    return () => {
    };
  }, [gameOver]);

  return (
    <div className="tetris-game">
      <TetrisCanvas boardState={boardState} width={width} height={height} />
      <Score score={score} level={level} />
      <Guide />
    </div>
  );
};

export default TetrisGame;
