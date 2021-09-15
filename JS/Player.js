import { GameObject } from "./GameObject.js";
import { Vector } from "./Vector.js";

export class Player extends GameObject
{
constructor(position,rotation,scale)
{
    super(position,rotation,scale);
    this.velVec=new Vector(0,0);
    
}
draw(ctx)
{
super.draw(ctx);
ctx.beginPath();
ctx.arc(0,0,8,0,Math.PI*2);
ctx.fillStyle = "#ffffff";
ctx.closePath();
ctx.fill();
ctx.strokeStyle="red";
ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(10,0);
ctx.stroke();

}
update()
{
this.rotation=0;
}
}