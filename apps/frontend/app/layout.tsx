import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sketchly — Architectural Vector Whiteboard for Mission-Critical Systems",
  description: "Multiplayer vector whiteboard engineered with sub-50ms WebSocket sync, geometric drafting tools, and persistent room history.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head />
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} font-mono bg-[#0c0e11] text-[#e2e2e6] antialiased selection:bg-[#ccff00] selection:text-[#0c0e11]`}
      >
        {children}
      </body>
    </html>
  );
}
