import bg_1 from "../../assets/sounds/bg_1.mp3";
import exp from "../../assets/sounds/explosion.flac";
import fire from "../../assets/sounds/fire.ogg";
import life from "../../assets/sounds/life.wav";

import scream_0 from "../../assets/sounds/slightscreams/slightscream_01.flac";
import scream_1 from "../../assets/sounds/slightscreams/slightscream_02.flac";
import scream_2 from "../../assets/sounds/slightscreams/slightscream_03.flac";
import scream_3 from "../../assets/sounds/slightscreams/slightscream_04.flac";
import scream_4 from "../../assets/sounds/slightscreams/slightscream_05.flac";
import scream_5 from "../../assets/sounds/slightscreams/slightscream_06.flac";
import scream_6 from "../../assets/sounds/slightscreams/slightscream_07.flac";
import scream_7 from "../../assets/sounds/slightscreams/slightscream_08.flac";
import scream_8 from "../../assets/sounds/slightscreams/slightscream_09.flac";
import scream_9 from "../../assets/sounds/slightscreams/slightscream_10.flac";
import scream_10 from "../../assets/sounds/slightscreams/slightscream_11.flac";
import scream_11 from "../../assets/sounds/slightscreams/slightscream_12.flac";
import scream_12 from "../../assets/sounds/slightscreams/slightscream_13.flac";
import scream_13 from "../../assets/sounds/slightscreams/slightscream_14.flac";
import scream_14 from "../../assets/sounds/slightscreams/slightscream_15.flac";

import { Random } from "../canvas_handler/methods";

var screams = [
    scream_0 ,
    scream_1 ,
    scream_2 ,
    scream_3 ,
    scream_4 ,
    scream_5 ,
    scream_6 ,
    scream_7 ,
    scream_8 ,
    scream_9 ,
    scream_10,
    scream_11,
    scream_12,
    scream_13,
    scream_14
];




function AudioManager(){
    this.player ;
    var bgPlayer ;

    this.play = (mode) => {        

        switch (mode){
            case "bg":
                bgPlayer = new Audio(bg_1);
                bgPlayer.loop = true;
                bgPlayer.muted = true;
                setTimeout(() => {
                    bgPlayer.muted = false;
                    bgPlayer.play();
                }, 1000); 
            break;
            case "scream":
                this.player = new Audio(screams[Random(0, screams.length )]);
                break;
            case "heal":
                this.player = new Audio(life);
                break;
            case "fire":
                this.player = new Audio(fire);
                break;
            case "exp":
                this.player = new Audio(exp);
                break;
        }

        if(this.player){
            this.player.play();
        }
    }
}

export {AudioManager};