import { StaticImageData } from "next/image";
import aiAgentsImg from "@/assets/services/ai-agents.jpeg";
import saasMvpImg from "@/assets/services/saas-mvp.jpeg";
import webDevImg from "@/assets/services/web-dev.jpeg";
import uiUxImg from "@/assets/services/ui-ux.jpeg";

export interface ServiceFeature {
  title: string;
  description: string;
  tag: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  timeline: string;
  description: string;
  deliverables: string[];
}

export interface ServiceTech {
  name: string;
  category: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  tagline: string;
  description: string;
  fullOverview: string;
  duration: string;
  stack: string;
  deliverables: string;
  image: StaticImageData;
  badge?: string;
  highlights: string[];
  features: ServiceFeature[];
  process: ServiceProcessStep[];
  techStack: ServiceTech[];
  idealFor: string[];
  faqs: ServiceFaq[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: "design-services",
    title: "DESIGN SERVICES",
    shortTitle: "Design Systems & UI/UX",
    subtitle: "High-Fidelity UI/UX & Interactive Design Systems",
    tagline: "Crafting intuitive, pixel-perfect digital experiences that captivate users and convert visitors into loyal customers.",
    description: "Our professional design experts can help you craft pixel-perfect wireframes, design systems, and responsive interactive prototypes for your project.",
    fullOverview: "We bridge the gap between abstract product ideas and high-fidelity user experiences. Through meticulous research, ergonomic user journey mapping, and cutting-edge visual systems, we engineer interfaces that not only look visually stunning but also solve real business problems, reduce churn, and drive organic product adoption.",
    duration: "2 WEEKS",
    stack: "FIGMA / THREEJS / TAILWIND",
    deliverables: "COMPREHENSIVE DESIGN SYSTEM & PROTOTYPES",
    image: uiUxImg,
    highlights: [
      "Pixel-perfect Figma auto-layout design files",
      "Comprehensive design token library (colors, typography, spacing)",
      "Fully interactive micro-prototypes for user testing",
      "Developer-ready CSS & Tailwind design spec handoff",
    ],
    features: [
      {
        title: "High-Fidelity Wireframing & Prototyping",
        description: "Click-through prototypes that test user journeys and product flows before writing a single line of code, saving weeks of engineering rework.",
        tag: "UX ARCHITECTURE",
      },
      {
        title: "Scalable Design System & Token Library",
        description: "Component libraries with variants, auto-layout, atomic typography scales, and unified color tokens that scale across web and mobile platforms.",
        tag: "SYSTEM DESIGN",
      },
      {
        title: "Fluid Micro-Animations & Interactions",
        description: "Engaging feedback loops, hover states, scroll choreography, and tactile cursor physics that elevate software from functional to unforgettable.",
        tag: "INTERACTIVE FX",
      },
      {
        title: "Conversion-Focused UX Audits",
        description: "Data-driven heuristic analysis and user flow restructuring to eliminate friction points in onboarding, checkout, and core product usage.",
        tag: "GROWTH & RETENTION",
      },
    ],
    process: [
      {
        step: "PHASE 01",
        title: "Discovery & User Journey Architecture",
        timeline: "Days 1 - 3",
        description: "Deep dive into your product vision, target customer personas, competitive landscape, and user journey flows.",
        deliverables: ["Product flow map", "Moodboard & aesthetic direction", "Information architecture diagram"],
      },
      {
        step: "PHASE 02",
        title: "Wireframing & Structural UX",
        timeline: "Days 4 - 7",
        description: "Crafting grayscale layouts to establish information hierarchy, navigation patterns, and core screen layouts without visual distractions.",
        deliverables: ["Low-fidelity interactive wireframes", "User journey validation", "Navigation hierarchy"],
      },
      {
        step: "PHASE 03",
        title: "High-Fidelity Design & Systems",
        timeline: "Days 8 - 11",
        description: "Applying bespoke cyberpunk/modern typography, vibrant theme accents, iconography, dark/light variations, and custom illustrations.",
        deliverables: ["Full high-res Figma screen suite", "Reusable component library", "Micro-interaction specs"],
      },
      {
        step: "PHASE 04",
        title: "Interactive Prototype & Dev Handoff",
        timeline: "Days 12 - 14",
        description: "Assembling the clickable prototype for stakeholders and preparing pixel-perfect assets, Tailwind variables, and developer documentation.",
        deliverables: ["Interactive Figma prototype", "Production-ready SVG icons", "Tailwind config & CSS spec tokens"],
      },
    ],
    techStack: [
      { name: "Figma", category: "Core Design & Prototyping" },
      { name: "Three.js", category: "3D Visual Web Assets" },
      { name: "Tailwind CSS", category: "Token Architecture" },
      { name: "Framer Motion", category: "Interaction Physics" },
      { name: "Spline", category: "3D Interactive Models" },
    ],
    idealFor: [
      "Early-stage founders needing investor-ready prototypes before development",
      "SaaS teams with outdated, clunky interfaces needing modern redesigns",
      "High-growth startups establishing a unified, multi-platform design system",
      "Products struggling with low activation rates or confusing user onboarding",
    ],
    faqs: [
      {
        question: "What files do I receive upon project completion?",
        answer: "You receive an organized Figma master file with auto-layout components, variant states, color/typography tokens, exportable production assets (SVG/PNG), and interactive prototypes.",
      },
      {
        question: "Do you design responsive layouts for mobile and tablet?",
        answer: "Yes, all screen flows are designed with responsive layouts ensuring a consistent, beautiful experience on smartphones, tablets, and wide desktop screens.",
      },
      {
        question: "Can your team also code the frontend after designing?",
        answer: "Absolutely! We specialize in bridging design and code. You can seamlessly transition from our Design Service into full-stack development with Next.js and Tailwind.",
      },
    ],
  },
  {
    id: "ai-services",
    title: "AI & AUTOMATION SERVICES",
    shortTitle: "Autonomous AI Agents & RAG",
    subtitle: "Custom Autonomous AI Agents, RAG Pipelines & Automations",
    tagline: "Custom autonomous AI agents, RAG architectures, LLM fine-tuning, and intelligent workflow automations built to save hundreds of hours.",
    description: "Custom autonomous AI agents, RAG architectures, LLM fine-tuning, and intelligent workflow automations built to save hundreds of hours.",
    fullOverview: "We architect production-grade artificial intelligence solutions that go beyond simple chat interfaces. From multi-agent coordination systems (LangGraph / CrewAI) that execute end-to-end business operations, to enterprise Retrieval-Augmented Generation (RAG) pipelines that converse with your private knowledge bases with zero hallucination, we build AI that generates tangible business ROI.",
    duration: "3 WEEKS",
    stack: "PYTHON / LANGCHAIN / OPENAI / VECTOR DB",
    deliverables: "CUSTOM AI AGENTS & RAG PIPELINES",
    image: aiAgentsImg,
    highlights: [
      "Custom multi-agent orchestration with memory & tool calling",
      "Enterprise RAG architecture with semantic chunking & reranking",
      "Autonomous automated workflows connecting CRMs, Slack, and APIs",
      "Sub-second streaming API endpoints with telemetry logging",
    ],
    features: [
      {
        title: "Autonomous Multi-Agent Systems",
        description: "Specialized AI agents that reason, plan, self-correct, and call external APIs to accomplish multi-step goals autonomously.",
        tag: "AGENTIC WORKFLOWS",
      },
      {
        title: "High-Accuracy RAG Pipelines",
        description: "Retrieval-Augmented Generation leveraging hybrid search (dense + sparse vector search) and cross-encoder rerankers for precise answers.",
        tag: "KNOWLEDGE ENGINES",
      },
      {
        title: "Intelligent Tool & API Integrations",
        description: "Empowering models to interact directly with internal databases, web search engines, Stripe, GitHub, Notion, and email services.",
        tag: "API TOOLING",
      },
      {
        title: "Evaluation & Guardrail Architecture",
        description: "Comprehensive automated evaluation benches (Ragas, TruLens) ensuring output consistency, latency adherence, and safety guardrails.",
        tag: "EVALS & SAFETY",
      },
    ],
    process: [
      {
        step: "PHASE 01",
        title: "Agent Blueprint & Data Scoping",
        timeline: "Week 1",
        description: "Analyzing target workflows, defining agent role boundaries, tool access requirements, and structuring raw data sources.",
        deliverables: ["Architecture specification", "Data schema & ingestion plan", "Evaluation benchmark criteria"],
      },
      {
        step: "PHASE 02",
        title: "Vector Embeddings & Retrieval Pipeline",
        timeline: "Week 2 (Early)",
        description: "Setting up vector databases (Pinecone, Qdrant, or pgvector), configuring semantic chunking, and establishing real-time index sync.",
        deliverables: ["Vector database infrastructure", "Document ingestion pipeline", "Semantic search test suite"],
      },
      {
        step: "PHASE 03",
        title: "Agent Reasoning & Tool Calling",
        timeline: "Week 2 (Late) - Week 3",
        description: "Developing agent state machines using LangGraph, implementing tool integration, memory recall, and deterministic output schemas.",
        deliverables: ["Core agent orchestrator", "Custom tool connectors", "Structured JSON output parser"],
      },
      {
        step: "PHASE 04",
        title: "Deployment, Telemetry & Guardrails",
        timeline: "Week 3",
        description: "Deploying high-speed streaming APIs with token rate-limiting, error fallbacks, and real-time monitoring via LangSmith.",
        deliverables: ["Production REST / WebSocket API", "Telemetry dashboard setup", "Handover documentation & code repository"],
      },
    ],
    techStack: [
      { name: "Python / FastAPI", category: "Backend Engine" },
      { name: "LangChain & LangGraph", category: "Agent Orchestration" },
      { name: "OpenAI / Claude / Gemini", category: "Foundation Models" },
      { name: "Pinecone / Qdrant", category: "Vector Store" },
      { name: "LangSmith", category: "Tracing & Evals" },
    ],
    idealFor: [
      "Companies wanting to automate complex customer support or back-office tasks",
      "SaaS founders integrating proprietary AI capabilities into their core app",
      "Teams seeking secure, private document querying across thousands of internal PDFs",
      "Businesses looking to replace fragile Zapier scripts with intelligent self-healing agents",
    ],
    faqs: [
      {
        question: "How do you prevent AI hallucinations?",
        answer: "We utilize rigorous Retrieval-Augmented Generation (RAG) with ground-truth citations, strict temperature settings, cross-encoder rerankers, and structured validation layers (Pydantic/Zod) so the model only answers based on provided documents.",
      },
      {
        question: "Is our private business data secure and confidential?",
        answer: "Yes. We configure zero-data-retention API agreements with providers, implement encrypted vector databases, and can deploy models completely inside your private cloud (AWS/GCP/Azure) or on-premise.",
      },
      {
        question: "Can the AI agent execute actions like sending emails or updating databases?",
        answer: "Yes! Using secure function calling and tool interfaces, the agent can safely draft emails, create database rows, query APIs, or trigger external webhooks with optional human-in-the-loop approvals.",
      },
    ],
  },
  {
    id: "saas-services",
    title: "SAAS MVP SERVICES",
    shortTitle: "Full-Stack SaaS MVP",
    subtitle: "Turnkey SaaS MVP Development from Wireframe to Revenue",
    tagline: "Production-ready SaaS platforms engineered from wireframe to launch with multi-tenant auth, billing, and scalable database infrastructure.",
    description: "Production-ready SaaS platforms engineered from wireframe to launch with multi-tenant auth, billing, and scalable database infrastructure.",
    fullOverview: "We build complete, production-grade Software-as-a-Service (SaaS) products that are engineered to convert, scale, and generate revenue on day one. From multi-tenant organization management and role-based permissions to rock-solid Stripe subscription billing and ultra-responsive analytics dashboards, we transform your idea into a deployed, scalable web business.",
    duration: "4 WEEKS",
    stack: "NEXT.JS / POSTGRES / PRISMA / STRIPE",
    deliverables: "PRODUCTION SAAS WEB APP",
    image: saasMvpImg,
    highlights: [
      "Complete multi-tenant workspace & organization switching",
      "Stripe / LemonSqueezy subscription tiers, coupons & customer portal",
      "Ultra-fast server-rendered Next.js 14/15 App Router architecture",
      "Scalable PostgreSQL database with migrations & type-safe ORM",
    ],
    features: [
      {
        title: "Enterprise Multi-Tenant Authentication",
        description: "Social login, magic links, session management, and organization workspace switching with granular role-based access control (RBAC).",
        tag: "AUTH & SECURITY",
      },
      {
        title: "Turnkey Subscription & Billing Engine",
        description: "Seamless Stripe integration supporting monthly/yearly tiers, metered usage, automatic tax handling, and customer self-serve billing portals.",
        tag: "PAYMENTS & STRIPE",
      },
      {
        title: "Dynamic Admin & Customer Dashboards",
        description: "Responsive dashboards featuring live data graphs, filtering, bulk CSV export/import, optimistic UI mutations, and sub-100ms load times.",
        tag: "DASHBOARD ARCHITECTURE",
      },
      {
        title: "Transactional Emails & Notification System",
        description: "Branded transactional email delivery via Resend/React Email for welcome series, password resets, payment alerts, and team invites.",
        tag: "NOTIFICATIONS",
      },
    ],
    process: [
      {
        step: "PHASE 01",
        title: "Architecture & Data Modeling",
        timeline: "Week 1",
        description: "Scoping core features, defining entity relationship diagrams (ERD), API endpoints, and wireframing user flows.",
        deliverables: ["Database schema design", "API spec & architecture document", "Component hierarchy plan"],
      },
      {
        step: "PHASE 02",
        title: "Authentication, Database & Core Backend",
        timeline: "Week 2",
        description: "Implementing PostgreSQL schema migrations, Prisma/Drizzle ORM setup, auth workflows, and organization multi-tenancy.",
        deliverables: ["Functional auth flow", "Database seed scripts", "Protected server actions & API routes"],
      },
      {
        step: "PHASE 03",
        title: "Frontend Dashboards & Stripe Billing",
        timeline: "Week 3",
        description: "Developing high-fidelity responsive UI, real-time charts, table filters, Stripe checkout webhooks, and billing portals.",
        deliverables: ["Dashboard UI complete", "Stripe subscription webhooks integrated", "Settings & profile management"],
      },
      {
        step: "PHASE 04",
        title: "Testing, Launch & Vercel Deployment",
        timeline: "Week 4",
        description: "Comprehensive end-to-end testing, SEO meta tags, OpenGraph previews, performance tuning, and CI/CD production rollout.",
        deliverables: ["Deployed live production application", "Clean Git repository", "Administrator onboarding documentation"],
      },
    ],
    techStack: [
      { name: "Next.js 14 / 15", category: "Full-Stack Framework" },
      { name: "PostgreSQL", category: "Primary Database" },
      { name: "Prisma / Drizzle", category: "Type-Safe ORM" },
      { name: "Stripe", category: "Subscription Billing" },
      { name: "Tailwind CSS & Radix UI", category: "Component Library" },
    ],
    idealFor: [
      "Entrepreneurs launching a new venture who need to get to market in under 30 days",
      "Non-technical founders looking for a reliable technical partner to build their MVP",
      "Existing businesses expanding into digital subscription revenue streams",
      "Startups replacing outdated legacy software with a slick modern web application",
    ],
    faqs: [
      {
        question: "Do I own 100% of the code and intellectual property?",
        answer: "Yes, 100%. All source code, Git repositories, designs, and database assets are transferred entirely to your organization with zero licensing strings attached.",
      },
      {
        question: "How do you handle hosting and cloud infrastructure?",
        answer: "We deploy onto modern, cost-effective infrastructure like Vercel or AWS, paired with managed serverless PostgreSQL (Supabase, Neon, or Railway) keeping initial hosting costs near zero until you scale.",
      },
      {
        question: "Can this MVP handle thousands of users after launch?",
        answer: "Absolutely. Our architecture utilizes edge caching, serverless compute, connection pooling, and optimized SQL queries designed to scale seamlessly from 1 to 100,000+ active users without refactoring.",
      },
    ],
  },
  {
    id: "pro-services",
    title: "PRO WEB SERVICES",
    shortTitle: "Modern High-Performance Web",
    subtitle: "High-Performance API-Heavy Web Applications & Creative Tech",
    tagline: "High-performance API-heavy web applications with real-time sync, custom micro-animations, and responsive modern layouts.",
    description: "High-performance API-heavy web applications with real-time sync, custom micro-animations, and responsive modern layouts.",
    fullOverview: "We build award-winning, visually stunning web applications and digital platforms engineered with uncompromising speed, fluidity, and precision. Combining cutting-edge creative development (GSAP, Lenis, WebGL) with bulletproof TypeScript architecture, we deliver web experiences that make your brand stand out from generic digital noise.",
    duration: "2 WEEKS",
    stack: "REACT / TYPESCRIPT / GSAP / NEXT.JS",
    deliverables: "FULL-STACK HIGH PERFORMANCE WEB APP",
    image: webDevImg,
    highlights: [
      "Silky smooth 60fps animations with GSAP ScrollTrigger & Lenis",
      "95+ Google Lighthouse scores across Performance, Accessibility & SEO",
      "Real-time data synchronization with optimistic UI state updates",
      "Pixel-perfect responsive fidelity across mobile, desktop, and 4K displays",
    ],
    features: [
      {
        title: "Cinematic GSAP Motion & Interaction",
        description: "Silky scroll choreography, parallax depth layers, SVG mask reveals, and reactive hover physics that keep visitors engaged.",
        tag: "CREATIVE MOTION",
      },
      {
        title: "Sub-Second Performance & 95+ Lighthouse",
        description: "Zero unnecessary re-renders, automatic code splitting, optimized Next.js images, and lightning-fast server-rendered page loads.",
        tag: "PERFORMANCE",
      },
      {
        title: "Resilient API & Real-Time Sync",
        description: "Connecting complex third-party APIs, WebSockets, webhooks, and state caches with graceful error handling and offline tolerance.",
        tag: "API ARCHITECTURE",
      },
      {
        title: "SEO & Social Sharing Mastery",
        description: "Server-side rendering, semantic HTML5, dynamic OpenGraph social share cards, automated sitemaps, and rich JSON-LD schema markup.",
        tag: "DISCOVERABILITY",
      },
    ],
    process: [
      {
        step: "PHASE 01",
        title: "Project Scope & Design System Alignment",
        timeline: "Days 1 - 3",
        description: "Reviewing design assets, defining TypeScript types, component architecture, and interaction choreography specs.",
        deliverables: ["Technical spec sheet", "Component token setup", "Animation timeline plan"],
      },
      {
        step: "PHASE 02",
        title: "Component Engineering & Core Logic",
        timeline: "Days 4 - 8",
        description: "Building responsive modular components, server-side data fetching, form handling, and API integrations.",
        deliverables: ["Fully functional page routes", "Interactive forms & validation", "API integrations active"],
      },
      {
        step: "PHASE 03",
        title: "Creative Polish, GSAP Timelines & Sound",
        timeline: "Days 9 - 11",
        description: "Implementing custom Lenis smooth scroll, GSAP ScrollTrigger markers, hover states, transitions, and performance audits.",
        deliverables: ["Smooth scrolling activated", "Micro-interactions polished", "GPU acceleration validated"],
      },
      {
        step: "PHASE 04",
        title: "Cross-Device Testing & Production Deploy",
        timeline: "Days 12 - 14",
        description: "Testing across iOS Safari, Android Chrome, Edge, and macOS browsers, running Lighthouse audits, and deploying live.",
        deliverables: ["Production build deployed to Vercel/Cloudflare", "95+ Lighthouse report", "Complete documentation"],
      },
    ],
    techStack: [
      { name: "Next.js & React 18/19", category: "Frontend Framework" },
      { name: "TypeScript", category: "Type Safety" },
      { name: "GSAP & ScrollTrigger", category: "Motion & Animation" },
      { name: "Lenis", category: "Smooth Scroll Engine" },
      { name: "Tailwind CSS", category: "Utility Styling" },
    ],
    idealFor: [
      "Companies wanting a flagship web application that outshines every competitor",
      "Creative agencies and founders demanding high-end animation polish and 60fps fluidity",
      "High-traffic platforms where sub-second load times and flawless SEO directly drive revenue",
      "Products with complex real-time dashboard data and custom interactive visualizations",
    ],
    faqs: [
      {
        question: "Will heavy animations slow down my website or affect SEO?",
        answer: "Not at all. We build with hardware-accelerated CSS transforms and lightweight GSAP tickers that run on dedicated GPU composite layers. Content remains fully server-rendered for search engines, ensuring 95+ Lighthouse scores.",
      },
      {
        question: "Can you integrate our existing backend or headless CMS?",
        answer: "Yes, we regularly integrate with headless CMS systems (Sanity, Contentful, Strapi), GraphQL endpoints, REST APIs, Supabase, and Firebase.",
      },
      {
        question: "What maintenance and post-launch support is included?",
        answer: "We include two weeks of post-launch warranty and bug fixes with every build, plus clear documentation and screen recordings showing you how to update content.",
      },
    ],
  },
];

export function getServiceById(id: string): ServiceItem | undefined {
  return SERVICES.find((s) => s.id === id);
}

export function getAllServiceIds(): string[] {
  return SERVICES.map((s) => s.id);
}

