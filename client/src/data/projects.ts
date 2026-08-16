export interface ProjectEntry {
  slug: string;
  name: string;
  description: string;
  stack: string[];
  links?: { repo?: string; demo?: string };
  featured?: boolean;
  /** Route to an interactive experience tied to the project, if any. */
  playRoute?: string;
}

export const projects: ProjectEntry[] = [
  {
    slug: "emissary",
    name: "Emissary",
    description:
      "A small, provider-agnostic Python wrapper over LLM APIs. It exposes one call shape — a tool-forced structured call — across two wire formats: the native Anthropic Messages API and any OpenAI-compatible chat completions endpoint. That single adapter covers OpenAI, Kimi, DeepSeek, Gemini, and locally-hosted vLLM servers, with prompt-cache breakpoints on the Anthropic wire and a `call_choice` helper that scores classification labels from the model's own logprobs rather than self-reported confidence. It also includes a small, principled fallback policy: retry on provider-level failures, never on malformed payloads or missing credentials.",
    stack: ["Python", "Anthropic SDK", "OpenAI SDK", "vLLM"],
    featured: true,
    links: { repo: "https://github.com/ashutosh-iitg/emissary" },
  },
  {
    slug: "doom",
    name: "Doom",
    description:
      "A panel of judges for conversational safety, starting from the exchange classifier in Constitutional Classifiers++. Instead of scoring requests and responses in isolation — which misses fragmented attacks and obfuscated answers — it judges the full exchange in context against a fixed constitution. A cheap one-token `Screen` routes only suspicious traffic to the full judge, and the package includes threshold calibration, an optional PyTorch linear probe, a weighted probe/LLM ensemble, and a separate Reasoning Jury implementation for evaluating chain-of-thought traces via multi-model consensus.",
    stack: ["Python", "PyTorch", "Anthropic/OpenAI APIs", "emissary"],
    featured: true,
    playRoute: "/doom/",
    links: { repo: "https://github.com/ashutosh-iitg/doom" },
  },
  {
    slug: "multimodal-rag-document-qa",
    name: "Multi-Modal RAG Document QA",
    description:
      "A multi-modal RAG application for question answering over financial documents, using Google VertexAI Embeddings and Gemini LLMs to understand images, text, and tables. Persisted vector storage with ChromaDB on LangChain, and a Chainlit UI for conversational interaction.",
    stack: ["Gemini", "VertexAI", "LangChain", "ChromaDB", "Chainlit"],
  },
  {
    slug: "abstract-classification",
    name: "Abstract Classification",
    description:
      "Fine-tuned DistilBERT in PyTorch to classify each sentence of a research abstract into labels such as Objective, Background, Methods, Conclusions, and Research. Achieved an F1 score of 0.92 on the test set.",
    stack: ["PyTorch", "DistilBERT", "Transformers"],
  },
  {
    slug: "plantclef",
    name: "PlantCLEF — Plant Genus & Species Classification",
    description:
      "A Multi-View CNN architecture that integrates multiple images of the same plant to improve classification precision — a 10% accuracy increase over traditional single-view CNN models.",
    stack: ["PyTorch", "CNN", "Computer Vision"],
  },
];
