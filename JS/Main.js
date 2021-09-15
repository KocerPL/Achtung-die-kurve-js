import { GameObject } from "./GameObject.js";
import { List } from "./List.js";
import { Player } from "./Player.js";
import { Vector } from "./Vector.js";

export class Main
{
    // object array
    static objectArray = new Array();
    //loop variables
    static lastTime=0;
    static maxFps=61;
    static updateTime=1000/60;
    static updateDelta=0;
    //fpsMeasurement variables
    static fps =0;
    static frames=0;
    static lastFpsMeasure=0;
    static renderFPS = true;
    static gameObjects= new List(GameObject);
    //Canvas variables
    static canvas = document.createElement('canvas');
    static ctx = this.canvas.getContext("2d");
    static ratio = 1.7;
    static unitVectorMax= new Vector(1024,1024/this.ratio);
    // if true then width *ratio < height
    static min = window.innerWidth/this.ratio<window.innerHeight;
    static start()
    {
        this.resize();
        window.addEventListener('resize',this.resize.bind(this),false);
        this.gameObjects.add(new Player(new Vector(100,10),0,1));
        document.body.appendChild(this.canvas);
        requestAnimationFrame(this.animationLoop.bind(this),false);
    }
    static animationLoop(time)
    {
    requestAnimationFrame(this.animationLoop.bind(this),false);
        if(this.lastTime+(1000/this.maxFps)<=time)
        {
            let delta = time-this.lastTime;
            this.updateDelta+=delta;
            while(this.updateDelta>this.updateTime)
            {
                this.updateDelta-=this.updateTime;
                //Update
                this.update();
            }
            
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            //Draw
           this.draw();
            //Fps measurement
            if(this.renderFPS)  
            {
                this.ctx.fillStyle="#ffffff";
                this.ctx.font = "20px Calibri";
                this.ctx.fillText("Fps: "+this.fps,0,20);
            }
            this.frames++;
            if(this.lastFpsMeasure+1000<=time)
            {
                this.fps=this.frames;
                this.lastFpsMeasure=time; 
                this.frames=0;
            }
        this.lastTime=time;
        }
    }
    static draw()
    {
        this.ctx.save();
       this.gameObjects.forEach((element)=>{element.draw(this.ctx); this.ctx.restore()
    });
    }
    static update()
    {
        this.gameObjects.forEach((element)=>{element.update()});
    }
    static resize()
    {
    this.min = window.innerWidth/this.ratio<window.innerHeight;
    this.canvas.height= this.min?window.innerWidth/this.ratio: window.innerHeight;
    this.canvas.width = this.min?window.innerWidth: window.innerHeight*this.ratio;
    this.canvas.style.marginLeft = ((window.innerWidth-this.canvas.width)/2)+"px";
    this.canvas.style.marginRight = ((window.innerWidth-this.canvas.width)/2)+"px";
    this.ctx.scale(this.canvas.width/this.unitVectorMax.x,this.canvas.height/this.unitVectorMax.y);
    }
}
Main.start();
/*
All game objects must have:
- draw method 
- update method
- collision method
Collision detection: 
- static method in object
- pass in another object

*/