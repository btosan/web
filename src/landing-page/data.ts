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
    image: "/assets/lp/of-byd4.png",
    tag: "Landing Page · Automotive",
    title: "BYD EV Landing Page",
    description:
      "High-converting, SEO-optimized landing page for BYD electric vehicles in Nigeria.",
    liveUrl: "https://byd.evehicles.com.ng",
  },
{
  image: "/assets/lp/of-cs.png",
  tag: "Energy · Solar",
  title: "Contained Solar Platform",
  description:
    "Modern solar solutions platform showcasing products, services, and clean energy adoption for homes and businesses.",
  liveUrl: "https://containedsolar.com",
},
  {
    image: "/assets/lp/of-coin6.png",
    tag: "Web3 · Fintech",
    title: "Coinplacid Investment Platform",
    description:
      "Crypto investment and lending platform with real-time data and asset management features.",
    liveUrl: "https://coinplacid.ofashi.com",
  },
  {
    image: "/assets/lp/of-ev.png",
    tag: "Marketplace",
    title: "eVehicles NG Web App",
    description:
      "Electric vehicle marketplace with inventory management and seamless browsing experience.",
    liveUrl: "https://evehicles.com.ng",
  },

  {
    image: "/assets/lp/of-ng.png",
    tag: "SaaS · Directory",
    title: "NGPage — Nigerian Business Directory",
    description:
      "Multi-tenant business directory and website builder for Nigerian SMEs.",
    liveUrl: "https://www.ngpage.com",
  },
  {
    image: "/assets/lp/of-bk.png",
    tag: "E-Commerce",
    title: "TX Bookstore Platform",
    description:
      "Full-stack online bookstore with payments and admin dashboard.",
    liveUrl: "https://bookstore.ofashi.com",
  },
];
export const testimonials = [
  {
    quote:
      "Ofashi delivered a clean, scalable platform that perfectly showcases our electric vehicle offerings. The experience was smooth from start to finish, and the final product exceeded expectations.",
    name: "Kingsley Ogwu",
    role: "CEO, eVehicles NG",
    initials: "KO",
    color: "bg-[#0ea5e9]",
  },
  {
    quote:
      "Working with Ofashi gave us a strong digital foundation for our solar business. They understood our vision and translated it into a modern, high-performing platform that truly represents our brand.",
    name: "Ochonogor Emi",
    role: "Founder, Contained Solar",
    initials: "OE",
    color: "bg-[#f59e0b]",
  },
  {
    quote:
      "The Coinplacid platform was built with precision and scalability in mind. Ofashi handled everything from product design to development seamlessly. Highly reliable team.",
    name: "Emmanuel Edem",
    role: "Founder, Coinplacid",
    initials: "EE",
    color: "bg-[#10b981]",
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
    tier: "E-Commerce Systems",
    category: "Web Development",
    price: "₦700,000",
    per: "/ project",
    timeline: "4 – 6 weeks",
    desc: "Custom-built e-commerce platforms designed for performance, scalability, and seamless buying experiences.",
    featured: false,
    href: "https://www.ofashi.com/packages/e-commerce-solutions",
    features: [
      "Custom e-commerce platform (no Shopify/WooCommerce)",
      "Product & inventory management system",
      "Payment integration (Paystack / Flutterwave / Stripe)",
      "User accounts & order tracking",
      "Admin dashboard",
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
    tier: "One Page Website",
    category: "Web Design",
    price: "₦50,000",
    per: "/ project",
    timeline: "1 – 3 days",
    desc: "Custom-designed one-page website for businesses that need a fast, polished online presence.",
    featured: false,
    href: "https://www.ofashi.com/packages/one-page-website",
    features: [
      "1 year hosting + .com.ng domain name",
      "WhatsApp button integration",
      "Custom design",
      "No WordPress or templates",
      "No admin dashboard or contact form",
    ],
  },
  {
    tier: "Website Redesign",
    category: "Web Design",
    price: "₦120,000",
    per: "/ project",
    timeline: "1 – 3 weeks",
    desc: "Strategic website redesigns that modernize your brand, improve usability, and increase conversions.",
    featured: false,
    href: "https://www.ofashi.com/packages/website-redesign",
    features: [
      "Full website visual refresh",
      "Improved UX and page structure",
      "Modern responsive layouts",
      "Brand-aligned interface updates",
      "Conversion-focused redesign",
    ],
  },
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