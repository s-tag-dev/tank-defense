import {global} from "../canvas_handler/global_vars";
import {Objects} from "./objects";
import {enemy_spawner} from "./enemy_spawner";
import {level_manager} from "./level_manager";
import {State_manager} from "./state_manager";
import { GiftHandler } from "./gift_handler";
import { AudioManager } from "./audio_manager";

var g = new global();
var objects = new Objects();
var state_manager;
var shooter;
var currentStat = g.stats[0];
var pressedKey = 0;
var mainCtx;
var audioManager;

var canPress = true;

// var score = 0;

g.mousePressed = (e)=>{ 

}

g.keyPress = (e)=>{
    
    if(e.keyCode == 32){
        if(gameState == -1){
            gameState = 0;
        }else if(gameState == 1){
            gameState = 0;
            state = {
                level:1,    
                score : 0,
                enemySpeed : 1,
                spawnSpeed : 2,
                shooterSpeed : 2
            };
            start(mainCtx);
        }else{
            shooter.fire();
        }
    }    

    
}

g.keyDown = (e)=>{
    if(e.keyCode == 37 || e.keyCode == 39){
        pressedKey = e.keyCode;
    }
    
}

g.keyUp = (e)=>{
    if(pressedKey == e.keyCode){
        pressedKey = 0;
    }
    
}

var bullets = [];
var enemies = [];
var enemyShots = [];
var players = [];
var spawner;
var explosions = [] ;
var gifts = [] ;
var explosion_index = 0;
var levelManager ;
var gift_handler ;


var state = {
    level:1,    
    score : 0,
    enemySpeed : 1,
    spawnSpeed : 2,
    shooterSpeed : 2
};

var gameState = -1;

function showScore(){
    // console.log("score = " + score);
    
    let statusContainer , scoreContainer , levelContainer ;
    if(document.getElementsByClassName("status").length == 0){
        statusContainer = document.createElement("p");
        statusContainer.classList.add("status");
        document.body.appendChild(statusContainer);

        scoreContainer = document.createElement("p");
        scoreContainer.classList.add("score");
        statusContainer.appendChild(scoreContainer);

        levelContainer = document.createElement("p");
        levelContainer.classList.add("level");
        statusContainer.appendChild(levelContainer);


        
    }else{
        statusContainer = document.getElementsByClassName("status")[0];
        scoreContainer = document.getElementsByClassName("score")[0];
        levelContainer = document.getElementsByClassName("level")[0];
    }
    scoreContainer.innerHTML = state.score;
    levelContainer.innerHTML = state.level;
}

function boom(x,y,r){
    explosions[explosion_index].boom(x,y,r);
    explosion_index++;
    explosion_index %= 10;
}

var start = (ctx)=>{
    mainCtx = ctx;
    bullets = [];
    enemies = [];
    gifts = [];
    enemyShots = [];
    
    explosions = [] ;

    gift_handler = new GiftHandler(ctx , gifts , giftHit);
    state_manager  = new State_manager(ctx);
    state_manager.init();
    shooter = new objects.Shooter(ctx  , state ,(deg , id)=> {
        audioManager.play("fire");
        bullets.push ( new objects.Bullet(ctx , deg , id , (bullet)=>{          
            bullets.find(k => k != undefined && k.id == bullet.id).x = g.width;
        }));
    });
    for (let i = 0; i < 10; i++) {
        var _exp = new objects.Explosion(ctx);
        _exp.init();
        explosions.push(_exp);
    }
    shooter.init();
    spawner = new enemy_spawner(ctx , state , enemies , (enemy) => {
        boom(enemy.absPos.x ,enemy.absPos.y  , 50);  
        gift_handler.giveGift(enemy.angle , enemy.x);
        audioManager.play("scream");
        delete enemies[enemies.findIndex(k => k != undefined && k.id == enemy.id)];
        state.score++;
        showScore();
    } , damageShooter,(ctx  , id, deg , x , size )=>{
        let shot = new objects.EnemyShot(ctx , id , deg , x , size , damageShooter , destroyEnemyShot);
        shot.init();
        enemyShots.push(shot);
    });
    spawner.init();
    levelManager = new level_manager(state , spawner);
    showScore();
    audioManager = new AudioManager(players);
    audioManager.play("bg");
}

const giftHit = (id) =>{
    audioManager.play("heal");
    shooter.health = shooter.maxHealth;
    delete gifts[gifts.findIndex(k => k != undefined && k.id == id)];
}

const damageShooter = (damage , enemy)=>{
    if(enemy){
        enemy.die();
        delete enemies[enemies.findIndex(k => k != undefined && k.id == enemy.id)];
    }
    shooter.health -= damage;
    if(shooter.health <= 0){
        killShooter();
    }
}

const destroyEnemyShot = (shot) =>{
    delete enemyShots[enemyShots.findIndex(k => k != undefined && k.id == shot.id)];
}

const killShooter = () => {
    shooter.die();
    audioManager.play("exp");
    setTimeout(() => {
        gameState = 1;
    }, 800);
    boom(g.width /2 , g.height / 2  , g.shooterSize);
}

var update = (ctx) => {

    state_manager.check(gameState);
    
    if(gameState == 0 ){
        levelManager.levelCheck();
        spawner.update();

        gifts.forEach(gift => {
            gift.update();
        });

        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            if(enemy){
                enemy.update();
            }
        }
        bullets = bullets.map(bullet => {
            bullet.update(enemies , gifts);
            if(bullet.x < g.width / 0.7){
                return bullet;
            }
        })
        bullets = bullets.filter(function (el) {
            return el != null;
        });
        shooter.update(pressedKey);
    
        for (let i = 0; i < explosions.length; i++) {
            const exp = explosions[i];
            exp.update();
        }

        enemyShots.forEach(shot => {
            shot.update();
        });
        
    }    

}

export {start , update};