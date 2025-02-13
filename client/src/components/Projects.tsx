import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Computer Vision System",
    description: "Real-time object detection system for manufacturing",
    image: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8",
    tags: ["PyTorch", "OpenCV", "Docker"]
  },
  {
    title: "NLP Pipeline",
    description: "Advanced text analysis system for document processing",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    tags: ["BERT", "Transformers", "FastAPI"]
  },
  {
    title: "Reinforcement Learning Agent",
    description: "Autonomous agent for robotic control",
    image: "https://images.unsplash.com/photo-1510759395231-72b17d622279",
    tags: ["PyTorch", "ROS", "Gym"]
  }
];

export default function Projects() {
  return (
    <section id="projects" className="container py-24">
      <h2 className="mb-12 text-3xl font-bold tracking-tight">Featured Projects</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-48 w-full object-cover"
              />
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
