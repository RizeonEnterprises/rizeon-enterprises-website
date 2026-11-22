import Link from "next/link"
import { ArrowRight, Clock, Globe, MessageCircle, Settings2, ShieldCheck, type LucideIcon } from "lucide-react"

import { HeroParticleField } from "@/components/motion/hero-particle-field"
import { StaggerContainer, StaggerItem } from "@/components/motion/reveal"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { whatsappUrl } from "@/lib/site"
import { cn } from "cn"

type TrustItem = { icon: LucideIcon; label: string; description: string }

const trustStrip: TrustItem[] = [
  { icon: Settings2, label: "100% Custom", description: "Built around your exact workflow" },
  { icon: Globe, label: "India & Global", description: "Remote software & web delivery worldwide" },
  { icon: Clock, label: "Same-Day", description: "Hardware diagnostics at our New Delhi desk" },
  { icon: ShieldCheck, label: "Genuine Parts", description: "Warranty-backed hardware & pan-India supply" },
]

export function HeroSection() {
  return (
    <section id="top" className="relative isolate scroll-mt-20 overflow-hidden">
      {/*
        Decorative background. Both layers key off --primary / --foreground, so when
        the brand colors are injected the grid and glow recolor automatically.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_4%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_4%,transparent)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_45%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--primary)_13%,transparent),transparent_70%)]"
      />

      {/* Cursor-reactive particle layer (canvas). Sits above the grid/glow (z-0)
          and below the hero content (z-10); pointer-events-none keeps CTAs clickable. */}
      <HeroParticleField />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-24 pb-20 text-center md:pt-32 md:pb-28">
        <Badge
          variant="secondary"
          className="hero-fade gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide"
        >
          <Globe className="size-3.5" aria-hidden />
          Serving Clients Across India &amp; Worldwide
        </Badge>

        {/* Transform-only entrance keeps the LCP text painted immediately. */}
        <h1 className="hero-rise mt-6 max-w-4xl font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-6xl">
          Turning Your Business Vision Into{" "}
          <span className="text-primary">Reliable Code &amp; Hardware.</span>
        </h1>

        <p className="hero-fade hero-delay-1 mt-6 max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl">
          From custom software, CRMs, Shopify stores, and high-converting websites delivered
          remotely worldwide to expert laptop repairs and genuine IT hardware shipped across
          India—Rizeon Enterprises is your one-stop technology partner.
        </p>

        <div className="hero-fade hero-delay-2 mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="#services"
            className={cn(buttonVariants(), "cta-ambient group/button h-12 gap-2 rounded-xl px-6 text-base")}
          >
            Explore Services
            <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" aria-hidden />
          </Link>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "h-12 gap-2 rounded-xl px-6 text-base")}
          >
            <MessageCircle className="size-4" aria-hidden />
            Chat on WhatsApp
          </a>
        </div>

        {/* Quick Trust Strip (staggered reveal) */}
        <StaggerContainer className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-10 md:grid-cols-4 md:gap-x-4">
          {trustStrip.map(({ icon: Icon, label, description }) => (
            <StaggerItem key={label} className="flex flex-col items-center gap-2 text-center">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="font-heading text-sm font-semibold tracking-tight">{label}</span>
              <span className="text-xs leading-relaxed text-muted-foreground">{description}</span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
