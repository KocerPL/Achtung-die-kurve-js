import { ScoreComponent } from "./Components/ScoreComponent.js";
export class Scoreboard 
{
static scoreComponents = new Array();
static sortedScores = new Array();
static x =805
static y=0;
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
    ctx.font = "20px Calibri";
    ctx.fillText("Scoreboard",this.x,this.y+20);
    ctx.font = "15px Calibri";
    var actualY = 20;
    for(var i=0; i<this.sortedScores.length;i++)
    {
        ctx.fillStyle=this.sortedScores[i].parent.color;
        ctx.fillText(this.sortedScores[i].parent.color+":  "+this.sortedScores[i].getScore(),this.x,this.y+actualY+15);
        actualY+=15;
    }
}
}