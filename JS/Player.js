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
    this.radius =3;
    this.vel =1.2;
    this.alp = 0;
    this.alpCh=true;
    this.distance=0;
    this.crashSound = new Audio("/MSC/crashSound.wav");
    this.bonusSound = new Audio("/MSC/bonusPicked.wav");
    this.crashSound.playbackRate=3;
    this.rotVel=0;
    this.color=color;
    this.lastDistance=0;
    this.leftKey=leftKey;
    this.rightKey=rightKey;
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
    
    if(this.leftKey==ev.key)
    {
        if(this.curve90)
        {
            if(ev.type=="keydown" && !this.hold)
         {
            this.rotation-=90;
            this.hold=true;
         }
            else
            this.hold=false;
        return;
        }
        if(ev.type=="keydown")
        this.rotVel=-this.vel*2;
        else
        this.rotVel=0;
    }
    else if(this.rightKey==ev.key)
    {
        if(this.curve90)
        {
            if(ev.type=="keydown" && !this.hold)
            {
                this.rotation+=90;
                this.hold=true;
             }
             else
             this.hold=false;
            return;
        }
        if(ev.type=="keydown")
        this.rotVel=this.vel*2;
        else
        this.rotVel=0;
    }
}
isAlive()
{
    return this._alive;
}
collision(gameobject,component)
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
                   func:function(){this.stop=false},
                   time:250 
               });
               return; 
        }
        else if(gameobject.type==Bonus.type.SHRINK&& this.radius-1>0)
        {
            this.radius-=1;
            this.tail.addPoint(this.position);
            //   gameobject.remove = true;
               this.cooldown.push({
                   func:function(){this.radius+=1; this.tail.addPoint(this.position);},
                   time:250 
               });
               return; 
        }
        else if(gameobject.type==Bonus.type.MAGNIFI)
        {
           
            this.radius+=1;
            this.tail.addPoint(this.position);
            //   gameobject.remove = true;
               this.cooldown.push({
                   func:function(){this.radius-=1;this.tail.addPoint(this.position);},
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
                       func:function(){e.stop = false;},
                       time:250
                   });
                  
            } else if(gameobject.type==Bonus.type.SHRINK&& e.isAlive()&& e.radius-1>0)
            {
                e.radius-=1;
                //   gameobject.remove = true;
                   e.cooldown.push({
                       func:function(){e.radius+=1;},
                       time:250 
                   });
              
            } else if(gameobject.type==Bonus.type.MAGNIFI&& e.isAlive())
            {
                e.radius+=1;
                //   gameobject.remove = true;
                   e.cooldown.push({
                       func:function(){e.radius-=1;},
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
               e.cooldown.push({
                    func:function(){ e.curve90=false;},
                    time:400 
                });
            }
        }
        }
            );
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
if(this.alp>1 || this.alp<0) this.alpCH= !this.alpCH;
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
this.rotation+=this.rotVel;
this.distance+=this.vel;
if(this.distance-(this.radius*Player.distDef)>this.lastDistance && (this.rotation+0.1< this.lastRot ||this.rotation-0.1> this.lastRot  ))
{
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
  this.curve90=false;
  this.lastDistance=0;
  this._alive = true;
  this.rotation = rot;
  this.HALT=false;
  this.break=Object.assign({},Player.break);
  this.stop = false;
}
}