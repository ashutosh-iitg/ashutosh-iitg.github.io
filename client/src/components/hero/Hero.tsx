import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import GitHubStats from "./GitHubStats";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { y: 16, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const SOCIAL_ICONS: Record<string, typeof Mail> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

export default function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      className="container flex flex-col items-start gap-6 py-24 md:py-32"
      variants={reducedMotion ? undefined : container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item} className="flex items-center gap-4">
        <Avatar className="h-28 w-28 border border-border">
          <AvatarImage
            src="/headshot.webp"
            alt={`Portrait of ${profile.name}`}
            width={112}
            height={112}
          />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        <p className="text-sm text-muted-foreground">
          &gt; whoami<span className="cursor-blink">_</span>
        </p>
      </motion.div>

      <motion.h1
        variants={item}
        className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
      >
        {profile.name}
      </motion.h1>

      <motion.p variants={item} className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
        {profile.tagline}
      </motion.p>

      <motion.p variants={item} className="text-sm text-muted-foreground">
        {profile.location} · <a href={`mailto:${profile.email}`} className="underline underline-offset-4 hover:text-foreground">{profile.email}</a>
      </motion.p>

      <motion.div variants={item} className="flex flex-wrap gap-3 pt-2">
        <a
          href={profile.resumePath}
          download
          rel="noopener noreferrer"
          className="border border-foreground bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-transparent hover:text-foreground"
        >
          download cv
        </a>
        <a
          href="#contact"
          className="border border-border px-4 py-2 text-sm transition-colors hover:border-foreground"
        >
          get in touch
        </a>
      </motion.div>

      <motion.div variants={item} className="flex gap-5 pt-2">
        {profile.socials.map((social) => {
          const Icon = SOCIAL_ICONS[social.label] ?? Mail;
          return (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-xl text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon />
            </a>
          );
        })}
      </motion.div>

      <motion.div
        variants={item}
        className="mt-6 grid w-full max-w-5xl gap-4 lg:grid-cols-[1fr_320px]"
      >
        <div className="overflow-hidden border border-border bg-card p-4">
          <p className="mb-3 text-xs text-muted-foreground" aria-hidden="true">
            &gt; git contributions --author={profile.handle}
          </p>
          <img
            src={`https://ghchart.rshah.org/444444/${profile.handle}`}
            alt={`GitHub contribution chart for ${profile.handle}`}
            className="w-full invert contrast-125"
            width={663}
            height={104}
            loading="lazy"
          />
        </div>
        <GitHubStats />
      </motion.div>
    </motion.section>
  );
}
