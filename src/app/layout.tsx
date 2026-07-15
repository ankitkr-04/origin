import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Grain } from "@/components/layout/grain";
import { HeatLens } from "@/components/layout/heat-lens";
import { Interactions } from "@/components/layout/interactions";
import { PageTransition } from "@/components/layout/page-transition";
import { ReaderBar } from "@/components/layout/reader-bar";
import { siteConfig } from "@/lib/site-config";
import { env } from "@/lib/env";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

import { getIdentity, getSocialLinks } from "@/db/identity";

export async function generateMetadata(): Promise<Metadata> {
  const [identity, socialLinks] = await Promise.all([
    getIdentity(),
    getSocialLinks(),
  ]);

  const twitterLink =
    socialLinks.find(
      (l) =>
        l.label.toLowerCase().includes("twitter") ||
        l.label.toLowerCase().includes("x"),
    )?.href || "";
  const twitterHandle = twitterLink.split("/").pop() || "";

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${identity.name} — ${identity.headline}`,
      template: `%s — ${identity.name}`,
    },
    description: identity.positioning,
    keywords: siteConfig.keywords as unknown as string[],
    authors: [{ name: identity.name, url: identity.githubUrl }],
    openGraph: {
      title: {
        default: `${identity.name} — ${identity.headline}`,
        template: `%s — ${identity.name}`,
      },
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

import { GlobalCanvas } from "@/components/layout/global-canvas";
import { GlassShardsCanvas } from "@/components/scenes/glass-shards-canvas";
import { TerminalPalette } from "@/components/ui/terminal-palette";
import { WebVitalsReporter } from "@/components/web-vitals";

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
        <Interactions />
        <GlobalCanvas />
        <Suspense fallback={null}>
          <GlassShardsCanvas />
        </Suspense>
        <Suspense fallback={null}>
          <TerminalPalette />
        </Suspense>
        <Suspense fallback={children}>
          <PageTransition>{children}</PageTransition>
        </Suspense>
        <Grain />
        <SpeedInsights />
        {env.ENABLE_WEB_VITALS_ATTRIBUTION ? <WebVitalsReporter /> : null}
      </body>
    </html>
  );
}
