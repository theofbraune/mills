

const cont = document.getElementById('game_container');
var width = cont.clientWidth;
var height = cont.clientHeight;
var ct_x = cont.offsetLeft;
var ct_y = cont.offsetTop; 
console.log(width);
console.log(height);
function array_of_positions(width,height){
    /* create the array of the position of the buttons, aka the positions where we will draw the 
    buttons, stones later. The output will be the array of positions with x,y decimal coordinate*/
    
    var pos_x;
    var pos_y;
    if(width >height){
        pos_x = (width-height)/2+50;
        pos_y = 50;
    }else{
        pos_x = 50;
        pos_y = (width-height)/2+50;
    }

    var positions = Array();
    var len = Math.min(width, height)-100;
    var dst_between = 75;

    //0-2
    positions.push(Array(pos_x,pos_y));
    positions.push(Array(pos_x+len/2,pos_y));
    positions.push(Array(pos_x+len,pos_y));
    //3,4
    positions.push(Array(pos_x+len,pos_y+len/2));
    positions.push(Array(pos_x+len,pos_y+len));
    //5,6
    positions.push(Array(pos_x+len/2,pos_y+len));
    positions.push(Array(pos_x,pos_y+len));
    //7
    positions.push(Array(pos_x,pos_y+len/2));

    pos_x = pos_x + dst_between;
    pos_y = pos_y+ dst_between;
    len = len-2*dst_between;
    
    //8-10
    positions.push(Array(pos_x,pos_y));
    positions.push(Array(pos_x+len/2,pos_y));
    positions.push(Array(pos_x+len,pos_y));
    //11, 12
    positions.push(Array(pos_x+len,pos_y+len/2));
    positions.push(Array(pos_x+len,pos_y+len));
    //13,14
    positions.push(Array(pos_x+len/2,pos_y+len));
    positions.push(Array(pos_x,pos_y+len));
    //15
    positions.push(Array(pos_x,pos_y+len/2));

    pos_x = pos_x + dst_between;
    pos_y = pos_y+ dst_between;
    len = len-2*dst_between;
    
    //16-18
    positions.push(Array(pos_x,pos_y));
    positions.push(Array(pos_x+len/2,pos_y));
    positions.push(Array(pos_x+len,pos_y));
    //19,20
    positions.push(Array(pos_x+len,pos_y+len/2));
    positions.push(Array(pos_x+len,pos_y+len));
    //21,22
    positions.push(Array(pos_x+len/2,pos_y+len));
    positions.push(Array(pos_x,pos_y+len));
    //23
    positions.push(Array(pos_x,pos_y+len/2));

    return(positions)

}

var positions = array_of_positions(width,height);

var button_array = Array();
var p, p1, p2;
for (var j=0; j<positions.length; j++){
    p = positions[j];
    console.log(p[0],p[1]);
}

var bt_test;


for (var i = 0; i<24; i++){
    bt_test = document.getElementById(`bt_${i}`);
    button_array.push(bt_test);
    console.log(bt_test);
    p = positions[i];
    p1 = p[0];
    p2 = p[1];
    console.log(p1,p2);
    bt_test.style.left = `${p1+ct_x-15}px`;
    bt_test.style.top = `${p2+ct_y-15}px`;
}


