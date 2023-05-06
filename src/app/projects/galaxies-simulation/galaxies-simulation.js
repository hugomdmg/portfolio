import { useState, useEffect, useRef } from "react";
import Tabla from "./tabla";
import Planets from "./planetas";
import './styles.css'
import Draw from "../../infraestructure/draw";

export default function GalaxiesSimulation() {
  let [control, setControl] = useState(true);
  let [v, setV] = useState(0.015);
  let [angulo, setAngulo] = useState(4);
  let draw = new Draw()

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
    velocidad: { x: v * Math.cos(angulo), y: v * Math.sin(angulo) },
  });

  function CuadroVisual(props) {
    const canvasRef1 = useRef(null);

    function drawFlecha(draw, x, y, alfa) {
      let flecha = [
        { x: 15, y: 0 },
        { x: 34, y: 0 },
        { x: 31, y: 3 },
        { x: 31, y: -3 },
        { x: 34, y: 0 },
        { x: 0, y: 0 },
      ];
      flecha = flecha.map((punto) => {
        let puntos = {
          x: Math.cos(alfa) * punto.x - Math.sin(alfa) * punto.y,
          y: Math.sin(alfa) * punto.x + Math.cos(alfa) * punto.y,
          z: 1
        };
        return puntos;
      });
      draw.paintLine(flecha, { x: x, y: y }, 0, 'brown')
    }

    useEffect(() => {
      const canvas = canvasRef1.current;
      draw.init(canvas)

      draw.paintPoint({ x: 100, y: 100 }, props.planeta2.corteza.r / 200, "rgb(139, 163, 33)")
      draw.paintPoint({ x: 100, y: 100 }, props.planeta2.manto.r / 200, "rgb(231, 123, 22)")
      draw.paintPoint({ x: 100, y: 100 }, props.planeta2.nucleo.r / 200, "rgb(141, 12, 8)")
      draw.paintPoint({ x: 200, y: 40 }, props.planeta1.corteza.r / 200, "rgb(139, 163, 33)")
      draw.paintPoint({ x: 200, y: 40 }, props.planeta1.manto.r / 200, "rgb(231, 123, 22)")
      draw.paintPoint({ x: 200, y: 40 }, props.planeta1.nucleo.r / 200, "rgb(141, 12, 8)")

      drawFlecha(draw, 100, 100, angulo);
    });
    return <canvas id="canvasInicio" ref={canvasRef1} />;
  }

  if (control) {
    return (
      <div id="cuadroInicio">
        <div>
          <Tabla
            nombre="1"
            funcion={setPlaneta1}
            angulo={0}
            v={0}
            datos={planeta1}
          />
          <Tabla
            nombre="2"
            funcion={setPlaneta2}
            angulo={angulo}
            v={v}
            datos={planeta2}

          />
          <br></br>
          <table>
            <tbody>
              <tr><td>Relative velocity:</td></tr>
              <tr>
                <td>
                  <input onChange={(e) => {
                    planeta2.velocidad = { x: e.target.value * Math.cos(angulo) / 1000, y: e.target.value * Math.sin(angulo) / 1000 }
                    setV(e.target.value / 1000)
                    setPlaneta2(planeta2)
                  }} placeholder={v * 1000}></input>
                </td>
              </tr>
              <tr><td>Impact angle:</td></tr>
              <tr>
                <td>
                  <input onChange={(e) => {
                    planeta2.velocidad = { x: v * Math.cos(e.target.value), y: v * Math.sin(e.target.value) }
                    setAngulo(e.target.value)
                    setPlaneta2(planeta2)
                  }} placeholder={angulo}></input>
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => { setControl(false) }}>View simulation</button>
        </div>
        <CuadroVisual planeta1={planeta1} planeta2={planeta2} />
      </div>
    );
  } else {
    return (
      <>
        <button onClick={() => { window.location.reload(false) }}>go back</button>
        <Planets planeta1={planeta1} planeta2={planeta2} />
      </>
    );
  }
}
