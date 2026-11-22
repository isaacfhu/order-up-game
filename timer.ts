// variables
let durationMs = 60_000;
let startTime = 0;
let running = false;
let onEnd: (() => void) | null = null;

export function startTimer(ms: number, callback: () => void) {
  durationMs = ms;
  onEnd = callback;
  startTime = Date.now();
  running = true;
}

export function getRemainingMs(): number {
  if (!running) return 0;
  return Math.max(0, durationMs - (Date.now() - startTime));
}

// once per frame
export function updateTimer() {
  if (!running) return;
  if (getRemainingMs() <= 0) {
    running = false;
    onEnd?.();
    /*if (onEnd !== null) {
        onEnd();
    }*/
  }
}

export function drawTimer(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const seconds = Math.ceil(getRemainingMs() / 1000);
  ctx.fillStyle = "black";
  ctx.font = "32px Arial";
  ctx.textAlign = "right";
  ctx.fillText(`Time: ${seconds}`, x, y);
  ctx.textAlign = "left";
}
