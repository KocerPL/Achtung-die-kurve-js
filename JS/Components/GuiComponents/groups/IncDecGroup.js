import { Vector } from "../../../Vector.js";
import { ButtonComponent } from "../ButtonComponent.js";
import { GroupComponent } from "../GroupComponent.js";
import { TextComponent } from "../TextComponent.js";

export class IncDecGroup extends GroupComponent
{
    constructor(parent,pos,size)
    {
        super(parent);
        this.size = size;
        this.plusButton = this.addComponent(new ButtonComponent(parent,pos,new Vector(this.size.x/3,this.size.y),{text:"+"}));
        this.plusButton.setTextAlign("center");
        this.minusButton = this.addComponent(new ButtonComponent(parent,new Vector(pos.x+(this.size.x/3*2),pos.y),new Vector(this.size.x/3,this.size.y),{text:"-"}));
        this.minusButton.setTextAlign("center");
        this.maxVal =99;
        this.minVal=5
        this.val =10;
        this.pos= pos;
        this.valDisplay = this.addComponent(new TextComponent(parent,new Vector(pos.x+(this.size.x/2),pos.y+(0.85*this.size.y)),this.val,{color:"white",fontSize:this.size.y,textAlign:"center"}));
        this.plusButton.onclick = ()=>
        {
            if(this.val<this.maxVal)
            {
            this.val++;
            this.valDisplay.setText(this.val);
            }
        }
        this.minusButton.onclick = ()=>
        {
            if(this.val> this.minVal)
            {
            this.val--;
            this.valDisplay.setText(this.val);
            }
        }
    }
    draw(ctx)
    {
        super.draw(ctx);
        ctx.strokeStyle="red";
        ctx.strokeRect(this.pos.x,this.pos.y,this.size.x,this.size.y);
        ctx.moveTo(this.pos.x+(this.size.x/3),this.pos.y);
        ctx.lineTo(this.pos.x+(this.size.x/3),this.pos.y+this.size.y);
        ctx.stroke();
        ctx.moveTo(this.pos.x+(this.size.x/3*2),this.pos.y);
        ctx.lineTo(this.pos.x+(this.size.x/3*2),this.pos.y+this.size.y);
        ctx.stroke();
    }
}