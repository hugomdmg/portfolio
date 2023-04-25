function Busqueda(props) {
  function fondoCiudad(foto, id) {
    document.getElementById(`asteroids${id}`).style.backgroundImage = `url('./images-asteroids/${foto}')`;
  }
  return (
    <div id="asteroidsCuadroSearch">
    <div class='asteroidsCuadroSearch'>
      <p>Select asteroid search</p>
      <div>
        <p>Date:</p>

        <input type="date" id="fecha" className="asteroidsInput"/>
        <button
          id="results"
          onClick={() => {
            props.funcion(document.getElementById("fecha").value);
            props.menu("results");
          }}
        >
          results
        </button>

        <p>Choose city as size reference:</p>
        <div id="columnasBusqueda">
          <button
            onClick={() => {
              fondoCiudad("madrid.png", "Asteroides-cities");
            }}
          >
            Madrid
          </button>
          <button
            onClick={() => {
              fondoCiudad("new york.png", "Asteroides-cities");
            }}
          >
            Ney York
          </button>
          <button
            onClick={() => {
              fondoCiudad("tokyo.png", "Asteroides-cities");
            }}
          >
            Tokyo
          </button>
          <button
            onClick={() => {
              fondoCiudad("niebla.png", "Asteroides-cities");
            }}
          >
            Niebla
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Busqueda;
