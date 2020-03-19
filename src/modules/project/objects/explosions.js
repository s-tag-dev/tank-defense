import frame_0 from "../../../assets/explosion/frame_0.png";
import frame_1 from "../../../assets/explosion/frame_1.png";
import frame_2 from "../../../assets/explosion/frame_2.png";
import frame_3 from "../../../assets/explosion/frame_3.png";
import frame_4 from "../../../assets/explosion/frame_4.png";
import frame_5 from "../../../assets/explosion/frame_5.png";
import frame_6 from "../../../assets/explosion/frame_6.png";
import frame_7 from "../../../assets/explosion/frame_7.png";
import frame_8 from "../../../assets/explosion/frame_8.png";
import frame_9 from "../../../assets/explosion/frame_9.png";
import frame_10 from "../../../assets/explosion/frame_10.png";
import frame_11 from "../../../assets/explosion/frame_11.png";

function explosion (ctx) {
    this.x ;
    this.y ;
    this.r ;

    this.currentFrame = 100;
    
    this.maxDeltaFrame = 3;
    this.currentDeltaFrame = 0;

    this.frames = [
        frame_0 ,
        frame_1 ,
        frame_2 ,
        frame_3 ,
        frame_4 ,
        frame_5 ,
        frame_6 ,
        frame_7 ,
        frame_8 ,
        frame_9 ,
        frame_10,
        frame_11
    ];

    this.images = [];

    var loadedImages = 0;

    this.init = () => {
        for (let i = 0; i < 12; i++) {
            var image = new Image();
            this.images.push(image);
            image.src = this.frames[i];
            image.onload = () => {
                loadedImages++;
            }                    
        }
    }

    this.update = () => {
        
        
        // console.log(this.images.length);
        
        if(this.currentFrame >= this.images.length){
            return;
        }

        this.show();

        if(this.maxDeltaFrame > this.currentDeltaFrame ){
            this.currentDeltaFrame++;
        }else{
            this.currentFrame++;
            this.currentDeltaFrame = 0;
        }
        // console.log(this.currentFrame);        
    }

    this.show = () => {            
        if(loadedImages == this.images.length){
            ctx.drawImage(this.images[this.currentFrame] , this.x - this.r / 2 , this.y - this.r / 2 , this.r , this.r)
        }
    }

    this.boom = (x , y , r )=>{
        this.x = x ;
        this.y = y;
        this.r = r;
        this.currentFrame = 0;
    }
}


export {explosion};