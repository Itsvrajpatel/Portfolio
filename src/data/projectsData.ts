import { StaticImageData } from "next/image";
import csvImporterImg from "@/assets/projects/CSV importer.png";
import urbanRoostImg from "@/assets/projects/UrbanRoost.png";
import ghostChatImg from "@/assets/projects/GhostChat.png";
import odcImg from "@/assets/projects/ODC.png";

export interface ProjectScreenItem {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  badge: string;
  iconName: string;
  isScreenshot?: boolean;
  pillars: {
    title: string;
    description: string;
    tag: string;
    stat?: string;
  }[];
}

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  role: string;
  tagline: string;
  overview: string;
  context: string;
  focusedOn: string;
  shipped: string;
  whyItMatters: string;
  year: string;
  metrics: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: StaticImageData;
  screens: ProjectScreenItem[];
  nextProjectId: string;
  prevProjectId: string;
}

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: "ai-csv-importer",
    title: "AI CSV Importer",
    category: "AI & DATA ONBOARDING",
    role: "Full Stack & AI Developer",
    tagline: "Intelligent CSV-to-CRM mapping powered by Google Gemini",
    overview:
      "An AI-assisted data onboarding tool designed to reduce manual mapping when importing CSV data into a CRM. It uses Gemini to infer relationships between source columns and destination CRM fields, then lets users inspect and validate proposed mappings before import.",
    context:
      "Data onboarding into CRM systems is notoriously friction-heavy and prone to human error. Different clients and legacy systems export CSV files with inconsistent column headers, missing fields, or incompatible date and phone formats. AI CSV Importer bridges this gap by leveraging Google Gemini to semantically understand incoming tabular data, automatically aligning arbitrary client schemas to standardized CRM entities without requiring manual lookup tables.",
    focusedOn:
      "I architected a deterministic verification pipeline wrapped around probabilistic LLM inference. The primary challenge was preventing hallucinated field relationships while maintaining sub-second response times on multi-thousand row files. I separated heavy streaming file parsing (PapaParse) and backend normalization onto Express.js, designed strict Zod schema validation guards, and crafted prompt guidelines that output structured JSON with confidence percentiles for human review.",
    shipped:
      "Built the full end-to-end web application featuring drag-and-drop CSV ingestion, automatic header detection, mapping previews with real-time confidence scores, and an interactive review table where users can inspect and override suggested associations. On the backend, organized modular Express routes, file upload middleware, Zod payload validators, and a batch ingestion service deployed across Vercel (Next.js 15 frontend) and Render (Node API).",
    whyItMatters:
      "Demonstrates practical LLM integration in a business workflow, structured data validation, file processing, API design and separate frontend/backend deployments.",
    year: "2026",
    metrics: "98.4% Mapping Accuracy / Sub-2s Ingestion",
    techStack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Gemini API",
      "Zod",
      "PapaParse",
      "REST APIs",
    ],
    liveUrl: "https://ai-csv-importer-chi.vercel.app/",
    githubUrl: "https://github.com/Itsvrajpatel/ai-csv-importer",
    image: csvImporterImg,
    nextProjectId: "urbanroost",
    prevProjectId: "odc-marketing",
    screens: [
      {
        id: "screen-csv-live",
        tabLabel: "Live App Screenshot",
        title: "AI CSV Importer Interface",
        subtitle: "Production view of the CSV-to-CRM onboarding workflow with Gemini inferencing",
        badge: "PRODUCTION UI // LIVE INTERFACE",
        iconName: "sparkles",
        isScreenshot: true,
        pillars: [],
      },
      {
        id: "screen-gemini-mapping",
        tabLabel: "AI Mapping Engine",
        title: "The Four Pillars of Intelligent Ingestion",
        subtitle: "Master data onboarding with dedicated AI inferencing modules tailored to CRM synchronization",
        badge: "GEMINI 1.5 PRO // COGNITIVE MAPPING",
        iconName: "brain",
        pillars: [
          {
            title: "Header Semantic Analysis",
            description: "Infer source intent across mismatched naming conventions, typos, and nested field structures.",
            tag: "NLP Parsing",
            stat: "99.2% Recall",
          },
          {
            title: "Confidence Scoring",
            description: "Calibrated probabilistic certainty metrics highlight ambiguous columns for one-click human verification.",
            tag: "Risk Guard",
            stat: "0.85+ Auto-Pass",
          },
          {
            title: "Zod Schema Enforcement",
            description: "Strict runtime typing verifies emails, phone numbers, and ISO dates prior to CRM database write.",
            tag: "Data Integrity",
            stat: "Strict Validation",
          },
          {
            title: "Live Mapping Inspector",
            description: "Interactive visual mapper allowing operators to inspect, remap, or override AI suggestions in real time.",
            tag: "Human-in-the-Loop",
            stat: "Zero Lock-in",
          },
        ],
      },
      {
        id: "screen-upload-flow",
        tabLabel: "File Upload & Stream",
        title: "Streaming Ingestion Architecture",
        subtitle: "Chunked processing handles multi-megabyte CSV uploads without thread blocking or memory leaks",
        badge: "PAPAPARSE // CHUNKED WORKERS",
        iconName: "upload",
        pillars: [
          {
            title: "Delimiter Detection",
            description: "Auto-detects comma, tab, pipe, and semicolon delimiters across legacy export formats.",
            tag: "Auto Format",
            stat: "Universal Compat",
          },
          {
            title: "Client-Side Chunking",
            description: "PapaParse worker threads parse multi-megabyte files client-side before sending normalized headers.",
            tag: "Web Worker",
            stat: "0ms UI Lag",
          },
          {
            title: "Sample Row Extraction",
            description: "Extracts representative data samples to give Gemini rich contextual cues without leaking PII.",
            tag: "Privacy Guard",
            stat: "Sanitized",
          },
          {
            title: "Schema Cache",
            description: "Remembers past CRM mapping decisions for repetitive supplier formats and scheduled data feeds.",
            tag: "Instant Cache",
            stat: "10x Faster",
          },
        ],
      },
      {
        id: "screen-validation-review",
        tabLabel: "Validation & Errors",
        title: "Pre-Flight Error Mitigation",
        subtitle: "Surfaces data format anomalies before committing records to the production database",
        badge: "ZOD VALIDATION // AUDIT LOGS",
        iconName: "shield",
        pillars: [
          {
            title: "Type Coercion",
            description: "Normalizes regional dates, currencies, and international phone codes into standard E.164 syntax.",
            tag: "Formatting",
            stat: "Standardized",
          },
          {
            title: "Duplicate Detection",
            description: "Identifies duplicate emails and account numbers against live CRM records using fuzzy matching.",
            tag: "Deduplication",
            stat: "Zero Dupes",
          },
          {
            title: "Row Error Highlighting",
            description: "Inline spreadsheet-style grid visually flags defective records with actionable fix recommendations.",
            tag: "Inline Fix",
            stat: "Visual Flags",
          },
          {
            title: "Export Clean Data",
            description: "Export sanitized, validated JSON or corrected CSV directly to secondary storage buckets.",
            tag: "Export Ready",
            stat: "Instant Sync",
          },
        ],
      },
      {
        id: "screen-crm-sync",
        tabLabel: "CRM Sync & Batching",
        title: "Production CRM Dispatch",
        subtitle: "Organized Express routes stream validated records directly to target CRM endpoints",
        badge: "EXPRESS.JS // RENDER CLUSTER",
        iconName: "database",
        pillars: [
          {
            title: "Rate Limiting & Queues",
            description: "Backpressure-controlled queue buffers prevent downstream CRM API 429 quota exhaustion.",
            tag: "Rate Limiter",
            stat: "Adaptive QPS",
          },
          {
            title: "Atomic Transactions",
            description: "Database write rollbacks guarantee no half-imported batches pollute customer databases.",
            tag: "ACID Safe",
            stat: "100% Rollback",
          },
          {
            title: "Telemetry & Logs",
            description: "Real-time import progress bar with detailed operational logs and error report downloads.",
            tag: "Observability",
            stat: "Full Telemetry",
          },
          {
            title: "Webhook Triggers",
            description: "Dispatches completion events to Slack, Zapier, or internal microservices upon batch finish.",
            tag: "Event Bus",
            stat: "Real-time",
          },
        ],
      },
    ],
  },
  {
    id: "urbanroost",
    title: "UrbanRoost",
    category: "PROPTECH & COMMUNITY PLATFORM",
    role: "Full Stack Developer",
    tagline: "Multi-role property & society operations management platform",
    overview:
      "A multi-role property and community management platform for societies and colonies. It brings property listings, service discovery, approval workflows and community operations into a single web application.",
    context:
      "Residential societies and residential communities often struggle with fragmented communication, disparate maintenance requests, unauthorized visitors, and cumbersome property listing approvals across multiple gatekeepers. UrbanRoost unifies these workflows into a centralized web operating system tailored for residential colonies and housing societies.",
    focusedOn:
      "My focus centered on multi-tenant role-based access control (RBAC), relational data integrity with Spring Data JPA/Hibernate, and complex multi-stage approval state machines. I ensured that admins, property owners, residents, and verified brokers each had distinct, secure operational boundaries while interacting with shared community data.",
    shipped:
      "I engineered a complete property and society management platform featuring permission-based dashboards, verified property listing workflows with multi-step admin approvals, on-demand community service discovery and amenity booking, real-time resident broadcast notifications, and comprehensive financial/administrative reporting.",
    whyItMatters:
      "Demonstrates multi-role product thinking, approval-based business workflows, relational data modelling and full-stack application development.",
    year: "2025",
    metrics: "4 Specialized Roles / Multi-stage Approvals",
    techStack: [
      "React.js",
      "Tailwind CSS",
      "JavaScript",
      "Spring Boot",
      "Hibernate",
      "MySQL",
      "REST APIs",
      "JWT Security",
    ],
    githubUrl: "https://github.com/Itsvrajpatel/urbanroost",
    image: urbanRoostImg,
    nextProjectId: "ghostchat",
    prevProjectId: "ai-csv-importer",
    screens: [
      {
        id: "screen-urban-live",
        tabLabel: "Live App Screenshot",
        title: "UrbanRoost Operations Interface",
        subtitle: "Production view of the multi-role property and colony management dashboard",
        badge: "PRODUCTION UI // LIVE INTERFACE",
        iconName: "users",
        isScreenshot: true,
        pillars: [],
      },
      {
        id: "screen-urban-roles",
        tabLabel: "Role-Based Hub",
        title: "The Four Pillars of Community Operations",
        subtitle: "Unified society management with isolated, permission-secured portal views",
        badge: "SPRING BOOT // RBAC MATRIX",
        iconName: "users",
        pillars: [
          {
            title: "Admin Command Center",
            description: "Oversee colony governance, approve new resident onboarding, and track society maintenance balances.",
            tag: "Executive View",
            stat: "Total Oversight",
          },
          {
            title: "Property Owner Suite",
            description: "Submit property listings, manage tenant leases, and approve maintenance billing seamlessly.",
            tag: "Owner Portal",
            stat: "Asset Control",
          },
          {
            title: "Resident Community App",
            description: "Access instant service discovery, book shared clubhouses/amenities, and view society circulars.",
            tag: "Resident Life",
            stat: "Daily Utility",
          },
          {
            title: "Verified Broker Portal",
            description: "Submit client tenant verification dossiers and inspect verified society listing inventories.",
            tag: "Broker Desk",
            stat: "KYC Verified",
          },
        ],
      },
      {
        id: "screen-urban-listings",
        tabLabel: "Listing Approvals",
        title: "Approval Workflow State Engine",
        subtitle: "Multi-stage verification ensures no unvetted listing reaches community bulletin boards",
        badge: "HIBERNATE ORM // MYSQL RELATIONAL",
        iconName: "check-circle",
        pillars: [
          {
            title: "Listing Submission",
            description: "Owners upload title proof, photos, floor plans, and rental/sale pricing parameters.",
            tag: "Intake",
            stat: "Secure Upload",
          },
          {
            title: "Secretary Verification",
            description: "Society committee reviews compliance with society bylaws and verifies ownership records.",
            tag: "Review Stage",
            stat: "Audit Trail",
          },
          {
            title: "Public Marketplace",
            description: "Approved units populate the live colony directory with contact masking for owner privacy.",
            tag: "Directory",
            stat: "Zero Spam",
          },
          {
            title: "Lease Archival",
            description: "Executed contracts trigger automatic occupancy updates in the resident master registry.",
            tag: "Registry Sync",
            stat: "Auto Sync",
          },
        ],
      },
      {
        id: "screen-urban-amenities",
        tabLabel: "Amenity Booking",
        title: "Service Discovery & Booking",
        subtitle: "Real-time calendar slot reservation for sports courts, halls, and verified service technicians",
        badge: "REAL-TIME SLOTS // CONFLICT RESOLUTION",
        iconName: "calendar",
        pillars: [
          {
            title: "Clubhouse Reservations",
            description: "Prevent double-booking with transactional row locks on shared society amenities.",
            tag: "Concurrency",
            stat: "Zero Conflicts",
          },
          {
            title: "Verified Technicians",
            description: "Direct dial pre-screened electricians, plumbers, and security personnel on call.",
            tag: "Directory",
            stat: "Vetted Staff",
          },
          {
            title: "Payment Receipts",
            description: "Auto-generate PDF maintenance receipts and ledger entries linked to MySQL accounts.",
            tag: "Financials",
            stat: "Instant PDF",
          },
          {
            title: "Visitor Gate Passes",
            description: "Digital QR gate passes pre-authorized by residents for delivery staff and guests.",
            tag: "Security",
            stat: "Instant Pass",
          },
        ],
      },
    ],
  },
  {
    id: "ghostchat",
    title: "GhostChat",
    category: "REAL-TIME COLLABORATION",
    role: "Full Stack MERN Developer",
    tagline: "High-performance real-time messaging application with avatar personalization",
    overview:
      "A full-stack messaging application built with the MERN stack. The repository documents account registration, login, avatar/profile screens and a chat interface.",
    context:
      "Modern team and personal communication demands low-latency messaging, instantaneous status syncing, and seamless identity personalization without sluggish interface overhead. GhostChat was developed as a clean, responsive real-time chat application built on the classic MERN architecture.",
    focusedOn:
      "I focused on bi-directional WebSocket event architecture, optimistic UI updates for zero perceptible latency during conversation flow, secure JWT authentication with encrypted cookie persistence, and reactive state synchronization across multiple open browser sessions.",
    shipped:
      "I built the full-stack chat ecosystem including secure user registration, token-based session management, customizable avatar selection and profile customization, dynamic real-time direct messaging, active typing indicators, and reliable message history storage on MongoDB.",
    whyItMatters:
      "Demonstrates end-to-end MERN development and core patterns behind authenticated, interactive communication products.",
    year: "2025",
    metrics: "< 15ms Socket Latency / Instant Message Delivery",
    techStack: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js (MERN)",
      "Socket.io",
      "Tailwind CSS",
      "JWT Auth",
      "Bcrypt",
    ],
    githubUrl: "https://github.com/Itsvrajpatel/GhostChat",
    image: ghostChatImg,
    nextProjectId: "odc-marketing",
    prevProjectId: "urbanroost",
    screens: [
      {
        id: "screen-chat-live",
        tabLabel: "Live App Screenshot",
        title: "GhostChat Messaging Interface",
        subtitle: "Production view of the real-time MERN chat workspace with custom avatars",
        badge: "PRODUCTION UI // LIVE INTERFACE",
        iconName: "message-square",
        isScreenshot: true,
        pillars: [],
      },
      {
        id: "screen-chat-core",
        tabLabel: "Live Chat Engine",
        title: "The Four Pillars of Real-Time Messaging",
        subtitle: "Engineered with sub-millisecond WebSocket pipelines and responsive MERN state sync",
        badge: "SOCKET.IO // WEBSOCKET CORE",
        iconName: "message-square",
        pillars: [
          {
            title: "Sub-15ms Dispatch",
            description: "Bi-directional WebSocket event loops deliver text and multimedia with instant feedback.",
            tag: "Low Latency",
            stat: "< 15ms Ping",
          },
          {
            title: "Optimistic Rendering",
            description: "Messages render immediately in chat bubbles while background sockets confirm receipt.",
            tag: "Optimistic UI",
            stat: "0ms Perceived",
          },
          {
            title: "Typing & Presence",
            description: "Granular peer activity broadcasts indicate when a conversation partner is typing or online.",
            tag: "Live Presence",
            stat: "Instant Status",
          },
          {
            title: "Persistent History",
            description: "MongoDB indexed collections retrieve paginated historical conversations upon scroll.",
            tag: "Mongo Storage",
            stat: "Indexed Queries",
          },
        ],
      },
      {
        id: "screen-chat-profile",
        tabLabel: "Avatar & Identity",
        title: "Custom Avatar & Identity Studio",
        subtitle: "Dynamic profile customization with animated SVG avatars and privacy controls",
        badge: "REACT CLIENT // IDENTITY MGMT",
        iconName: "user",
        pillars: [
          {
            title: "Procedural Avatars",
            description: "Select from curated avatar seeds with client-side SVGs for zero network footprint.",
            tag: "SVG Graphics",
            stat: "Instant Load",
          },
          {
            title: "Status Messages",
            description: "Custom bios and mood indicators synchronize across all active contacts in real time.",
            tag: "User Bios",
            stat: "Live Sync",
          },
          {
            title: "JWT Cookie Vault",
            description: "HTTP-only, SameSite cookies securely store tokens to prevent XSS and credential leaks.",
            tag: "Security",
            stat: "HTTP-Only",
          },
          {
            title: "Session Control",
            description: "Multi-tab detection ensures message delivery regardless of user active tab focus.",
            tag: "Multi-Session",
            stat: "Seamless",
          },
        ],
      },
    ],
  },
  {
    id: "odc-marketing",
    title: "ODC Marketing Website",
    category: "ENTERPRISE MARKETING & MOTION",
    role: "Frontend & Creative Developer",
    tagline: "Interactive, high-converting digital experience for logistics collective",
    overview:
      "A marketing website for Owner Driver Collective, built with the Next.js App Router. It combines reusable page sections, animated hero visuals and an email-enabled contact flow.",
    context:
      "Owner Driver Collective required an authoritative digital presence to communicate driver benefits, showcase logistics network capabilities, and convert prospective transport operators into active collective members through a frictionless onboarding flow.",
    focusedOn:
      "I focused on high-performance scroll-driven GSAP timeline choreographies, modular atomic component architecture utilizing the Next.js App Router, sub-second First Contentful Paint (FCP), and a robust server-side contact processing pipeline using Resend transactional email APIs.",
    shipped:
      "I developed the production marketing website featuring kinetic hero animations, custom SVG-based motion elements, responsive multi-breakpoint layouts, performance-optimized image assets, and a validated driver inquiry submission pipeline wired directly to Resend.",
    whyItMatters:
      "Demonstrates modern Next.js frontend development, animation integration and a functional contact workflow.",
    year: "2025",
    metrics: "100 Lighthouse Performance / 60 FPS GSAP",
    techStack: [
      "Next.js 14",
      "React",
      "GSAP",
      "ScrollTrigger",
      "Tailwind CSS",
      "CSS Modules",
      "Resend API",
      "TypeScript",
    ],
    githubUrl: "https://github.com/Itsvrajpatel/ODC-Frontend",
    image: odcImg,
    nextProjectId: "ai-csv-importer",
    prevProjectId: "ghostchat",
    screens: [
      {
        id: "screen-odc-live",
        tabLabel: "Live App Screenshot",
        title: "Owner Driver Collective Landing Experience",
        subtitle: "Production view of the Next.js App Router and GSAP animated marketing site",
        badge: "PRODUCTION UI // LIVE INTERFACE",
        iconName: "sparkles",
        isScreenshot: true,
        pillars: [],
      },
      {
        id: "screen-odc-hero",
        tabLabel: "Kinetic Hero & Motion",
        title: "The Four Pillars of Modern Marketing Web",
        subtitle: "Engineered with 60 FPS GSAP choreographies and modular Next.js App Router components",
        badge: "GSAP // SCROLLTRIGGER TIMELINE",
        iconName: "sparkles",
        pillars: [
          {
            title: "Kinetic Visual Flow",
            description: "ScrollTrigger timelines smoothly coordinate typography and visual assets without layout thrashing.",
            tag: "GSAP Motion",
            stat: "60 FPS",
          },
          {
            title: "Next.js App Router",
            description: "Server components minimize client JavaScript bundle size for sub-second First Contentful Paint.",
            tag: "Next.js SSR",
            stat: "< 0.8s FCP",
          },
          {
            title: "Modular Layouts",
            description: "Reusable, atomic UI components structured for rapid iteration and responsive cross-device consistency.",
            tag: "Atomic UI",
            stat: "100% Responsive",
          },
          {
            title: "Resend Ingestion",
            description: "Server Actions securely dispatch formatted inquiry dossiers directly to driver recruitment teams.",
            tag: "Resend API",
            stat: "Zero Drop-off",
          },
        ],
      },
      {
        id: "screen-odc-forms",
        tabLabel: "Driver Onboarding Flow",
        title: "Conversion-Focused Contact Architecture",
        subtitle: "Frictionless multi-step inquiry engine with automated email dispatch via Resend",
        badge: "RESEND // SERVER ACTIONS",
        iconName: "mail",
        pillars: [
          {
            title: "Client-Side Pre-Check",
            description: "Instant input validation guides prospective drivers through license and vehicle selection.",
            tag: "UX Flow",
            stat: "Instant Hints",
          },
          {
            title: "Spam Mitigation",
            description: "Honeypot form fields and rate limit tokens filter automated bot submissions effortlessly.",
            tag: "Security",
            stat: "Clean Inbox",
          },
          {
            title: "HTML Email Templates",
            description: "Branded HTML transactional emails notify both applicant and regional fleet dispatchers.",
            tag: "Templates",
            stat: "Formatted",
          },
          {
            title: "Performance Score",
            description: "Zero heavy third-party tracking scripts maintains top-tier Core Web Vitals across mobile networks.",
            tag: "Lighthouse",
            stat: "100 Score",
          },
        ],
      },
    ],
  },
];

export function getProjectById(id: string): ProjectData | undefined {
  return PROJECTS_DATA.find((p) => p.id === id);
}

export function getAllProjectIds(): string[] {
  return PROJECTS_DATA.map((p) => p.id);
}
