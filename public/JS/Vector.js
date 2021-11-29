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
       if(!this.isVector(vector)) throw new Error("vector property must be instance of Vector");
        return new Vector(vector.x*scalar,vector.y*scalar);
    }
    static add(v1,v2)
    {
        if(!(this.isVector(v1)&&this.isVector(v2))) throw new Error("v1 and v2 property must be instance of Vector");
        return new Vector(v1.x+v2.x,v1.y+v2.y);
    }
    static dot(v1,v2)
    {
        if(!(this.isVector(v1)&&this.isVector(v2))) throw new Error("v1 and v2 property must be instance of Vector");
        return new Vector(v1.x*v2.x + v1.y*v2.y)
    }
    static isVector(vec)
    {
        if (vec instanceof Vector) return true;
        return false;
    }
    static multByMatrix(vec,mat,trans)
    {
        trans==undefined ? trans=1:trans=trans;
        let x=(mat.m11*vec.x)+(mat.m21*vec.y)+(mat.m41*trans);
        let y=(mat.m12*vec.x)+(mat.m22*vec.y)+(mat.m42*trans);
        return new Vector(x,y);
    }
    static translate(vec,mat)
    {
        let x=(vec.x+mat.a);
        let y=(vec.y+mat.d);
        return new Vector(x,y);
    }
}
