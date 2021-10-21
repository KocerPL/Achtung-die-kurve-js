import { Component } from "../Component.js";

export class ButtonComponent extends Component
{
    constructor(parent,position,size,text)
    {
        super(parent);
        this.position = position.copy();
        this.size = size.copy();
        this.text= text;
        this._hover=false;
      //  window.addEventListener('mousedown',this.checkClick.bind(this),false);
       // window.addEventListener('mousemove',this.checkHover.bind(this),false);
    }
    checkClick()
    {

    }
    checkHover(ev)
    {
console.log(ev);
    }
    onHover()
    {

    }
    draw(ctx)
    {
        ctx.strokeStyle="Gray";
        ctx.strokeRect(this.position.x,this.position.y,this.size.x,this.size.y);
        ctx.font = this.size.y+"px Comic Sans MS";
    ctx.textAlign="center";
    ctx.fillStyle="white";
    ctx.fillText(this.text,this.position.x+(this.size.x/2),this.position.y+this.size.y-3);
    }
}