import { CollisionDetector } from "./CollisionDetector.js";
import { CanvasManager } from "./CanvasManager.js";
import { Player } from "./Player.js";
import { Vector,randomRange } from "./Utils.js";
import { Scoreboard } from "./Scoreboard.js";

var main= {
    lastTime:0,
    fps:60,
    init:function()
    {
        requestAnimationFrame(main.animationLoop.bind(this));
        main.collisionDetector = new CollisionDetector();
        main.drawCanva= new CanvasManager(100,100,1.7,true,1024,false,true);
        main.players=new Array();
        main.scoreboard=new Scoreboard(824,0,200,200,main.drawCanva,"Punkty:");
        var TankImg=new Image();
        TankImg.src="tank2.png";
        TankImg.onload=function() {
           main.addPlayer("Zielony","Green",65,68,TankImg);
        };
        main.addPlayer("Niebieski","Blue",37,39,false);
// main.playerTwo =new Player(new Vector(randomRange(15,804),randomRange(15,582)),0,this.drawCanva,this.collisionDetector,1,37,39,"blue",false);
    //main.addPlayers(2);
    main.timer=180;
        main.drawCanva.ctx.n.imageSmoothingEnabled = false;
        main.collisionDetector.addEdgeHitbox(5,"up");
        main.collisionDetector.addEdgeHitbox(5,"left");
        main.collisionDetector.addEdgeHitbox(819,"right");
        main.collisionDetector.addEdgeHitbox(597,"down");
    },
    animationLoop(time)
    {
        requestAnimationFrame(main.animationLoop.bind(this));
        if(time-this.lastTime>=1000/this.fps)
        {
            
            if(main.timer>0)
            {
                main.timer--;
            }
            else if(main.timer==0)
            {
                main.timer=-10;
                for(var i=0;i<main.players.length;i++)
            {
                  main.players[i].pause=false;
            }
            }
            main.drawCanva.ctx.n.clearRect(0,0,this.drawCanva.canvas.width,this.drawCanva.canvas.height);
            main.collisionDetector.update();
            main.drawCanva.ctx.n.fillStyle = "#1e1e1e";
            main.drawCanva.ctx.n.fillRect(0,0,this.drawCanva.canvas.width,this.drawCanva.canvas.height);
            //obramówka
            main.drawCanva.ctx.n.fillStyle = "yellow";
            main.drawCanva.ctx.fillRect(0,0,824,602);
            main.drawCanva.ctx.n.fillStyle = "black";
            main.drawCanva.ctx.fillRect(5,5,814,592);
            this.drawCanva.updateFrame();
        }
    },
    addPlayer(name,colour,leftKey,RightKey,img)
    {
               let tmpPlayer=new Player(new Vector(randomRange(15,804),randomRange(15,582)),randomRange(0,360),this.drawCanva,this.collisionDetector,5,leftKey,RightKey,colour,img,main.scoreboard,name,main.addPointsAlivePlayers);
               this.drawCanva.updateFrame();
               tmpPlayer.velocity=1;
               tmpPlayer.pause=true;
               main.players.push(tmpPlayer);       
    },
    restartGame()
    {
        main.collisionDetector.removeLineHitboxes();
      /*  main.collisionDetector.addEdgeHitbox(5,"up");
        main.collisionDetector.addEdgeHitbox(5,"left");
        main.collisionDetector.addEdgeHitbox(819,"right");
        main.collisionDetector.addEdgeHitbox(597,"down");*/
        for(var i=0;i<main.players.length;i++)
        {
        let tmpPlayer=main.players[i];
        tmpPlayer.position=new Vector(randomRange(15,804),randomRange(15,582));
        tmpPlayer.pReset();
        tmpPlayer.velocity=5;
        }
        this.drawCanva.updateFrame();
        for(var i=0;i<main.players.length;i++)
        {
            let tmpPlayer=main.players[i];
        tmpPlayer.velocity=1;
               tmpPlayer.pause=true;
        }
        main.timer=180;
    },
    addPointsAlivePlayers(points)
    {
        let aliveCount=0;
        for(var i=0;i<main.players.length;i++)
    {
       // console.log("Nagroda"+points+main.players[i].death);
       if( !main.players[i].death) 
       {
           aliveCount++;
           main.players[i].score+=points;
    }
    }
    if(aliveCount<=1)
    {
        main.restartGame();
    }
    }
}
window.onload=main.init();
