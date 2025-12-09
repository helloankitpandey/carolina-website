import Footer from "@/components/Footer";
import HeaderWrapper from "@/components/HeaderWrapper";
import NeonCursor from "@/components/NeonCursor";
import NewsletterSignup from "@/components/NewsletterSignup";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

const primaryFont = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Carolina, The Luminary Lounge",
  description: "Foundational site for Carolina's Neon Luxury Lounge experience.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${primaryFont.variable} ${monoFont.variable} bg-black text-neutral-100 antialiased`}>
        <div className="flex min-h-screen flex-col bg-black">
          <NeonCursor />
          <HeaderWrapper />
          <main className="w-full flex-1">{children}</main>
          <section className="mx-auto w-full max-w-5xl px-4 pb-8">
            {/* <NewsletterSignup /> */}
          </section>
          <Footer />
        </div>
      </body>
    </html>
  );
}
