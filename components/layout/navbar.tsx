import Image from "next/image"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { navItems, site } from "@/lib/site"
import { cn } from "cn"
import { MobileNav } from "./mobile-nav"

/**
 * Sticky site header (Server Component). The only interactive piece — the mobile
 * drawer — is isolated in <MobileNav />, so the header itself stays static.
 *
 * The wordmark text always renders beside the logo, so if `/logo.png` is ever
 * missing the brand name still shows (graceful text fallback).
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="#top" className="flex items-center gap-2.5" aria-label={`${site.name} — home`}>
          <Image src="/logo.png" alt="" width={53} height={36} priority />
          <span className="font-heading text-base font-semibold tracking-tight">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="#contact"
            className={cn(buttonVariants(), "hidden rounded-xl sm:inline-flex")}
          >
            Get a Free Quote
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
