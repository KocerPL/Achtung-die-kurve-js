import { Component } from "../Component.js";
import { ButtonComponent } from "./ButtonComponent.js";
export class GroupComponent extends Component
{
    constructor(parent,...components)
    {
        super(parent);
        for(let e of components)
        {
            this.addComponent(e);
        }
    }
   mouse(pos,desc)
    {
    for(var i=0;i<this.components.length;i++)
    {
  if(this.components[i] instanceof ButtonComponent)
  {
    this.components[i].mouse(pos,desc);
  }
    
    }
}
}