import Dinamics from '../../infraestructure/dinamics'
import Projection from '../../infraestructure/projection'

class Planet {
    position
    radius
    mass

    rotationAxis = { x: 0, y: 0, z: 1 }
    inclination
    rotationSpeed

    colorSurface
    surfacePoints = []
    cartesiansCoordenates = []
    projectedPoints = []
    dinamics = new Dinamics()
    projection = new Projection()

    constructor(surface, position, radius, mass, inclination, rotationSpeed, colorSurface) {
        this.colorSurface = colorSurface
        this.rotationSpeed = rotationSpeed
        this.inclination = inclination
        this.position = position
        this.radius = radius
        this.mass = mass
        this.surfacePoints = surface
        if(surface.length == 0){
            this.createLatitudLines()
            this.createLongitudLines()
        }
        this.convertToCartesians()
        this.getInclination()
    }

    rotation() {
        this.cartesiansCoordenates = this.dinamics.rotate(-this.rotationSpeed, this.rotationAxis, this.cartesiansCoordenates)
        this.project(this.position.x, this.position.y, 0)
    }

    getInclination() {
        this.inclination = this.inclination * Math.PI * 2 / 360
        this.rotationAxis.y = Math.cos(this.inclination) * this.rotationAxis.y + Math.sin(this.inclination) * this.rotationAxis.z
        this.rotationAxis.z = - Math.sin(this.inclination) * this.rotationAxis.y + Math.cos(this.inclination) * this.rotationAxis.z
        this.rotateXAxis(this.inclination)
    }

    createLatitudLines() {
        for (let lon = 0; lon < 1; lon += 0.2) {
            for (let lat = 0; lat <= 2.04; lat += 0.04) {
                this.surfacePoints.push({
                    lon: lon * Math.PI,
                    lat: lat * Math.PI
                })
            }
        }
    }

    createLongitudLines() {
        for (let lat = 0; lat < 2; lat += 0.1) {
            for (let lon = 0; lon < 1.04; lon += 0.04) {
                this.surfacePoints.push({
                    lon: lon * Math.PI,
                    lat: lat * Math.PI
                })
            }
        }
    }

    convertToCartesians() {
        this.cartesiansCoordenates = this.projection.convertToCartesians(this.surfacePoints)
    }

    project(positionX, positionY, positionZ) {
        let radius1 = this.getDistanceEffect()
        this.projectedPoints = this.projection.project(this.cartesiansCoordenates, radius1, positionX, positionY, positionZ)
    }

    rotateXAxis(alfa) {
        this.cartesiansCoordenates = this.dinamics.rotate(-alfa, { x: 1, y: 0, z: 0 }, this.cartesiansCoordenates)
    }

    rotateYAxis(alfa) {
        this.cartesiansCoordenates = this.dinamics.rotate(-alfa, { x: 0, y: 1, z: 0 }, this.cartesiansCoordenates)
    }

    rotateZAxis(alfa) {
        this.cartesiansCoordenates = this.dinamics.rotate(-alfa, { x: 0, y: 0, z: 1 }, this.cartesiansCoordenates)
    }


    getDistanceEffect() {
        let radius = this.radius
        if (this.position.z < 0) {
            radius = this.radius / (1 - this.position.z / 4000)
        } else if (this.position.z > 0) {
            radius = this.radius * (1 + this.position.z / 4000)
        }
        return radius
    }

}

export default Planet;