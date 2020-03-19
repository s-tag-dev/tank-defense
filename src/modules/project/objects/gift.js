import first_aid_img from "../../../assets/first_aid.png";

import { global } from "../../../modules/canvas_handler/global_vars";

var g = new global();

function Gift(ctx , id , deg, x , hit = null){
    this.giftImg = new Image();
    var giftLoaded = false;
    this.deg = deg;
    this.x = x;
    this.radius = g.giftSize / 2;
    this.absPos;
    this.id  = id;
    
    this.calcAbsPos = () => {
        this.absPos = {x : g.width / 2 + Math.cos(this.deg * Math.PI / 180) * (this.x  ) , y : g.height / 2 + Math.sin(this.deg * Math.PI / 180) * (this.x  )};        
    }
    this.init = () => {
        this.giftImg.src = first_aid_img;
        this.giftImg.onload = () => {
            giftLoaded = true;
        }
        this.calcAbsPos();
    }

    this.update = () => {
        this.show();
    }

    this.show = () =>{
        if(giftLoaded){
            console.log("showing!");
            
            ctx.translate(g.width /2 , g.height / 2);
            ctx.rotate(deg * Math.PI / 180)
            ctx.drawImage(this.giftImg , x , 0, g.giftSize , g.giftSize );
            // ctx.beginPath();
            // ctx.arc(this.x + this.radius , this.radius  , this.radius , 0 , Math.PI * 2);
            // ctx.fillStyle = "red";
            // ctx.fill();
            // ctx.closePath();
            ctx.rotate(-deg * Math.PI / 180)
            ctx.translate(-g.width /2 , -g.height / 2);

        }
    }

    this.hit = () =>{
        if(hit){
            hit(this.id);
        }
    }
}

export {Gift};