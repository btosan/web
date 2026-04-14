import "./landing.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ofashi.com"),
  title:
    "Ofashi | AI-Powered Web Development, Custom Apps, AI Automation & Integrations",
  description:
    "Ofashi builds AI-powered full-stack applications and custom websites that drive real business growth. We combine modern web development, smart automation, and exceptional UI/UX to create fast, scalable, and conversion-focused digital solutions for businesses in Nigeria and beyond.",
  keywords:
    "AI web development Nigeria, custom web applications Nigeria, AI automation services, AI integration, website design Nigeria, business process automation, Next.js developers, React developers, Django developers, FastAPI developers, AI integration services, Ofashi",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: "#f7f4ef",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};


export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
