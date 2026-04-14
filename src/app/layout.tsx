import "./globals.css";
import { DM_Sans, Barlow } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextAuthProviders from "./NextAuthProviders";
import HolyLoader from "holy-loader";
import FloatingContact from "@/components/FloatingContact";
import PresenceHeartbeat from "@/components/presence/PresenceHeartbeat";
import { headers } from "next/headers";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const isLanding = pathname.startsWith("/web-development");

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
      </head>

      <body
        className={`${
          isLanding ? "bg-[#f7f4ef]" : "bg-black"
        } text-gray-100 font-sans antialiased overflow-x-hidden`}
      >
        <HolyLoader color="#c084fc" />
        <NextAuthProviders>
          <PresenceHeartbeat />
          <TooltipProvider>
            {!isLanding && <Navbar />}
            <main className={!isLanding ? "pt-18 lg:pt-24" : ""}>
              {children}
              <FloatingContact />
            </main>
            <Footer />
          </TooltipProvider>
        </NextAuthProviders>
      </body>
    </html>
  );
}