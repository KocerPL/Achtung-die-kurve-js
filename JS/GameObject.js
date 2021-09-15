import { Vector } from "./Vector.js";
//!!!!Abstract class!!!!\\
export class GameObject
{
    constructor(position,rotation,scale)
    {
        if (!Vector.isVector(position)) throw new Error("Position must be a Vector");
        this.position = position.copy(position);
        this.rotation=rotation;
        this.scale=scale;
    }
    draw(ctx)
    {
        ctx.translate(this.position.x,this.position.y);
        ctx.rotate((180/Math.PI)* this.rotation);
    }
    update()
    {

    }

}