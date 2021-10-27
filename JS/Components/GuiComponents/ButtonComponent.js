import { Component } from "../Component.js";

export class ButtonComponent extends Component
{
    constructor(parent,position,size,style)
    {
        super(parent);
        this.position = position.copy();
        this.size = size.copy();
        this.style= style ?? {};
        this.style.color ??= "gray";
        this.style.textcolor ??= "white";
        this._hover=false;
        this.color = "black";
        this._click=false;
      //  window.addEventListener('mousedown',this.checkClick.bind(this),false);
       // window.addEventListener('mousemove',this.checkHover.bind(this),false);
    }
    mouse(pos,ev)
    {
        //console.log("mos");
        if(ev=="mousemove")
        {
        this.color="black";
        this._hover=false;
        }
        if(this.position.x<pos.x && 
            this.position.y<pos.y
            && this.size.x+this.position.x>pos.x
            && this.size.y+this.position.y>pos.y)
            {
                console.log(ev);
                if(ev=="mousedown")
                {
                this._click =true;
                }
                else if(ev=="mouseup")
                {
                this._click=false;
                }
                 else if(ev=="mousemove")
                {
                    this._hover=true;
                this.onHover();
                
                }
            //this.color=="gray" ? this.color="black":this.color="gray";
            }
    }
    getClick()
    {
        return this._click;
    }
    onHover()
    {
        this.color="gray";
    }
    draw(ctx)
    {
        if(this.style.frame)
        {
        ctx.fillStyle=this.color;
        ctx.fillRect(this.position.x,this.position.y,this.size.x,this.size.y);
        ctx.strokeStyle="red";
        ctx.strokeRect(this.position.x,this.position.y,this.size.x,this.size.y);
        }
        else
        {
           // console.log(this._hover);
           if(this._hover) 
           {
               let lastglob=ctx.globalAlpha;
               ctx.globalAlpha=0.3;
               ctx.fillStyle="darkgray";
               ctx.fillRect(this.position.x,this.position.y,this.size.x,this.size.y);
               ctx.globalAlpha=lastglob;
           }
        }
        ctx.font = this.size.y-this.size.y/10+"px Comic Sans MS";
    ctx.textAlign="center";
    ctx.fillStyle=this.style.textcolor;
    ctx.fillText(this.style.text,this.position.x+(this.size.x/2),this.position.y+this.size.y-3-this.size.y/10);
    }
}