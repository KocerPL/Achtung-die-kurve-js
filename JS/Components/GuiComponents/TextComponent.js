import { Component } from "../Component.js";
export class TextComponent extends Component
{
constructor(parent,pos,text,conf)
{
    super(parent);
    //default settings
    this.position = pos.copy();
    this.text=text;
    conf??={};
    this.textAlign=conf.textAlign ??="start";
    this.color =conf.color ??= "black";
    this.stroke =conf.stroke ??=false;
    this.fontSize =conf.fontSize ??= 20;
    this.font=conf.font ??="Calibri";
    this.textBaseLine =conf.textBaseLine ??= "alphabetic";
    this.direction=conf.direction ??="inherit";
    this.alpha =conf.alpha ??=1;
}
draw(ctx)
{
let temp = ctx.globalAlpha;
ctx.globalAlpha=this.alpha;
ctx.font=this.fontSize+"px "+this.font;
ctx.direction= this.direction;
ctx.textBaseline = this.textBaseLine;
ctx.textAlign = this.textAlign;
if(this.stroke)
{
    ctx.strokeStyle= this.color;
    ctx.strokeText(this.text,this.position.x,this.position.y);
}
else
{
    ctx.fillStyle= this.color;
    ctx.fillText(this.text,this.position.x,this.position.y);
}
ctx.globalAlpha = temp;
}
}