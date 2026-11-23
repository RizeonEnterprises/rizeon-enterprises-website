"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navItems, site } from "@/lib/site"
import { cn } from "cn"
import { HomeLink } from "./home-link"

/**
 * Mobile navigation drawer. Client island — the Sheet (Base UI Dialog) open
 * state is controlled here so each link can be a real <a> (via next/link) that
 * closes the drawer on tap. (Base UI's <SheetClose> expects a native <button>,
 * so we close imperatively rather than rendering an anchor as a close button.)
 * Base UI uses the `render` prop for polymorphism, not Radix `asChild`.
 */
export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu" />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent side="right" className="w-72">
        <SheetHeader className="border-b">
          <SheetTitle>{site.name}</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-0.5 px-4" aria-label="Mobile">
          {navItems.map((item) => {
            const className =
              "rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            return item.label === "Home" ? (
              <HomeLink key={item.href} className={className} onNavigate={() => setOpen(false)}>
                {item.label}
              </HomeLink>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={className}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto p-4">
          <Link
            href="#contact"
            onClick={() => setOpen(false)}
            className={cn(buttonVariants(), "w-full rounded-xl")}
          >
            Get a Free Quote
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
