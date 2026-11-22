import Link from "next/link"
import { ArrowRight, Clock, Layers, MessageCircle, Settings2, ShieldCheck, type LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { whatsappUrl } from "@/lib/site"
import { cn } from "cn"

type TrustItem = { icon: LucideIcon; label: string; description: string }

const trustStrip: TrustItem[] = [
  { icon: Settings2, label: "100% Custom", description: "Built around your exact workflow" },
  { icon: Clock, label: "Same-Day", description: "Diagnostics for laptop & desktop repairs" },
  { icon: ShieldCheck, label: "Genuine Parts", description: "Warranty-backed hardware & accessories" },
  { icon: Layers, label: "End-to-End", description: "Software, web, and hardware under one roof" },
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
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_6%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_6%,transparent)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_55%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_70%)]"
      />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-24 pb-20 text-center md:pt-32 md:pb-28">
        <Badge
          variant="secondary"
          className="gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide"
        >
          <Settings2 className="size-3.5" aria-hidden />
          Complete Software &amp; Hardware Solutions
        </Badge>

        <h1 className="mt-6 max-w-4xl font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-6xl">
          Turning Your Business Vision Into{" "}
          <span className="text-primary">Reliable Code &amp; Hardware.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl">
          From tailor-made desktop software, CRMs, and high-converting websites to expert laptop
          repairs and genuine computer accessories—Rizeon Enterprises is your one-stop technology
          partner.
        </p>

        <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="#services"
            className={cn(buttonVariants(), "group/button h-12 gap-2 rounded-xl px-6 text-base")}
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

        {/* Quick Trust Strip */}
        <dl className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-10 md:grid-cols-4 md:gap-x-4">
          {trustStrip.map(({ icon: Icon, label, description }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                <Icon className="size-5" aria-hidden />
              </span>
              <dt className="font-heading text-sm font-semibold tracking-tight">{label}</dt>
              <dd className="text-xs leading-relaxed text-muted-foreground">{description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
