/*-------- Declaration of classes -------- */
class player{
    /* The player of the game
    State==0 means, that it is not their turn
    State==1 means, that it is their turn
    */
    constructor (color,human){
        this.color = color;
        this.human = human;
        this.stones_hand = 9;
        this.stones_atall = 9;
        this.action = 'put';
        if (this.color == 'black'){
            this.state = 0;
        }else{
            this.state = 1;
        }
    }
}

class game{
    /* Indicate at the construction whether 2 humans play against each other or whether an ai should play.
    var main_game  = new game('human','ai);
    In this case the human will play with white and the AI with black.
    */
    constructor(pl1, pl2){ 
        this.white = pl1;
        this.black = pl2;
        this.gameover = false;
    }
}
/*-------- Declaration of global variables and objects --------*/ 
const cont = document.getElementById('game_container');
var width = cont.clientWidth;
var height = cont.clientHeight;
var ct_x = cont.offsetLeft;
var ct_y = cont.offsetTop; 
console.log(width);
console.log(height);
var clicked_array = Array(24).fill(0);
var positions = array_of_positions(width,height);
var bt_now;
const box = document.getElementById('msg_box');

var value_stones = ['$','$','£','¤','¤','¤','¤','¤','¤','£','£','£','$','¤','¤','¤','¤','$','¤','¤','¤','¤','¤','¤'];
var stones = Array(24).fill('¤');
//create a loop to bind the clicking function to the buttons

//Create the main game objects, the players and the game object
var main_game = new game('human','human');

var player1 = new player('white',main_game.white);
var player2 = new player('black',main_game.black);

console.log(player1);
console.log(player2);
/*-------- Definition of functions for the game --------*/
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

function draw_the_field(stones){
    /*Input: The stone array with the colors on the corresponding fields.
    Output: None, the buttons will be updated on the board
    */
    var bt_test;
    var positions = array_of_positions(width,height);
    for (var i = 0; i<24; i++){
        bt_test = document.getElementById(`bt_${i}`);
        p = positions[i];
        p1 = p[0];
        p2 = p[1];
        
        if (stones[i]=='¤'){
            bt_test.style.left = `${p1+ct_x-15}px`;
            bt_test.style.top = `${p2+ct_y-15}px`;
            bt_test.style.width = '30px';
            bt_test.style.height = '30px';
        }
        if (stones[i]=='£'){
            bt_test.style.left = `${p1+ct_x-25}px`;
            bt_test.style.top = `${p2+ct_y-25}px`;
            bt_test.style.backgroundColor = 'white';
            bt_test.style.background= 'rgb(255,255,255)';
            bt_test.style.background = 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(216,216,231,1) 11%, rgba(255,255,255,1) 22%, rgba(255,255,255,1) 31%, rgba(216,216,231,1) 42%, rgba(253,253,255,1) 53%, rgba(255,255,255,1) 100%)';
            bt_test.style.width = '50px';
            bt_test.style.height = '50px';
        }
        if (stones[i]=='$'){
            bt_test.style.left = `${p1+ct_x-25}px`;
            bt_test.style.top = `${p2+ct_y-25}px`;
            bt_test.style.backgroundColor = 'black';
            bt_test.style.background= 'rgb(255,255,255)';
            bt_test.style.background= 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(87,87,92,1) 11%, rgba(0,0,0,1) 22%, rgba(4,4,4,1) 31%, rgba(87,87,92,1) 42%, rgba(0,0,0,1) 53%, rgba(255,255,255,1) 100%)';
            bt_test.style.width = '50px';
            bt_test.style.height = '50px';
        }
    }
}
draw_the_field(stones);
function clicking(index){
    clicked_array[index]= 1;     
    if (player1.state==1){
        if (player1.action=='put'){
            stones[index] = '£';
            player1.stones_hand-=1;
            player1.state=0;
            player2.state=1;
            box.innerHTML = 'Black needs to put down a stone.'
            if(player1.stones_hand==0){
                player1.action='move';
                box.innerHTML = 'Black needs to put down a stone.'
            }  
        }
        if(player1.action=='move'){
            box.innerHTML = 'Black needs to put down a stone.'
        }
    }else{
        if (player2.action=='put'){
            stones[index] = '$';
            player2.stones_hand-=1;
            player2.state=0;
            player1.state=1;
            box.innerHTML = 'White needs to put down a stone.'
            if(player2.stones_hand==0){
                player2.action='move';
                box.innerHTML = 'White needs to move a stone.'
            }
        }if(player2.action=='move'){
            
        }
    }
    
    draw_the_field(stones);
    clicked_array = Array(24).fill(0);
}





