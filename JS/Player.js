import { GameObject } from "./GameObject.js";
import { Vector,colorValues } from "./Utils.js";

export class Player extends GameObject
{
constructor(position,rotation,canvaManager,collisionDetector,velocity,keyCodeLeft,keyCodeRight,color,image,scoreboard,name,onDeath)
{

    super(position,rotation,canvaManager);
    this.onDeathFunction=onDeath;
    this.image=image;
    this.score=0;
    this.velocity = velocity;
    this.keyCodeLeft = keyCodeLeft;
    this.keyCodeRight = keyCodeRight;
    this.color=color;
    this.scoreID=scoreboard.addDummy(name,this.score,this.color);
    this.scoreboard=scoreboard;
    this.collisionDetector=collisionDetector;
    this.pReset();
    this.addPosition();
    window.addEventListener('keydown', this.keyManage.bind(this),false);
    window.addEventListener('keyup', this.keyManage.bind(this),false);
    
}
pReset()
{
  if(this.collisionID!=undefined)
    {
        this.collisionDetector.removeDetector(this.collisionID);
        this.collisionID = undefined;
    }
    this.death=false;
    this.lastDistanceCheck=0;
    this.lastBreak=0;
    this.radius=3;
    this.samplingBreak=180;
    this.samplingTail=5;
    this.tailPositions=new Array();
    this.rotVel=this.velocity;
    this.velX=Math.cos(this.rotation*Math.PI/180)*this.velocity;
    this.velY=Math.sin(this.rotation*Math.PI/180)*this.velocity;
    this.distanceMoved=0;
    this.pause =false;
    this.left=false;
    this.right=false;
    this.frames=0;
    this.break=false
    this.pause =false;
    this.lastPosition=this.position;
    this.collisionArray=new Array(0);
  this.collisionID=this.collisionDetector.addCircleDetector(this.position,this.radius,30,this.collisionTest.bind(this));
  this.addPosition();
}
setPause(pause)
{
    this.pause = pause;
}
update()
{
    
}
draw()
{  
    this.frames++;
   this.samplingBreak=this.radius*70;
   this.breakLength=this.radius*6;
   this.scoreboard.changeDummy(this.scoreID,this.score);
     //tail
    //Segmentowanie
    var segments=new Array();
    var tmpSegment=new Array();
    var end=false;
    for(var i=0;i<this.tailPositions.length;i++)
    {
      if(!this.tailPositions[i].isBreak)
      {
        tmpSegment.push(this.tailPositions[i]);
      }
      else 
      {
          if(tmpSegment.length>0)
          {
          segments.push([...tmpSegment]);
          tmpSegment.length=0;
          }
      }
      
    }
    if(tmpSegment.length>0)
    {
    segments.push([...tmpSegment]);
    }
    //Rysowanie segmentów
    this.ctx.n.fillStyle=this.color;
    for(var i=0;i<segments.length;i++)
    {
       // end=false;
        //Zaokrąglony początek
        this.ctx.n.strokeStyle=this.color;
        this.ctx.n.beginPath();
        this.ctx.arc(segments[i][0].getX(),segments[i][0].getY(),segments[i][0].width/2,0,Math.PI*2,false);
        this.ctx.n.fill();
        //Rysowanie kresek
        this.ctx.n.beginPath();
       this.ctx.moveTo(segments[i][0].getX(),segments[i][0].getY());
        for(var a=1;a<segments[i].length;a++)
        {
         this.ctx.n.lineWidth=this.calcX(segments[i][a].width);
         this.ctx.lineTo( segments[i][a].getX(),segments[i][a].getY());
        }
        this.ctx.n.stroke();
        //Zaokrąglony koniec
        if(segments[i].length>1)
        {
            this.ctx.n.beginPath();
            this.ctx.arc(segments[i][segments[i].length-1].getX(),segments[i][segments[i].length-1].getY(),segments[i][segments[i].length-1].width/2,0,Math.PI*2,false);
            this.ctx.n.fill();
            end=true;
        }
    }
   
    if(segments.length>0&&!this.break && !end)
    {
        this.ctx.n.lineWidth=this.calcX(segments[segments.length-1][segments[segments.length-1].length-1].width);
     this.ctx.n.beginPath()
    this.ctx.moveTo(segments[segments.length-1][segments[segments.length-1].length-1].getX(),segments[segments.length-1][segments[segments.length-1].length-1].getY())
    this.ctx.lineTo(this.getX(),this.getY());
    this.ctx.n.stroke();
}
    
    /* old code
     for(var i=1;i<this.tailPositions.length;i++)
     {
                  
         if(!this.tailPositions[i].isBreak)
         {
        this.ctx.lineTo(this.tailPositions[i].getX(),this.tailPositions[i].getY());
         }
         else
         {
            
            this.ctx.n.stroke();
            for(var a=i;a>0;a--)
            {
                if(!this.tailPositions[a].isBreak)
                {
                    this.ctx.n.fillStyle=this.color;
                    this.ctx.n.beginPath();
            this.ctx.arc(this.tailPositions[a].getX(),this.tailPositions[a].getY(),this.radius,0,Math.PI*2,false);
            this.ctx.n.fill();
           break;
                }
            }
            this.ctx.n.beginPath();
        
            this.ctx.moveTo(this.tailPositions[i].getX(),this.tailPositions[i].getY());
                 }
                 
     }*/
     
     //player head
     if(!this.image)
     {
    this.ctx.n.fillStyle="yellow";
    this.ctx.n.beginPath();
    this.ctx.arc(this.getX(),this.getY(),this.radius,0,2 * Math.PI,false);
    this.ctx.n.fill();
     }
     else
     {
      this.ctx.n.save();

        // move to the center of the canvas
   //     this.ctx.n.translate(this.canvaManager.canvas.width/2,this.canvaManager.canvas.height/2);
   this.ctx.n.translate(this.calcX(this.getX()),this.calcY(this.getY()));
        // rotate the canvas to the specified degrees
        this.ctx.n.rotate((this.rotation+180)*Math.PI/180);
    
        // draw the image
        // since the this.ctx.n is rotated, the image will be rotated also
        this.ctx.n.drawImage(this.image,0,0,this.image.width,this.image.height,this.calcX(0-this.radius*2.5),this.calcY(0-this.radius*2.5),this.calcX(this.radius*5),this.calcY(this.radius*5));
   //     this.ctx.n.rotate((this.rotation*Math.PI/180)*-1);
        // we’re done with the rotating so restore the unrotated this.ctx.n
    this.ctx.n.restore();
         //this.ctx.n.drawImage(this.image,0,0,this.image.width,this.image.height,this.calcX(this.getX())-this.radius*5,this.calcY(this.getY())-this.radius*5,this.radius*10,this.radius*10);
     }
    if(!this.pause)
    {
        this.distanceMoved+=this.velocity ;
   this.rotVel=this.velocity*2;
    this.velX=Math.cos(this.rotation*Math.PI/180)*this.velocity;
    this.velY=Math.sin(this.rotation*Math.PI/180)*this.velocity;
    this.setX(this.getX()+this.velX);
    this.setY(this.getY()+this.velY);
    if(this.left)
    {
        this.rotation=this.rotation-this.rotVel;
    }
    else if(this.right)
    {
        this.rotation=this.rotation+this.rotVel; 
    }
    }
    if(this.tailPositions.length>1 && !this.tailPositions[this.tailPositions.length-2].isBreak) 
    {
  var tmp= this.collisionDetector.addLineHitbox(new Vector(this.tailPositions[this.tailPositions.length-2].getX(),this.tailPositions[this.tailPositions.length-2].getY()),new Vector(this.tailPositions[this.tailPositions.length-1].getX(),this.tailPositions[this.tailPositions.length-1].getY()),this.radius*2,this.distanceMoved);
    tmp.dontCollideIDs.push(this.collisionID);
    this.collisionArray.push(tmp);
    for(var d=0;this.collisionArray.length>d;d++)
    {
        if(this.collisionArray[d].distance+20<this.distanceMoved)
        {
            this.collisionArray[d].dontCollideIDs.length=0;
            this.collisionArray.splice(d,1);
        }
    }
    }
    if( this.lastDistanceCheck+this.samplingTail<this.distanceMoved && !this.break)
    {
        this.lastDistanceCheck=this.distanceMoved;
        this.addPosition();
        
    }
    if( this.lastBreak+this.samplingBreak<this.distanceMoved)
    {
        this.break=true;
        this.addPosition();
        
    }
    if( this.lastBreak+this.samplingBreak+this.breakLength<this.distanceMoved)
    {
        this.lastBreak=this.distanceMoved;
        this.addPosition();
        this.break=false;  
        //this.addPosition();
          
    }
   
    //console.log(this.collisionTest());
 //this.rotation=this.rotation+0.1;
}
addPosition()
{
    this.tailPositions.push(new PathVector(this.getX(),this.getY(),this.radius*2,this.break));
   // console.log(this.tailPositions);
}
keyManage(ev)
{
    //console.log(ev);
    if(ev.type=="keydown")
    {
    if(ev.keyCode==this.keyCodeLeft)
    {
        this.right=false;
        this.left=true;
    }
    else if(ev.keyCode==this.keyCodeRight)
    {
        this.left=false;
        this.right=true;    
    }
    }else if(ev.type=="keyup")
    {
        if(ev.keyCode==this.keyCodeLeft)
        {
            this.left=false;
        }
        else if(ev.keyCode==this.keyCodeRight)
        {
            this.right=false;    
        } 
    }   

}
setRadius(radius)
{
    this.radius=radius;
}
collisionTest(obj)
{
    if(obj.type=="Edge" || !this.break)
    {
   this.pause=true;
   this.death=true;
  this.onDeathFunction(10);
    }
}
}
class PathVector extends Vector
{
constructor(x,y,width,isBreak)
{
    super(x,y);
    this.isBreak=isBreak;
    this.width=width;
}
}