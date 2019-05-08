

import Particle from './components/Particle'
import moment from 'moment';

(() => {

    const LELLODAY = moment("0515", "MMDD").startOf('day');
    const NOW = moment().startOf('day');
    const ISLELLODAY =  LELLODAY.diff(NOW, 'days') === 0 ? 'SI 👍' : 'NO';

    const canvas = document.querySelector("#scene");
    const ctx = canvas.getContext("2d");
    let particles = [];
    
    let amount = 0;
    let mouse = {x:0,y:0};
    let radius = 1;

    const render = () => {
        requestAnimationFrame(render);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < amount; i++) {
            particles[i].render(mouse, radius);
        }
    };

    const initScene = () => {
        const ww = canvas.width = window.innerWidth;
        const wh = canvas.height = window.innerHeight;
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        ctx.font = "bold "+(ww/6)+"px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(ISLELLODAY, ww/2, wh/2);
    
        const data  = ctx.getImageData(0, 0, ww, wh).data;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "screen";
    
        particles = [];
        for(var i=0;i<ww;i+=Math.round(ww/100)){
            for(var j=0;j<wh;j+=Math.round(ww/100)){
                if(data[ ((i + j*ww)*4) + 3] > 100){
                    particles.push(new Particle(i,j, ctx, canvas));
                }
            }
        }
        amount = particles.length;
    
    }

   
    window.addEventListener("resize", initScene);
    window.addEventListener("mousemove", e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener("touchmove", e => {
        if(e.touches.length === 0 ) return;
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    });

    window.addEventListener("click", () => {
        radius++;
        if(radius ===5){
            radius = 0;
        }
    });

    window.addEventListener("touchend", ()=>{
        mouse.x = -9999;
        mouse.y = -9999;
    });

    initScene();
    requestAnimationFrame(render);


})();





