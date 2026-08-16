import { SectionHeading } from "@/components/terminal/SectionHeading";
import { profile } from "@/data/profile";
import { education } from "@/data/education";

export default function About() {
  return (
    <section id="about" className="container scroll-mt-14 py-24">
      <SectionHeading command="cat about.txt" title="About" />
      <div className="grid gap-10 md:grid-cols-[1fr_280px]">
        <div className="max-w-2xl space-y-4 text-muted-foreground">
          <p>
            I'm {profile.firstName} — a senior AI engineer based in {profile.location},
            working on applied generative AI, agentic systems, and ML platforms.
          </p>
          <p>
            Right now I build healthcare revenue-cycle intelligence at CombineHealth
            (UpTrain): multimodal document pipelines, hierarchical multi-agent systems,
            and durable Temporal workflows that turn EOB/ERA PDFs into denial analytics,
            resolutions, and appeal packets.
          </p>
          <p>
            Before that, I spent four years at Valuence Technologies shipping production
            ML — agentic RAG chatbots, PII redaction pipelines, and real-time product
            detection for luxury goods.
          </p>
        </div>

        <aside className="border border-border bg-card p-5">
          <p className="mb-4 text-xs text-muted-foreground" aria-hidden="true">
            &gt; cat education.log
          </p>
          {education.map((entry) => (
            <div key={entry.institution} className="text-sm">
              <p className="font-semibold text-foreground">{entry.institution}</p>
              <p className="mt-1 text-muted-foreground">{entry.degree}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {entry.period} · {entry.location}
                {entry.note ? ` · ${entry.note}` : ""}
              </p>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
