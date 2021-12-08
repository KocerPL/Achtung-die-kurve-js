export class Input
{
    static keys ={};
    static init()
    {
        window.addEventListener("keydown",this.onKeyDown.bind(this),false);
        window.addEventListener("keyup",this.onKeyUp.bind(this),false);
        window.addEventListener("mousedown",this.onMouseDown.bind(this),false);
        window.addEventListener("mousemove",this.onMouseMove.bind(this),false);
        window.addEventListener("mouseup",this.onMouseUp.bind(this),false);
    }
    static onKeyUp(e)
    {
        let key =   e.key.toUpperCase();
        this.keys[key] = false;
    }
    static onKeyDown(e)
    {
      let key =   e.key.toUpperCase();
      this.keys[key] = true;
    }
    static onMouseDown(e)
    {

    }
    static onMouseMove(e)
    {

    }
    static onMouseUp(e)
    {

    }
    static isPressed(key)
    {
        key = key.toUpperCase();
        if(this.keys[key] == undefined) { this.keys[key] = false ; return false; }
        return this.keys[key];
    }
}