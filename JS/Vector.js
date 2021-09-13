export class Vector
{
    constructor(x,y)
    {
        this.x=x;
        this.y=y;
    }
    copy()
    {
        return new Vector(this.x,this.y);
    }
    static mult(vector,scalar)
    {
        return new Vector(vector.x*scalar,vector.y*scalar);
    }
    static add(v1,v2)
    {
        return new Vector(v1.x+v2.x,v1.y+v2.y);
    }
    static dot(v1,v2)
    {
        return new Vector(v1.x*v2.x,v1.y*v2.y)
    }
}