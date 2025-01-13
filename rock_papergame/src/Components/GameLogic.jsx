import Game from "./Game";
import Resuletboard from "./Resuletboard";
import clicksound from "../assets/audio/clickSound.mp3";
import pointsound from "../assets/audio/point.mp3";
import pointLosssound from "../assets/audio/pointLoss.mp3";

import { useState, useEffect } from "react";

const Gamelogic = ({
  mode,
  sendMessage,
  message,
  SetMultiplayerMode,
  setMessage,
}) => {
  let [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  let [player1Score, setPlayer1Score] = useState(0);
  let [player2Score, setPlayer2Score] = useState(0);
  const [resuletStatus, setResuletStatus] = useState(false);

  const [imageKey, setImageKey] = useState(Date.now());

  let robatChoice;
  useEffect(() => {
    setPlayer2(message);
  }, [message]);
  //check winer logic
  const userAction = (value) => {
    setPlayer1(value);

    if (mode == "robot") {
      robatChoice = Math.floor(Math.random() * (4 - 1) + 1);
      setPlayer2(
        robatChoice == 1
          ? "rock"
          : robatChoice == 2
          ? "paper"
          : robatChoice == 3
          ? "scissors"
          : null
      );
    }

    if (mode == "friend") {
      sendMessage(value);
    }

    new Audio(clicksound).play();
  };

  const checkWiner = () => {
    const rules = {
      rock: "scissors",
      scissors: "paper",
      paper: "rock",
    };
    if (player1 === player2) {
      setTimeout(() => {
        setPlayer1(null);
        setPlayer2(null);
        setMessage(null);
      }, 2000);
    } else if (rules[player1] === player2) {
      // console.log("player 1 win");
      new Audio(pointsound).play();

      setPlayer1Score((prevScore) => prevScore + 1);

      setTimeout(() => {
        setPlayer1(null);
        setPlayer2(null);
        setMessage(null);
      }, 2000);
    } else {
      new Audio(pointLosssound).play();
      // console.log("player 2 win");

      setPlayer2Score((prevScore) => prevScore + 1);

      setTimeout(() => {
        setPlayer1(null);
        setPlayer2(null);
        setMessage(null);
      }, 2000);
      // return "player1";
    }
  };

  //Game over Logic
  const gameOver = () => {
    if (player1Score == 3 || player2Score == 3) {
      
      setTimeout(() => {
        // setPlayer1Score(0)
        // setPlayer2Score(0)
        setResuletStatus(true);
      }, 1000);
    }
  };

  // console.log("player1", player1);
  // console.log("player2", player2);
  // console.log("message", message);

  useEffect(() => {
    if (player1 && player2) {
      checkWiner(player1, player2);
    }
  }, [player2, player1]);

  useEffect(() => {
    gameOver();
  });

  // Effect to update key whenever player1 changes
  // useEffect(() => {
  //   setImageKey(Date.now()); // Set a new key using the current timestamp
  //   // console.log(Date.now());
  // });
  // console.log(message);
  return (
    <>
      {resuletStatus ? (
        <Resuletboard
          player1Score={player1Score}
          player2Score={player2Score}
          resuletStatus={resuletStatus}
          setResuletStatus={setResuletStatus}
          setPlayer1Score={setPlayer1Score}
          setPlayer2Score={setPlayer2Score}
          SetMultiplayerMode={SetMultiplayerMode}
        />
      ) : (
        <Game
          player1Score={player1Score}
          player2Score={player2Score}
          player1={player1}
          player2={player2}
          userAction={userAction}
          imageKey={imageKey}
        />
      )}
    </>
  );
};
export default Gamelogic;
