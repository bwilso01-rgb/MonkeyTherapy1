let s = function(p) {}
new p5(s);

// Mouse to draw!
let img;

function preload() {
  // Load the image
  img = loadImage("https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Meme_Man_on_transparent_background.webp/316px-Meme_Man_on_transparent_background.webp.png");
}


function setup() {
  createCanvas(1000,1000);

  // Set the background black
  background(0);
  
  // Image mode center will center the image on the mouse, comment out to see the difference
  imageMode(CENTER);
}

function draw() {

  // Draw an image at your mouse position
  image(img, mouseX, mouseY, 100,100);

}

function mousePressed() {
  background(random(255),random(255),random(255));
  shapeColor =color(random(255),random(255),random(255));
   ellipse(mouseX, mouseY, 80,);
}
