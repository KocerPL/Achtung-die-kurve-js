import { GameObject } from "./GameObject.js";
import { Main } from "./Main.js";
import { Vector } from "./Vector.js";

export class Counter extends GameObject
{
    constructor(pos, rot,size,fontfam,count,func)
    {
        super(pos.copy(),rot,new Vector(size,size));
        this.fontfam = fontfam;
        this.count = count*60;
        this.func = func;
        this.triggered =false;
        this.defSize = size;
        this.min = 0;
        this.dec = true;
    }
    draw(ctx)
    {
        if(this.triggered==false)
        {
        this.useTransfMat(ctx);
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center"; 
        ctx.font = '10px '+this.fontfam;
        ctx.fillText(Math.ceil(this.count/60),0,5);

        }
    }
    update()
    {
        if(Main.pause) return;
        if(this.dec) this.min+=0.03; else  this.min-=0.03;
        if(this.min>2)
        {
            this.dec = false;
        }
        else if(this.min<0)
        {
            this.dec = true;
        }
        this.setScale(new Vector(this.defSize - this.min,this.defSize-this.min));
        if(this.count>0) this.count--;
        else if(this.triggered==false)
        {this.func();
           
            this.triggered =true;
            delete this;
        }
    }
}