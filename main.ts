import * as scoreUtils from "./scoreUtils.ts";

// canvas
const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

// constants
const COLOR_CREAM = "#FFFFF0";
const RADIUS = 1;

// variables
let is_drawing = false;
let prevPos: { x: number; y: number } = { x: 0, y: 0 };

// functions
function initCanvas() {
  canvas.style.border = "5px solid red";
  canvas.style.display = "block";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  //canvas.width = window.innerWidth;
  //canvas.height = window.innerHeight;

  ctx.fillStyle = COLOR_CREAM;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  scoreUtils.initScoreCanvas(ctx, 150, 75, "green", "purple", "Score: 0");
}

function getMousePos(e: MouseEvent) {
  // in canvas
  const rect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
}
function resetPrevPos() {
  prevPos = { x: 0, y: 0 };
  is_drawing = false;
  console.log("down");
}

function paint(x: number, y: number) {
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.strokeStyle = "blue";

  if (prevPos.x === 0 && prevPos.y === 0) {
    ctx.moveTo(x, y);
  } else ctx.moveTo(prevPos.x, prevPos.y);

  ctx.lineTo(x + 1, y + 1);
  ctx.stroke();

  prevPos = { x: x, y: y };
  ctx.closePath();
}

// execute

initCanvas();

// events

canvas.addEventListener("mousedown", (e) => {
  is_drawing = true;
});

canvas.addEventListener("mousemove", (e) => {
  if (!is_drawing) return;
  const pos = getMousePos(e);
  paint(pos.x, pos.y);
});

canvas.addEventListener("mouseup", () => resetPrevPos());

/*
function paint(x: number, y: number) {
  ctx.beginPath();
  ctx.fillStyle = "blue";

  ctx.arc(x, y, RADIUS, 0, 2 * Math.PI);
  ctx.fill();

  ctx.closePath();
}
*/

/*
function drawstuff() {
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.lineWidth = 20;
  ctx.strokeStyle = "blue";

  ctx.moveTo(10, 10);
  ctx.lineTo(500, 500);
  ctx.lineTo(500, 250);
  ctx.lineTo(510, 250);
  ctx.stroke();

  ctx.closePath();
}

drawstuff()
*/
