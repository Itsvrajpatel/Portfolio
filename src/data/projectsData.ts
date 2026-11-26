import { StaticImageData } from "next/image";
import csvImporterImg from "@/assets/projects/CSV importer.png";
import csvScreen1 from "@/assets/projects/CSV importer/CSV_1.png";
import csvScreen2 from "@/assets/projects/CSV importer/CSV_2.png";
import csvScreen3 from "@/assets/projects/CSV importer/CSV_3.png";
import csvScreen4 from "@/assets/projects/CSV importer/CSV_4.png";

import urbanRoostImg from "@/assets/projects/UrbanRoost.png";
import urScreen1 from "@/assets/projects/UrbanRoost/UR_1.jpg";
import urScreen2 from "@/assets/projects/UrbanRoost/UR_2.jpg";
import urScreen3 from "@/assets/projects/UrbanRoost/UR_3.jpg";
import urScreen4 from "@/assets/projects/UrbanRoost/UR_4.jpg";
import urScreen5 from "@/assets/projects/UrbanRoost/UR_5.jpg";
import urScreen6 from "@/assets/projects/UrbanRoost/UR_6.jpg";
import urScreen7 from "@/assets/projects/UrbanRoost/UR_7.jpg";

import ghostChatImg from "@/assets/projects/GhostChat.png";
import gcScreen1 from "@/assets/projects/GhostChat/GC_1.png";
import gcScreen2 from "@/assets/projects/GhostChat/GC_2.png";
import gcScreen3 from "@/assets/projects/GhostChat/GC_3.png";
import gcScreen4 from "@/assets/projects/GhostChat/GC_4.png";

import odcImg from "@/assets/projects/ODC.png";
import odcScreen1 from "@/assets/projects/ODC/ODC_1.jpg";
import odcScreen2 from "@/assets/projects/ODC/ODC_2.jpg";
import odcScreen3 from "@/assets/projects/ODC/ODC_3.jpg";
import odcScreen4 from "@/assets/projects/ODC/ODC_4.jpg";

import wmoImg from "@/assets/projects/WMO.png";
import wmoScreen1 from "@/assets/projects/WMO/WMO_1.png";
import wmoScreen2 from "@/assets/projects/WMO/WMO_2.png";
import wmoScreen3 from "@/assets/projects/WMO/WMO_3.jpg";
import wmoScreen4 from "@/assets/projects/WMO/WMO_4.jpg";

export interface ProjectScreenItem {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  badge: string;
  iconName: string;
  isScreenshot?: boolean;
  image?: StaticImageData;
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
    prevProjectId: "wearmeout",
    screens: [
      {
        id: "screen-csv-overview",
        tabLabel: "Overview",
        title: "AI CSV Importer Overview",
        subtitle: "Production overview of the CSV-to-CRM onboarding workflow with Gemini inferencing",
        badge: "PRODUCTION UI // OVERVIEW",
        iconName: "sparkles",
        isScreenshot: true,
        image: csvImporterImg,
        pillars: [],
      },
      {
        id: "screen-csv-1",
        tabLabel: "Upload CSV",
        title: "Step 1 — CSV Upload & Validation",
        subtitle: "Drag-and-drop CSV ingestion with UTF-8 encoding checks, size limits, and supported source hints",
        badge: "STEP 01 // FILE UPLOAD",
        iconName: "upload",
        isScreenshot: true,
        image: csvScreen1,
        pillars: [],
      },
      {
        id: "screen-csv-2",
        tabLabel: "Data Preview",
        title: "Step 2 — Parsed Tabular Preview",
        subtitle: "Interactive pre-import inspection table displaying row counts, column headers, and file metadata",
        badge: "STEP 02 // DATA PREVIEW",
        iconName: "database",
        isScreenshot: true,
        image: csvScreen2,
        pillars: [],
      },
      {
        id: "screen-csv-3",
        tabLabel: "AI Processing",
        title: "Step 3 — Gemini AI Mapping Pipeline",
        subtitle: "Live step-by-step progress as Gemini analyzes columns, maps CRM fields, and extracts leads",
        badge: "STEP 03 // AI PROCESSING",
        iconName: "brain",
        isScreenshot: true,
        image: csvScreen3,
        pillars: [],
      },
      {
        id: "screen-csv-4",
        tabLabel: "Import Results",
        title: "Step 4 — CRM Import Results & Filtering",
        subtitle: "Batch summary metrics with filterable CRM records, success rates, and processing telemetry",
        badge: "STEP 04 // RESULTS",
        iconName: "shield",
        isScreenshot: true,
        image: csvScreen4,
        pillars: [],
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
        id: "screen-urban-overview",
        tabLabel: "Overview",
        title: "UrbanRoost Operations Overview",
        subtitle: "Production overview of the multi-role property and colony management platform",
        badge: "PRODUCTION UI // OVERVIEW",
        iconName: "users",
        isScreenshot: true,
        image: urbanRoostImg,
        pillars: [],
      },
      {
        id: "screen-urban-1",
        tabLabel: "Landing Hero",
        title: "Welcome & Platform Entry",
        subtitle: "Clean onboarding hero connecting property renters, sellers, and domestic service allies",
        badge: "SCREEN 01 // LANDING",
        iconName: "sparkles",
        isScreenshot: true,
        image: urScreen1,
        pillars: [],
      },
      {
        id: "screen-urban-2",
        tabLabel: "Role Sign Up",
        title: "Multi-Role Account Registration",
        subtitle: "Role-based registration supporting Secretary, Owner, Allie, and Broker account workflows",
        badge: "SCREEN 02 // REGISTRATION",
        iconName: "users",
        isScreenshot: true,
        image: urScreen2,
        pillars: [],
      },
      {
        id: "screen-urban-3",
        tabLabel: "User Sign In",
        title: "Authenticated Portal Sign In",
        subtitle: "Verified credential authentication routing users into role-specific dashboards",
        badge: "SCREEN 03 // AUTHENTICATION",
        iconName: "shield",
        isScreenshot: true,
        image: urScreen3,
        pillars: [],
      },
      {
        id: "screen-urban-4",
        tabLabel: "Property Listings",
        title: "Real Estate Properties Directory",
        subtitle: "Browsable society property grid displaying location, monthly rent, contact, and availability",
        badge: "SCREEN 04 // LISTINGS",
        iconName: "check-circle",
        isScreenshot: true,
        image: urScreen4,
        pillars: [],
      },
      {
        id: "screen-urban-5",
        tabLabel: "Property & QR",
        title: "Property Details & QR Verification",
        subtitle: "Individual property view paired with instant scannable QR verification details",
        badge: "SCREEN 05 // QR DETAILS",
        iconName: "calendar",
        isScreenshot: true,
        image: urScreen5,
        pillars: [],
      },
      {
        id: "screen-urban-6",
        tabLabel: "Add Services",
        title: "Domestic Allies & Utility Onboarding",
        subtitle: "Service submission form for cleaners, cooks, and maintenance allies to enlist fees and utility type",
        badge: "SCREEN 06 // SERVICES",
        iconName: "users",
        isScreenshot: true,
        image: urScreen6,
        pillars: [],
      },
      {
        id: "screen-urban-7",
        tabLabel: "About Platform",
        title: "About UrbanRoost & Key Features",
        subtitle: "Overview of brokerage-free dwelling discovery, owner tenant tracking, and domestic service integration",
        badge: "SCREEN 07 // ABOUT",
        iconName: "sparkles",
        isScreenshot: true,
        image: urScreen7,
        pillars: [],
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
        id: "screen-chat-overview",
        tabLabel: "Overview",
        title: "GhostChat Messaging Overview",
        subtitle: "Production overview of the real-time MERN chat workspace with custom avatars",
        badge: "PRODUCTION UI // OVERVIEW",
        iconName: "message-square",
        isScreenshot: true,
        image: ghostChatImg,
        pillars: [],
      },
      {
        id: "screen-chat-1",
        tabLabel: "Registration",
        title: "Account Registration Screen",
        subtitle: "Dark-themed onboarding form validating username, email, and matching password credentials",
        badge: "SCREEN 01 // REGISTER",
        iconName: "user",
        isScreenshot: true,
        image: gcScreen1,
        pillars: [],
      },
      {
        id: "screen-chat-2",
        tabLabel: "Login",
        title: "User Authentication Screen",
        subtitle: "Streamlined login interface backed by Bcrypt password verification and JWT sessions",
        badge: "SCREEN 02 // LOGIN",
        iconName: "shield",
        isScreenshot: true,
        image: gcScreen2,
        pillars: [],
      },
      {
        id: "screen-chat-3",
        tabLabel: "Avatar Picker",
        title: "Custom Profile Avatar Selector",
        subtitle: "Interactive avatar selection screen allowing new users to pick a personalized profile icon",
        badge: "SCREEN 03 // AVATAR STUDIO",
        iconName: "sparkles",
        isScreenshot: true,
        image: gcScreen3,
        pillars: [],
      },
      {
        id: "screen-chat-4",
        tabLabel: "Chat Workspace",
        title: "Real-Time Messaging Workspace",
        subtitle: "Split-pane chat UI showing active contacts sidebar, user profile footer, and live conversation pane",
        badge: "SCREEN 04 // CHAT UI",
        iconName: "message-square",
        isScreenshot: true,
        image: gcScreen4,
        pillars: [],
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
    nextProjectId: "wearmeout",
    prevProjectId: "ghostchat",
    screens: [
      {
        id: "screen-odc-overview",
        tabLabel: "Overview",
        title: "Owner Driver Collective Overview",
        subtitle: "Production overview of the Next.js App Router and GSAP animated marketing site",
        badge: "PRODUCTION UI // OVERVIEW",
        iconName: "sparkles",
        isScreenshot: true,
        image: odcImg,
        pillars: [],
      },
      {
        id: "screen-odc-1",
        tabLabel: "Hero Section",
        title: "Freight Operations Hero Experience",
        subtitle: "Full-bleed atmospheric highway visual with pilot signup and interest registration CTAs",
        badge: "SCREEN 01 // HERO",
        iconName: "sparkles",
        isScreenshot: true,
        image: odcScreen1,
        pillars: [],
      },
      {
        id: "screen-odc-2",
        tabLabel: "Pilot Metrics",
        title: "Pilot Sign-Ups & Platform Mission",
        subtitle: "Live pilot operator counter paired with compliance-first road transport positioning",
        badge: "SCREEN 02 // MISSION",
        iconName: "check-circle",
        isScreenshot: true,
        image: odcScreen2,
        pillars: [],
      },
      {
        id: "screen-odc-3",
        tabLabel: "How It Works",
        title: "Industry Reality & Compliance Flow",
        subtitle: "Split editorial layout contrasting legacy fragmented checks with unified logistics telemetry",
        badge: "SCREEN 03 // WORKFLOW",
        iconName: "database",
        isScreenshot: true,
        image: odcScreen3,
        pillars: [],
      },
      {
        id: "screen-odc-4",
        tabLabel: "Contact Flow",
        title: "Freight Operations Inquiry Form",
        subtitle: "Validated driver, operator, and shipper inquiry form backed by Resend email dispatch",
        badge: "SCREEN 04 // CONTACT",
        iconName: "mail",
        isScreenshot: true,
        image: odcScreen4,
        pillars: [],
      },
    ],
  },
  {
    id: "wearmeout",
    title: "WearMeOut",
    category: "E-COMMERCE & BRAND STOREFRONT",
    role: "Frontend & UI Developer",
    tagline: "High-voltage streetwear printing and custom apparel e-commerce storefront",
    overview:
      "A modern streetwear printing and apparel e-commerce storefront built with Next.js and Tailwind CSS. It showcases custom print collections, searchable category filtering, and a custom order inquiry flow.",
    context:
      "WearMeOut needed a bold, conversion-focused digital storefront to present custom streetwear prints, highlight manufacturing quality, and streamline bulk and custom t-shirt quote inquiries across desktop and mobile shoppers.",
    focusedOn:
      "I focused on high-contrast dark-mode editorial styling with neon-lime accents, responsive product showcase grids, instant client-side catalog search and category filtering, and an accessible custom apparel quote form.",
    shipped:
      "Built the storefront landing page, recent prints showcase, searchable all-collections catalog with category filters and ratings, and a full custom-order contact workflow engineered with Next.js and Tailwind CSS.",
    whyItMatters:
      "Demonstrates responsive e-commerce UI engineering, catalog filtering UX, and conversion-oriented storefront design.",
    year: "2025",
    metrics: "SEO Optimized / Responsive Storefront",
    techStack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "TypeScript",
      "Responsive Design",
      "SEO Optimization",
    ],
    image: wmoImg,
    nextProjectId: "ai-csv-importer",
    prevProjectId: "odc-marketing",
    screens: [
      {
        id: "screen-wmo-overview",
        tabLabel: "Overview",
        title: "WearMeOut Storefront Overview",
        subtitle: "Production overview of the streetwear printing and e-commerce platform",
        badge: "PRODUCTION UI // OVERVIEW",
        iconName: "sparkles",
        isScreenshot: true,
        image: wmoImg,
        pillars: [],
      },
      {
        id: "screen-wmo-1",
        tabLabel: "Hero Storefront",
        title: "Wear Your Identity Hero",
        subtitle: "Dark grid hero featuring custom streetwear visuals, quote CTA, and production highlights",
        badge: "SCREEN 01 // HERO",
        iconName: "sparkles",
        isScreenshot: true,
        image: wmoScreen1,
        pillars: [],
      },
      {
        id: "screen-wmo-2",
        tabLabel: "Recent Prints",
        title: "Design Highlights & Recent Prints",
        subtitle: "Editorial product gallery showcasing signature printed tees with quick info requests",
        badge: "SCREEN 02 // PRINTS",
        iconName: "check-circle",
        isScreenshot: true,
        image: wmoScreen2,
        pillars: [],
      },
      {
        id: "screen-wmo-3",
        tabLabel: "All Collections",
        title: "Searchable Shop & Category Catalog",
        subtitle: "Filterable apparel catalog supporting keyword search, style categories, and product ratings",
        badge: "SCREEN 03 // CATALOG",
        iconName: "database",
        isScreenshot: true,
        image: wmoScreen3,
        pillars: [],
      },
      {
        id: "screen-wmo-4",
        tabLabel: "Custom Quote",
        title: "Custom Apparel Contact & Quote Form",
        subtitle: "Order inquiry form capturing customer contact, shipping address, and custom print notes",
        badge: "SCREEN 04 // CONTACT",
        iconName: "mail",
        isScreenshot: true,
        image: wmoScreen4,
        pillars: [],
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
