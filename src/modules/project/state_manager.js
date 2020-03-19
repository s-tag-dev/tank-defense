import gameOverImage from "./../../assets/game_over.jpg";
import {global} from "./../canvas_handler/global_vars";

var g = new global();
function State_manager  (ctx) {

    this.gameOver = new Image ();
    var loaded = false;

    this.init = () =>{
        this.gameOver.src = gameOverImage;
        this.gameOver.onload = () =>{
            loaded = true;            
        }
    }

    this.check = (state) => {
        if(!loaded){
            return;
        }
        
        if(state == 0){
            
        }else if(state == 1){
            ctx.drawImage(this.gameOver , g.width / 2 - this.gameOver.width /2 , g.height /2 - this.gameOver.height / 2 );
        }
    }
}

export {State_manager};