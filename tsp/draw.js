class Draw {
    constructor(el) {
        this.elementId = el;
        this.canvas = document.getElementById(el);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        console.log('Canvas initialized on element:', el);
    }
    clear() {
        this.ctx.clearRect(0,0,this.canvas.clientWidth, this.canvas.clientHeight);
    }
    point(v) {
        this.ctx.beginPath();
        this.ctx.arc(v.x,v.y,5,0,2*Math.PI,false);
        this.ctx.fillStyle = 'black';
        this.ctx.fill();
    }
    line(v,w) {
        this.ctx.beginPath();
        this.ctx.moveTo(v.x,v.y);
        this.ctx.lineTo(w.x,w.y);
        this.ctx.strokeStyle = 'grey';
        this.ctx.stroke();
    }
    text(v,t) {
        this.ctx.textAlign = 'center';
        this.ctx.fillText(t,v.x,v.y);
    }
}