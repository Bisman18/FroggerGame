// Name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global Frog, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random, loadImage
          rect, ellipse, stroke, text, mouseX, mouseY, 
          strokeWeight, line,  mouseIsPressed, windowWidth, windowHeight, noStroke, keyIsDown, CONTROL
          frameRate, rectMode,CORNER,key, noFill, round, keyCode, loop, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, KeyW,KeyA,KeyS,KeyD, textSize*/

// Collide2D functions:
/* global collideRectCircle */

// Since this example code uses the p5 collide2d library, be sure to remind
// students to load it in. Model how to do this by either connecting a local
// copy (included in the templates), connecting a hosted copy through a CDN, or
// (as a last resort) by pasting it in its entirety in this script as the first
// line.

class Car {
  constructor(x, y, velocity, carW, carL) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.carW = carW;
    this.carL = carL;
    this.col = random(0, 360);
  }

  moveCars() {
    this.x += this.velocity;
    if (this.x > width) {
      this.x = 0;
    }
  }

  makeCar() {
    rectMode(CORNER);
    fill(this.col, 40, 100);
    noStroke();
    rect(this.x, this.y, this.carW, this.carL);
  }
  changeVelocity(){
    this.velocity += 1
  }
}