export class Physics
{
    static aabbarray=new Array();
    static addAABBcomponent(aabb)
    {
        this.aabbarray.push(aabb);
    }
    static update()
    {
        //AABB MUST BE FIRST FOR BOUNDING BOXES!!!!!!!!!!!!!!!
        this.updateAABB();
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
}