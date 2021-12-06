import { Main } from "./Main.js";
import { Vector } from "./Vector.js";

export class MouseListener
{
    static listenerComponents= new Array();
    static ratioVec = new Vector(1,1);
   
    static init(ratioVec)
    {
        Main.canvas.addEventListener("mousedown",this.onMouse.bind(this),false);
        Main.canvas.addEventListener("mousemove",this.onMouse.bind(this),false);
        Main.canvas.addEventListener("mouseup",this.onMouse.bind(this),false);
        this.ratioVec = ratioVec;
    }
    static updateRatio(ratioVec)
    {
        this.ratioVec = ratioVec;
    }
    static draw(ctx)
    {

    }
    static onMouse(ev)
    {
//console.log(ev);
if(ev.type=="mousedown")
Main.canvas.style.cursor = "url('hover.cur'), auto";
if(ev.type=="mouseup")
Main.canvas.style.cursor = "url('cursor.cur'), auto";
//console.log(ev);
//ev.preventDefault();
let translatedVec= new Vector(((ev.clientX-Main.leftMargin)/this.ratioVec.x),ev.clientY/this.ratioVec.y);
for(let e of this.listenerComponents)
{
    e.parent.mouse(translatedVec,ev.type);
}
    }
    static addListener(e)
    {
        this.listenerComponents.push(e);
    }
//console.log((ev.layerX/this.ratioVec.x)," "+ev.layerY/this.ratioVec.y)
//console.log(this.ratioVec);
static reset()
{
    this.listenerComponents= new Array();
}
}