export const profile = {
  name: "Arun Siddardha",
  fullName: "Rongala Arun Siddardha",
  role: "Senior Machine Learning Engineer",
  company: "BlackBox AI",
  location: "Hyderabad, India",
  email: "arunsiddardha19@gmail.com",
  github: "https://github.com/ArunSiddardha",
  linkedin: "https://www.linkedin.com/in/arun-siddardha",
  resume: "/Arun_Siddardha_Resume.pdf",
  site: "https://arunsiddardha.github.io",
  availability: "Open to collaborations and hard inference problems",
  lastUpdated: "September 2026",
  // Square photo in /public; set to undefined to fall back to an "AS" monogram.
  photo: "/profile.jpg" as string | undefined,
  /** Face-cropped version of `photo`, used for the small avatar. */
  avatar: "/avatar.jpg",
} as const;

export interface Stat {
  prefix?: string;
  /** Where the count-up starts; ranks count down instead (e.g. #7 → #1). Keep the same digit count as `value`. */
  from?: number;
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
  detail: string;
  tag?: string;
  span?: "wide";
}

export const stats: Stat[] = [
  {
    prefix: "#",
    from: 7,
    value: 1,
    suffix: " of 7",
    label: "NVIDIA Nemotron 3 Ultra",
    detail: "Fastest of 7 providers at 436 tok/s — I own the serving stack behind it.",
    tag: "Artificial Analysis",
    span: "wide",
  },
  {
    prefix: "#",
    from: 9,
    value: 2,
    suffix: " of 17",
    label: "GLM-5.2 (max)",
    detail: "460 tok/s — the fastest provider serving at BF16.",
  },
  {
    value: 2.8,
    decimals: 1,
    suffix: "T",
    label: "Parameters in production",
    detail: "Hybrid-MoE VLM on 8×B300.",
  },
  {
    value: 51,
    suffix: "M",
    label: "Tokens per minute",
    detail: "Multi-node fleet, 443 RPM, zero errors.",
  },
  {
    value: 94.7,
    decimals: 1,
    suffix: "%",
    label: "Terminal-Bench 2.1",
    detail: "pass@1 with a multi-agent coding system.",
  },
  {
    value: 1300,
    suffix: "+",
    label: "Commits shipped",
    detail: "Across BlackBox AI's API gateway, enterprise API, CLI and developer tooling.",
    span: "wide",
  },
];

export const marquee = [
  "vLLM",
  "SGLang",
  "TensorRT-LLM",
  "PyTorch",
  "CUDA",
  "NVFP4",
  "MXFP4",
  "FP8",
  "EAGLE3",
  "DFlash",
  "SpecForge",
  "ModelOpt",
  "Mooncake",
  "LMCache",
  "B300",
  "Kubernetes",
  "FastAPI",
  "Rust",
];

export interface SkillGroup {
  label: string;
  items: string[];
  wide?: boolean;
}

export const skills: SkillGroup[] = [
  {
    label: "LLM Inference & Serving",
    wide: true,
    items: [
      "vLLM",
      "SGLang",
      "TensorRT-LLM",
      "Speculative Decoding (EAGLE3, DFlash, MTP)",
      "SpecForge",
      "Speculators",
      "NVIDIA ModelOpt",
      "NVFP4 / MXFP4 / FP8",
      "Distributed KV-Cache",
      "Mooncake",
      "LMCache",
      "P/D Disaggregation",
      "Tensor Parallelism",
      "CUDA Graphs",
      "Continuous Batching",
    ],
  },
  {
    label: "GPU & Systems",
    items: [
      "NVIDIA H100 / H200 / B200 / B300",
      "CUDA 12.8 / 13",
      "Kernel Profiling & Fusion",
      "MoE & Mamba / Linear-Attention",
      "Intel TDX & Confidential Computing",
      "Prometheus",
      "Grafana",
    ],
  },
  {
    label: "AI / ML",
    items: [
      "PyTorch",
      "TensorFlow",
      "Hugging Face",
      "LangChain",
      "FAISS",
      "RAG",
      "Multi-Agent Systems",
      "MCP",
      "NLP",
      "Jina",
      "Crawl4AI",
    ],
  },
  {
    label: "Languages",
    items: ["Python", "Rust", "C++", "C#", "Java", "JavaScript", "TypeScript", "SQL"],
  },
  {
    label: "Frameworks",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "FastAPI",
      "Flask",
      ".NET",
      "GraphQL",
      "Stripe",
      "Langfuse",
    ],
  },
  {
    label: "Cloud & Infra",
    items: [
      "Azure",
      "AWS",
      "Kubernetes",
      "Docker",
      "CI/CD",
      "GitHub Actions",
      "Caddy / NGINX",
      "VM Provisioning",
    ],
  },
  {
    label: "Data & Tools",
    wide: true,
    items: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Pinecone",
      "Qdrant",
      "Git",
      "WebRTC",
      "VS Code Extension API",
    ],
  },
];

export interface ExperiencePoint {
  lead?: string;
  text: string;
}

export interface ExperienceGroup {
  label?: string;
  points: ExperiencePoint[];
}

export interface Experience {
  tab: string;
  title: string;
  company: string;
  companyUrl?: string;
  date: string;
  location: string;
  summary?: string;
  groups: ExperienceGroup[];
  tech: string[];
}

export const experiences: Experience[] = [
  {
    tab: "BlackBox AI",
    title: "Senior Machine Learning Engineer",
    company: "BlackBox AI",
    companyUrl: "https://www.blackbox.ai",
    date: "Nov 2025 — Present",
    location: "Remote",
    summary:
      "Own LLM inference performance and production serving. Core contributor (1,300+ commits) across the LLM API gateway, enterprise API, CLI, VS Code extension, AI coding platform and remote code execution.",
    groups: [
      {
        label: "Inference & GPU Serving",
        points: [
          {
            lead: "Public benchmark leadership.",
            text: "Own the serving configs behind BlackBox AI's Artificial Analysis results: #1 of 7 providers on NVIDIA Nemotron 3 Ultra (436 tok/s) and #2 of 17 on GLM-5.2 (max) at 460 tok/s — the fastest provider serving at BF16.",
          },
          {
            lead: "Frontier-scale deployment.",
            text: "Brought a 2.8-trillion-parameter hybrid-MoE vision-language model into production on 8×B300 across SGLang and vLLM (12/12 conformance, 267 tok/s); deployed 550B–750B MoE models (Nemotron-3-Ultra, GLM-5.2, Kimi K2.7-Code, Inkling) in NVFP4, FP8 and BF16.",
          },
          {
            lead: "Fleet throughput.",
            text: "Built a multi-node 8×B300 fleet sustaining 51M TPM at 443 RPM with 4.0 s p50 TTFT and zero errors (~1.8× the prior fleet); lifted per-GPU throughput 600K → 2.3M TPM (~3.8×) on the 8×B200 MiniMax fleet.",
          },
          {
            lead: "Speculative decoding.",
            text: "Trained EAGLE3 and DFlash drafts for MiniMax M2.5/M2.7, Kimi K2.7-Code and GLM-5.2 with SpecForge; self-quantized GLM-5.2 BF16 → NVFP4 while preserving the MTP head, restoring draft acceptance from 0 to 3.8 tokens.",
          },
          {
            lead: "KV-cache & runtime.",
            text: "Built a shared KV-cache layer with Mooncake pooling and LMCache on vLLM/SGLang; patched vLLM scheduler, paged-attention and rejection-sampler paths, with CUDA graphs, kernel fusion and NVFP4/FP8 dtype tuning.",
          },
          {
            lead: "Confidential computing.",
            text: "Designed and adversarially validated an Intel TDX + GPU-CC enclave on 8×B300 that keeps proprietary code unreadable and unmodifiable even to customers with host root.",
          },
          {
            lead: "Deployment & operations.",
            text: "Shipped a one-call model deployment platform (provisioning ~45 → ~4 min) and run production endpoints end to end with Prometheus/Grafana, crash recovery and the conformance suites that gate every deploy.",
          },
          {
            lead: "Agentic benchmarks.",
            text: "Built a verify-then-escalate multi-agent coding system reaching 94.7% pass@1 on Terminal-Bench 2.1, plus an LLM prompt-classifier auto-router with 99/100 routing accuracy at ~25 ms.",
          },
        ],
      },
      {
        label: "Platform & Developer Tooling",
        points: [
          {
            lead: "LLM API gateway — top contributor (240 commits).",
            text: "Consistent-hash routing with prompt-cache-aware affinity, adaptive thinking, per-request failover chains, multi-region load balancing and encrypted reasoning pipelines, serving millions of API calls across 20+ providers.",
          },
          {
            lead: "Enterprise API (37+ patches).",
            text: "Shipped /v1/responses and /v1/messages with multi-turn support, interleaved thinking with signature validation, provider-specific prompt caching, streaming cost calculation and zero data retention.",
          },
          {
            lead: "Blackbox CLI — #1 contributor (381 commits).",
            text: "Multi-agent orchestration with a parallel execution engine, a SQL database tool, an MCP server with auth and remote control, encrypted model support and Claude Code integration.",
          },
          {
            lead: "Developer tooling (500+ commits).",
            text: "VS Code Fill-in-the-Middle completion engine across 10+ models, an AI coding platform with Figma-to-code, and GithubConnector (sole author) for semantic code search.",
          },
        ],
      },
    ],
    tech: [
      "vLLM",
      "SGLang",
      "PyTorch",
      "CUDA",
      "NVFP4 / FP8",
      "SpecForge",
      "ModelOpt",
      "Mooncake",
      "LMCache",
      "FastAPI",
      "Prometheus",
    ],
  },
  {
    tab: "Microsoft",
    title: "Software Engineer, Cloud + AI",
    company: "Microsoft",
    companyUrl: "https://www.microsoft.com",
    date: "Jun 2024 — Nov 2025",
    location: "Hyderabad, India",
    groups: [
      {
        points: [
          {
            text: "Developed AI-powered automation agents using Retrieval-Augmented Generation (RAG) to process and summarize internal enterprise documents, improving operational efficiency by 30%.",
          },
          {
            text: "Engineered AI-driven workload migration solutions for Azure, integrating local LLMs and API-based models (OpenAI, Azure AI).",
          },
          {
            text: "Built ML models that analyze on-premises application dependencies with graph-based clustering and unsupervised learning, cutting the customer decision-making phase for Azure migration by 30%.",
          },
          {
            text: "Designed and deployed scalable AI microservices on Azure Kubernetes Service (AKS) using event-driven architecture and CI/CD pipelines.",
          },
        ],
      },
    ],
    tech: ["Python", "RAG", "Azure OpenAI", "AKS", "Graph Clustering", "CI/CD"],
  },
  {
    tab: "Microsoft · Intern",
    title: "Software Engineer Intern, Cloud + AI",
    company: "Microsoft",
    companyUrl: "https://www.microsoft.com",
    date: "May 2023 — Jul 2023",
    location: "Hyderabad, India",
    groups: [
      {
        points: [
          {
            text: "Reduced build times by 2 hours by migrating from CoreEXT to MSBuild.",
          },
          {
            text: "Resolved 1,800+ security vulnerabilities by hardening build configurations across two repositories.",
          },
        ],
      },
    ],
    tech: ["MSBuild", "Build Systems", "Security Hardening"],
  },
];

export type ProjectViz =
  | { kind: "rank"; total: number; position: number; caption: string }
  | {
      kind: "bars";
      caption: string;
      unit: string;
      max?: number;
      items: { label: string; value: number; approx?: boolean; highlight?: boolean }[];
    }
  | { kind: "chain"; caption: string; steps: string[] };

export interface Project {
  title: string;
  eyebrow: string;
  description: string;
  metric?: { value: string; label: string };
  viz: ProjectViz;
  tech: string[];
  link?: string;
  linkLabel?: string;
}

export const projects: Project[] = [
  {
    title: "Benchmark-leading LLM serving",
    eyebrow: "Artificial Analysis · Public benchmark",
    description:
      "I own the single-stream serving configurations behind BlackBox AI's published throughput: #1 of 7 providers on NVIDIA Nemotron 3 Ultra, and #2 of 17 on GLM-5.2 (max) at 460 tok/s — the fastest provider serving at BF16, ahead of all but one provider running 4- or 8-bit quantization.",
    metric: { value: "436 tok/s", label: "Nemotron 3 Ultra" },
    viz: { kind: "rank", total: 7, position: 1, caption: "Provider rank · single-stream throughput" },
    tech: ["SGLang", "vLLM", "Speculative decoding", "CUDA Graphs", "Blackwell"],
    link: "https://artificialanalysis.ai/models/nvidia-nemotron-3-ultra-550b-a55b/providers",
    linkLabel: "See the leaderboard on Artificial Analysis",
  },
  {
    title: "A 2.8T-parameter hybrid MoE in production",
    eyebrow: "Frontier-scale deployment",
    description:
      "Brought a 2.8-trillion-parameter hybrid-MoE vision-language model — MXFP4-native, 1.5 TB across 96 shards, 93 layers of interleaved Mamba/linear-attention and MLA — into production on 8×B300 on both SGLang and vLLM, reaching 12/12 conformance and 267 tok/s.",
    metric: { value: "2.9×", label: "faster decode" },
    viz: {
      kind: "bars",
      caption: "Decode throughput",
      unit: " tok/s",
      items: [
        { label: "Baseline", value: 65 },
        { label: "+ Speculative decoding", value: 190, highlight: true },
      ],
    },
    tech: ["MXFP4", "Mamba / MLA", "SGLang", "vLLM", "8×B300"],
  },
  {
    title: "Verify-then-escalate coding agent",
    eyebrow: "Agentic benchmarks",
    description:
      "A multi-agent coding system — primary solver, sandbox-executing critic and cross-family fallback — that clears Terminal-Bench 2.1 above the single-model ceiling. Paired with an LLM prompt-classifier auto-router that hits 99/100 routing accuracy at ~25 ms.",
    metric: { value: "94.7%", label: "pass@1" },
    viz: {
      kind: "bars",
      caption: "Terminal-Bench 2.1 pass@1",
      unit: "%",
      max: 100,
      items: [
        { label: "Single-model ceiling", value: 89, approx: true },
        { label: "Verify-then-escalate", value: 94.7, highlight: true },
      ],
    },
    tech: ["Multi-agent systems", "Sandboxed execution", "LLM routing"],
  },
  {
    title: "Confidential inference enclave",
    eyebrow: "Intel TDX + GPU-CC",
    description:
      "Designed and adversarially validated a trusted-execution enclave on 8×B300 that lets customers hold host root while remaining unable to read or modify proprietary code, with working remote attestation verified against the Intel root of trust.",
    metric: { value: "Attested", label: "Intel root of trust" },
    viz: {
      kind: "chain",
      caption: "Chain of trust",
      steps: ["fetch-to-tmpfs", "dm-verity", "runtime registers", "remote attestation"],
    },
    tech: ["Intel TDX", "GPU-CC", "dm-verity", "Remote attestation"],
  },
];

export interface OtherProject {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
}

export const otherProjects: OtherProject[] = [
  {
    title: "51M TPM Serving Fleet",
    description:
      "Multi-node 8×B300 fleet at 443 RPM with 4.0 s p50 TTFT and zero errors — ~1.8× the prior fleet — via 24 rank-endpoint sharding and cache-aware routing.",
    tech: ["SGLang", "Cache-Aware Routing", "B300"],
  },
  {
    title: "3.8× Per-GPU Throughput",
    description:
      "Lifted the 8×B200 MiniMax fleet from 600K to 2.3M TPM per GPU through batch-proxy tuning, P/D disaggregation and tensor-parallel re-sharding; ported across H100 → B300.",
    tech: ["vLLM", "P/D Disaggregation", "Tensor Parallelism"],
  },
  {
    title: "Speculative-Decoding Drafts",
    description:
      "Trained EAGLE3 and DFlash drafts on NVFP4 verifiers (~40% draft-token acceptance); kept GLM-5.2's MTP head through NVFP4 self-quantization, restoring acceptance from 0 to 3.8 tokens.",
    tech: ["SpecForge", "Speculators", "ModelOpt"],
  },
  {
    title: "Distributed KV-Cache Layer",
    description:
      "Shared KV-cache with Mooncake pooling and LMCache on vLLM/SGLang, plus patched scheduler, paged-attention and rejection-sampler paths to raise context reuse and cut TTFT.",
    tech: ["Mooncake", "LMCache", "vLLM"],
  },
  {
    title: "Self-Serve Deployment Platform",
    description:
      "One-call model deployment onto GPU cloud VMs — multi-replica, per-deployment auth, load balancers, TLS and cost accounting — cutting provisioning from ~45 to ~4 minutes.",
    tech: ["FastAPI", "GPU VMs", "Load Balancing"],
  },
  {
    title: "LLM API Gateway",
    description:
      "Top contributor (240 commits). Consistent-hash routing with prompt-cache affinity, failover chains and multi-region load balancing across 20+ providers.",
    tech: ["Consistent Hashing", "Prompt Caching", "Multi-Region"],
  },
  {
    title: "Blackbox CLI",
    description:
      "#1 contributor (381 commits). Multi-agent orchestration with a parallel execution engine, a SQL database tool and an MCP server with auth and remote control.",
    tech: ["Multi-Agent", "MCP", "CLI"],
  },
  {
    title: "VS Code Code Completion",
    description:
      "Fill-in-the-Middle engine with Qwen: inline completions, repetition detection, prefix-aware context, and 10+ models with GPU-accelerated E2E encryption.",
    tech: ["VS Code API", "FIM", "Qwen"],
  },
  {
    title: "GithubConnector",
    description:
      "Sole author. Semantic code search built on FAISS and LangChain, with multi-round progressive-deepening retrieval and Redis-based streaming.",
    tech: ["FAISS", "LangChain", "Redis"],
  },
];

export const education = {
  school: "Indian Institute of Technology Hyderabad",
  url: "https://www.iith.ac.in",
  degree: "B.Tech in Artificial Intelligence",
  detail: "Graduated July 2024",
};

export const publication = {
  title: "PerfMon: Performance Monitoring of Host Network Stack",
  venue: "ACM Symposium on Cloud Computing (SoCC '25)",
  date: "Nov 2025",
  affiliation: "IBM Research",
  authors: [
    "Ranjitha K.",
    "Ankit Sharma",
    "Malsawmsanga Sailo",
    "Arun Siddardha",
    "Amrit Kumar",
    "Praveen Tammana",
    "Pravein Govindan Kannan",
    "Priyanka Naik",
  ],
  self: "Arun Siddardha",
  abstract:
    "eBPF-based per-component latency monitoring across the host network stack, with automatic baseline derivation and bottleneck detection for containerized microservices — evaluated on a Kubernetes bare-metal cluster with minimal overhead.",
  doi: "10.1145/3772052.3772244",
};

export const honors = [
  { rank: "AIR 19", title: "JEE Mains 2020", detail: "100 percentile, out of 0.87 million candidates" },
  { rank: "AIR 610", title: "JEE Advanced 2020", detail: "out of 0.22 million candidates" },
  { rank: "AIR 281", title: "KVPY Scholar", detail: "among 0.15 million candidates" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Research", href: "#research" },
  { label: "Contact", href: "#contact" },
] as const;

export const socialLinks = [
  { key: "github", label: "GitHub", href: profile.github },
  { key: "linkedin", label: "LinkedIn", href: profile.linkedin },
  { key: "email", label: "Email", href: `mailto:${profile.email}` },
] as const;
