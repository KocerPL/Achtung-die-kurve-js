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
   
    ctx.lineWidth=this.positions[i][0].width;
    ctx.beginPath();
    ctx.moveTo(this.positions[i][0].x,this.positions[i][0].y);
   // ctx.lineCap = "round";
    for(var j=1;j<this.positions[i].length;j++)
    {
       
        if(ctx.lineWidth != this.positions[i][j].width)
        {
            ctx.lineWidth=this.positions[i][j].width;
            ctx.closePath();
            ctx.beginPath();
            if(j-1>=0)
            ctx.moveTo(this.positions[i][j-1].x,this.positions[i][j-1].y);
        }
      
   ctx.lineTo(this.positions[i][j].x,this.positions[i][j].y)
   // Arc filling
    //ctx.fillStyle=this.parent.color;
  //  ctx.beginPath()
// ctx.arc(this.positions[i][j].x,this.positions[i][j].y,this.parent.radius,0,Math.PI*2,false);
  // ctx.fill()
  
  ctx.stroke();
 
 
    }
    ctx.closePath();
    
}
if(!this.break)
{
ctx.beginPath();
ctx.moveTo(this.positions[this.positions.length-1][this.positions[this.positions.length-1].length-1].x,this.positions[this.positions.length-1][this.positions[this.positions.length-1].length-1].y);
ctx.lineTo(this.parent.position.x,this.parent.position.y);
ctx.stroke();
}
ctx.lineWidth=1;
}
addPoint(position)
{
    if(!this.break && position instanceof Vector)
    {
        let tmpPos = position.copy();
        const tmpRad = TailPoint.copyNumber(this.parent.radius);
    this.positions[this.currentIndex].push(new TailPoint(tmpPos.x,tmpPos.y, tmpRad*2) );
    if(this.positions[this.currentIndex].length>3)
    {
        var temp= new StaticCircleComponent(this, tmpRad,this.positions[this.currentIndex][this.positions[this.currentIndex].length-4]);
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
class TailPoint extends Vector
{
    constructor(x,y,width)
    {
        super(x,y);
        this.width=width;
    }
    static copyNumber(num)
    {
        return new Number(num);
    }
}