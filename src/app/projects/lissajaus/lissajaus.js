import { useRef, useEffect } from 'react'
import Dinamics from '../../infraestructure/dinamics'
import Draw from '../../infraestructure/draw'
import './lissajaus.css'
import Help from '../../help'


function Lissajaus() {
    let dinamics = new Dinamics()
    let draw = new Draw()
    draw.minDistance = 3000
    let control = true
    let helpText = 'Once the line is green, use W, S to rotate up and down. Use A, D to rotate left and right. You will can see the both waves from different perspectives.'

    let A1 = 70
    let A2 = 50
    let phase = 1.4
    let t = 0
    let trajectory = []
    let color

    window.addEventListener("keydown", (event) => {
        if (event.key === "w" && control) trajectory = dinamics.rotateXAxis(0.03, trajectory)
        if (event.key === "s" && control) dinamics.rotateXAxis(-0.03, trajectory)
        if (event.key === "a" && control) dinamics.rotateYAxis(0.03, trajectory)
        if (event.key === "d" && control) dinamics.rotateYAxis(-0.03, trajectory)
    });

    function show() {
        t = 0
        trajectory = []
        A1 = document.getElementById('amplitud1').value
        A2 = document.getElementById('amplitud2').value
        phase = document.getElementById('phase').value
    }

    const canvasRef = useRef(null)

    useEffect(() => {
        let canvas = canvasRef.current
        draw.init(canvas)
        setInterval(() => {
            draw.clearScreen()
            color = 'green'
            control = true
            if (t < 30) {
                trajectory.push({
                    x: 5 * Math.sin(t * Math.PI) * A1,
                    y: 5 * Math.cos(phase * t * Math.PI) * A2,
                    z: 3000 - 200 * t,
                });
                t += 0.02;
                color = 'white'
                control = false
            }
            draw.paintLine(trajectory, { x: 1000, y: 500, z: 0 }, -4000, color)
        }, [5])
    })


    return (
        <>
            <Help text={helpText} />
            <form id='form'>
                <label>Amplitude 1</label>
                <input type='text' id='amplitud1' placeholder={A1} />
                <label>Amplitude 2</label>
                <input id='amplitud2' placeholder={A2} />
                <label>Phase difference</label>
                <input id='phase' placeholder={phase} />
            </form>
            <button onClick={show}>View</button>
            <div id='scenary-container'>
                <canvas id="scenary" ref={canvasRef} width='2000' height='900'></canvas>
            </div>
        </>
    )
}

export default Lissajaus;