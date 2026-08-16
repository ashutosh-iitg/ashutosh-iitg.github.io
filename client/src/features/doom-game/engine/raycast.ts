// Classic DDA raycasting (Lodev-style) against the tile grid.

import { TILE_EXIT, TILE_WALL, tileAt, type Grid } from "./map";

export interface RayHit {
  /** Distance along the ray; caller applies fisheye correction. */
  dist: number;
  /** 0 = vertical wall slice (E/W facing), 1 = horizontal (N/S facing). */
  side: 0 | 1;
  tile: number;
  mapX: number;
  mapY: number;
}

const MAX_STEPS = 64;

export function castRay(grid: Grid, px: number, py: number, angle: number): RayHit {
  const dirX = Math.cos(angle);
  const dirY = Math.sin(angle);

  let mapX = Math.floor(px);
  let mapY = Math.floor(py);

  const deltaX = dirX === 0 ? 1e30 : Math.abs(1 / dirX);
  const deltaY = dirY === 0 ? 1e30 : Math.abs(1 / dirY);

  let stepX: number;
  let stepY: number;
  let sideX: number;
  let sideY: number;

  if (dirX < 0) {
    stepX = -1;
    sideX = (px - mapX) * deltaX;
  } else {
    stepX = 1;
    sideX = (mapX + 1 - px) * deltaX;
  }
  if (dirY < 0) {
    stepY = -1;
    sideY = (py - mapY) * deltaY;
  } else {
    stepY = 1;
    sideY = (mapY + 1 - py) * deltaY;
  }

  let side: 0 | 1 = 0;
  let tile = TILE_WALL;
  for (let i = 0; i < MAX_STEPS; i++) {
    if (sideX < sideY) {
      sideX += deltaX;
      mapX += stepX;
      side = 0;
    } else {
      sideY += deltaY;
      mapY += stepY;
      side = 1;
    }
    tile = tileAt(grid, mapX, mapY);
    if (tile === TILE_WALL || tile === TILE_EXIT) break;
  }

  const dist = side === 0 ? sideX - deltaX : sideY - deltaY;
  return { dist: Math.max(dist, 0.0001), side, tile, mapX, mapY };
}
