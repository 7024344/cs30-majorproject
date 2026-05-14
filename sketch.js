// Project Title
// Fifa Phattharinwararat
// 
// 
// Extra for Experts:
// 

let Bullets = [];
let enemies = [];
let ammo = 30;
let maxAmmo = 30;
let fireRate = 0;
let reloadTimes = 0;
let reloading = false;
let newPlayer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  newPlayer = new Player(width / 8, height / 2);
}

function draw() {
  background(220);

  fill(0);
  textSize(24);
  textAlign(LEFT);
  if (reloading) {
    fill(255, 0, 0);
    text("RELOADING...", 20, 70);
  } 
  else {
    fill(0);
    text("Ammo: " + ammo + "/" + maxAmmo, 20, 70);
  }

  newPlayer.display();
  newPlayer.update();
  
  if (mouseIsPressed && fireRate <= 0 && ammo > 0 && !reloading) {
    Bullets.push(new Bullet(newPlayer.x, newPlayer.y, mouseX, mouseY));
    ammo--;
    fireRate = 3;
  }
  if (fireRate > 0) {
    fireRate--;
  }
  if (ammo <= 0 && !reloading) {
    reloading = true;
    reloadTimes = 60;
  }
  if (reloading) {
    reloadTimes--;
    if (reloading) {
      ammo = maxAmmo;
      reloading = false;
    }
  }

  for (let i = Bullets.length - 1; i >= 0; i--) {
    Bullets[i].update();
    Bullets[i].display();
    
    if (Bullets[i] && Bullets[i].offscreen()) {
      Bullets.splice(i, 1);
    }
  }
}

function keyPressed() {
  if (key === "r") {
    if (ammo < maxAmmo && !reloading) {
      ammo = 0;
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