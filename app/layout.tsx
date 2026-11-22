import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { MotionProvider } from "@/components/motion/reveal";
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
  metadataBase: new URL("https://rizeonenterprises.com"),
  title: {
    default:
      "Rizeon Enterprises | Custom Software, Web Development & IT Solutions — India & Global",
    template: "%s | Rizeon Enterprises",
  },
  description:
    "Rizeon Enterprises – Your Vision, Our Code. Custom desktop & web software, CRMs, responsive websites, Shopify stores, and SEO for clients across India and worldwide—plus certified laptop repairs, refurbished laptops, and genuine IT accessories shipped across India from New Delhi.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* MotionConfig provider (renders no DOM node, so the flex layout is unchanged). */}
        <MotionProvider>{children}</MotionProvider>
        {/* Revalidates cached Sanity data when content is published. Renders nothing. */}
        <SanityLive includeDrafts={false} />
      </body>
    </html>
  );
}
