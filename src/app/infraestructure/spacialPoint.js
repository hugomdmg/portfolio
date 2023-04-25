class SpacialPoint {
    position = { x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0 }
    mass
    color
    radius
    rotationAxis

    constructor(position, mass) {
        this.position = position
        this.mass = mass
    }

    setColor(color){
        this.color = color
    }

    setRadius(radius){
        this.radius = radius
    }
}

export default SpacialPoint;