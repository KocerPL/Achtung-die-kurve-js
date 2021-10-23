import { ListenerComponent } from "./Components/listenerComponent.js";
import { ButtonComponent } from "./Components/MenuComponents/ButtonComponent.js";
import { Main } from "./Main.js";
import { Vector } from "./Vector.js";
export class Menu
{
  static componentArray = new Array();
  static mouseListener = new ListenerComponent(this);
  static StartGameButton = this.addComponent(new ButtonComponent(this,new Vector(442,500),new Vector(160,30),{text:"Start",color:"Yellow", frame:true},this.startGame.bind(this)));
  static GreenButton = this.addComponent(new ButtonComponent(this,new Vector(342,300),new Vector(160,30),{text:"Green",color:"Green",frame:false},()=>{if(this.GreenButton.clicked){Menu.GreenButton.style.color="Green"; this.GreenButton.clicked=false;} else {Menu.GreenButton.style.color="rgba(0,255,0,0.1)"; this.GreenButton.clicked=true;}}));
static update()
{
  for(var i=0;i<this.componentArray.length;i++)
  {
this.componentArray[i].update();
  }
}
static startGame()
{
  Main.State=Main.STATE.GAME;
  Main.startGame();
}
static draw(ctx)
{
  for(var i=0;i<this.componentArray.length;i++)
  {
this.componentArray[i].draw(ctx);
  }
    ctx.font = "50px Comic Sans MS";
    ctx.textAlign="center";
    ctx.fillStyle="#ffffff";
    ctx.fillText("Achtung die Kurve!",1024/2,100);
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle="Green";
    ctx.fillText("Remake by Kocer",1024/2,140);
    this.StartGameButton.draw(ctx);
}    
static mouse(pos,desc)
{
 
  if(Main.State!=Main.STATE.MENU) return;
  console.log("ok");
  for(var i=0;i<this.componentArray.length;i++)
  {
if(this.componentArray[i] instanceof ButtonComponent)
{
  this.componentArray[i].mouse(pos,desc);
}
  
  }

}
static addComponent(e)
{
this.componentArray.push(e);
return e;
}
}