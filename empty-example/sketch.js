let shapes = [];

function setup() {
  frameRate(30);
  createCanvas(800, 800);
  noStroke();
  rectMode(CENTER);

  // Create 7 shapes with random properties
  for (let i = 0; i < 1500; i++) {
    let x = random(width);
    let y = random(height);
    let sides = int(random(5, 9));
    let shapeSize = random(0, 25);
    let r = random(255);
    let g = random(255);
    let b = random(255);
    shapes.push(new Shape(x, y, sides, shapeSize, r, g, b));
  }
}

function draw() {
  if (frameCount === 1){
    capturer.start();
  }

  blendMode(BLEND);
  background(255);

  // Update and display the shapes
  for (let shape of shapes) {
    blendMode(DIFFERENCE);
    shape.update();
    shape.display();
  }

  if (frameCount < 962) {
    capturer.capture(canvas);
  } else if (frameCount === 962) {
    capturer.save();
    capturer.stop();
  }
}

// Polygonal shape class
class Shape {
  constructor(x, y, sides, shapeSize, r, g, b) {
    this.x = x;
    this.y = y;
    this.sides = sides;
    this.shapeSize = shapeSize;
    this.r = r;
    this.g = g;
    this.b = b;
    this.angle = random(TWO_PI);
    this.angularVelocity = random(-0.1, 0.1);
  }

  // Update the shape's position and angle
  update() {
    this.x += cos(this.angle) * 0.5;
    this.y += sin(this.angle) * 0.5;
    this.angle += this.angularVelocity;

    // Wrap the shape around the edges of the canvas
    if (this.x < -this.shapeSize) this.x += width + this.shapeSize * 2;
    if (this.x > width + this.shapeSize) this.x -= width + this.shapeSize * 2;
    if (this.y < -this.shapeSize) this.y += height + this.shapeSize * 2;
    if (this.y > height + this.shapeSize) this.y -= height + this.shapeSize * 2;
  }

  // Display the shape
  display() {
    fill(this.r, this.g, this.b);
    push();
    translate(this.x, this.y);
    // rotate(this.angle);
    beginShape();
    for (let i = 0; i < this.sides; i++) {
      let angle = TWO_PI * i / this.sides;
      let x = cos(angle) * this.shapeSize;
      let y = sin(angle) * this.shapeSize;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}
