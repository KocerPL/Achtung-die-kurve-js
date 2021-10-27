//!Abstract class!\\
export class Component
{
    constructor(parent)
    {
        this.parent = parent;
        this.tag;
        this.components = new Array();
    }
    update()
    {
        for(var i=0; i<this.components.length;i++)
        {
            this.components[i].update();
        }
    }
    draw(ctx)
    { for(var i=0; i<this.components.length;i++)
        {
            this.components[i].draw(ctx);
        }
    }
    getTag()
    {
        return this.tag;
    }
    setTag(tag)
    {
        this.tag = tag;
    }
    addComponent(comp)
    {
        this.components.push(comp);
    }
}