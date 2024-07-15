import Game from "./Game";
import Resuletboard from "./Resuletboard";
import clicksound from "../assets/audio/clickSound.mp3";
import pointsound from "../assets/audio/point.mp3";
import { useState, useEffect } from "react";

const Gamelogic = ({mode,sendMessage,message}) => {
  let [player1, setPlayer1] = useState(1);
  const [player2, setPlayer2] = useState(1);
  let [player1Score, setPlayer1Score] = useState(0);
  let [player2Score, setPlayer2Score] = useState(0);
  const [resuletStatus, setResuletStatus] = useState(false);

  const [imageKey, setImageKey] = useState(Date.now());

  let robatChoice;
 
  const userAction = (value) => {
    setPlayer1(value);
    if(mode=="robot"){
      robatChoice = Math.floor(Math.random() * (4 - 1) + 1);
      setPlayer2(robatChoice);
    }
    if(mode=="friend"){
      sendMessage(value)
      setPlayer2(message);
    }
   

    new Audio(clicksound).play();
  };

  const checkWiner = () => {
    if (
      (player1 == 1 && player2 == 3) ||
      (player1 == 2 && player2 == 1) ||
      (player1 == 3 && player2 == 2)
    ) {
      console.log("player 1 win");
      new Audio(pointsound).play();

      setPlayer1Score((prevScore) => prevScore + 1);
     

      // setTimeout(() => {
      //   setPlayer1(1);
      //   setPlayer2(1);
      // }, 1000);
    }   if (
      (player2 == 1 && player1 == 3) ||
      (player2 == 2 && player1 == 1) ||
      (player2 == 3 && player1 == 2)
    ) {
      new Audio(pointsound).play();   

      setPlayer2Score((prevScore) => prevScore + 1);
      
    }
  };

  const gameOver=()=>{
    if(player1Score==3||player2Score==3){
      setTimeout(()=>{
        // setPlayer1Score(0)
        // setPlayer2Score(0)
        setResuletStatus(true)
      },1000)
    }
  }
  useEffect(() => {
    checkWiner();
    

  }, [player2,player1]);
  useEffect(()=>{
    gameOver()
  })

  // Effect to update key whenever player1 changes
  useEffect(() => {
    setImageKey(Date.now()); // Set a new key using the current timestamp
    // console.log(Date.now());
  });
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
