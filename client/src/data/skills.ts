export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "LLM & Agent Systems",
    items: [
      "RAG",
      "Multi-Agent Orchestration",
      "Tool Calling",
      "Structured Outputs",
      "Prompt Engineering",
      "Evaluation",
      "OpenAI",
      "Claude",
      "Gemini",
      "Azure AI Foundry",
    ],
  },
  {
    label: "LLM Infrastructure",
    items: [
      "LiteLLM",
      "LLMOps",
      "vLLM",
      "LangChain",
      "LangGraph",
      "Langfuse",
      "Pydantic",
      "BGE-M3",
      "Jina Embeddings",
      "Milvus DB",
      "Hugging Face",
    ],
  },
  {
    label: "Orchestration & APIs",
    items: ["Temporal", "FastAPI", "Django REST Framework", "AsyncIO", "Webhooks"],
  },
  {
    label: "Data Systems",
    items: [
      "ClickHouse",
      "dbt",
      "PostgreSQL",
      "DynamoDB",
      "Redis",
      "S3",
      "Vector Search",
      "Medallion Architecture",
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      "AWS Bedrock",
      "ECS",
      "ECR",
      "EC2",
      "SageMaker",
      "Docker",
      "GitHub Actions",
      "Git",
    ],
  },
  {
    label: "Programming & ML",
    items: ["Python", "SQL", "C++", "PyTorch", "Transformers", "Scikit-learn", "OpenCV"],
  },
];
