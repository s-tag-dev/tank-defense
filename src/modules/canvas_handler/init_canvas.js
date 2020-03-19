import {initEngine} from "./engine";

const initCanvas = (canvas)=>{
    var ctx = canvas.getContext("2d");
    // ctx.fillStyle = "#3333";
    // ctx.fillRect(0,0,canvas.width , canvas.height);

    initEngine(ctx);

    return canvas;
}

export {initCanvas};