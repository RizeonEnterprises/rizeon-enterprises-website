import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SanityLive } from "@/sanity/live";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rizeon Enterprises — Digital Solutions that Scale Your Business",
    template: "%s — Rizeon Enterprises",
  },
  description:
    "Rizeon Enterprises designs, builds, and scales custom web platforms, e-commerce, and business software for ambitious companies.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {/* Revalidates cached Sanity data when content is published. Renders nothing. */}
        <SanityLive includeDrafts={false} />
      </body>
    </html>
  );
}
