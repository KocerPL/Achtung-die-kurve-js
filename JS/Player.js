import { GameObject } from "./GameObject.js";
import { Vector } from "./Vector.js";
import { AABBComponent } from "./Components/AABBComponent.js";
import { Tail } from "./Tail.js";

export class Player extends GameObject
{
constructor(position,rotation,scale,leftKeyCode,rightKeyCode)
{
    super(position,rotation,scale);
    this.radius =4;
    this.vel =1;
    this.distance=0;
    this.rotVel=0;
    this.lastDistance=0;
    this.leftKeyCode=leftKeyCode;
    this.rightKeyCode=rightKeyCode;
    this.tail= new Tail(position,this);
    this.lastPosition=position;
    this.break=
    {
        length:40,
        interval:360,
        last:0,
        is:false
    }

    window.addEventListener("keydown",this.keyPress.bind(this),false);
    window.addEventListener("keyup",this.keyPress.bind(this),false);
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
collision(gameobject,component)
{
    if(component.getTag()=="boundingBox")
    {
        
    }
    this.coll=true;
}
draw(ctx)
{
this.tail.draw(ctx);

ctx.lineWidth=1;
this.useTransfMat(ctx);
this.coll ? ctx.fillStyle="Red":ctx.fillStyle="Yellow";
ctx.beginPath();
ctx.arc(0,0,this.radius,0,Math.PI*2,false);
ctx.fill();
ctx.strokeStyle="red";
ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(this.radius,0);
ctx.stroke();
this.coll=false;

}
update()
{
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

}