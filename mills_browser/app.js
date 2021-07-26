
var canvas = document.getElementById("plain__field");

canvas.height = canvas.scrollHeight;
canvas.width= canvas.scrollWidth;

var ctx = canvas.getContext('2d');





function start_square(){
    /* void function that takes the browser size information and gives information
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
    var dst_between = len_sq/5;
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
    var coords = start_square();
    var pos_x_1 = coords[0];
    var pos_y_1 = coords[1];
    var len_1 = coords[2];
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
    ctx.strokeRect(pos_x_1,pos_y_1,len_1,len_1);

    var dst_between = coords[3];

    //second square
    var pos_x_2 =pos_x_1+dst_between ;
    var pos_y_2 =pos_y_1+ dst_between;
    var len_2 =len_1-2*dst_between;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
    ctx.strokeRect(pos_x_2,pos_y_2,len_2,len_2);

    //third square
    var pos_x_3 =pos_x_2+dst_between ;
    var pos_y_3 =pos_y_2+ dst_between;
    var len_3 =len_2-2*dst_between;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
    ctx.strokeRect(pos_x_3,pos_y_3,len_3,len_3);

    //draw the lines

    //at 12 o'clock
    ctx.beginPath();
    ctx.moveTo(pos_x_1+len_1/2,pos_y_1);
    ctx.lineTo(pos_x_1+len_1/2,pos_y_3);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
    ctx.stroke()

    //at 3 o'clock
    ctx.beginPath();
    ctx.moveTo(pos_x_1+len_1,pos_y_1+len_1/2);
    ctx.lineTo(pos_x_3+len_3,pos_y_1+len_1/2);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
    ctx.stroke()

    //at 6 o'clock
    ctx.beginPath();
    ctx.moveTo(pos_x_1+len_1/2,pos_y_1+len_1);
    ctx.lineTo(pos_x_1+len_1/2,pos_y_3+len_3);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
    ctx.stroke()

    //at 9 o'clock
    ctx.beginPath();
    ctx.moveTo(pos_x_1,pos_y_1+len_1/2);
    ctx.lineTo(pos_x_3,pos_y_3+len_3/2);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
    ctx.stroke()


}
//console.log(start_square()[0])
draw_field()

function create_array_of_positions(){



}
