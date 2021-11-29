import { Component } from "./Component.js"
import { Vector } from "../Vector.js";
import { GameObject } from "../GameObject.js";
import { Physics } from "../Physics.js";
export class AABBComponent extends Component
{
    constructor(parent,offset,width)
    {
        super(parent);
        if(!(offset instanceof Vector && width instanceof Vector && parent instanceof GameObject)) throw new Error("Incorrect arguments.");
        this.offset = offset.copy();
        this.width = width.copy();
        this.update();
    }
update()
{
let pos = Vector.add(this.offset,this.parent.position);
this.center = Vector.add(pos,new Vector(this.width.x/2,this.width.y/2));
Physics.addAABBcomponent(this);
}
draw(ctx)
{
    let pos = Vector.add(this.offset,this.parent.position);
    ctx.strokeStyle="red";
    ctx.strokeRect(pos.x,pos.y,this.width.x,this.width.y);
}
}