export  class GameObject
{
constructor(position,rotation,canvaManager)
{
this.position=position;
this.rotation=rotation; 
canvaManager.addObject(this);
this.canvaManager = canvaManager;
this.ctx = this.canvaManager.ctx;
}
calcX(x)
{
return this.canvaManager.calcX(x);
}
calcY(y)
{
    return this.canvaManager.calcX(y);
}
getRotation()
{
    return this.rotation();
}
setRotation(rotation)
{
    this.rotation = rotation;
}
getPosition()
{
    return this.position;
}
getX()
{
    return this.position.getX();
}
getY()
{
    return this.position.getY();
}
setPosition(vector)
{
    this.position.set(vector.getX(),vector.getY());
}
setPosition(x,y)
{
    this.position.set(x,y);
}
setX(x)
{
    this.position.setX(x);
}
setY(y)
{
    this.position.setY(y);
}
draw()
{

}
}