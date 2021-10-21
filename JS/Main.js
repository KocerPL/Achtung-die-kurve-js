import { GameObject } from "./GameObject.js";
import { Physics } from "./Physics.js";
import { Player } from "./Player.js";
import { Vector } from "./Vector.js";
import { FrameHitbox } from "./Components/FrameHitbox.js";
import { Counter } from "./Counter.js";
import { Scoreboard } from "./Scoreboard.js";
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
    static gameObjects= new Array();
    //Canvas variables
    static canvas = document.createElement('canvas');
    static ctx = this.canvas.getContext("2d");
    static ratio = 1.7;
    static lastAliveCount = -1;
    static unitVectorMax= new Vector(1024,1024/this.ratio);
    static caMatr = new DOMMatrix();
    static resetTrig=false;
    static frameHitbox=new FrameHitbox(this,new Vector(5,5),new Vector(796.5,595.5));
    // if true then width *ratio < height
    static min = window.innerWidth/this.ratio<window.innerHeight;
    static start()
    {
        this.resize();
        window.addEventListener('resize',this.resize.bind(this),false);
        this.frameHitbox.setTag("Frame");
        this.gameObjects.push(new Player(new Vector(Math.random()*700+10,Math.random()*580+10),Math.random()*360,new Vector(1,1),65,68,"blue"));
        this.gameObjects.push(new Player(new Vector(Math.random()*700+10,Math.random()*580+10),Math.random()*360,new Vector(1,1),37,39,"red"));
        this.gameObjects.push(new Player(new Vector(Math.random()*700+10,Math.random()*580+10),Math.random()*360,new Vector(1,1),188,190,"green"));
       this.forPlayers((p)=>{ 
           p.setStop(true);
           p.setDrawDirection(true);
       });
      this.gameObjects.push(new Counter(new Vector(405,281),0,10,"Comic Sans MS",3,()=>{
          this.forPlayers((p)=>{ 
              p.setStop(false);
              p.setDrawDirection(false);
        });
      }));
        this.lastAliveCount = this._getAlives().length;
        document.body.appendChild(this.canvas);
        requestAnimationFrame(this.animationLoop.bind(this),false);
    }
    static animationLoop(time)
    {
    requestAnimationFrame(this.animationLoop.bind(this),false);
        if(this.lastTime+(1000/this.maxFps)<=time)
        {
            //Update Calc
            let delta = time-this.lastTime;
            this.updateDelta+=delta;
            while(this.updateDelta>this.updateTime)
            {
                this.updateDelta-=this.updateTime;
                //Update
                Physics.update();
                Scoreboard.update();
                this.update();
            }
            this.ctx.clearRect(0,0,1024,1024/this.ratio);
            //Draw
           this.draw(time);
           this.lastTime=time;
        }
    }
    //Iterates for all Players in gameobjects
    static forPlayers(func)
    {
        for(var i=0;i<this.gameObjects.length;i++)
        {
            if(this.gameObjects[i] instanceof Player)

            {
                func(this.gameObjects[i]);
            }
        }
    }
    static draw(time)
    {
        //Draws gameobjects
       this.gameObjects.forEach((element)=>{if(element instanceof GameObject) {this.ctx.save();element.draw(this.ctx); this.ctx.restore()}});
       this.ctx.lineWidth = 5;
       this.ctx.strokeStyle="yellow";
       this.ctx.strokeRect(2.5,2.5,797.5,597.5);
       //scoreboard
       this.ctx.save();
       Scoreboard.draw(this.ctx);
       this.ctx.restore()
       //Info logging stuff
       let Alives = this._getAlives();
       this.ctx.font = "20px Calibri";
      this.ctx.fillText("Alive: "+Alives.length,5,45);
       //Fps measurement
       if(this.renderFPS)  
       {
           this.ctx.fillStyle="#ffffff";
           this.ctx.font = "20px Calibri";
           this.ctx.fillText("Fps: "+this.fps,5,25);
       }
       this.frames++;
       if(this.lastFpsMeasure+1000<=time)
       {
           this.fps=this.frames;
           this.lastFpsMeasure=time; 
           this.frames=0;
       }
    }
    static update()
    {
       this.checkConditions();    
        this.gameObjects.forEach((element)=>{if(element instanceof GameObject) {element.update()}});
    }
    //checks if player has died, and if it is time to reset
    static checkConditions()
    {
        let Alives = this._getAlives();
         //Adds points if player died
        if(Alives.length<this.lastAliveCount) 
        {
        for(let i=0;i<Alives.length;i++)
        {
            Alives[i].addPoints(1);
        }
        }
        this.lastAliveCount = Alives.length;
        //Resets game if there is no alive players
        if(Alives.length<=1 && this.resetTrig==false)
        {
            this.forPlayers((p)=>{ 
                p.reset(new Vector(Math.random()*700+10,Math.random()*580+10),Math.random()*360);
                p.setStop(true);
                p.setDrawDirection(true);
            });
           
           this.gameObjects.push(new Counter(new Vector(405,301),0,10,"Comic Sans MS",3,()=>{
               this.forPlayers((p)=>{ 
                   p.setStop(false);
                   p.setDrawDirection(false);
                   this.resetTrig = false;
             });
           }));
           this.resetTrig = true;
        }
    }
   //Resizes Canva and applies scale vector to main matrix
    static resize()
    {
    this.min = window.innerWidth/this.ratio<window.innerHeight;
    this.canvas.height= this.min?window.innerWidth/this.ratio: window.innerHeight;
    this.canvas.width = this.min?window.innerWidth: window.innerHeight*this.ratio;
    this.canvas.style.marginLeft = ((window.innerWidth-this.canvas.width)/2)+"px";
    this.canvas.style.marginRight = ((window.innerWidth-this.canvas.width)/2)+"px";
     //  this.ctx.scale(this.canvas.width/this.unitVectorMax.x,this.canvas.height/this.unitVectorMax.y);
    this.caMatr = new DOMMatrix();
    this.caMatr.scaleSelf(this.canvas.width/this.unitVectorMax.x,this.canvas.height/this.unitVectorMax.y);
    this.ctx.setTransform(this.caMatr);
    }
    static collision()
    {
        //console.log("FRAME");
    }
    static _getAlives()
    {
        let alive = new Array();
        this.forPlayers((p)=>{
            if(p.isAlive())
            {
                alive.push(p);
            }
        });
        return alive;
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