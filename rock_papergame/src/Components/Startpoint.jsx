import React from "react";
import Gamelogic from "./GameLogic";
import { useState } from "react";
import Multiplayer from "./Multiplayer";

function Startpoint() {
  const [multiplayerMode, SetMultiplayerMode] = useState(0);

  return (
    <>
      {multiplayerMode == 0 && (
        <div className="resuletboard">
          <button className="playagain" onClick={() => SetMultiplayerMode(1)}>
            Play With Friend
          </button>
          <button className="playagain" onClick={() => SetMultiplayerMode(2)}>
            Play With Robot
          </button>
        </div>
      )}
      {multiplayerMode == 1 && (
        <Multiplayer
          multiplayerMode={multiplayerMode}
          SetMultiplayerMode={SetMultiplayerMode}
        />
      )}

      {multiplayerMode == 2 && <Gamelogic mode={"robot"}/>}
    </>
  );
}

export default Startpoint;
