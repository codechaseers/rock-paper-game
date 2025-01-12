import "./gameboard.css";
import paper from "../assets/buttons/paper.png";
import paperHand1 from "../assets/action_images/paperhand_1.png";
import paperHand2 from "../assets/action_images/paperhand_2.png";
import rockhand1 from "../assets/action_images/rockhand_1.png";
import rockhand2 from "../assets/action_images/rockhand_2.png";
import SecciorHand1 from "../assets/action_images/Seccior_hand_2.3.png";
import SecciorHand2 from "../assets/action_images/Seccior_hand_2.4.png";
import ThumsUp from "../assets/action_images/thumsUp.png";
import rock from "../assets/buttons/rock.png";
import scissor from "../assets/buttons/scissor.png";
import React from "react";
import clicksound from "../assets/audio/clickSound.mp3";

import { IoPersonSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

import { useState, useEffect } from "react";

const Game = ({imageKey,player1,userAction,player2,player1Score,player2Score}) => {  

  return (
    <>
      <div className="gameboard">
        <div className="point_container">
          <div className="player1_point">
            <div className="profile">
              <i className="profile_icon">
                <IoPersonSharp   color={"white"} />
              </i>
              <i className="star_icons">
                <FaStar   color={player1Score>=1?"yellow":"white"} />
              </i> 
              <i className="star_icons">
                <FaStar  color={player1Score>=2?"yellow":"white"}  />
              </i> 
              <i className="star_icons">
                <FaStar   color={player1Score>=3?"yellow":"white"}  />
              </i>
            </div>
          </div>
          <div className="player2_point">
          <div className="profile">
         
            <i className="star_icons">
              <FaStar color={player2Score>=1?"yellow":"white"} />
            </i>{" "}
            <i className="star_icons">
              <FaStar  color={player2Score>=2?"yellow":"white"} />
            </i>{" "}
            <i className="star_icons">
              <FaStar   color={player2Score>=3?"yellow":"white"} />
            </i>
            <i className="profile_icon">
              <IoPersonSharp   color={"white"} />
            </i>
            </div>
          </div>
        </div>

        
        <div className="players">

          <div className="player1">

            {  player1 == "rock" ? (
              <img
                key={imageKey}
                className="action_image"
                src={rockhand1}
                alt=""
              />
            )  
            : player1 == "paper" ? (
              <img
                key={imageKey}
                className="action_image"
                src={paperHand1}
                alt=""
              />
            ) :
            player1 == "scissors" ? (
              <img
                key={imageKey}
                className="action_image"
                src={SecciorHand1}
                alt=""
              />
            ) : (
              <>
           
              <p className="loading-player1">Loading....</p>
              </>
            )}
          </div>
          <div className="player2">
            {  player1&&player2 == "rock" ? (
              <img
                key={imageKey}
                className="action_image"
                src={rockhand2}
                alt=""
              />
            ) :player1&& player2 == "paper" ? (
              <img
                key={imageKey}
                className="action_image"
                src={paperHand2}
                alt=""
              />
            ) : player1 && player2 == "scissors" ? (
              <img
                key={imageKey}
                className="action_image"
                src={SecciorHand2}
                alt=""
              />
            ) : (
              <>
               <p className="loading-player2">Loading....</p>
               
             
              </>
            )}

            {/* <img  className="action_image" src={paperHand2} alt="" /> */}
            {/* <img  className="action_image" src={ SecciorHand2} alt="" /> */}
          </div>
          
       </div>
{ player1==null ?
        <div className="controlars">
          <div className="control_button" onClick={() => userAction("rock")}>
            <img className="button_image" src={rock} alt="" />
          </div>
          <div className="control_button" onClick={() => userAction("paper")}>
            <img className="button_image" src={paper} alt="" />
          </div>
          <div className="control_button" onClick={() => userAction("scissors")}>
            <img className="button_image" src={scissor} alt="" />
          </div>
        </div>
        :
        <></>
}

      </div>
    </>
  );
};
export default Game;
