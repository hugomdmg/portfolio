import { useState, useEffect, useRef } from "react";
import Table from "./table";
import Planets from "./planetas";
import './styles.css'
import Draw from "../../infraestructure/draw";

export default function GalaxiesSimulation() {
  let [control, setControl] = useState(true);
  let [v, setV] = useState(0.003);
  let [angulo, setAngulo] = useState(4);
  let draw = new Draw()

  let [planeta1, setPlaneta1] = useState({
    nucleo: { r: 3500, d: 12 },
    manto: { r: 6300, d: 4 },
    corteza: { r: 6370, d: 1 },
    velocidad: { x: 0, y: 0 },
  });
  let [planeta2, setPlaneta2] = useState({
    nucleo: { r: 1000, d: 1 },
    manto: { r: 2500, d: 2 },
    corteza: { r: 3500, d: 1 },
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
          <Table
            nombre="1"
            setPlaneta={setPlaneta1}
            angulo={0}
            v={0}
            data={planeta1}
          />
          <Table
            nombre="2"
            setPlaneta={setPlaneta2}
            angulo={angulo}
            v={v}
            data={planeta2}

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
