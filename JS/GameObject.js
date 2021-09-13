import { Vector } from "./Vector.js";

export class GameObject
{
    constructor(position,rotation,scale)
    {
        if (!(position instanceof Vector)) throw new Error("Position must be a Vector");
        this.position = Vector.copy(position);
        this.rotation=rotation;
        this.scale=scale;
    }
    

}