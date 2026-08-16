import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Experience from "@/components/experience/Experience";
import Skills from "@/components/skills/Skills";
import Projects from "@/components/projects/Projects";
import ContactForm from "@/components/contact/ContactForm";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <ContactForm />
    </main>
  );
}
