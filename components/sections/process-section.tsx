import { Code2, DraftingCompass, Rocket, Search, type LucideIcon } from "lucide-react"

import { Section, SectionHeading } from "./section"

type Step = {
  icon: LucideIcon
  title: string
  description: string
}

const steps: Step[] = [
  {
    icon: Search,
    title: "Discovery",
    description:
      "We dig into your goals, users, and market to define a clear scope and a roadmap worth building.",
  },
  {
    icon: DraftingCompass,
    title: "Design & Strategy",
    description:
      "Wireframes, UI design, and technical architecture that balance beautiful with buildable.",
  },
  {
    icon: Code2,
    title: "Development & Execution",
    description:
      "Agile sprints with clean, tested code and regular demos, so you see real progress every week.",
  },
  {
    icon: Rocket,
    title: "Launch & Support",
    description:
      "A smooth go-live, performance monitoring, and ongoing support to keep you scaling after launch.",
  },
]

export function ProcessSection() {
  return (
    <Section id="process">
      <SectionHeading
        eyebrow="How we work"
        title="A proven path from idea to launch"
        description="A transparent, four-step process that keeps every project on track and every stakeholder in the loop."
      />

      <ol className="relative mx-auto mt-14 max-w-3xl">
        {/* Connecting rail, aligned to the center of each number node. */}
        <div
          aria-hidden
          className="absolute top-2 bottom-2 left-5 w-px bg-border md:left-6"
        />

        {steps.map(({ icon: Icon, title, description }, index) => (
          <li key={title} className="relative flex gap-5 pb-10 last:pb-0 md:gap-7">
            <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background font-heading text-sm font-semibold md:size-12 md:text-base">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="pt-1 md:pt-1.5">
              <div className="flex items-center gap-2">
                <Icon className="size-4 text-primary" aria-hidden />
                <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="mt-1.5 font-heading text-xl font-medium tracking-tight">{title}</h3>
              <p className="mt-2 max-w-xl text-pretty text-muted-foreground">{description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
