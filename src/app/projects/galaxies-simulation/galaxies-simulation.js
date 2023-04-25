import { useState, useEffect, useRef } from "react";
import Tabla from "./tabla";
import Planets from "./planetas";
import './styles.css'

export default function GalaxiesSimulation() {
  let [control, setControl] = useState(true);
  let [v, setV] = useState(15);
  let [angulo, setAngulo] = useState(4);

  let [planeta1, setPlaneta1] = useState({
    nucleo: { r: 3471, d: 12.1 },
    manto: { r: 6300, d: 3.94 },
    corteza: { r: 6371, d: 0.12 },
    velocidad: { x: 0, y: 0 },
  });
  let [planeta2, setPlaneta2] = useState({
    nucleo: { r: 1000, d: 0.02 },
    manto: { r: 2500, d: 0.04 },
    corteza: { r: 3475, d: 0.01 },
    velocidad: { x: v * Math.cos(angulo), y: -v * Math.sin(angulo) },
  });

  let arrayPlaneta1 = [
    planeta1.nucleo.r,
    planeta1.manto.r,
    planeta1.corteza.r,
    planeta1.nucleo.d,
    planeta1.manto.d,
    planeta1.corteza.d,
  ];
  let arrayPlaneta2 = [
    planeta2.nucleo.r,
    planeta2.manto.r,
    planeta2.corteza.r,
    planeta2.nucleo.d,
    planeta2.manto.d,
    planeta2.corteza.d,
  ];

  function CuadroVisual(props) {
    const canvasRef1 = useRef(null);

    function draw(ctx, r, color, x, y) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.arc(x, y, r, 0, 7);
      ctx.fill();
      ctx.stroke();
    }

    function drawFlecha(ctx, x, y, alfa) {
      let flecha = [
        { x: 0, y: 0 },
        { x: 34, y: 0 },
        { x: 31, y: 3 },
        { x: 31, y: -3 },
        { x: 34, y: 0 },
      ];
      flecha = flecha.map((punto) => {
        let puntos = {
          x: Math.cos(alfa) * punto.x - Math.sin(alfa) * punto.y,
          y: Math.sin(alfa) * punto.x + Math.cos(alfa) * punto.y,
        };
        return puntos;
      });
      ctx.moveTo(x, y);
      for (let i = 0; i < flecha.length; i++) {
        ctx.lineTo(flecha[i].x + x, flecha[i].y + y);
      }
      ctx.lineWidth = "1";
      ctx.strokeStyle = "brown";
      ctx.stroke();
    }

    useEffect(() => {
      const canvas = canvasRef1.current;
      const context = canvas.getContext("2d");

      draw(context, props.planeta2[2] / 200, "rgb(139, 163, 33)", 100, 100);
      draw(context, props.planeta2[1] / 200, "rgb(231, 123, 22)", 100, 100);
      draw(context, props.planeta2[0] / 200, "rgb(141, 12, 8)", 100, 100);
      draw(context, props.planeta1[2] / 200, "rgb(139, 163, 33)", 200, 40);
      draw(context, props.planeta1[1] / 200, "rgb(231, 123, 22)", 200, 40);
      draw(context, props.planeta1[0] / 200, "rgb(141, 12, 8)", 200, 40);
      drawFlecha(context, 100, 100, angulo);
    });
    return <canvas id="canvasInicio" ref={canvasRef1} />;
  }

  if (control) {
    return (
      <div id="cuadroInicio">
        <div>
          <Tabla
            nombre="primer"
            funcion={setPlaneta1}
            planeta={arrayPlaneta1}
            angulo={0}
            v={0}
          />
          <Tabla
            nombre="segundo"
            funcion={setPlaneta2}
            planeta={arrayPlaneta2}
            angulo={angulo - Math.PI / 2}
            v={v}
          />
          <table>
            <p>Velocidad relativa:</p>
            <tr>
              <td>
                <input
                  onChange={(e) => {
                    setV(e.target.value);
                  }}
                  placeholder={v}
                ></input>
              </td>
            </tr>
            <p>Ángulo de impacto:</p>
            <tr>
              <td>
                <input
                  onChange={(e) => {
                    setAngulo(e.target.value);
                  }}
                  placeholder={angulo}
                ></input>
              </td>
            </tr>
          </table>
          <button
            onClick={() => {
              setControl(false);
              setPlaneta2({
                nucleo: { r: planeta2.nucleo.r, d: planeta2.nucleo.d },
                manto: { r: planeta2.manto.r, d: planeta2.manto.d },
                corteza: { r: planeta2.corteza.r, d: planeta2.corteza.d },
                velocidad: {
                  x: (v * Math.cos(angulo)) / 1000,
                  y: (v * Math.sin(angulo)) / 1000,
                },
              });
            }}
          >
            View simulation
          </button>
        </div>
        <CuadroVisual planeta1={arrayPlaneta1} planeta2={arrayPlaneta2} />
      </div>
    );
  } else {
    return (
      <>
        <button
          onClick={() => {
            setControl(true);
          }}
        >
          {"<atrás"}
        </button>
        <Planets planeta1={planeta1} planeta2={planeta2} />
      </>
    );
  }
}
