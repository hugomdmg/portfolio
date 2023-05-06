export default class Galaxy {

  createGalaxy(galaxy, position) {
    let points = [];
    if (galaxy.nucleo.r !== 0) {
      for (let i = 0; i < (galaxy.corteza.r + 80 )/ 80; i += 20) {
        let color = "rgb(255, 125, 108)"
        let d = galaxy.corteza.d
        if (i < galaxy.manto.r / 80 ) { color = "rgb(250, 255, 108)"; d = galaxy.manto.d }
        if (i < galaxy.nucleo.r / 80 ) { color = "rgb(108, 135, 255)"; d = galaxy.nucleo.d }
        points.push({
          x: i,
          y: 0,
          z: 0,
          vx: galaxy.velocidad.x,
          vy: galaxy.velocidad.y,
          vz: 0,
          color: color,
          d: d,
        });
      }
      let n = points.length;
      for (let i = 0; i < 1; i += 0.2) {
        for (let j = 0; j < n; j++) {
          if (points[j].x > 0.1) {
            let pointsRotados = {
              id: points[j].id,
              x:
                points[j].x * Math.cos(Math.PI * i) -
                points[j].y * Math.sin(Math.PI * i),
              y:
                points[j].x * Math.sin(Math.PI * i) +
                points[j].y * Math.cos(Math.PI * i),
              z: 0,
              vx: galaxy.velocidad.x,
              vy: galaxy.velocidad.y,
              vz: 0,
              color: points[j].color,
              d: galaxy.corteza.d,
            };
            points.push(pointsRotados);
          }
        }
      }
      n = points.length;
      for (let i = 0; i < 2; i += 0.2) {
        for (let j = 0; j < n; j++) {
          if (Math.abs(points[j].y) > 5) {
            let pointsRotados = {
              x: points[j].x,
              y:
                points[j].y * Math.cos(Math.PI * i) -
                points[j].z * Math.sin(Math.PI * i),
              z:
                points[j].y * Math.sin(Math.PI * i) +
                points[j].z * Math.cos(Math.PI * i),
              vx: galaxy.velocidad.x,
              vy: galaxy.velocidad.y,
              vz: 0,
              color: points[j].color,
              d: points[j].d,
            };
            points.push(pointsRotados);
          }
        }
      }
    } else {
      points.push({
        x: 100,
        y: 100,
        z: 0,
        vx: galaxy.velocidad.x,
        vy: galaxy.velocidad.y,
        vz: 0,
        color: "rgb(141, 12, 8)",
        d: 300,
      });
    }
    points.map((point) => {
      point.x += position.x;
      point.y += position.y;
      point.z += position.z;
    });
    return points;
  }

}