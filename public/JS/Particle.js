import {GameObject} from "./GameObject.js"
import { Vector } from "./Vector.js"
import { Main } from "./Main.js"
export class Particle extends GameObject
{
    constructor(pos,vel,rot,scale,lifetime)
    {
        super(pos.copy(),rot,new Vector(scale,scale))
        this.lifetime = lifetime;
        this.vel = vel;
        Main.gameObjects.push(this);
    }
    draw(ctx)
    {
        ctx.globalAlpha = this.vel;
        this.useTransfMat(ctx);
        ctx.fillStyle="Yellow";
        ctx.fillRect(0,0,10,10);
ctx.globalAlpha =1;
    }
    update()
    {
        this.velVec.x= Math.cos(this.rotation*(Math.PI/180))*this.vel;
this.velVec.y= Math.sin(this.rotation*(Math.PI/180))*this.vel;
super.update();
this.vel-=0.04;
       this.lifetime--;
        if(this.lifetime<0|| this.vel<0)
        {
            this.remove = true;
        }
    }
}