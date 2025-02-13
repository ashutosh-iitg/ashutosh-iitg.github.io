import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const experiences = [
  {
    company: "AI Solutions Inc",
    role: "Senior AI Engineer",
    period: "2022 - Present",
    description: "Leading the development of computer vision systems for autonomous vehicles.",
    achievements: [
      "Improved model accuracy by 35% using advanced deep learning techniques",
      "Led a team of 5 ML engineers in developing real-time object detection systems",
      "Reduced inference time by 60% through model optimization"
    ]
  },
  {
    company: "Tech Innovators",
    role: "Machine Learning Engineer",
    period: "2020 - 2022",
    description: "Developed and deployed NLP models for content moderation at scale.",
    achievements: [
      "Built scalable NLP pipeline processing 1M+ documents daily",
      "Reduced false positives by 45% in content moderation system",
      "Implemented BERT-based classification models with 92% accuracy"
    ]
  },
  {
    company: "Data Corp",
    role: "AI Research Engineer",
    period: "2019 - 2020",
    description: "Conducted research in reinforcement learning and published papers.",
    achievements: [
      "Published 2 papers in top-tier ML conferences",
      "Developed novel RL algorithms for robotic control",
      "Collaborated with research teams across 3 countries"
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="container py-24">
      <h2 className="mb-12 bg-gradient-to-r from-primary/80 via-primary to-primary/80 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
        Experience
      </h2>
      <div className="relative space-y-8">
        {/* Timeline line */}
        <div className="absolute left-8 top-4 h-[calc(100%-2rem)] w-0.5 bg-primary/20" />

        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
          >
            <Card className="relative ml-16 transition-colors hover:bg-primary/5">
              {/* Timeline dot */}
              <div className="absolute -left-[3.25rem] top-6 h-4 w-4 rounded-full bg-primary" />

              <CardHeader>
                <CardTitle className="flex flex-col gap-1">
                  <span className="text-xl font-bold">{exp.role}</span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {exp.company} • {exp.period}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{exp.description}</p>
                <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                  {exp.achievements.map((achievement, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.2 + j * 0.1 }}
                    >
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}