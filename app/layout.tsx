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
  metadataBase: new URL("https://rizeonenterprises.com"),
  title: {
    default:
      "Rizeon Enterprises | Custom Software, Website Development & Laptop Services in Delhi",
    template: "%s | Rizeon Enterprises",
  },
  description:
    "Rizeon Enterprises – Your Vision, Our Code. Complete IT solutions including custom desktop & web software, responsive websites, certified laptop repairs, refurbished/new laptop sales, and genuine computer accessories in New Delhi.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {/* Revalidates cached Sanity data when content is published. Renders nothing. */}
        <SanityLive includeDrafts={false} />
      </body>
    </html>
  );
}
