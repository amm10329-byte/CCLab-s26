let x1 = 400;
let y1 = 400;
let xSpeed1 = 2;
let ySpeed1 = 2;
let counter = 0;
let accX = 1;
let accY = 1;
let away = 0.1;
let ballColor;

function setup() {
  let canvas = createCanvas(800, 500);
    canvas.parent("p5-canvas-container");
  ballColor = color(0);
}

function draw() {
  background(0);

  let s = width / 30;
  for (let x = s / 2; x < width; x += s) {
    for (let y = s / 2; y < height; y += s) {
      let d    = dist(mouseX, mouseY, x, y);
      let maxD = dist(0, 0, width * 0.8, height * 0.8);
      let off  = map(d, 0, maxD, 20, s);
      let op   = map(d, 0, 75, 255, 0);
      fill(0, 255, 0, op);
      if (noise(y * x) > 0.6) {
        circle(x, y, off);
      } else {
        rectMode(CENTER);
        rect(x, y, off, off);
      }
    }
  }

  x1 += xSpeed1;
  y1 += ySpeed1;

  if (x1 > width  || x1 < 0) xSpeed1 *= -1;
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
    xSpeed1 *= 0.9;
    ySpeed1 *= 0.9;
  }

  drawCreature(x1, y1);
}

function mousePressed() {
  counter++;
  ballColor = (counter % 2 == 0) ? color(0) : color(255, 0, 0);
  xSpeed1 = lerp(xSpeed1, random(-5, 5), 0.01);
  ySpeed1 = lerp(ySpeed1, random(-5, 5), 0.01);
}

function drawCreature(x, y) {
  push();
  translate(x, y);
  rotate(map(sin(frameCount * 0.05), -1, 1, -PI/4, PI/4));

  // spikes
  for (let angle = 0; angle < TWO_PI; angle += TWO_PI / 10) {
    push();
    rotate(angle);
    fill(255, 0, 0);
    noStroke();
    let pulse = sin(frameCount * 0.08) * 5;
    triangle(-5, -5, -5, 5, 35 + pulse, 0);
    pop();
  }

  // body
  fill(0);
  noStroke();
  circle(0, 0, 60);

  // eyes
  fill(255);
  circle(-10, -5, 9);
  circle(10, -5, 9);
  fill(0);
  circle(-12, -4, 3);
  circle(12, -4, 3);

  pop();
}