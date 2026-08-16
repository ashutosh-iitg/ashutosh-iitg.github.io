export interface ExperienceHighlight {
  title: string;
  points: string[];
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: ExperienceHighlight[];
}

export const experience: ExperienceEntry[] = [
  {
    company: "CombineHealth (UpTrain)",
    role: "Senior AI Engineer",
    period: "Sep 2024 — Present",
    location: "Bengaluru, India",
    highlights: [
      {
        title: "Denial Intelligence & Resolution Platform",
        points: [
          "Built an end-to-end healthcare revenue-cycle platform that transforms EOB/ERA PDFs into structured claim data, denial analytics, resolution decisions, and appeal packets using multimodal Claude models on AWS Bedrock and Temporal workflows.",
          "Engineered a multi-stage extraction pipeline with page-relevance filtering, cached OCR, repeated extraction and consolidation, cross-page claim reconstruction, and payment-model-aware denial logic; explicitly separated patient-liability codes from true denials to preserve downstream metric correctness.",
          "Architected five durable workflows covering ingestion, enrichment, triage, resolution, and appeal generation — combining deterministic carve-out rules, configurable business policies, LLM reasoning, and signal-based human approval while keeping PHI in organization-scoped S3 storage.",
          "Developed a bronze/silver/gold ClickHouse lakehouse using Vector and dbt with 10 models and 47 data-quality tests; consolidated two 1,800+ line analyzers into a parameterized query layer and validated migration parity for 3 healthcare accounts through side-by-side testing.",
          "Built an A/B performance benchmark for production query shapes with a p95 < 50 ms release criterion for migration decisions.",
          "Designed a statistical denial-driver detection pipeline using two-proportion z-tests and Benjamini–Hochberg FDR correction across multi-dimensional claim segments, producing deterministic, statistically supported narratives.",
        ],
      },
      {
        title: "Agentic RCM Research Assistant",
        points: [
          "Designed a hierarchical multi-agent pipeline spanning intent classification, complexity-adaptive planning, parallel mini-agent execution, and response synthesis; the planner routes each query to 1–3 of 9 specialized healthcare agents backed by 27 tools for payer policies, medical coding, NCCI edits, drug information, and general RCM research.",
          "Implemented two-level asynchronous fan-out using asyncio, with a provider-agnostic, Pydantic JSON-schema tool-calling protocol compatible with different LLMs through a LiteLLM proxy.",
          "Engineered specialized retrieval pipelines for Medicare and commercial payer policies: chunked policy PDFs, semantically reranked pages using Jina embeddings, and hybrid dense+sparse knowledge-base retrieval using BGE-M3 and Milvus.",
          "Built context-aware multi-turn interactions with persistent session history in DynamoDB, streaming responses through FastAPI with Redis-based progress signalling.",
        ],
      },
      {
        title: "Automated AR Follow-up",
        points: [
          "Developed durable AR follow-up workflows that unified payer integrations across RPA/Playwright, APIs, and EDI connectors, using Temporal timers, webhook signals, pluggable calling providers, and resubmission-aware scheduling to coordinate long-running portal and calling tasks.",
        ],
      },
    ],
  },
  {
    company: "Valuence Technologies",
    role: "AI Engineer",
    period: "Aug 2020 — Aug 2024",
    location: "Tokyo, Japan (Remote)",
    highlights: [
      {
        title: "Conversational Chatbot",
        points: [
          "Developed an agentic RAG system for dynamic question-answering over proprietary and open-source LLMs (OpenAI, Mistral, Llama), with PDF and spreadsheet support via LangChain and ChromaDB; deployed in production on Azure Cloud as part of the Keiko Chatbot.",
          "Built a RASA-based bilingual (English/Japanese) chatbot assistant using transformers for intent classification, reaching 96.8% intent-classification accuracy; POC deployed via containers on AWS ECS.",
        ],
      },
      {
        title: "Sensitive Data Redaction",
        points: [
          "Crafted a pipeline for automated redaction of personally identifiable information in product documents using OCR, a multilingual BERT-based text embedding model, and SVM, reaching 97.7% accuracy in sensitive-data identification.",
          "Engineered an AI solution to mask sensitive regions in product images using instance segmentation and pixelation that blends naturally with the original image; achieved mAP(50-95) of 0.776.",
        ],
      },
      {
        title: "Auto-Assessment Platform",
        points: [
          "Designed an end-to-end AI workflow for product detection and classification using state-of-the-art CNN models, including a Branched CNN on a ResNet backbone to identify details of luxury products.",
          "Fine-tuned an object detection model via transfer learning for real-time product detection, achieving 97% precision — a three-fold efficiency increase and 50% faster response time for customer queries.",
        ],
      },
    ],
  },
];
