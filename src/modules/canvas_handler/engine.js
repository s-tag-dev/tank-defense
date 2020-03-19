import {global} from "./global_vars";
import {start , update} from "../project/canvas_handler";

var initEngine = (ctx) =>{
    let g = new global();
    
    start(ctx);
    
    setInterval(() => {
        ctx.clearRect(0,0,g.width,g.height);
        update(ctx);
    }, 1000 / g.fps);
}

export {initEngine};