// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script"; // ← Add this import
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

export const metadata: Metadata = {
  title: "Ofashi | Custom Web Development & Website Design Nigeria | AI Automation | AI Integrations ",
  description:
    "Expert custom web development, website design, e-commerce apps,AI Automation, and AI integration in Nigeria. Hand-coded with FastAPI, Django, React & Next.js — fast, scalable, AI-ready solutions delivered in days.",
  keywords:
    "custom web development Nigeria, website design Lagos, e-commerce app Nigeria, AI Automation, AI integration Nigeria, Next.js developer, FastAPI developer, React developer, Django developer, Ofashi, Ofashi design",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ← GOOGLE ANALYTICS / GTAG − START */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LR0RNH5DR9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LR0RNH5DR9', {
              page_path: window.location.pathname + window.location.search,
            });
          `}
        </Script>
        {/* ← END GOOGLE ANALYTICS */}
      </head>

      <body className="bg-black text-gray-100 font-sans antialiased overflow-x-hidden">
        <Navbar />
        <main className="pt-20">
          {children}
          <FloatingContact />
        </main>
        <Footer />
      </body>
    </html>
  );
}