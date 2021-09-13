export class Main
{
    //loop variables
    static lastTime=0;
    static maxFps=61;
    //fpsMeasurement variables
    static fps =0;
    static frames=0;
    static lastFpsMeasure=0;
    static renderFPS = true;
    //Canvas variables
    static canvas = document.createElement('canvas');
    static ctx = this.canvas.getContext("2d");
    static ratio = 1.7;
    static xUnitMax =1024;
    static yUnitMax = this.xUnitMax/this.ratio;
    // if true width < height
    static min = window.innerWidth/this.ratio<window.innerHeight;
    static start()
    {
        this.resize();
        window.addEventListener('resize',this.resize.bind(this),false);
        document.body.appendChild(this.canvas);
        requestAnimationFrame(this.animationLoop.bind(this),false);
    }
    static animationLoop(time)
    {
    requestAnimationFrame(this.animationLoop.bind(this),false);
        if(this.lastTime+(1000/this.maxFps)<=time)
        {
            this.lastTime=time;
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.ctx.fillStyle = "#ffffff";
            //this.ctx.fillRect(0,0,200,200);
           
           if(this.renderFPS)  {this.ctx.font = "20px Calibri"; this.ctx.fillText("Fps: "+this.fps,0,20);};

            //Fps measurement
            this.frames++;
            if(this.lastFpsMeasure+1000<=time)
            {
            this.fps=this.frames;
            this.lastFpsMeasure=time; 
            this.frames=0;
        }
        }
        
    
    }
    static resize()
    {
    this.min = window.innerWidth/this.ratio<window.innerHeight;
    this.canvas.height= this.min?window.innerWidth/this.ratio: window.innerHeight;
    this.canvas.width = this.min?window.innerWidth: window.innerHeight*this.ratio;
    this.canvas.style.marginLeft = ((window.innerWidth-this.canvas.width)/2)+"px";
    this.canvas.style.marginRight = ((window.innerWidth-this.canvas.width)/2)+"px";
    this.ctx.scale(this.canvas.width/this.xUnitMax,this.canvas.height/this.yUnitMax);
    }
}
Main.start();