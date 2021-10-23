import { Component } from "../Component.js";

export class ButtonComponent extends Component
{
    constructor(parent,position,size,style,onClick)
    {
        super(parent);
        this.position = position.copy();
        this.size = size.copy();
        this.style= style;
        this._hover=false;
        this.color = "black";
        this.onClick= onClick;
      //  window.addEventListener('mousedown',this.checkClick.bind(this),false);
       // window.addEventListener('mousemove',this.checkHover.bind(this),false);
    }
    mouse(pos,ev)
    {
        //console.log("mos");
        if(ev=="mousemove")
        {
        this.color="black";
        }
        if(this.position.x<pos.x && 
            this.position.y<pos.y
            && this.size.x+this.position.x>pos.x
            && this.size.y+this.position.y>pos.y)
            {
                console.log(ev);
                if(ev=="mousedown")
                this.onClick();
                else if(ev=="mousemove")
                {
                this.onHover();
           
                }
            //this.color=="gray" ? this.color="black":this.color="gray";
            }
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
        ctx.font = this.size.y+"px Comic Sans MS";
    ctx.textAlign="center";
    ctx.fillStyle=this.style.color;
    ctx.fillText(this.style.text,this.position.x+(this.size.x/2),this.position.y+this.size.y-3);
    }
}