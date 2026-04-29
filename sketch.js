// Project Title
// Fifa Phattharinwararat
// 
// 
// Extra for Experts:
// 

let bullets = [];
let x;
let y;
let speed;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = 100;
  y = height/2;
  speed = 5;
}

function draw() {
  background(220);
  movePlayer();
  player();
}

function movePlayer() {
  if (keyIsDown(65)) { // a
    x -= speed;
  }
  if (keyIsDown(68)) { //d
    x += speed;
  }
}

function player() {
  rect(x, y, 50, 100);
}

class Bullet {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    
  }
}