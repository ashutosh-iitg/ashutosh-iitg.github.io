import type { ExperienceEntry as ExperienceEntryData } from "@/data/experience";

type ExperienceEntryProps = {
  entry: ExperienceEntryData;
};

export function ExperienceEntry({ entry }: ExperienceEntryProps) {
  return (
    <article className="border border-border bg-card">
      <header className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border px-5 py-4">
        <div>
          <h3 className="font-display text-xl font-semibold">{entry.role}</h3>
          <p className="text-sm text-muted-foreground">{entry.company}</p>
        </div>
        <p className="text-xs text-muted-foreground">
          {entry.period} · {entry.location}
        </p>
      </header>

      <div className="space-y-6 px-5 py-5">
        {entry.highlights.map((highlight) => (
          <section key={highlight.title}>
            <h4 className="mb-2 text-sm font-semibold text-foreground">
              <span className="text-muted-foreground" aria-hidden="true">## </span>
              {highlight.title}
            </h4>
            <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
              {highlight.points.map((point, i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden="true" className="select-none text-muted-foreground/60">-</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
