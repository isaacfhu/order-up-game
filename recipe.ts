// types
export type Ingredient = { name: string; count: number; points: number };
type Recipe = { ingredients: Ingredient[]; doNotCut: string[] };
type TextLine = { text: string; isHeading: boolean };

// constants
const RECIPE_POOL: Recipe[] = [
  {
    ingredients: [
      { name: "apple", count: 2, points: 5 },
      { name: "blueberry", count: 1, points: 20 },
      { name: "orange", count: 4, points: 5 },
    ],
    doNotCut: ["grape", "coconut", "cherry"],
  },
  {
    ingredients: [
      { name: "grape", count: 2, points: 10 },
      { name: "coconut", count: 1, points: 5 },
      { name: "cherry", count: 4, points: 20 },
    ],
    doNotCut: ["apple", "orange", "blueberry"],
  },
];

const PANEL_STYLE = {
  padding: 12,
  lineHeight: 26,
  fontSize: 20,
  fontFamily: "Arial",
  background: "rgba(255, 255, 255, 0.85)",
  borderColor: "black",
  borderWidth: 2,
  textColor: "black",
};

// variables

let current: Recipe = { ingredients: [], doNotCut: [] };

// functions
export function newRecipe() {
  const pick = RECIPE_POOL[Math.floor(Math.random() * RECIPE_POOL.length)];
  current = structuredClone(pick);
}

export function addIngredient(name: string, count = 1, points = 10) {
  const existing = current.ingredients.find((i) => i.name === name);
  if (existing) existing.count += count;
  else current.ingredients.push({ name, count, points });
}

export function removeIngredient(name: string, count = 1) {
  const idx = current.ingredients.findIndex((i) => i.name === name);
  if (idx === -1) return;
  current.ingredients[idx].count -= count;
  if (current.ingredients[idx].count <= 0) current.ingredients.splice(idx, 1);
}

export function addDoNotCut(name: string) {
  if (!current.doNotCut.includes(name)) current.doNotCut.push(name);
}

export function removeDoNotCut(name: string) {
  current.doNotCut = current.doNotCut.filter((n) => n !== name);
}

export function isComplete() {
  return current.ingredients.length === 0;
}

export function drawRecipe(
  ctx: CanvasRenderingContext2D,
  cornerX: number,
  cornerY: number,
) {
  const { padding, lineHeight } = PANEL_STYLE;
  const lines = buildRecipeLines();

  ctx.save();
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  const width = getWidestLineWidth(ctx, lines) + padding * 2;
  const height = lines.length * lineHeight + padding * 2;
  const x = cornerX - width;
  const y = cornerY - height;

  drawPanel(ctx, x, y, width, height);
  drawLines(ctx, lines, x + padding, y + padding);

  ctx.restore();
}

function buildRecipeLines(): TextLine[] {
  return [
    { text: "Ingredients:", isHeading: true },

    ...current.ingredients.map((ingredient) => {
      return {
        text: `- ${ingredient.name} x${ingredient.count}`,
        isHeading: false,
      };
    }),

    { text: "Do not cut:", isHeading: true },

    ...current.doNotCut.map((name) => {
      return {
        text: `- ${name}`,
        isHeading: false,
      };
    }),
  ];
}

function applyLineFont(ctx: CanvasRenderingContext2D, line: TextLine) {
  const weight = line.isHeading ? "bold" : "";
  ctx.font = `${weight} ${PANEL_STYLE.fontSize}px ${PANEL_STYLE.fontFamily}`;
}

function getWidestLineWidth(
  ctx: CanvasRenderingContext2D,
  lines: TextLine[],
): number {
  let widest = 0;
  for (const line of lines) {
    applyLineFont(ctx, line);
    widest = Math.max(widest, ctx.measureText(line.text).width);
  }
  return widest;
}

function drawPanel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  ctx.fillStyle = PANEL_STYLE.background;
  ctx.fillRect(x, y, width, height);

  ctx.strokeStyle = PANEL_STYLE.borderColor;
  ctx.lineWidth = PANEL_STYLE.borderWidth;
  ctx.strokeRect(x, y, width, height);
}

function drawLines(
  ctx: CanvasRenderingContext2D,
  lines: TextLine[],
  x: number,
  y: number,
) {
  ctx.fillStyle = PANEL_STYLE.textColor;
  lines.forEach((line, index) => {
    applyLineFont(ctx, line);
    ctx.fillText(line.text, x, y + index * PANEL_STYLE.lineHeight);
  });
}
