// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script"; // ← Add this import
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

export const metadata: Metadata = {
  title: "BYD Electric Vehicles Nigeria | eVehicles",
  description:
    "Explore BYD electric cars in Nigeria — Song Plus, Dolphin, Atto 3, Tang, and Seal. Save on fuel, enjoy cutting-edge EV technology, and drive the future today.",
  keywords:
    "BYD Nigeria, electric vehicles Nigeria, BYD Song Plus, BYD Dolphin, BYD Atto 3, EV Lagos, affordable electric cars Nigeria",
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