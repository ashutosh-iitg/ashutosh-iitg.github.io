import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { SiGithub, SiLinkedin } from "react-icons/si";

export default function Hero() {
  return (
    <section className="container flex flex-col items-center justify-center gap-4 py-24 md:py-32">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Avatar className="h-32 w-32">
          <AvatarImage src="https://images.unsplash.com/photo-1507679799987-c73779587ccf" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h1 className="bg-gradient-to-r from-primary/80 via-primary to-primary/80 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          AI Engineer & ML Expert
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Building intelligent systems that solve real-world problems
        </p>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex gap-4"
      >
        <Button size="lg" asChild>
          <a href="#contact">Get in Touch</a>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a href="#projects">View Projects</a>
        </Button>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex gap-4"
      >
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-foreground/80 transition-colors hover:text-foreground"
        >
          <SiGithub />
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-foreground/80 transition-colors hover:text-foreground"
        >
          <SiLinkedin />
        </a>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 w-full max-w-2xl overflow-hidden rounded-lg border bg-card p-4"
      >
        <img
          src={`https://ghchart.rshah.org/409ba5/yourusername`}
          alt="GitHub Contributions Graph"
          className="w-full"
        />
      </motion.div>
    </section>
  );
}