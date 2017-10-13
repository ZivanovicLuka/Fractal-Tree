var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

c.width = window.innerWidth - 30;
c.height = window.innerHeight - 10;

var len;
var start_light;
var start_width;
var left_rotation;
var left_rotation;
var left_length;
var right_length;
var randomness;

var end_color = '#BA3636';
var start_angle = - Math.PI / 2;

var axiom = "F";
var sentence = axiom;

var rules = [];

rules[0] = {
  a: "F",
  b: document.getElementById("sys").value
}

function generate(n) {
  rules[0].b = document.getElementById("sys").value;
  for(var l=0; l<n; l++){
    var nextSentence = "";
    for (var i = 0; i < sentence.length; i++) {
      var current = sentence.charAt(i);
      for (var j = 0; j < rules.length; j++) {
        if (current == rules[j].a) {
          current = rules[j].b;
          break;
        }
      }
      nextSentence += current;
    }
    sentence = nextSentence;
    console.log("   " + sentence);
  }
}

function color(light) {
  red = Math.ceil(220 * (light / start_light)).toString(16);
  red = red.length == 1 ? "0" + red : red;
  green = Math.ceil(220 * (light / start_light)).toString(16);
  green = green.length == 1 ? "0" + green : green;
  blue = Math.floor(220 * (light / start_light)).toString(16);
  blue = blue.length == 1 ? "0" + blue : blue;
  ctx.strokeStyle = '#' + red + green + blue;
}

function branch(branch_obj) {
  branch_obj.rotation += ((Math.random() * Math.PI - Math.PI / 2) * randomness / 100) / branch_obj.light * 2;

  old_len = branch_obj.length;
  branch_obj.length *= (Math.random() - .5) * randomness / 100 * 4;
  branch_obj.length += old_len; // Wierd FIX

  if (length < old_len / 2)
    length = old_len;

  branch_obj.endX = Math.cos(branch_obj.rotation) * branch_obj.length + branch_obj.startX;
  branch_obj.endY = Math.sin(branch_obj.rotation) * branch_obj.length + branch_obj.startY;

  color(branch_obj.light);
  branch_obj.light-=.15/age;

  ctx.beginPath();
  ctx.moveTo(branch_obj.startX, branch_obj.startY);
  ctx.lineTo(branch_obj.endX, branch_obj.endY);

  ctx.lineWidth = branch_obj.width;
  if(branch_obj.width>1.5)
    branch_obj.width-=.7/age;

  ctx.closePath();
  ctx.stroke();

  branch_obj.startX = branch_obj.endX;
  branch_obj.startY = branch_obj.endY;

  return branch_obj;
}

function draw_tree(x) {
  var stack = [];

  var branch_obj = {
    length: len/(age*5),
    startX: x,
    startY: c.height,
    light: start_light,
    width: 2*age,
    rotation: start_angle,
    endX: x,
    endY: c.height
  }

  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);

    if (current == "F") {
      branch(branch_obj);
    } else if (current == "+") {
      branch_obj.rotation += right_rotation;
    } else if (current == "-") {
      branch_obj.rotation -= left_rotation;
    } else if (current == "[") {
      stack.push(Object.assign({}, branch_obj));
    } else if (current == "]") {
      branch_obj = stack.pop();
    }
  }
}

function begin() {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.lineJoin = "round";

  len = parseFloat(document.getElementById("len").value);
  start_light = parseFloat(document.getElementById("light").value);
  age = parseFloat(document.getElementById("age").value);
  left_rotation = parseFloat(document.getElementById("lr").value / 180 * Math.PI);
  right_rotation = parseFloat(document.getElementById("rr").value / 180 * Math.PI);
  randomness = parseFloat(document.getElementById("randomness").value);

  sentence = axiom;
  generate(age);

  draw_tree(c.width / 2);
}

begin();
