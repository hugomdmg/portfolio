import './App.css';
import React, { useEffect, useRef } from "react";

function dibujarObstaculo(ctx){
  for(let i = 0; i<2; i += 0.1){
    ctx.beginPath();
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;
    ctx.moveTo(50*Math.cos(i*Math.PI)+250, 50*Math.sin(i*Math.PI)+100);
    ctx.lineTo(50*Math.cos((i-0.1)*Math.PI)+250, 50*Math.sin((i-0.1)*Math.PI)+100);
    ctx.stroke();
  }
}


let flujo = [{x:-1, y:-1, vx: 10, vy: 0}];
function crearParticulas() {
  if (flujo[flujo.length - 1].x > 10) {
    for (let i = 0; i < 200; i += 5) {
      flujo.push({ x: 0, y: i, vx: 0.8, vy: 0});
    }
  }

  if(flujo.length>3000){
    for(let i = 0; i<30; i++){
      flujo.splice(i,1);
    }
  }
}

function flujo1() {
  flujo.map((particula) => {
    particula.x += particula.vx;
    particula.y += particula.vy;
  });
}

function dibujar(ctx) {
  crearParticulas();
  flujo1();
  flujo.map((particula) => {
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    ctx.moveTo(particula.x, particula.y);
    ctx.lineTo(particula.x + 1, particula.y + 1);
    ctx.stroke();
  });
}

function ImpactoObstaculo(){
  flujo.map((particula)=>{
    if(Math.sqrt(Math.pow(particula.x-250, 2)+Math.pow(particula.y-100,2))<52){
      let angulo = Math.atan((250-particula.x)/Math.abs(100-particula.y));
      let signo = 100-particula.y;
      if(angulo<Math.PI/4){
        particula.vx = particula.vx*Math.cos(angulo);
      }else{
        particula.vx = -0.9*particula.vx*Math.sin(angulo);
      };
        particula.vy = -signo/Math.abs(signo)*Math.abs(particula.vx);
    };
  });
  flujo.map((particula)=>{
    if(particula.vy !== 0 && particula.vx<1){
      particula.vx += 0.04;
    }
  })
  flujo.map((particula)=>{
    if(Math.abs(particula.vy)>0.4){
      if(particula.y<50){
        particula.vy += 0.2;
      }
      if(particula.y>150){
        particula.vy -= 0.2;
      }
    }
    if(particula.x>250 && Math.abs(particula.vy) < 0.3){
      if(particula.y<46){
        particula.vy += 0.01;
      }
      if(particula.y>154){
        particula.vy -= 0.01;
      }
    }
    if(Math.abs(particula.y - 100) < 4){
      particula.vy = -1*particula.vy/4;
    }
  })
};


function CurrentSimulation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    function simulacion() {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      dibujar(context);
      dibujarObstaculo(context);
      ImpactoObstaculo();
      requestAnimationFrame(simulacion);
    }
    simulacion();
  });

  return (
    <div id="corrienteCuadro">
      <canvas className='corrienteCanvas' ref={canvasRef} width="500" height="200"></canvas>
    </div>
  );
}


export default CurrentSimulation;
