import { GameObject } from "./GameObject.js";
import { Vector } from "./Vector.js";
import { CircleComponent } from "./Components/LineCircleComponent.js";
export class Bonus extends GameObject
{
    static type= Object.freeze({
        SPEED:1,
        STOP:2,
        SHRINK:3,
        MAGNIFI:4,
        INVISIBLE:5,
        CURVE90:6,
        KEYCHANGE:7,
        NOBORDER:8,
        CLEARTAILS:9,
        SHRINKBORDER:10,
        BLIND:11
    }); 
    static target= Object.freeze({
        ME:1,
         OTHERS:2,
         ALL:3
    }); 
    static graphicsLoaded = false
    static graphics =new Image();
        static initGraphics()
        {
          this.graphics.src="../IMG/bonus/bonus.svg"
          this.graphics.onload((e)=>{
              Bonus.graphicsLoaded = true;
          });
        }
    constructor(pos,type,target)
    {
        super(pos,0,new Vector(1,1));
        this.velVec=new Vector(0,0);
        this.type = type;
        this.active=true;
        if(type<8)
        this.target=target
        else
        {
            this.target=Bonus.target.ALL;
        }
        this.radius =13;
        this.tested=false;
        let temp = new CircleComponent(this);
    temp.setTag("Bonus");
    this.addComponent(temp);
    }
    draw(ctx)
    {
        if(!Bonus.graphicsLoaded) return;
        if(!this.tested)  {this.tested=true; return;}
        this.useTransfMat(ctx);
        if(this.target==Bonus.target.ME)
        {
        if(this.type== Bonus.type.SPEED) {
            ctx.drawImage(Bonus.graphics,400,0,200,200,-this.radius,-this.radius,this.radius*2,this.radius*2);
        }else  if(this.type== Bonus.type.STOP) {
            ctx.drawImage(Bonus.graphics,0,0,200,200,-this.radius,-this.radius,this.radius*2,this.radius*2);
        }else  if(this.type== Bonus.type.SHRINK) {
            ctx.drawImage(Bonus.graphics,1200,0,200,200,-this.radius,-this.radius,this.radius*2,this.radius*2);
        }else  if(this.type== Bonus.type.MAGNIFI) {
            ctx.drawImage(Bonus.graphics,800,0,200,200,-this.radius,-this.radius,this.radius*2,this.radius*2);
        } else  if(this.type== Bonus.type.INVISIBLE) {
            ctx.drawImage(Bonus.graphics,1600,0,200,200,-this.radius,-this.radius,this.radius*2,this.radius*2);
        } else  if(this.type== Bonus.type.CURVE90) {
            ctx.drawImage(Bonus.graphics,2000,0,200,200,-this.radius,-this.radius,this.radius*2,this.radius*2);
        } else  if(this.type== Bonus.type.KEYCHANGE) {
            ctx.drawImage(Bonus.graphics,2400,0,200,200,-this.radius,-this.radius,this.radius*2,this.radius*2);
        } 
    }
    else if(this.target==Bonus.target.OTHERS)
    {
        if(this.type== Bonus.type.SPEED) {
            ctx.drawImage(Bonus.graphics,600,0,200,200,-this.radius,-this.radius,this.radius*2,this.radius*2);
        }else  if(this.type== Bonus.type.STOP) {
            ctx.drawImage(Bonus.graphics,200,0,200,200,-this.radius,-this.radius,this.radius*2,this.radius*2);
        }else  if(this.type== Bonus.type.SHRINK) {
            ctx.drawImage(Bonus.graphics,1400,0,200,200,-this.radius,-this.radius,this.radius*2,this.radius*2);
        }  else  if(this.type== Bonus.type.MAGNIFI) {
            ctx.drawImage(Bonus.graphics,1000,0,200,200,-this.radius,-this.radius,this.radius*2,this.radius*2);
        } else  if(this.type== Bonus.type.INVISIBLE) {
            ctx.drawImage(Bonus.graphics,1800,0,200,200,-this.radius,-this.radius,this.radius*2,this.radius*2);
        }  else  if(this.type== Bonus.type.CURVE90) {
            ctx.drawImage(Bonus.graphics,2200,0,200,200,-this.radius,-this.radius,this.radius*2,this.radius*2);
        } else  if(this.type== Bonus.type.KEYCHANGE) {
            ctx.drawImage(Bonus.graphics,2600,0,200,200,-this.radius,-this.radius,this.radius*2,this.radius*2);
        } 
    }
    else if(this.target==Bonus.target.ALL)
    {
        if(this.type== Bonus.type.NOBORDER) {
            ctx.drawImage(Bonus.graphics,0,200,200,200,-this.radius,-this.radius,this.radius*2,this.radius*2);
        } else if(this.type== Bonus.type.CLEARTAILS) {
            ctx.drawImage(Bonus.graphics,200,200,200,200,-this.radius,-this.radius,this.radius*2,this.radius*2);
        }else if(this.type== Bonus.type.SHRINKBORDER) {
            ctx.drawImage(Bonus.graphics,400,200,200,200,-this.radius,-this.radius,this.radius*2,this.radius*2);
        } else if(this.type == Bonus.type.BLIND)
        {
            ctx.drawImage(Bonus.graphics,600,200,200,200,-this.radius,-this.radius,this.radius*2,this.radius*2);
        }
    }
      /*  ctx.beginPath();
        ctx.arc(0,0,this.radius,0,2*Math.PI,false);
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#ff0000";
        ctx.stroke();*/
    }
    update()
    {
        super.update();
       
    }
    collision(gmObj,comp)
    {
        if(comp.getTag()=="Head" || comp.getTag()=="line" || comp.getTag()=="Frame")
        {
          this.remove =true;
        }
     
    }
}