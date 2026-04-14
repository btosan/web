export const WHATSAPP_NUMBER = "2349123631219";

export const services = [
  {
    icon: "🌐",
    title: "Web Applications",
    description:
      "Custom full-stack web apps built with Django, FastAPI, and Next.js. Scalable, secure, and optimised for Nigerian internet conditions.",
    tags: ["Django", "Next.js", "FastAPI"],
    bg: "bg-orange-50",
  },
  {
    icon: "⚡",
    title: "SaaS Platforms",
    description:
      "Multi-tenant SaaS products for the African market. We build the infrastructure, billing, auth, and dashboards — you own the business.",
    tags: ["Django Tenants", "Prisma", "React"],
    bg: "bg-green-50",
  },
  {
    icon: "🛒",
    title: "E-Commerce Solutions",
    description:
      "Fully custom online stores with Paystack & Flutterwave integration, inventory management, and mobile-first shopping experiences.",
    tags: ["Paystack", "Flutterwave", "DRF"],
    bg: "bg-blue-50",
  },
  {
    icon: "📱",
    title: "MVP in a Week",
    description:
      "Got an idea? We validate and ship your Minimum Viable Product in 7 days. Perfect for founders who need to move fast without burning cash.",
    tags: ["Rapid Prototyping"],
    bg: "bg-purple-50",
  },
  {
    icon: "🔌",
    title: "API Development",
    description:
      "Robust REST and GraphQL APIs that power your mobile apps, third-party integrations, and data pipelines. Built to scale to millions.",
    tags: ["DRF", "FastAPI", "GraphQL"],
    bg: "bg-yellow-50",
  },
  {
    icon: "🎨",
    title: "UI/UX Design & Rebrand",
    description:
      "Modern, conversion-focused interfaces that users love. From wireframes to pixel-perfect implementation with your brand identity.",
    tags: ["Figma", "TailwindCSS"],
    bg: "bg-pink-50",
  },
];

export const whyPoints = [
  {
    icon: "🇳🇬",
    title: "Nigeria-First Engineering",
    description:
      "We design for low bandwidth, intermittent power, and mobile-first users — because that's who your customers are.",
  },
  {
    icon: "⚡",
    title: "8+ Years, Zero Guesswork",
    description:
      "Best Tosan leads every project with a decade of full-stack experience — Django, React, FastAPI, and everything in between.",
  },
  {
    icon: "📞",
    title: "One Point of Contact",
    description:
      "No account managers. You talk directly to the developer building your product. Faster decisions, no miscommunication.",
  },
  {
    icon: "🔒",
    title: "Fixed Scope, Fixed Price",
    description:
      "We agree on scope before we start. No surprise invoices. No scope creep. You know exactly what you're paying for.",
  },
];

export const stats = [
  { num: "8+", label: "Years of full-stack experience" },
  { num: "30+", label: "Products shipped across Africa" },
  { num: "4wk", label: "Average time to launch" },
  { num: "5★", label: "Average client rating" },
];

export const processSteps = [
  {
    num: "01",
    title: "Discovery Call",
    description:
      "We learn your business, goals, and users. 30 minutes is all it takes to define the right scope.",
  },
  {
    num: "02",
    title: "Proposal & Quote",
    description:
      "You receive a clear proposal with timeline, tech stack, deliverables, and a fixed price. No surprises.",
  },
  {
    num: "03",
    title: "Build & Review",
    description:
      "We build in sprints with weekly demos. You give feedback at every stage — total transparency.",
  },
  {
    num: "04",
    title: "Launch & Support",
    description:
      "Your product goes live. We handle deployment, monitoring, and 30-day post-launch support.",
  },
];

export const portfolioItems = [
  {
    emoji: "🏢",
    tag: "SaaS · Directory",
    title: "NGPage — Nigerian Business Directory",
    description:
      "Multi-tenant business directory and website builder for Nigerian SMEs. Built on Django Tenants + Next.js with subdomain architecture.",
    featured: true,
    bg: "from-[#0d0d0d] to-[#1a1a2e]",
  },
  {
    emoji: "🛍️",
    tag: "E-Commerce",
    title: "Lagos Fashion Store",
    description:
      "Full-stack shop with Paystack integration and inventory management.",
    featured: false,
    bg: "from-orange-100 to-orange-50",
  },
  {
    emoji: "📊",
    tag: "SaaS Dashboard",
    title: "SME Analytics Platform",
    description:
      "FastAPI + React dashboard for tracking business KPIs in real-time.",
    featured: false,
    bg: "from-green-100 to-green-50",
  },
  {
    emoji: "🔌",
    tag: "API",
    title: "Fintech Payment API",
    description:
      "DRF-powered payment orchestration API with Flutterwave and mobile money.",
    featured: false,
    bg: "from-blue-100 to-purple-50",
  },
];

export const testimonials = [
  {
    quote:
      "Ofashi understood our Nigerian market context from day one. The product launched on time, within budget, and our customers love it. Best team I've worked with.",
    name: "Adaeze Chioma",
    role: "Founder, StyleLagos",
    initials: "AC",
    color: "bg-[#e85d2f]",
  },
  {
    quote:
      "The MVP in a Week service is real. We had a working product in 6 days. The code quality was exceptional — not throwaway prototype code. Genuinely impressed.",
    name: "Babatunde Olatunji",
    role: "CTO, TechStartNG",
    initials: "BT",
    color: "bg-[#1a7a4a]",
  },
  {
    quote:
      "What sets Ofashi apart is communication. Weekly demos, direct developer access, and total transparency. Felt like having an in-house team without the overhead.",
    name: "Kemi Okonkwo",
    role: "CEO, AgroConnect Africa",
    initials: "KO",
    color: "bg-blue-600",
  },
];

export type PricingCategory = "Web Development" | "Web Design";

export interface PricingPlan {
  tier: string;
  category: PricingCategory;
  price: string;
  per: string;
  timeline: string;
  desc: string;
  featured: boolean;
  href: string;
  features: string[];
}

export const pricingPlans: PricingPlan[] = [
  // ── Web Development ──────────────────────────────
  {
    tier: "Launch",
    category: "Web Development",
    price: "₦90,000",
    per: "/ project",
    timeline: "1 – 3 weeks",
    desc: "Custom-built websites to establish credibility and drive early traction.",
    featured: false,
    href: "https://www.ofashi.com/packages/launch-package-most-basic",
    features: [
      "Responsive website design",
      "Up to 5 pages",
      "Contact form integration",
      "Mobile optimization",
      "Fast performance setup",
    ],
  },
  {
    tier: "Growth Platform",
    category: "Web Development",
    price: "₦250,000",
    per: "/ project",
    timeline: "2 – 5 weeks",
    desc: "Conversion-focused, scalable web platforms with modern full-stack architecture.",
    featured: true,
    href: "https://www.ofashi.com/packages/growth-platforms",
    features: [
      "Full-stack app (Next.js + Django / Node)",
      "Authentication — users, roles & dashboards",
      "Custom admin dashboard or CMS",
      "REST API (Python / Node)",
      "Database design",
    ],
  },
  {
    tier: "API & Backend",
    category: "Web Development",
    price: "₦500,000",
    per: "/ project",
    timeline: "3 – 6 weeks",
    desc: "Robust backend systems and APIs to power applications and integrations.",
    featured: false,
    href: "https://www.ofashi.com/packages/api-backend-systems",
    features: [
      "REST / GraphQL API development",
      "Database design (PostgreSQL + Prisma)",
      "Authentication & authorization systems",
      "Third-party integrations",
      "Scalable backend architecture",
    ],
  },
  {
    tier: "Custom Platform",
    category: "Web Development",
    price: "₦1,000,000",
    per: "/ project",
    timeline: "5 – 8 weeks",
    desc: "End-to-end full-stack applications built from scratch for complex business needs.",
    featured: false,
    href: "https://www.ofashi.com/packages/custom-platforms",
    features: [
      "Full-stack (Next.js + Django / FastAPI / Node)",
      "REST / GraphQL APIs",
      "PostgreSQL + Prisma database systems",
      "Multi-role systems (admin, users, vendors)",
      "Custom e-commerce platforms",
    ],
  },
  {
    tier: "Enterprise",
    category: "Web Development",
    price: "Custom",
    per: "/ quote",
    timeline: "8 – 16+ weeks",
    desc: "Fully customized, scalable systems with dedicated engineering support.",
    featured: false,
    href: "https://www.ofashi.com/packages/enterprise-systems",
    features: [
      "Dedicated engineering team",
      "Full-stack platform development",
      "Advanced AI integration",
      "DevOps & CI/CD pipelines",
      "Infrastructure (AWS / VPS / Docker)",
    ],
  },
  // ── Web Design ───────────────────────────────────
  {
    tier: "UI/UX Design",
    category: "Web Design",
    price: "₦150,000",
    per: "/ project",
    timeline: "1 – 3 weeks",
    desc: "Conversion-driven UI/UX design that improves usability, builds trust, and enhances UX.",
    featured: false,
    href: "https://www.ofashi.com/packages/uiux-design",
    features: [
      "UX research & user flows",
      "Wireframing",
      "High-fidelity UI design (Figma)",
      "Design systems",
      "Conversion optimization",
    ],
  },
];
