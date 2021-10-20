import { Vector } from "./Vector.js";

export class Physics
{
    static aabbarray=new Array();
    static circleStatics= new Array();
    static circleComponents= new Array();
    static frameHitboxes= new Array();
    static addAABBcomponent(aabb)
    {
        this.aabbarray.push(aabb);
    }
    static addFrameHitbox(item)
    {
        this.frameHitboxes.push(item);
    }
    static addStaticComponent(item)
    {
        this.circleStatics.push(item);
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
    static updateCCcollision()
    {
        for(var i=0;i<this.circleComponents.length;i++)
        {
            for(var j=0;j<this.circleStatics.length;j++)
            {
                if(this.CircleCircleCollision(this.circleComponents[i],this.circleStatics[j]))
               {
                  this.circleComponents[i].parent.collision(this.circleStatics[j].parent,this.circleStatics[j]);
                   this.circleStatics[j].parent.collision( this.circleComponents[i].parent,this.circleComponents[i]);
               }
            }
        }
        for(var i=0;i<this.circleComponents.length;i++)
        {
            for(var j=i+1;j<this.circleComponents.length;j++)
            {
                let c0 = this.circleComponents[i];
                let c1 = this.circleComponents[j];
               if(this.CircleCircleCollision(c0,c1))
               {
                   c0.parent.collision(c1.parent,c0);
                   c1.parent.collision(c0.parent,c1);
               }
            }
        }
        this.circleComponents = new Array();
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
    static removeCHBP(parent)//removeCircleHitboxesByParent
    {
        for(let i=this.circleStatics.length-1;i>=0;i--)
        {
            if(this.circleStatics[i].parent==parent)
            {
                this.circleStatics.splice(i,1);
            }
        }
    }
    static calcDist(vec1,vec2)
    {
     return Math.sqrt(Math.pow(vec2.x-vec1.x,2)+Math.pow(vec2.y-vec1.y,2));
    }
}