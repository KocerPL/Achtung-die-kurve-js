export class CustomCtx 
{
    constructor(ctx,xProportion,yProportion)
    {
        this.ctx = ctx;
        this.n= this.ctx;
        this.xProportion = xProportion;
        this.yProportion = yProportion;
    }
    setXProportion(xProportion)
    {
        this.xProportion=xProportion;
    }
    setYProportion(yProportion)
    {
        this.yProportion= yProportion;
    }
    calcX(virtualX)
    {
        return virtualX*this.xProportion;
    }
    calcY(virtualY)
    {
        return virtualY*this.yProportion;
    }
   
    //Normalne metody
    fillRect(x,y,width,height)
    {
        this.ctx.fillRect(this.calcX(x),this.calcY(y),this.calcX(width),this.calcY(height));
    }
    arc(x, y, radius, startAngle, endAngle , counterclockwise)
    {
        this.ctx.arc(this.calcX(x),this.calcY(y),this.calcX(radius),startAngle,endAngle,counterclockwise);
    }
    moveTo(x,y)
    {
        this.ctx.moveTo(this.calcX(x),this.calcY(y));
    }
    lineTo(x,y)
    {
        this.ctx.lineTo(this.calcX(x),this.calcY(y));
    }
    fillText(text,x,y)
    {
       this.ctx.fillText(String(text), this.calcX(x), this.calcY(y)); 
    }
}