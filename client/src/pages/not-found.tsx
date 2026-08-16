import { Link, useLocation } from "wouter";

export default function NotFound() {
  const [location] = useLocation();

  return (
    <main id="main" className="container flex min-h-[70vh] flex-col items-start justify-center py-24">
      <div className="w-full max-w-2xl border border-border bg-card p-6 text-sm">
        <p className="text-muted-foreground">
          &gt; GET {location}
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">
          404 — page not found
        </h1>
        <p className="mt-2 text-muted-foreground">
          zsh: command not found: {location} (core dumped)
        </p>
        <p className="mt-6">
          <Link href="/">
            <a className="underline underline-offset-4 hover:text-muted-foreground">
              cd ~/
            </a>
          </Link>
        </p>
      </div>
    </main>
  );
}
