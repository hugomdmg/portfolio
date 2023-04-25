import './Asteroids.css';
import { useState } from 'react';
import Cabecera from './header';
import Busqueda from './search';
import Results from './results';
import Login from './login';
import Esfera from './esfera';
import Asteroids from './asteroids';



function NasaAsteroids() {
  let [control, setControl] = useState('start');
  let [fecha, setFecha] = useState('');
  let [data, setData] = useState('');
  let [login, setLogin] = useState('login');
  function menu(identificador) {
    document.getElementById('start').style.backgroundColor = "white";
    document.getElementById('search').style.backgroundColor = "white";
    document.getElementById('login').style.backgroundColor = "white";
    document.getElementById('game').style.backgroundColor = "white";
    document.getElementById(identificador).style.backgroundColor = "rgb(164, 197, 235)";
    setControl(identificador);
  };

  if (control == 'start') {
    return (
      <div id='asteroidsAsteroides-cities'>
        <Cabecera menu={menu} login={login} />
        <div id="asteroidsEspacio"></div>
        <main id='asteroidsContenido'>
          <p id='asteroidsParrafo'>Every day NASA discovers several huge fucking rocks that could kill us all. On this page you can select any date, and of all the fucking space rocks NASA found that day, the largest will be shown on the screen. You can choose a city to compare its size and verify that indeed we would be screwed if that shit falls on us, enjoy friend.</p>
          <p>We use the official data that NASA offers in its public access APIs, if someone has made a mistake, it has been them, we are good people here.</p>
          <Esfera control={control} />
        </main>
      </div>
    );
  } else if (control == 'search') {
    return (
      <div id='asteroidsAsteroides-cities'>
        <Cabecera menu={menu} login={login} />
        <div id="asteroidsEspacio"></div>
        <Busqueda funcion={setFecha} menu={menu} data={data} setData={setData} />

      </div>
    )
  } else if (control == 'results') {
    return (
      <div id='asteroidsAsteroides-cities'>
        <Cabecera menu={menu} login={login} />
        <div id="asteroidsEspacio"></div>
        <Results fecha={fecha} menu={menu} login={login} data={data} setData={setData} />
      </div>
    )
  }
  else if (control == 'login') {
    return (
      <div id='asteroidsAsteroides-cities'>
        <Cabecera menu={menu} login={login} />
        <div id="asteroidsEspacio"></div>
        <Login setData={setData} setLogin={setLogin} login={login} data={data} />
      </div>
    )
  }
  else if (control == 'game') {
    return (
      <div id='asteroidsAsteroides-cities'>
        <Cabecera menu={menu} login={login} />
        <div id="asteroidsEspacio"></div>
        <div id='asteroidsCuadroAsteroids'>
          <Asteroids control={control} />
        </div>
      </div>
    )
  }


}

export default NasaAsteroids;
