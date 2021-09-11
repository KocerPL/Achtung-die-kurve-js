export class CollisionDetector
{
    constructor()
    {
    this.detectArray=new Array(0);
    this.hitboxArray=new Array(0);
    }
    removeHitboxes()
    {
      this.hitboxArray=new Array(0);
    }
    removeLineHitboxes()
    {
      var arrayPositions=new Array(0);
      for(var a=0;a<this.hitboxArray.length;a++)
      {
       
        while(this.hitboxArray[a]!=undefined && this.hitboxArray[a].type=="Line")
        {
       // arrayPositions.push(a);
        this.hitboxArray.splice(a, 1);
      //delete this.hitboxArray[a];
         //console.log( a);
        } 
      }

      
      console.log(this.hitboxArray);
    }
    addLineHitbox(startVector,endVector,width,distance)
    {
        var tmpHitbox={
          distance:distance,
            startVector:startVector,
            endVector:endVector,
            width:width,
            type:"Line",
            dontCollideIDs:[]
        }
        this.hitboxArray.push(tmpHitbox);
        return this.hitboxArray[this.hitboxArray.length-1];
    }
    addEdgeHitbox(a,direction)
    {
      var tmpHitbox={
         direction:direction,
          a:a,
          type:"Edge",
          dontCollideIDs:[]
      }
      this.hitboxArray.push(tmpHitbox);
      return this.hitboxArray[this.hitboxArray.length-1];
    }
    addCircleDetector(position,radius,rectHitbox,functionCall)
    {
     var tmpDetector={
         position:position,
         radius:radius,
         functionCall:functionCall,
         rectHitbox:rectHitbox,
         type:"Circle",
         id:(this.detectArray.length-1)
     };
        this.detectArray.push(tmpDetector);
        return tmpDetector.id;
    }
    removeDetector(id)
    {
     this.detectArray.splice(id, 1);
    }
    update()
    {
        for(var i=0; i<this.detectArray.length;i++)
        {
            for(var a=0;a<this.hitboxArray.length;a++)
            {
              var dontCheck=false;
              for(var c=0;c<this.hitboxArray[a].dontCollideIDs.length;c++)
            {
              if(this.detectArray[i].id==this.hitboxArray[a].dontCollideIDs[c])
              {
                dontCheck=true;
               break;  
              }
            }
            if(!dontCheck) {
                var tmpRectHitbox=this.detectArray[i].rectHitbox;
                var tmpObjectX=this.detectArray[i].position.getX();
                var tmpObjectY = this.detectArray[i].position.getY();
                if(this.hitboxArray[a].type=="Line")
                {
                var tmpX=this.hitboxArray[a].endVector.getX();
                var tmpY = this.hitboxArray[a].endVector.getY();
                if(tmpObjectX-tmpRectHitbox<tmpX
                   &&tmpObjectX+tmpRectHitbox>tmpX
                   &&tmpObjectY-tmpRectHitbox<tmpY
                   &&tmpObjectY+tmpRectHitbox>tmpY)
                   {                 
                    var tmpXstart=this.hitboxArray[a].startVector.getX();
                    var tmpYstart = this.hitboxArray[a].startVector.getY();
                    if(this.lineCircle(tmpXstart,tmpYstart,tmpX,tmpY,this.hitboxArray[a].width,tmpObjectX,tmpObjectY, this.detectArray[i].radius))
                    {
                      console.log(this.hitboxArray[a]);
                      //console.log(this.detectArray[i]);
                      var checkId=this.detectArray[i].id;
                      this.detectArray[i].functionCall(this.hitboxArray[a]);
                      if(i+1>this.detectArray.length || this.detectArray[i].id!= checkId)
                      {
                       break;
                      }
                    }   
                    }
                   
                }
                else if(this.hitboxArray[a].type=="Edge")
                {
                
                      if(this.hitboxArray[a].direction=="up" && tmpObjectY-this.detectArray[i].radius<this.hitboxArray[a].a)
                      {
                        var checkId=this.detectArray[i].id;
                        this.detectArray[i].functionCall(this.hitboxArray[a]);
                        if(i+1>this.detectArray.length || this.detectArray[i].id!= checkId)
                        {
                         break;
                        }
                      } 
                      if(this.hitboxArray[a].direction=="down" && tmpObjectY+this.detectArray[i].radius>this.hitboxArray[a].a)
                      {
                        var checkId=this.detectArray[i].id;
                        this.detectArray[i].functionCall(this.hitboxArray[a]);
                        if(i+1>this.detectArray.length || this.detectArray[i].id!= checkId)
                        {
                         break;
                        }
                      } 
                      if(this.hitboxArray[a].direction=="right" && tmpObjectX+this.detectArray[i].radius>this.hitboxArray[a].a)
                      {
                        var checkId=this.detectArray[i].id;
                        this.detectArray[i].functionCall(this.hitboxArray[a]);
                        if(i+1>this.detectArray.length || this.detectArray[i].id!= checkId)
                        {
                         break;
                        }
                      } 
                      if(this.hitboxArray[a].direction=="left" && tmpObjectX-this.detectArray[i].radius<this.hitboxArray[a].a)
                      {
                        var checkId=this.detectArray[i].id;
                        this.detectArray[i].functionCall(this.hitboxArray[a]);
                        if(i+1>this.detectArray.length || this.detectArray[i].id!= checkId)
                        {
                         break;
                        }
                      } 
                }
              }
            }
        }
    
    }
     lineCircle( x1,  y1,  x2,  y2, lw,  cx,  cy,  r) {

        // is either end INSIDE the circle?
        // if so, return true immediately
        var inside1 = this.pointCircle(x1,y1, cx,cy,r,lw/2);
        var inside2 = this.pointCircle(x2,y2, cx,cy,r,lw/2);
        if (inside1 || inside2) {
          return true;
        }
      
        // get length of the line
         var distX = x1 - x2;
        var distY = y1 - y2;
        var len = Math.sqrt( (distX*distX) + (distY*distY) );
      
        // get dot product of the line and circle
         var dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / Math.pow(len,2);
      
        // find the closest point on the line
         var closestX = x1 + (dot * (x2-x1));
         var closestY = y1 + (dot * (y2-y1));
      
        // is this point actually on the line segment?
        // if so keep going, but if not, return false
        var onSegment = this.linePoint(x1,y1,x2,y2, closestX,closestY);
        if (!onSegment) return false;
      
      
        // get distance to closest point
        distX = closestX - cx;
        distY = closestY - cy;
         distance = Math.sqrt( (distX*distX) + (distY*distY) );
      
        if (distance <= r+(lw/2)) {
          return true;
        }
        return false;
      }
      linePoint( x1,  y1, x2,  y2,  px,  py) {

        // get distance from the point to the two ends of the line
        var d1 = this.dist(px,py, x1,y1);
        var d2 = this.dist(px,py, x2,y2);
      
        // get the length of the line
        var lineLen = this.dist(x1,y1, x2,y2);
      
        // since floats are so minutely accurate, add
        // a little buffer zone that will give collision
        var buffer = 0.1;    // higher # = less accurate
      
        // if the two distances are equal to the line's 
        // length, the point is on the line!
        // note we use the buffer here to give a range, 
        // rather than one #
        if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
          return true;
        }
        return false;
      }
      // POINT/CIRCLE
      dist(x1,y1,x2,y2)
      {
        Math.sqrt( (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) )
      }
 pointCircle( px,  py,  cx,  cy,  r,pr) {

    // get distance between the point and circle's center
    // using the Pythagorean Theorem
    var distX = px - cx;
    var distY = py - cy;
    var distance = Math.sqrt( (distX*distX) + (distY*distY) );
  
    // if the distance is less than the circle's
    // radius the point is inside!
    if (distance <= r+pr) {
      return true;
    }
    return false;
  }
}