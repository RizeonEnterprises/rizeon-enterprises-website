import { Boxes, CodeXml, Megaphone, ShoppingBag, type LucideIcon } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Section, SectionHeading } from "./section"

type Service = {
  icon: LucideIcon
  title: string
  description: string
}

const services: Service[] = [
  {
    icon: CodeXml,
    title: "Custom Web Development",
    description:
      "High-performance websites and web apps built on modern frameworks, engineered for speed, SEO, and scale.",
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce Solutions",
    description:
      "Conversion-focused online stores with seamless checkout, payments, and inventory that grow revenue.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "SEO, content, and paid campaigns that put your brand in front of the right audience and compound over time.",
  },
  {
    icon: Boxes,
    title: "Business Software",
    description:
      "Custom internal tools, dashboards, and automations that streamline operations and cut the busywork.",
  },
]

export function ServicesSection() {
  return (
    <Section id="services" className="bg-muted/30">
      <SectionHeading
        eyebrow="What we do"
        title="Everything you need to build and grow online"
        description="Four core pillars, one accountable partner, so your digital stack stays fast, cohesive, and ready to scale."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ icon: Icon, title, description }) => (
          <Card
            key={title}
            className="group h-full transition duration-300 hover:-translate-y-1 hover:ring-foreground/20"
          >
            <CardHeader>
              <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" aria-hidden />
              </div>
              <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="leading-relaxed">{description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
