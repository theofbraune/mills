
function checking_new(){
    console.log('this is the test for the new one');
}


function ai_put_random(stones,color){
    /*Input: The stone array and the color of the player
    Output: The modified stone array*/
    
    var possible_fields = [];
    for (var i=0; i<stones.length;i++){
        if(stones[i]=='¤'){
            possible_fields.push(i);
        }
    }
    var index = Math.floor(Math.random() * possible_fields.length);
    stones[possible_fields[index]]=color
    //return stones[possible_fields[index]];
}

function ai_take_random(stones,color){
    var possible_fields = [];
    for (var i=0; i<stones.length;i++){
        if(stones[i]==color){
            possible_fields.push(i);
        }
    }
    var index = Math.floor(Math.random() * possible_fields.length);
    stones[possible_fields[index]]='¤';
}