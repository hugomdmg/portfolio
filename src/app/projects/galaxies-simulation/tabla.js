import { useState } from "react";

function Tabla(props) {

  let datos = {
    nucleo: { r: props.planeta[0], d: props.planeta[3] },
    manto: { r: props.planeta[1], d: props.planeta[4] },
    corteza: { r: props.planeta[2], d: props.planeta[5] },
    velocidad: {
      x: (props.v * Math.cos(props.angulo)) / 1000,
      y: (-props.v * Math.sin(props.angulo)) / 1000,
    },
  };

  let actualizar = (value, key1, key2) => {
    datos[key1][key2] = value
    props.funcion(datos);
  }
  let boton = () => {
    return (
      <>
        <button onClick={() => {
          let datos = {
            nucleo: { r: 0, d: 0},
            manto: { r: 0, d: 0 },
            corteza: { r: 0, d: 0},
            velocidad: {
              x: (props.v * Math.cos(props.angulo)) / 1000,
              y: (-props.v * Math.sin(props.angulo)) / 1000,
            },
          };
          props.funcion(datos);
        }}>blackhole mode</button>
      </>
    )
  }
  let bot = boton()

  return (
    <>
      <div>
        <h3>Galaxie {props.nombre}:</h3>
        {bot}
        <table id="tabla">
          <tbody>
            <tr>
              <td></td>
              <td>Radius (km)</td>
              <td>density (g/cm3)</td>
            </tr>
            <tr>
              <td>Core</td>
              <td>
                <input
                  type="text"
                  value={datos.nucleo.r}
                  onChange={(e) => {
                    actualizar(e.target.value, 'nucleo', 'r');
                  }}
                  placeholder={props.planeta[0]}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={datos.nucleo.d}
                  onChange={(e) => {
                    actualizar(e.target.value, 'nucleo', 'd');
                  }}
                  placeholder={props.planeta[3]}
                />
              </td>
            </tr>
            <tr>
              <td>Mantle</td>
              <td>
                <input
                  type="text"
                  value={datos.manto.r}
                  onChange={(e) => {
                    actualizar(e.target.value, 'manto', 'r');

                  }}
                  placeholder={props.planeta[1]}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={datos.manto.d}
                  onChange={(e) => {
                    actualizar(e.target.value, 'manto', 'd');
                  }}
                  placeholder={props.planeta[4]}
                />
              </td>
            </tr>
            <tr>
              <td>Crust</td>
              <td>
                <input
                  type="text"
                  value={datos.corteza.r}
                  onChange={(e) => {
                    actualizar(e.target.value, 'corteza', 'r');
                  }}
                  placeholder={props.planeta[2]}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={datos.corteza.d}
                  onChange={(e) => {
                    actualizar(e.target.value, 'conrteza', 'd');
                  }}
                  placeholder={props.planeta[5]}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div></div>
    </>
  );
}

export default Tabla;
