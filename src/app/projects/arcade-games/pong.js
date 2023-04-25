import React, { useRef, useEffect, useState } from "react";

function Pong() {
  let [control, setControl] = useState(true);
  let i = 50;
  let v1 = 20;
  let v2 = Math.random() * (400 - 40) + 40;
  let cambio1 = 0;
  let cambio2 = 0;
  let velocidad = 0;

  function Cuadro() {
    const canvasRef = useRef(null);
    let [contador, setContador] = useState(0);

    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      function dibujar() {
        if ((v2 > i - 40 && v2 < i + 40) || v1 > 18) {
          if (v1 < 333 && cambio1 === 0) {
            v1 = v1 + 1.25 + velocidad;
          } else if (v1 >= 5) {
            v1 = v1 - 1.25 - velocidad;
            cambio1 = 1;

            if (v1 < 18) {
              cambio1 = 0;
              if (velocidad < 2.3) {
                velocidad = velocidad + 0.1;
              }
              setContador((contador += 1));
            }
          }

          if (v2 < 445 && cambio2 === 0) {
            v2 = v2 + 1.25 + velocidad;
          } else if (v2 > 5) {
            v2 = v2 - 1.25 - velocidad;
            cambio2 = 1;
            if (v2 < 10) {
              cambio2 = 0;
            }
          }

          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
          drawPala(context, i);
          drawPala2(context, v2);
          drawBola(context, v1, v2);
          drawCuadro(context);
        }

        window.requestAnimationFrame(dibujar);
      }

      dibujar(v1, cambio1);

      window.addEventListener("keydown", (event) => {
        console.log(event.keyCode)
        if (v1>18){
        if (event.keyCode === 87 && i > 45) {
          i = i - 15;
        } else if (event.keyCode === 83 && i < 400) {
          i = i + 15;
        }
      }
      });

    }, [0.1]);

    function drawPala(ctx, i) {
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 8;
      ctx.moveTo(15, i - 30);
      ctx.lineTo(15, i + 38);
      ctx.stroke();
    }

    function drawPala2(ctx, v) {
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 8;
      if (v > 48) {
        ctx.moveTo(338, v + 30);
        ctx.lineTo(338, v - 38);
        ctx.stroke();
      } else {
        ctx.moveTo(338, 5);
        ctx.lineTo(338, 78);
        ctx.stroke();
      }
    }

    function drawBola(ctx, v1, v2) {
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 5;
      for (let j = 0; j < 2; j = j + 0.1) {
        ctx.moveTo(v1, v2);
        ctx.lineTo(
          v1 + 4 * Math.cos(j * Math.PI),
          v2 + 4 * Math.sin(j * Math.PI)
        );
      }
      ctx.stroke();
    }

    function drawCuadro(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.moveTo(5, 5);
      ctx.lineTo(5, 450);
      ctx.lineTo(350, 450);
      ctx.lineTo(350, 5);
      ctx.lineTo(5, 5);
      ctx.moveTo(177.5, 5);
      ctx.lineTo(177.5, 450);
      ctx.stroke();
    }
    return (
      <>
      
        <p id="arcadeContador">{contador}</p>
        <canvas ref={canvasRef} width="350" height="450" id="arcadeCanvas"/>
      
      
      </>
    );
  }

  return (
    <>
      <Cuadro />
      
        <button
          onClick={() => {
            if(control){
            setControl(false);
            }else{
              setControl(true);
            }
          }}
        >
          start
        </button>
      
    </>
  );
}

export default Pong;
