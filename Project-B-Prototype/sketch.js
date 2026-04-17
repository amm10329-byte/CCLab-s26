let letter, x, y;
const SIZE = 80;
let ColorV;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  ColorV = color(0);
  randomLetter();
}

function randomLetter() {
  let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  letter = letters[int(random(26))];
  x = random(SIZE, width - SIZE);
  y = random(SIZE, height - SIZE);
}

function draw() {
  background(ColorV);
  fill(0, 0, 0);
  noStroke();
  rect(x - SIZE/2, y - SIZE/2, SIZE, SIZE, 10);
  fill(255, 255, 255);
  textSize(42);
  textStyle(BOLD);
  text(letter, x, y);
}

function keyPressed() {
  if (key === letter) {
    ColorV = color(0, 200, 0);
    randomLetter();
  } else {
    ColorV = color(200, 0, 0);
  }
}