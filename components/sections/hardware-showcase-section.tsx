import { HardDrive, Laptop, MessageCircle, Plug, Keyboard, Truck, type LucideIcon } from "lucide-react"

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/reveal"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { whatsappUrl } from "@/lib/site"
import { cn } from "cn"
import { Section, SectionHeading } from "./section"

type StockLevel = "In Stock" | "Limited Stock"

type HardwareRow = {
  icon: LucideIcon
  category: string
  items: string
  stock: StockLevel
  warranty: string
}

const rows: HardwareRow[] = [
  {
    icon: HardDrive,
    category: "Speed Upgrades",
    items: "NVMe & SATA SSDs (256GB–2TB), DDR4 & DDR5 RAM (8GB–32GB)",
    stock: "In Stock",
    warranty: "Up to 5-yr warranty",
  },
  {
    icon: Keyboard,
    category: "Workstation Gear",
    items: "Wireless/wired keyboards, ergonomic mice, laptop stands, webcams, Type-C hubs",
    stock: "In Stock",
    warranty: "1-yr warranty",
  },
  {
    icon: Plug,
    category: "Power & Backup",
    items: "Original laptop chargers, surge protectors, UPS units, Wi-Fi routers",
    stock: "In Stock",
    warranty: "Warranty-backed",
  },
  {
    icon: Laptop,
    category: "Refurbished Laptops",
    items: "Certified refurbished & new business laptops (i5/i7, SSD, warranty-checked)",
    stock: "Limited Stock",
    warranty: "6-month warranty",
  },
]

function StockBadge({ stock }: { stock: StockLevel }) {
  return (
    <Badge variant={stock === "In Stock" ? "secondary" : "outline"} className="rounded-full">
      {stock}
    </Badge>
  )
}

export function HardwareShowcaseSection() {
  return (
    <Section id="products" className="scroll-mt-24 bg-muted/30">
      <SectionHeading
        eyebrow="Products"
        title="Featured Hardware & Accessories Showcase"
        description="Genuine, warranty-backed parts and devices—ready to ship or install. Stock moves fast, so message us to confirm current availability and pricing."
      />

      <p className="mx-auto mt-4 flex max-w-2xl items-center justify-center gap-2 text-center text-sm text-muted-foreground">
        <Truck className="size-4 shrink-0 text-primary" aria-hidden />
        Pan-India shipping for laptops, accessories &amp; bulk office orders—with in-store
        installation and repair available in New Delhi.
      </p>

      {/* Desktop / tablet: table */}
      <FadeIn className="mt-12 hidden overflow-hidden rounded-xl ring-1 ring-foreground/10 md:block">
        <table className="w-full table-fixed border-collapse text-left text-sm">
          <thead className="bg-muted/60 text-xs tracking-wide text-muted-foreground uppercase">
            <tr>
              <th scope="col" className="w-[24%] px-5 py-3 font-medium">Category</th>
              <th scope="col" className="w-[42%] px-5 py-3 font-medium">Featured Items</th>
              <th scope="col" className="w-[16%] px-5 py-3 font-medium">Availability</th>
              <th scope="col" className="w-[18%] px-5 py-3 font-medium">Warranty</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ icon: Icon, category, items, stock, warranty }) => (
              <tr key={category} className="border-t border-border bg-card">
                <th scope="row" className="px-5 py-4 text-left align-top font-medium">
                  <span className="flex items-center gap-2.5">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                      <Icon className="size-4.5" aria-hidden />
                    </span>
                    {category}
                  </span>
                </th>
                <td className="px-5 py-4 align-top text-muted-foreground">{items}</td>
                <td className="px-5 py-4 align-top"><StockBadge stock={stock} /></td>
                <td className="px-5 py-4 align-top text-muted-foreground">{warranty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </FadeIn>

      {/* Mobile: stacked cards (staggered reveal) */}
      <StaggerContainer className="mt-10 flex flex-col gap-4 md:hidden">
        {rows.map(({ icon: Icon, category, items, stock, warranty }) => (
          <StaggerItem key={category} className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2.5 font-medium">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                  <Icon className="size-4.5" aria-hidden />
                </span>
                {category}
              </span>
              <StockBadge stock={stock} />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{items}</p>
            <p className="mt-2 text-xs font-medium text-foreground/70">{warranty}</p>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* CTA banner */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-background p-6 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-pretty text-muted-foreground sm:text-base">
          Looking for a specific model or bulk office order? Message us on WhatsApp for today&rsquo;s
          best price.
        </p>
        <a
          href={whatsappUrl("Hi Rizeon Enterprises, I'd like a price on some hardware/accessories.")}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants(), "shrink-0 gap-2 rounded-xl")}
        >
          <MessageCircle className="size-4" aria-hidden />
          Message on WhatsApp
        </a>
      </div>
    </Section>
  )
}
