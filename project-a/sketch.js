/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let x1 = 400;
let y1 = 400;
let xSpeed1 = 2;
let ySpeed1 = 2;
let counter = 0;
let accX = 1;
let accY = 1;
let away = 0.1;
let ballColor;
let foodX = 0;
let foodY = 0;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.id("p5-canvas");
 canvas.parent("p5-canvas-container");
  ballColor = color(0);
}

function draw() {
  background(20, 40, 10);
  let s = width / 20;
  for (let x = s / 2; x < width; x += s) {
    for (let y = s / 2; y < height; y += s) {
      let d = dist(mouseX, mouseY, x, y);
      let grassHeight = map(d, 0, 300, 50, 10);
      let sway = sin(frameCount * 0.05 + x * 0.02) * 3;
      let greenShade = map(d, 0, 200, 200, 50);
      fill(greenShade, 200, 80);
      noStroke();
      ellipse(x + sway, y, 5, grassHeight);
    }
  }

  if (mouseIsPressed && counter % 2 == 1) {
    foodX = mouseX;
    foodY = mouseY;
    drawFood(foodX, foodY);
  }
  if (mouseIsPressed && counter % 2 == 0) {
    drawFoot(mouseX, mouseY);
  }

  x1 += xSpeed1;
  y1 += ySpeed1;
  if (x1 > width || x1 < 0) xSpeed1 *= -1;
  if (y1 > height || y1 < 0) ySpeed1 *= -1;

  if (mouseIsPressed && counter % 2 == 1) {
    x1 = lerp(x1, random(width), 0.1);
    y1 = lerp(y1, random(height), 0.1);
  }
  if (mouseIsPressed && counter % 2 == 0) {
    let d = dist(mouseX, mouseY, x1, y1);
    if (d < 40) {
      accX = (mouseX - x1) * -away;
      accY = (mouseY - y1) * -away;
      xSpeed1 += accX;
      ySpeed1 += accY;
    }
    xSpeed1 *= 0.94;
    ySpeed1 *= 0.94;
  }
  drawCreature(x1, y1);
}

function drawFood(x, y) {
  push();
  translate(x, y);
  let pulse = sin(frameCount * 0.15) * 3;
  noStroke();
  fill(255, 200, 0, 60);
  circle(0, 0, 30 + pulse * 2);
  fill(255, 220, 50);
  circle(0, 0, 16 + pulse);
  fill(255, 255, 200, 200);
  circle(-3, -3, 5);
  pop();
}

function mousePressed() {
  counter++;
  xSpeed1 = lerp(xSpeed1, random(-2, 2), 0.01);
  ySpeed1 = lerp(ySpeed1, random(-2, 2), 0.01);
}

function drawFoot(x, y) {
  push();
  translate(x, y);
  fill(255, 255, 255);
  rect(-22, -60, 44, 75, 5);
  ellipse(10, 10, 70, 35);
  rect(-22, -5, 55, 25, 4);
  pop();
}

function drawCreature(x, y) {
  push();
  translate(x, y);
  rotate(map(sin(frameCount * 0.05), -1, 1, -PI / 4, PI / 4));
  for (let angle = 0; angle < TWO_PI; angle += TWO_PI / 10) {
    push();
    rotate(angle);
    fill(255, 0, 0);
    noStroke();
    let pulse = sin(frameCount * 0.08) * 5;
    triangle(-5, -5, -5, 5, 35 + pulse, 0);
    pop();
  }
  fill(20, 40, 10);
  noStroke();
  circle(0, 0, 60);
  fill(255);
  circle(-10, -5, 9);
  circle(10, -5, 9);
  fill(0);
  circle(-12, -4, 3);
  circle(12, -4, 3);
  pop();
}


