import {enemy} from "./objects/enemy";
import { Random } from "../../modules/canvas_handler/methods";

function enemy_spawner(ctx , state , enemy_list , die , damage  , shoot){

    this.waveMaxSpawn = 2;

    this.spawnedCount = 0;
    this.enemy_list = enemy_list;
    this.spawn_speed = state.spawnSpeed;
    this.spawner_counter = 200;
    this.currentCounter = this.spawner_counter;
    this.enemy_id = 0;
    this.init = () => {
        
    }

    this.update = () => {
        if(this.spawnedCount >= this.waveMaxSpawn ){
            return;
        }
        if(this.currentCounter > this.spawner_counter){
            this.spawnedCount++;
            var _enemy = new enemy(ctx ,state ,this.enemy_id , Random(0,3) , die, damage  , shoot);
            this.enemy_id++;
            _enemy.init();
            enemy_list.push(_enemy);
            this.currentCounter = 0;
        }
        this.currentCounter += this.spawn_speed;
    }
}

export {enemy_spawner};