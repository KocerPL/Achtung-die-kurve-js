import { ListenerComponent } from "./Components/ListenerComponent.js";
import { ButtonComponent } from "./Components/MenuComponents/ButtonComponent.js";
import { SwitchComponent } from "./Components/MenuComponents/SwitchComponent.js";
import { Main } from "./Main.js";
import { Vector } from "./Vector.js";
export class Menu
{
  static componentArray = new Array();
  static mouseListener = new ListenerComponent(this);
  static enabledPlayers=0;
  static StartGameButton = this.addComponent(new ButtonComponent(this,new Vector(442,500),new Vector(160,30),{text:"Start",color:"Yellow", frame:true},this.startGame.bind(this)));
  static GreenButton = this.addComponent(new SwitchComponent(this,new Vector(342,300),new Vector(160,30),{text:"Green  (<,>)",textcolor:"Green",color:"gray",frame:false}));
  static BlueButton = this.addComponent(new SwitchComponent(this,new Vector(342,260),new Vector(160,30),{text:"Blue  (a,d)",textcolor:"Blue",color:"Blue",frame:false}));
  static RedButton = this.addComponent(new SwitchComponent(this,new Vector(342,220),new Vector(160,30),{text:"Red  (←,→)",textcolor:"Red",color:"Red",frame:false}));
  static OrangeButton = this.addComponent(new SwitchComponent(this,new Vector(342,180),new Vector(190,30),{text:"Orange  (1,q)",textcolor:"orange",color:"orange",frame:false}));
static update()
{
  this.enabledPlayers=0;
  for(var i=0;i<this.componentArray.length;i++)
  {
this.componentArray[i].update();
if(this.componentArray[i] instanceof SwitchComponent && this.componentArray[i].getClick())
{
  this.enabledPlayers++;
}
  }
  if(this.StartGameButton.getClick())
  {
    if(this.enabledPlayers>1)
    this.startGame();
    else alert("You need at least 2 players to start game!!");
    this.StartGameButton._click =false;
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