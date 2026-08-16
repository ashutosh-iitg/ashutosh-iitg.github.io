/**
 * Monochrome "thinking orb" — Canvas2D approximation of the rotating,
 * organically-deforming sphere at https://orbs.jakubantalik.com/ (PLAN.md §8, Path A).
 *
 * A radial-gradient sphere whose rim is displaced by layered sine octaves.
 * Grayscale only. No dependencies.
 */

export interface OrbRenderer {
  /** Draw a single frame at time `t` (seconds). */
  draw(t: number): void;
  /** Release canvas resources. */
  dispose(): void;
}

const RIM_OCTAVES: ReadonlyArray<{ freq: number; amp: number; speed: number }> = [
  { freq: 2, amp: 0.045, speed: 0.9 },
  { freq: 3, amp: 0.03, speed: -1.4 },
  { freq: 5, amp: 0.018, speed: 2.2 },
];

export function createOrbRenderer(canvas: HTMLCanvasElement, size: number): OrbRenderer {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = size * dpr;
  canvas.height = size * dpr;

  const context = canvas.getContext("2d");
  if (!context) {
    return { draw: () => undefined, dispose: () => undefined };
  }
  const ctx = context;
  ctx.scale(dpr, dpr);

  const cx = size / 2;
  const cy = size / 2;
  const baseRadius = size * 0.28;
  const STEPS = 96;

  function rimRadius(theta: number, t: number): number {
    let wobble = 0;
    for (const { freq, amp, speed } of RIM_OCTAVES) {
      wobble += amp * Math.sin(theta * freq + t * speed * Math.PI);
    }
    // Slow breathing on top of the rim wobble.
    const breathe = 1 + 0.03 * Math.sin(t * 1.6);
    return baseRadius * (1 + wobble) * breathe;
  }

  function sphereGradient(radius: number): CanvasGradient {
    // Light source slightly up-left, like the reference orb's soft shading.
    const gx = cx - radius * 0.35;
    const gy = cy - radius * 0.4;
    const g = ctx.createRadialGradient(gx, gy, radius * 0.05, cx, cy, radius * 1.35);
    g.addColorStop(0, "rgba(255, 255, 255, 0.95)");
    g.addColorStop(0.35, "rgba(180, 180, 180, 0.75)");
    g.addColorStop(0.7, "rgba(70, 70, 70, 0.5)");
    g.addColorStop(1, "rgba(0, 0, 0, 0)");
    return g;
  }

  function draw(t: number): void {
    ctx.clearRect(0, 0, size, size);

    const radius = rimRadius(0, t);
    ctx.beginPath();
    for (let i = 0; i <= STEPS; i++) {
      const theta = (i / STEPS) * Math.PI * 2;
      const r = rimRadius(theta, t);
      const x = cx + Math.cos(theta) * r;
      const y = cy + Math.sin(theta) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = sphereGradient(radius);
    ctx.fill();
  }

  function dispose(): void {
    ctx.clearRect(0, 0, size, size);
  }

  return { draw, dispose };
}
