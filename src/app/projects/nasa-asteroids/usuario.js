import { useState } from "react";
import Results from "./results";


function Usuario(props){

    function menu(identificador) {
        document.getElementById('start').style.backgroundColor = "white";
        document.getElementById('search').style.backgroundColor = "white";
        document.getElementById('login').style.backgroundColor = "white";
        document.getElementById('game').style.backgroundColor = "white";
        document.getElementById(identificador).style.backgroundColor = "rgb(164, 197, 235)";
        setControl(identificador);
      };
    let [control, setControl] = useState(true);
    let [fecha, setFecha] = useState(0);
    
let lista = props.data.data[0].fav.map((dato, index)=>{
    return(
        <button class="asteroidsBotonesFechas" onClick={()=>{setControl(false); setFecha(dato);}} onMouseOver={()=>{document.getElementById(index).style.backgroundColor="rgb(177, 172, 172)"}} 
        onMouseLeave={()=>{document.getElementById(index).style.backgroundColor="grey"}} id={index}>{dato}</button>
    )
})
if(control){


return(
    <div id="asteroidsListaFechas">
        <h3>Your saved searches:</h3>
    {lista}
    </div>
)
}else{
    return(
    <Results fecha={fecha} menu={menu} login={'login'} data={''}/>
    )
}
};

export default Usuario;