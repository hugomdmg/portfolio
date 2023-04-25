import React, { useEffect, useRef } from "react"
import Dinamics from '../../infraestructure/dinamics'
import Gravity from "../../infraestructure/gravity";
import Draw from "../../infraestructure/draw";
import Galaxy from "./galaxies";

let dinamics = new Dinamics()
let gravity = new Gravity(0.000001)
gravity.t = 2
gravity.type = 'galaxy'
let galaxy = new Galaxy()
let draw = new Draw()


function events(planetas) {
  window.addEventListener("keydown", (event) => {
    if (event.key === "w") dinamics.rotateXAxis(0.03, planetas)
    if (event.key === "s") dinamics.rotateXAxis(-0.03, planetas)
    if (event.key === "a") dinamics.rotateYAxis(0.03, planetas)
    if (event.key === "d") dinamics.rotateYAxis(-0.03, planetas)
    if (event.key === "x") gravity.t += 1
    if (event.key === "z") gravity.t -= 1
  });
}

function planetTable(planet, name) {
  return (
    <div>
      <h5>{name}</h5>
      <p>core radius: {planet.nucleo.r}</p>
      <p>core density: {planet.nucleo.d}</p>
      <p>external radius: {planet.corteza.r}</p>
      <p>external density: {planet.corteza.d}</p>
    </div>
  );
}


function Planets(props) {
  let planetTable1 = planetTable(props.planeta1, "Galaxy 1");
  let planetTable2 = planetTable(props.planeta2, "Galaxy 2");
  const planeta1 = galaxy.createGalaxy(props.planeta1, { x: 250, y: -100, z: 0 });
  const planeta2 = galaxy.createGalaxy(props.planeta2, { x: -50, y: 100, z: 0 });
  let planetas = planeta1.concat(planeta2)

  let canvasRef = useRef(null);

  events(planetas);

  useEffect(() => {
    const canvas = canvasRef.current;
    draw.init(canvas)
    let center = { x: 1000, y: 400 }

    setInterval(() => {
      draw.clearScreen()
      planetas.map(point1 => {
        planetas.forEach(point2 => {
          gravity.calculateVelocityVector(point1, point2, point1.d, point2.d)
        })
        let point = { x: point1.x + center.x, y: point1.y + center.y }
        draw.paintPoint(point, 2, point1.color)
      });
    }, 60);
  });

  return (
    <>
      <div className="datos">
        {planetTable1}
        {planetTable2}
      </div>
      <div id="cuadro">
        <canvas id="canvasSimulacion" ref={canvasRef} width='2000' height='800'></canvas>
      </div>
    </>
  );
}

export default Planets;
