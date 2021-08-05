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
var new_mill;
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
    console.log('stones: ',stones);
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
            bt_test.style.background= 'rgb(255,255,255)';
            bt_test.style.background='black';
            
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

    //check whether we are in the case that we need to remove a stone
    if (new_mill==true){
        if(!contained_in_mill(index,stones)){
            console.log('entered');
            if(player1.state==0){//this is the color we need to remove, i.e white/'£'
                if(stones[index]=='$'){
                    new_mill=false;
                    stones[index]='¤';
                    player2.stones_atall-=1;
                    console.log(stones);
                    draw_the_field(stones);
                    box.innerHTML = 'Black needs to put down a stone.';
                    console.log(player1);
                    console.log(player2)

                }
            }else{
                if(stones[index]=='£'){
                    new_mill=false;
                    stones[index]='¤';
                    player1.stones_atall-=1;
                    console.log(stones);
                    draw_the_field(stones);
                    box.innerHTML = 'White needs to put down a stone.';

                    console.log(player2);
                    console.log(player1);
                }
            }
            if(player1.stones_atall==2 ||player2.stones_atall==2){
                main_game.gameover=true;
            }
        }else{
            box.innerHTML = 'You cannot take a stone out of a mill.'; 
        }
    }else{
        //handle the case that we do a move and don't take a stone away
        if(main_game.gameover==false){
            clicked_array[index]= 1;     
            if (player1.state==1){
                if (player1.action=='put'){
                    if(stones[index]=='¤'){
                        /*create a deep copy of the stone positions in order to check 
                        if there are new mills*/
                        var stones_copy = Object.assign({},stones);
                        stones[index] = '£';
                        player1.stones_hand-=1;
                        
                        box.innerHTML = 'Black needs to put down a stone.'
                        if(player1.stones_hand==0 && player1.stones_atall>3){
                            player1.action='move';
                            box.innerHTML = 'Black needs to put down a stone.';
                        }
                        draw_the_field(stones);
                        clicked_array = Array(24).fill(0);
                        //check mills here
                        //console.log(check_new_mills(stones_copy,stones));
                        if(check_new_mills(stones_copy,stones)){
                            //console.log(taking_stone_possible(stones,player2.color));
                            if(taking_stone_possible(stones,player2.color)){
                                box.innerHTML = 'White has a mill and can remove a stone.';
                                new_mill=true;
                            }else{
                                box.innerHTML = 'White has a mill, but cannot remove a stone, as all stones are blocked.'
                            }
                        }
                        
                    }
                }
                if(player1.action=='move'){
                }
            }else{
                if (player2.action=='put'){
                    if(stones[index]=='¤'){
                        var stones_copy = Object.assign({},stones) ;
                        stones[index] = '$';
                        player2.stones_hand-=1;
                        box.innerHTML = 'White needs to put down a stone.'
                        if(player2.stones_hand==0 && player2.stones_atall>3){
                            player2.action='move';
                            box.innerHTML = 'White needs to move a stone.'
                        }
                        draw_the_field(stones);
                        clicked_array = Array(24).fill(0);
                        //check mills here
                        if(check_new_mills(stones_copy,stones)){
                            if(taking_stone_possible(stones,player1.color)){
                                box.innerHTML = 'Black has a mill and can remove a stone.';
                                new_mill=true;
                            }else{
                                box.innerHTML = 'Black has a mill, but cannot remove a stone, as all stones are blocked.'
                            }
                        }
                        
                    }
                    
                }if(player2.action=='move'){
                    
                }
            }
            if(player1.state==0){
                player1.state=1;
                player2.state=0;
            }else{
                player1.state=0;
                player2.state=1;
            }
        
        }else{
            //this is what happens when its game over
        }
    }
}

function create_rows(stones){
    /*Input: The array of the stones
    Output: An array that consists out of the rows of the field.
    */
    var rows = [[stones[0],stones[1],stones[2]], [stones[0],stones[7],stones[6]],[stones[2],stones[3],stones[4]],[stones[6],stones[5],stones[4]],[stones[8],stones[15],stones[14]], [stones[8],stones[9],stones[10]],[stones[10],stones[11],stones[12]],[stones[14],stones[13],stones[12]],[stones[16],stones[23],stones[22]], [stones[16],stones[17],stones[18]],[stones[18],stones[19],stones[20]],[stones[22],stones[21],stones[20]],[stones[7],stones[15],stones[23]], [stones[1],stones[9],stones[17]],[stones[19],stones[11],stones[3]],[stones[21],stones[13],stones[5]]];
    return rows;
}

function check_new_mills(stones_copy,stones){
    /* Input: The stone array before we made the move and afterwards.
    calculates then all the possible rows for the field and loops over them
    Then computes whether there are 
    */
    var rows = create_rows(stones);
    var rows_old = create_rows(stones_copy);

    for (var i=0; i<rows.length;i++){
        var row = rows[i];
        var row_old = rows_old[i];
        if (row.includes('£')||row.includes('$')){
            if(row[0]==row[1]&&row[1]==row[2]){
                if(!(row_old[0]==row_old[1]&&row_old[1]==row_old[2])){
                    //console.log('mills');
                    return true;
                }
            }
        }

    }
}

function contained_in_mill(index,stones){
    /*Input: the index of a stone
    Output: Is this stone contained in a mill
    */

    var indices = [];
    for (var i = 0; i < 24; i++){
        indices.push(i);
    }
    var rows_indices = create_rows(indices);
    var rows = create_rows(stones);
    //loop over all possible rows and check whether a stone is contained
    for(var row_ind=0; row_ind<rows_indices.length;row_ind++){
        var curr_indices = rows_indices[row_ind];
        if(curr_indices.includes(index)){//the row that contains the index
            var row = rows[row_ind];
            if (row.includes('£')||row.includes('$')){
                if(row[0]==row[1]&&row[1]==row[2]){
                    return true;    
                }
            }
        }
    }
    return false;
}

function taking_stone_possible(stones,opp_color){
    /* Input: The array with the colors of the stones, the color of the opponent
    Output: Boolean value whether all stones are in a mill 
    */
    if(opp_color=='black'){
        opp_color='$';
    }else{
        opp_color='£';
    }
    for (var i=0; i<24;i++){  
        if(stones[i]==opp_color){
            if(!contained_in_mill(i,stones)){
                return true;
            }
        }
    }
    return false;
}



