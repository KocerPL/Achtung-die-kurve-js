import { Component } from "./Component.js";

export class KeyDownComponent extends Component
{
constructor(parent)
{
    super(parent);
    window.addEventListener("keydown",this.onKey.bind(this));
}
onKey(ev)
{
    this.parent.onKey(ev);
}
}