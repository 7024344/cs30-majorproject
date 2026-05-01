// Project Title
// Fifa Phattharinwararat
// 
// 
// Extra for Experts:
// 

let newBullet = [];
let newPlayer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  newPlayer = new Player(0, 0, 0);
}

function draw() {
  background(220);
  newPlayer.display();
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.w = 50;
    this.h = 100;
  }

  update() {
    this.y += this.speed;
    this.y -= this.speed;
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