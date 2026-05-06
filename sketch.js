// Project Title
// Fifa Phattharinwararat
// 
// 
// Extra for Experts:
// 

let Bullets = [];
let fireRate;
let newPlayer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  newPlayer = new Player(width/8, height/2);
}

function draw() {
  background(220);
  newPlayer.display();
  newPlayer.update();

  // if (mouseIsPressed && shootDelay <= 0) {
  //   Bullets.push(new Bullet(newPlayer.x, newPlayer.y, mouseX, mouseY));
  //   fireRate = 10;
  // }

  fireRate--;
  
  for (let i = Bullets.length - 1; i >= 0; i--) {
    Bullets[i].update();
    Bullets[i].display();
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
  constructor(x, y, targetX, targetY) {
    this.x = x + 15;
    this.y = y + 15;

    // let angle = atan2(targetY - y, targetX - x);
    // this.dx = cos(angle) * 5;
    // this.dy = sin(angle) * 5;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
  }

  display() {
    fill("black");
    ellipse(this.x, this.y, 10);
  }

  offscreen() {
    return this.x < 0 || this.x > width || this.y < 0 || this.y > height;
  }
}