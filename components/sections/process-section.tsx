import { BadgeCheck, MessageCircle, ReceiptText, Wrench, type LucideIcon } from "lucide-react"

import { StaggerContainer, StaggerItem } from "@/components/motion/reveal"
import { Section, SectionHeading } from "./section"

type Step = {
  icon: LucideIcon
  title: string
  description: string
}

const steps: Step[] = [
  {
    icon: MessageCircle,
    title: "Share Your Requirement",
    description:
      "Call, WhatsApp, or fill out our enquiry form with what you need—software, a website, repair, or hardware.",
  },
  {
    icon: ReceiptText,
    title: "Clear Plan & Quote",
    description:
      "We evaluate your needs and share a straightforward timeline and cost estimate.",
  },
  {
    icon: Wrench,
    title: "Build, Fix, or Source",
    description:
      "We develop your software/website with regular previews, or repair/prepare your hardware with quality checks.",
  },
  {
    icon: BadgeCheck,
    title: "Delivery & Ongoing Support",
    description:
      "Handover with full testing, guidance, and reliable post-delivery support.",
  },
]

export function ProcessSection() {
  return (
    <Section id="process" className="scroll-mt-24">
      <SectionHeading
        eyebrow="How We Work"
        title="A proven path from idea to launch"
        description="A transparent, four-step process that keeps every project on track and every stakeholder in the loop."
      />

      <StaggerContainer className="relative mx-auto mt-14 max-w-3xl">
        {/* Connecting rail, aligned to the center of each number node. */}
        <div aria-hidden className="absolute top-2 bottom-2 left-5 w-px bg-border md:left-6" />

        {steps.map(({ icon: Icon, title, description }, index) => (
          <StaggerItem key={title} className="group relative flex gap-5 pb-10 last:pb-0 md:gap-7">
            <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background font-heading text-sm font-semibold transition-colors duration-200 group-hover:border-primary/40 group-hover:text-primary md:size-12 md:text-base">
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
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  )
}
