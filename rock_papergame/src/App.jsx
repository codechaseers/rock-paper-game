import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './assets/background/background.jpg'
import Gameboard from './Components/Gmaeboard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <Gameboard></Gameboard>
       
    </>
  )
}

export default App
