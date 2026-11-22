let x = 0; // zone width
let y = 0; // zone height
let zoneColor = "";
let textColor = "";
let currentScoreText = "";
let highScoreText = "";
let score = 0;
let highScore = 0;

function refreshText() {
  currentScoreText = `Score: ${score}`;
  highScoreText = `HighScore: ${highScore}`;
}

export function initScoreCanvas(
  ctx: CanvasRenderingContext2D,
  xPos: number,
  yPos: number,
  zone_color: string,
  text_color: string,
  current_score_text: string,
  high_score_text: string,
) {
  x = xPos;
  y = yPos;
  zoneColor = zone_color;
  textColor = text_color;
  currentScoreText = current_score_text;
  highScoreText = high_score_text;

  drawScoreZone(ctx);
}

export function drawScoreZone(ctx: CanvasRenderingContext2D) {
  // background
  ctx.fillStyle = zoneColor;
  ctx.fillRect(0, 0, x, y);
  ctx.fillStyle = textColor;

  // main score
  let scoreFontSize = Math.floor(x / 2);
  ctx.font = `bold ${scoreFontSize}px Arial`;
  ctx.textBaseline = "top";

  // check
  const scoreMetrics = ctx.measureText(currentScoreText);
  const maxWidth = x * 0.9; // 10% padding

  if (scoreMetrics.width > maxWidth) {
    scoreFontSize = Math.floor(scoreFontSize * (maxWidth / scoreMetrics.width));
    ctx.font = `bold ${scoreFontSize}px Arial`;
  }

  //
  const scoreX = (x - ctx.measureText(currentScoreText).width) / 2;
  const scoreY = y * 0.1;
  ctx.fillText(currentScoreText, scoreX, scoreY);

  // high score
  let highFontSize = Math.floor(y * 0.25);
  ctx.font = `${highFontSize}px Arial`;

  let highMetrics = ctx.measureText(highScoreText);
  if (highMetrics.width > maxWidth) {
    highFontSize = Math.floor(highFontSize * (maxWidth / highMetrics.width));
    ctx.font = `${highFontSize}px Arial`;
  }

  const highX = (x - ctx.measureText(highScoreText).width) / 2;

  const highY = scoreY + scoreFontSize + y * 0.05;
  ctx.fillText(highScoreText, highX, highY);
}

export function addScore(points: number = 1) {
  score += points;
  if (score > highScore) highScore = score;
  refreshText();
}

export function resetScore() {
  score = 0;
  refreshText();
}

export function getScoreZoneSize() {
  return { width: x, height: y };
}

export function getScore() {
  return score;
}

export function getHighScore() {
  return highScore;
}
