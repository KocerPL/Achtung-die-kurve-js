import { Vector } from "./Vector.js";
import { ScoreComponent } from "./Components/ScoreComponent.js";
import { Main } from "./Main.js";
export class Scoreboard 
{
static scoreComponents = new Array();
static sortedScores = new Array();
static position =new Vector(802,0);
static size = new Vector(222,650);
static addScore(score)
{
if(!score instanceof ScoreComponent) throw new Error("argument1 must be instance of score component");
this.scoreComponents.push(score);
this.sortedScores = this.scoreComponents;
}
static update()
{
   
    for(var i=1; i<this.sortedScores.length;i++)
    {
        var j =i-1;
        var key = this.sortedScores[i];
      while(j>=0 && key.getScore()>this.sortedScores[j].getScore())
      {
        this.sortedScores[j + 1] = this.sortedScores[j];
        --j;
      }
      this.sortedScores[j + 1] = key;
    }
    //this.sortedScores.reverse();
}
static draw(ctx)
{
  let pos = this.position;
  let size = this.size;
  let alternate = true;
  this.drawBackground(ctx);
  const font = "PatrickHand";
  const spacer = 5;
  const scoreSize =25;
  ctx.fillStyle="white";
    ctx.font = "35px "+font;
    ctx.textAlign = "center";
    ctx.fillText("Scoreboard",pos.x+(size.x/2),pos.y+35);
    ctx.font = "20px "+font;
    ctx.fillText("First to "+Main.maxScore+" point(s) wins!!",pos.x+(size.x/2),pos.y+55);
    ctx.font = "15px "+font;
    ctx.fillText(Main.minDomin+" point(s) dominance",pos.x+(size.x/2),pos.y+70);
    ctx.textAlign = "left";
    ctx.font = scoreSize+"px "+font;
    var actualY = 75+spacer;
    for(var i=0; i<this.sortedScores.length;i++)
    {
      if(alternate)
      {
        alternate=false;
        ctx.fillStyle="#4d4d4d";
        ctx.fillRect( pos.x,pos.y+actualY,size.x,scoreSize+(spacer/2));
      }
      else alternate =true;
        ctx.fillStyle=this.sortedScores[i].parent.color;
        ctx.textAlign = "left";
        ctx.fillText((i+1) +". "+ this.sortedScores[i].parent.color+":",pos.x,pos.y+actualY+scoreSize);
        ctx.fillStyle="yellow";
        ctx.textAlign = "right";
        ctx.fillText(this.sortedScores[i].getScore(),pos.x+size.x,pos.y+actualY+scoreSize)
        actualY+=scoreSize+spacer;
    }
}
static drawBackground(ctx)
{
  ctx.fillStyle="#0d0d0d";
  ctx.fillRect(this.position.x,this.position.y,this.size.x,this.size.y);
}
}