import _ from 'lodash';
import './styles.css';
import {canvas} from "./modules/canvas";
import { string } from "./modules/string";
import tank from "./assets/tank.jpg";
import hintImage from "./assets/hint.png";

let component = () => {
    let element = document.createElement("div")
    element.classList.add("cover");
    let img = document.createElement("img");
    img.src = tank;
    element.appendChild(img);
    let br = document.createElement("br");
    element.appendChild(br);    
    element.appendChild(br);

    let nextBtn = document.createElement("button");
    nextBtn.innerText = "ادامه";
    nextBtn.addEventListener("click",(e) =>{document.querySelector(".cover").remove();});
    element.appendChild(nextBtn);
    
    let copy = document.createElement("p");
    copy.innerText = "توسعه دهنده : سینا قلی زاده";
    let link = document.createElement("a");
    link.setAttribute("href" , "http://s-tag.ir");
    link.appendChild(copy);
    element.appendChild(link)

    return element;
}


let hint = () => {
    let div = document.createElement("div");
    div.setAttribute( "id" ,"hint");
    let img = document.createElement("img");
    img.src = hintImage;    
    div.appendChild(img);
    return div;
}
  
document.body.appendChild(canvas());
document.body.appendChild(hint());
document.body.appendChild(component());