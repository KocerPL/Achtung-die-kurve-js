import { GameObject } from "./GameObject.js";
import { Vector } from "./Vector.js";
import { AABBComponent } from "./Components/AABBComponent.js";
import { Tail } from "./Tail.js";
import { CircleComponent } from "./Components/lineCircleComponent.js";

export class Player extends GameObject
{
constructor(position,rotation,scale,leftKeyCode,rightKeyCode,color)
{
    super(position,rotation,scale);
    this.radius =4;
    this.vel =1;
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
    this.break=
    {
        length:40,
        interval:300,
        last:0,
        is:false
    }

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
        this.rotVel=-1.8;
        else
        this.rotVel=0;
    }
    else if(this.rightKeyCode==ev.keyCode)
    {
        if(ev.type=="keydown")
        this.rotVel=1.8;
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
ctx.font = "5px Calibri";
ctx.fillText(this.score,this.position.x-1.75,this.position.y-5);
this.useTransfMat(ctx);
ctx.fillStyle="Yellow";
ctx.beginPath();
ctx.arc(0,0,this.radius,0,Math.PI*2,false);
ctx.fill();
//ctx.strokeStyle="red";
//ctx.beginPath();
//ctx.moveTo(0,0);
//ctx.lineTo(this.radius,0);
//ctx.stroke();
this.coll=false;

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
if(this.distance-(this.vel*4)>this.lastDistance)
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
}
addPoints(points)
{
    this.score+=points;
}
clearTail()
{
    this.tail.clear(this.position);
}
reset(position)
{

  this.position=position;
  this.lastPosition=position;
  this.clearTail();
  this.distance=0;
  this.lastDistance=0;
  this._alive = true;
  this.HALT=false;
  this.break=
  {
      length:40,
      interval:300,
      last:0,
      is:false
  }
}
}