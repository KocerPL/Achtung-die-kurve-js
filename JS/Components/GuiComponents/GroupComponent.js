import { Component } from "../Component.js";

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
}