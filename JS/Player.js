import { GameObject } from "./GameObject.js";
import { Vector } from "./Vector.js";
import { AABBComponent } from "./Components/AABBComponent.js";
import { Tail } from "./Tail.js";
import { CircleComponent } from "./Components/LineCircleComponent.js";
import { ScoreComponent } from "./Components/ScoreComponent.js";
import { Bonus } from "./Bonus.js";
import { Main } from "./Main.js";
import { Particle } from "./Particle.js";
import { KMath } from "./Utils.js";

export class Player extends GameObject
{
    static distDef = 2;
    static break={
        length:20,
        interval:250,
        last:0,
        is:false
    };
constructor(position,rotation,scale,leftKey,rightKey,color)
{
    super(position,rotation,scale);
    this.lastRot = rotation;
    this.hold=false;
    this.hold2=false;
    this.radius =3;
    this.vel =1.2;
    this.alp = 0;
    this.alpCh=true;
    this.awaitPoint=false;
    this.distance=0;
    this.crashSound = new Audio("/MSC/crashSound.wav");
    this.bonusSound = new Audio("/MSC/bonusPicked.wav");
    this.crashSound.playbackRate=3;
    this.rotVel=0;
    this.color=color;
    this.lastDistance=0;
    this._leftKeyClick =false;
    this._rightKeyClick =false;
    this.leftKey=leftKey.toUpperCase();
    this.rightKey=rightKey.toUpperCase();
    this.tail= new Tail(position,this);
    this.lastPosition=position;
    this._alive = true;
    this.HALT=false;
    this.score =0;
    this.stop = false;
    this._scoreComp = this.addComponent(new ScoreComponent(this));
    this._drawDirection=false;
    this.cooldown = new Array();
    this.break=Object.assign({},Player.break);
    this.invisible = false;
    this.curve90 = false;
    window.addEventListener("keydown",this.keyPress.bind(this),false);
    window.addEventListener("keyup",this.keyPress.bind(this),false);
    let temp = new CircleComponent(this);
    temp.setTag("Head");
    this.addComponent(temp);
    this.tail.addPoint(this.position);
    //this.addComponent(new SATPolygon(this,new Vector(-10,-10),new Vector(-10,10),new Vector(10,10),new Vector(10,-10)));
}

keyPress(ev)
{
    
    if(this.leftKey==ev.key.toUpperCase())
    {
        if(this.curve90)
        {
            if(ev.type=="keydown" )
         {
             if(!this.hold)
             {
            this.rotation-=90;
            this.hold=true;
             }
         }
            else
            this.hold=false;
        return;
        }
        if(ev.type=="keydown")
        {
        this._leftKeyClick =true
      }
        else
        this._leftKeyClick =false
    }
    else if(this.rightKey==ev.key.toUpperCase())
    {
        if(this.curve90)
        {
            if(ev.type=="keydown")
            {
                if(!this.hold2)
                {
                this.rotation+=90;
                this.hold2=true;
                }
             }
             else
             this.hold2=false;
            return;
        }
        if(ev.type=="keydown")
        this._rightKeyClick =true
        else
        this._rightKeyClick =false
    }
}
isAlive()
{
    return this._alive;
}
collision(gameobject,component,side)
{
 //   console.log(component.getTag());
    if(component.getTag()=="Bonus")
    {
       if(Main.soundsOn) this.bonusSound.play();
        if(gameobject.target ==Bonus.target.ME)
        {
        if(gameobject.type==Bonus.type.SPEED)
        {
        this.vel+=0.5;
     //   gameobject.remove = true;
        this.cooldown.push({
            func:function(){this.vel-=0.5;},
            time:400 
        });
        return;
        }
        else if(gameobject.type==Bonus.type.STOP)
        {
            this.stop =true;
               this.cooldown.push({
                   func:function(){this.stop=false; this.awaitPoint=true},
                   time:250 
               });
               return; 
        }
        else if(gameobject.type==Bonus.type.SHRINK&& this.radius-1>0)
        {
            this.radius-=1;
            this.awaitPoint=true
            //   gameobject.remove = true;
               this.cooldown.push({
                   func:function(){this.radius+=1;  this.awaitPoint=true;},
                   time:250 
               });
               return; 
        }
        else if(gameobject.type==Bonus.type.MAGNIFI)
        {
           
            this.radius+=1;
            this.awaitPoint=true
            //   gameobject.remove = true;
               this.cooldown.push({
                   func:function(){this.radius-=1; this.awaitPoint=true;},
                   time:250 
               });
               return; 
        }
        else if(gameobject.type==Bonus.type.INVISIBLE)
        {
            this.tail.breakLine(this.position);
            this.break.is=true;
            this.break.last = this.distance+100000;
            this.invisible=true;
            this.cooldown.push({
                func:function(){this.invisible=false;this.break.is=false;this.tail.continueLine(this.position); this.break.last = this.distance},
                time:200 
            });
        } else if(gameobject.type==Bonus.type.CURVE90)
        {
            this.rotVel=0;
            this.curve90=true;
            this._leftKeyClick =false;
            this._rightKeyClick=false;
            this.cooldown.push({
                func:function(){ this.curve90=false;},
                time:400 
            });
        }
        }
        else if(Bonus.target.OTHERS == gameobject.target)
        {
            Main.forPlayers(
                (e)=>{
                    if(e!=this)
                    {
            if(gameobject.type==Bonus.type.SPEED&& e.isAlive())
            {
            e.vel+=0.5;
         //   gameobject.remove = true;
            e.cooldown.push({
                func:function(){e.vel-=0.5;},
                time:400 
            });
           
            }
            else if(gameobject.type==Bonus.type.STOP&& e.isAlive())
            {
               
                e.stop = true;
                //   gameobject.remove = true;
                   e.cooldown.push({
                       func:function(){e.stop = false;e.awaitPoint=true},
                       time:250
                   });
                  
            } else if(gameobject.type==Bonus.type.SHRINK&& e.isAlive()&& e.radius-1>0)
            {
                e.radius-=1;
                e.awaitPoint=true
                //   gameobject.remove = true;
                   e.cooldown.push({
                       func:function(){e.radius+=1;e.awaitPoint=true;},
                       time:250 
                   });
              
            } else if(gameobject.type==Bonus.type.MAGNIFI&& e.isAlive())
            {
                e.radius+=1;
                e.awaitPoint=true
                //   gameobject.remove = true;
                   e.cooldown.push({
                       func:function(){e.radius-=1;e.awaitPoint=true},
                       time:250 
                   });
              
            }  else if(gameobject.type==Bonus.type.INVISIBLE)
            {
                e.tail.breakLine(e.position);
                e.break.is=true;
                e.break.last = e.distance+100000;
                e.invisible=true;
                e.cooldown.push({
                    func:function(){e.invisible=false;e.break.is=false;e.tail.continueLine(e.position); e.break.last = e.distance},
                    time:200 
                });
            } else if(gameobject.type==Bonus.type.CURVE90)
            {
                e.rotVel=0;
                e.curve90=true;
                e._leftKeyClick =false;
                e._rightKeyClick=false;
               e.cooldown.push({
                    func:function(){ e.curve90=false;},
                    time:400 
                });
            }
        }
        }
            );
        }
        else if(Bonus.target.ALL == gameobject.target)
        {
            Main.applyGlobalBonus(gameobject);
        }
       // console.log("ok");
      
    }
   // console.log(this.color+": "+component.getTag());
    if(component.getTag()=="line" || component.getTag()=="Head")
    {

        this.coll=true;
        if(!this.break.is && !this.invisible)
        {
         this.death();
        }
    }
    if(component.getTag()=="Frame")
    {
        if(Main.noborder)
        {
            this.tail.breakLine(this.position);
            this.cooldown.push({
                func:function(){this.tail.continueLine(this.position); },
                time:1 
            });
            if(side=="top")
            {  
                this.position.y =590; 
               // this.tail.continueLine(this.position);
            }
            else if(side=="down")
            {
                this.position.y =10; 
            }
            else if(side=="left")
            {
                this.position.x =793; 
            }else if(side=="right")
            {
                this.position.x =10; 
            }
        }
        else
        this.death();
      
    }
}
death()
{
    if(Main.soundsOn)  this.crashSound.play();
    for(var i =0;i<10;i++)
    {
        new Particle(Vector.add(this.position,this.velVec),KMath.randFR(1,1.4),KMath.randFR(0,360),KMath.randFR(0.2,0.35),KMath.randFR(20,30));
    }
  this.HALT=true;
  this._alive = false;
}
draw(ctx)
{
this.tail.draw(ctx);

ctx.lineWidth=1;
//ctx.font = "5px Calibri";
//ctx.fillText(this.score,this.position.x-1.75,this.position.y-5);
this.useTransfMat(ctx);
ctx.fillStyle="Yellow";
ctx.beginPath();
if(this.invisible) 
{
if(this.alpCH==true){ this.alp+=0.05;} else {this.alp-=0.05};
if(this.alp>1) this.alpCH= false; else if(this.alp<0.1) this.alpCH= true;
ctx.globalAlpha = this.alp; 
}
ctx.arc(0,0,this.radius,0,Math.PI*2,false);
ctx.fill();
ctx.globalAlpha = 1; 
ctx.strokeStyle="red";
if(this._drawDirection)
{
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
ctx.beginPath();
ctx.moveTo(this.radius+2,0);
ctx.lineTo(this.radius+8,0);
ctx.lineTo(this.radius+5,3);
ctx.moveTo(this.radius+8,0);
ctx.lineTo(this.radius+5,-3);
ctx.stroke();
}
this.coll=false;

}
setDrawDirection(bool)
{
    this._drawDirection=bool;
}

update()
{
if(this.HALT || Main.pause) return;
for(let i=this.cooldown.length-1;i>=0;i--)
{
    if(this.cooldown[i].time<=0)
    {
        let temp=this.cooldown[i].func.bind(this);
        temp();
        this.cooldown.splice(i,1);
    }
    else
    {
    this.cooldown[i].time--;
    //console.log(this.cooldown[i].time)
    }
}
if(this.stop) return;
this.velVec.x= Math.cos(this.rotation*(Math.PI/180))*this.vel;
this.velVec.y= Math.sin(this.rotation*(Math.PI/180))*this.vel;
super.update();
if(this._leftKeyClick)
{
this.rotation-=1.8*this.vel;
}else if(this._rightKeyClick)
{
    this.rotation+=1.8*this.vel;
}
this.distance+=this.vel;
if(this.distance-((this.radius*Player.distDef)+(this.tail.positions[this.tail.positions.length-1][this.tail.positions[this.tail.positions.length-1].length-1].width/2))>this.lastDistance && (this.rotation+0.1< this.lastRot ||this.rotation-0.1> this.lastRot || this.awaitPoint ))
{
    this.awaitPoint=false;
this.lastRot =this.rotation;
this.tail.addPoint(this.position);
this.lastDistance = this.distance;
this.lastPosition = this.position;
}
if(this.distance-this.break.interval>this.break.last && !this.break.is)
{
    this.tail.breakLine(this.position);
    this.break.is=true;
    this.break.last = this.distance;
}
if(this.distance>this.break.length+this.break.last && this.break.is)
{
this.break.is=false;
this.tail.continueLine(this.position);
}

}
addPoints(points)
{
    this._scoreComp.addPoints(points);
}
clearTail()
{
    this.tail.clear(this.position);
}
setStop(stop)
{
    this.HALT = stop;
}
reset(position,rot)
{
this.vel=1.2;
this.cooldown=new Array();
this.invisible =false;
  this.position=position;
  this.lastPosition=position;
  this.radius =3;
  this.clearTail();
  this.distance=0;
  this.hold=false;
  this.hold2=false;
  this.curve90=false;
  this.awaitPoint=false
  this.lastDistance=0;
  this._alive = true;
  this.rotation = rot;
  this.HALT=false;
  this.break=Object.assign({},Player.break);
  this.stop = false;
}
}