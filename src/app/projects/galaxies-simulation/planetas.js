import React, { useEffect, useRef } from "react"
import Dinamics from '../../infraestructure/dinamics'
import Gravity from "../../infraestructure/gravity";
import Draw from "../../infraestructure/draw";
import Galaxy from "./galaxies";
import Help from "../../help";

let dinamics = new Dinamics()
let gravity = new Gravity(0.000001)
gravity.t = 6
let galaxy = new Galaxy()
let draw = new Draw()
let helpText = 'Use W, S to rotate up and down. Use A, D to rotate left and right. Use Z, X to change time speed'


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

function compareDistance(a, b) {
  if (a.z < b.z) return 1;
  if (a.z > b.z) return -1;
  return 0;
}


function Planets(props) {
  let planetTable1 = planetTable(props.planeta1, "Galaxy 1");
  let planetTable2 = planetTable(props.planeta2, "Galaxy 2");
  const planeta1 = galaxy.createGalaxy(props.planeta1, { x: 250, y: -100, z: 0 });
  const planeta2 = galaxy.createGalaxy(props.planeta2, { x: 150, y: 0, z: 0 });
  let planetas = planeta1.concat(planeta2)

  let center = { x: 1000, y: 400, z: 0 }
  let center1 = { x: 0, y: 0, z: 0 }

  planetas.map(point => {
    center1.x += point.x
    center1.y += point.y
    center1.z += point.z
  })
  center1.x = center1.x/planetas.length
  center1.y = center1.y/planetas.length
  center1.z = center1.z/planetas.length


  let canvasRef = useRef(null);

  events(planetas);

  useEffect(() => {
    const canvas = canvasRef.current;
    draw.init(canvas)

    setInterval(() => {
      planetas.sort(compareDistance)
      draw.clearScreen()

      let center2 = { x: 0, y: 0, z: 0 }
      planetas.map(point => {
        center2.x += point.x
        center2.y += point.y
        center2.z += point.z
      })
      center2.x = center2.x/planetas.length
      center2.y = center2.y/planetas.length
      center2.z = center2.z/planetas.length

      planetas.map(point1 => {
        planetas.forEach(point2 => {
          gravity.calculateVelocityVector(point1, point2, point1.d, point2.d)
        })

        let point = { x: point1.x + center.x, y: point1.y + center.y }
        draw.paintPoint(point, 3, point1.color)

        point1.x += center1.x - center2.x
        point1.y += center1.y - center2.y

      });


    }, 60);
  });

  return (
    <>
      <Help text={helpText} />
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
