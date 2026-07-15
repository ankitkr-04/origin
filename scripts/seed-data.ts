import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "stratadb",
    name: "StrataDB",
    tier: "flagship",
    status: "active",
    year: "2026",
    stack: "C++26 · CMake · TSAN / ASAN · Google Benchmark",
    tagline:
      "An embedded key-value storage engine, built from the allocator up.",
    summary:
      "A ground-up storage engine focused on concurrency safety, memory locality, and predictable performance under multithreaded load.",
    story: [
      "StrataDB starts below where most database projects start: at memory. Before any key ever meets a value, the engine allocates through a NUMA-aware arena with thread-local allocation buffers, falling back to mmap-backed huge pages — so the hot path never fights a global lock for memory.",
      "Writes land in a lock-free skip-list MemTable. Insertion is CAS-based, ordering is append-versioned MVCC, and reads stay safe through epoch-based reclamation with per-thread 4 KiB slabs. The write-ahead log stages blocks with CRC32C and XXH3-128 integrity checks, handed off through a Vyukov MPSC queue.",
      "The project runs against a ten-phase roadmap and is honest about where it stands: build tooling, config, and the memory subsystem are complete; MemTable flush integration and WAL durability validation are in progress; SSTables with io_uring, compaction, and chaos testing are ahead. Every concurrent path is validated with ThreadSanitizer under 16-thread stress.",
    ],
    highlights: [
      "NUMA-aware arena allocator with thread-local allocation buffers and mmap huge-page fallback",
      "Lock-free skip-list MemTable — CAS insertion with append-versioned MVCC ordering",
      "Epoch-based reclamation with per-thread 4 KiB slabs for safe concurrent reads",
      "WAL staging with CRC32C / XXH3-128 integrity and Vyukov MPSC queue handoff",
    ],
    metrics: ["C++26", "TSAN-validated, 16-thread stress", "NUMA-aware"],
    repoUrl: "https://github.com/ankitkr-04/strata-db",
  },
  {
    slug: "axiom",
    name: "Axiom",
    tier: "flagship",
    status: "stable",
    year: "2025",
    stack: "Java 24 · NIO · Maven",
    tagline: "A Redis-compatible server on a single-threaded event loop.",
    summary:
      "A from-scratch Redis-compatible server: one NIO event loop, direct ByteBuffer access, no thread contention, low GC pressure.",
    story: [
      "Axiom takes Redis's most interesting architectural bet — one thread, zero contention — and rebuilds it in Java: a single-threaded NIO event loop with direct ByteBuffer access, keeping GC pressure low enough that the JVM stays out of the latency story.",
      "It speaks the real protocol. 29+ commands cover strings, lists, sorted sets, geospatial queries via geohash, streams, and pattern-matched pub/sub — with custom QuickList and SkipList structures underneath rather than borrowed collections.",
      "Replication is the deep end: PSYNC with an RDB snapshot on initial sync, async incremental streaming after, WAIT-based sync guarantees, and per-replica lag tracked through REPLCONF GETACK. Benchmarked at ~81K GET and ~68K SET ops/sec with 50 concurrent clients, p99 ≤ 3.1 ms.",
    ],
    highlights: [
      "29+ commands across strings, lists, sorted sets, geospatial, streams, and pattern-matched pub/sub",
      "Custom QuickList and SkipList data structures backing lists and sorted sets",
      "PSYNC replication — RDB snapshot on initial sync, async incremental streaming",
      "Per-replica lag tracking via REPLCONF GETACK, WAIT-based sync guarantees",
    ],
    metrics: ["81K GET ops/s", "68K SET ops/s", "p99 ≤ 3.1 ms @ 50 clients"],
    repoUrl: "https://github.com/ankitkr-04/axiom",
  },
  {
    slug: "ticketledger",
    name: "TicketLedger",
    tier: "flagship",
    status: "stable",
    year: "2026",
    stack: "Java 21 · Spring Boot · PostgreSQL · Stripe",
    tagline: "A booking platform that refuses to double-book.",
    summary:
      "High-concurrency cinema ticketing where financial consistency wins every trade-off — designed documentation-first.",
    story: [
      "TicketLedger is written documentation-first: ten numbered architecture documents — problem statement through booking-failure recovery — covering lifecycle state machines, sequence flows, schema, API contracts, and failure modes, all before the implementation. The repo is meant to be read.",
      "The core guarantee is zero double-bookings, enforced with SELECT FOR UPDATE under strict lock ordering. That choice has a measurable cost, and the docs own it: hot-seat throughput is analytically bounded at ~200 ops/sec per row by lock-commit latency. Correctness is priced in, not assumed.",
      "Java 21 virtual threads park roughly a million connections per JVM at about 1 KB each, which isolates the 20-connection HikariCP pool as the single deliberate bottleneck. Payments are exactly-once through idempotent Stripe webhook processing, and background jobs release held seats on a five-minute timer.",
    ],
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
  },
  {
    slug: "hyperlinkr",
    name: "Hyperlinkr",
    tier: "notable",
    status: "stable",
    year: "2025",
    stack: "Rust · Axum · DragonflyDB · Docker",
    tagline: "A URL shortener treated as a systems problem.",
    summary:
      "Rust URL shortener with a 4-layer NUMA-aware cache hitting >95% — ~50K RPS on 8 GB commodity hardware.",
    story: [
      "Hyperlinkr layers four caches between a request and the database: NUMA-aware L1/L2 with TinyLFU admission, a Bloom filter to swallow misses, and DragonflyDB behind them — together holding a >95% hit rate at ~50K RPS on an 8th-gen i3 with 8 GB of RAM.",
      "The performance work is diagnostic, not decorative: flamegraph profiling identified BASE62 code generation as the real bottleneck, and atomic contention in the Bloom filter surfaced under concurrency. IP-based rate limiting, device- and geo-aware analytics, and a circuit breaker on the DragonflyDB layer round out the production posture.",
    ],
    highlights: [
      "4-layer cache: NUMA-aware L1/L2 + TinyLFU + Bloom filter + DragonflyDB, >95% hit rate",
      "Flamegraph-profiled — BASE62 codegen identified as the true bottleneck",
      "Circuit-breaker failover on the cache layer, IP-based rate limiting",
      "Real-time analytics with device detection and geo-location",
    ],
    metrics: ["~50K RPS on 8 GB hardware", ">95% cache hit rate"],
    repoUrl: "https://github.com/ankitkr-04/Hyperlinkr",
  },
  {
    slug: "arogya-ai",
    name: "Arogya AI",
    tier: "notable",
    status: "stable",
    year: "2026",
    stack: "FastAPI · LangChain · ChromaDB · Gemini · TypeScript",
    tagline: "A medical RAG engine that knows when not to answer.",
    summary:
      "Stateless medical RAG that routes queries by automated severity assessment, with guardrails against diagnostic hallucination.",
    story: [
      "Arogya AI is a stateless REST workflow over a medical knowledge base: when the initial context lacks symptom detail, the agent generates dynamic follow-up questions instead of guessing.",
      "Retrieval is split into two ChromaDB collections — optimistic for general advice, pessimistic for diagnostic territory — and an automated severity assessment decides which one a query is allowed to touch. Multi-stage prompt guardrails plus Pydantic validation flag clinical red flags, block diagnostic hallucination, and force structured JSON output.",
    ],
    highlights: [
      "Severity-based routing between general-advice and diagnostic vector collections",
      "Dynamic follow-up question generation when symptom context is thin",
      "Multi-stage LLM guardrails + Pydantic validation for clinical red flags",
      "Stateless REST design — every request carries its own context",
    ],
    metrics: ["2 severity-routed collections", "Structured JSON enforced"],
    repoUrl: "https://github.com/ankitkr-04/arogya_ai",
  },
  {
    slug: "candidate-ranker",
    name: "Candidate Ranker",
    tier: "notable",
    status: "stable",
    year: "2026",
    stack: "Python · Polars · Qwen3-4B · Parquet",
    tagline: "Ranking 100k candidates on a laptop CPU in under five minutes.",
    summary:
      "Two-stage ranking pipeline built for the Redrob Hackathon v4 — GPU judgments frozen offline, CPU-only scoring at query time.",
    story: [
      "The constraint: one job description, 100,000 candidates, reproducible on CPU in under five minutes with 16 GB and no network. The design splits work by what each stage is allowed to cost.",
      "Stage one runs offline on GPU with no time limit — normalization, deterministic features, integrity signals, and small-language-model judgments (Qwen3-4B answering 30 booleans) only for candidates above a tuned ceiling — all frozen to a flat Parquet file. Stage two is a lazy Parquet scan where the JD policy compiles to vectorized Polars expressions: one pass to score, sort, and tie-break, with grounded reasoning for the top N.",
      "The key invariant: no candidate is ever removed. Gates, honeypots, and penalties drive a score toward zero, but the row survives — every ranking decision stays auditable.",
    ],
    highlights: [
      "Declarative JD policy compiled to vectorized Polars expressions",
      "SLM judgments (30 booleans) gated behind a tuned score ceiling",
      "No-removal invariant — penalties zero the score, never delete the row",
      "Single-pass score / sort / tie-break within a 5-minute CPU budget",
    ],
    metrics: ["100k candidates", "<5 min on CPU", "≤16 GB, no network"],
    repoUrl: "https://github.com/ankitkr-04/candidate-ranker-v2",
    demoUrl: "https://candidate-ranker-bnaecfdavasak6lyavkdc7.streamlit.app/",
  },
  {
    slug: "museobot",
    name: "MuseoBot",
    tier: "notable",
    status: "stable",
    year: "2025",
    stack: "Next.js · PostgreSQL · Razorpay · Clerk · Botpress",
    tagline: "Museum ticketing with payments that can't double-charge.",
    summary:
      "Full-stack museum booking — idempotent Razorpay payments, admin analytics, and automated support workflows.",
    story: [
      "MuseoBot handles the unglamorous parts of ticketing correctly: Razorpay payments run through idempotency checks so a retried request can never become a duplicate charge, and Clerk owns auth and session management.",
      "An admin dashboard tracks booking analytics and user activity, while Botpress automates the customer-support workflows that would otherwise land in someone's inbox.",
    ],
    highlights: [
      "Idempotent Razorpay integration — retries never duplicate transactions",
      "Admin dashboard for booking analytics and user activity",
      "Botpress-automated customer support workflows",
    ],
    metrics: ["Idempotent payments", "Automated support"],
    repoUrl: "https://github.com/ankitkr-04/museobot",
  },
  {
    slug: "misp-dashboard",
    name: "MISP Dashboard",
    tier: "archive",
    status: "stable",
    year: "2026",
    stack: "TypeScript · Python",
    tagline: "A ground-up rewrite of the MISP threat-intel dashboard.",
    summary:
      "Threat-intelligence visualization for the MISP platform, rebuilt from a fork into a modern TypeScript + Python stack.",
    story: [
      "Started as a fork of the official MISP dashboard, rebuilt into its own codebase: a TypeScript front end over a Python data layer, visualizing live threat-intelligence activity from a MISP instance.",
    ],
    highlights: [
      "Full rewrite of the legacy dashboard rather than incremental patching",
      "TypeScript UI over a Python aggregation layer",
    ],
    metrics: ["Threat-intel", "Rewrite"],
    repoUrl: "https://github.com/ankitkr-04/misp-dashboard-new",
  },
  {
    slug: "disease-outbreak-prediction",
    name: "Disease Outbreak Prediction",
    tier: "archive",
    status: "stable",
    year: "2025",
    stack: "Python · Jupyter · scikit-learn",
    tagline: "Forecasting outbreaks from public health data.",
    summary:
      "Machine-learning notebooks predicting disease outbreak risk — the most-starred repo on the account.",
    story: [
      "An applied ML project working through outbreak prediction on public health data — exploratory analysis, feature engineering, and model comparison in reproducible notebooks.",
    ],
    highlights: [
      "End-to-end notebook workflow from raw data to model evaluation",
    ],
    metrics: ["Applied ML"],
    repoUrl: "https://github.com/ankitkr-04/disease-outbreak-prediction",
  },
  {
    slug: "quiz-app",
    name: "Quiz App",
    tier: "archive",
    status: "stable",
    year: "2024",
    stack: "Next.js · Prisma · Ant Design",
    tagline: "A full quiz platform, live in production.",
    summary:
      "Quiz creation and play with persistent scoring — an early full-stack build that still runs live on Vercel.",
    story: [
      "An early full-stack project: quiz authoring, timed play, and persistent results over Prisma — deployed and still live. Kept here as the baseline the systems work is measured against.",
    ],
    highlights: ["Deployed and publicly usable since 2024"],
    metrics: ["Live on Vercel"],
    repoUrl: "https://github.com/ankitkr-04/quiz-app",
    demoUrl: "https://quiz-app-three-mu-78.vercel.app/",
  },
];

export const achievements = [
  {
    value: "Global Rank 15",
    context: "TCS CodeVita Season 13 — out of 669,000+ participants worldwide",
    note: "Top 0.003% in one of the world's largest coding competitions",
  },
  {
    value: "Expert · 1663",
    context: "Codeforces competitive rating",
    note: "Externally verifiable, earned across rated contests",
  },
];

export const experiences = [
  {
    company: "ControlShift Talent",
    role: "Web Developer Intern",
    period: "Feb — May 2025",
    summary:
      "Architected real-time infrastructure in production for a live AI interviewing platform.",
    highlights: [
      "Architected real-time infrastructure for a live AI interviewer — WebRTC signaling server + WebSocket layer with heartbeat, room management, and reconnection for candidate–AI video sessions.",
      "Built a collaborative code editor over WebSocket, syncing client state live during interviews.",
      "Async job queues (BullMQ + Redis) for blocking email I/O, with retry and dead-letter handling.",
      "30+ REST endpoints with input validation and centralized error handling; 25+ unit tests on auth/booking paths.",
    ],
  },
];

export const certifications = [
  "Oracle Cloud Infrastructure 2025 Developer Professional (1Z0-1084-25)",
  "AWS Academy — Cloud Foundations",
];

export const identity = {
  name: "Ankit Kumar",
  headline: "I build storage engines and the systems underneath them.",
  headlineParts: [
    "I build ",
    "storage engines",
    " and the systems underneath them.",
  ],
  positioning:
    "Final-year CS student and Codeforces Expert focused on backend and systems engineering — high-throughput servers, storage internals, and infrastructure with measured performance.",
  location: "Bhopal, India",
  education: "B.Tech CSE · LNCT Bhopal · Class of 2026",
  email: "ak0182274@gmail.com",
  githubUrl: "https://github.com/ankitkr-04",
  githubHandle: "ankitkr-04",
  leetcodeHandle: "ankitkr_04",
  codeforcesHandle: "Ankit_Kr04",
  aboutNarrative: [
    "I'm a final-year Computer Science student who started by building APIs and kept digging deeper to understand how systems work under the hood. This curiosity led me to explore the full depth of the stack—from building a storage engine with memory management in C++26, to writing a Redis-compatible server driven by a single event loop, and designing high-concurrency booking platforms.",
    "My focus is on systems engineering and performance. I believe in measuring what matters, so I back my work with benchmarks and tests. I'm always learning, and if something is a work in progress, I'm upfront about it.",
    "When I'm not at the terminal, you'll probably find me solving competitive programming challenges (Codeforces Expert) or playing chess.",
  ],
};

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/ankitkr-04" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ankitkr04" },
  { label: "X / Twitter", href: "https://x.com/AnkitKr_04" },
];

export const achievementStats = [
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

export const education = {
  degree: "B.Tech, Computer Science & Engineering",
  institution: "Lakshmi Narain College of Technology, Bhopal",
  period: "Aug 2023 — May 2026",
  cgpa: "8.41 / 10",
};

export const resumes = [
  {
    label: "Distributed Systems",
    fileUrl: "/resume/ankit-resume-2025-11-distributed-systems.pdf",
    focusAreas: ["Distributed Systems", "Performance Optimization"],
    isCurrent: false,
    updatedAt: new Date("2025-11-15T00:00:00Z"),
  },
  {
    label: "Backend Engineering",
    fileUrl: "/resume/ankit-resume-2025-12-backend.pdf",
    focusAreas: ["General Backend", "Spring Boot"],
    isCurrent: false,
    updatedAt: new Date("2025-12-15T00:00:00Z"),
  },
  {
    label: "Backend Engineering",
    fileUrl: "/resume/ankit-resume-2026-01-backend.pdf",
    focusAreas: ["General Backend"],
    isCurrent: false,
    updatedAt: new Date("2026-01-15T00:00:00Z"),
  },
  {
    label: "Web Engineering",
    fileUrl: "/resume/ankit-resume-2026-02-web-engineering.pdf",
    focusAreas: ["Web Engineering", "WebSockets"],
    isCurrent: false,
    updatedAt: new Date("2026-02-15T00:00:00Z"),
  },
  {
    label: "Backend Engineering",
    fileUrl: "/resume/ankit-resume-2026-03-backend.pdf",
    focusAreas: ["General Backend", "Spring Boot"],
    isCurrent: false,
    updatedAt: new Date("2026-03-15T00:00:00Z"),
  },
  {
    label: "Systems Engineering",
    fileUrl: "/resume/ankit-resume-2026-04-systems.pdf",
    focusAreas: ["Concurrency", "Real-Time Infrastructure"],
    isCurrent: false,
    updatedAt: new Date("2026-04-10T00:00:00Z"),
  },
  {
    label: "Systems Engineering (Qualcomm)",
    fileUrl: "/resume/ankit-resume-2026-04-qualcomm.pdf",
    focusAreas: ["Systems Engineering", "Qualcomm"],
    isCurrent: false,
    updatedAt: new Date("2026-04-12T00:00:00Z"),
  },
  {
    label: "Full-Stack AI (Cognizant)",
    fileUrl: "/resume/ankit-resume-2026-04-cognizant-ai.pdf",
    focusAreas: ["Full-Stack AI", "RAG Pipelines"],
    isCurrent: false,
    updatedAt: new Date("2026-04-15T00:00:00Z"),
  },
  {
    label: "Backend Architecture (Infosys)",
    fileUrl: "/resume/ankit-resume-2026-04-infosys.pdf",
    focusAreas: ["Backend Architecture", "Low-Level Infrastructure"],
    isCurrent: false,
    updatedAt: new Date("2026-04-20T00:00:00Z"),
  },
  {
    label: "C++ Systems",
    fileUrl: "/resume/ankit-resume-2026-05-cpp.pdf",
    focusAreas: ["C++ Systems", "Memory Allocators", "Linux"],
    isCurrent: true,
    updatedAt: new Date("2026-05-15T00:00:00Z"),
  },
];

export const skills = [
  { category: "Languages", name: "Java (Primary)" },
  { category: "Languages", name: "C++ (C++26)" },
  { category: "Languages", name: "Rust" },
  { category: "Languages", name: "Python" },
  { category: "Languages", name: "TypeScript / JavaScript" },
  { category: "Languages", name: "SQL" },

  { category: "Backend & Frameworks", name: "Spring Boot" },
  { category: "Backend & Frameworks", name: "FastAPI" },
  { category: "Backend & Frameworks", name: "Axum" },
  { category: "Backend & Frameworks", name: "Next.js" },
  { category: "Backend & Frameworks", name: "REST APIs" },
  { category: "Backend & Frameworks", name: "WebSockets" },
  { category: "Backend & Frameworks", name: "WebRTC" },

  { category: "Databases & Caching", name: "PostgreSQL (HikariCP)" },
  { category: "Databases & Caching", name: "Redis" },
  { category: "Databases & Caching", name: "DragonflyDB" },
  { category: "Databases & Caching", name: "ChromaDB (Vector DB)" },

  { category: "Systems & Concurrency", name: "Java NIO" },
  { category: "Systems & Concurrency", name: "Virtual Threads (Java 21)" },
  { category: "Systems & Concurrency", name: "Lock-free Data Structures" },
  { category: "Systems & Concurrency", name: "Memory Allocators (Arena, TLAB)" },
  { category: "Systems & Concurrency", name: "Epoch-based Reclamation" },
  { category: "Systems & Concurrency", name: "MVCC" },
  { category: "Systems & Concurrency", name: "Event-driven I/O" },

  { category: "AI & LLMs", name: "LangChain" },
  { category: "AI & LLMs", name: "RAG Pipelines" },
  { category: "AI & LLMs", name: "Prompt Engineering" },
  { category: "AI & LLMs", name: "Gemini" },
  { category: "AI & LLMs", name: "Qwen3-4B" },
  { category: "AI & LLMs", name: "Prompt Guardrails (Pydantic)" },

  { category: "Infrastructure & Tools", name: "Linux" },
  { category: "Infrastructure & Tools", name: "Docker" },
  { category: "Infrastructure & Tools", name: "AWS (EC2, Lambda)" },
  { category: "Infrastructure & Tools", name: "Oracle Cloud Infrastructure" },
  { category: "Infrastructure & Tools", name: "Git" },
  { category: "Infrastructure & Tools", name: "Prometheus" },
  { category: "Infrastructure & Tools", name: "Grafana" },

  { category: "C++/Systems Tooling", name: "CMake" },
  { category: "C++/Systems Tooling", name: "GDB" },
  { category: "C++/Systems Tooling", name: "perf" },
  { category: "C++/Systems Tooling", name: "TSAN/ASAN/UBSAN" },
  { category: "C++/Systems Tooling", name: "Valgrind" },
  { category: "C++/Systems Tooling", name: "Google Benchmark" },

  { category: "Message Queues / Async", name: "BullMQ" },
  { category: "Message Queues / Async", name: "Redis Pub/Sub" },
];
