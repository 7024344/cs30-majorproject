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
  newPlayer = new Player(width/8, height/2);
}

function draw() {
  background(220);
  newPlayer.display();
  newPlayer.update();
  
  for (let i = Bullets.length - 1; i >= 0; i--) {
    Bullets[i].move();
    Bullets[i].display();
  }

  if (mouseIsPressed === true) {
    let b = new Bullet(mouseX, mouseY);
    Bullets,push(b);
  }
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
    fill(255, 255, 255);
    rect(this.x, this.y, this.w, this.h); 
  }
}

class Bullet {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.size = 8;
    this.speed = 5;
    this.dx = dx - x;
    this.dy = dy - y;
  }
  
  update() {
    this.y -= this.speed;
  }
  
  display() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.size);
  }
  
  isOffScreen() {
    if (Bullets[i].y < 0) {
      Bullets.splice(i, 1);
    }
  }
}