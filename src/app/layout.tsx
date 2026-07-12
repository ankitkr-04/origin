import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { PageTransition } from "@/components/page-transition";
import { Grain } from "@/components/thermal/grain";
import { HeatLens } from "@/components/thermal/heat-lens";
import { ReaderBar } from "@/components/thermal/reader-bar";
import { ThermalInteractions } from "@/components/thermal/thermal-interactions";
import { siteConfig } from "@/lib/site-config";

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

import { getIdentity, getSocialLinks } from "@/db/queries";

export async function generateMetadata(): Promise<Metadata> {
  const identity = await getIdentity();
  const socialLinks = await getSocialLinks();

  const twitterLink =
    socialLinks.find(
      (l) =>
        l.label.toLowerCase().includes("twitter") ||
        l.label.toLowerCase().includes("x"),
    )?.href || "";
  const twitterHandle = twitterLink.split("/").pop() || "";

  return {
    metadataBase: new URL(siteConfig.url),
    title: `${identity.name} — ${identity.headline}`,
    description: identity.positioning,
    keywords: siteConfig.keywords as unknown as string[],
    authors: [{ name: identity.name, url: identity.githubUrl }],
    openGraph: {
      title: `${identity.name} — ${identity.headline}`,
      description: identity.positioning,
      type: "website",
    },
    twitter: {
      card: "summary",
      creator: twitterHandle ? `@${twitterHandle}` : undefined,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#04070d",
};

import { GlobalCanvas } from "@/components/global-canvas";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="bg-void text-polar antialiased">
        {/* usePathname (for the nav flash) is request data under
            cacheComponents — it must resolve inside a Suspense boundary */}
        <Suspense fallback={null}>
          <ReaderBar />
        </Suspense>
        <HeatLens />
        <ThermalInteractions />
        <GlobalCanvas />
        <Suspense fallback={children}>
          <PageTransition>{children}</PageTransition>
        </Suspense>
        <Grain />
      </body>
    </html>
  );
}
