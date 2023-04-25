import './Arcade.css';
import Pong from './pong';
import Asteroids from './asteroids';
import {useState} from "react";

function ArcadeGames() {
  let [control, setControl] = useState("inicio");
  if(control == "inicio"){
    return(
      <div id='arcadeCuadro'>
      <button onClick={()=>{setControl("bolas")}}>Pong</button>
      <button onClick={()=>{setControl("asteroids")}}>Asteroids</button>
      </div>
    )
  }else if(control == "bolas"){
    return (
      <div id='arcadeCuadro'>
      <button onClick={()=>{setControl("inicio")}}>volver</button>
      <Pong/>
      </div>
    )
  }else if(control == "asteroids"){
    return (
      <div id='arcadeCuadro'>
      <button onClick={()=>{setControl("inicio")}}>volver</button>
      <Asteroids/>
      </div>
    )
  }
}

export default ArcadeGames;
