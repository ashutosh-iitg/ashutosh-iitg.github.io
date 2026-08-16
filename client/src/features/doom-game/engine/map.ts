// Fixed 16x16 grid map. '#' = wall, 'E' = exit tile, '.' = floor.

export const TILE_EMPTY = 0;
export const TILE_WALL = 1;
export const TILE_EXIT = 2;

export const MAP_WIDTH = 16;
export const MAP_HEIGHT = 16;

export type Grid = number[][];

const MAP_ROWS = [
  "################",
  "#..............#",
  "#.###.####.###.#",
  "#.#...#....#.#.#",
  "#.#.#.#.##.#.#.#",
  "#...#.#..#.#...#",
  "###.#.##.#.###.#",
  "#...#..#.#.....#",
  "#.###..#.#####.#",
  "#.#....#.....#.#",
  "#.#.####.###.#.#",
  "#.#......#...#.#",
  "#.######.###.#.#",
  "#........#...#.#",
  "#.##########.#E#",
  "################",
];

export const SPAWN = { x: 1.5, y: 1.5, angle: 0 };

export function createGrid(): Grid {
  return MAP_ROWS.map((row) =>
    row.split("").map((ch) => {
      if (ch === "#") return TILE_WALL;
      if (ch === "E") return TILE_EXIT;
      return TILE_EMPTY;
    }),
  );
}

export function tileAt(grid: Grid, x: number, y: number): number {
  const gx = Math.floor(x);
  const gy = Math.floor(y);
  if (gx < 0 || gy < 0 || gx >= MAP_WIDTH || gy >= MAP_HEIGHT) return TILE_WALL;
  return grid[gy][gx];
}

export function findExit(grid: Grid): { x: number; y: number } {
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      if (grid[y][x] === TILE_EXIT) return { x, y };
    }
  }
  return { x: MAP_WIDTH - 2, y: MAP_HEIGHT - 2 };
}

const COLLISION_RADIUS = 0.2;

function canStand(grid: Grid, x: number, y: number): boolean {
  const r = COLLISION_RADIUS;
  return (
    tileAt(grid, x - r, y - r) === TILE_EMPTY &&
    tileAt(grid, x + r, y - r) === TILE_EMPTY &&
    tileAt(grid, x - r, y + r) === TILE_EMPTY &&
    tileAt(grid, x + r, y + r) === TILE_EMPTY
  );
}

// Axis-separated slide movement; returns the new position and distance moved.
export function moveWithCollision(
  grid: Grid,
  x: number,
  y: number,
  dx: number,
  dy: number,
): { x: number; y: number; moved: number } {
  const nx = canStand(grid, x + dx, y) ? x + dx : x;
  const ny = canStand(grid, nx, y + dy) ? y + dy : y;
  return { x: nx, y: ny, moved: Math.hypot(nx - x, ny - y) };
}
