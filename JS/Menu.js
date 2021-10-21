import { ButtonComponent } from "./Components/MenuComponents/ButtonComponent.js";
import { Vector } from "./Vector.js";
export class Menu
{
  static StartGameButton = new ButtonComponent(this,new Vector(442,400),new Vector(160,30),"Start")
static update()
{

}
static draw(ctx)
{
    ctx.font = "50px Comic Sans MS";
    ctx.textAlign="center";
    ctx.fillStyle="#ffffff";
    ctx.fillText("Achtung die Kurve!",1024/2,100);
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle="Green";
    ctx.fillText("Remake by Kocer",1024/2,140);
    this.StartGameButton.draw(ctx);
}    
}