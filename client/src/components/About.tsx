import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="container py-24">
      <h2 className="mb-12 bg-gradient-to-r from-primary/80 via-primary to-primary/80 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
        About Me
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="transition-colors hover:bg-primary/5">
          <CardContent className="p-6">
            <h3 className="mb-4 text-xl font-semibold">Background</h3>
            <p className="text-muted-foreground">
              With over 4 years of experience in AI and machine learning, I specialize in developing
              innovative solutions that bridge the gap between cutting-edge research and practical
              applications. My expertise spans computer vision, natural language processing, and
              reinforcement learning.
            </p>
          </CardContent>
        </Card>
        <Card className="transition-colors hover:bg-primary/5">
          <CardContent className="p-6">
            <h3 className="mb-4 text-xl font-semibold">Current Focus</h3>
            <p className="text-muted-foreground">
              I'm currently focused on developing scalable AI systems that can be deployed in
              production environments. My work involves optimizing model performance, reducing
              inference times, and ensuring robust model behavior in real-world scenarios.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}