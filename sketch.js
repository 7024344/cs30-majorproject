// Project Title
// Fifa Phattharinwararat
// 
// 
// Extra for Experts:
// 



function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

class player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.w = 50;
    this.h = 100;
  }

  update() {  
    if (keyIsDown(65)) { // a
      x -= speed;
    }
    if (keyIsDown(68)) { // d
      x += speed;
    }
  }

  display () {
    rect(this.x, this.y, this.w, this.h); 
  }
}

class Bullet {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
  }

  display() {

  }
}