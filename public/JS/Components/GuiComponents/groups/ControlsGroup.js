import { Vector } from "../../../Vector.js";
import { ButtonComponent } from "../ButtonComponent.js";
import { ChooseKeyComponent } from "../ChooseKeyComponent.js";
import { GroupComponent } from "../GroupComponent.js";
import { SwitchComponent } from "../SwitchComponent.js";
export class ControlsGroup extends GroupComponent
{
    constructor(parent,pos,keyLeft,keyRight,title,color)
    {
        super(parent);
            this.switch=this.addComponent( new SwitchComponent(parent,pos,new Vector(100,30),{text:title,textcolor:color,color:"gray",frame:false}));
            this.leftKeyComp = this.addComponent(new ChooseKeyComponent(parent,new Vector(pos.x+150, pos.y), new Vector(130,30),keyLeft,{frame:false}));
            this.rightKeyComp= this.addComponent(new ChooseKeyComponent(parent,new Vector(pos.x+300, pos.y), new Vector(130,30),keyRight,{frame:false}))
     this.title = title;
     this.color = color;
        }
  mouse(pos,desc)
{
 
  //console.log("ok");
  for(var i=0;i<this.components.length;i++)
  {
if(this.components[i] instanceof ButtonComponent)
{
  this.components[i].mouse(pos,desc);
}
  
  }

}
update()
{
    super.update();
    for(var i=0;i<this.components.length;i++)
    {
  if(this.components[i] instanceof ChooseKeyComponent)
  {
    this.components[i].hidden = !this.switch._click;
  }
    
    }
}
export()
{
    var ez ={};
    ez.active = this.switch._click;
    ez.leftKey = this.leftKeyComp.key;
    ez.rightKey = this.rightKeyComp.key;
    ez.title = this.title;
    ez.color = this.color;
    return ez;
}
}