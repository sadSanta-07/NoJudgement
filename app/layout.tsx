"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";


const font = Space_Grotesk({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}