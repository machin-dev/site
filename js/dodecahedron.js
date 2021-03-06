const CANVAS_SIZE = 640;
const PERSPECTIVE = CANVAS_SIZE * 1;
const PROJECTION_CENTER = CANVAS_SIZE / 2;
const ROTATION_STEP = 0.01;

var dots;

class Dot {
  constructor(x, y, z, c) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.color = color(c);
    this.radius = 8;
    this.x_projected = 0;
    this.y_projected = 0;
    this.scale_projected = 0;
  }

  scale(n) {
    this.x *= n;
    this.y *= n;
    this.z *= n;
  }
  
  project() {
    this.scale_projected = PERSPECTIVE / (PERSPECTIVE + this.z);
    this.x_projected = (this.x * this.scale_projected) + PROJECTION_CENTER;
    this.y_projected = (this.y * this.scale_projected) + PROJECTION_CENTER;
  }

  rotateX(angle) {
    var old_y = this.y;
    var old_z = this.z;
    this.y = (old_y * cos(angle)) - (old_z * sin(angle));
    this.z = (old_y * sin(angle)) + (old_z * cos(angle));
  }

  
  rotateY(angle) {
    var old_x = this.x;
    var old_z = this.z;
    this.x = (old_x * cos(angle)) - (old_z * sin(angle));
    this.z = (old_x * sin(angle)) + (old_z * cos(angle));
  }

  draw() {
    this.project();
    var alpha = map(Math.abs(1 - this.z / CANVAS_SIZE), 0, 1, 0, 255, true);
    stroke(this.color, alpha);
    strokeWeight(this.radius * this.scale_projected);
    point(this.x_projected, this.y_projected);
  }
}

function setup() {
  // Set canvas
	canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  canvas.parent('sketch');
  frameRate(30);
  // Create dots
  dots = new Array;
  // Phi
  phi = (1 + Math.sqrt(5)) / 2;
  // Orange
  dots.push(new Dot( 1,  1,  1, "#FFA500"));
  dots.push(new Dot( 1,  1, -1, "#FFA500"));
  dots.push(new Dot( 1, -1,  1, "#FFA500"));
  dots.push(new Dot( 1, -1, -1, "#FFA500"));
  dots.push(new Dot(-1,  1,  1, "#FFA500"));
  dots.push(new Dot(-1,  1, -1, "#FFA500"));
  dots.push(new Dot(-1, -1,  1, "#FFA500"));
  dots.push(new Dot(-1, -1, -1, "#FFA500"));
  // Green
  dots.push(new Dot(0,  phi,  1 / phi, "#00FF00"));
  dots.push(new Dot(0,  phi, -1 / phi, "#00FF00"));
  dots.push(new Dot(0, -phi,  1 / phi, "#00FF00"));
  dots.push(new Dot(0, -phi, -1 / phi, "#00FF00"));
  // Blue
  dots.push(new Dot( 1 / phi, 0,  phi, "#0000FF"));
  dots.push(new Dot( 1 / phi, 0, -phi, "#0000FF"));
  dots.push(new Dot(-1 / phi, 0,  phi, "#0000FF"));
  dots.push(new Dot(-1 / phi, 0, -phi, "#0000FF"));
  // Pink
  dots.push(new Dot( phi,  1 / phi, 0, "#FF69B4"));
  dots.push(new Dot( phi, -1 / phi, 0, "#FF69B4"));
  dots.push(new Dot(-phi,  1 / phi, 0, "#FF69B4"));
  dots.push(new Dot(-phi, -1 / phi, 0, "#FF69B4"));
  // Scale
  for (let i = 0; i < dots.length; i++) {
    dots[i].scale(80);
  }
}

function draw() {
    background("#0C0D10");
    // Draw dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].rotateX(ROTATION_STEP);
        dots[i].rotateY(ROTATION_STEP * 2);
        dots[i].draw();
    }
}