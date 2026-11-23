import Image from "next/image"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { navItems, site } from "@/lib/site"
import { cn } from "cn"
import { HomeLink } from "./home-link"
import { MobileNav } from "./mobile-nav"

/**
 * Floating pill header (Server Component). Interactive pieces are isolated in
 * client islands: <HomeLink /> (brand + Home link) and <MobileNav /> (drawer).
 *
 * The wordmark text always renders beside the logo, so if `/logo.png` is ever
 * missing the brand name still shows (graceful text fallback).
 */
export function Navbar() {
  return (
    // Sticky wrapper floats the pill off the top/side edges; pointer-events-none
    // lets content scroll behind the side gutters without blocking clicks there.
    <header className="pointer-events-none sticky top-3 z-50 w-full px-4 sm:top-4 sm:px-6">
      <div className="pointer-events-auto mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full border border-border/70 bg-white/90 px-4 shadow-lg shadow-slate-900/8 backdrop-blur-md sm:h-16 sm:px-6 dark:bg-background/90">
        <HomeLink className="flex items-center gap-2.5" ariaLabel={`${site.name} — home`}>
          <Image src="/logo.png" alt="" width={50} height={34} priority />
          <span className="font-heading text-base font-bold tracking-tight whitespace-nowrap text-primary">
            {site.name}
          </span>
        </HomeLink>

        <nav className="hidden items-center gap-4 lg:flex xl:gap-6" aria-label="Primary">
          {navItems.map((item) => {
            const className =
              "text-sm font-medium whitespace-nowrap text-foreground/80 transition-colors hover:text-primary"
            return item.label === "Home" ? (
              <HomeLink key={item.href} className={className}>
                {item.label}
              </HomeLink>
            ) : (
              <Link key={item.href} href={item.href} className={className}>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className={cn(buttonVariants(), "hidden rounded-full sm:inline-flex")}
          >
            Get a Free Quote
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
