export type LayoutBlueprint = 
  | "harvard" 
  | "silicon" 
  | "executive" 
  | "compact" 
  | "minimal" 
  | "metro" 
  | "editorial" 
  | "technical";

export type FontStyle = "serif" | "sans" | "mono" | "editorial";

export type SpacingDensity = "compact" | "normal" | "spacious";

export interface ResumeTemplate {
  id: string;
  name: string;
  category: "Tech & Engineering" | "Executive & Leadership" | "Product & Management" | "Finance & Corporate" | "Freshers & Interns";
  roleTag: string;
  blueprint: LayoutBlueprint;
  font: FontStyle;
  accentHex: string;
  accentTailwind: string;
  density: SpacingDensity;
  description: string;
}

export const COLOR_PALETTES = [
  { name: "Classic Slate", hex: "#0f172a", class: "border-slate-900 text-slate-950" },
  { name: "Ruby Rose", hex: "#e11d48", class: "border-rose-600 text-rose-700" },
  { name: "Ocean Indigo", hex: "#4f46e5", class: "border-indigo-600 text-indigo-700" },
  { name: "Forest Emerald", hex: "#059669", class: "border-emerald-600 text-emerald-700" },
  { name: "Royal Navy", hex: "#1e3a8a", class: "border-blue-900 text-blue-900" },
  { name: "Cyber Teal", hex: "#0d9488", class: "border-teal-600 text-teal-700" },
  { name: "Sunset Amber", hex: "#d97706", class: "border-amber-600 text-amber-700" },
  { name: "Velvet Purple", hex: "#7c3aed", class: "border-purple-600 text-purple-700" },
  { name: "Crimson Red", hex: "#dc2626", class: "border-red-600 text-red-700" },
  { name: "Nordic Charcoal", hex: "#334155", class: "border-slate-700 text-slate-800" },
];

export const FONT_OPTIONS: { id: FontStyle; name: string; family: string; description: string }[] = [
  { id: "serif", name: "Georgia Serif", family: "'Georgia', 'Times New Roman', serif", description: "Ivy League & Corporate Standard" },
  { id: "sans", name: "Modern Sans", family: "system-ui, -apple-system, sans-serif", description: "Clean Tech & Startup Favorite" },
  { id: "editorial", name: "Garamond Book", family: "'Garamond', 'Baskerville', serif", description: "Classic Editorial & Finance" },
  { id: "mono", name: "JetBrains Mono", family: "'Courier New', monospace", description: "Technical Systems & Code" },
];

export const RESUME_TEMPLATES_100: ResumeTemplate[] = [
  // ==========================================
  // CATEGORY 1: TECH & ENGINEERING (25 Templates)
  // ==========================================
  {
    id: "tech-01",
    name: "Full Stack Architect",
    category: "Tech & Engineering",
    roleTag: "Next.js / Node.js",
    blueprint: "silicon",
    font: "sans",
    accentHex: "#e11d48",
    accentTailwind: "border-rose-600 text-rose-700",
    density: "normal",
    description: "Modern tech layout highlighting full-stack architectures and quantifiable latency reductions."
  },
  {
    id: "tech-02",
    name: "FAANG High-Throughput",
    category: "Tech & Engineering",
    roleTag: "Distributed Systems",
    blueprint: "compact",
    font: "sans",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "compact",
    description: "Ultra-dense single-page design for high-scale backend systems handling millions of QPS."
  },
  {
    id: "tech-03",
    name: "DevOps & Cloud Engineer",
    category: "Tech & Engineering",
    roleTag: "AWS / Kubernetes",
    blueprint: "metro",
    font: "sans",
    accentHex: "#0d9488",
    accentTailwind: "border-teal-600 text-teal-700",
    density: "normal",
    description: "Infrastructure-focused template with high visibility for Docker, Terraform, and AWS certifications."
  },
  {
    id: "tech-04",
    name: "Backend Go & Microservices",
    category: "Tech & Engineering",
    roleTag: "Golang / Kafka",
    blueprint: "silicon",
    font: "mono",
    accentHex: "#4f46e5",
    accentTailwind: "border-indigo-600 text-indigo-700",
    density: "compact",
    description: "Engineered for high-concurrency backend developers, gRPC APIs, and database tuning."
  },
  {
    id: "tech-05",
    name: "Frontend UI/UX Specialist",
    category: "Tech & Engineering",
    roleTag: "React / Tailwind",
    blueprint: "minimal",
    font: "sans",
    accentHex: "#e11d48",
    accentTailwind: "border-rose-600 text-rose-700",
    density: "normal",
    description: "Refined aesthetic with crisp hierarchy for design system builders and Web Vitals champions."
  },
  {
    id: "tech-06",
    name: "Machine Learning & AI",
    category: "Tech & Engineering",
    roleTag: "PyTorch / LLMs",
    blueprint: "editorial",
    font: "serif",
    accentHex: "#1e3a8a",
    accentTailwind: "border-blue-900 text-blue-900",
    density: "normal",
    description: "Balances academic AI research publications with real-world production model serving metrics."
  },
  {
    id: "tech-07",
    name: "Site Reliability Engineer",
    category: "Tech & Engineering",
    roleTag: "SLOs / Incident Mgmt",
    blueprint: "compact",
    font: "sans",
    accentHex: "#059669",
    accentTailwind: "border-emerald-600 text-emerald-700",
    density: "compact",
    description: "Emphasizes uptime percentages, MTTR reductions, and automated monitoring pipelines."
  },
  {
    id: "tech-08",
    name: "Data Platform Engineer",
    category: "Tech & Engineering",
    roleTag: "Snowflake / Spark",
    blueprint: "technical",
    font: "sans",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "Optimized for petabyte-scale ETL pipelines, data warehouses, and streaming analytics."
  },
  {
    id: "tech-09",
    name: "Mobile iOS & Android Lead",
    category: "Tech & Engineering",
    roleTag: "Swift / Flutter",
    blueprint: "silicon",
    font: "sans",
    accentHex: "#7c3aed",
    accentTailwind: "border-purple-600 text-purple-700",
    density: "normal",
    description: "Showcases app store download counts, crash-free user sessions, and native performance."
  },
  {
    id: "tech-10",
    name: "Cybersecurity & InfoSec",
    category: "Tech & Engineering",
    roleTag: "Zero Trust / SOC2",
    blueprint: "metro",
    font: "sans",
    accentHex: "#dc2626",
    accentTailwind: "border-red-600 text-red-700",
    density: "compact",
    description: "Security-focused format emphasizing vulnerability management, pen testing, and compliance."
  },
  {
    id: "tech-11",
    name: "TypeScript Core Contributor",
    category: "Tech & Engineering",
    roleTag: "Open Source / NPM",
    blueprint: "minimal",
    font: "mono",
    accentHex: "#1e3a8a",
    accentTailwind: "border-blue-900 text-blue-900",
    density: "compact",
    description: "Emphasizes open source repositories, library downloads, and static typing mastery."
  },
  {
    id: "tech-12",
    name: "Embedded Systems & IoT",
    category: "Tech & Engineering",
    roleTag: "C++ / RTOS / Rust",
    blueprint: "technical",
    font: "serif",
    accentHex: "#334155",
    accentTailwind: "border-slate-700 text-slate-800",
    density: "normal",
    description: "Firmware and hardware interfacing layout with deep focus on memory constraints and latency."
  },
  {
    id: "tech-13",
    name: "Blockchain & Smart Contracts",
    category: "Tech & Engineering",
    roleTag: "Solidity / Web3",
    blueprint: "silicon",
    font: "sans",
    accentHex: "#0d9488",
    accentTailwind: "border-teal-600 text-teal-700",
    density: "normal",
    description: "DeFi protocols, contract audits, gas optimization metrics, and decentralized architectures."
  },
  {
    id: "tech-14",
    name: "QA Automation Architect",
    category: "Tech & Engineering",
    roleTag: "Playwright / CI-CD",
    blueprint: "compact",
    font: "sans",
    accentHex: "#059669",
    accentTailwind: "border-emerald-600 text-emerald-700",
    density: "compact",
    description: "Highlights test coverage gains, automated smoke test suites, and regression prevention."
  },
  {
    id: "tech-15",
    name: "Cloud Database Administrator",
    category: "Tech & Engineering",
    roleTag: "Postgres / DynamoDB",
    blueprint: "metro",
    font: "sans",
    accentHex: "#d97706",
    accentTailwind: "border-amber-600 text-amber-700",
    density: "normal",
    description: "Focus on query execution plans, partitioning, replication topologies, and zero-downtime migrations."
  },
  {
    id: "tech-16",
    name: "Python Automation & API",
    category: "Tech & Engineering",
    roleTag: "FastAPI / Celery",
    blueprint: "silicon",
    font: "sans",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "Async worker pipelines, REST/GraphQL microservices, and web scraping systems."
  },
  {
    id: "tech-17",
    name: "Rust Systems Engineer",
    category: "Tech & Engineering",
    roleTag: "WASM / Low Latency",
    blueprint: "technical",
    font: "mono",
    accentHex: "#d97706",
    accentTailwind: "border-amber-600 text-amber-700",
    density: "compact",
    description: "Zero-cost abstractions, memory-safe concurrency, WebAssembly runtimes, and high frequency trading."
  },
  {
    id: "tech-18",
    name: "Game Developer (3D/Physics)",
    category: "Tech & Engineering",
    roleTag: "Unity / Unreal Engine",
    blueprint: "minimal",
    font: "sans",
    accentHex: "#7c3aed",
    accentTailwind: "border-purple-600 text-purple-700",
    density: "normal",
    description: "Shaders, 60fps frame rate guarantees, multi-platform releases, and gameplay physics."
  },
  {
    id: "tech-19",
    name: "Computer Vision Researcher",
    category: "Tech & Engineering",
    roleTag: "OpenCV / YOLO",
    blueprint: "editorial",
    font: "serif",
    accentHex: "#1e3a8a",
    accentTailwind: "border-blue-900 text-blue-900",
    density: "normal",
    description: "Edge inference, video object detection, mAP scores, and real-time processing pipelines."
  },
  {
    id: "tech-20",
    name: "FinTech Payments Engineer",
    category: "Tech & Engineering",
    roleTag: "Stripe / PCI-DSS",
    blueprint: "harvard",
    font: "serif",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "High compliance transaction processing, double-entry ledgers, and settlement reconciliation."
  },
  {
    id: "tech-21",
    name: "Platform Internal Tools",
    category: "Tech & Engineering",
    roleTag: "Developer Experience",
    blueprint: "metro",
    font: "sans",
    accentHex: "#4f46e5",
    accentTailwind: "border-indigo-600 text-indigo-700",
    density: "normal",
    description: "Internal CLI developer tools, local build time cuts, and automated staging environment setups."
  },
  {
    id: "tech-22",
    name: "Search & Recommender Systems",
    category: "Tech & Engineering",
    roleTag: "Elasticsearch / VectorDB",
    blueprint: "technical",
    font: "sans",
    accentHex: "#0d9488",
    accentTailwind: "border-teal-600 text-teal-700",
    density: "compact",
    description: "Vector embeddings, ranking algorithms, semantic search latency, and indexing efficiency."
  },
  {
    id: "tech-23",
    name: "Shopify & Headless Commerce",
    category: "Tech & Engineering",
    roleTag: "Liquid / Hydrogen",
    blueprint: "silicon",
    font: "sans",
    accentHex: "#059669",
    accentTailwind: "border-emerald-600 text-emerald-700",
    density: "normal",
    description: "High converting checkout pages, custom Shopify apps, storefront API integrations, and GMV growth."
  },
  {
    id: "tech-24",
    name: "Staff Backend Specialist",
    category: "Tech & Engineering",
    roleTag: "Distributed Sharding",
    blueprint: "compact",
    font: "sans",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "compact",
    description: "High impact technical milestones, cross-team architecture reviews, and zero downtime deployments."
  },
  {
    id: "tech-25",
    name: "Tech Lead Solo Developer",
    category: "Tech & Engineering",
    roleTag: "End-to-End Delivery",
    blueprint: "minimal",
    font: "sans",
    accentHex: "#e11d48",
    accentTailwind: "border-rose-600 text-rose-700",
    density: "normal",
    description: "Full product lifecycle ownership from MVP database schema to DNS and production scale."
  },

  // ==========================================
  // CATEGORY 2: EXECUTIVE & LEADERSHIP (20 Templates)
  // ==========================================
  {
    id: "exec-01",
    name: "Vice President of Engineering",
    category: "Executive & Leadership",
    roleTag: "100+ Team Scaling",
    blueprint: "executive",
    font: "sans",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "Authoritative corporate layout highlighting team retention, multimillion-dollar budgets, and delivery velocity."
  },
  {
    id: "exec-02",
    name: "Chief Technology Officer (CTO)",
    category: "Executive & Leadership",
    roleTag: "Boardroom & Strategy",
    blueprint: "executive",
    font: "serif",
    accentHex: "#1e3a8a",
    accentTailwind: "border-blue-900 text-blue-900",
    density: "normal",
    description: "High-contrast slate header highlighting executive board milestones, acquisitions, and technology vision."
  },
  {
    id: "exec-03",
    name: "Engineering Director",
    category: "Executive & Leadership",
    roleTag: "Cross-Functional Mgmt",
    blueprint: "metro",
    font: "sans",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "Showcases engineering org growth, departmental KPIs, and alignment with corporate revenue targets."
  },
  {
    id: "exec-04",
    name: "Principal Staff Engineer",
    category: "Executive & Leadership",
    roleTag: "Company-Wide Impact",
    blueprint: "compact",
    font: "sans",
    accentHex: "#334155",
    accentTailwind: "border-slate-700 text-slate-800",
    density: "compact",
    description: "Dense single-page format for Staff+ engineers with multi-quarter architecture roadmaps."
  },
  {
    id: "exec-05",
    name: "Head of Infrastructure",
    category: "Executive & Leadership",
    roleTag: "Cloud FinOps & SRE",
    blueprint: "technical",
    font: "sans",
    accentHex: "#0d9488",
    accentTailwind: "border-teal-600 text-teal-700",
    density: "normal",
    description: "Emphasizes multi-million cloud budget optimization, 99.999% SLA enforcement, and global data centers."
  },
  {
    id: "exec-06",
    name: "Chief Information Security Officer (CISO)",
    category: "Executive & Leadership",
    roleTag: "Enterprise Governance",
    blueprint: "executive",
    font: "editorial",
    accentHex: "#dc2626",
    accentTailwind: "border-red-600 text-red-700",
    density: "normal",
    description: "Structured corporate hierarchy for regulatory audits, enterprise risk frameworks, and security teams."
  },
  {
    id: "exec-07",
    name: "Senior Engineering Manager",
    category: "Executive & Leadership",
    roleTag: "Sprint Cadence & Hiring",
    blueprint: "metro",
    font: "sans",
    accentHex: "#4f46e5",
    accentTailwind: "border-indigo-600 text-indigo-700",
    density: "normal",
    description: "Balances people leadership, engineer mentorship, promo rates, and sprint velocity metrics."
  },
  {
    id: "exec-08",
    name: "Startup Founder / Co-Founder",
    category: "Executive & Leadership",
    roleTag: "Zero-to-One / ARR",
    blueprint: "silicon",
    font: "sans",
    accentHex: "#e11d48",
    accentTailwind: "border-rose-600 text-rose-700",
    density: "normal",
    description: "Venture-backed metric template highlighting ARR growth, fundraising milestones, and customer acquisition."
  },
  {
    id: "exec-09",
    name: "Head of Data & Analytics",
    category: "Executive & Leadership",
    roleTag: "Data Governance",
    blueprint: "editorial",
    font: "serif",
    accentHex: "#1e3a8a",
    accentTailwind: "border-blue-900 text-blue-900",
    density: "normal",
    description: "Executive presentation for data lakehouse transformation, BI enablement, and predictive modelling."
  },
  {
    id: "exec-10",
    name: "Enterprise Solutions Architect",
    category: "Executive & Leadership",
    roleTag: "Pre-Sales / \$10M+ Deals",
    blueprint: "harvard",
    font: "serif",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "Balances deep technical system designs with C-suite executive presentations and RFP wins."
  },
  {
    id: "exec-11",
    name: "Global Delivery Head",
    category: "Executive & Leadership",
    roleTag: "Multi-Geo Delivery",
    blueprint: "executive",
    font: "sans",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "Multi-country offshore delivery, SLA governance, margin maximization, and client retention."
  },
  {
    id: "exec-12",
    name: "Managing Director of Tech",
    category: "Executive & Leadership",
    roleTag: "Wall Street / FinTech",
    blueprint: "harvard",
    font: "editorial",
    accentHex: "#1e3a8a",
    accentTailwind: "border-blue-900 text-blue-900",
    density: "normal",
    description: "Prestigious institutional format for investment banking technology heads and managing directors."
  },
  {
    id: "exec-13",
    name: "Head of Developer Relations",
    category: "Executive & Leadership",
    roleTag: "Community & API Adoption",
    blueprint: "silicon",
    font: "sans",
    accentHex: "#7c3aed",
    accentTailwind: "border-purple-600 text-purple-700",
    density: "normal",
    description: "Community evangelism metrics, SDK adoption curves, global developer conferences, and docs."
  },
  {
    id: "exec-14",
    name: "Chief Product & Tech Officer",
    category: "Executive & Leadership",
    roleTag: "CPTO / Unified Roadmap",
    blueprint: "executive",
    font: "sans",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "Unified leadership over software engineering, product strategy, and customer delight."
  },
  {
    id: "exec-15",
    name: "Operations & DevOps Director",
    category: "Executive & Leadership",
    roleTag: "Incident Escalation",
    blueprint: "metro",
    font: "sans",
    accentHex: "#059669",
    accentTailwind: "border-emerald-600 text-emerald-700",
    density: "compact",
    description: "Cross-department reliability governance, disaster recovery drills, and compliance standards."
  },
  {
    id: "exec-16",
    name: "Distinguished Architect",
    category: "Executive & Leadership",
    roleTag: "Patents & Patents/IP",
    blueprint: "compact",
    font: "mono",
    accentHex: "#334155",
    accentTailwind: "border-slate-700 text-slate-800",
    density: "compact",
    description: "Highlights patents, whitepapers, standard committee seats, and foundational frameworks."
  },
  {
    id: "exec-17",
    name: "VP of Quality & Compliance",
    category: "Executive & Leadership",
    roleTag: "ISO / FDA Standards",
    blueprint: "harvard",
    font: "serif",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "Rigorous corporate format for medical device, aerospace, or automotive software compliance."
  },
  {
    id: "exec-18",
    name: "Interim CTO / Fractional Leader",
    category: "Executive & Leadership",
    roleTag: "Turnaround Strategy",
    blueprint: "minimal",
    font: "sans",
    accentHex: "#d97706",
    accentTailwind: "border-amber-600 text-amber-700",
    density: "normal",
    description: "Rapid turnaround interventions, tech stack modernizations, and team audit reports."
  },
  {
    id: "exec-19",
    name: "General Manager (Tech BU)",
    category: "Executive & Leadership",
    roleTag: "P&L Ownership",
    blueprint: "executive",
    font: "editorial",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "Full P&L responsibility, gross margins, EBITDA improvements, and go-to-market execution."
  },
  {
    id: "exec-20",
    name: "Research Director (Applied AI)",
    category: "Executive & Leadership",
    roleTag: "Lab to Production",
    blueprint: "editorial",
    font: "serif",
    accentHex: "#1e3a8a",
    accentTailwind: "border-blue-900 text-blue-900",
    density: "normal",
    description: "Commercialization of breakthrough algorithms, university partnerships, and R&D pipelines."
  },

  // ==========================================
  // CATEGORY 3: PRODUCT & MANAGEMENT (18 Templates)
  // ==========================================
  {
    id: "prod-01",
    name: "Technical Product Manager",
    category: "Product & Management",
    roleTag: "API Products & Spec",
    blueprint: "silicon",
    font: "sans",
    accentHex: "#e11d48",
    accentTailwind: "border-rose-600 text-rose-700",
    density: "normal",
    description: "Bridges user stories with API contracts, database schema planning, and developer experience."
  },
  {
    id: "prod-02",
    name: "Growth Product Manager",
    category: "Product & Management",
    roleTag: "A/B Testing & Funnels",
    blueprint: "compact",
    font: "sans",
    accentHex: "#059669",
    accentTailwind: "border-emerald-600 text-emerald-700",
    density: "compact",
    description: "Highlights cohort retention improvements, signup funnel conversion lifts, and virality loops."
  },
  {
    id: "prod-03",
    name: "Group Product Manager",
    category: "Product & Management",
    roleTag: "Product Lines / PM Leads",
    blueprint: "executive",
    font: "sans",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "Mentoring junior PMs, multi-quarter roadmap prioritization, and business unit alignment."
  },
  {
    id: "prod-04",
    name: "Scrum Master & Agile Coach",
    category: "Product & Management",
    roleTag: "Velocity & Ceremonies",
    blueprint: "metro",
    font: "sans",
    accentHex: "#4f46e5",
    accentTailwind: "border-indigo-600 text-indigo-700",
    density: "normal",
    description: "Sprint burndown enhancements, cycle time cutbacks, and cross-functional team happiness."
  },
  {
    id: "prod-05",
    name: "SaaS B2B Product Specialist",
    category: "Product & Management",
    roleTag: "Enterprise Self-Serve",
    blueprint: "silicon",
    font: "sans",
    accentHex: "#0d9488",
    accentTailwind: "border-teal-600 text-teal-700",
    density: "normal",
    description: "Enterprise tier feature releases, SOC2 customer checklists, and churn reduction strategies."
  },
  {
    id: "prod-06",
    name: "Product Operations Lead",
    category: "Product & Management",
    roleTag: "Data Analytics & Rollouts",
    blueprint: "technical",
    font: "sans",
    accentHex: "#334155",
    accentTailwind: "border-slate-700 text-slate-800",
    density: "normal",
    description: "Beta release rollouts, feedback loop consolidation, Amplitude tracking, and user surveys."
  },
  {
    id: "prod-07",
    name: "Head of Product Strategy",
    category: "Product & Management",
    roleTag: "Market Sizing & TAM",
    blueprint: "editorial",
    font: "serif",
    accentHex: "#1e3a8a",
    accentTailwind: "border-blue-900 text-blue-900",
    density: "normal",
    description: "Competitive analysis, market sizing, pricing model overhauls, and corporate M&A reviews."
  },
  {
    id: "prod-08",
    name: "Design-Driven Product Manager",
    category: "Product & Management",
    roleTag: "Figma to Code",
    blueprint: "minimal",
    font: "sans",
    accentHex: "#e11d48",
    accentTailwind: "border-rose-600 text-rose-700",
    density: "normal",
    description: "Emphasizes usability testing, micro-interactions, aesthetic benchmarks, and CSAT scores."
  },
  {
    id: "prod-09",
    name: "FinTech Product Manager",
    category: "Product & Management",
    roleTag: "KYC & Open Banking",
    blueprint: "harvard",
    font: "serif",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "Bank rail integrations, card issuing, fraud rate reductions, and compliance audits."
  },
  {
    id: "prod-10",
    name: "AI & LLM Product Lead",
    category: "Product & Management",
    roleTag: "Prompt Eval & Latency",
    blueprint: "silicon",
    font: "mono",
    accentHex: "#7c3aed",
    accentTailwind: "border-purple-600 text-purple-700",
    density: "compact",
    description: "LLM guardrails, hallucination reduction metrics, user prompt feedback, and GPU costs."
  },
  {
    id: "prod-11",
    name: "Program Manager (Technical)",
    category: "Product & Management",
    roleTag: "Cross-Org Initiatives",
    blueprint: "metro",
    font: "sans",
    accentHex: "#059669",
    accentTailwind: "border-emerald-600 text-emerald-700",
    density: "compact",
    description: "Risk tracking matrices, launch readiness checklists, and stakeholder communication."
  },
  {
    id: "prod-12",
    name: "Mobile App Product Manager",
    category: "Product & Management",
    roleTag: "DAU / MAU / App Store",
    blueprint: "silicon",
    font: "sans",
    accentHex: "#d97706",
    accentTailwind: "border-amber-600 text-amber-700",
    density: "normal",
    description: "Push notification opt-ins, push engagement lifts, Apple store featured placements, and reviews."
  },
  {
    id: "prod-13",
    name: "E-Commerce Category PM",
    category: "Product & Management",
    roleTag: "Cart Conversion & AOV",
    blueprint: "compact",
    font: "sans",
    accentHex: "#e11d48",
    accentTailwind: "border-rose-600 text-rose-700",
    density: "compact",
    description: "Average order value increases, checkout drop-off eradication, and personalized search."
  },
  {
    id: "prod-14",
    name: "Healthcare Tech Product Lead",
    category: "Product & Management",
    roleTag: "HIPAA / Telehealth",
    blueprint: "harvard",
    font: "editorial",
    accentHex: "#0d9488",
    accentTailwind: "border-teal-600 text-teal-700",
    density: "normal",
    description: "EHR integrations, telehealth patient onboarding, clinical workflow ease, and privacy."
  },
  {
    id: "prod-15",
    name: "Platform Ecosystem PM",
    category: "Product & Management",
    roleTag: "Developer Marketplace",
    blueprint: "technical",
    font: "sans",
    accentHex: "#4f46e5",
    accentTailwind: "border-indigo-600 text-indigo-700",
    density: "normal",
    description: "Third-party app marketplace growth, developer revenue shares, and public API adoption."
  },
  {
    id: "prod-16",
    name: "Senior Delivery Manager",
    category: "Product & Management",
    roleTag: "Fixed Price & T&M",
    blueprint: "executive",
    font: "sans",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "Contractual delivery milestones, client change request control, and milestone billing."
  },
  {
    id: "prod-17",
    name: "Product Marketing Manager",
    category: "Product & Management",
    roleTag: "Go-to-Market / Sales Kits",
    blueprint: "minimal",
    font: "sans",
    accentHex: "#7c3aed",
    accentTailwind: "border-purple-600 text-purple-700",
    density: "normal",
    description: "Product hunt #1 launches, sales enablement one-pagers, webinar signups, and analyst briefings."
  },
  {
    id: "prod-18",
    name: "Chief Product Officer (CPO)",
    category: "Product & Management",
    roleTag: "Customer Obsession",
    blueprint: "executive",
    font: "serif",
    accentHex: "#1e3a8a",
    accentTailwind: "border-blue-900 text-blue-900",
    density: "normal",
    description: "Board-level product vision, NPS gains, multi-product portfolio expansion, and user love."
  },

  // ==========================================
  // CATEGORY 4: FINANCE, CORPORATE & CONSULTING (20 Templates)
  // ==========================================
  {
    id: "fin-01",
    name: "Investment Banking Analyst",
    category: "Finance & Corporate",
    roleTag: "LBO & DCF Valuation",
    blueprint: "harvard",
    font: "serif",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "Strict Ivy League serif standard favored by Goldman Sachs, Morgan Stanley, and top banks."
  },
  {
    id: "fin-02",
    name: "Private Equity Associate",
    category: "Finance & Corporate",
    roleTag: "Buyouts & Deal Flow",
    blueprint: "harvard",
    font: "editorial",
    accentHex: "#1e3a8a",
    accentTailwind: "border-blue-900 text-blue-900",
    density: "normal",
    description: "Highlights portfolio company EBITDA expansion, deal sourcing, and due diligence execution."
  },
  {
    id: "fin-03",
    name: "Management Consultant (MBB)",
    category: "Finance & Corporate",
    roleTag: "McKinsey / BCG Classic",
    blueprint: "harvard",
    font: "serif",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "Hypothesis-driven bullet points, cost reduction percentages, and C-suite strategy decks."
  },
  {
    id: "fin-04",
    name: "Quantitative Trader & Researcher",
    category: "Finance & Corporate",
    roleTag: "Alpha & Sharpe Ratio",
    blueprint: "technical",
    font: "mono",
    accentHex: "#059669",
    accentTailwind: "border-emerald-600 text-emerald-700",
    density: "compact",
    description: "Backtested strategy Sharpe ratios, statistical arbitrage, execution slippage, and C++ kernels."
  },
  {
    id: "fin-05",
    name: "Financial Controller & CPA",
    category: "Finance & Corporate",
    roleTag: "GAAP / Audit Readiness",
    blueprint: "harvard",
    font: "serif",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "Big 4 audit readiness, month-end close acceleration, internal controls, and SOX compliance."
  },
  {
    id: "fin-06",
    name: "Venture Capital Associate",
    category: "Finance & Corporate",
    roleTag: "Cap Tables & Due Diligence",
    blueprint: "silicon",
    font: "sans",
    accentHex: "#4f46e5",
    accentTailwind: "border-indigo-600 text-indigo-700",
    density: "normal",
    description: "Term sheet negotiation, deal pipeline sourcing, market maps, and portfolio founder support."
  },
  {
    id: "fin-07",
    name: "Corporate FP&A Manager",
    category: "Finance & Corporate",
    roleTag: "Variance & Rolling Forecast",
    blueprint: "metro",
    font: "sans",
    accentHex: "#334155",
    accentTailwind: "border-slate-700 text-slate-800",
    density: "normal",
    description: "Annual budgeting, monthly variance analysis, headcount forecasting, and executive reporting."
  },
  {
    id: "fin-08",
    name: "Risk Management & Compliance",
    category: "Finance & Corporate",
    roleTag: "Basel III & AML/KYC",
    blueprint: "harvard",
    font: "editorial",
    accentHex: "#dc2626",
    accentTailwind: "border-red-600 text-red-700",
    density: "normal",
    description: "Capital adequacy requirements, fraud risk matrices, AML investigations, and regulator filings."
  },
  {
    id: "fin-09",
    name: "Chief Financial Officer (CFO)",
    category: "Finance & Corporate",
    roleTag: "Capital Allocation & IPO",
    blueprint: "executive",
    font: "serif",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "IPO debt structuring, credit facility negotiation, working capital optimization, and investor calls."
  },
  {
    id: "fin-10",
    name: "Corporate Development & M&A",
    category: "Finance & Corporate",
    roleTag: "Synergy Realization",
    blueprint: "harvard",
    font: "serif",
    accentHex: "#1e3a8a",
    accentTailwind: "border-blue-900 text-blue-900",
    density: "normal",
    description: "Acquisition target screening, post-merger integration milestones, and financial modelling."
  },
  {
    id: "fin-11",
    name: "Equity Research Analyst",
    category: "Finance & Corporate",
    roleTag: "Earnings & Price Target",
    blueprint: "editorial",
    font: "editorial",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "Sector initiation coverage, financial models, institutional client briefings, and ratings."
  },
  {
    id: "fin-12",
    name: "Credit Analyst & Underwriter",
    category: "Finance & Corporate",
    roleTag: "Commercial Lending",
    blueprint: "harvard",
    font: "serif",
    accentHex: "#334155",
    accentTailwind: "border-slate-700 text-slate-800",
    density: "normal",
    description: "Debt service coverage ratios, collateral appraisals, covenant compliance, and risk ratings."
  },
  {
    id: "fin-13",
    name: "Tax Strategy & Advisory",
    category: "Finance & Corporate",
    roleTag: "Transfer Pricing & Cross-Border",
    blueprint: "harvard",
    font: "serif",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "R&D tax credits, cross-border corporate structure optimization, and audit defense."
  },
  {
    id: "fin-14",
    name: "Treasury & Cash Management",
    category: "Finance & Corporate",
    roleTag: "FX Hedging & Liquidity",
    blueprint: "metro",
    font: "sans",
    accentHex: "#059669",
    accentTailwind: "border-emerald-600 text-emerald-700",
    density: "normal",
    description: "Foreign exchange forwards, short-term money market returns, and automated cash sweeps."
  },
  {
    id: "fin-15",
    name: "Actuarial Science & Insurance",
    category: "Finance & Corporate",
    roleTag: "Loss Reserves & Modeling",
    blueprint: "technical",
    font: "mono",
    accentHex: "#1e3a8a",
    accentTailwind: "border-blue-900 text-blue-900",
    density: "compact",
    description: "Stochastic loss reserve modeling, premium rate adjustments, and catastrophic risk simulations."
  },
  {
    id: "fin-16",
    name: "Operations & Supply Chain Lead",
    category: "Finance & Corporate",
    roleTag: "Inventory Turns & 3PL",
    blueprint: "compact",
    font: "sans",
    accentHex: "#d97706",
    accentTailwind: "border-amber-600 text-amber-700",
    density: "compact",
    description: "Freight cost reductions, inventory turn velocity, warehouse 3PL negotiation, and order fulfillment."
  },
  {
    id: "fin-17",
    name: "Chief of Staff to CEO",
    category: "Finance & Corporate",
    roleTag: "Strategic Initiatives",
    blueprint: "minimal",
    font: "sans",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "Executive decision frameworks, quarterly OKR synchronization, and special board initiatives."
  },
  {
    id: "fin-18",
    name: "Real Estate & Asset Manager",
    category: "Finance & Corporate",
    roleTag: "NOI & Cap Rates",
    blueprint: "harvard",
    font: "editorial",
    accentHex: "#334155",
    accentTailwind: "border-slate-700 text-slate-800",
    density: "normal",
    description: "Net operating income expansion, commercial lease negotiation, and debt refinancing."
  },
  {
    id: "fin-19",
    name: "Sustainability & ESG Specialist",
    category: "Finance & Corporate",
    roleTag: "Carbon Audits & CSRD",
    blueprint: "metro",
    font: "sans",
    accentHex: "#059669",
    accentTailwind: "border-emerald-600 text-emerald-700",
    density: "normal",
    description: "Scope 1/2/3 carbon footprint accounting, green bond compliance, and corporate ESG reporting."
  },
  {
    id: "fin-20",
    name: "Legal Counsel & Tech Contracts",
    category: "Finance & Corporate",
    roleTag: "SaaS MSAs & Privacy",
    blueprint: "harvard",
    font: "serif",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "Master services agreements, GDPR/CCPA data processing addendums, and IP licensing."
  },

  // ==========================================
  // CATEGORY 5: FRESHERS, STUDENTS & INTERNS (17 Templates)
  // ==========================================
  {
    id: "fresh-01",
    name: "Computer Science New Grad",
    category: "Freshers & Interns",
    roleTag: "B.Tech / 0-1 Yrs Exp",
    blueprint: "compact",
    font: "sans",
    accentHex: "#e11d48",
    accentTailwind: "border-rose-600 text-rose-700",
    density: "compact",
    description: "Front-loads coding projects, LeetCode rank, coursework, and college GPA in a crisp 1-page design."
  },
  {
    id: "fresh-02",
    name: "Coding Bootcamp Graduate",
    category: "Freshers & Interns",
    roleTag: "Project-Heavy Portfolio",
    blueprint: "silicon",
    font: "sans",
    accentHex: "#4f46e5",
    accentTailwind: "border-indigo-600 text-indigo-700",
    density: "normal",
    description: "Emphasizes live full-stack deployed web apps, GitHub repos, and intensive modern tech stacks."
  },
  {
    id: "fresh-03",
    name: "Software Engineering Intern",
    category: "Freshers & Interns",
    roleTag: "Summer Internship Ready",
    blueprint: "compact",
    font: "sans",
    accentHex: "#059669",
    accentTailwind: "border-emerald-600 text-emerald-700",
    density: "compact",
    description: "Clean, punchy single-page format showcasing academic hackathons, algorithms, and projects."
  },
  {
    id: "fresh-04",
    name: "Career Transition to Tech",
    category: "Freshers & Interns",
    roleTag: "Transferable Skills",
    blueprint: "minimal",
    font: "sans",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "Seamlessly highlights previous professional achievements alongside newly acquired software skills."
  },
  {
    id: "fresh-05",
    name: "Data Science & Kaggle Competitor",
    category: "Freshers & Interns",
    roleTag: "Jupyter / Pandas",
    blueprint: "technical",
    font: "mono",
    accentHex: "#0d9488",
    accentTailwind: "border-teal-600 text-teal-700",
    density: "compact",
    description: "Spotlights Kaggle rankings, exploratory data analysis dashboards, and machine learning notebooks."
  },
  {
    id: "fresh-06",
    name: "Open Source Contributor Junior",
    category: "Freshers & Interns",
    roleTag: "Git / PRs Merged",
    blueprint: "silicon",
    font: "mono",
    accentHex: "#334155",
    accentTailwind: "border-slate-700 text-slate-800",
    density: "compact",
    description: "Highlights merged pull requests in recognized open source repos and collaboration discipline."
  },
  {
    id: "fresh-07",
    name: "Junior Frontend Developer",
    category: "Freshers & Interns",
    roleTag: "HTML / CSS / JavaScript",
    blueprint: "minimal",
    font: "sans",
    accentHex: "#e11d48",
    accentTailwind: "border-rose-600 text-rose-700",
    density: "normal",
    description: "Responsive web projects, CSS flexbox/grid proficiency, and API consumption examples."
  },
  {
    id: "fresh-08",
    name: "Junior Backend Developer",
    category: "Freshers & Interns",
    roleTag: "Node / Express / SQL",
    blueprint: "technical",
    font: "sans",
    accentHex: "#4f46e5",
    accentTailwind: "border-indigo-600 text-indigo-700",
    density: "compact",
    description: "CRUD API designs, database normalization, authentication flows, and unit tests."
  },
  {
    id: "fresh-09",
    name: "Robotics & Hardware Student",
    category: "Freshers & Interns",
    roleTag: "Arduino / ROS / C++",
    blueprint: "editorial",
    font: "serif",
    accentHex: "#1e3a8a",
    accentTailwind: "border-blue-900 text-blue-900",
    density: "normal",
    description: "College robotics lab projects, microcontrollers, sensor calibration, and hardware builds."
  },
  {
    id: "fresh-10",
    name: "Business Analyst Trainee",
    category: "Freshers & Interns",
    roleTag: "Excel / SQL / Tableau",
    blueprint: "metro",
    font: "sans",
    accentHex: "#059669",
    accentTailwind: "border-emerald-600 text-emerald-700",
    density: "normal",
    description: "Advanced Excel VLOOKUP/pivot tables, SQL queries, dashboard creation, and insights delivery."
  },
  {
    id: "fresh-11",
    name: "Hackathon Winner Entry",
    category: "Freshers & Interns",
    roleTag: "1st Place Trophy / 36h",
    blueprint: "silicon",
    font: "sans",
    accentHex: "#d97706",
    accentTailwind: "border-amber-600 text-amber-700",
    density: "normal",
    description: "Prominently showcases hackathon victories, fast prototyping velocity, and sponsor award trophies."
  },
  {
    id: "fresh-12",
    name: "UI/UX Design Graduate",
    category: "Freshers & Interns",
    roleTag: "Figma Case Studies",
    blueprint: "minimal",
    font: "sans",
    accentHex: "#7c3aed",
    accentTailwind: "border-purple-600 text-purple-700",
    density: "normal",
    description: "Design system components, wireframe usability tests, mobile app mockups, and portfolio URLs."
  },
  {
    id: "fresh-13",
    name: "IT Support & Helpdesk Junior",
    category: "Freshers & Interns",
    roleTag: "Active Directory / Linux",
    blueprint: "metro",
    font: "sans",
    accentHex: "#334155",
    accentTailwind: "border-slate-700 text-slate-800",
    density: "normal",
    description: "Ticket resolution velocity, hardware troubleshooting, Active Directory user setup, and VPNs."
  },
  {
    id: "fresh-14",
    name: "Digital Marketing Trainee",
    category: "Freshers & Interns",
    roleTag: "SEO / Google Ads / Meta",
    blueprint: "silicon",
    font: "sans",
    accentHex: "#e11d48",
    accentTailwind: "border-rose-600 text-rose-700",
    density: "normal",
    description: "Organic search ranking boosts, ad campaign ROAS tests, social growth, and newsletter open rates."
  },
  {
    id: "fresh-15",
    name: "Master's Graduate (MS in CS)",
    category: "Freshers & Interns",
    roleTag: "Thesis & Research Papers",
    blueprint: "harvard",
    font: "serif",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "Master's thesis defense, graduate lab projects, algorithmic complexity, and academic research."
  },
  {
    id: "fresh-16",
    name: "Junior Cloud Practitioner",
    category: "Freshers & Interns",
    roleTag: "AWS Certified / Terraform",
    blueprint: "technical",
    font: "sans",
    accentHex: "#0d9488",
    accentTailwind: "border-teal-600 text-teal-700",
    density: "compact",
    description: "Entry-level AWS certifications, S3/EC2 setup scripts, and automated serverless lambda functions."
  },
  {
    id: "fresh-17",
    name: "Technical Content Writer",
    category: "Freshers & Interns",
    roleTag: "Dev Docs & Tutorials",
    blueprint: "editorial",
    font: "editorial",
    accentHex: "#0f172a",
    accentTailwind: "border-slate-900 text-slate-950",
    density: "normal",
    description: "High-traffic developer blog articles, API documentation walkthroughs, and tutorial readability."
  }
];
