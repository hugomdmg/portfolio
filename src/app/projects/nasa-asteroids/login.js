import { useState } from "react";
import Usuario from './usuario';
let url = 'https://asteroidsizeserver.herokuapp.com/';


function Login(props) {
  let [control, setControl] = useState(true);
  let [mensaje, setMensaje] = useState();

  function registroDatos(emailId, pw1Id, pw2Id){
    let email = document.getElementById(emailId).value;
    let pw1 = document.getElementById(pw1Id).value;

    if(pw2Id === true){ //para entrar como usuario registrado
        fetch(`${url}usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                email: email,
                password: pw1,
            })
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            props.setData(data);
            props.setLogin('me');
        })
    }else{  //para registrarse como usuario nuevo
        let pw2 = document.getElementById(pw2Id).value;
        if(pw1 !== pw2 || pw1 == ''){
            setMensaje('wrong password, try again');
            setTimeout(()=>{ setMensaje('')}, [2000]);
        }else if(pw2Id !== true){
            fetch(`${url}usuarios/registro`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: email,
                  password: pw1,
                }),
              }).then((res)=>{
                return res.json();
              }).then((data)=>{
                setMensaje(data.estado);
            setTimeout(()=>{ setMensaje(''); setControl(true)}, [2000]);
            });
        }
    }
}


  
    if(props.login == 'me'){
      return(
        <>
        <Usuario data={props.data}/>
        </>
      )
    }else if (control) {
    return (
      <div id="asteroidsContenedorCuadroLogin">
        <div id="asteroidsCuadroLogin" class='asteroidsCuadroSearch'>
          <p>Email:</p>
          <input type="email" id="email" className="asteroidsInput"/>
          <p>Password:</p>
          <input type="password" id="password" className="asteroidsInput"/>
          <div id="botonesLogin">
            <button id="botonLogin" onClick={()=>{registroDatos('email', 'password', true);}}>login</button>
            <p>or</p>
            <button
              id="botonRegistro"
              onClick={() => {
                setControl(false);
              }}
            >
              register
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div id="asteroidsContenedorCuadroLogin">
        <div id="asteroidsCuadroLogin">
          <p>Email:</p>
          <input type="email" id="email" className="asteroidsInput"/>
          <p>Password:</p>
          <input type="password" id="password1" className="asteroidsInput"/>
          <p>repeat password:</p>
          <input type="password" id="password2" className="asteroidsInput"/>
          
            <button
              onClick={() => {
                setControl(false);
                registroDatos('email', 'password1', 'password2');
              }}
            >
              register
            </button>
            <p>{mensaje}</p>
          
        </div>
      </div>
    );
  }
}

export default Login;
