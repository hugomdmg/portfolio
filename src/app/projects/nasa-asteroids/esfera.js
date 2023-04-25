import React, { useRef, useEffect } from "react";
import continentes1 from "./continentes";

let puntosCartesianos = [];
let puntosRotados = [];
let puntosProyectados = [];
let continentes = [];
let puntosProyectadosViajes = [];
let puntos = [];

function linearContientes() {
  continentes = [];
  for (let i = 0; i < continentes1.length; i++) {
    continentes.push({
      latitud: (-continentes1[i].lat * Math.PI) / 180 + Math.PI / 2,
      longitud: (-continentes1[i].lon * Math.PI) / 180,
      id: "continentes",
    });
  }
}
linearContientes();


function lineas() {
  puntos = [];
  for (let i = 0; i < 1; i = i + 0.25) {
    for (let j = 0; j < 2; j = j + 0.01) {
      puntos.push({
        longitud: i * Math.PI,
        latitud: j * Math.PI,
        id: "lineas",
      });
    }
  }
  for (let i = 0; i < 3; i = i + Math.PI / 8) {
    for (let j = 0; j < 2; j = j + 0.01) {
      puntos.push({ longitud: j * Math.PI, latitud: i, id: "lineas" });
    }
  }
}

lineas();
function cartesianas() {
  puntosCartesianos = [];
  for (let i = 0; i < puntos.length; i++) {
    puntosCartesianos.push({
      x: Math.sin(puntos[i].latitud) * Math.cos(puntos[i].longitud),
      y: Math.sin(puntos[i].latitud) * Math.sin(puntos[i].longitud),
      z: Math.cos(puntos[i].latitud),
      id: puntos[i].id,
    });
  }
  for (let i = 0; i < continentes.length; i++) {
    puntosCartesianos.push({
      x: Math.sin(continentes[i].latitud) * Math.cos(continentes[i].longitud),
      y: Math.sin(continentes[i].latitud) * Math.sin(continentes[i].longitud),
      z: Math.cos(continentes[i].latitud),
      id: continentes[i].id,
    });
  }
}

cartesianas();
//------------------------------------------


function rotary(alfa) {
  puntosRotados = puntosCartesianos.map((punto) => {
    let puntos = {
      x: Math.cos(alfa) * punto.x - Math.sin(alfa) * punto.z,
      y: punto.y,
      z: Math.sin(alfa) * punto.x + Math.cos(alfa) * punto.z,
      id: punto.id,
    };
    return puntos;
  });
  puntosCartesianos = puntosRotados;
  proyectar();
}

function rotarx(alfa) {
  puntosRotados = puntosCartesianos.map((punto) => {
    let puntos = {
      x: punto.x,
      y: Math.cos(alfa) * punto.y - Math.sin(alfa) * punto.z,
      z: Math.sin(alfa) * punto.y + Math.cos(alfa) * punto.z,
      id: punto.id,
    };
    return puntos;
  });
  puntosCartesianos = puntosRotados;
  proyectar();
}

rotarx(Math.PI/2)

function proyectar() {
  puntosProyectados = [];
  puntosProyectadosViajes = {superficie:[],aire:[]};
  for (let i = 0; i < puntosCartesianos.length; i++) {
    if (
      puntosCartesianos[i].z >= -0.1
    ) {
      puntosProyectados.push({
        x: 200 * puntosCartesianos[i].x + 250,
        y: 200 * puntosCartesianos[i].y + 250,
        id: puntosCartesianos[i].id,
      });
      if(puntosCartesianos[i].id == 'viajes'){
        puntosProyectadosViajes.superficie.push({
          x: 200 * puntosCartesianos[i].x + 250,
          y: 200 * puntosCartesianos[i].y + 250,
          id: puntosCartesianos[i].id,
        });
        puntosProyectadosViajes.aire.push({
          x: 240 * puntosCartesianos[i].x + 250,
          y: 240 * puntosCartesianos[i].y + 250,
          id: puntosCartesianos[i].id,
        });
      }
    }
  }
}

//-------------------------------------------

function Esfera(props) {

  const canvasRef = useRef(null);

  const draw = (ctx) => {
      rotary(0.008);
      rotarx(-0.003);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    //relleno del planeta
    for (let i = 0; i < 2 * Math.PI; i = i + 0.04) {
      ctx.beginPath();
      ctx.strokeStyle = "#bfe8f3";
      ctx.lineWidth = 10;
      ctx.moveTo(250, 250);
      ctx.lineTo(205 * Math.sin(i) + 250, 205 * Math.cos(i) + 250);
      ctx.stroke();
    }

    //atmosfera del planeta
    for (let i = 0; i < 2 * Math.PI; i = i + 0.04) {
      ctx.beginPath();
      ctx.strokeStyle = "rgb(175, 209, 241)";
      ctx.lineWidth = 8;
      ctx.moveTo(250, 250);
      ctx.lineTo(200 * Math.sin(i - 0.1) + 250, 200 * Math.cos(i - 0.1) + 250);
      ctx.stroke();
    }

    for (let i = 1; i < puntosProyectados.length; i++) {
      if (
        Math.pow(
          Math.pow(puntosProyectados[i].x - puntosProyectados[i - 1].x, 2) +
            Math.pow(puntosProyectados[i - 1].y - puntosProyectados[i].y, 2),
          1 / 2
        ) < 40
      ) {
        if (puntosProyectados[i].id == "lineas") {
          ctx.beginPath();
          ctx.strokeStyle = "grey";
          ctx.lineWidth = 0.1;
          ctx.moveTo(puntosProyectados[i - 1].x, puntosProyectados[i - 1].y);
          ctx.lineTo(puntosProyectados[i].x, puntosProyectados[i].y);
          ctx.stroke();
        } else if (puntosProyectados[i].id == "continentes") {
          ctx.beginPath();
          ctx.strokeStyle = "green";
          ctx.lineWidth = 1.5;
          ctx.moveTo(puntosProyectados[i - 1].x, puntosProyectados[i - 1].y);
          ctx.lineTo(puntosProyectados[i].x, puntosProyectados[i].y);
          ctx.stroke();
        }
      } 
    }
    for(let i = 0; i<puntosProyectadosViajes.aire.length; i++){
    
      ctx.beginPath();
      ctx.strokeStyle = "brown";
      ctx.lineWidth = 2;
      ctx.moveTo(puntosProyectadosViajes.aire[i].x, puntosProyectadosViajes.aire[i].y);
      ctx.lineTo(puntosProyectadosViajes.superficie[i].x+2, puntosProyectadosViajes.superficie[i].y);
      ctx.stroke();
  }

  };

  

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    function dibujar() {
        draw(context);
        window.requestAnimationFrame(dibujar);
    }

    if(props.control == 'start'){
    dibujar();
    }
  });

  //-------------------------------

  return (
    <div id="asteroidsEsfera">
      <canvas class='asteroidsCanvas' ref={canvasRef} width="500px" height="500px" />
    </div>
  );
}

export default Esfera;
