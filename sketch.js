// main

let Bullets = [];
let enemies = [];

let score = 0;
let hitCooldown = 0;

let ammo = 30;
let maxAmmo = 30;
let fireRate = 0;
let gameTime = 0;

let reloadTimes = 0;
let isReloading = false;

let spawnRate = 60;
let minSpawnRate = 20;

let restartButton;
let pauseButton;
let resumeButton;
let isPaused = false;

let newPlayer;
let reloadSound;
let gunSound;

let zombieGif;
let playerGif;
let playerMove;
let playerFire;

function preload() { 
  reloadSound = loadSound("reloadsound.mp3");
  gunSound = loadSound("gunsound.mp3");
  zombieGif = loadImage("zombie.gif");
  playerGif = loadImage("player.gif");
  playerMove = loadImage("playerMove.gif");
  playerFire = loadImage("playerFire.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gunSound.playMode("restart");
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
  text("Score: " + score, 20, 50);
  text("HP: " + newPlayer.hp, 20, 110);

  if (isReloading) {
    fill(255, 0, 0);
    text("RELOADING...", 20, 80);
  } else {
    fill(0);
    text("Ammo: " + ammo + "/" + maxAmmo, 20, 80);
  }

  newPlayer.display();

  for (let b of Bullets) {
    b.display();
  }
  for (let e of enemies) {
    e.display();
  }

  if (isPaused) {
    fill(0, 180);
    rect(0, 0, width, height);

    fill(255);
    textAlign(CENTER);
    textSize(60);
    text("PAUSED", width / 2, height / 2);
    return;
  }

  if (isReloading) {
    reloadTimes--;
    if (reloadTimes <= 0) {
      ammo = maxAmmo;
      isReloading = false;
      reloadSound.stop();
    }
  }

  gameTime++;

  newPlayer.update();

  if (mouseIsPressed && fireRate <= 0 && ammo > 0 && !isReloading) {
    Bullets.push(new Bullet(newPlayer.x, newPlayer.y, mouseX, mouseY));
    ammo--;
    gunSound.play();
    fireRate = 5;
    newPlayer.fireAnimation = 5;
  }

  if (fireRate > 0) {
    fireRate--;
  }

  if (ammo <= 0 && !isReloading && mouseIsPressed) {
    fill("red");
    textAlign(CENTER);
    textSize(60);
    text("Pressed R!!", width / 2, height / 2);
  }

  for (let i = Bullets.length - 1; i >= 0; i--) {
    Bullets[i].update();

    for (let j = enemies.length - 1; j >= 0; j--) {
      if (Bullets[i] && enemies[j].hits(Bullets[i])) {
        enemies[j].hp -= 25;
        Bullets.splice(i, 1);

        if (enemies[j].hp <= 0) {
          enemies.splice(j, 1);
          score++;
        }
        break;
      }
    }

    if (Bullets[i] && Bullets[i].offscreen()) {
      Bullets.splice(i, 1);
    }
  }

  if (frameCount % floor(spawnRate) === 0) {
    enemies.push(new Enemy(width + 50, random(height)));
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].update(newPlayer.x, newPlayer.y);

    if (enemies[i].hitsPlayer(newPlayer) && hitCooldown <= 0) {
      newPlayer.hp -= 25;
      hitCooldown = 30;

      if (newPlayer.hp <= 0) {
        gameOver();
        return;
      }
    }
  }

  if (hitCooldown > 0) {
    hitCooldown--;
  }
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    if (isPaused) {
      resumeGame();
    } else {
      pauseGame();
    }
    return false;
  }

  if (key === "r" || key === "R") {
    if (ammo < maxAmmo && !isReloading) {
      isReloading = true;
      reloadTimes = 90;
      if (!reloadSound.isPlaying()) {
        reloadSound.rate(1.5);
        reloadSound.play();
      }
    }
  }
}

function pauseGame() {
  isPaused = true;

  pauseButton.hide();
  resumeButton.show();
}

function resumeGame() {
  isPaused = false;

  resumeButton.hide();
  pauseButton.show();
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
  
  restartButton = createButton("Restart");
  restartButton.position(width / 2 - 60, height / 2 + 80);
  restartButton.size(120, 50);
  restartButton.style("font-size", "20px");
  restartButton.style("background", "#ff4444");
  restartButton.style("color", "white");
  restartButton.style("border", "none");
  restartButton.style("cursor", "pointer");
  restartButton.mousePressed(restartGame);
}

function restartGame() {
  reloadSound.stop();
  gunSound.stop();
  score = 0;
  gameTime = 0;
  ammo = maxAmmo;
  Bullets = [];
  enemies = [];
  isReloading = false;
  fireRate = 0;
  reloadTimes = 0;
  spawnRate = 60;
  hitCooldown = 0;
  newPlayer =new Player(width / 8, height / 2);
  for (let i = 0;i < 3;i++) {
    enemies.push(new Enemy(random(width / 2, width - 100), random(100, height - 100)));
  }

  if (restartButton) {
    restartButton.remove();
  }
  
  loop();
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.w = 50;
    this.h = 100;
    this.isMoving = false;
    this.fireAnimation = 0;
    this.hp = 100;
  }

  update() {
    this.isMoving = false;
    if (keyIsDown(68)) {
      this.x += this.speed; // D
      this.isMoving = true;
    }
    if (keyIsDown(65)) {
      this.x -= this.speed; // A
      this.isMoving = true;
    }
    if (keyIsDown(83)) {
      this.y += this.speed; // S
      this.isMoving = true;
    }
    if (keyIsDown(87)) {
      this.y -= this.speed; // W
      this.isMoving = true;
    }

    this.x = constrain(this.x, 0, width/2 - this.w);
    this.y = constrain(this.y, 0, height - this.h);
  }

  display() {
    if (this.fireAnimation > 0) {
      image(playerFire, this.x, this.y, this.w, this.h + 15);
      this.fireAnimation--;
    }
    else if (this.isMoving) {
      image(playerMove,this.x, this.y, this.w, this.h + 30);
    }
    else {
      image(playerGif,this.x, this.y, this.w, this.h + 60);
    }
    fill(80);
    rect(this.x, this.y - 15, this.w, 8);
    fill(0,255,0);
    rect(this.x, this.y - 15, map(this.hp, 0, 100, 0, this.w), 8);
  }
}

class Bullet {
  constructor(x, y, targetX, targetY) {
    this.x = x + 50; 
    this.y = y + 25;

    let angle = atan2(targetY - this.y, targetX - this.x);
    this.dx = cos(angle) * 10;
    this.dy = sin(angle) * 10;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
  }

  display() {
    fill("red");
    ellipse(this.x, this.y, 5);
  }

  offscreen() {
    return this.x < 0 || this.x > width || this.y < 0 || this.y > height;
  }
}

class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 100;
    this.h = 150;
    this.maxHp = 100;
    this.hp = this.maxHp;
    this.speed = 1.5 + gameTime / 2000;
    
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
    image(zombieGif, this.x, this.y, this.w, this.h);
    fill(80);
    rect(this.x,this.y - 15,this.w,8);
    fill(0,255,0);
    rect(this.x,this.y - 15,map(this.hp,0,this.maxHp,0,this.w),8);
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