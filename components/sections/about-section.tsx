import { Compass, Target } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Section } from "./section"

const callouts = [
  {
    icon: Target,
    title: "Our Mission",
    body: "To be the single, dependable technology partner for businesses across Delhi—delivering software, websites, and hardware that are reliable, affordable, and genuinely useful.",
  },
  {
    icon: Compass,
    title: "Our Approach",
    body: "Understand the real problem first, then build or source the simplest solution that works—backed by clear pricing, regular updates, and support that answers when you call.",
  },
]

export function AboutSection() {
  return (
    <Section id="about" className="scroll-mt-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="flex flex-col items-start gap-4">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium tracking-wide">
            Who We Are
          </Badge>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Practical Technology Built for Real-World Performance
          </h2>
          <div className="mt-2 flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Based in New Delhi, Rizeon Enterprises is a technology company that bridges the gap
              between hardware and software. We build the custom desktop and web software that runs
              your business, and we service and supply the laptops, desktops, and accessories your
              team relies on every day—so you never have to juggle multiple vendors.
            </p>
            <p>
              We believe good technology should be practical, not complicated. No bloated templates,
              no unnecessary upsells—just honest advice, clean and reliable builds, and dependable
              hardware, tailored to how you actually work and priced to make sense for growing
              businesses.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {callouts.map(({ icon: Icon, title, body }) => (
            <Card key={title} className="bg-muted/40">
              <CardHeader className="flex flex-row items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                  <Icon className="size-5" aria-hidden />
                </span>
                <CardTitle className="text-lg">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
