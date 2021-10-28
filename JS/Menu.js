import { ListenerComponent } from "./Components/ListenerComponent.js";
import { ButtonComponent } from "./Components/GuiComponents/ButtonComponent.js";
import { SwitchComponent } from "./Components/GuiComponents/SwitchComponent.js";
import { TextComponent } from "./Components/GuiComponents/TextComponent.js";
import {ChooseKeyComponent} from "./Components/GuiComponents/ChooseKeyComponent.js";
import { Main } from "./Main.js";
import { Vector } from "./Vector.js";
export class Menu
{
  static componentArray = new Array();
  static mouseListener = new ListenerComponent(this);
  static enabledPlayers=0;
  //head
  static Title = this.addComponent(new TextComponent(this,new Vector(1024/2,100),"Achtung die kurve",{color:"Yellow",textAlign:"center",font:"Comic Sans MS",fontSize:50}));
  static Author = this.addComponent(new TextComponent(this,new Vector((1024/2)-40,135),"Remake by",{color:"green",textAlign:"center",font:"Segoe Script",fontSize:25}));
  static Version = this.addComponent(new TextComponent(this,new Vector(5,595),"Version 5.0, Release 1",{color:"White",textAlign:"left",font:"Calibri",fontSize:15}));
  static Kocer = this.addComponent(new ButtonComponent(this,new Vector(552,115),new Vector(80,30),{text:"Kocer",color:"Yellow",textcolor:"Green", frame:false,font:"Segoe Script"}));
  static buttonsAlign = 302;
  static desc ={
    colors:this.addComponent(new TextComponent(Menu,new Vector(this.buttonsAlign,170),"Colors: ",{color:"White",textAlign:"left",font:"Comic Sans MS",fontSize:25})),
   // left:this.addComponent(new TextComponent(Menu,new Vector(this.buttonsAlign+130,170),"Left: ",{color:"White",textAlign:"left",font:"Comic Sans MS",fontSize:25}))
  };
  /*
  
  static pink ={
  button:this.addComponent(new SwitchComponent(this,new Vector(this.buttonsAlign,390),new Vector(130,30),{text:"> Pink",textcolor:"Pink",color:"gray",frame:false})),
  controls:
  {
  left:this.addComponent(new SwitchComponent(this,new Vector(this.buttonsAlign+130,390),new Vector(30,30),{text:"Z",textcolor:"Pink",color:"gray",frame:false})),
  right:this.addComponent(new SwitchComponent(this,new Vector(this.buttonsAlign+190,390),new Vector(30,30),{text:"X",textcolor:"Pink",color:"gray",frame:false}))
  }
  };
  static white ={
    align:360,
    button:this.addComponent(new SwitchComponent(this,new Vector(this.buttonsAlign,360),new Vector(130,30),{text:"> White",textcolor:"white",color:"gray",frame:false})),
    controls:
    {
    left:this.addComponent(new ChooseKeyComponent(this,new Vector(this.buttonsAlign+130,360),new Vector(30,30),{text:"1",textcolor:"white",color:"gray",frame:false})),
    right:this.addComponent(new ChooseKeyComponent(this,new Vector(this.buttonsAlign+190,360),new Vector(30,30),{text:"Q",textcolor:"white",color:"gray",frame:false}))
    }
    };
    */
 /* Old code*/
  //static cyanButton = this.addComponent(new SwitchComponent(this,new Vector(this.buttonsAlign,360),new Vector(130,30),{text:"> Cyan",textcolor:"Cyan",color:"gray",frame:false}));
 // static whiteButton = this.addComponent(new SwitchComponent(this,new Vector(this.buttonsAlign,330),new Vector(130,30),{text:"> White",textcolor:"white",color:"gray",frame:false}));
  //static pinkButton = this.addComponent(new SwitchComponent(this,new Vector(this.buttonsAlign,300),new Vector(130,30),{text:"> Purple",textcolor:"Purple",color:"gray",frame:false}));
  static GreenButton = this.addComponent(new SwitchComponent(this,new Vector(this.buttonsAlign,270),new Vector(130,30),{text:"> Green",textcolor:"Green",color:"gray",frame:false}));
  static BlueButton = this.addComponent(new SwitchComponent(this,new Vector(this.buttonsAlign,240),new Vector(130,30),{text:"> Blue",textcolor:"Blue",color:"Blue",frame:false}));
  static RedButton = this.addComponent(new SwitchComponent(this,new Vector(this.buttonsAlign,210),new Vector(130,30),{text:"> Red",textcolor:"Red",color:"Red",frame:false}));
  static OrangeButton = this.addComponent(new SwitchComponent(this,new Vector(this.buttonsAlign,180),new Vector(130,30),{text:"> Orange",textcolor:"orange",color:"orange",frame:false}));
 

static StartGameButton = this.addComponent(new ButtonComponent(this,new Vector(442,500),new Vector(160,30),{text:"Start",color:"Yellow", frame:true}));
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