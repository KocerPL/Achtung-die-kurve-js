import { KeyDownComponent } from "../KeyDownComponent.js";
import { ButtonComponent } from "./ButtonComponent.js";

export class ChooseKeyComponent extends ButtonComponent
{
    constructor(parent,position,size,style)
    {
        super(parent,position,size,style);
        this._click=true;
        this.defStyle=style;
        this.keyc= undefined;
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
                if(ev=="mousedown")
                {
                    if(this._click)
                    {
                        this.keyc = new KeyDownComponent(this);
                        this.addComponent(this.keyc);
              //  window.addEventListener("keydown",this.onKey.bind(this));
                this._click = false;
                    }
                }
                else if(ev=="mouseup")
               var o=1;// this._click=false;
                else  if(ev=="mousemove")
                {
                    this._hover=true;
                this.onHover();
                
                }
            //this.color=="gray" ? this.color="black":this.color="gray";
            }
            else
            {
                if(ev=="mousedown"&& !this._click)
                {
                    this._click = true;
                   delete this.keyc;
                }
            }
    }
    onKey(ev)
    {
        console.log(ev);
        this.textComponent.setText(ev.key);
        this._click=true;
        delete this.keyc;
    }
    rem()
    { ;}
    draw(ctx)
    {
        if(!this._click) ctx.globalAlpha = 0.5; else this.color=this.style.color;
        super.draw(ctx);
        ctx.globalAlpha = 1;
    }
}