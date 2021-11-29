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
    this.font=conf.font ??="PatrickHand";
    this.textBaseLine =conf.textBaseLine ??= "alphabetic";
    this.direction=conf.direction ??="inherit";
    this.alpha =conf.alpha;
}
draw(ctx)
{
let temp = ctx.globalAlpha;
if(typeof this.alpha !== typeof undefined)
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
setConf(conf)
{
    conf??={};
    this.textAlign=(conf.textAlign ??=this.textAlign);
    this.color =(conf.color ??= this.color);
    this.stroke =(conf.stroke ??=this.stroke);
    this.fontSize =(conf.fontSize ??=   this.fontSize);
    this.font=(conf.font ??=this.font);
    this.textBaseLine =(conf.textBaseLine ??=   this.textBaseLine);
    this.direction=(conf.direction ??= this.direction);
    this.alpha =(conf.alpha ??=this.alpha);
}
setText(text)
{
    this.text =( text ??= this.text);
}
setPos(vec)
{
    this.position =vec.copy();
}
}