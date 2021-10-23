import { MouseListener } from "../MouseListener.js";
import { Component } from "./Component.js";

export class ListenerComponent extends Component
{
    constructor(parent)
    {
        super(parent);
        MouseListener.addListener(this);
    }

}