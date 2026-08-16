import { SectionHeading } from "@/components/terminal/SectionHeading";
import { skillGroups } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="container scroll-mt-14 py-24">
      <SectionHeading command="ls skills/" title="Stack" />
      <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.label} className="bg-card p-5">
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              <span className="text-muted-foreground" aria-hidden="true">./</span>
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
