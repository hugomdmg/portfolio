import { useRef, useEffect } from "react"
import Draw from '../../infraestructure/draw'


export default function GameOfLife1() {
    let draw = new Draw()
    class Cell {
        state
        constructor() {
            this.createState()
        }

        createState() {
            let n = Math.random()
            this.state = false
            if (n < 0.08) this.state = true
        }
    }
    let cells = []


    for (let i = 1; i < 50; i++) {
        let cellsFile = []
        for (let j = 1; j < 50; j++) {
            cellsFile.push(new Cell())
        }
        cells.push(cellsFile)
    }

    function life() {
        setInterval(() => {
            cells.forEach((file, index1) => {
                file.forEach((cell, index2) => {
                    if (index1 > 1 && index1 < 48 && index2 > 1 && index2 < 28) {
                        let n = 0
                        if (cells[index1 - 1][index2].state) n += 1
                        if (cells[index1 + 1][index2].state) n += 1
                        if (cells[index1][index2 - 1].state) n += 1
                        if (cells[index1][index2 + 1].state) n += 1
                        if (cells[index1 - 1][index2 - 1].state) n += 1
                        if (cells[index1 + 1][index2 + 1].state) n += 1
                        if (cells[index1 + 1][index2 - 1].state) n += 1
                        if (cells[index1 - 1][index2 + 1].state) n += 1

                        if ((cell.state && n == 2) || n == 3) { cell.state = true } else {
                            cell.state = false
                        }

                    }
                })
            })

        }, [200])
    }

    const canvasRef = useRef(null)

    life()

    useEffect(() => {
        setInterval(() => {
            let canvas = canvasRef.current
            draw.init(canvas)
            draw.clearScreen()
            cells.forEach((file, index1) => {
                file.forEach((cell, index2) => {
                    let point = { x: index1 * 20, y: index2 * 20 }
                    if (cell.state) draw.paintSquare(point, 17, 'black')
                })
            })
        }, [50])
    })

    return (
        <div id='scenary-container'>
            <canvas id="scenary-life" ref={canvasRef} width='1000' height='600'></canvas>
        </div>
    )
}