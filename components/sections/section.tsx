import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { cn } from "cn"

/**
 * Consistent page section: full-width band with a centered, max-width container.
 * Vertical rhythm and gutters live here so every section lines up.
 */
function Section({ className, children, ...props }: React.ComponentProps<"section">) {
  return (
    <section className={cn("w-full py-20 md:py-28", className)} {...props}>
      <div className="mx-auto w-full max-w-6xl px-6">{children}</div>
    </section>
  )
}

/**
 * Eyebrow + heading + description block shared by sections.
 * `align` controls text alignment; defaults to centered.
 */
function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: "center" | "start"
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-2xl items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium tracking-wide">
          {eyebrow}
        </Badge>
      ) : null}
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base text-pretty text-muted-foreground sm:text-lg">{description}</p>
      ) : null}
    </div>
  )
}

export { Section, SectionHeading }
