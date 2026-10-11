import { Job } from "./types";

export const INITIAL_JOBS: Job[] = [
  {
    id: "job-1",
    title: "Senior Full Stack Engineer (Next.js + TypeScript)",
    company: "Cal.com",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&h=120&fit=crop",
    location: "Remote (Worldwide)",
    type: "Full-Time",
    category: "Engineering",
    salary: "$90,000 - $130,000 / yr",
    skills: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    description: "Join the open-source scheduling infrastructure of the internet. You will be building user-facing scheduling experiences, API integrations, and scaling our infrastructure.",
    responsibilities: [
      "Architect and ship core features across our Next.js web application and embed widgets.",
      "Optimize API endpoints and database queries for 2M+ monthly bookings.",
      "Work directly with community contributors and review open-source pull requests."
    ],
    requirements: [
      "4+ years building high-quality web apps with React and TypeScript.",
      "Proven experience with server-side rendering, Next.js App Router, and SQL.",
      "Self-directed worker capable of thriving in a distributed, async team."
    ],
    applyUrl: "https://cal.com/careers",
    postedAt: "2 hours ago",
    featured: true,
    highlighted: true,
    applicantsCount: 18,
    maxApplicants: 50,
    contactEmail: "peer@cal.com"
  },
  {
    id: "job-2",
    title: "Backend Engineer (Go / Python Systems)",
    company: "Zerodha",
    companyLogo: "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=120&h=120&fit=crop",
    location: "Bengaluru, India (Remote OK)",
    type: "Full-Time",
    category: "Engineering",
    salary: "₹22,00,000 - ₹35,00,000 / yr",
    skills: ["Go", "Python", "PostgreSQL", "Redis", "Kafka", "Linux"],
    description: "We process over 15% of all Indian stock retail volumes daily. We write small, fast, minimalist code without bloated frameworks.",
    responsibilities: [
      "Build high-throughput, low-latency microservices for order routing and risk management.",
      "Tune database performance handling millions of concurrent financial transactions.",
      "Contribute to in-house FOSS tooling and automated deployment pipelines."
    ],
    requirements: [
      "Deep understanding of Linux internals, networking, and concurrency.",
      "2+ years experience in Golang or Python systems programming.",
      "Obsession with performance and clean, dependency-free code."
    ],
    applyUrl: "https://zerodha.tech",
    postedAt: "4 hours ago",
    featured: true,
    applicantsCount: 31,
    maxApplicants: 50,
    contactEmail: "tech-hiring@zerodha.com"
  },
  {
    id: "job-3",
    title: "Junior Frontend Developer (0-2 Yrs Experience)",
    company: "Razorpay",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&h=120&fit=crop",
    location: "Remote (India)",
    type: "Full-Time",
    category: "Freshers",
    salary: "₹12,00,000 - ₹18,00,000 / yr",
    skills: ["React", "JavaScript", "CSS3", "REST APIs", "Git"],
    description: "Looking for hungry, fast-learning engineers with strong JavaScript fundamentals. You'll work on checkout pages viewed by millions of Indians every day.",
    responsibilities: [
      "Build and maintain responsive merchant dashboard components.",
      "Collaborate with senior designers to implement pixel-perfect user flows.",
      "Write unit tests and benchmark sub-second load times."
    ],
    requirements: [
      "0 to 2 years of professional software development experience.",
      "Solid knowledge of JavaScript ES6+, DOM manipulation, and React hooks.",
      "Showcase of 2+ live personal projects or open-source contributions."
    ],
    applyUrl: "https://razorpay.com/jobs",
    postedAt: "6 hours ago",
    featured: false,
    applicantsCount: 42,
    maxApplicants: 50,
    contactEmail: "earlycareers@razorpay.com"
  },
  {
    id: "job-4",
    title: "Product Designer (UI / UX Systems)",
    company: "Linear",
    companyLogo: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=120&h=120&fit=crop",
    location: "Remote (Worldwide)",
    type: "Full-Time",
    category: "Design",
    salary: "$110,000 - $155,000 / yr",
    skills: ["Figma", "Design Systems", "Prototyping", "UI/UX", "Micro-interactions"],
    description: "Linear is known for its speed, craft, and attention to detail. We are looking for an exceptional product designer to shape our next generation of team collaboration tools.",
    responsibilities: [
      "Lead end-to-end design for new project management workflows from concept to release.",
      "Craft fluid keyboard shortcuts, interactions, and aesthetic component libraries.",
      "Partner with engineers in code to ensure zero fidelity loss in production."
    ],
    requirements: [
      "Portfolio demonstrating craft, typography, layout, and complex software UX.",
      "Proficiency in Figma and interactive prototyping tools.",
      "Ability to think from first principles and question standard design patterns."
    ],
    applyUrl: "https://linear.app/careers",
    postedAt: "1 day ago",
    featured: true,
    highlighted: true,
    applicantsCount: 23,
    maxApplicants: 50,
    contactEmail: "karri@linear.app"
  },
  {
    id: "job-5",
    title: "Growth & Product Marketing Lead",
    company: "Supabase",
    companyLogo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=120&h=120&fit=crop",
    location: "Remote (Worldwide)",
    type: "Full-Time",
    category: "Marketing",
    salary: "$85,000 - $125,000 / yr",
    skills: ["Developer Marketing", "Content Strategy", "SEO", "Analytics", "Launch Weeks"],
    description: "The open source Firebase alternative. Help us scale our global developer audience through technical storytelling, launch weeks, and community viral loops.",
    responsibilities: [
      "Own product launch campaigns, blog tutorials, and developer community updates.",
      "Analyze signup funnels and optimize onboarding conversion rates.",
      "Collaborate with developer advocates to produce viral educational content."
    ],
    requirements: [
      "Proven track record in technical product marketing or developer evangelism.",
      "Strong understanding of databases, cloud architecture, and open-source ecosystems.",
      "Exceptional writing and meme-crafting abilities."
    ],
    applyUrl: "https://supabase.com/careers",
    postedAt: "1 day ago",
    featured: false,
    applicantsCount: 19,
    maxApplicants: 50,
    contactEmail: "growth@supabase.io"
  },
  {
    id: "job-6",
    title: "Full Stack AI Engineer (LLM Workflows)",
    company: "Resend",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&h=120&fit=crop",
    location: "Remote (Worldwide)",
    type: "Full-Time",
    category: "Engineering",
    salary: "$100,000 - $140,000 / yr",
    skills: ["Python", "FastAPI", "OpenAI API", "TypeScript", "React", "Vector DBs"],
    description: "Email infrastructure built for developers. We are launching intelligent email delivery diagnostics, automated categorization, and spam prevention using LLMs.",
    responsibilities: [
      "Design and deploy production LLM pipelines for real-time email deliverability scoring.",
      "Build sleek developer dashboards using React and Tailwind.",
      "Keep latency below 200ms on millions of daily automated evaluations."
    ],
    requirements: [
      "Hands-on experience deploying LLM/AI applications in production.",
      "Solid full stack foundations in TypeScript/React and Python.",
      "Obsessive attention to developer experience and clean documentation."
    ],
    applyUrl: "https://resend.com/careers",
    postedAt: "2 days ago",
    featured: true,
    applicantsCount: 28,
    maxApplicants: 50,
    contactEmail: "zeno@resend.com"
  },
  {
    id: "job-7",
    title: "Junior Data Analyst / BI Specialist (0-1 Yr)",
    company: "Swiggy",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&h=120&fit=crop",
    location: "Remote / Hybrid (India)",
    type: "Full-Time",
    category: "Freshers",
    salary: "₹9,00,000 - ₹14,00,000 / yr",
    skills: ["SQL", "Python", "PowerBI", "Excel", "Data Modeling"],
    description: "Join the delivery analytics wing. Help optimize 10-minute delivery routing and customer retention models using real-time spatial and transactional data.",
    responsibilities: [
      "Write complex SQL queries across BigQuery and Snowflake warehouses.",
      "Build automated KPI monitoring dashboards for city ops managers.",
      "Conduct exploratory cohort analysis to identify delivery bottleneck patterns."
    ],
    requirements: [
      "Degree in Engineering, Math, Economics, or practical data bootcamp graduate.",
      "High fluency in SQL and Python data libraries (Pandas, NumPy).",
      "Curious problem solver with quick turnaround on ad-hoc analytical queries."
    ],
    applyUrl: "https://swiggy.com/careers",
    postedAt: "2 days ago",
    featured: false,
    applicantsCount: 38,
    maxApplicants: 50,
    contactEmail: "analytics-talent@swiggy.in"
  },
  {
    id: "job-8",
    title: "Technical Content Creator & Community Manager",
    company: "Postman",
    companyLogo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=120&h=120&fit=crop",
    location: "Remote (India / Global)",
    type: "Full-Time",
    category: "Marketing",
    salary: "₹14,00,000 - ₹22,00,000 / yr",
    skills: ["API Testing", "Technical Writing", "YouTube / Loom", "Twitter / LinkedIn", "JavaScript"],
    description: "Postman has 30 million developers. We want a dynamic technical creator to produce API tutorials, short videos, and live workshops.",
    responsibilities: [
      "Create high-signal technical video guides and short tutorials around API workflows.",
      "Engage daily on developer Twitter, Discord, and Reddit with helpful insights.",
      "Host monthly community workshops and interview top API builders."
    ],
    requirements: [
      "Ability to code basic JavaScript and call REST/GraphQL APIs.",
      "Proven public portfolio (blog, YouTube channel, technical Twitter/LinkedIn presence).",
      "Energetic communication and high empathy for developers."
    ],
    applyUrl: "https://postman.com/careers",
    postedAt: "3 days ago",
    featured: false,
    applicantsCount: 15,
    maxApplicants: 50,
    contactEmail: "devrel@postman.com"
  }
];
