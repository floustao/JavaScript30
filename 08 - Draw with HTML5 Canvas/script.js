//select the canvas
const canvas = document.querySelector('#draw');

//Canvas 2D API to draw :
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

const ctx = canvas.getContext('2d');

//size canvas window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Specify the color or style to use for the lines around shapes
ctx.strokeStyle = '#BADA55'; // color
ctx.lineJoin = 'round'; // round or bevel or miter
ctx.lineCap = 'round'; // butt or round or square
ctx.lineWidth = 100; // width of the line you are drawing

//drawing set to false, and activate when specific events. That way nothing happens when I move mouse, only when I click down and move mouse.
let isDrawing = false;

//set starting position
let lastX = 0;
let lastY = 0;

// BONUS color : hsl(hue, saturation, lightness)
// google : mother-effing hsl
let hue = 0;
// BONUS width : linewidth modification
let direction = true;

//function to draw
function draw(e) {
  if (!isDrawing) {return}; //stop function from running when they are not moused down
  console.log(e);

  // BONUS color : color
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  //creation d'un chemin :
  ctx.beginPath();

  // start from:
  ctx.moveTo(lastX, lastY);

  // go to:
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke(); //syntax essential in drawing process => begins & ends

  // updating starting point
  [lastX, lastY] = [e.offsetX, e.offsetY];

  // BONUS color : increment color
  hue++;

  // BONUS width : linewidth - to flip the color
  // if (hue >= 360) {
  //   hue=0};
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  // BONUS width : to flip the direction
  if(direction) {
    ctx.lineWidth++; // increment the width
  } else {
  ctx.lineWidth--; // decrement the width
  }
}

//activate drawing when moving mouse
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});


canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false); // stop drawing when mouse is up
canvas.addEventListener('mouseout', () => isDrawing = false); // in case you exit the window, it automatically stops the drawing, even if you come back
