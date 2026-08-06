import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Footer from "@/components/layouts/Footer";
import "./globals.css";

// Space Grotesk: bold, slightly technical display face — carries the
// "catalog" personality on headings and product titles.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
});

// Inter: quiet, legible body face — doesn't compete with the display face.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

// JetBrains Mono: used specifically for numbers — prices, quantities,
// category tags — so they read like spec-sheet data, not decoration.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Shop — Catalog",
  description: "Everyday gear, catalogued.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} bg-[#F1F0EC] font-(--font-body) text-[#16171B]`}
      >
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}