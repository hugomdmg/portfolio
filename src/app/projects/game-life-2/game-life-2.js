import Help from "../../help"
import { useRef, useEffect } from "react"
import './game-life.css'
import Draw from "../../infraestructure/draw"


let angle1 = 4
let angle2 = 30
let t = 0.4
let v = 1

function createAtoms() {
    let atoms = []
    for (let i = 0; i < 600; i += 1) {
        atoms.push({
            x: Math.random() * 1000,
            y: Math.random() * 600,
            vx: v,
            vy: v,
            ax: 0,
            ay: 0,
            color1: 250,
            color2: 200
        })
    }
    return atoms
}

function force1(atoms) {
    atoms.forEach(atom => {
        let vx = Math.cos(angle1) * atom.vx - Math.sin(angle1) * atom.vy
        let vy = Math.sin(angle1) * atom.vx + Math.cos(angle1) * atom.vy
        atom.vx = vx
        atom.vy = vy
        atom.x += atom.vx * t
        atom.y += atom.vy * t
    })
    return atoms
}

function force2(atoms) {
    atoms.forEach(atom1 => {
        let color1 = 100
        let color2 = 100
        let ax = 0
        let ay = 0
        atoms.forEach(atom2 => {
            let distance = Math.pow((Math.pow(atom2.x - atom1.x, 2) + Math.pow(atom2.y - atom1.y, 2)), 1 / 2)
            if (atom1 !== atom2 && distance > 5) {
                ax += angle2 * (atom2.x - atom1.x) / Math.pow(distance, 3)
                ay += angle2 * (atom2.y - atom1.y) / Math.pow(distance, 3)

                atom1.color1 = color1
                atom1.color2 = color2
            }
            if(distance < 30){
            color1 += 3*(Math.abs(atom1.vx + atom2.vx) + Math.abs(atom1.vy + atom2.vy))
            }
        })

        atom1.ax = -ay
        atom1.ay = ax
        atom1.vx = atom1.vx + atom1.ax * t + atom1.ax * Math.pow(t,2)/2
        atom1.vy = atom1.vy + atom1.ay * t + atom1.ay * Math.pow(t,2)/2
    })

    return atoms
}



export default function GameOfLife2() {
    let atoms = createAtoms()
    let draw = new Draw()

    let helpText = 'help text'
    const canvasRef = useRef(null)


    useEffect(() => {
        const canvas = canvasRef.current
        draw.init(canvas)
        setInterval(() => {
            draw.clearScreen()
            atoms = force1(atoms)
            atoms = force2(atoms)
            atoms.forEach(point => {
                draw.paintPoint(point, 2, `rgb(${point.color1},${point.color1},${point.color2})`)

            })
        }, 100)
    })


    return (
        <>
            <button onClick={() => { angle1 += 0.1 }}>+force 1</button>
            <button onClick={() => { angle1 -= 0.1 }}>-force 1</button>
            <button onClick={() => { angle2 += 1 }}>+force 2</button>
            <button onClick={() => { angle2 -= 1 }}>-force 2</button>
            <button onClick={() => { t -= 0.1 }}>-time</button>
            <button onClick={() => { t += 0.1 }}>+time</button>


            <Help text={helpText} />
            <p>force 1: {angle1}</p>
            <p>force 2: {angle2}</p>

            <div id='scenary-container'>
                <canvas id="scenary-life" ref={canvasRef} width='1000' height='600'></canvas>
            </div>
        </>
    )
}