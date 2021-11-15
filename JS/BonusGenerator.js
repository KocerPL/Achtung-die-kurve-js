import { Bonus } from "./Bonus.js";
import {Main} from "./Main.js";
import { Vector } from "./Vector.js";
import {KMath} from "./Utils.js";
export class BonusGenerator
{
    static timer =0;
    static interval = new Vector(40,300);
    static pause =false;
    static next =KMath.randFR(this.interval.x,this.interval.y);
    static newBonus()
    {
       Main.gameObjects.push(new Bonus(Main.genPlayerPos(),"Speed"));
    
    }
    static update()
    {
        if(!this.pause)
        {
        console.log(this.timer);
        this.timer++;
        if(this.timer>=this.next)
        {
            this.timer=0;
            this.newBonus();
           this.next = KMath.randFR(this.interval.x,this.interval.y);
        }
    }
    }
}