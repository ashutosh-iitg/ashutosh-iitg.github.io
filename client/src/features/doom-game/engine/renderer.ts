// Canvas2D pseudo-3D wall rendering: one DDA ray per screen column,
// grayscale shading by distance, exit tile rendered as a bright strip.

import { castRay, type RayHit } from "./raycast";
import { TILE_EXIT, type Grid } from "./map";

export interface SceneState {
  grid: Grid;
  x: number;
  y: number;
  angle: number;
  fov: number;
  /** Seconds, drives the exit-strip pulse. */
  time: number;
  /** false when prefers-reduced-motion is set: static exit brightness. */
  pulse: boolean;
}

const MAX_VIEW_DIST = 14;
const CEILING_COLOR = "#000000";
const FLOOR_COLOR = "#0d0d0d";
const HORIZON_COLOR = "#1f1f1f";

function shadeFor(hit: RayHit, dist: number, state: SceneState): number {
  if (hit.tile === TILE_EXIT) {
    return state.pulse ? 210 + Math.round(45 * Math.sin(state.time * 5)) : 235;
  }
  const t = Math.max(0, 1 - dist / MAX_VIEW_DIST);
  let gray = Math.round(24 + 216 * t * t);
  if (hit.side === 1) gray = Math.round(gray * 0.72); // N/S walls darker for depth
  return Math.min(255, gray);
}

export function renderScene(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: SceneState,
): void {
  const halfH = height / 2;
  ctx.fillStyle = CEILING_COLOR;
  ctx.fillRect(0, 0, width, halfH);
  ctx.fillStyle = FLOOR_COLOR;
  ctx.fillRect(0, halfH, width, halfH);
  ctx.fillStyle = HORIZON_COLOR;
  ctx.fillRect(0, halfH, width, 1);

  const tanHalfFov = Math.tan(state.fov / 2);
  for (let col = 0; col < width; col++) {
    const cameraX = (2 * (col + 0.5)) / width - 1;
    const rayAngle = state.angle + Math.atan(cameraX * tanHalfFov);
    const hit = castRay(state.grid, state.x, state.y, rayAngle);
    const perp = Math.max(hit.dist * Math.cos(rayAngle - state.angle), 0.0001);
    const lineH = Math.min(height / perp, height * 4);
    const gray = shadeFor(hit, perp, state);
    ctx.fillStyle = `rgb(${gray},${gray},${gray})`;
    ctx.fillRect(col, halfH - lineH / 2, 1, lineH);
  }
}
