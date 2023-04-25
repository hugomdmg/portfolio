class Draw {
    minDistance = 20

    init(canvas) {
        this.addCanvasContext(canvas)
        this.clearScreen()
    }

    paintPoint(point, radius, color) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color
        this.ctx.fillStyle = color;
        this.ctx.arc(point.x, point.y, radius, 0, 7);
        this.ctx.fill();
        this.ctx.stroke();
    }

    paintSquare(point, radius, color) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color
        this.ctx.fillStyle = color;
        this.ctx.rect(point.x, point.y, radius, radius);
        this.ctx.fill();
        this.ctx.stroke();
    }

    paintLine(line, center, minimun, color) {
        for (let i = 1; i < line.length - 1; i++) {
            if (line[i].z > minimun && this.getDistanceBtwPoints(line[i], line[i - 1]) < this.minDistance) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = color;
                this.ctx.lineWidth = 1;
                this.ctx.moveTo(line[i - 1].x + center.x, line[i - 1].y + center.y);
                this.ctx.lineTo(line[i].x + center.x, line[i].y + center.y);
                this.ctx.stroke();
            }
        }

    }

    canvasSize(){
        return ({
            x: this.ctx.canvas.width,
            y: this.ctx.canvas.height
        })
    }

    addCanvasContext(canvas) {
        this.ctx = canvas.getContext('2d')
    }

    clearScreen() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    getDistanceBtwPoints(point1, point2) {
        return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2) + Math.pow(point1.z - point2.z, 2))
    }
}

export default Draw;