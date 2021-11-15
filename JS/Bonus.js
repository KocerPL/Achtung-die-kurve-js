import { GameObject } from "./GameObject.js";
import { Vector } from "./Vector.js";
import { CircleComponent } from "./Components/LineCircleComponent.js";
import { Main } from "./Main.js";
export class Bonus extends GameObject
{
    static type= Object.freeze({
        SPEED:1,
        STOP:2,
        SHRINK:3,
        MAGNIFI:4
    });    
    constructor(pos,type)
    {
        super(pos,0,new Vector(1,1));
        this.velVec=new Vector(0,0);
        this.type = type;
        this.radius =5;
        let temp = new CircleComponent(this);
    temp.setTag("Bonus");
    this.addComponent(temp);
    }
    draw(ctx)
    {
        ctx.beginPath();
        ctx.arc(this.position.x,this.position.y,this.radius,0,2*Math.PI,false);
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#ffff00";
        ctx.stroke();
    }
    update()
    {
        super.update();
    }
    collision(gmObj,comp)
    {
        if(comp.getTag()=="Head")
        {
            this.position = Main.genPlayerPos();
        }
     
    }
}