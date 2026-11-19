import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoJudgment — AI-Powered English Speaking Platform",
  description: "Practice spoken English with real people and AI in a calm, judgment-free environment.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${fraunces.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Doto:wght@600;700;800;900&family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/@fontsource-variable/jetbrains-mono/index.css" rel="stylesheet" />
      </head>
      <body className="bg-[#f6f5f1] text-[#1d1c1a] min-h-screen selection:bg-[#d9b3a9] selection:text-[#1d1c1a] antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
