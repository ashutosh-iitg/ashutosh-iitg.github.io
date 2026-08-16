import { useState } from "react";
import { Link } from "wouter";
import DoomGame from "@/features/doom-game/DoomGame";

function isCoarsePointer(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
}

export default function Doom() {
  const [coarse] = useState(isCoarsePointer);

  return (
    <main id="main" className="flex h-screen w-screen flex-col bg-black font-mono text-neutral-200">
      <header className="flex items-center justify-between border-b border-neutral-800 px-4 py-2 text-xs">
        <span className="text-neutral-500">~/games/doom</span>
        <Link href="/" className="text-neutral-400 hover:text-white">
          cd ~ [back to /]
        </Link>
      </header>
      <div className="relative min-h-0 flex-1">
        {coarse ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
            <p className="text-sm text-neutral-400">
              best experienced on desktop with keyboard + mouse.
            </p>
            <Link
              href="/"
              className="border border-neutral-700 px-4 py-2 text-xs hover:bg-white hover:text-black"
            >
              back home
            </Link>
          </div>
        ) : (
          <DoomGame />
        )}
      </div>
    </main>
  );
}
