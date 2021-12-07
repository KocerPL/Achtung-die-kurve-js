import { Vector } from "../../Vector.js";
import { KeyDownComponent } from "../KeyDownComponent.js";
import { ButtonComponent } from "./ButtonComponent.js";

export class ChooseKeyComponent extends ButtonComponent
{
    constructor(parent,position,size,key ,style)
    {
        super(parent,position,size,style);
        this._click=true;
        this.defStyle=style;
        this.key =key.toUpperCase();
        this.awaitKey=false;
    //    this.textComponent.position =new Vector(this.position.x+(size.x/2),this.position.y+this.size.y)
        this.textComponent.setText(this.key);    
        this.setTextAlign("center");   
        window.addEventListener("keydown",this.onKey.bind(this));
    }
    mouse(pos,ev)
    {
        //console.log("mos");
        if(this.hidden) return;
        if(ev=="mousemove")
        {
       
        this._hover=false;
        }
        if(this.position.x<pos.x && 
            this.position.y<pos.y
            && this.size.x+this.position.x>pos.x
            && this.size.y+this.position.y>pos.y)
            {
                if(ev=="mousedown")
                {
                    this._click = true;
                    this.awaitKey=true;
                    this.color="red";
                }
                else  if(ev=="mousemove")
                {
                    this._hover=true;
                this.onHover();
                if(!this.awaitKey) this.color="gray";
                }
            //this.color=="gray" ? this.color="black":this.color="gray";
            } else  if(ev=="mousemove")
            {
            if(!this.awaitKey) this.color="black"
            else this.color="red" 
            }
           
    }
    onKey(ev)
    {
      if(this.awaitKey)
      {
          if(ev.type =="keydown")
          {          this.key= ev.key.toUpperCase();
        this.textComponent.setText( this.key);
        this._click=true;
        this.awaitKey=false;
        this.color="black";
          }
       }
    }
    draw(ctx)
    {
       
        super.draw(ctx);
        ctx.globalAlpha = 1;
    }
}