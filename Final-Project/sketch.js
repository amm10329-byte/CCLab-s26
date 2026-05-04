let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let l;
let noteFiles = [];
let pulses = [];
let frog;
let wrongSound;
let melody = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
let melodyIndex = 0;
let score = 0;

function preload() {
  noteFiles[0]  = loadSound("sounds/579217__hugekc__note1.mp3");
  noteFiles[1]  = loadSound("sounds/579218__hugekc__note2.mp3");
  noteFiles[2]  = loadSound("sounds/579219__hugekc__note3.mp3");
  noteFiles[3]  = loadSound("sounds/579226__hugekc__note4.mp3");
  noteFiles[4]  = loadSound("sounds/579220__hugekc__note5.mp3");
  noteFiles[5]  = loadSound("sounds/579221__hugekc__note6.mp3");
  noteFiles[6]  = loadSound("sounds/579227__hugekc__note7.mp3");
  noteFiles[7]  = loadSound("sounds/579222__hugekc__note8.mp3");
  noteFiles[8]  = loadSound("sounds/579228__hugekc__note9.mp3");
  noteFiles[9]  = loadSound("sounds/579223__hugekc__note10.mp3");
  noteFiles[10] = loadSound("sounds/579225__hugekc__note11.mp3");
  noteFiles[11] = loadSound("sounds/579224__hugekc__note12.mp3");
  wrongSound    = loadSound("sounds/467289__xfixy8__dissonant-piano-stinger.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  l = new Letter();
  frog = new Frog();
}

function draw() {
  background(20, 60, 75);
  l.display();
  fill(220, 255, 225);
  noStroke();
  textSize(24);
  textStyle(BOLD);
  textFont('Georgia');
  text("Score: " + score, 60, 30);  // ← add this
  for (let i = pulses.length - 1; i >= 0; i--) {
    pulses[i].move();
    pulses[i].display();
    if (pulses[i].isDone) pulses.splice(i, 1);
  }
  frog.update();
  frog.display();
}

function keyPressed() {
  l.checkLetter();
}

class Letter {
  constructor() {
    this.SIZE = 80;
    this.letter = letters[int(random(26))];
    this.x = random(this.SIZE, width - this.SIZE);
    this.y = random(this.SIZE, height - this.SIZE);
    this.note = noteFiles[melody[melodyIndex % melody.length]];
    melodyIndex++;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(sin(frameCount * 0.2) * 0.1);
    let rx = this.SIZE * 0.52;
    let ry = this.SIZE * 0.38;
    let notchAngle = radians(20);
    let startA = -HALF_PI + notchAngle;
    let endA   = -HALF_PI - notchAngle + TWO_PI;
    fill(34, 110, 55);
    noStroke();
    beginShape();
    for (let a = startA; a <= endA; a += 0.05) {
      vertex(cos(a) * rx, sin(a) * ry);
    }
    vertex(0, 0);
    endShape(CLOSE);
    noStroke();
    fill(220, 255, 225);
    textSize(32);
    textStyle(BOLD);
    textFont('Georgia');
    text(this.letter, 0, 2);
    pop();
  }

  checkLetter() {
    if (key == this.letter || key == this.letter.toLowerCase()) {
      score++;
      this.note.play();
      pulses.push(new Pulse(this.x, this.y));
      frog.jumpTo(this.x, this.y);
      this.randomLetter();
    } else {
      background(120, 30, 30);
      wrongSound.play();
      score = 0
    }
  }

  randomLetter() {
    this.letter = letters[int(random(26))];
    this.x = random(this.SIZE, width - this.SIZE);
    this.y = random(this.SIZE, height - this.SIZE);
    this.note = noteFiles[melody[melodyIndex % melody.length]];
    melodyIndex++;
  }
}

class Frog {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.startX = this.x;
    this.startY = this.y;
    this.targetX = this.x;
    this.targetY = this.y;
    this.isJumping = false;
    this.jumpProgress = 0;
    this.size = 32;
  }

  jumpTo(tx, ty) {
    this.startX = this.x;
    this.startY = this.y;
    this.targetX = tx;
    this.targetY = ty;
    this.isJumping = true;
    this.jumpProgress = 0;
  }

  update() {
    if (this.isJumping) {
      this.jumpProgress = min(this.jumpProgress + 0.045, 1);
      this.x = lerp(this.startX, this.targetX, this.jumpProgress);
      this.y = lerp(this.startY, this.targetY, this.jumpProgress);
      if (this.jumpProgress >= 1) {
        this.isJumping = false;
      }
    }
  }

  display() {
    let squish;
if (this.isJumping) {
  squish = sin(this.jumpProgress * PI);
} else {
  squish = 0;
}
let scaleX = 1 + squish * 0.25;
let scaleY = 1 - squish * 0.18;

let arcOff;
if (this.isJumping) {
  arcOff = -sin(this.jumpProgress * PI) * 40;
} else {
  arcOff = 0;
}

    push();
    translate(this.x, this.y + arcOff);
    scale(scaleX, scaleY);

    noStroke();
    fill(0, 0, 0, 40);
    ellipse(0, this.size * 0.45 - arcOff * 0.3, this.size * 1.1, this.size * 0.3);

    fill(60, 160, 70);
    ellipse(0, 0, this.size, this.size * 0.8);

    fill(240, 240, 60);
    ellipse(-this.size * 0.22, -this.size * 0.28, this.size * 0.28, this.size * 0.28);
    ellipse( this.size * 0.22, -this.size * 0.28, this.size * 0.28, this.size * 0.28);
    fill(20);
    ellipse(-this.size * 0.22, -this.size * 0.28, this.size * 0.12, this.size * 0.12);
    ellipse( this.size * 0.22, -this.size * 0.28, this.size * 0.12, this.size * 0.12);

    noFill();
    stroke(30, 100, 40);
    strokeWeight(1.5);
    arc(0, this.size * 0.05, this.size * 0.4, this.size * 0.2, 0, PI);

    pop();
  }
}

class Pulse {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dia = 0;
    this.spd = 4;
    this.isDone = false;
  }

  move() {
    this.dia += this.spd;
    this.spd *= 0.985;
  }

  display() {
    noFill();
    let op = map(this.dia, 0, 400, 200, 0);
    stroke(100, 210, 200, op);
    strokeWeight(map(this.dia, 0, 400, 2.5, 0.5));
    ellipse(this.x, this.y, this.dia, this.dia * 0.55);
    if (op <= 0) this.isDone = true;
  }
}
