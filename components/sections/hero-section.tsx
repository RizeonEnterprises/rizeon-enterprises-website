import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"

/** Placeholder credibility stats — swap for real figures before launch. */
const stats = [
  { value: "150+", label: "Projects delivered" },
  { value: "98%", label: "Client retention" },
  { value: "10+ yrs", label: "Building the web" },
]

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      {/*
        Decorative background. Both layers key off --primary / --foreground, so when
        the brand colors are injected later the grid and glow recolor automatically.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_6%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_6%,transparent)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_55%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_70%)]"
      />

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 pt-28 pb-20 text-center md:pt-36 md:pb-28">
        <Badge
          variant="secondary"
          className="gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide"
        >
          <Sparkles className="size-3.5" aria-hidden />
          Digital Growth Partners
        </Badge>

        <h1 className="mt-6 font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl">
          Digital Solutions that <span className="text-primary">Scale Your Business</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl">
          We design, build, and scale custom web platforms, e-commerce, and software that turn
          ambitious businesses into category leaders.
        </p>

        <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/contact"
            className={cn(buttonVariants(), "h-12 gap-2 rounded-xl px-6 text-base")}
          >
            Start Your Project
            <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" aria-hidden />
          </Link>
          <Link
            href="/work"
            className={cn(buttonVariants({ variant: "outline" }), "h-12 rounded-xl px-6 text-base")}
          >
            View Work
          </Link>
        </div>

        <dl className="mt-14 grid w-full max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dt className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                {stat.value}
              </dt>
              <dd className="text-xs text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
