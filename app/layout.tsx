import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
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

const siteUrl = "https://rizeonenterprises.com";
const siteTitle =
  "Rizeon Enterprises | Custom Software, Web Development & IT Solutions — India & Global";
const siteDescription =
  "Rizeon Enterprises – Your Vision, Our Code. Custom desktop & web software, CRMs, responsive websites, Shopify stores, and SEO for clients across India and worldwide—plus certified laptop repairs, refurbished laptops, and genuine IT accessories shipped across India from New Delhi.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Rizeon Enterprises",
  },
  description: siteDescription,
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Rizeon Enterprises",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    images: [{ url: "/logo.png", width: 268, height: 182, alt: "Rizeon Enterprises" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* MotionConfig provider (renders no DOM node, so the flex layout is unchanged). */}
        <MotionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
        {/* Revalidates cached Sanity data when content is published. Renders nothing. */}
        <SanityLive includeDrafts={false} />
      </body>
    </html>
  );
}
