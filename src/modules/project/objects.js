import {shooter} from "./objects/shooter";
import {bullet} from "./objects/bullet";
import {explosion} from "./objects/explosions";
import { EnemyShot } from "../../modules/project/objects/enemy_shot";

class Objects {
    constructor(){
        this.Shooter = shooter;
        this.Bullet = bullet;
        this.Explosion = explosion;
        this.EnemyShot = EnemyShot;
    }
}

export {Objects};