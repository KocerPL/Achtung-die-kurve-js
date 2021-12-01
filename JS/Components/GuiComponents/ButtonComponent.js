import { Vector } from "../../Vector.js";
import { Component } from "../Component.js";
import { TextComponent } from "./TextComponent.js";

export class ButtonComponent extends Component
{
    constructor(parent,position,size,style,textStyle)
    {
        super(parent);
        this.position = position.copy();
        this.size = size.copy();
        this.style= style ?? {};
        this.onclick=()=>{};
        this.margin =2.5;
        this.style.color ??= "gray";
        this.style.textcolor ??= "white";
        this._hover=false;
        this.hidden=false;
        this.textComponent = this.addComponent(new TextComponent(this,new Vector(this.position.x+this.margin,this.position.y+this.size.y-this.margin),this.style.text,textStyle??={color:this.style.textcolor,textBaseLine:"bottom",font:this.style.font??="PatrickHand",fontSize:this.size.y-(2*this.margin)}) )
       // console.log(this.textComponent);
        this.color = "black";
        this._click=false;
      //  window.addEventListener('mousedown',this.checkClick.bind(this),false);
       // window.addEventListener('mousemove',this.checkHover.bind(this),false);
    }
    setTextAlign(txtAlign)
    {
        switch(txtAlign)
        {
            case "center":
                this.textComponent.setPos(new Vector(this.position.x+(this.size.x/2),this.position.y+this.size.y-this.margin));
                this.textComponent.setConf({textAlign:"center"});
                break;
            case "start" || "left":
                this.textComponent.setPos(new Vector(this.position.x+this.margin,this.position.y+this.size.y-this.margin));
                this.textComponent.setConf({textAlign:"start"});
            break;
            case "end" || "right":
                this.textComponent.setPos(new Vector(this.position.x+this.size.x-this.margin,this.position.y+this.size.y-this.margin));
                this.textComponent.setConf({textAlign:"end"});
            break; 
        }
    }
    mouse(pos,ev)
    {
        if(this.hidden) return;
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
              //  console.log(ev);
                if(ev=="mousedown")
                {
                    this.onclick();
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
        if(this.hidden) return;
        ctx.fillStyle=this.color;
        ctx.fillRect(this.position.x,this.position.y,this.size.x,this.size.y);
        if(this.style.frame)
        {
       
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
    super.draw(ctx);
   // ctx.fillText(this.style.text,this.position.x+(this.size.x/2),this.position.y+this.size.y-3-this.size.y/10);
    }
}