// Project Title
// Fifa Phattharinwararat
// 
// 
// Extra for Experts:
// 

let Bullets = [];
let enemies = [];
let fireRate = 0;
let newPlayer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  newPlayer = new Player(width / 8, height / 2);
  enemies = new Enemie(width / 1.2, height / 2);
}

function draw() {
  background(220);
  newPlayer.display();
  newPlayer.update();
  enemies.display();
  
  if (mouseIsPressed && fireRate <= 0) {
    Bullets.push(new Bullet(newPlayer.x, newPlayer.y, mouseX, mouseY));
    fireRate = 3;
  }
  if (fireRate > 0) {
    fireRate--;
  }

  for (let i = Bullets.length - 1; i >= 0; i--) {
    Bullets[i].update();
    Bullets[i].display();

    // fix
    if (Bullets[i] && Bullets[i].offscreen()) {
      Bullets.splice(i, 1);
    }
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
    if (keyIsDown(68)) {
      this.x += this.speed; // D
    }
    if (keyIsDown(65)) {
      this.x -= this.speed; // A
    }
    if (keyIsDown(83)) {
      this.y += this.speed; // S
    }
    if (keyIsDown(87)) {
      this.y -= this.speed; // W
    }
  }

  display() {
    fill(255);
    rect(this.x, this.y, this.w, this.h); 
  }
}

class Bullet {
  constructor(x, y, targetX, targetY) {
    this.x = x + 25; 
    this.y = y + 50;

    let angle = atan2(targetY - this.y, targetX - this.x);
    this.dx = cos(angle) * 10;
    this.dy = sin(angle) * 10;
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

// ...
class Enemie {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 100;
  }

  update() {

  }

  display() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h); 
  }
}