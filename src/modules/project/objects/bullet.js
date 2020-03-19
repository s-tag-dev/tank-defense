import {global} from "../../canvas_handler/global_vars";
var g = new global();

function bullet (ctx , deg , id, hit = null) {
    this.deg = deg;
    this.id = id;
    this.x = 30;
    var bulletAngle = 0;
    var gap = g.pipeWidth / 3.2;
    this.radius = gap + 5;
    this.absPos = {x : 0 , y : 0};
    this.damage = 100;
    // console.log(deg);
    

    this.calcAbsPos = () => {
        this.absPos = {x : g.width / 2 + Math.cos(bulletAngle * Math.PI / 180) * (this.x + gap ) , y : g.height / 2 + Math.sin(bulletAngle * Math.PI / 180) * (this.x + gap )};        
    }

    this.update = (enemies , gifts) => {
        this.x += g.bulletSpeed;
        // console.log("=>"+this.deg);
        
        if(this.deg < 0){
            bulletAngle = 360 + this.deg;
            // console.log(bulletAngle);
            
        }else{
            bulletAngle = this.deg;
        }
        // console.log("=>"+this.deg);
        bulletAngle %= 360;
        this.calcAbsPos();
        // console.log({bullet : bulletAngle});
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            if(!enemy){
                continue;
            }

            var a = this.absPos.x - enemy.absPos.x;
            var b = this.absPos.y - enemy.absPos.y;
            var c = Math.sqrt(a * a + b * b);
            // console.log({a : a , b : b , c : c});
            
            if(c < this.radius + enemy.radius){
                if(hit){
                    hit(this);
                    enemy.hit(this.damage);
                }
                
            }
        }
        gifts.forEach(gift => {
        
            if(gift){
                var a = this.absPos.x - gift.absPos.x;
                var b = this.absPos.y - gift.absPos.y;
                var c = Math.sqrt(a * a + b * b);
                // console.log({a : a , b : b , c : c});
                
                if(c < this.radius + gift.radius){
                    if(hit){
                        gift.hit();
                    }
                    
                }
            }

           
        });
        this.show();

        
    }

    this.show = () => {        
        ctx.strokeStyle = "#FFEBEE";
        ctx.translate(g.width /2 , g.height / 2);
        ctx.rotate(deg * Math.PI / 180);
        
        

        ctx.beginPath();
        ctx.shadowColor = "#E53935";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.moveTo(this.x , gap);
        ctx.lineTo(this.x + 32 , gap);
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.closePath();
        
        ctx.beginPath();
        ctx.moveTo(this.x , -gap);
        ctx.lineTo(this.x + 32 , -gap);
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.lineCap = "square";
        ctx.closePath();

        ctx.rotate(-deg * Math.PI / 180);
        ctx.translate(-(g.width /2) ,-(g.height / 2));
        
    }
}

export {bullet};