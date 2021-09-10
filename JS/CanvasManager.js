import { Vector } from "./Utils.js";
import { CustomCtx } from "./CustomCtx.js";
export class CanvasManager
{
    constructor(percentWidth,maxPercentHeight,proportion,visible,virtualWidth,clearEachFrame,useResizer)
    {
        this.useResizer = useResizer;
        this.clearEachFrame = clearEachFrame;
        this.centerPoint= new Vector(0,0);
     this.canvas = document.createElement('canvas');
     
     this.percentWidth = percentWidth;
     this.proportion = proportion;
     this.virtualWidth=virtualWidth;
     this.virtualHeight=virtualWidth/proportion;
     this.maxPercentHeight = maxPercentHeight;
         if(visible) document.body.appendChild(this.canvas);
         this.ctx = new CustomCtx(this.canvas.getContext('2d'),0,0);
         this.layout();
    this.drawObjectTable=[];
    if(useResizer) window.addEventListener('resize',this.layout.bind(this),false);
    }
    getCtx()
    {
        return this.ctx;
    }
    addObject(object)
    {
        this.drawObjectTable.push(object);
    }
    calcX(virtualX)
    {
        return virtualX*this.xProportion;
    }
    calcY(virtualY)
    {
        return virtualY*this.yProportion;
    }
    updateFrame()
    {
      if(this.clearEachFrame) this.ctx.n.clearRect(0,0,this.canvas.width,this.canvas.height);
        for(var i=0; i<this.drawObjectTable.length;i++)
        {
            this.drawObjectTable[i].draw();
            
        }
    }
    layout()
    {
        if(this.useResizer) 
        {
        this.maxHeight=window.innerHeight*this.maxPercentHeight*0.01;
        
        if(this.maxHeight>(window.innerWidth * this.percentWidth *0.01)/this.proportion)
        {
        this.canvas.width=window.innerWidth * this.percentWidth *0.01;;
        this.canvas.height=this.canvas.width/this.proportion;
        }
        else
        {   
        this.canvas.height=this.maxHeight;  
        this.canvas.width=this.canvas.height*this.proportion;
        }
    
       this.centerPoint.set(this.canvas.width/2,this.canvas.height/2);
       this.leftMargin=(window.innerWidth/2)-this.centerPoint.getX();
       this.topMargin=(window.innerHeight/2)-this.centerPoint.getY();
       this.canvas.style="position:absolute; left:"+this.leftMargin+"px; top:"+this.topMargin+"px; border:1px solid black;";
        }
        else
        {
            this.canvas.width=1920;
            this.canvas.height=this.canvas.width/this.proportion;  
        }
       this.xProportion=this.canvas.width/this.virtualWidth;
       this.yProportion=this.canvas.height/this.virtualHeight;
       this.ctx.setXProportion(this.xProportion);
       this.ctx.setYProportion(this.yProportion);
      
    }
}