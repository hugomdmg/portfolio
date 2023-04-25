import { useState } from "react";

function Tabla(props) {
  let [radioNucleo, setRadioNucleo] = useState(props.planeta[0]);
  let [densidadNucleo, setDensidadNucleo] = useState(props.planeta[3]);

  let [radioManto, setRadioManto] = useState(props.planeta[1]);
  let [densidadManto, setDensidadManto] = useState(props.planeta[4]);

  let [radioCorteza, setRadioCorteza] = useState(props.planeta[2]);
  let [densidadCorteza, setDensidadCorteza] = useState(props.planeta[5]);

  let datos = {
    nucleo: { r: radioNucleo, d: densidadNucleo },
    manto: { r: radioManto, d: densidadManto },
    corteza: { r: radioCorteza, d: densidadCorteza },
    velocidad: {
      x: (props.v * Math.cos(props.angulo)) / 1000,
      y: (-props.v * Math.sin(props.angulo)) / 1000,
    },
  };

  function actualizar() {
    datos = {
      nucleo: { r: radioNucleo, d: densidadNucleo },
      manto: { r: radioManto, d: densidadManto },
      corteza: { r: radioCorteza, d: densidadCorteza },
      velocidad: {
        x: (props.v * Math.cos(props.angulo)) / 1000,
        y: (-props.v * Math.sin(props.angulo)) / 1000,
      },
    };
    props.funcion(datos);
  }
  let boton = ()=>{
    return(
      <>
      <button onClick={()=>{
        setRadioNucleo(0);
        setDensidadNucleo(0);
        setRadioManto(0);
        setDensidadManto(0);
        setRadioCorteza(0);
        setDensidadCorteza(0);
      }}>blackhole mode</button>
      </>
    )
  }
  let bot = boton()

  return (
    <>
      <div>
        <h3>Datos del {props.nombre} planeta:</h3>
        {bot}
        <table id="tabla">
          <tbody>
          <tr>
            <td></td>
            <td>Radio (km)</td>
            <td>densidad (g/cm3)</td>
          </tr>
          <tr>
            <td>Nucleo</td>
            <td>
              <input
                type="text"
                value={radioNucleo}
                onChange={(e) => {
                  setRadioNucleo(e.target.value);
                  actualizar();
                }}
                placeholder={props.planeta[0]}
              />
            </td>
            <td>
              <input
                type="text"
                value={densidadNucleo}
                onChange={(e) => {
                  setDensidadNucleo(e.target.value);
                  actualizar();
                }}
                placeholder={props.planeta[3]}
              />
            </td>
          </tr>
          <tr>
            <td>Manto</td>
            <td>
              <input
                type="text"
                value={radioManto}
                onChange={(e) => {
                  setRadioManto(e.target.value);
                  actualizar();
                }}
                placeholder={props.planeta[1]}
              />
            </td>
            <td>
              <input
                type="text"
                value={densidadManto}
                onChange={(e) => {
                  setDensidadManto(e.target.value);
                  actualizar();
                }}
                placeholder={props.planeta[4]}
              />
            </td>
          </tr>
          <tr>
            <td>Corteza</td>
            <td>
              <input
                type="text"
                value={radioCorteza}
                onChange={(e) => {
                  setRadioCorteza(e.target.value);
                  actualizar();
                }}
                placeholder={props.planeta[2]}
              />
            </td>
            <td>
              <input
                type="text"
                value={densidadCorteza}
                onChange={(e) => {
                  setDensidadCorteza(e.target.value);
                  actualizar();
                }}
                placeholder={props.planeta[5]}
              />
            </td>
          </tr>
          </tbody>
        </table>
        <button
          onClick={() => {
            actualizar();
          }}
        >
          watch
        </button>
      </div>
      <div></div>
    </>
  );
}

export default Tabla;
