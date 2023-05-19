
function Table(props) {

  let data = props.data

  let upload = (value, key1, key2) => {
    let data1 = {
      nucleo: { r: props.data.nucleo.r, d: props.data.nucleo.d },
      manto: { r: props.data.manto.r, d: props.data.manto.d },
      corteza: { r: props.data.corteza.r, d: props.data.corteza.d },
      velocidad: props.data.velocidad
    };
    let data2 = value ? value : 0

    data1[key1][key2] = parseInt(data2)
    props.setPlaneta(data1)
  }
  let boton = () => {
    return (
      <>
        <button onClick={() => {
          let data = {
            nucleo: { r: 0, d: 0 },
            manto: { r: 0, d: 0 },
            corteza: { r: 0, d: 0 },
            velocidad: {
              x: (props.v * Math.cos(props.angulo)),
              y: (props.v * Math.sin(props.angulo)),
            },
          };
          props.setPlaneta(data);
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
        <table id="table">
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
                  value={data.nucleo.r}
                  onChange={(e) => {
                    upload(e.target.value, 'nucleo', 'r');
                  }}
                  placeholder={props.data.nucleo.r}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={data.nucleo.d}
                  onChange={(e) => {
                    upload(e.target.value, 'nucleo', 'd');
                  }}
                  placeholder={props.data.nucleo.d}
                />
              </td>
            </tr>
            <tr>
              <td>Mantle</td>
              <td>
                <input
                  type="text"
                  value={data.manto.r}
                  onChange={(e) => {
                    upload(e.target.value, 'manto', 'r');

                  }}
                  placeholder={props.data.manto.r}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={data.manto.d}
                  onChange={(e) => {
                    upload(e.target.value, 'manto', 'd');
                  }}
                  placeholder={props.data.manto.d}
                />
              </td>
            </tr>
            <tr>
              <td>Crust</td>
              <td>
                <input
                  type="text"
                  value={data.corteza.r}
                  onChange={(e) => {
                    upload(e.target.value, 'corteza', 'r');
                  }}
                  placeholder={props.data.corteza.r}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={data.corteza.d}
                  onChange={(e) => {
                    upload(e.target.value, 'corteza', 'd');
                  }}
                  placeholder={props.data.corteza.d}
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

export default Table;
