
function level_manager (data , spawner) {
    // this.score = data.score;
    // this.enemySpeed = data.enemySpeed;
    // this.spawnSpeed = data.spawnSpeed;
    // this.shooterSpeed = data.shooterSpeed;
    // this.rate = 1.8;
    // this.lastScore = 0;
    
    // this.levelLimit = 10;

    

    this.levelCheck = () => {

        if(spawner.spawnedCount >= spawner.waveMaxSpawn){
            this.levelUP();
        }
        // // console.log("checking!");
        // // console.log(data.score);
        
        // if(data.score % this.levelLimit == 0 && data.score != 0 && this.lastScore != data.score){
        //     this.lastScore = data.score;
        //     this.levelUP();
        // }
    }

    this.levelUP = ()=>{   
        
        let list = spawner.enemy_list.filter(k => k != null);
            if(list.length == 0){
            spawner.spawnedCount = 0;
            spawner.waveMaxSpawn *= 2;
            spawner.spawner_counter *= 0.8;
            data.level++;
        }
        
        // data.level++;   
        // // data.enemySpeed *=(this.rate * 1.00000009); 
        // data.spawnSpeed *=this.rate * 1.5;
        // // data.shooterSpeed *=(this.rate * 1.000000000000001 );
        // console.table(data);
        // // this.rate *= 1.1;
        // console.log(this.rate);
        
    }

    this.getLevel = () => {
        return data.level;
    }

}

export {level_manager};