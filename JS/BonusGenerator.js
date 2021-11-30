import { Bonus } from "./Bonus.js";
import {Main} from "./Main.js";
import { Vector } from "./Vector.js";
import {KMath} from "./Utils.js";

export class BonusGenerator
{
    static timer =0;
    static interval = new Vector(70,300);
    static pause =false;
    static next =KMath.randFR(this.interval.x,this.interval.y);
    static newBonus()
    {
    //    let temp =KMath.randFR(1,2);
      //  console.log(temp)
       Main.gameObjects.push(new Bonus(Main.genPlayerPos(),Math.round(KMath.randFR(1,7))
       ,Math.round(KMath.randFR(1,2))));
    }
    static delBonus()
    {
        Main.gameObjects.forEach((e)=>{
            if(e instanceof Bonus)
            {
                e.remove=true;
            }
        })
    }
    static update()
    {
        if(!this.pause && Main.genBonus)
        {
       // console.log(this.timer);
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