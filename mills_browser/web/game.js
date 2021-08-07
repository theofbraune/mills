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
var clicked_array = Array(24).fill(0);
var positions = array_of_positions(width,height);
var bt_now;
const box = document.getElementById('msg_box');
var new_mill=false;
var value_stones = ['$','$','¤','$','£','¤','¤','£','¤','¤','£','£','¤','¤','¤','£','¤','$','¤','¤','¤','¤','¤','¤'];
var stones = Array(24).fill('¤');
//var stones = value_stones;


//create a loop to bind the clicking function to the buttons

//Create the main game objects, the players and the game object
//var main_game = new game('human','human');
var main_game;

//var player1 = new player('white',main_game.white);
//var player2 = new player('black',main_game.black);
var player1, player2;

/*-------- Definition of function to initialize the game --------*/
function initialize_game(){
    console.log('started');
    for (var i = 0; i<24; i++){
        bt_test = document.getElementById(`bt_${i}`);
        bt_test.disabled = false;
    }
    box.innerHTML = "White needs to put down a stone."
    stones = Array(24).fill('¤');
    //stones = value_stones;
    var bt_white = document.getElementById('bt_cl_1').innerHTML;
    var bt_black = document.getElementById('bt_cl_2').innerHTML;
    if (bt_white=='Human <span class="arrowBtn" id="lb_1">↻</span>'){
        if(bt_black=='Human <span class="arrowBtn" id="lb_1">↻</span>'){
            main_game = new game('human','human');
        }
        if(bt_black=='AI <span class="arrowBtn" id="lb_1">↻</span>'){
            main_game = new game('human','ai')
        }
    }
    if (bt_white=='AI <span class="arrowBtn" id="lb_1">↻</span>'){
        if(bt_black=='Human <span class="arrowBtn" id="lb_1">↻</span>'){
            main_game = new game('ai','human');
        }
        if(bt_black=='AI <span class="arrowBtn" id="lb_1">↻</span>'){
            main_game = new game('ai','ai')
        }
    }
    //main_game = new game('human','human');
    player1 = new player('white',main_game.white);
    player2 = new player('black',main_game.black);
    draw_the_field(stones)

    document.getElementById("bt_start").innerHTML = "Restart";
}

function switch_a() {
    const bt1 = document.getElementById('bt_cl_1');
    if(bt1.innerHTML=='Human <span class="arrowBtn" id="lb_1">↻</span>'){
        bt1.innerHTML='AI <span class="arrowBtn" id="lb_1">↻</span>';
    }else{
        bt1.innerHTML='Human <span class="arrowBtn" id="lb_1">↻</span>';
    }
}

function switch_b() {
    const bt1 = document.getElementById('bt_cl_2');
    if(bt1.innerHTML=='Human <span class="arrowBtn" id="lb_1">↻</span>'){
        bt1.innerHTML='AI <span class="arrowBtn" id="lb_1">↻</span>';
    }else{
        bt1.innerHTML='Human <span class="arrowBtn" id="lb_1">↻</span>';
    }
}

/*-------- Definition of functions for displaying the game --------*/
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

/*-------- Definition of our main function --------*/
function clicking(index){
    //check whether we are in the case that we need to remove a stone
    if(main_game.gameover==false){
        console.log('clicked');
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
                        if (player2.stones_atall==3){
                            player2.action='jump';
                            box.innerHTML = 'Black needs to jump.';
                        }
                        if(player2.action=='put'){
                            box.innerHTML = 'Black needs to put down a stone.';
                        }
                        if(player2.action=='move'){
                            box.innerHTML = 'Black needs to move a stone.';
                        }
                        if(player2.action=='jump'){
                            box.innerHTML = 'Black needs to jump.';
                        }
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
                        if (player1.stones_atall==3){
                            player1.action='jump';
                            box.innerHTML = 'White needs to jump.';
                        }
                        if(player1.action=='put'){
                            box.innerHTML = 'White needs to put down a stone.';
                        }
                        if(player1.action=='move'){
                            box.innerHTML = 'White needs to move a stone.';
                        }
                        if(player1.action=='jump'){
                            box.innerHTML = 'White needs to jump.';
                        }
                        console.log(player2);
                        console.log(player1);
                    }
                }
                if((player1.stones_atall==2) ||(player2.stones_atall==2)){
                    main_game.gameover=true;
                    box.innerHTML='Game Over!!'
                }
            }
        }else{
            if(main_game.gameover==false){
            //handle the case that we do a move and don't take a stone away     
            if (player1.state==1){
            if (player1.human == 'human'){
                
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
                        player1.state=0;
                        player2.state=1;
                    }
                    
                }
                else if(player1.action=='move'){
                    console.log('moving');
                    
                    //check whether one can move at all
                    if (clicked_array.includes(1)==false){
                        console.log('add the first index: ', index);
                        clicked_array[index]=1;   
                    }else{
                        if(clicked_array[index]!==1){
                            clicked_array[index]=2;
                            var idx1 = clicked_array.indexOf(1);
                            var idx2 = clicked_array.indexOf(2);
                            console.log(idx1);
                            console.log(idx2);
                            if (stones[idx1]=='£' && stones[idx2]=='¤'){
                                console.log('good colors');
                                if(check_connected(idx1,idx2)){
                                    console.log('connected');
                                    var stones_copy = Object.assign({},stones);
                                    stones[idx1]='¤';
                                    stones[idx2]='£';
                                    draw_the_field(stones);

                                    
                                    console.log(check_new_mills(stones_copy,stones));
                                    if(check_new_mills(stones_copy,stones)){
                                        console.log(taking_stone_possible(stones,player2.color));
                                        if(taking_stone_possible(stones,player2.color)){
                                            box.innerHTML = 'White has a mill and can remove a stone.';
                                            new_mill=true;
                                        }else{
                                            box.innerHTML = 'White has a mill, but cannot remove a stone, as all stones are blocked.'
                                        }
                                    }
                                    
                                    player1.state=0;
                                    player2.state=1;
                                    if(new_mill==false){
                                        if (player2.action=='put'){
                                            box.innerHTML = 'Black needs to put down a stone';
                                        }
                                        else if(player2.action=='move'){
                                            box.innerHTML = 'Black needs to move';
                                        }
                                        else if(player2.action=='jump'){
                                            box.innerHTML = 'Black needs to jump';
                                        }
                                    }
                                    
                                }
                            }
                            //check whether the two fields are connected

                            clicked_array = Array(24).fill(0);
                            
                        }
                    }
                
                }
                else if(player1.action=='jump'){
                    console.log('jumping');
                    if (clicked_array.includes(1)==false){
                        console.log('add the first index: ', index);
                        clicked_array[index]=1;   
                    }else{
                        if(clicked_array[index]!==1){
                            clicked_array[index]=2;
                            var idx1 = clicked_array.indexOf(1);
                            var idx2 = clicked_array.indexOf(2);
                            console.log(idx1);
                            console.log(idx2);
                            if (stones[idx1]=='£' && stones[idx2]=='¤'){
                                console.log('good colors');
                                
                                console.log('connected');
                                var stones_copy = Object.assign({},stones);
                                stones[idx1]='¤';
                                stones[idx2]='£';
                                draw_the_field(stones);

                                
                                console.log(check_new_mills(stones_copy,stones));
                                if(check_new_mills(stones_copy,stones)){
                                    console.log(taking_stone_possible(stones,player2.color));
                                    if(taking_stone_possible(stones,player2.color)){
                                        box.innerHTML = 'White has a mill and can remove a stone.';
                                        new_mill=true;
                                    }else{
                                        box.innerHTML = 'White has a mill, but cannot remove a stone, as all stones are blocked.'
                                    }
                                }
                                
                                player1.state=0;
                                player2.state=1;
                                if(new_mill==false){
                                    if (player2.action=='put'){
                                        box.innerHTML = 'Black needs to put down a stone';
                                    }
                                    else if(player2.action=='move'){
                                        box.innerHTML = 'Black needs to move';
                                    }
                                    else if(player2.action=='jump'){
                                        box.innerHTML = 'Black needs to jump';
                                    }
                                    
                                }
                                    
                                
                            }
                            //check whether the two fields are connected

                            clicked_array = Array(24).fill(0);
                            
                        }
                    }
                }
            }else{
                //let the AI move
            }
            }else{
                if (player2.human == 'human'){
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
                        player1.state=1;
                        player2.state=0;
                        if(player2.stones_hand==0){
                            box.innerHTML = 'White needs to move a stone.'
                        }
                    }
                    
                }
                else if(player2.action=='move'){
                    
                    //check whether one can move at all
                    if (clicked_array.includes(1)==false){
                        console.log('add the first index: ', index);
                        clicked_array[index]=1;   
                    }else{
                        if(clicked_array[index]!==1){
                            clicked_array[index]=2;
                            var idx1 = clicked_array.indexOf(1);
                            var idx2 = clicked_array.indexOf(2);
                            console.log(idx1);
                            console.log(idx2);
                            if (stones[idx1]=='$' && stones[idx2]=='¤'){
                                console.log('good colors');
                                if(check_connected(idx1,idx2)){
                                    console.log('connected');
                                    var stones_copy = Object.assign({},stones);
                                    stones[idx1]='¤';
                                    stones[idx2]='$';
                                    draw_the_field(stones);
                                    
                                    console.log(check_new_mills(stones_copy,stones));
                                    if(check_new_mills(stones_copy,stones)){
                                        //console.log(taking_stone_possible(stones,player2.color));
                                        if(taking_stone_possible(stones,player1.color)){
                                            box.innerHTML = 'Black has a mill and can remove a stone.';
                                            new_mill=true;
                                        }else{
                                            box.innerHTML = 'Black has a mill, but cannot remove a stone, as all stones are blocked.'
                                        }
                                    }
                                    player1.state=1;
                                    player2.state=0;
                                    if(new_mill==false){
                                        box.innerHTML = 'White needs to move a stone';
                                    }
                                    
                                }
                            }
                            //check whether the two fields are connected

                            clicked_array = Array(24).fill(0);
                            
                        }
                    }
                    
                }
                else if (player2.action=='jump'){
                    console.log('jumping');
                    if (clicked_array.includes(1)==false){
                        console.log('add the first index: ', index);
                        clicked_array[index]=1;   
                    }else{
                        if(clicked_array[index]!==1){
                            clicked_array[index]=2;
                            var idx1 = clicked_array.indexOf(1);
                            var idx2 = clicked_array.indexOf(2);
                            console.log(idx1);
                            console.log(idx2);
                            if (stones[idx1]=='$' && stones[idx2]=='¤'){
                                console.log('good colors');
                                {
                                    console.log('connected');
                                    var stones_copy = Object.assign({},stones);
                                    stones[idx1]='¤';
                                    stones[idx2]='$';
                                    draw_the_field(stones);
                                    
                                    console.log(check_new_mills(stones_copy,stones));
                                    if(check_new_mills(stones_copy,stones)){
                                        //console.log(taking_stone_possible(stones,player2.color));
                                        if(taking_stone_possible(stones,player1.color)){
                                            box.innerHTML = 'Black has a mill and can remove a stone.';
                                            new_mill=true;
                                        }else{
                                            box.innerHTML = 'Black has a mill, but cannot remove a stone, as all stones are blocked.'
                                        }
                                    }
                                    player1.state=1;
                                    player2.state=0;
                                    if(new_mill==false){
                                        if (player1.action=='put'){
                                            box.innerHTML = 'White needs to put down a stone';
                                        }
                                        else if(player1.action=='move'){
                                            box.innerHTML = 'White needs to move';
                                        }
                                        else if(player1.action=='jump'){
                                            box.innerHTML = 'White needs to jump';
                                        }
                                    }
                                    
                                }
                            }
                            //check whether the two fields are connected

                            clicked_array = Array(24).fill(0);
                            
                        }
                    }
                }
                }else{
                    //let the AI move
                }
            } 
            
            }
        }
    }else{
        box.innerHTML='Game Over!!'
    }
}
/*-------------------------------------------------*/

/*-------- Definition the functioning of the game --------*/
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
    return(false)
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

function check_connected(idx1, idx2){
    var indices = [];
    for (var i = 0; i < 24; i++){
        indices.push(i);
    }
    var rows_indices = create_rows(indices);
    for (var j=0; j<rows_indices.length;j++){
        var row = rows_indices[j];
        if (row.includes(idx1)&&row.includes(idx2)){
            var pos1 = row.indexOf(idx1);
            var pos2 = row.indexOf(idx2);//either 0, 1, 2
            if((pos1-pos2==1)||(pos2-pos1)==1){//check whether they are neighboring
                return true;
            }
            
        }
    } 
}

