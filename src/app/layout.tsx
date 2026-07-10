import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
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
  themeColor: "#0a0c10",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable}`}
    >
      <body className="bg-ink text-text antialiased">{children}</body>
    </html>
  );
}
