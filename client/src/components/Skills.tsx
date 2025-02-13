import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const skills = [
  { name: "Machine Learning", level: 95 },
  { name: "Deep Learning", level: 90 },
  { name: "Computer Vision", level: 85 },
  { name: "Natural Language Processing", level: 88 },
  { name: "PyTorch", level: 92 },
  { name: "TensorFlow", level: 85 }
];

export default function Skills() {
  return (
    <section className="container py-24">
      <h2 className="mb-12 text-3xl font-bold tracking-tight">Skills</h2>
      <Card>
        <CardHeader>
          <CardTitle>Technical Expertise</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          {skills.map(skill => (
            <div key={skill.name}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
              <Progress value={skill.level} />
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
