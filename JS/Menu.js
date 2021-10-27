import { ListenerComponent } from "./Components/ListenerComponent.js";
import { ButtonComponent } from "./Components/GuiComponents/ButtonComponent.js";
import { SwitchComponent } from "./Components/GuiComponents/SwitchComponent.js";
import { TextComponent } from "./Components/GuiComponents/TextComponent.js";
import { Main } from "./Main.js";
import { Vector } from "./Vector.js";
export class Menu
{
  static componentArray = new Array();
  static mouseListener = new ListenerComponent(this);
  static enabledPlayers=0;
  static Title = this.addComponent(new TextComponent(this,new Vector(1024/2,100),"Achtung die kurve",{color:"white",textAlign:"center",font:"Comic Sans MS",fontSize:50}));
  static Author = this.addComponent(new TextComponent(this,new Vector((1024/2)-40,135),"Remake by",{color:"green",textAlign:"center",font:"Segoe Script",fontSize:25}));
  static Version = this.addComponent(new TextComponent(this,new Vector(5,595),"Version 5.0, Release 1",{color:"White",textAlign:"left",font:"Calibri",fontSize:15}));
  static Kocer = this.addComponent(new ButtonComponent(this,new Vector(552,115),new Vector(80,30),{text:"Kocer",color:"Yellow",textcolor:"Green", frame:false,font:"Segoe Script"}));
  static StartGameButton = this.addComponent(new ButtonComponent(this,new Vector(442,500),new Vector(160,30),{text:"Start",color:"Yellow", frame:true}));
  static GreenButton = this.addComponent(new SwitchComponent(this,new Vector(342,300),new Vector(160,30),{text:"Green  (<,>)",textcolor:"Green",color:"gray",frame:false}));
  static BlueButton = this.addComponent(new SwitchComponent(this,new Vector(342,260),new Vector(160,30),{text:"Blue  (a,d)",textcolor:"Blue",color:"Blue",frame:false}));
  static RedButton = this.addComponent(new SwitchComponent(this,new Vector(342,220),new Vector(160,30),{text:"Red  (←,→)",textcolor:"Red",color:"Red",frame:false}));
  static OrangeButton = this.addComponent(new SwitchComponent(this,new Vector(342,180),new Vector(190,30),{text:"Orange  (1,q)",textcolor:"orange",color:"orange",frame:false}));
  static init()
  {
    this.StartGameButton.setTextAlign("center");
  }
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
    else this.needPlayers ??= this.addComponent(new TextComponent(this,new Vector(1024/2,550),"You need at least 2 players to start game!!",{color:"Red",textAlign:"center",font:"Calibri",fontSize:15})); //alert("You need at least 2 players to start game!!");
    this.StartGameButton._click =false;
  }
  if(this.Kocer.getClick())
  {
    document.location = "https://github.com/KocerPL";
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
   /* ctx.font = "50px Comic Sans MS";
    ctx.textAlign="center";
    ctx.fillStyle="#ffffff";
    ctx.fillText("Achtung die Kurve!",1024/2,100);
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle="Green";
    ctx.fillText("Remake by Kocer",1024/2,140);
  */
}    
static mouse(pos,desc)
{
 
  if(Main.State!=Main.STATE.MENU) return;
  //console.log("ok");
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