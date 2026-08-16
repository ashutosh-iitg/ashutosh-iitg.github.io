import { useEffect, useState } from "react";

const SESSION_KEY = "orb-loader-seen";
const DISPLAY_MS = 1400;

/**
 * Loader visibility gate (PLAN.md §8):
 * - shows only on cold page load (sessionStorage, never on in-app navigation),
 * - hard-capped display duration so it never blocks interaction indefinitely,
 * - shorter display when the user prefers reduced motion.
 */
export function useOrbVisibility(): boolean {
  const [visible, setVisible] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem(SESSION_KEY);
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!visible) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(
      () => {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* storage unavailable — loader simply won't persist its "seen" flag */
        }
        setVisible(false);
      },
      reduced ? 400 : DISPLAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [visible]);

  return visible;
}
