import { useCallback, useEffect, useRef, useState } from "react";
import {
  createGrid,
  moveWithCollision,
  SPAWN,
  TILE_EXIT,
  tileAt,
  type Grid,
} from "./engine/map";
import { createInput } from "./engine/input";
import { renderScene } from "./engine/renderer";

type Phase = "idle" | "playing" | "won";

interface PlayerState {
  x: number;
  y: number;
  angle: number;
  dist: number;
  steps: number;
  startTime: number;
}

interface RunStats {
  steps: number;
  seconds: number;
}

const VIEW_W = 640;
const VIEW_H = 400;
const FOV = Math.PI / 3;
const MOVE_SPEED = 3; // tiles per second
const TURN_SPEED = 2.4; // radians per second
const STEP_LENGTH = 0.8; // tiles walked per "step"

function freshPlayer(): PlayerState {
  return { x: SPAWN.x, y: SPAWN.y, angle: SPAWN.angle, dist: 0, steps: 0, startTime: 0 };
}

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function DoomGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<PlayerState>(freshPlayer());
  const phaseRef = useRef<Phase>("idle");
  const [phase, setPhase] = useState<Phase>("idle");
  const [stats, setStats] = useState<RunStats>({ steps: 0, seconds: 0 });
  const [grid] = useState<Grid>(createGrid);

  phaseRef.current = phase;

  const startRun = useCallback(() => {
    playerRef.current = { ...freshPlayer(), startTime: performance.now() };
    setPhase("playing");
  }, []);

  // Game loop: advance player from input, re-render, update HUD line.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const input = createInput(window);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();

    const step = (dt: number, now: number) => {
      const p = playerRef.current;
      if (input.state.turnLeft) p.angle -= TURN_SPEED * dt;
      if (input.state.turnRight) p.angle += TURN_SPEED * dt;
      let dir = 0;
      if (input.state.forward) dir += 1;
      if (input.state.back) dir -= 1;
      if (dir !== 0) {
        const dx = Math.cos(p.angle) * MOVE_SPEED * dir * dt;
        const dy = Math.sin(p.angle) * MOVE_SPEED * dir * dt;
        const res = moveWithCollision(grid, p.x, p.y, dx, dy);
        p.x = res.x;
        p.y = res.y;
        p.dist += res.moved;
        p.steps = Math.floor(p.dist / STEP_LENGTH);
      }
      if (tileAt(grid, p.x, p.y) === TILE_EXIT) {
        setStats({ steps: p.steps, seconds: (now - p.startTime) / 1000 });
        setPhase("won");
      }
    };

    const updateHud = (now: number) => {
      const hud = hudRef.current;
      if (!hud) return;
      if (phaseRef.current !== "playing") {
        hud.textContent = "";
        return;
      }
      const p = playerRef.current;
      const secs = (now - p.startTime) / 1000;
      hud.textContent = `pos ${p.x.toFixed(1)},${p.y.toFixed(1)} | steps ${p.steps} | time ${formatTime(secs)}`;
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (phaseRef.current === "playing") step(dt, now);
      const p = playerRef.current;
      renderScene(ctx, VIEW_W, VIEW_H, {
        grid,
        x: p.x,
        y: p.y,
        angle: p.angle,
        fov: FOV,
        time: now / 1000,
        pulse: !reduceMotion,
      });
      updateHud(now);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      input.dispose();
    };
  }, [grid]);

  // Phase keys: [enter] start, [r] restart, [esc] back to gate.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Enter" && phaseRef.current === "idle") startRun();
      else if (e.code === "KeyR" && phaseRef.current === "won") startRun();
      else if (e.code === "Escape" && phaseRef.current === "playing") setPhase("idle");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [startRun]);

  return (
    <div className="relative h-full w-full select-none overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        width={VIEW_W}
        height={VIEW_H}
        className="h-full w-full [image-rendering:pixelated]"
      />
      <div
        ref={hudRef}
        className="pointer-events-none absolute left-3 top-3 font-mono text-xs text-neutral-400"
      />
      {phase === "playing" && (
        <div className="pointer-events-none absolute bottom-3 left-3 font-mono text-xs text-neutral-600">
          [wasd / arrows] move &amp; turn · [esc] exit
        </div>
      )}
      {phase !== "playing" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/80 font-mono text-neutral-300">
          {phase === "idle" ? (
            <>
              <p className="text-lg tracking-widest">$ ./doom.exe</p>
              <p className="text-xs text-neutral-500">
                a nod to doom — find the bright exit tile.
              </p>
              <button
                type="button"
                onClick={startRun}
                className="border border-neutral-600 px-4 py-2 text-sm hover:bg-white hover:text-black"
              >
                click to start [enter]
              </button>
            </>
          ) : (
            <>
              <p className="text-lg tracking-widest">you escaped.</p>
              <p className="text-xs text-neutral-500">
                time {formatTime(stats.seconds)} · steps {stats.steps}
              </p>
              <button
                type="button"
                onClick={startRun}
                className="border border-neutral-600 px-4 py-2 text-sm hover:bg-white hover:text-black"
              >
                restart [r]
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
