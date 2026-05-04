// Project Title
// Fifa Phattharinwararat
// 
// 
// Extra for Experts:
// 

let Bullets = [];
let lastShotTime = 0;
let fireRate = 60; 
let newPlayer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  newPlayer = new Player(0, 0, 0);
}

function draw() {
  background(220);
  newPlayer.display();
  newPlayer.update();

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
    if (keyIsDown("68")) { // d
      this.x += this.speed;
    }
    if (keyIsDown("65")) { // a
      this.x -= this.speed;
    }
    if (keyIsDown("83")) { // s
      this.y += this.speed;
    }
    if (keyIsDown("87")) { // w
      this.y -= this.speed;
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
    
    this.size = 8;
  }
  
  update() {

  }
  
  display() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.size);
  }
  
  isOffScreen() {
    return this.x < 0 || this.x > width || this.y < 0 || this.y > height;
  }
}