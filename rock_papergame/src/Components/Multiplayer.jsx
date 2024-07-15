import React from "react";
import { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import Testgame from "./Testgame";
import Gamelogic from "./GameLogic";

export default function Multiplayer({ SetMultiplayerMode, multiplayerMode }) {
  const [ownId, SetOwnId] = useState("");
  const [coonectionStatus, SetCoonectionStatus] = useState(false);
  const [roomID, setRoomID] = useState("");
  const [gameStatus, setGameStatus] = useState("");
  const [message, setMessage] = useState(1);

  // const socket = useMemo(() => io("http://localhost:8000"), []);
  const socket = useMemo(() => io("https://rock-paper-game-alpha.vercel.app/"), []);
  console.log(socket)
  

  useEffect(() => {
    // Listener for receiving own ID
    socket.on("id", (id) => {
      SetOwnId(id);
      console.log("own " + id);
    });

    // Listener for receiving messages indicating friend's ID/connection
    // socket.on("resiveMessage", (fid) => {
    //   console.log(`friends id is ${fid}`);
    //   if (fid.length > 0) {
    //     SetCoonectionStatus(true);
    //   }
    // });

    // Listener for the game start event
    socket.on("gameStart", (m) => {
      console.log(m); // Ensure this is being logged
      setGameStatus(m);
    });

    socket.on("resiveMessage", (m) => {
      setMessage(m);
    });
    socket.on("RoomCreated",(m)=>{
      alert(m)
    })
    // Cleanup function to remove event listeners when the component unmounts or dependencies change
    return () => {
      // socket.off("id");
      // socket.off("resiveMessage");
      // socket.off("gameStart");
    };
  }, [socket]); // Depend on the socket instance so this effect hook runs again if the socket instance changes

  const checkConnection = () => {
    if (roomID) {
      socket.emit("createOrJoinRoom", roomID);
    } else {
      alert("Please enter a room ID.");
    }
  };

  // Test game Checking
  const sendMessage = (choice) => {
    socket.emit("choice", choice, roomID);
    console.log(choice);
    // setMessage('');
  };

  return (
    <>
      {coonectionStatus ? <h2>Connected</h2> : null}

      {gameStatus.length > 0 ? (
        // <Testgame
        //   setMessage={setMessage}
        //   message={message}
        //   sendMessage={sendMessage}
        // />
        <Gamelogic
        mode={"friend"}
        sendMessage={sendMessage}
        message={message}
        SetMultiplayerMode={SetMultiplayerMode  }/>
      ) : (
        <div className="resuletboard">
          <div className="connection_container">
            <h2 className="idHeading">Create or Paste Your Friend's Room </h2>
            <input
              type="text"
              value={roomID}
              onChange={(e) => setRoomID(e.target.value)}
              className="idField"
            />
            <button className="button" onClick={checkConnection}>
              Creat/Join
            </button>
            <button className="button" onClick={() => SetMultiplayerMode(0)}>
              Back
            </button>
          </div>
        </div>
      )}
    </>
  );
}
