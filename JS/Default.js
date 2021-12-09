import { Bonus } from "./Bonus.js";
export class Effect
{
    constructor()
    {
this.STOP={
    assignedTo:Bonus.type.STOP,
    cooldown:0,
    active:false,
    increment:200,
    activate:function(player)
    {
        player.awaitPoint=true
        player.stop = true;
        this.active= true;
        this.cooldown = this.increment;
    },
    disable:function(player)
    {
        player.stop=false;
        this.active=false;
    }
};
this.INVISIBLE={
    assignedTo:Bonus.type.INVISIBLE,
    cooldown:0,
    active:false,
    increment:200,
    activate:function(player)
    {
        player.invisible=true;
        player.break.is = false;
        player.tail.breakLine(player.position);
        this.active= true;
        this.cooldown = this.increment;
    },
    disable:function(player)
    {
        player.invisible=false;
        player.tail.continueLine(player.position);
        this.active=false;
        player.break.last = player.distance;
    }
};
this.CURVE90={
    assignedTo:Bonus.type.CURVE90,
    cooldown:0,
    active:false,
    increment:200,
    activate:function(player)
    {
       player.curve90 = true;
       player._leftKeyClick =false;
       player._rightKeyClick=false;
       player.rotVel=0;
        this.active= true;
        this.cooldown = this.increment;
    },
    disable:function(player)
    {
        player.curve90 = false;
        this.active= false;
    }
};
this.KEYCHANGE={
    assignedTo:Bonus.type.KEYCHANGE,
    cooldown:0,
    active:false,
    increment:200,
    activate:function(player)
    {
        player.changeKeys = true;
        this.active= true;
        this.cooldown = this.increment;
    },
    disable:function(player)
    {
        player.changeKeys = false;
        this.active= false;
    }
};
//Stacking bonusses
this.SPEED={ 
    assignedTo:Bonus.type.SPEED,
    cooldown:0,
    active:false,
    activate:function(player)
    {
        player.vel+=0.5;
     player.cooldown.push({
        func:function(){ player.vel-=0.5},
        time:200 
    })
    }
};
this.SHRINK={ 
    assignedTo:Bonus.type.SHRINK,
    cooldown:0,
    active:false,
    activate:function(player)
    {
        if(player.radius-1.5>0)
        {
        player.awaitPoint =true;
        player.radius-=1.5;
     player.cooldown.push({
        func:function(){ player.radius+=1.5;player.awaitPoint =true;},
        time:200 
     
    })
}
    }
};
this.MAGNIFI={ 
    assignedTo:Bonus.type.MAGNIFI,
    cooldown:0,
    active:false,
    activate:function(player)
    {
        
        player.awaitPoint =true;
        player.radius+=2;
     player.cooldown.push({
        func:function(){if(player.radius-2>0){ player.radius-=2;player.awaitPoint =true;}},
        time:200 
    })
    }
}
}
}
