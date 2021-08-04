
var canvas = document.getElementById("plain__field");

canvas.height = canvas.scrollHeight;
canvas.width= canvas.scrollWidth;

var ctx = canvas.getContext('2d');


class white_stone{
    /* The class of the white stone that will be put on the field. There is a hover method, but I think, that it will be difficult to use this method, cause the update, when the mouse is away will be difficult.
    */ 
    constructor (x,y,Radius,id){
        this.x = x;
        this.y = y;
        this.Radius = Radius;
        this.id = id;
    }
    draw(ctx){
        var inner_Radius = this.Radius/4;
        var gradient = ctx.createRadialGradient(this.x, this.y, inner_Radius, this.x, this.y, this.Radius);
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(0.2, '#add9b9');
        gradient.addColorStop(0.4, 'white');
        gradient.addColorStop(0.6, '#add9b9');
        gradient.addColorStop(0.9, 'white');
        gradient.addColorStop(1, 'white');
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.Radius,0,2*Math.PI);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();     

    }
    draw_hover(ctx,hover_radius){
        var inner_Radius = this.Radius/4;
        var gradient = ctx.createRadialGradient(this.x, this.y, inner_Radius, this.x, this.y, this.Radius+hover_radius);
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(0.5, '#add9b9');
        gradient.addColorStop(1, 'white');
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.Radius+hover_radius,0,2*Math.PI);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.endPath();
        
    }
}

class black_stone{
    constructor (x,y,Radius,id){
        this.x = x;
        this.y = y;
        this.Radius = Radius;
        this.id = id;
    }
    draw(ctx){
        var inner_Radius = this.Radius/4;
        var gradient = ctx.createRadialGradient(this.x, this.y, inner_Radius, this.x, this.y, this.Radius);
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(0.2, '#526b59');
        gradient.addColorStop(0.4, 'black');
        gradient.addColorStop(0.6, '#526b59');
        gradient.addColorStop(0.9, 'black');
        gradient.addColorStop(1, 'black');
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.Radius,0,2*Math.PI);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();      

    }
    draw_hover(ctx,hover_radius){
        var inner_Radius = this.Radius/4;
        var gradient = ctx.createRadialGradient(this.x, this.y, inner_Radius, this.x, this.y, this.Radius+hover_radius);
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(0.5, '#526b59');
        gradient.addColorStop(1, 'black');
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.Radius+hover_radius,0,2*Math.PI);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
        
    }
}

class default_field{
    constructor (x,y,Radius,id){
        this.x = x;
        this.y = y;
        this.Radius = Radius;
        this.id = id;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.Radius,0,2*Math.PI);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.fill();        

    }
    draw_hover(ctx,hover_radius){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.Radius+hover_radius,0,2*Math.PI);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.fill();
        
    }
}

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


function start_square(){
    /* Function that takes the browser size information and gives information
    about the position of the initial outer square of the field.
    Returns: x_position, y_position, length of first square, space between the 
    squares
    */
    var hei = canvas.height;
    var wid = canvas.width;
    var len_sq= Math.min(hei,wid)-100;
    var pos_x;
    var pos_y;
    var remaining_space;
    //console.log(hei);
    //console.log(wid);
    var dst_between = len_sq/7;
    if (hei > wid){
        remaining_space = (hei-len_sq)/2;
        pos_y = remaining_space;
        pos_x = 50;

    }else{
        remaining_space = (wid-len_sq)/2;
        pos_x = remaining_space;
        pos_y = 50;
    }
    return(Array(pos_x,pos_y,len_sq,dst_between));
    
}

function draw_field(){
    /* void function that draws the field for the 9 men's morris field with help
    of the method before
    */
   //first square
    var thickness = 6;
    var coords = start_square();
    var pos_x_1 = coords[0];
    var pos_y_1 = coords[1];
    var len_1 = coords[2];
    ctx.strokeStyle = "black";
    ctx.lineWidth = thickness;
    ctx.strokeRect(pos_x_1,pos_y_1,len_1,len_1);

    var dst_between = coords[3];

    //second square
    var pos_x_2 =pos_x_1+dst_between ;
    var pos_y_2 =pos_y_1+ dst_between;
    var len_2 =len_1-2*dst_between;
    ctx.strokeStyle = "black";
    ctx.lineWidth = thickness;
    ctx.strokeRect(pos_x_2,pos_y_2,len_2,len_2);

    //third square
    var pos_x_3 =pos_x_2+dst_between ;
    var pos_y_3 =pos_y_2+ dst_between;
    var len_3 =len_2-2*dst_between;
    ctx.strokeStyle = "black";
    ctx.lineWidth = thickness;
    ctx.strokeRect(pos_x_3,pos_y_3,len_3,len_3);

    //draw the lines

    //at 12 o'clock
    ctx.beginPath();
    ctx.moveTo(pos_x_1+len_1/2,pos_y_1);
    ctx.lineTo(pos_x_1+len_1/2,pos_y_3);
    ctx.strokeStyle = "black";
    ctx.lineWidth = thickness;
    ctx.stroke()

    //at 3 o'clock
    ctx.beginPath();
    ctx.moveTo(pos_x_1+len_1,pos_y_1+len_1/2);
    ctx.lineTo(pos_x_3+len_3,pos_y_1+len_1/2);
    ctx.strokeStyle = "black";
    ctx.lineWidth = thickness;
    ctx.stroke()

    //at 6 o'clock
    ctx.beginPath();
    ctx.moveTo(pos_x_1+len_1/2,pos_y_1+len_1);
    ctx.lineTo(pos_x_1+len_1/2,pos_y_3+len_3);
    ctx.strokeStyle = "black";
    ctx.lineWidth = thickness;
    ctx.stroke()

    //at 9 o'clock
    ctx.beginPath();
    ctx.moveTo(pos_x_1,pos_y_1+len_1/2);
    ctx.lineTo(pos_x_3,pos_y_3+len_3/2);
    ctx.strokeStyle = "black";
    ctx.lineWidth = thickness;
    ctx.stroke()


}
//console.log(start_square()[0])
draw_field()

function array_of_positions(){
    /* create the array of the position of the buttons, aka the positions where we will draw the 
    buttons, stones later. The output will be the array of positions with x,y decimal coordinate*/
    var coords = start_square();
    var positions = Array();
    var pos_x = coords[0];
    var pos_y = coords[1];
    var len = coords[2];
    var dst_between = coords[3];

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

function draw_circles(Radius){
    /* Input: the radius of the default circle on the positions for the stones
    Output: void function with (the small) circles on the positions for the stones afterwards 
    */
    var x;
    var y;
    var ar = array_of_positions();
    for (var ind = 0; ind< ar.length; ind++){
        position = ar[ind];
        x = position[0];
        y = position[1];
        let d_stone = new default_field(x,y,Radius);
        d_stone.draw(ctx);

    }
}
draw_circles(10)

function draw_stones(values, Radius){
    /* Input: Array of positions of the stones on the field. The colors are indicated with '£' and '$', where '£' means white and '$' means black. Further input of the Radius of the big stone. We will draw the small default circle with half the radius of the big circle.
    Output: None, just the painting of the stones on the field. 
    */

    var inner_Radius = Radius/2;
    var coordinates = array_of_positions();
    var x,y, ar;
    for (var ind = 0; ind<values.length;ind++){
        if(values[ind]=='£'){
            ar = coordinates[ind];
            x = ar[0];
            y = ar[1];
            let w_stone = new white_stone(x,y,Radius)
            w_stone.draw(ctx)
        }else if(values[ind]=='$'){
            ar = coordinates[ind];
            x = ar[0];
            y = ar[1];
            let b_stone = new black_stone(x,y,Radius);
            b_stone.draw(ctx);
        }else{
            ar = coordinates[ind];
            x = ar[0];
            y = ar[1];
            let d_stone = new default_field(x,y,inner_Radius);
            d_stone.draw(ctx);
        }
    }
}

draw_stones(['$','$','£','¤','¤','¤','¤','¤','¤','£','£','£','$','¤','¤','¤','¤','$','¤','¤','¤','¤','¤','¤'],20)

function update_field(stones){
    ctx.fillStyle = '#C0C0C0';
    //ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw_field()
    draw_circles(10);
    draw_stones(stones,20);
}

function distance(x1, x2,y1,y2){
    return Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
}

function click_field(stones, rad_small,rad_big){
    /* Input: the stones array with the '$','£','¤' symbols, the radius of the small default stones
    and the radius for the big stones on the field. Recall '$' means black, '£' means white.
    Output: the index of the clicked field, if we clicked on a field.
    */
    const rect = canvas.getBoundingClientRect();

    function check_position(event){
        /* Function for the event listener, takes the event and checkes whether the curser for the mouse is in one of the fields, if so, we will write this index in the auxillary field.
         */

        const x1 = event.clientX-rect.left;
        const y1 = event.clientY-rect.top;
        const pos = array_of_positions();
        for (let ind = 0; ind<24;ind++){
            const ar = pos[ind];
            const x2 = ar[0];
            const y2 = ar[1];
            const color = stones[ind];
            if (color=='¤'){
                if (distance(x1, x2,y1,y2)<rad_small){
                    value = ind;
                    document.getElementById("help__element").innerHTML = value;
                }
            }else {
                if (distance(x1, x2,y1,y2)<rad_big){
                    value = ind;
                    document.getElementById("help__element").innerHTML = value;
                }
            }
        }

    }


    //now with the modification the event listener will work
    canvas.addEventListener('click', check_position);
}

function get_field_index(stones, rad_small,rad_big){
    document.getElementById('help__element').innerHTML = '-1';
    var value = document.getElementById('help__element').innerHTML;
    console.log('value', value);
    if (value!= -1){
        setInterval(click_field(stones, rad_small,rad_big),1000);
        value = document.getElementById('help__element').innerHTML;
        console.log(value);
        return;
    }
    
}


function play(){
/* The function that will start the game and initialize the moves 
and then will terminate the game if necessary. The main game loop.
*/
    var pl1  = new player('white',human = true);
    var pl2 = new player('black',human = true);
    var stones = Array(24).fill('¤');
    update_field(stones);
    var gameover = false;
    var cur_player = pl1;
    const text_box = document.getElementById("msg_box");

    if (cur_player.color=="white" & cur_player.action == 'put' & cur_player.human==true){ 
        text_box.innerHTML = 'White needs to put down a stone.';
    }else if(cur_player.color=="black" & cur_player.action == 'put' & cur_player.human==true){
        text_box.innerHTML = 'Black needs to put down a stone.';
    }
    
    //check whether the information is valid
    click_field(stones,10,20);
    //if yes, update the field
}

function turn(pl1,pl2,stones){
/*function that will perform a move and checks whether it is a valid move. If necessary it will allow to remove a stone */

}

play()
