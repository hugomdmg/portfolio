class Projection {
    convertToCartesians(coordenates) {
        let cartesiansCoordenates = []
        coordenates.map((point) => {
            console.log(point.lat)
            cartesiansCoordenates.push({
                x: Math.sin(point.lat) * Math.cos(point.lon),
                y: Math.sin(point.lat) * Math.sin(point.lon),
                z: Math.cos(point.lat),
            })
        
        })
        return cartesiansCoordenates
    }

    convertToSpherics(coordenates) {
        let sphericsCoordenates = []
        coordenates.map((point) => {
            let alfa = Math.acos(point.z)
            if(point.x > 0){
            sphericsCoordenates.push({
                lat: alfa,
                lon: Math.atan(point.y / point.x)
            })
        }
        })
        return sphericsCoordenates
    }

    changeScale(scale, coordenates) {
        coordenates.forEach((coordenate) => {
            coordenate.x = coordenate.x * scale
            coordenate.y = coordenate.y * scale
            coordenate.z = coordenate.z * scale
        })
        return coordenates
    }

    project(cartesiansCoordenates, radius, centerPositionX, centerPositionY, centerPositionZ) {
        let projectedPoints = []
        cartesiansCoordenates.forEach((point) => {
            if (point.z > 0) {
                projectedPoints.push({
                    x: point.x * radius + centerPositionX,
                    y: point.y * radius + centerPositionY,
                    z: point.z * radius + centerPositionZ
                })
            }
        })
        return projectedPoints
    }
}

export default Projection;