import type { Metadata } from "next";
import { Archivo, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono-geist",
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
      className={`${inter.variable} ${archivo.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
