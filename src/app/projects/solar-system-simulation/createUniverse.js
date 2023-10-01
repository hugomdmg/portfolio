import Dinamics from "../../infraestructure/dinamics"
import Draw from "../../infraestructure/draw"
import Gravity from '../../infraestructure/gravity'


export default class CreateUniverse {
    dinamics = new Dinamics()
    gravity = new Gravity(0.0001)
    draw = new Draw()

    planets = []
    centerScreen = { x: 850, y: 450 }
    sky = []

    constructor(planets) {
        this.planets = planets
        this.createSky()
    }

    createSky() {
        for (let i = 0; i < 1000; i++) {
            this.sky.push({ x: Math.random() * 2000, y: Math.random() * 1500 })
        }
    }

    init(canvas) {
        this.draw.ctx = canvas.getContext('2d')
        this.eventListener()
        this.paint(this.centerScreen)
        this.action()
    }

    rotate(direction) {
        this.planets.forEach((planet) => {
            planet.position = this.dinamics.rotate(-0.01 * direction, { x: 1, y: 0, z: 0 }, [planet.position])[0]
            planet.rotationAxis = this.dinamics.rotate(-0.01 * direction, { x: 1, y: 0, z: 0 }, [planet.rotationAxis])[0]
            planet.rotateXAxis(0.01 * direction)
        })
    }

    acelerate(direction) {
        this.gravity.acelerate(direction)
        this.planets.forEach((planet) => {
            planet.rotationSpeed += 0.02 * direction
        })
    }
    
    eventListener() {
        window.addEventListener('keydown', (event) => {
            if (event.key == "w") this.rotate(1)
            if (event.key == "s") this.rotate(-1)
            if (event.key == "x") this.acelerate(1)
            if (event.key == "z") this.acelerate(-1)

            if (event.key == "k") this.centerScreen.y += 10
            if (event.key == "i") this.centerScreen.y -= 10
            if (event.key == "j") this.centerScreen.x -= 10
            if (event.key == "l") this.centerScreen.x += 10
        })
    }

    compareDistance(a, b) {
        if (a.position.z < b.position.z) return -1;
        if (a.position.z > b.position.z) return 1;
        return 0;
    }

    paint(center) {
        this.sky.forEach((star) => {
            this.draw.paintPoint(star, 1, 'white')
        })
        this.planets.map((planet) => {
            let point = { x: planet.position.x + center.x, y: planet.position.y + center.y }
            this.draw.paintPoint(point, planet.getDistanceEffect(), planet.colorSurface)
            this.draw.paintLine(planet.projectedPoints, center, 0, 'white')
        })
    }

    movement() {
        this.planets.forEach((planet1) => {
            this.planets.map((planet2) => {
                if (planet1 != planet2) {
                    planet1.position = this.gravity.calculateVelocityVector(planet1.position, planet2.position, planet1.mass, planet2.mass)
                }
            })
        })
    }

    action() {
        setInterval(() => {
            this.planets.sort(this.compareDistance)
            this.planets.forEach((planet) => {
                this.draw.clearScreen()
                planet.rotation()
                this.paint(this.centerScreen)
                this.movement()
            })
        }, 90)
    }
}

