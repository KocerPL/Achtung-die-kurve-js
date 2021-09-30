import { AABBComponent } from "./Components/AABBComponent.js";
import { GameObject } from "./GameObject.js";
import { Vector } from "./Vector.js";

export class Tail extends GameObject
{
constructor(position,parent)
{
    super(position,0,new Vector(1,1));
  this.positions= new Array(new Array());
  this.positions[0].push(position.copy()); 
  this.parent = parent;
  this.lastPoint = null;
  this.break=false;
  this.currentIndex=0;
}
draw(ctx)
{
    ctx.lineCap = "round";
    ctx.strokeStyle="blue";
for(var i=0;i<this.positions.length;i++)
{
   
    ctx.lineWidth=this.parent.radius*2;
    ctx.beginPath();
    ctx.moveTo(this.positions[i][0].x,this.positions[i][0].y);
    for(var j=1;j<this.positions[i].length;j++)
    {
     ctx.lineTo(this.positions[i][j].x,this.positions[i][j].y)
    }
    ctx.stroke();
}
ctx.lineWidth=1;
}
addPoint(position)
{
    if(!this.break && position instanceof Vector)
    this.positions[this.currentIndex].push(position.copy());
}
collision(gameobject,component)
    {
console.log("coll");
    }
breakLine()
{
    this.break=true;
   
}
continueLine(position)
{
this.break=false;
this.currentIndex++;
this.positions[this.currentIndex]=new Array();
this.addPoint(position);
console.log(this.positions);
}
}