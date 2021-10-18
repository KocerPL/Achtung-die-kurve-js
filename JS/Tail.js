import { AABBComponent } from "./Components/AABBComponent.js";
import { StaticCircleComponent } from "./Components/LineCircleComponent.js";
import { GameObject } from "./GameObject.js";
import { Physics } from "./Physics.js";
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
  this.break=false;  this.currentIndex=0;

}
draw(ctx)
{
    ctx.lineCap = "round";
    ctx.strokeStyle=this.parent.color;
for(var i=0;i<this.positions.length;i++)
{
   
    ctx.lineWidth=this.parent.radius*2;
    ctx.beginPath();
    ctx.moveTo(this.positions[i][0].x,this.positions[i][0].y);
    for(var j=1;j<this.positions[i].length;j++)
    {
     ctx.lineTo(this.positions[i][j].x,this.positions[i][j].y)
    //Arc filling
    // ctx.fillStyle="orange";
    //ctx.arc(this.positions[i][j].x,this.positions[i][j].y,this.parent.radius,0,Math.PI*2,false);
  //  ctx.fill();
    }
   ctx.stroke();
    
}
ctx.lineWidth=1;
}
addPoint(position)
{
    if(!this.break && position instanceof Vector)
    {
    this.positions[this.currentIndex].push(position.copy());
    if(this.positions[this.currentIndex].length>3)
    {
        var temp= new StaticCircleComponent(this,this.parent.radius,this.positions[this.currentIndex][this.positions[this.currentIndex].length-4]);
        temp.setTag("line");
    this.addComponent(temp);
    }
    }
}
collision(gameobject,component)
    {
//console.log("coll");
    }
breakLine()
{
    this.break=true;
    var temp= new StaticCircleComponent(this,this.parent.radius,this.positions[this.currentIndex][this.positions[this.currentIndex].length-2]);
    temp.setTag("line");
this.addComponent(temp);
var temp= new StaticCircleComponent(this,this.parent.radius,this.positions[this.currentIndex][this.positions[this.currentIndex].length-1]);
temp.setTag("line");
this.addComponent(temp);
}
continueLine(position)
{
this.break=false;
this.currentIndex++;
this.positions[this.currentIndex]=new Array();
this.addPoint(position);
//console.log(this.positions);
}
clear(position)
{
    this.currentIndex=0;
   this.positions=  new Array(new Array());
    this.lastPoint = null;
    this.break=false; 
    this.addPoint(position)
    Physics.removeCHBP(this);
}
}