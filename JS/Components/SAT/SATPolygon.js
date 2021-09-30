import { Vector } from "../../Vector.js";
import { SATComponent } from "../SATComponent.js";

export class SATPolygon extends SATComponent
{
    constructor(parent,...points)
    {
        super(parent);
            this.points = points;
    }
    update()
    {

    }
    draw(ctx)
    {
    let parent = this.parent;
    //draw shape
    let firstPoi = Vector.multByMatrix(this.points[0],parent.getTransfMat());
    ctx.strokeStyle="green";
    ctx.beginPath();
    ctx.moveTo(firstPoi.x,firstPoi.y);
    for(var i=1;i<this.points.length;i++)
    {
        let poi = Vector.multByMatrix(this.points[i],parent.getTransfMat());
        ctx.lineTo(poi.x,poi.y)
    }
    ctx.closePath();
    ctx.stroke();
    //normals
    ctx.strokeStyle="blue";
    let c = Math.cos(-90*(Math.PI/180));
    let s = Math.sin(-90*(Math.PI/180));
    let mat90 =new DOMMatrix(new Array(c,s,-s,c,0,0));
    let lastPoi = this.points[0];
    let point0 = Vector.multByMatrix(new Vector(0,0),parent.getTransfMat());
    for(var i=1;i<this.points.length;i++)
    {
        let nowPoi =this.points[i];
        let vec = Vector.add(Vector.mult(nowPoi,-1),lastPoi);
        vec= Vector.multByMatrix(vec,mat90);
        vec= Vector.multByMatrix(vec,parent.getTransfMat());
        ctx.beginPath();
        ctx.moveTo(point0.x,point0.y);
        ctx.lineTo(vec.x,vec.y);
        ctx.closePath();
        ctx.stroke();
        lastPoi = nowPoi;
    }
    let nowPoi =this.points[0];
        let vec = Vector.add(Vector.mult(nowPoi,-1),lastPoi);
        vec= Vector.multByMatrix(vec,mat90);
        vec= Vector.multByMatrix(vec,parent.getTransfMat());
        ctx.beginPath();
        ctx.moveTo(point0.x,point0.y);
        ctx.lineTo(vec.x,vec.y);
        ctx.closePath();
        ctx.stroke();
    }
}