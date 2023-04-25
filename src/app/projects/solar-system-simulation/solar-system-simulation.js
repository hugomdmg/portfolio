import { useEffect, useRef } from 'react'
import './scenary.css'
import CreateUniverse from './createUniverse';
import Earth from '../../../shared/earth'
import Planet from './planets';
import Help from '../../help';



export default function SolarSystemSimulation() {
    const earthData = new Earth();
    const planet = new Planet(earthData.continents, { x: 0, y: 0, z: 1, vx: 0, vy: -0.03, vz: 0 }, 70, 100, 23, 0.01, 'blue');
    const moon = new Planet([], { x: -400, y: 0, z: 1, vx: 0, vy: 0.3, vz: 0 }, 20, 10, 0, 0.004, 'grey');
    const planet3 = new Planet([], { x: -400, y: -30, z: 1, vx: -0.05, vy: 0.3, vz: 0 }, 2, 0.01, 0, 0, 'red');
    const mars = new Planet([], { x: 600, y: 0, z: 1, vx: 0, vy: -0.01, vz: 0.03 }, 20, 40, 23, 0.01, 'red');

    let planets = [planet, moon, planet3]
    const canvasRef = useRef(null)
    let draw = new CreateUniverse(planets)
    let helpText = 'Use J, K, L, I to move center. Use W, S to rotate up and down. Use Z, X to change time speed'

    useEffect(() => {
        let canvas = canvasRef.current
        draw.init(canvas)
    })

    return (
        <>
            <Help text={helpText} />
            <div id='scenary-container'>
                <canvas id="scenary" ref={canvasRef} width='2000' height='900'></canvas>
            </div>
        </>
    )
}