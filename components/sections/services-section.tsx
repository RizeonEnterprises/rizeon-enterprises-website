import {
  Building2,
  Keyboard,
  LayoutTemplate,
  MonitorCog,
  ShoppingCart,
  Wrench,
  type LucideIcon,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Section, SectionHeading } from "./section"

type Service = {
  icon: LucideIcon
  title: string
  tagline: string
  description: string
}

type Track = {
  id: string
  label: string
  title: string
  services: Service[]
}

const tracks: Track[] = [
  {
    id: "track-a",
    label: "Track A",
    title: "Software, Web & Digital Growth",
    services: [
      {
        icon: MonitorCog,
        title: "Custom Software & CRM Development",
        tagline: "Software Built Around Your Workflow",
        description:
          "Windows desktop apps (billing, inventory, attendance & payroll), personalized CRMs & management software, PDF/Excel automation, secure local/cloud databases & admin panels, and dedicated post-deployment support.",
      },
      {
        icon: LayoutTemplate,
        title: "Website Design & Development",
        tagline: "Fast, Modern Websites That Bring You Customers",
        description:
          "Business and corporate websites, high-converting portfolio & landing pages, WordPress and custom-coded static/dynamic web apps with payment gateways, plus domain, SSL hosting & maintenance.",
      },
      {
        icon: ShoppingCart,
        title: "E-Commerce & Digital Growth",
        tagline: "Launch, Rank & Scale Online",
        description:
          "Online Shopify stores & theme customizations, technical and local SEO optimization, social media handling, and lead-generation campaigns.",
      },
    ],
  },
  {
    id: "track-b",
    label: "Track B",
    title: "Hardware, Repairs & Accessories",
    services: [
      {
        icon: Wrench,
        title: "Laptop Repair & Certified Sales",
        tagline: "Honest Diagnostics, Precision Repairs & Quality Laptops",
        description:
          "Screen, keyboard, hinge, battery & motherboard servicing; SSD/RAM & thermal upgrades; OS installation & data recovery; plus new and certified refurbished laptops.",
      },
      {
        icon: Keyboard,
        title: "Desktop & Laptop Accessories",
        tagline: "Genuine Peripherals & Upgrades for Everyday Productivity",
        description:
          "NVMe/SATA SSDs & DDR4/DDR5 RAM, wireless/wired keyboards & ergonomic mice, laptop stands, webcams & Type-C hubs, original chargers & surge protectors, routers & headsets.",
      },
      {
        icon: Building2,
        title: "Bulk Office & Institutional IT Supply",
        tagline: "GST-Ready Procurement & Setup",
        description:
          "Bulk refurbished/new laptops, workstation accessories, and ongoing IT support for offices, startups, and institutes.",
      },
    ],
  },
]

function ServiceCard({ icon: Icon, title, tagline, description }: Service) {
  return (
    <Card className="group h-full gap-0 transition duration-300 hover:-translate-y-1 hover:ring-foreground/20">
      <CardHeader>
        <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="size-5" aria-hidden />
        </div>
        <CardTitle className="text-lg leading-snug">{title}</CardTitle>
        <CardDescription className="mt-1 font-medium text-foreground/70">{tagline}</CardDescription>
      </CardHeader>
      <CardContent className="mt-3">
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

export function ServicesSection() {
  return (
    <Section id="services" className="scroll-mt-20 bg-muted/30">
      <SectionHeading
        eyebrow="What We Do"
        title="Full-Stack IT Services, Two Clear Tracks"
        description="Everything from the software that runs your business to the hardware your team depends on—delivered and supported by one accountable partner."
      />

      <div className="mt-14 flex flex-col gap-12">
        {tracks.map((track) => (
          <div key={track.id}>
            <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
                {track.label}
              </span>
              <h3 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                {track.title}
              </h3>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {track.services.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
