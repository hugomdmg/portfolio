import { useRef, useEffect } from "react";

let n = 10;

function dibujar(ctx, n) {
    for(let i = 0; i<7; i=i+0.1){
      ctx.beginPath();
      ctx.strokeStyle = "rgb(207, 231, 225)";
      ctx.lineWidth = 2;
      ctx.moveTo(20*Math.cos(i)+50, 20*Math.sin(i)+50);
      ctx.lineTo(20*Math.cos(i-0.1)+50, 20*Math.sin(i-0.1)+50);
      ctx.stroke();
    }
    for(let i = 0; i<2; i=i+0.1){
        ctx.beginPath();
        ctx.strokeStyle = "rgb(207, 231, 225)";
        ctx.lineWidth = 6;
        ctx.moveTo(20*Math.cos(n+i)+50, 20*Math.sin(n+i)+50);
        ctx.lineTo(20*Math.cos(n+i-0.1)+50, 20*Math.sin(n+i-0.1)+50);
        ctx.stroke();
      }
  };

function Cargando(){
    const canvasRef = useRef(null);

    useEffect(() => {

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
  
      function simulacion() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        n = n + 0.1;
        dibujar(context, n);
        requestAnimationFrame(simulacion);
      }
      simulacion();
    });

    return (
        <div id="asteroidsCuadro">
          <canvas class='asteroidsCanvas' ref={canvasRef} width="100" height="100"></canvas>
        </div>
      ); 
};

export default Cargando;