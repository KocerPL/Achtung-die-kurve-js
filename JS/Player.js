import { GameObject } from "./GameObject.js";
import { kcCirc, kcRect } from "./Geometry.js";
import { Vector } from "./Vector.js";

export class Player extends GameObject
{
constructor(position,rotation,scale)
{
    super(position,rotation,scale);
    this.radius =8;
    this.parts = new Array(new kcRect(new Vector(-10,-10),new Vector(20,20)));
}
draw(ctx)
{
super.draw(ctx);
this.coll ? ctx.fillStyle="Red":ctx.fillStyle="White";
ctx.beginPath();
ctx.fillRect(-10,-10,20,20);
ctx.fill();
ctx.strokeStyle="red";
ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(8,0);
ctx.stroke();
}
update()
{
super.update();
let pos = this.position;
//this.rotation++;

}

}