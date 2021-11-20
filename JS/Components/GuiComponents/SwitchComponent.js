import { ButtonComponent } from "./ButtonComponent.js";
export class SwitchComponent extends ButtonComponent
{
    constructor(parent,position,size,style)
    {
        super(parent,position,size,style);
        this._click=false;
        this.defText = style.text;
      this.style.onClickText ??= this.style.text ;
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
                this._click = !this._click;
                if(!this._click)
                {
                    this.textComponent.text=this.defText;
                }
                else
                {
                    this.textComponent.text=this.style.onClickText; 
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
    }
    draw(ctx)
    {
        if(!this._click)
        {
            ctx.globalAlpha = 0.1;
          
        } 
      
       
        super.draw(ctx);
       
        ctx.globalAlpha = 1;
    }
}