import { Suspense, lazy } from "react";
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
