import { GameObject } from "./GameObject.js";
import { Vector } from "./Vector.js";
import { AABBComponent } from "./Components/AABBComponent.js";
import { Tail } from "./Tail.js";
import { CircleComponent } from "./Components/LineCircleComponent.js";
import { ScoreComponent } from "./Components/ScoreComponent.js";
import { Bonus } from "./Bonus.js";
import { Main } from "./Main.js";

export class Player extends GameObject
{
    static break={
        length:20,
        interval:250,
        last:0,
        is:false
    };
constructor(position,rotation,scale,leftKeyCode,rightKeyCode,color)
{
    super(position,rotation,scale);
    this.radius =3;
    this.vel =1.2;
    this.distance=0;
    this.rotVel=0;
    this.color=color;
    this.lastDistance=0;
    this.leftKeyCode=leftKeyCode;
    this.rightKeyCode=rightKeyCode;
    this.tail= new Tail(position,this);
    this.lastPosition=position;
    this._alive = true;
    this.HALT=false;
    this.score =0;
    this._scoreComp = this.addComponent(new ScoreComponent(this));
    this._drawDirection=false;
    this.cooldown = new Array();
    this.break=Object.assign({},Player.break);


    window.addEventListener("keydown",this.keyPress.bind(this),false);
    window.addEventListener("keyup",this.keyPress.bind(this),false);
    let temp = new CircleComponent(this);
    temp.setTag("Head");
    this.addComponent(temp);
    //this.addComponent(new SATPolygon(this,new Vector(-10,-10),new Vector(-10,10),new Vector(10,10),new Vector(10,-10)));
}
keyPress(ev)
{
    if(this.leftKeyCode==ev.keyCode)
    {
        if(ev.type=="keydown")
        this.rotVel=-this.vel*2;
        else
        this.rotVel=0;
    }
    else if(this.rightKeyCode==ev.keyCode)
    {
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
            this.vel=0;
            //   gameobject.remove = true;
               this.cooldown.push({
                   func:function(){this.vel=1.2;},
                   time:250 
               });
               return; 
        }
        else if(gameobject.type==Bonus.type.SHRINK)
        {
            this.radius-=1;
            //   gameobject.remove = true;
               this.cooldown.push({
                   func:function(){this.radius+=1;},
                   time:250 
               });
               return; 
        }
        else if(gameobject.type==Bonus.type.MAGNIFI)
        {
            this.radius+=1;
            //   gameobject.remove = true;
               this.cooldown.push({
                   func:function(){this.radius-=1;},
                   time:250 
               });
               return; 
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
                e.vel=0;
                //   gameobject.remove = true;
                   e.cooldown.push({
                       func:function(){e.vel=1.2;},
                       time:250 
                   });
                  
            } else if(gameobject.type==Bonus.type.SHRINK&& e.isAlive())
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
              
            }
        }
        }
            );
        }
       // console.log("ok");
      
    }
    console.log(this.color+": "+component.getTag());
    if(component.getTag()=="line"|| component.getTag()=="Head")
    {

        this.coll=true;
        if(!this.break.is)
        {
        this.HALT=true;
        this._alive = false;
        }
    }
    if(component.getTag()=="Frame")
    {

        this.coll=true;
        this.HALT=true;
        this._alive = false;
    }
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
ctx.arc(0,0,this.radius,0,Math.PI*2,false);
ctx.fill();
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
if(this.HALT) return;
this.velVec.x= Math.cos(this.rotation*(Math.PI/180))*this.vel;
this.velVec.y= Math.sin(this.rotation*(Math.PI/180))*this.vel;
super.update();
let pos = this.position;
this.rotation+=this.rotVel;
this.distance+=this.vel;
if(this.distance-8>this.lastDistance)
{
this.tail.addPoint(this.position);
this.lastDistance = this.distance;
this.lastPosition = this.position;
}
if(this.distance-this.break.interval>this.break.last && !this.break.is)
{
    this.tail.breakLine();
    this.break.is=true;
    this.break.last = this.distance;
}
if(this.distance>this.break.length+this.break.last && this.break.is)
{
this.break.is=false;
this.tail.continueLine(this.position);
}
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
  this.position=position;
  this.lastPosition=position;
  this.clearTail();
  this.distance=0;
  this.radius =3;
  this.lastDistance=0;
  this._alive = true;
  this.rotation = rot;
  this.HALT=false;
  this.break=Object.assign({},Player.break);

}
}