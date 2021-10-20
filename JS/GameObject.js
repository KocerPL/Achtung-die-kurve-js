import { AABBComponent } from "./Components/AABBComponent.js";
import { Vector } from "./Vector.js";
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
        this.components=new Array();
        this.scaleVec= scaleVec.copy();
      
    }
    collision(gameobject,component)
    {

    }
    setScale(vec)
    {
        this.scaleVec= vec.copy();
    }
    updateComponents(parent)
    {
        for( var c of this.components)
        {
            c.update(parent);
        }
    }
    drawComponents(ctx)
    {
        for(var c of this.components)
        {
            c.draw(ctx);
        }
    }
   addComponent(component)
   {
       this.components.push(component)
   }
   removeComponent(tag)
   {
       for(var i=0;i<this.components.length;i++)
       {
        if(this.components[i].getTag()==tag)
        {
            this.components[i].splice(i,1);
        }
       }
   }
   findComponent(tag)
   {
    for(var i=0;i<this.components.length;i++)
    {
     if(this.components[i].getTag()==tag)
     {
         return this.components[i];
     }
    }
    return null;
   }
    useTransfMat(ctx)
    {
        this.drawComponents(ctx);
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
        this.updateComponents();
        this.position = Vector.add(this.position,this.velVec);
    }
    getBounds()
    {
        return DOMRect(this.x-10,this.y-10,this.x+10,this.y+10);
    }

}