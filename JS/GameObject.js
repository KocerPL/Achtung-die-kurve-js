import { Vector } from "./Vector.js";
import { Geometry, kcRect } from "./Geometry.js";
//!!!!Abstract class!!!!\\
export class GameObject
{
  
    constructor(position,rotation,scaleVec)
    {
        if (!Vector.isVector(position)) throw new Error("Position must be a Vector");
        if (!Vector.isVector(scaleVec)) throw new Error("Scale must be a Vector");
        this.position = position.copy(position);
        this.vel = 0;
        this.coll=false;
        this.velVec=new Vector(Math.random()*1+0.01,Math.random()*1+0.01);
        this.rotation=rotation;
        this.parts=new Array();
        this.scaleVec= scaleVec.copy();
    }
    static checkCollision(go1,go2)
    {
       
        for(var i=0;i<go1.parts.length;i++)
        {
            for(var b=0;b<go2.parts.length;b++)
        {
           var  foif = Geometry.collide(kcRect.multByMat(go1.getTransfMat(),go1.parts[i]),kcRect.multByMat(go2.getTransfMat(),go2.parts[b]));
            if(foif)
            {
               return true;
             
            }
           
        }
        }
        return false;
    }
    draw(ctx)
    {
       let trMatrix = this.getTransfMat();
        ctx.transform(trMatrix.a,trMatrix.b,trMatrix.c,trMatrix.d,trMatrix.e,trMatrix.f);
    }
    getTransfMat()
    {
       let mat = new DOMMatrix();
       //translation
       mat.translateSelf(this.position.x,this.position.y);
       //scale
       mat.scaleSelf(this.scaleVec.x,this.scaleVec.y);
       //Rotation
       let c = Math.cos(this.rotation*(Math.PI/180));
       let s = Math.sin(this.rotation*(Math.PI/180));
      let rMat =new DOMMatrix(new Array(c,s,-s,c,0,0)); 
       mat.multiplySelf(rMat);
       return mat;
    }
    update()
    {
        this.position = Vector.add(this.position,this.velVec);
    }
    getBounds()
    {
        return DOMRect(this.x-10,this.y-10,this.x+10,this.y+10);
    }

}