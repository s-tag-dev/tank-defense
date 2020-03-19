import {global} from "../../canvas_handler/global_vars";
import baseImage from "../../../assets/base.png";
import shooterImage from "../../../assets/shooter.png"
import pipeImage from "../../../assets/pipe.png"
import fireShotImage from "../../../assets/fire.png";

var g = new global();

function shooter(ctx , state , fired = null){    

    this.bulletId = 0;

    this.maxHealth = 1000;
    this.health = this.maxHealth;

    this.deg = -45;
    this.coolDownDeg = 0;
    this.coolDownFillSpeed = 15;
    this.coolDownSpeed = 0.8;

    this.shooterRotationSpeed = state.shooterSpeed;
    
    this.rotateSpeed = 2;
    this.pressedKey = 0;

    this.shooter = new Image();
    var shooterLoaded = false;

    this.fireShot = new Image();
    var fireShotLoaded = false;

    this.fireShotDelta = 5;
    this.currentFireShowFrame = 5;

    this.base = new Image();
    var baseLoaded = false;

    this.pipe = new Image();
    var pipeLoaded = false;
    this.pipeDelta = 0;


    this.fireShotMaxFrame = 2;
    this.fireShotFrame = this.fireShotMaxFrame;
    var canShoot = true;

    this.init = () => {
        this.shooter.src = shooterImage;
        this.shooter.onload = () => {
            shooterLoaded = true;
        }

        this.pipe.src = pipeImage;
        this.pipe.onload = () => {
            pipeLoaded = true;
        }

        this.fireShot.src = fireShotImage;
        this.fireShot.onload = () => {
            fireShotLoaded = true;
        }

        this.base.src = baseImage;
        this.base.onload = () => {
            baseLoaded = true;
        }
    }

    this.update = (pressedKey) => {
        this.shooterRotationSpeed = state.shooterSpeed;
        this.pressedKey = pressedKey;

        // console.log("speed = "+this.shooterRotationSpeed);
        
        if(this.currentFireShowFrame < this.fireShotDelta){
            this.currentFireShowFrame++;
        }
        
        this.coolDownDeg += -1 * this.coolDownSpeed;
        if(this.coolDownDeg <= 0){
            this.coolDownDeg = 0;
        }

        this.pipeDelta--;
        if(this.pipeDelta <=0){
            this.pipeDelta = 0;
        }

        switch (this.pressedKey){
            case 37:
                this.deg += -1 * this.shooterRotationSpeed;
                break;
            case 39:
                this.deg += 1 * this.shooterRotationSpeed;
                break;
        }

        this.show();
                                
        if(this.fireShotFrame < this.fireShotMaxFrame){
            this.showFireShot();    
            this.fireShotFrame++;
        }
    }

    this.guns = () =>{

        var rotation = this.getDeg() - 90 * Math.PI / 180;
        // console.log(rotation);
        
        ctx.translate(g.width / 2 , g.height / 2);
        ctx.rotate(rotation + Math.PI );
        var pipeHeight = g.pipeWidth * this.pipe.height / this.pipe.width  ;
        ctx.drawImage(this.pipe , -g.pipeWidth / 2 , -pipeHeight * 1.5 + this.pipeDelta , g.pipeWidth ,pipeHeight );        
        ctx.rotate(-(rotation + Math.PI) );
        ctx.translate(-g.width / 2 , -g.height / 2);
    }

    this.coolDown = () => {
        var someColors = [];
        someColors.push('#000');
        someColors.push('#F44336');
        ctx.rotate(-25 * Math.PI / 180);
        this.drawMultiRadiantCircle(0, 0, 34 , this.coolDownDeg, someColors);
        ctx.rotate(25 * Math.PI / 180);
    }

    this.show = () => {
        if(shooterLoaded && pipeLoaded && fireShotLoaded && baseLoaded){
            this.showBase();
            this.guns();                    
            var rotation = this.getDeg() + 90 * Math.PI / 180;
            ctx.translate(g.width / 2 , g.height / 2);
            ctx.rotate(rotation);        
            ctx.beginPath();
            ctx.arc(0,0,40 , 0,2* Math.PI);
            ctx.fillStyle = "#b71c1c";
            ctx.fill();
            ctx.closePath();   
            ctx.beginPath();
            ctx.arc(0,0,40 , 0,2* Math.PI);            
            ctx.fillStyle = "#FFEE58" + ((parseInt((this.health * 255 / this.maxHealth))).toString(16));
            ctx.fill();
            ctx.closePath();
            this.coolDown();
            ctx.drawImage(this.shooter , - g.shooterSize / 2 , 0 - g.shooterSize / 2  , g.shooterSize , g.shooterSize);

            ctx.rotate(-rotation);            
            ctx.translate(-g.width / 2 , -g.height / 2);
            
            // ctx.imageSmoothingEnabled= false;
            // ctx.imageSmoothingEnabled= true;
        }
      
    }

    this.getDeg = () => {        
        return this.deg * Math.PI/ 180  * this.rotateSpeed;
    }

    this.fire = () => {
        
        if(!canShoot){
            return;
        }

        
        if(this.currentFireShowFrame < this.fireShotDelta){            
            return;
        }

        this.currentFireShowFrame = 0;
        if(fired != null){
            this.coolDownDeg += this.coolDownFillSpeed;
            if(this.coolDownDeg >= 220){
                this.coolDownDeg = 220;
                canShoot = false;
                setTimeout(() => {
                    canShoot = true;
                }, 1500);
            }else{                               
                fired(this.deg * this.rotateSpeed , this.bulletId);   
                this.bulletId++;
                this.pipeDelta = 20;  
                this.fireShotFrame = 0;  
            }

        }

    }

    this.showBase = () => {
        if(baseLoaded){
            ctx.translate(g.width / 2 , g.height / 2);
            var width = g.shooterSize * 0.65;
            var height = width;
            ctx.drawImage(this.base , -width/2 , -height / 2 , width , height )
            ctx.translate(-g.width / 2 , -g.height / 2);
        }

    }

    this.showFireShot = () => {
        if(fireShotLoaded){
            ctx.translate(g.width /2 , g.height /2);
            ctx.rotate((90 + this.deg * this.rotateSpeed) * Math.PI / 180 );
            ctx.drawImage(this.fireShot , -32 , -g.pipeWidth * 1.45 , 32 , 32 ); 
            ctx.scale(-1, 1);           
            ctx.drawImage(this.fireShot , -32 , -g.pipeWidth * 1.45 , 32 , 32 );            
            ctx.scale(-1, 1);           
            ctx.rotate(-(90 + this.deg * this.rotateSpeed) * Math.PI / 180 );
            ctx.translate(-g.width /2 , -g.height /2);
        }
    }

    this.drawMultiRadiantCircle = (xc, yc, r , deg, radientColors) => {
        var partLength = (2 * Math.PI) / radientColors.length;
        var lastPartLength = (deg * Math.PI / 180 );
        // console.log(partLength);

        
        var start = 0;
        var gradient = null;
        var startColor = null,
            endColor = null;

        for (var i = 0; i < radientColors.length; i++) {
            startColor = radientColors[i];
            endColor = radientColors[(i + 1) % radientColors.length];

            // x start / end of the next arc to draw
            var xStart = xc + Math.cos(start) * r;
            var xEnd = xc + Math.cos(start + partLength) * r;
            // y start / end of the next arc to draw
            var yStart = yc + Math.sin(start) * r;
            var yEnd = yc + Math.sin(start + partLength) * r;

            ctx.beginPath();

            gradient = ctx.createLinearGradient(xStart, yStart, xEnd, yEnd);
            gradient.addColorStop(0, startColor);
            gradient.addColorStop(1.0, endColor);

            ctx.strokeStyle = gradient;
            // ctx.lineCap = "round";
            ctx.arc(xc, yc, r, start, start + Math.min(lastPartLength , partLength ));
            ctx.lineWidth = 11;
            ctx.stroke();
            ctx.closePath();
            if(partLength < lastPartLength){
                lastPartLength -= partLength;
            }else{
                break;
            }
            start += partLength;
        }
    }

    this.die = () => {
        // console.log("dead!");        
    }
}


export {shooter}