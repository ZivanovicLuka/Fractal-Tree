var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

c.width  = window.innerWidth - 30;
c.height = window.innerHeight - 10;

function color(width){
  red = Math.ceil(235*(width/start_width)).toString(16);
  red = red.length == 1 ? "0" + red : red;
  green = 'aa';
  blue = Math.floor(130*(width/start_width)).toString(16);
  blue = blue.length == 1 ? "0" + blue : blue;
  ctx.strokeStyle = '#'+red+green+blue;
}

function branch(length, startX, startY, width, rotate){

  var endX = Math.cos(rotate)*length + startX;
  var endY = Math.sin(rotate)*length + startY;

  color(width);

  ctx.beginPath();
  ctx.moveTo(startX,startY);
  ctx.lineTo(endX,endY);
  ctx.lineWidth = width;

  ctx.closePath();
  ctx.stroke();

  if(width>1){
    branch(length*left_length,endX,endY,width-1,rotate - left_rotation);
    branch(length*right_length,endX,endY,width-1,rotate + right_rotation);
  } else {
    ctx.arc(endX, endY, length/4, 0, 2 * Math.PI, false);
    ctx.fillStyle = end_color;
    ctx.fill();
  }
}


var len = document.getElementById("len").value;
var start_width = document.getElementById("width").value;
var left_rotation = document.getElementById("lr").value / 180 * Math.PI;
var left_rotation = document.getElementById("rr").value / 180 * Math.PI;
var left_length = document.getElementById("ll").value / 10;
var right_length = document.getElementById("rl").value / 10;
var end_color = 'red';

function draw_tree(){
  ctx.clearRect(0, 0, c.width, c.height);

  len = document.getElementById("len").value;
  start_width = document.getElementById("width").value;
  left_rotation = document.getElementById("lr").value / 180 * Math.PI;
  right_rotation = document.getElementById("rr").value / 180 * Math.PI;
  left_length = document.getElementById("ll").value / 10;
  right_length = document.getElementById("rl").value / 10;

  branch(len,c.width/2,c.height,start_width,-Math.PI/2);
}

draw_tree();
