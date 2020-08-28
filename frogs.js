// Name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global Frog, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random, loadImage
          rect, ellipse, stroke, text, mouseX, mouseY, 
          strokeWeight, line,  mouseIsPressed, windowWidth, windowHeight, noStroke, keyIsDown, CONTROL
          frameRate, CORNER,rectMode,key, noFill, round, keyCode, loop, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, KeyW,KeyA,KeyS,KeyD, textSize*/

// Collide2D functions:
/* global collideRectCircle */

// Since this example code uses the p5 collide2d library, be sure to remind
// students to load it in. Model how to do this by either connecting a local
// copy (included in the templates), connecting a hosted copy through a CDN, or
// (as a last resort) by pasting it in its entirety in this script as the first
// line.
class Frog {
  constructor(x) {
    this.x = x;
    this.y = height - 40;
    this.lives = 3;
    this.frogSize = 20
  }

  displayFrog() {
    
    fill(140, 40, 100);
    rect(this.x, this.y, this.frogSize,this.frogSize);
  }
}
