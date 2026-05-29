// Project Title
// Fifa Phattharinwararat
// 
// 
// Extra for Experts:
// 

let Bullets = [];
let enemies = [];
let score = 0;
let ammo = 30;
let maxAmmo = 30;
let fireRate = 0;
let reloadTimes = 0;
let spawnRate = 90;
let minSpawnRate = 20;
let isReloading = false;
let newPlayer;
let reloadSound;

function preload() { 
  reloadSound = loadSound("reloadsound.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  newPlayer = new Player(width / 8, height / 2);

  for (let i = 0; i < 3; i++) {
    enemies.push(new Enemy(random(width / 2, width - 100), random(100, height - 100)));
  }
}

function draw() {
  background(220);

  fill(0);
  textSize(24);
  textAlign(LEFT);
  text("Score: " + score, 20 ,50);
  if (isReloading) {
    fill(255, 0, 0);
    text("RELOADING...", 20, 80);
    reloadSound.rate(1.5);
    reloadSound.play();
  } 
  else {
    fill(0);
    text("Ammo: " + ammo + "/" + maxAmmo, 20, 80);
    reloadSound.stop();
  }

  newPlayer.display();
  newPlayer.update();
  
  if (mouseIsPressed && fireRate <= 0 && ammo > 0 && !isReloading) {
    Bullets.push(new Bullet(newPlayer.x, newPlayer.y, mouseX, mouseY));
    ammo--;
    fireRate = 3;
  }

  if (fireRate > 0) {
    fireRate--;
  }

  if (ammo <= 0 && !isReloading) {
    isReloading = true;
    reloadTimes = 90;
  }

  if (isReloading) {
    reloadTimes--;
    if (reloadTimes <= 0) {
      ammo = maxAmmo;
      isReloading = false;
    }
  }

  for (let i = Bullets.length - 1; i >= 0; i--) {
    Bullets[i].update();
    Bullets[i].display();
    
    for (let j = enemies.length - 1; j >= 0; j--) {
      if (Bullets[i] && enemies[j].hits(Bullets[i])) {
        enemies.splice(j, 1);
        Bullets.splice(i, 1);
        score++;
        break;
      }
    }

    if (Bullets[i] && Bullets[i].offscreen()) {
      Bullets.splice(i, 1);
    }
  }

  if (frameCount % floor(spawnRate) === 0) {
    let spawnX = width + 50; 
    let spawnY = random(0, height - 100);
    
    enemies.push(new Enemy(spawnX, spawnY));
  }
  if (frameCount % 300 === 0) {
    if (spawnRate > minSpawnRate) {
      spawnRate -= 10;
    }
  }
  for (let enemy of enemies) {
    enemy.update(newPlayer.x, newPlayer.y);
    enemy.display();
  }
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].update(newPlayer.x, newPlayer.y);
    enemies[i].display();

    if (enemies[i].hitsPlayer(newPlayer)) {
      gameOver();
    }
  }
}

function keyPressed() {
  if (key === "r" || key === "R") {
    if (ammo < maxAmmo && !isReloading) {
      isReloading = true;
      reloadTimes = 60;
    }
  }
}

function gameOver() {
  noLoop();
  background(0, 150);
  fill(255);
  textAlign(CENTER);
  textSize(60);
  text("GAME OVER", width / 2, height / 2);
  textSize(30);
  text("Final Score: " + score, width / 2, height / 2 + 50);
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

    this.x = constrain(this.x, 0, width/2 - this.w);
    this.y = constrain(this.y, 0, height - this.h);
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

class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 100;
    this.speed = 1.5 + frameCount / 2000;
    
    if (this.speed > 5) {
      this.speed = 5;
    }
  }

  update(playerX, playerY) {
    let angle = atan2(playerY - this.y, playerX - this.x);
    this.x += cos(angle) * this.speed;
    this.y += sin(angle) * this.speed;
  }

  display() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h); 
  }

  hits(bullet) {
    return  bullet.x > this.x && bullet.x < this.x + this.w && 
            bullet.y > this.y && bullet.y < this.y + this.h;
  }
  hitsPlayer(player) {
    return  player.x < this.x + this.w && player.x + player.w > this.x &&
            player.y < this.y + this.h && player.y + player.h > this.y;
  }
}