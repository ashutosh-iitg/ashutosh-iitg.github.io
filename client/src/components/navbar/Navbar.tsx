import { Link, useLocation } from "wouter";
import { profile } from "@/data/profile";

const SECTION_LINKS = [
  { href: "/#about", label: "about" },
  { href: "/#experience", label: "experience" },
  { href: "/#projects", label: "projects" },
  { href: "/#contact", label: "contact" },
] as const;

export default function Navbar() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-tight hover:underline underline-offset-4">
          {profile.handle}<span className="text-muted-foreground">:~$</span>
        </Link>

        <nav className="flex items-center gap-5 text-sm" aria-label="Primary">
          {SECTION_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="hidden text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
            >
              {label}
            </a>
          ))}
          <Link
            href="/blog/"
            className={`transition-colors hover:text-foreground ${
              location === "/blog" || location === "/blog/"
                ? "text-foreground underline underline-offset-4"
                : "text-muted-foreground"
            }`}
          >
            blog
          </Link>
          {/* Deliberately understated easter-egg entry (PLAN.md §4). */}
          <Link
            href="/doom/"
            className="text-muted-foreground transition-colors hover:text-foreground"
            title="a tiny tribute"
          >
            [play]
          </Link>
          <a
            href={profile.resumePath}
            download
            rel="noopener noreferrer"
            className="border border-border px-3 py-1 text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            cv.pdf
          </a>
        </nav>
      </div>
    </header>
  );
}
