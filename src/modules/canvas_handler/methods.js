var map = (n, start1, stop1, start2, stop2, withinBounds) => {
        // p5._validateParameters('map', arguments);
        const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
        if (!withinBounds) {
          return newval;
        }
        if (start2 < stop2) {
          return constrain(newval, start2, stop2);
        } else {
          return constrain(newval, stop2, start2);
        }
}

var constrain = (n, low, high) => {
    // p5._validateParameters('constrain', arguments);
    return Math.max(Math.min(n, high), low);
    
}

var Random = (min , max) => {    
    return Math.floor(Math.random() * ( max - min ) + min);
}


var hasChanse = (rate) =>{
    let chanse = Random(0 , 100);
    if(chanse <= rate){
        return true;
    }
    return false;
}

export {map , constrain , Random , hasChanse};