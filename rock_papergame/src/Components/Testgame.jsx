import React from 'react'

export default function Testgame({sendMessage,message,setMessage}) {
  return (
    <>

 
  <input type="text" 
onChange={(e)=>setMessage(e.target.value)}

  />
  <br />
  <button onClick={()=>{sendMessage(2)}}>Send</button>
  <br />
  <h3>{message&&message}</h3>
  </>
  )
}
