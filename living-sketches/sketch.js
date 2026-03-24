let scanned = [];
let eyes;
let rockets;
let doodles1;
let doodles2;
let curEye = 0;
let curRocket = 0;
let rocketX = 400;
let rocketY = 250;
let curDoodle1 = 0;
let curDoodle2 = 0;

function preload() {
  for (let i = 1; i <= 3; i++) {
    scanned.push(loadImage("20260320102531665_000" + i + ".jpg"));
  }
}

function setup() {
  createCanvas(800, 500);
  eraseBg(scanned, 10);
  rockets = crop(scanned, 1600, 8, 700, 480);
  doodles1 = crop(scanned, 1514, 1300, 760, 400);
}

function draw() {
  background(255);

  // --- ROCKET: smoothly follow the mouse ---
  rocketX = lerp(rocketX, mouseX, 0.05);
  rocketY = lerp(rocketY, mouseY, 0.05);

  // angle the rocket to point toward the mouse
  let angle = atan2(mouseY - rocketY, mouseX - rocketX);

  push();
  translate(rocketX, rocketY);
  rotate(angle);
  imageMode(CENTER);
  image(
    rockets[curRocket],
    0,
    0,
    rockets[0].width * 0.25,
    rockets[0].height * 0.25
  );
  pop();

  curRocket = floor((frameCount / 10) % 3);

  // --- DOODLES1: pulse in size using sin() ---
  let pulse = map(sin(frameCount / 20), -1, 1, 0.35, 0.65);

  image(
    doodles1[curDoodle1],
    0,
    0,
    doodles1[0].width * pulse,
    doodles1[0].height * pulse
  );

  curDoodle1 = floor(map(sin(frameCount / 10), -1, 1, 0, doodles1.length));
}

// Helper functions (unchanged)
function crop(imgs, x, y, w, h) {
  let cropped = [];
  for (let i = 0; i < imgs.length; i++) {
    cropped.push(imgs[i].get(x, y, w, h));
  }
  return cropped;
}

function eraseBg(imgs, threshold = 10) {
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    img.loadPixels();
    for (let j = 0; j < img.pixels.length; j += 4) {
      let d = 255 - img.pixels[j];
      d += 255 - img.pixels[j + 1];
      d += 255 - img.pixels[j + 2];
      if (d < threshold) {
        img.pixels[j + 3] = 0;
      }
    }
    img.updatePixels();
  }
}