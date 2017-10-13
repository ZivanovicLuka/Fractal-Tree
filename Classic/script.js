var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

c.width = window.innerWidth - 30;
c.height = window.innerHeight - 10;

var len;
var start_width;
var left_rotation;
var left_rotation;
var left_length;
var right_length;
var randomness;

var end_color = '#BA3636';

function color(width) {
  red = Math.ceil(235 * (width / start_width)).toString(16);
  red = red.length == 1 ? "0" + red : red;
  green = 'aa';
  blue = Math.floor(130 * (width / start_width)).toString(16);
  blue = blue.length == 1 ? "0" + blue : blue;
  ctx.strokeStyle = '#' + red + green + blue;
}

function leaf(endX, endY, length) {
  ctx.arc(endX, endY, length / 4, 0, 2 * Math.PI, false);
  ctx.fillStyle = end_color;
  ctx.fill();
}

function branch(length, startX, startY, width, rotate) {
  rotate = rotate + ((Math.random() * Math.PI - Math.PI / 2) * randomness / 100) / width * 2;

  old_len = length;
  length *= (Math.random() - .5) * randomness / 100 * 4;
  length += old_len;

  if (length < old_len / 2)
    length = old_len;

  var endX = Math.cos(rotate) * length + startX;
  var endY = Math.sin(rotate) * length + startY;

  color(width);

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.lineWidth = width;

  ctx.closePath();
  ctx.stroke();

  let has_branch = false;

  if (width > 1) {
    length = old_len;
    if (randomness * Math.random() < 75) {
      branch(length * left_length, endX, endY, width - 1, rotate - left_rotation);
      has_branch = true;
    }
    if (randomness * Math.random() > 45) {
      branch(length * left_length, endX, endY, width - 1, rotate);
      has_branch = true;
    }
    if (randomness * Math.random() < 75) {
      branch(length * right_length, endX, endY, width - 1, rotate + right_rotation);
      has_branch = true;
    }
  }

  if (!has_branch) {
    leaf(endX, endY, length);
  }
}

function draw_tree() {
  ctx.clearRect(0, 0, c.width, c.height);


  len = document.getElementById("len").value;
  start_width = document.getElementById("width").value;
  left_rotation = document.getElementById("lr").value / 180 * Math.PI;
  right_rotation = document.getElementById("rr").value / 180 * Math.PI;
  left_length = document.getElementById("ll").value / 10;
  right_length = document.getElementById("rl").value / 10;
  randomness = document.getElementById("randomness").value;

  branch(len, c.width / 2, c.height, start_width, -Math.PI / 2);
}

draw_tree();
