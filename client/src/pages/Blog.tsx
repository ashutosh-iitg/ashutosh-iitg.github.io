import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const posts = [
  {
    title: "The Future of AI in 2024",
    date: "March 15, 2024",
    excerpt: "Exploring upcoming trends in artificial intelligence and their impact on industry."
  },
  {
    title: "Optimizing Deep Learning Models",
    date: "March 1, 2024",
    excerpt: "Best practices for improving model performance and reducing inference time."
  },
  {
    title: "Computer Vision in Manufacturing",
    date: "February 15, 2024",
    excerpt: "How computer vision is transforming quality control in manufacturing."
  }
];

export default function Blog() {
  return (
    <main className="container py-24">
      <h1 className="mb-12 text-4xl font-bold tracking-tight">Blog</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <Card key={post.title}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <div className="text-sm text-muted-foreground">{post.date}</div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{post.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
