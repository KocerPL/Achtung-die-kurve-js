//!Abstract class!\\
export class Component
{
    constructor(parent)
    {
        this.parent = parent;
        this.tag;
    }
    update()
    {

    }
    draw(ctx)
    {}
    getTag()
    {
        return this.tag;
    }
    setTag(tag)
    {
        this.tag = tag;
    }
}