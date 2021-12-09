import { GameObject } from "./GameObject.js";
import { Vector } from "./Vector.js";
import { Tail } from "./Tail.js";
import { CircleComponent } from "./Components/LineCircleComponent.js";
import { ScoreComponent } from "./Components/ScoreComponent.js";
import { Bonus } from "./Bonus.js";
import { Main } from "./Main.js";
import { Particle } from "./Particle.js";
import { KMath } from "./Utils.js";
import { Input } from "./Input.js";
import { Effect } from "./Default.js";
export class Player extends GameObject
{
    static distDef = 1;
    static break={
        length:20,
        interval:250,
        last:0,
        is:false
    };
constructor(position,rotation,scale,leftKey,rightKey,color)
{
    super(position,rotation,scale);
    this.lastRot = rotation;
    this.radius =3;
    this.vel =1.2;
    this.alp = 0;
    this.alpCh=true;
    this.awaitPoint=false;
    this.distance=0;
    this.crashSound = new Audio("/MSC/crashSound.wav");
    this.bonusSound = new Audio("/MSC/bonusPicked.wav");
    this.crashSound.playbackRate=3;
    this.rotVel=0;
    this.color=color;
    this.changeKeys =false;
    this.lastDistance=0;
    this.lastLeftKey = false;
    this.lastRightKey = false;
    this.leftKey=leftKey.toUpperCase();
    this.rightKey=rightKey.toUpperCase();
    this.tail= new Tail(position,this);
    this.lastPosition=position;
    this._alive = true;
    this.HALT=false;
    this.score =0;
    this.stop = false;
    this._scoreComp = this.addComponent(new ScoreComponent(this));
    this._drawDirection=false;
    this.cooldown = new Array();
    this.break=Object.assign({},Player.break);
    this.invisible = false;
    this.curve90 = false;
    let temp = new CircleComponent(this);
    temp.setTag("Head");
    this.addComponent(temp);
    this.tail.addPoint(this.position);
    this.bonusses = new Effect();
}

isAlive()
{
    return this._alive;
}
collision(gameobject,component,side)
{
 //   console.log(component.getTag());
    if(component.getTag()=="Bonus" && gameobject.active==true)
    {
        if(Main.soundsOn) this.bonusSound.play();
        let bonus = gameobject;
        bonus.active=false;
        if(Bonus.target.ALL == bonus.target)
        {
            Main.applyGlobalBonus(bonus);
        } else if(Bonus.target.ME==bonus.target)
        {
           for(const [key, effect] of Object.entries(this.bonusses)) {
            if(effect.assignedTo == bonus.type)
            {
               // console.log("Bonus recognized as: "+key)
                if(effect.active == false)
                {
                    effect.activate(this);
                }else
                {
                    effect.cooldown +=effect.increment;
                }
                break;
            }
           }
        } else if(Bonus.target.OTHERS==bonus.target)
        {
            Main.forPlayers((e)=>{
                if(e==this || !e.isAlive()) return;
            for(const [key, effect] of Object.entries(e.bonusses)) {
                if(effect.assignedTo == bonus.type)
                {
                 //   console.log("Bonus recognized as: "+key)
                    if(effect.active == false)
                    {
                        effect.activate(e);
                    }else
                    {
                        effect.cooldown +=effect.increment;
                    }
                    break;
                }
               }
            });
        }
    }
   // console.log(this.color+": "+component.getTag());
    if(component.getTag()=="line" || component.getTag()=="Head")
    {

        this.coll=true;
        if(!this.break.is && !this.invisible)
        {
            console.log(this);
         this.death();
        }
    }
    if(component.getTag()=="Frame")
    {
        if(Main.noborder)
        {
           if(!this.invisible)
           { 
               this.tail.breakLine(this.position);
            this.break.last=this.distance;this.break.is=false
           
            this.cooldown.push({
                func:function(){this.tail.continueLine(this.position); },
                time:1 
            });
        }
            if(side=="top")
            {  
                this.position.y =Main.frameHitbox.dpos.y-5; 
               // this.tail.continueLine(this.position);
            }
            else if(side=="down")
            {
                this.position.y =Main.frameHitbox.pos.y+5; 
            }
            else if(side=="left")
            {
                this.position.x =Main.frameHitbox.dpos.x-5; 
            }else if(side=="right")
            {
                this.position.x =Main.frameHitbox.pos.x+5; ; 
            }
        }
        else
        this.death();
      
    }
}
death()
{
    if(Main.soundsOn)  this.crashSound.play();
    for(var i =0;i<10;i++)
    {
        new Particle(Vector.add(this.position,this.velVec),KMath.randFR(1,1.4),KMath.randFR(0,360),KMath.randFR(0.2,0.35),KMath.randFR(20,30));
    }
  this.HALT=true;
  this._alive = false;
}
draw(ctx)
{
this.tail.draw(ctx);

ctx.lineWidth=1;
//ctx.font = "5px Calibri";
//ctx.fillText(this.score,this.position.x-1.75,this.position.y-5);
this.useTransfMat(ctx);
if(this.changeKeys) ctx.fillStyle = "#330066"; else ctx.fillStyle="Yellow";
ctx.beginPath();
if(this.invisible) 
{
if(this.alpCH==true){ this.alp+=0.05;} else {this.alp-=0.05};
if(this.alp>1) this.alpCH= false; else if(this.alp<0.1) this.alpCH= true;
ctx.globalAlpha = this.alp; 
}
if(this.curve90) ctx.fillRect(-this.radius,-this.radius,this.radius*2,this.radius*2);
else {ctx.arc(0,0,this.radius,0,Math.PI*2,false); ctx.fill();}
ctx.globalAlpha = 1; 
ctx.strokeStyle="red";
if(this._drawDirection)
{
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
ctx.beginPath();
ctx.moveTo(this.radius+2,0);
ctx.lineTo(this.radius+8,0);
ctx.lineTo(this.radius+5,3);
ctx.moveTo(this.radius+8,0);
ctx.lineTo(this.radius+5,-3);
ctx.stroke();
}
this.coll=false;

}
setDrawDirection(bool)
{
    this._drawDirection=bool;
}

update()
{
if(this.HALT || Main.pause) return;
for(let i=this.cooldown.length-1;i>=0;i--)
{
    if(this.cooldown[i].time<=0)
    {
        let temp=this.cooldown[i].func.bind(this);
        temp();
        this.cooldown.splice(i,1);
    }
    else
    {
    this.cooldown[i].time--;
    //console.log(this.cooldown[i].time)
    }
}
for(const [key, effect] of Object.entries(this.bonusses))
{
    if(effect.active)
    {
    effect.cooldown--;
    //console.log(effect+" color"+this.color);
    if(effect.cooldown<1)
    {
        effect.disable(this);
    }
    }
}
if(this.stop) return;
this.velVec.x= Math.cos(this.rotation*(Math.PI/180))*this.vel;
this.velVec.y= Math.sin(this.rotation*(Math.PI/180))*this.vel;
super.update();
// Turning code 
let isRightPress = Input.isPressed(this.rightKey);
let isLeftPress = Input.isPressed(this.leftKey);
if(this.changeKeys)
{
    let temp = isRightPress;
    isRightPress = isLeftPress;
    isLeftPress = temp;
}
if(this.curve90)
{
    if(!this.lastLeftKey && isLeftPress)
    {
    this.rotation-=90;
    }else if(!this.lastRightKey && isRightPress)
    {
        this.rotation+=90;
    }
}
else if(isLeftPress)
{
this.rotation-=1.8*this.vel;
}else if(isRightPress)
{
    this.rotation+=1.8*this.vel;
}
this.lastRightKey = isRightPress;
this.lastLeftKey = isLeftPress;
if(!this.invisible) this.distance+=this.vel;
if(this.distance-((this.radius*Player.distDef)+(this.tail.positions[this.tail.positions.length-1][this.tail.positions[this.tail.positions.length-1].length-1].width/2))>this.lastDistance && (this.rotation+0.1< this.lastRot ||this.rotation-0.1> this.lastRot || this.awaitPoint ))
{
    this.awaitPoint=false;
this.lastRot =this.rotation;
this.tail.addPoint(this.position);
this.lastDistance = this.distance;
this.lastPosition = this.position;
}
if(this.distance-this.break.interval>this.break.last && !this.break.is)
{
    this.tail.breakLine(this.position);
    this.break.is=true;
    this.break.last = this.distance;
}
if(this.distance>this.break.length+this.break.last && this.break.is)
{
this.break.is=false;
this.tail.continueLine(this.position);
}

}
addPoints(points)
{
    this._scoreComp.addPoints(points);
}
clearTail()
{
    this.tail.clear(this.position);
}
setStop(stop)
{
    this.HALT = stop;
}
reset(position,rot)
{
this.vel=1.2;
this.cooldown=new Array();
this.invisible =false;
  this.position=position;
  this.lastPosition=position;
  this.radius =3;
  this.clearTail();
  this.distance=0;
  this.hold=false;
  this.hold2=false;
  this.curve90=false;
  this.awaitPoint=false
  this.lastDistance=0;
  this._alive = true;
  this.rotation = rot;
  this.HALT=false;
  this.break=Object.assign({},Player.break);
  this.stop = false;
  this.changeKeys = false;
  this.bonusses = new Effect();
}
}