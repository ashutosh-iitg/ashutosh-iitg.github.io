import { SectionHeading } from "@/components/terminal/SectionHeading";

export default function Blog() {
  return (
    <main id="main" className="container py-24">
      <SectionHeading command="ls posts/" title="Blog" />
      <div className="max-w-2xl border border-border bg-card p-6 text-sm" role="status">
        <p className="text-muted-foreground">total 0</p>
        <p className="mt-4 text-muted-foreground">
          Nothing published yet — posts on agentic systems, LLM infrastructure, and
          production ML are in the pipeline.
        </p>
        <p className="mt-4 text-muted-foreground">
          &gt; <span className="cursor-blink">_</span>
        </p>
      </div>
    </main>
  );
}
