import { useState } from "react";
import Startpoint from "./Startpoint";

const Resuletboard = ({setResuletStatus,resuletStatus,player1Score,player2Score,setPlayer1Score,setPlayer2Score,SetMultiplayerMode}) => {

let [manu ,setManu]=useState(false)

  return (
   
    <> 
    {manu?<Startpoint/>:

      <div className="resuletboard">
        <h2 className="scoreboard_heading">Score Board</h2>
        <div className="scoreboad">
            <div className="player1_socre">
                <p className="score_details">Player 1</p>
            </div>
            <div className="score">
                <p className="score_details" id="score_resulet">{player1Score}:{player2Score}</p>
            </div>
            <div className="player2_socre">
            <p className="score_details">Player 2</p>
            </div>
        </div>
        

        <button className="playagain" onClick={()=>{setResuletStatus(false),setPlayer1Score(0),setPlayer2Score(0)}}>Play Again</button> 
          <button className="playagain" onClick={()=>{ setPlayer1Score(0),setPlayer2Score(0), setManu(true) }}>Back To Manu</button>
       
      </div>
}
    </> 
  );
};
export default Resuletboard;
