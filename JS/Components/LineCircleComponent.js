import { Component } from "./Component.js";

export class LineComponent extends Component
{
constructor(parent,pos1,pos2,width)
{
super(parent);
this.start = pos1.copy();
this.end = pos2.copy();
this.width = width;
}
}
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
    this.radius= parent.radius;
    this.pos = parent.position.copy();

}
}