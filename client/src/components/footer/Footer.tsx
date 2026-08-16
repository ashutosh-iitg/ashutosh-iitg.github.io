import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

function useLocalTime(): string {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return now.toLocaleTimeString(undefined, { hour12: false });
}

export default function Footer() {
  const time = useLocalTime();

  return (
    <footer className="border-t border-border">
      <div className="container flex h-12 flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <Clock />
        <span aria-hidden="true" className="flex-1" />
        <span>local time {time}</span>
        <span aria-hidden="true">·</span>
        <span>
          {profile.handle} © {new Date().getFullYear()}
        </span>
        <span className="cursor-blink" aria-hidden="true">_</span>
      </div>
    </footer>
  );
}

function Clock() {
  return <span className="text-foreground/80">session: portfolio — 80×24</span>;
}
