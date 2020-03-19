import { global } from "./../canvas_handler/global_vars";
import { hasChanse } from "./../canvas_handler/methods";
import { Gift } from "../../modules/project/objects/gift";

var g = new global();
function GiftHandler (ctx , gifts , giftHit = null) {
    this.lastGift = 0;
    this.giveGift = (deg , x) =>{
        
        if(hasChanse(g.spawnChange)){
            let gift = new Gift(ctx , this.lastGift  , deg , x , giftHit)
            gift.init();
            gifts.push(gift);
            this.lastGift++;
        }
    }
}

export {GiftHandler};