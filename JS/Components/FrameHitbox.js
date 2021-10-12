import { Physics } from "../Physics.js";
import { Component } from "./Component.js";

export class FrameHitbox extends Component
{
constructor(parent,pos,dpos)
{
    super(parent);
    this.pos=pos.copy();
    this.dpos=dpos.copy();
    this.active=true;
    Physics.addFrameHitbox(this);
}
}