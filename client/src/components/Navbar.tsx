import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  const [location] = useLocation();

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href}>
      <a className={`text-sm font-medium transition-colors hover:text-primary ${
        location === href ? "text-foreground" : "text-muted-foreground"
      }`}>
        {children}
      </a>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <NavLink href="/">
            <span className="font-bold">AI Engineer</span>
          </NavLink>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6">
            <NavLink href="/#about">About</NavLink>
            <NavLink href="/#projects">Projects</NavLink>
            <NavLink href="/#experience">Experience</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/#contact">Contact</NavLink>
          </nav>
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <Button>Download CV</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
