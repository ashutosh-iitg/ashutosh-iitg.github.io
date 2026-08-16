import { SectionHeading } from "@/components/terminal/SectionHeading";
import { ExperienceEntry } from "./ExperienceEntry";
import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="container scroll-mt-14 py-24">
      <SectionHeading command="git log --work" title="Experience" />
      <div className="space-y-6">
        {experience.map((entry) => (
          <ExperienceEntry key={entry.company} entry={entry} />
        ))}
      </div>
    </section>
  );
}
