import { CircleComponent } from "./Components/LineCircleComponent.js";
import { Vector } from "./Vector.js";

export class Physics
{
    static aabbarray=new Array();
    static circleStatics= new Array();
    static circleComponents= new Array();
    static frameHitboxes= new Array();
    static linePointerArray = new Array();
    static addAABBcomponent(aabb)
    {
        this.aabbarray.push(aabb);
    }
    static addLineArray(arr)
    {
        this.linePointerArray.push(arr);
    }
    static addFrameHitbox(item)
    {
        this.frameHitboxes.push(item);
    }
    static addStaticComponent(item)
    {
      //  this.circleStatics.push(item);
    }
    static addCircleComponent(item)
    {
        this.circleComponents.push(item);
    }
    static update()
    {
        //AABB MUST BE FIRST FOR BOUNDING BOXES!!!!!!!!!!!!!!!
        this.updateAABB();
        this.updateFCcollision();
        this.updateCCcollision();
        this.updateLCcollision();
        this.circleComponents = new Array();
    }
    static updateAABB()
    {
        for(var i=0;i<this.aabbarray.length;i++)
        {
            for(var j=i+1;j<this.aabbarray.length;j++)
            {
                let c0 = this.aabbarray[i];
                let c1 = this.aabbarray[j]
               if(this.aabbCollision(c0,c1))
               {
                   c0.parent.collision(c1.parent,c0);
                   c1.parent.collision(c0.parent,c1);
               }
            }
        }
        this.aabbarray = new Array();
    }
    static updateLCcollision()
    {
        for(let arr of this.linePointerArray) 
        {
           // console.log(arr);
           for(let k=0;k<this.circleComponents.length;k++)
           {
                 for(let i =0;i<arr.length;i++)
                {
               
                    for(let j=arr[i].length-1; j>0;j--)
                    { 
                   
                     //   console.log("lag");
                        if(this.lineCircleColl(arr[i][j],arr[i][j-1],arr[i][j].width,this.circleComponents[k]) && (arr[i][j].parent.parent != this.circleComponents[k].parent || i<arr.length-1 || j<arr[i].length-2  )
                          )
                        {
                            this.circleComponents[k].parent.collision(arr[i][j].parent,arr[i][j]);
                          // console.log(i+"=i | j="+j);
                        }
                    }
                    
                }
                if(arr.length>0&& arr[arr.length-1].length>0)
                {
                let i = arr.length-1;
                let j = arr[i].length-1;
                if(this.lineCircleColl(arr[i][j],arr[i][j].parent.parent.position,arr[i][j].width,this.circleComponents[k]) && arr[i][j].parent.parent != this.circleComponents[k].parent && arr[i][j].parent.parent.invisible == false)
                {
                    this.circleComponents[k].parent.collision(arr[i][j].parent,arr[i][j]);
                  console.log(i+"=i | j="+j+"| LAST="+arr[i][j].parent.currentIndex);
                }
            }
            }
            
        } 
    }
    static CCcoll2(pos,pos2,rad,rad2)
    {
    if(this.calcDist(pos,pos2) < (rad+rad2)) return true;
    return false;
    }
    // Only part of code that I can't understand how it's fully working below \/
    // credits to: https://www.jeffreythompson.org/collision-detection/line-circle.php
    // to line 149
    static lineCircleColl(point,point2,width,circle)
    {
  let x1 = point.x;
  let x2 =point2.x;
  let y1 = point.y;
  let y2 =point2.y;
  let r = circle.radius;
  let cx = circle.pos.x;
  let cy = circle.pos.y;
    // get length of the line
  var distX = x1 - x2;
  var distY = y1 - y2;
  var len = Math.sqrt( (distX*distX) + (distY*distY) );
  if(!this.CCcoll2(circle.pos,point,len,r) || !this.CCcoll2(circle.pos,point2,len,r))
  {
    return false;

  }
    let inside1 = this.CCcoll2(point, circle.pos,point.width/2,r);
  let inside2 =this.CCcoll2(point2, circle.pos,point2.width/2,r);
  
  if (inside1 || inside2)
  {
     //console.log("coll");
     return true;
  }

  

  // get dot product of the line and circle
  var dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / Math.pow(len,2);

  // find the closest point on the line
  var closestX = x1 + (dot * (x2-x1));
  var closestY = y1 + (dot * (y2-y1));

  // is this point actually on the line segment?
  // if so keep going, but if not, return false
  var onSegment = this.linePoint(x1,y1,x2,y2, closestX,closestY);
  
  if (!onSegment) return false;

  // optionally, draw a circle at the closest
  // point on the line
 

  // get distance to closest point
  distX = closestX - cx;
  distY = closestY - cy;
  var distance = Math.sqrt( (distX*distX) + (distY*distY) );

  if (distance <= r+(width/2)) {
    return true;
  }
  return false;
    }
    static dist(x,y,x2,y2)
    {
      let  disX = x - x2;
  let disY = y - y2;
 return Math.sqrt( (disX*disX) + (disY*disY) );
    }
    static linePoint( x1,  y1,  x2,  y2,  px,  py) {

        // get distance from the point to the two ends of the line
        let d1 = this.dist(px,py, x1,y1);
        let d2 = this.dist(px,py, x2,y2);
      
        // get the length of the line
        let lineLen = this.dist(x1,y1, x2,y2);
      
        // since lets are so minutely accurate, add
        // a little buffer zone that will give collision
        let buffer = 0.1;    // higher # = less accurate
      
        // if the two distances are equal to the line's
        // length, the point is on the line!
        // note we use the buffer here to give a range,
        // rather than one #
        if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
          return true;
        }
        return false;
      }
    static updateCCcollision()
    {
        for(var i=0;i<this.circleComponents.length;i++)
        {
            for(var j=i+1;j<this.circleComponents.length;j++)
            {
                let c0 = this.circleComponents[i];
                let c1 = this.circleComponents[j]
               if(this.CircleCircleCollision(c0,c1))
               {
                   c0.parent.collision(c1.parent,c1);
                   c1.parent.collision(c0.parent,c0);
               }
            }
        }
      
    }
    static updateFCcollision() // Frame circle component collision
    {
        for(var i=0;i<this.frameHitboxes.length;i++)
        {
            for(var j=0;j<this.circleComponents.length;j++)
            {
                if(this.circleFrameCollision(this.circleComponents[j],this.frameHitboxes[i]))
               {
                  this.circleComponents[j].parent.collision(this.frameHitboxes[i].parent,this.frameHitboxes[i]);
                   this.frameHitboxes[i].parent.collision( this.circleComponents[j].parent,this.circleComponents[j]);
               }
            }
        }
    }
    static circleFrameCollision(cir,fra)
    {
        if(cir.pos.x+cir.radius>fra.dpos.x) return true;
        if(cir.pos.y+cir.radius>fra.dpos.y) return true;
        if(cir.pos.x-cir.radius<fra.pos.x) return true;
        if(cir.pos.y-cir.radius<fra.pos.y) return true;
        return false;
    }
    static CircleCircleCollision(cir1,cir2)
    {
       if(this.calcDist(cir1.pos,cir2.pos) < cir1.radius+cir2.radius) return true;
       return false;
    }
    static aabbCollision(c0,c1)
    {
        if(Math.abs(c0.center.x-c1.center.x)<(c0.width.x+c1.width.x)/2)
        {
            if(Math.abs(c0.center.y-c1.center.y)<(c0.width.y+c1.width.y)/2)
            {
            return true;
            }
        }
        return false;
    }
    static calcDist(vec1,vec2)
    {
     return Math.sqrt(Math.pow(vec2.x-vec1.x,2)+Math.pow(vec2.y-vec1.y,2));
    }
}