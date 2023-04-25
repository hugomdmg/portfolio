import React, { useRef, useEffect, useState } from "react";

function Asteroids() {
  let [control, setControl] = useState(true);
  let nave = [
    { x: 0, y: 0 },
    { x: -12, y: -12 },
    { x: 0, y: 20 },
    { x: 12, y: -12 },
    { x: 0, y: 0 },
  ];

  function Cuadro() {
    let [contador, setContador] = useState(0);
    const canvasRef = useRef(null);

    let asteroide1 = [
      { x: 15, y: 0 },
      { x: 11, y: 12 },
      { x: 0, y: 14 },
      { x: -14, y: 12 },
      { x: -16, y: 0 },
      { x: -13, y: -11 },
      { x: 0, y: -14 },
      { x: 13, y: -9 },
      { x: 15, y: 0 },
      { x: 14, y: 14 },
    ];
    let asteroide2 = [
      { x: 5, y: 3 },
      { x: 8, y: 6 },
      { x: 5, y: 7 },
      { x: -5, y: 6 },
      { x: -7, y: -4 },
      { x: -2, y: -5 },
      { x: 7, y: -6 },
      { x: 5, y: 3 },
    ];
    let asteroides = [asteroide1, asteroide2];
    let disparos = [];
    let disparosEstatico = [];
    let posicionx = 250;
    let posiciony = 250;
    let asteroidesCreados = [
      {
        tipo: asteroides[0],
        v1: 1,
        v2: 1,
        x1: 550,
        y1: 80,
      },
    ];

    //-------------------------------

    useEffect(() => {
      const canvas = canvasRef.current;
      let context = canvas.getContext("2d");
      giroNave();
      crearAsteroides();
      crearDisparo();

        dibujar();
      
      function dibujar() {
        requestAnimationFrame(dibujar);
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
          drawAsteroides(context);
          drawNave(context);
          drawDisparo(context);
          impactoNave();
        
      }
      
    }, [500]);

    //-------------------------------

    function giroNave() {
      let naveGiro = [];

      window.addEventListener("keydown", (event) => {
        if (event.keyCode === 65) {
          naveGiro = [];
          for (let i = 0; i < nave.length; i++) {
            let x = nave[i].x * Math.cos(0.1) + nave[i].y * Math.sin(0.1);
            let y = -nave[i].x * Math.sin(0.1) + nave[i].y * Math.cos(0.1);
            naveGiro.push({ x, y });
          }
          nave = naveGiro;
        }
        if (event.keyCode === 68) {
          naveGiro = [];
          for (let i = 0; i < nave.length; i++) {
            let x = nave[i].x * Math.cos(0.1) - nave[i].y * Math.sin(0.1);
            let y = nave[i].x * Math.sin(0.1) + nave[i].y * Math.cos(0.1);
            naveGiro.push({ x, y });
          }
          nave = naveGiro;
        }
      });
    }

    function drawNave(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.moveTo(nave[0].x + posicionx, nave[0].y + posiciony);
      for (let i = 0; i < nave.length; i++) {
        ctx.lineTo(nave[i].x + posicionx, nave[i].y + posiciony);
      }
      ctx.stroke();
    }

    function crearDisparo() {
      window.addEventListener("keydown", (event) => {
        if (event.keyCode === 87 && disparos.length < 6) {
          let disparo = { x: nave[2].x, y: nave[2].y };
          let disparoEstatico = { x: nave[2].x, y: nave[2].y };
          disparos.push(disparo);
          disparosEstatico.push(disparoEstatico);
          if (disparos.length > 2) {
            disparos.splice(0, 1);
            disparosEstatico.splice(0, 1);
          }
        }
      });
    }

    function drawDisparo(ctx) {
      for (let i = 0; i < disparos.length; i++) {
        disparos[i].x += 0.3 * disparosEstatico[i].x;
        disparos[i].y += 0.3 * disparosEstatico[i].y;

        let x1 = disparos[i].x;
        let y1 = disparos[i].y;
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        ctx.moveTo(x1 + posicionx, y1 + posiciony);
        ctx.lineTo(
          x1 - disparosEstatico[i].x + posicionx,
          y1 - disparosEstatico[i].y + posiciony
        );

        ctx.stroke();
      }
    }

    function crearAsteroides() {
      setInterval(() => {
        if (asteroidesCreados.length < 14) {
          let n1 = parseInt(Math.random() * 2);
          let n2 = parseInt(Math.random() * 2);
          let asteroideUp = {
            tipo: asteroides[n1],
            v1: parseInt(Math.random() + 1),
            v2: parseInt(Math.random() + 1),
            x1: parseInt(Math.random() * 500),
            y1: -20,
          };

          let asteroideDown = {
            tipo: asteroides[n2],
            v1: parseInt(Math.random() * 2 + 1),
            v2: parseInt(Math.random() * 2 + 1),
            x1: parseInt(Math.random() * 500),
            y1: 540,
          };

          asteroidesCreados.push(asteroideUp, asteroideDown);
        }
      }, 4000);
    }

    function drawAsteroides(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      for (let i = 0; i < asteroidesCreados.length; i++) {
        let index = asteroidesCreados[i];
        for (let j = 0; j < asteroidesCreados[i].tipo.length; j++) {
          if (j < asteroidesCreados[i].tipo.length - 1) {
            ctx.moveTo(index.tipo[j].x + index.x1, index.tipo[j].y + index.y1);
            ctx.lineTo(
              index.tipo[j + 1].x + index.x1,
              index.tipo[j + 1].y + index.y1
            );
          }
          ctx.stroke();
          index.tipo[j].x =
            index.tipo[j].x * Math.cos(0.005) +
            index.tipo[j].y * Math.sin(0.005);
          index.tipo[j].y =
            -index.tipo[j].x * Math.sin(0.005) +
            index.tipo[j].y * Math.cos(0.005);
        }

        for (let j = 0; j < disparos.length; j++) {
          let x = index.x1 - (disparos[j].x + posicionx);
          let y = index.y1 - (disparos[j].y + posiciony);
          let distancia1 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

          if (distancia1 < 20) {
            asteroidesCreados.splice(i, 1);
            setContador((contador += 1));
          }
        }

        if (index.x1 < 580 && index.estadox) {
          index.x1 = index.x1 + index.v1;
        } else if (index.x1 > -80) {
          index.x1 = index.x1 - index.v1;
          index.estadox = false;
          if (index.x1 < -70) {
            index.estadox = true;
          }
        }

        if (index.y1 < 580 && index.estadoy) {
          index.y1 = index.y1 + index.v2;
        } else if (index.y1 > -80) {
          index.estadoy = false;
          index.y1 = index.y1 - index.v2;
          if (index.y1 < -70) {
            index.estadoy = true;
          }

          index = 0;
        }
      }
    }

    function impactoNave() {
      for (let i = 0; i < asteroidesCreados.length; i++) {
        let x = asteroidesCreados[i].x1 - posicionx;
        let y = asteroidesCreados[i].y1 - posiciony;
        let distancia = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

        if (distancia < 30) {
          nave = [
            { x: 10, y: 10 },
            { x: -10, y: -10 },
            { x: 0, y: 0 },
            { x: 10, y: -10 },
            { x: -10, y: 10 },
          ];
          asteroidesCreados = [
            {
              tipo: asteroides[0],
              v1: 1,
              v2: 1,
              x1: 550,
              y1: 80,
            },
          ];
        }
      }
    }

    return (
      <div id="cuadroGame">
      <div>
        <p>{contador}</p>
        <br/>
        <p>Controls: A, D, W</p>
        </div>
        
        <canvas id="asteroidsCanvasGame" ref={canvasRef} width="500" height="500"></canvas>
        <button
        onClick={() => {
          nave = [
            { x: 0, y: 0 },
            { x: -12, y: -12 },
            { x: 0, y: 20 },
            { x: 12, y: -12 },
            { x: 0, y: 0 },
          ];
          if (control) {
            setControl(false);
          } else {
            setControl(true);
          }
        }}
      >
        start
      </button>
      </div>
    );
  }

  return (
    <div id="asteroidsAsteroids">
      <Cuadro />
    </div>
  );
}

export default Asteroids;
