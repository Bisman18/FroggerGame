// Name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global Frog, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random, loadImage
          image, rect, tint,ellipse, stroke, text, mouseX, mouseY, 
          strokeWeight, line,LEFT,  mouseIsPressed, windowWidth, windowHeight, noStroke, keyIsDown, CONTROL
          frameRate,testMode,textAlign,CENTER,createButton, collideRectRect,noTint, rectMode,key, noFill, round, keyCode, loop, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, KeyW,KeyA,KeyS,KeyD, textSize*/

// Collide2D functions:
/* global collideRectCircle */

//p5.soundjs functions:
/* global loadSound , soundFormats */



// Since this example code uses the p5 collide2d library, be sure to remind
// students to load it in. Model how to do this by either connecting a local
// copy (included in the templates), connecting a hosted copy through a CDN, or
// (as a last resort) by pasting it in its entirety in this script as the first
// line.
let beginButton;
let col = [];
let frog1Score = 0;
let frog2Score = 0;
let backgroundColor;
let loadedImages = [];
let numCars = 6;
let cars = [];
let carWidth = 30;
let carHeight = 40;
let frog1;
let frog2;
let carImg1;
let carImg2;
let carImg3;
let frogImg1;
let frogImg2;
let gameOver = false;
let winner;
let drops;
let jumpSound;
let rainSound;
let loopStart = 0
let carsSound
let collisionSound
let honkingSound
let gameoverSound
let scoreSound

class RainDrop {
  constructor(x, y, d, fallSpeed) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.fallSpeed = fallSpeed;
    this.c = color(210,100,100)
    
  }
  
  display() {
    noStroke();
    fill(this.c);
    ellipse(this.x, this.y, this.d);
  }
}

function preload(){
  soundFormats('mp3');
  jumpSound = loadSound('assets/jump_sound.mp3');
  rainSound = loadSound('assets/rain_sound.mp3');
  carsSound = loadSound('assets/cars_sound.mp3');
  collisionSound = loadSound('assets/collision_sound.mp3');
  honkingSound = loadSound('assets/honking_sound.mp3');
  gameoverSound = loadSound('assets/gameover_sound.mp3');
  scoreSound = loadSound('assets/score_sound.mp3');
}
function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 0
  raindrop();
  initiateCars();
  images();
  setColors();
  
  

  frog1 = new Frog(width / 4);
  frog2 = new Frog((3 * width) / 4);
  //beginButton = createButton('Press Play to begin')
  
  
}

function draw() {
  background(backgroundColor);
  roads();
  showraindrop()
  goldBar();
  if(!gameOver){
    displayScore();
    displayCars();
    showFrogs();
    checkCollisions();
    overLayImageCars();
    overLayFrogs();
    score();
    gameIsOver();
  }else{
    gameoverProtocol();
  }
}

function raindrop(){
  rainSound.loop(0, 1, 1, /*loopStart=*/ 3, /*duration=*/ 5);
 drops = []; 
  for (let i = 0; i < 30; i++) {
    drops.push(
      new RainDrop(random(width), random(height), random(5, 15), random(8, 12))
    );
  }

}


function showraindrop(){
  for (let i = 0; i < drops.length; i++) {
    let rainDrop = drops[i];
    
    rainDrop.y += rainDrop.fallSpeed;
    
    if (rainDrop.y > height) {
      rainDrop.y = 0;
      rainDrop.x = random(width);
    }

    rainDrop.display();
  }
}

function gameIsOver(){
  if(frog1.lives <=0 || frog2.lives <= 0){
    gameoverSound.play()
    gameOver = true;
    if(frog1Score > frog2Score){
      winner = "FROG 1";
    }else if(frog1Score < frog2Score){
      winner = "FROG 2";
    }else{
      winner = "no one... it's a TIE!";
    }
  }
}
function images() {
  carImg1 = loadImage(
    "https://cdn.glitch.com/f3e90f8b-29ae-499f-8fea-a0d179be0530%2Fthumbnails%2Funnamed.jpg?1595032224112"
  );
  carImg2 = loadImage(
    "https:www.seekpng.com/png/detail/212-2120003_open-car-emoji-transparent.png"
  );

  frogImg1 = loadImage(
    "https://media.discordapp.net/attachments/730567294102667324/732642826256646144/1f438.png"
  );

  frogImg2 = loadImage(
    "https://i.guim.co.uk/img/media/ae4c5e519f5409b661b62dc41f24f17a1f8bc883/0_91_4928_2957/master/4928.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=14a32e4861863f4d43a8bb9bf7519506"
  );
}
function setColors() {
  for (let i = 0; i < numCars; i++) {
    col.push(random(360));
  }

}
function overLayImageCars() {
  for (let i = 0; i < numCars; i++) {
    tint(col[i], 80, 80);
    image(carImg1, cars[i].x, cars[i].y, cars[i].carW, cars[i].carL);
  }
}

function overLayFrogs() {
  noTint()
  image(frogImg1, frog1.x, frog1.y, frog1.frogSize, frog1.frogSize);
  image(frogImg1, frog2.x, frog2.y, frog2.frogSize, frog2.frogSize);
}


function gameoverProtocol(){
  textAlign(CENTER);
  textSize(80);
  fill(100);
  text("GAME OVER", width/2,height/4);
  textSize(30);
  fill(90,40,80)
  text("CONGRATUALTIONS! \n THE WINNER IS "+winner,width/2, height/2);
  
  text("Frog 1 score: " +frog1Score+ "\n Frog 2 score: "+ frog2Score, width/2, 3*height/4)
  
}

function displayCars() {
  for (let i = 0; i < numCars; i++) {
    // image(carImg1, 0, 0, carWidth, carHeight)
    cars[i].moveCars();
    cars[i].makeCar();
  }
}

function goldBar() {
  fill(40,80,100);
  rect(0, 0, width, 20);
}

function roads(){
  
    
    fill(30);
    rect(0, 70, width, 60);
    
    fill(30);
    rect(0, 270, width, 60);
    
    fill(30);
    rect(0, 370, width, 60);
    
    fill(30);
    rect(0, 170, width, 60);
  
  for (let i = 0; i < 10; i++) {
      fill(100)
      rect(50 + (i *100), 95, 40, 10);
    }
    
    for (let i = 0; i < 10; i++) {
      fill(100)
      rect(50 + (i *100), 295, 40, 10);
    }
    
    
    for (let i = 0; i < 10; i++) {
      fill(100)
      rect(50 + (i *100), 395, 40, 10);
    }
  
  for (let i = 0; i < 10; i++) {
      fill(100)
      rect(50 + (i *100), 195, 40, 10);
    }
    
}
function showFrogs() {
  frog1.displayFrog();
  frog2.displayFrog();
}
function keyPressed() {
  
  jumpSound.play();
  //player2 frog
  if (keyCode === UP_ARROW ) {
    frog2.y -= 10;
  } else if (keyCode === LEFT_ARROW && frog2.x > 0) {
    frog2.x -= 10;
  } else if (keyCode === RIGHT_ARROW && frog2.x+frog2.frogSize < width) {
    frog2.x += 10;
  } else if (keyCode === DOWN_ARROW && frog2.y+frog2.frogSize < height) {
    frog2.y += 10;
  }

  //player 1 frog
  if (key == "w") {
    frog1.y -= 10;
  } else if (key == "a" && frog1.x > 0) {
    frog1.x -= 10;
  } else if (key == "d" && frog1.x+frog1.frogSize < width) {
    frog1.x += 10;
  } else if (key == "s" && frog1.y+frog1.frogSize < height) {
    frog1.y += 10;
  }
}

function initiateCars() {
  for (let i = 0; i < numCars; i++) {
    let x, v;
    let y = height - 120 - 100 * (i % 4);
    if (i < 4) {
      v = random(1, 6);
      x = random(-30, 10);
      cars.push();
    } else {
      x = cars[i % 4].x + random(cars[i % 4].carW, width - cars[i % 4].carW);
      v = cars[i % 4].velocity;
    }
    cars.push(new Car(x, y, v, carWidth, carHeight));
  }
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
  for (let i = 0; i < numCars; i++) {
    let frogSquished = collideRectRect(
      cars[i].x,
      cars[i].y,
      cars[i].carW,
      cars[i].carL,
      frog1.x,
      frog1.y,
      frog1.frogSize,
      frog1.frogSize
    );
    if (frogSquished) {
      honkingSound.play()
      collisionSound.play()
      frog1.lives--;
      frog1.y = height - 40;
    }
  }
  for (let i = 0; i < numCars; i++) {
    let frogSquished = collideRectRect(
      cars[i].x,
      cars[i].y,
      cars[i].carW,
      cars[i].carL,
      frog2.x,
      frog2.y,
      frog2.frogSize,
      frog2.frogSize
    );
    if (frogSquished) {
      honkingSound.play()
      collisionSound.play()
      frog2.lives--;
      frog2.y = height - 40;
    }
  }
}

function score() {
  if (frog1.y <= 20) {
    scoreSound.play()
    frog1.y = height - 40;
    frog1Score++;
  }
  if (frog2.y <= 20) {
    scoreSound.play()
    frog2.y = height - 40;
    frog2Score++;
  }
}
function displayScore(){
  textSize(15);
  fill(100,80,60);
  
   
  textAlign(LEFT)
  text(`FROG 1 SCORE: ${frog1Score}`, 10, 40);
  
  text(`FROG 2 SCORE: ${frog2Score}`,10 , 60);
  
  fill(0)
  text("FROG 1 LIVES: ",10, 15)
  for (let i = 0; i < frog1.lives; i++) {
    ellipse(130 + (15 * i), 10, 10);
  }
  fill(0)
  text("FROG 2 LIVES: ",width/2, 15)
  for (let i = 0; i < frog2.lives; i++) {
    ellipse(width/2 +120 + (15 * i), 10, 10);
  }
}
