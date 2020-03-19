import { global } from "../../../modules/canvas_handler/global_vars";
var g = new global();

function EnemyShot(ctx , id , deg , x , size , damage = null , destroy = null){

    this.id = id;
    this.x = x;
    this.deg = deg;
    this.damage = 10;

    this.init = () => {
        
    }

    this.update = () => {
        if(this.x > 0){
            this.x -= g.enemyShotSpeed;
            if(this.x < g.shooterSize / 2 ){
                damage(this.damage);
                if(destroy){
                    destroy(this);
                }
            }
        }
        this.show();
    }

    this.show = () => {
        ctx.translate(g.width /2  , g.height / 2);
        ctx.rotate(this.deg * Math.PI / 180)
        ctx.beginPath();
        ctx.arc(this.x , 0 , size , 0 , Math.PI * 2 );
        ctx.fillStyle = "#FDD835";
        ctx.fill();
        ctx.closePath();        
        ctx.rotate(-this.deg * Math.PI / 180)
        ctx.translate(-g.width /2  , -g.height / 2);
    }
}

export {EnemyShot};