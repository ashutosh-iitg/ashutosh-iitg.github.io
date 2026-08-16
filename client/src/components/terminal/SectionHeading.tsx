type SectionHeadingProps = {
  /** Terminal command framing, e.g. "cat about.txt". */
  command: string;
  /** Accessible visible heading text. */
  title: string;
};

export function SectionHeading({ command, title }: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <p className="mb-3 text-sm text-muted-foreground" aria-hidden="true">
        &gt; {command}
        <span className="cursor-blink">_</span>
      </p>
      <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
