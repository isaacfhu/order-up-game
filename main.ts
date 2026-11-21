import * as scoreUtils from "./scoreUtils.ts";

// canvas
const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

// constants
const COLOR_CREAM_RGB = "255, 255, 240";
const FADE_MS = 3000;
const TRAIL_RGB = "0, 26, 255";

const trailSet = new Set<TrailPoint>();

// classes
class TrailPoint {
  constructor(
    public x: number,
    public y: number,
    public prevX: number,
    public prevY: number,
    public creationTime: number = Date.now(),
  ) {}
}

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

  ctx.fillStyle = `rgb(${COLOR_CREAM_RGB})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  scoreUtils.initScoreCanvas(
    ctx,
    150,
    75,
    "rgb(155, 250, 155)",
    "purple",
    "Score: 0",
    "HighScore: 0",
  );
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

function clearCanvas() {
  ctx.fillStyle = `rgb(${COLOR_CREAM_RGB})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSegment(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  opacity: number,
) {
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = `rgba(${TRAIL_RGB}, ${opacity})`;
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX + 1, toY + 1);
  ctx.stroke();
}

function paint(x: number, y: number) {
  const from = prevPos.x === 0 && prevPos.y === 0 ? { x, y } : prevPos;

  drawSegment(from.x, from.y, x, y, 1);

  const point: TrailPoint = new TrailPoint(x, y, from.x, from.y);
  trailSet.add(point);
  prevPos = { x, y };
}

function updateTrailFade() {
  const currentTime = Date.now();

  clearCanvas();

  trailSet.forEach((trail) => {
    const ms = currentTime - trail.creationTime;

    if (ms >= FADE_MS) {
      trailSet.delete(trail);
      return;
    }

    const alpha = 1 - ms / FADE_MS;
    console.log("alpha: " + alpha);
    drawSegment(trail.prevX, trail.prevY, trail.x, trail.y, alpha);
  });
}

// execute

initCanvas();

setInterval(() => {
  updateTrailFade();
  scoreUtils.drawScoreZone(ctx);
}, 50);

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
const RADIUS = 1;

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
