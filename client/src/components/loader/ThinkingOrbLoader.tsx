import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { createOrbRenderer } from "./orbCanvas";

const ORB_SIZE = 160;

/**
 * Full-screen monochrome "thinking orb" loader (PLAN.md §8, Path A).
 * Visibility timing lives in `useOrbVisibility` — this component only renders
 * and animates while mounted. With reduced motion it shows a static frame.
 */
export default function ThinkingOrbLoader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const orb = createOrbRenderer(canvas, ORB_SIZE);

    if (reducedMotion) {
      orb.draw(0); // static frame, no loop
      return () => orb.dispose();
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      orb.draw((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      orb.dispose();
    };
  }, [reducedMotion]);

  return (
    <motion.div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeOut" }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: ORB_SIZE, height: ORB_SIZE }}
        aria-hidden="true"
      />
      <p className="mt-6 text-sm text-muted-foreground">
        &gt; initializing<span className="cursor-blink">_</span>
      </p>
    </motion.div>
  );
}
