import type {
  Experience,
  FeaturedProject,
  ProofItem,
  SecondaryProject,
  SocialLink,
} from "@/types/content";

export const identity = {
  name: "Ankit Kumar",
  headline: "I build storage engines and the systems underneath them.",
  positioning:
    "Final-year CS student and Codeforces Expert focused on backend and systems engineering — high-throughput servers, storage internals, and infrastructure with measured performance.",
  location: "Bhopal, India",
  education: "B.Tech CSE · LNCT Bhopal · Class of 2026",
  email: "ak0182274@gmail.com",
  githubUrl: "https://github.com/ankitkr-04",
} as const;

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/ankitkr-04" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ankitkr04" },
  { label: "X / Twitter", href: "https://x.com/AnkitKr_04" },
];

export const proofItems: ProofItem[] = [
  {
    value: "#15",
    label: "TCS CodeVita S13, global",
    detail: "of 669,000+ participants",
  },
  {
    value: "1655",
    label: "Codeforces Expert",
    detail: "externally verifiable rating",
  },
  {
    value: "OCI",
    label: "Oracle Cloud certified",
    detail: "2025 Developer Professional",
  },
  {
    value: "8.41",
    label: "CGPA / 10",
    detail: "B.Tech CSE, class of 2026",
  },
];

export const featuredProjects: FeaturedProject[] = [
  {
    id: "001",
    name: "StrataDB",
    stack: "C++26 · CMake · TSAN / ASAN · Google Benchmark",
    tagline:
      "An embedded key-value storage engine, built from the allocator up.",
    description:
      "A ground-up storage engine focused on concurrency safety, memory locality, and predictable performance under multithreaded load. In active development against a ten-phase roadmap — memory and config subsystems complete, MemTable and WAL in progress.",
    highlights: [
      "NUMA-aware arena allocator with thread-local allocation buffers and mmap huge-page fallback",
      "Lock-free skip-list MemTable — CAS insertion with append-versioned MVCC ordering",
      "Epoch-based reclamation with per-thread 4 KiB slabs for safe concurrent reads",
      "WAL staging with CRC32C / XXH3-128 integrity and Vyukov MPSC queue handoff",
    ],
    metrics: ["C++26", "TSAN-validated, 16-thread stress", "NUMA-aware"],
    repoUrl: "https://github.com/ankitkr-04/strata-db",
    status: "active",
  },
  {
    id: "002",
    name: "Axiom",
    stack: "Java 24 · NIO · Maven",
    tagline: "A Redis-compatible server on a single-threaded event loop.",
    description:
      "A from-scratch Redis-compatible server: one NIO event loop, direct ByteBuffer access, no thread contention, low GC pressure. Speaks the real protocol — replicas sync with PSYNC, clients get WAIT-based guarantees.",
    highlights: [
      "29+ commands across strings, lists, sorted sets, geospatial, streams, and pattern-matched pub/sub",
      "Custom QuickList and SkipList data structures backing lists and sorted sets",
      "PSYNC replication — RDB snapshot on initial sync, async incremental streaming",
      "Per-replica lag tracking via REPLCONF GETACK, WAIT-based sync guarantees",
    ],
    metrics: ["81K GET ops/s", "68K SET ops/s", "p99 ≤ 3.1 ms @ 50 clients"],
    repoUrl: "https://github.com/ankitkr-04/axiom",
    status: "stable",
  },
  {
    id: "003",
    name: "TicketLedger",
    stack: "Java 21 · Spring Boot · PostgreSQL · Stripe",
    tagline: "A booking platform that refuses to double-book.",
    description:
      "High-concurrency cinema ticketing where financial consistency wins every trade-off. Documentation-first: the repo reads as ten numbered architecture documents — lifecycle FSMs, failure modes, recovery contracts — before any code.",
    highlights: [
      "Zero double-bookings via SELECT FOR UPDATE with strict lock ordering; hot-seat throughput analytically bounded by lock-commit latency",
      "Java 21 virtual threads park ~1M connections per JVM, isolating the 20-connection Hikari pool as the sole bottleneck",
      "Exactly-once payments through idempotent Stripe webhook processing",
      "Background jobs release held seats on a 5-minute timer and trigger notifications",
    ],
    metrics: [
      "0 double-bookings by design",
      "~1M parked connections/JVM",
      "10+ architecture docs",
    ],
    repoUrl: "https://github.com/ankitkr-04/ticket-ledger",
    status: "stable",
  },
];

export const secondaryProjects: SecondaryProject[] = [
  {
    name: "Hyperlinkr",
    stack: "Rust · Axum · DragonflyDB",
    description:
      "URL shortener with a 4-layer NUMA-aware cache (TinyLFU + Bloom filter) hitting >95% — ~50K RPS on 8 GB commodity hardware, bottlenecks found by flamegraph.",
    repoUrl: "https://github.com/ankitkr-04/Hyperlinkr",
  },
  {
    name: "Arogya AI",
    stack: "FastAPI · LangChain · ChromaDB",
    description:
      "Stateless medical RAG engine that routes queries between general-advice and diagnostic vector collections by automated severity assessment, with multi-stage guardrails against diagnostic hallucination.",
    repoUrl: "https://github.com/ankitkr-04/arogya_ai",
  },
  {
    name: "Candidate Ranker",
    stack: "Python · Polars · Qwen3-4B",
    description:
      "Two-stage ranking pipeline for 100k candidates: GPU feature extraction frozen to Parquet, then a CPU-only pass — declarative policy compiled to vectorized expressions — reproducible in under 5 minutes.",
    repoUrl: "https://github.com/ankitkr-04/candidate-ranker-v2",
    demoUrl: "https://candidate-ranker-bnaecfdavasak6lyavkdc7.streamlit.app/",
  },
];

export const experience: Experience = {
  company: "ControlShift Talent",
  role: "Engineering Intern",
  period: "Feb — May 2025",
  summary:
    "Built the real-time backbone of a live AI interviewing platform — the infrastructure between a candidate on video and the AI on the other end.",
  highlights: [
    "Architected WebRTC signaling and a WebSocket layer with heartbeat, room management, and reconnection for candidate–AI video sessions",
    "Built a collaborative code editor over WebSocket, syncing client state live during interviews",
    "Moved blocking email I/O to BullMQ + Redis job queues with retry and dead-letter handling",
    "Chunked live interview recordings into an async cheat-detection AI pipeline",
    "Shipped 30+ REST endpoints with input validation and centralized error handling, backed by 25+ unit tests on auth and booking paths",
  ],
};
