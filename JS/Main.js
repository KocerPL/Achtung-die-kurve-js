import { GameObject } from "./GameObject.js";
import { Physics } from "./Physics.js";
import { Player } from "./Player.js";
import { Vector } from "./Vector.js";
import { FrameHitbox } from "./Components/FrameHitbox.js";
import { Counter } from "./Counter.js";
import { Scoreboard } from "./Scoreboard.js";
import { Menu } from "./Menu.js";
import { MouseListener } from "./MouseListener.js";
import { KMath } from "./Utils.js";
import { Bonus } from "./Bonus.js";
import { BonusGenerator } from "./BonusGenerator.js";
export class Main
{
    // object array
   // static objectArray = new Array();
    //loop variables
    static cursorhov= false;
    static lastTime=0;
    static maxFps=61;
    static updateTime=1000/60;
    static updateDelta=0;
   static leftMargin = 0;
   static pause = false;
   static tp= false;
    //fpsMeasurement variables
    static STATE = Object.freeze( {
        GAME: 1,
        MENU: 2
    });
    static State = this.STATE.MENU;
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
    static currentProportion =new Vector(1,1);
    static caMatr = new DOMMatrix();
    static resetTrig=false;
    static frameHitbox=new FrameHitbox(this,new Vector(5,5),new Vector(796.5,596.5));
    // if true then width *ratio < height
    static min = window.innerWidth/this.ratio<window.innerHeight;
    static start()
    {
        this.resize();
      Bonus.initGraphics();
        window.addEventListener('resize',this.resize.bind(this),false);
        MouseListener.init(this.currentProportion);
        Menu.init();
        document.body.appendChild(this.canvas);
        requestAnimationFrame(this.animationLoop.bind(this),false);
    }
    static onKey(ev)
    {
        //console.log(ev);
        if(ev.keyCode==32) 
        {
        this.pause= !this.pause
        if(this.resetTrig)
        {
            this.forPlayers((p)=>{ 
                p.reset(this.genPlayerPos(),Math.random()*360);
                p.setStop(true);
                p.setDrawDirection(true);
            });
            BonusGenerator.delBonus();
            BonusGenerator.pause=true;
           this.gameObjects.push(new Counter(new Vector(405,301),0,10,"Comic Sans MS",3,()=>{
               this.forPlayers((p)=>{ 
                   p.setStop(false);
                   p.setDrawDirection(false);
                   this.resetTrig = false;
                   BonusGenerator.pause=false;
             });
           }));
           this.resetTrig = false;
        }
        };
    }
    static startGame()
    {
        this.frameHitbox.setTag("Frame");
        if(Menu.BlueButton.getClick())  this.gameObjects.push(new Player(this.genPlayerPos(),Math.random()*360,new Vector(1,1),65,68,"Blue"));
        if(Menu.RedButton.getClick())  this.gameObjects.push(new Player(this.genPlayerPos(),Math.random()*360,new Vector(1,1),37,39,"Red"));
        if(Menu.GreenButton.getClick())  this.gameObjects.push(new Player(this.genPlayerPos(),Math.random()*360,new Vector(1,1),188,190,"Green"));
        if(Menu.OrangeButton.getClick())  this.gameObjects.push(new Player(this.genPlayerPos(),Math.random()*360,new Vector(1,1),49,81,"Orange"));
        BonusGenerator.pause=true;
       this.forPlayers((p)=>{ 
           p.setStop(true);
           p.setDrawDirection(true);
       });
      this.gameObjects.push(new Counter(new Vector(405,280),0,10,"Comic Sans MS",3,()=>{
          this.forPlayers((p)=>{ 
              p.setStop(false);
              p.setDrawDirection(false);
              
        });
        BonusGenerator.pause=false;
      }));
   //   this.gameObjects.push(new Bonus(new Vector(100,100),Bonus.type.SPEED));
        this.lastAliveCount = this._getAlives().length;
        window.addEventListener("keydown",this.onKey.bind(this),false);
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
    static genPlayerPos()
    {
        return new Vector(KMath.randFR(50,700),KMath.randFR(50,550));
    }
    static draw(time)
    {
      if(this.State==this.STATE.GAME) this.drawGame();
      else if(this.State==this.STATE.MENU) 
      {this.ctx.save();
          Menu.draw(this.ctx);
          this.ctx.restore();
      }
       //Fps measurement
       if(this.renderFPS)  
       {
        this.ctx.textAlign = "left";
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
    static drawGame()
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
  this.ctx.textAlign = "left";
  this.ctx.fillStyle="#ffffff";
  this.ctx.font = "20px Calibri";
  if(this.pause)
  this.ctx.fillText("|| Paused",5,50);
  if(this.resetTrig)
  {
  this.ctx.font = "50px Papyrus";
  this.ctx.textAlign = "center";
  this.ctx.fillText("Click space for next round",400,500);
  } 
  /*   //Info logging stuff
      let Alives = this._getAlives();
      this.ctx.font = "20px Calibri";
     this.ctx.fillText("Alive: "+Alives.length,5,45);
   */
    }
    static update()
    {
       // console.log(this.pause);
        if(this.State==this.STATE.GAME) {
            this.checkConditions();
            if(!this.pause) BonusGenerator.update();    
            this.gameObjects.forEach((element)=>{if(element instanceof GameObject) {if(!this.pause)  element.update()}});
            for(let i= this.gameObjects.length-1;i>=0;i--) 
            {
                let element = this.gameObjects[i];
                if(element instanceof GameObject && element.remove) 
                {
                    this.gameObjects.splice(i,1);
                }
            }
        }
      else if(this.State=this.STATE.MENU) Menu.update();
      
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
           
        this.resetTrig=true;
         this.pause=true;
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
   //Resizes Canva and applies scale vector to main matrix
    static resize()
    {
    this.min = window.innerWidth/this.ratio<window.innerHeight;
    this.canvas.height= this.min?window.innerWidth/this.ratio: window.innerHeight;
    this.canvas.width = this.min?window.innerWidth: window.innerHeight*this.ratio;
    this.leftMargin=((window.innerWidth-this.canvas.width)/2)
    this.canvas.style.marginLeft = this.leftMargin+"px";
    this.canvas.style.marginRight = ((window.innerWidth-this.canvas.width)/2)+"px";
     //  this.ctx.scale(this.canvas.width/this.unitVectorMax.x,this.canvas.height/this.unitVectorMax.y);
    this.caMatr = new DOMMatrix();
    this.caMatr.scaleSelf(this.canvas.width/this.unitVectorMax.x,this.canvas.height/this.unitVectorMax.y);
    this.currentProportion = new Vector(this.canvas.width/this.unitVectorMax.x,this.canvas.height/this.unitVectorMax.y);
    MouseListener.updateRatio(this.currentProportion);
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
- collision method(only with collision components)
Collision detection: 
- static method in object
- pass in another object

*/