import { Scoreboard } from "../Scoreboard.js";
import { Component } from "./Component.js";

export class ScoreComponent extends Component
{
    constructor(parent)
    {
        super(parent);
        this._score=0;
        Scoreboard.addScore(this);
    }
    addPoints(count)
    {
        this._score+=count;
    }
    getScore()
    {
        return this._score;
    }
}