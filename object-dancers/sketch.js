/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  dancer = new Hubert(width / 2, height / 2);

}

function draw() {
  background(0);
  drawFloor();
  
  dancer.update();
  dancer.display();
  
}

class Hubert {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.x1 = startX;
    this.y1 = startY;
    this.t = 0;
    this.c = color(230, 185, 140)
    this.h = 0
  }

  update() {
    this.t += 0.1;
    this.x = this.x1 + sin(this.t * 1) * 50;
    this.y = this.y1 + sin(this.t * 2) * 20;
    if (mouseIsPressed){
    this.c = color(random(255),random(255),random(255))
    this.h = map(sin(this.t * 1.0), -1, 1, 0, 360);
    }else{
    this.c = color(28, 39, 90)
    }
  }

  display() {
    push();
    colorMode(HSB);
    translate(this.x, this.y);
    noStroke();
    
    // Legs
    let lKick = sin(this.t * 2) * 30;
    let rKick = sin(this.t * 2 + PI) * 30;


    stroke(210, 160, 110);
    strokeWeight(6);
    line(-18, 40, -18, 38 + lKick);  // left leg
    line( 18, 40,  18, 38 + rKick);  // right leg


    noStroke();
    fill(210, 160, 110);
    ellipse(-18, 38 + lKick, 22, 14);
    ellipse( 18, 38 + rKick, 22, 14);

    // Body 
    fill(this.h, 100, 100);
    circle(0, 0, 110);
    fill(245, 220, 190);
    ellipse(0, 10, 58, 52);

    // Ears
    fill(this.h, 100, 100);
    circle(-32, -46, 26);
    circle( 32, -46, 26);
    fill(240, 165, 165);
    circle(-32, -46, 14);
    circle( 32, -46, 14);

    // Eyes
    let pupilX = map(mouseX, 0, width,  -3, 3);
    let pupilY = map(mouseY, 0, height, -3, 3);

    fill(255);
    circle(-18, -10, 10);
    circle( 18, -10, 10);
    fill(0);
    circle(-18 + pupilX, -10 + pupilY, 6);
    circle( 18 + pupilX, -10 + pupilY, 6);
  
    // Nose
    fill(210, 100, 100);
    ellipse(0, 2, 9, 7);

    pop();
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/