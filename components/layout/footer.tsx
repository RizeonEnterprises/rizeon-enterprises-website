import Image from "next/image"
import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

import { navItems, site } from "@/lib/site"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.4fr]">
          {/* Brand + bio */}
          <div className="flex flex-col gap-4">
            <Link href="#top" className="flex items-center gap-2.5" aria-label={`${site.name} — home`}>
              <Image src="/logo.png" alt="" width={53} height={36} />
              <span className="font-heading text-base font-semibold tracking-tight">{site.name}</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {site.name} — {site.tagline}. Custom software, modern websites, and digital growth for
              clients across India and worldwide, plus laptop repairs and genuine IT accessories
              shipped from New Delhi.
            </p>
          </div>

          {/* Quick nav */}
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <h2 className="font-heading text-sm font-semibold tracking-tight">Quick Links</h2>
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-sm font-semibold tracking-tight">Get in Touch</h2>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <a href={`tel:${site.phoneTel}`} className="transition-colors hover:text-foreground">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-foreground">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <span>{site.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground sm:text-left">
            © 2026 {site.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
