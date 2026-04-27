// Project Title
// Fifa Phattharinwararat
// 
// 
// Extra for Experts:
// 

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

function bullet() {
  noStroke();
  fill("red");
  rect(x + 100, y + 30, 15, 3);
}