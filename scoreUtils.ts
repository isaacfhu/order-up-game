let x = 0; // zone width
let y = 0; // zone height
let zoneColor = "";
let textColor = "";
let currentText = "";

export function initScoreCanvas(
  ctx: CanvasRenderingContext2D,
  xPos: number,
  yPos: number,
  zone_color: string,
  text_color: string,
  current_text: string,
) {
  x = xPos;
  y = yPos;
  zoneColor = zone_color;
  textColor = text_color;
  currentText = current_text;

  drawScoreZone(ctx);
}

function drawScoreZone(ctx: CanvasRenderingContext2D) {
  // background
  ctx.fillStyle = zoneColor;
  ctx.fillRect(0, 0, x, y);

  // dynamic text
  let fontSize = Math.floor(x / 2);
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.fillStyle = textColor;

  // check
  const metrics = ctx.measureText(currentText);
  const maxWidth = x * 0.9; // 10% padding
  if (metrics.width > maxWidth) {
    fontSize = Math.floor(fontSize * (maxWidth / metrics.width));
    ctx.font = `bold ${fontSize}px Arial`;
  }

  // execute
  ctx.textBaseline = "middle";
  const textX = (x - ctx.measureText(currentText).width) / 2;
  const textY = y / 2;

  ctx.fillText(currentText, textX, textY);
}

export function changeScoreText() {}
