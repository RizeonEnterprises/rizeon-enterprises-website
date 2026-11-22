import { Clock, Gauge, Headset, Layers, ReceiptText, type LucideIcon } from "lucide-react"

import { StaggerContainer, StaggerItem } from "@/components/motion/reveal"
import { Section, SectionHeading } from "./section"

type ValueProp = {
  icon: LucideIcon
  title: string
  description: string
}

const valueProps: ValueProp[] = [
  {
    icon: Layers,
    title: "One Partner for Everything IT",
    description:
      "Software, websites, repairs, and hardware—managed under one roof, so you deal with one accountable team instead of five vendors.",
  },
  {
    icon: ReceiptText,
    title: "Transparent Pricing",
    description:
      "Clear quotes with no hidden charges and no unnecessary upsells. You know the cost and timeline before we start.",
  },
  {
    icon: Gauge,
    title: "Built for Speed & Reliability",
    description:
      "Clean, tested code and quality-checked hardware, engineered to perform—and to keep performing.",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description:
      "Same-day diagnostics and fast project delivery. We respect your deadlines and your downtime.",
  },
  {
    icon: Headset,
    title: "Direct Support",
    description:
      "Talk to the people who actually did the work—reliable post-delivery support, straight from our team.",
  },
]

export function WhyUsSection() {
  return (
    <Section id="why-us" className="scroll-mt-20">
      <SectionHeading
        eyebrow="Why Us"
        title="Why Choose Rizeon Enterprises"
        description="One team that treats your business like its own—practical, transparent, and quick to respond."
      />

      <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {valueProps.map(({ icon: Icon, title, description }) => (
          // StaggerItem (motion) owns the reveal transform; the inner div owns the
          // hover lift, so the two transforms never fight.
          <StaggerItem key={title} className="h-full">
            <div className="flex h-full flex-col gap-3 rounded-xl bg-card p-6 ring-1 ring-foreground/10 transition-transform duration-200 hover:-translate-y-1 hover:ring-foreground/20">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="font-heading text-lg font-medium tracking-tight">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  )
}
