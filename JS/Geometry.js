import { Vector } from "./Vector.js";
export const GeoEnum = Object.freeze({RECT:1, TRIANGLE:2, CIRCLE:3,POINT:4,LINE:5 });
export class Geometry
{
static collide(geometry1,geometry2)
{
    if(!geometry1 instanceof Geometry || !geometry2 instanceof Geometry) throw new Error("Must be instance of geometry for collision test");
    switch( geometry1.type)
    {
        case GeoEnum.RECT:
            switch(geometry2.type)
            {
                case GeoEnum.RECT:
                   return this.rectRectColl(geometry1,geometry2);
                    break;
                case GeoEnum.TRIANGLE:
                    this.rectTriangleColl(geometry1,geometry2);
                    break;
                case GeoEnum.CIRCLE:
                    this.rectCircleColl(geometry1,geometry2)
                    break;
                case GeoEnum.POINT:
                    this.rectPointColl(geometry1,geometry2)
                    break;
                case GeoEnum.LINE:
                    this.rectLineColl(geometry1,geometry2)
                    break;
            }
            break;
        case GeoEnum.CIRCLE:
            switch(geometry2.type)
            {
                case GeoEnum.CIRCLE:
                   return this.circleCircle(geometry1,geometry2);
                break;
            }

    }
}
static rectRectColl(r1,r2)
{
      var r1x = r1.lTpos.x;
      var r1w = r1.widthVec.x;
      var r2x = r2.lTpos.x;
      var r2w = r2.widthVec.x;
      var r1y = r1.lTpos.y;
      var r1h = r1.widthVec.y;
      var r2y = r2.lTpos.y;
      var r2h = r2.widthVec.y;
      if (r1x + r1w >= r2x &&     // r1 right edge past r2 left
        r1x <= r2x + r2w &&       // r1 left edge past r2 right
        r1y + r1h >= r2y &&       // r1 top edge past r2 bottom
        r1y <= r2y + r2h) {       // r1 bottom edge past r2 top
          return true;
      }
      return false;
}
static SATcollision()
{
    
}
}
export class Convex extends Geometry
{
    constructor(...vectors)
    {
        for (let vec of vectors) {
            
        }
    }
}
export class kcRect extends Geometry
{
    constructor(posVec,widthVec)
    {
        super();
        this.lTpos = posVec.copy(); //left top position
        this.widthVec = widthVec.copy();
        this.type= GeoEnum.RECT;
    }
    static multByMat(mat,rectan)
    {
       return new kcRect(
            Vector.multByMatrix(rectan.lTpos,mat),
            Vector.multByMatrix(rectan.widthVec,mat,0),
        );
    }
}
export class kcTrian extends Geometry
{
    constructor(x,y,x2,y2,x3,y3)
    {
        this.vertex1 = new Vector(x,y);
        this.vertex2 = new Vector(x2,y2);
        this.vertex3 = new Vector(x3,y3);  
        this.type= GeoEnum.TRIANGLE;     
    }
}
export class kcCirc extends Geometry
{
    constructor(pos,r)
    {
        super();
        if(!(pos instanceof Vector)) throw new Error("possition must be vector!"); 
        this.position=pos.copy();
        this.r=r;
        this.type= GeoEnum.CIRCLE; 
    }
    static multByMat(circle,mat)
    {
     return new kcCirc(Vector.translate(circle.position,mat),circle.r);
    }
}
export class kcPoint extends Geometry
{
    constructor(x,y)
    {
        this.pos= new Vector(x,y);
        this.type= GeoEnum.POINT;
    }
}
export class kcLine extends Geometry
{
    constructor(x,y,dx,dy)
    {
        this.start = new Vector(x,y);
        this.end= new Vector(dx,dy);
        this.type= GeoEnum.LINE;
    }
}
