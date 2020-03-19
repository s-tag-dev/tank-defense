import {global} from "../../canvas_handler/global_vars";
import {Random} from "../../canvas_handler/methods";

import knife_0 from "../../../assets/enemy/knife_0.png";
import knife_1 from "../../../assets/enemy/knife_1.png";

import pistol_0 from "../../../assets/enemy/pistol_0.png";
import pistol_1 from "../../../assets/enemy/pistol_1.png";

import rifle_0 from "../../../assets/enemy/rifle_0.png";
import rifle_1 from "../../../assets/enemy/rifle_1.png";

import shotgun_0 from "../../../assets/enemy/shotgun_0.png";
import shotgun_1 from "../../../assets/enemy/shotgun_1.png";




var g = new global();
// var frames = [shotgun_0 , shotgun_1];
// var frames = [rifle_0 , rifle_1];
var frames =[
    {frames :  [knife_0 , knife_1] , canShoot : false , damage : 100},
    {frames :  [shotgun_0 , shotgun_1] , canShoot : true  , damage : 150},
    {frames :  [rifle_0 , rifle_1] , canShoot : true  , damage : 200},
];

function enemy (ctx , state , id , type , die = null , damage = null , shoot = null){
    this.id = id;
    this.angle = Math.floor(Math.random() * (360 - 0 + 1) + 0);
    this.speed = state.enemySpeed;
    this.x = g.width / 3;
    this.y = 0;
    this.absPos = {x : 0 , y : 0};
    this.radius = 20;
    this.health = 100;
    this.realX = 0 ;
    this.realY = 0 ;

    this.currentFrame = 0;
    this.maxFrame = 10;

    this.shotDelay = 200    ;
    this.currentDelay = 0;

    this.image = new Image();
    var imageloaded = false; 
    
    this.image2 = new Image();
    var imageloaded2 = false; 
    this.damage = frames[type].damage;

    this.frame = Math.floor(Math.random() * ( 1 - 0 + 1 ) - 0);

    this.init = () => {
        this.calcAbsPos(); 

        this.image.src = frames[type].frames[0];
        this.image.onload =() => {
            imageloaded = true;
        };

        this.image2.src = frames[type].frames[1];
        this.image2.onload =() => {
            imageloaded2 = true;
        };
        
    }

    this.update = () => {
        // console.log(frames[type].canShoot);
        
        if(frames[type].canShoot){            
            if(this.currentDelay > this.shotDelay){
                this.currentDelay = 0;
                if(shoot){
                    let id = Random(0,15000000);
                    shoot(ctx , id , this.angle , this.x , g.enemyShotSize);
                }
            }else{
                this.currentDelay++;
            }
        }

        this.x -= this.speed;
        if(this.x < g.shooterSize / 2 ){
            if(damage){
                damage(this.damage , this);
            }
        }

        this.calcAbsPos();
        this.currentFrame++;
        if(this.currentFrame > this.maxFrame){
            this.currentFrame = 0;
            this.frame += 1;
            this.frame %=2;
        }
        this.show();


        // ctx.beginPath();
        // // ctx.setTransform(1, 0, 0, 1, 0, 0);
        
        // ctx.arc( this.absPos.x ,this.absPos.y  , this.radius , 0 , Math.PI * 2);
        // // ctx.arc( g.width/2 ,g.height / 2  ,500 , 0 , Math.PI * 2);
        // ctx.fillStyle= "red";
        // ctx.fill();
        // ctx.closePath();
        
        // ctx.fillRect(0,0,500,500);
        // ctx.fill();
        
    }

    this.calcAbsPos = () => {
        this.absPos = {x : g.width / 2 + Math.cos(this.angle * Math.PI / 180) * (this.x + this.radius) , y : g.height / 2 + Math.sin(this.angle * Math.PI / 180) * (this.x + this.radius)};
    }

    this.show = () => {
        if(imageloaded && imageloaded2){
            ctx.translate(g.width / 2 , g.height / 2)
            ctx.rotate(this.angle  * Math.PI / 180);
            var image = this.frame == 0 ? this.image : this.image2;
            ctx.drawImage(image, this.x , this.y -  25, 50 , 50 );
            ctx.rotate(-this.angle * Math.PI / 180);
            ctx.translate(-g.width / 2 , -g.height / 2)
        }
        if(this.health <= 0){
            this.die();
        }
    }

    this.hit = (damage) =>{
        this.health -= damage;
        console.log(this.health);
        
    }

    this.die = () => {
        if(die){
            die(this);
        }
    }
}

export {enemy};