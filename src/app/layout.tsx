import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import "./globals.css";

/**
 * Type system.
 * - Display: Bebas Neue (SideStreet's condensed headline face).
 * - Body/UI: Manrope — a geometric grotesque standing in for Avenir / Articulat,
 *   with Helvetica in the fallback stack (see --font-sans in globals.css).
 *
 * To swap in the real licensed fonts later: drop the .woff2 files in /public/fonts,
 * declare them with next/font/local here, and point the same two CSS variables at them.
 */
const display = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const sans = Manrope({
  variable: "--font-sans-brand",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://sidestreetmalta.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SideStreet — You bring the headache. We build the story.",
  description:
    "SideStreet is Malta's largest youth news platform. We don't sell reels and carousels — we sell solutions to marketing headaches: clarity, authenticity, utility, trust, credibility and community.",
  keywords: [
    "SideStreet",
    "Malta",
    "content marketing",
    "rate card",
    "native content",
    "vox pop",
    "explainer",
    "mini doc",
    "brand storytelling",
  ],
  openGraph: {
    title: "SideStreet — You bring the headache. We build the story.",
    description:
      "Malta's largest youth news platform. Native content that solves real marketing problems.",
    url: siteUrl,
    siteName: "SideStreet",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SideStreet — You bring the headache. We build the story.",
    description:
      "Malta's largest youth news platform. Native content that solves real marketing problems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
