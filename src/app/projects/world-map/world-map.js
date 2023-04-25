import { useRef, useEffect } from "react";
import Draw from "../../infraestructure/draw";
import Earth from "../../../shared/earth";
import Dinamics from '../../infraestructure/dinamics'
import Projection from '../../infraestructure/projection'
import './style.css'
import Help from "../../help";

function WorldMap() {
    const canvasRef = useRef(null)
    let draw = new Draw()
    let earth = new Earth()
    let dinamics = new Dinamics()
    let projection = new Projection()
    draw.minDistance = 180

    let helpText = 'Use W, S to rotate latitud. Use A, D to rotate longitud.'

    let cartesianCoordenates = projection.convertToCartesians(earth.continents)

    function changereference() {
        window.addEventListener('keydown', (event) => {
            if (event.key == "w") {
                cartesianCoordenates = dinamics.rotateYAxis(-0.1, cartesianCoordenates)
                earth.continents = projection.convertToSpherics(cartesianCoordenates)
            }
            if (event.key == "s") {
                cartesianCoordenates = dinamics.rotateYAxis(0.1, cartesianCoordenates)
                earth.continents = projection.convertToSpherics(cartesianCoordenates)
            }
            if (event.key == "d") {
                cartesianCoordenates = dinamics.rotateZAxis(0.1, cartesianCoordenates)
                earth.continents = projection.convertToSpherics(cartesianCoordenates)
            }
            if (event.key == "a") {
                cartesianCoordenates = dinamics.rotateZAxis(-0.1, cartesianCoordenates)
                earth.continents = projection.convertToSpherics(cartesianCoordenates)
            }

        })
    }

    changereference()

    useEffect(() => {
        setInterval(() => {
            let canvas = canvasRef.current
            draw.init(canvas)
            draw.clearScreen()
            let toShow = []
            earth.continents.forEach(point => {
                toShow.push({
                    x: -point.lon * 300,
                    y: point.lat * 300,
                    z: 1
                })
            })
            draw.paintLine(toShow, { x: 1000, y: 50, z: 0 }, 0, 'white')
        }, [15])
    })

    return (
        <>
        <Help text={helpText}/>
            <div id='scenary-container'>
                <canvas id="scenary" ref={canvasRef} width='2000' height='900'></canvas>
            </div>
        </>
    )
}

export default WorldMap;