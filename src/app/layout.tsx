import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { PageTransition } from "@/components/page-transition";
import { Grain } from "@/components/thermal/grain";
import { HeatLens } from "@/components/thermal/heat-lens";
import { ReaderBar } from "@/components/thermal/reader-bar";
import { ThermalInteractions } from "@/components/thermal/thermal-interactions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face. The wdth axis (62–125%) is what enables temperature
// typography: expanded-light "frozen" headings, condensed-black "molten"
// emphasis — see .type-frozen / .type-molten in globals.css.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Ankit Kumar — Systems & Backend Engineer",
  description:
    "Storage engines, Redis-compatible servers, and high-concurrency backends. TCS CodeVita global rank 15, Codeforces Expert. B.Tech CSE, class of 2026.",
  keywords: [
    "systems engineer",
    "backend engineer",
    "storage engine",
    "C++",
    "Java",
    "concurrency",
  ],
  authors: [{ name: "Ankit Kumar", url: "https://github.com/ankitkr-04" }],
  openGraph: {
    title: "Ankit Kumar — Systems & Backend Engineer",
    description:
      "Storage engines, Redis-compatible servers, and high-concurrency backends.",
    type: "website",
  },
  twitter: {
    card: "summary",
    creator: "@AnkitKr_04",
  },
};

export const viewport: Viewport = {
  themeColor: "#04070d",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable}`}
    >
      <body className="bg-void text-polar antialiased">
        {/* usePathname (for the nav flash) is request data under
            cacheComponents — it must resolve inside a Suspense boundary */}
        <Suspense fallback={null}>
          <ReaderBar />
        </Suspense>
        <HeatLens />
        <ThermalInteractions />
        <Suspense fallback={children}>
          <PageTransition>{children}</PageTransition>
        </Suspense>
        <Grain />
      </body>
    </html>
  );
}
