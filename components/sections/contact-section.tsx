import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react"

import { FadeIn } from "@/components/motion/reveal"
import { site, whatsappUrl } from "@/lib/site"
import { Section } from "./section"
import { ContactForm } from "./contact-form"

export function ContactSection() {
  return (
    <Section id="contact" className="scroll-mt-24 bg-muted/30">
      <FadeIn className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-4 text-center">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Let&rsquo;s Build or Fix Something Great
        </h2>
        <p className="text-base text-pretty text-muted-foreground sm:text-lg">
          Have a software idea, need a website, or want a quick laptop checkup? Reach out and
          we&rsquo;ll get back to you promptly.
        </p>
      </FadeIn>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Contact details */}
        <FadeIn className="flex flex-col gap-6">
          <ContactRow icon={Phone} label="Phone / WhatsApp">
            <a href={`tel:${site.phoneTel}`} className="font-medium text-foreground hover:underline">
              {site.phoneDisplay}
            </a>
            <a
              href={whatsappUrl("Hi Rizeon Enterprises, I have an enquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <MessageCircle className="size-4" aria-hidden />
              Chat on WhatsApp
            </a>
          </ContactRow>

          <ContactRow icon={Mail} label="Email">
            <a href={`mailto:${site.email}`} className="font-medium text-foreground hover:underline">
              {site.email}
            </a>
          </ContactRow>

          <ContactRow icon={MapPin} label="Location">
            <p className="font-medium text-foreground">{site.locationLine}</p>
          </ContactRow>

          <ContactRow icon={Clock} label="Working Hours">
            <p className="font-medium text-foreground">{site.hours}</p>
          </ContactRow>
        </FadeIn>

        {/* Enquiry form */}
        <FadeIn className="rounded-xl bg-card p-6 ring-1 ring-foreground/10 sm:p-8">
          <h3 className="mb-5 font-heading text-lg font-medium tracking-tight">Send us an enquiry</h3>
          <ContactForm />
        </FadeIn>
      </div>
    </Section>
  )
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Phone
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="flex flex-col">
        <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
          {label}
        </span>
        <div className="mt-0.5 flex flex-col">{children}</div>
      </div>
    </div>
  )
}
