
function Tabla(props) {

  let datos = props.datos

  let actualizar = (value, key1, key2) => {
    let datos1 = {
      nucleo: { r: props.datos.nucleo.r, d: props.datos.nucleo.d },
      manto: { r: props.datos.manto.r, d: props.datos.manto.d },
      corteza: { r: props.datos.corteza.r, d: props.datos.corteza.d },
      velocidad: props.datos.velocidad
    };

    datos1[key1][key2] = parseInt(value)
    props.funcion(datos1)
  }
  let boton = () => {
    return (
      <>
        <button onClick={() => {
          let datos = {
            nucleo: { r: 0, d: 0 },
            manto: { r: 0, d: 0 },
            corteza: { r: 0, d: 0 },
            velocidad: {
              x: (props.v * Math.cos(props.angulo)),
              y: (props.v * Math.sin(props.angulo)),
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
              <td>Radius (light years)</td>
              <td>density (mg/m3)</td>
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
                  placeholder={props.datos.nucleo.r}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={datos.nucleo.d}
                  onChange={(e) => {
                    actualizar(e.target.value, 'nucleo', 'd');
                  }}
                  placeholder={props.datos.nucleo.d}
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
                  placeholder={props.datos.manto.r}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={datos.manto.d}
                  onChange={(e) => {
                    actualizar(e.target.value, 'manto', 'd');
                  }}
                  placeholder={props.datos.manto.d}
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
                  placeholder={props.datos.corteza.r}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={datos.corteza.d}
                  onChange={(e) => {
                    actualizar(e.target.value, 'conrteza', 'd');
                  }}
                  placeholder={props.datos.corteza.d}
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
