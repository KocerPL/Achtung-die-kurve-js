import { Vector } from "./Utils.js";

export class Scoreboard
{
    constructor(x,y,width,height,canvasManager,scoreboardTitle)
    {
        this.texts=new Array(0);
        this.width=width;
        this.position = new Vector(x,y);
        this.height=height;
        canvasManager.addObject(this);
        this.ctx = canvasManager.getCtx();
        this.title=scoreboardTitle;
        this.textsSize=10;
    }
    addDummy(title,value,colour)
    {
        this.texts.push({title:title,value:value,colour:colour});
        return this.texts.length-1;
    }
    changeDummy(id,value)
    {
        this.texts[id].value=value;
    }
    draw()
    {
        
        this.ctx.n.font = this.ctx.calcX(30)+'px Arial';
        this.ctx.n.fillStyle="white";
        this.ctx.n.textAlign = "center"; 
        this.ctx.fillText(this.title, this.position.getX()+(this.width/2), this.position.getY()+30); 
       
        let currentY=this.position.getY()+40;
        this.ctx.n.font = this.ctx.calcX(20)+'px Arial';
    for(var i=0;i<this.texts.length;i++)
    {
        this.ctx.n.textAlign = "left"; 
        currentY+=20;
        this.ctx.n.fillStyle=this.texts[i].colour;
        this.ctx.fillText(this.texts[i].title, this.position.getX(), currentY); 
        this.ctx.n.fillStyle="red";
        this.ctx.n.textAlign = "right"; 
        this.ctx.fillText(this.texts[i].value, this.position.getX()+this.width, currentY); 
        
    }
      //  this.ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
}