import {initCanvas} from "./canvas_handler/init_canvas";
import {global} from "./canvas_handler/global_vars";

const canvas = () =>  {

    let g = new global();
    let element = document.createElement('canvas');
    
    element.width = g.width;
    element.height = g.height;

    element = initCanvas(element);

    element.classList.add("center");    
    
    return element;
}


export {canvas };