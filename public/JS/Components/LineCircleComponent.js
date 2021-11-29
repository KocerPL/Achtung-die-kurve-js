import { Physics } from "../Physics.js";
import { Component } from "./Component.js";

export class CircleComponent extends Component
{
constructor(parent)
{
super(parent);
this.radius= parent.radius;
this.pos = parent.position.copy();
}
update()
{
    
    this.radius= this.parent.radius;
    this.pos = this.parent.position.copy();
    Physics.addCircleComponent(this);
}
}
