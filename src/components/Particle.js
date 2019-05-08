const COLORS = ["#ff71ce","#01cdfe", "#05ffa1","#b967ff", "#fffb96"];

export default class Particle{
    constructor(x,y, ctx, canvas){
        const ww = canvas.width = window.innerWidth;
        const wh = canvas.height = window.innerHeight;

        this.x =  Math.random()*ww;
        this.y =  Math.random()*wh;
        this.dest = {
            x : x,
            y: y
        };
        this.r =  Math.random()*5 + 2;
        this.vx = (Math.random()-0.5)*20;
        this.vy = (Math.random()-0.5)*20;
        this.accX = 0;
        this.accY = 0;
        this.friction = Math.random()*0.05 + 0.94;
        this.color = COLORS[Math.floor(Math.random()*6)];
        this.ctx = ctx;
    }
    render(mouse, radius){
        this.accX = (this.dest.x - this.x)/1000;
        this.accY = (this.dest.y - this.y)/1000;
        this.vx += this.accX;
        this.vy += this.accY;
        this.vx *= this.friction;
        this.vy *= this.friction;
    
        this.x += this.vx;
        this.y +=  this.vy;
    
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
        this.ctx.fill();
    
        const a = this.x - mouse.x;
        const b = this.y - mouse.y;
    
        const distance = Math.sqrt( a*a + b*b );
        if(distance<(radius*70)){
            this.accX = (this.x - mouse.x)/100;
            this.accY = (this.y - mouse.y)/100;
            this.vx += this.accX;
            this.vy += this.accY;
        }
    }
}