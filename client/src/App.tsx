import { Suspense, lazy, useEffect, useRef } from "react";
import { Switch, Route, useLocation } from "wouter";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ThinkingOrbLoader from "@/components/loader/ThinkingOrbLoader";
import { useOrbVisibility } from "@/components/loader/useOrbVisibility";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

function useKonamiShortcut(target: string) {
  const [, navigate] = useLocation();
  const buffer = useRef<string[]>([]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (
        ["input", "textarea", "select"].includes(tag) ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      buffer.current.push(e.key);
      if (buffer.current.length > KONAMI.length) {
        buffer.current.shift();
      }
      if (buffer.current.join(",") === KONAMI.join(",")) {
        buffer.current = [];
        navigate(target);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate, target]);
}

// Code-split: the game never lands in the main bundle (PLAN.md §15).
const Doom = lazy(() => import("@/pages/Doom"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/*" component={Blog} />
      <Route path="/doom" component={DoomRoute} />
      <Route path="/doom/*" component={DoomRoute} />
      <Route component={NotFound} />
    </Switch>
  );
}

function DoomRoute() {
  return (
    <Suspense fallback={null}>
      <Doom />
    </Suspense>
  );
}

function App() {
  const showLoader = useOrbVisibility();
  const [location] = useLocation();
  const isGameRoute = location === "/doom" || location.startsWith("/doom/");

  // Hidden Konami-code shortcut to the easter egg (PLAN.md §3 stretch).
  useKonamiShortcut("/doom/");

  return (
    // "user" = globally respect prefers-reduced-motion in all framer-motion animations.
    <MotionConfig reducedMotion="user">
      <div className="grain min-h-screen bg-background">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110] focus:border focus:border-foreground focus:bg-background focus:px-3 focus:py-2 focus:text-sm"
        >
          skip to content
        </a>
        <AnimatePresence>{showLoader && <ThinkingOrbLoader key="loader" />}</AnimatePresence>
        <Navbar />
        <Router />
        {!isGameRoute && <Footer />}
        <Toaster />
      </div>
    </MotionConfig>
  );
}

export default App;
