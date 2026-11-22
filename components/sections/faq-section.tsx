import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Section, SectionHeading } from "./section"

type Faq = { question: string; answer: string }

const faqs: Faq[] = [
  {
    question: "Can you build custom software for my office or shop?",
    answer:
      "Yes. We build Windows desktop and web apps for billing, inventory, attendance, payroll, CRM, and more—designed around your exact workflow, with secure databases and dedicated post-deployment support.",
  },
  {
    question: "How long does a website take to build?",
    answer:
      "Most business websites and landing pages go live in about 5–10 days, depending on the number of pages, how ready your content is, and features like payment gateways.",
  },
  {
    question: "Do your repairs and accessories come with a warranty?",
    answer:
      "Yes. Genuine parts and accessories are warranty-backed, and repairs carry a service warranty. We share the exact terms up front before any work begins.",
  },
  {
    question: "Do you handle bulk orders with GST billing?",
    answer:
      "Absolutely. We supply refurbished and new laptops plus accessories in bulk for offices and institutes, with GST-ready invoices and ongoing IT support. Message us for a quote.",
  },
]

export function FaqSection() {
  return (
    <Section id="faq" className="scroll-mt-20 bg-muted/30">
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Quick answers to what clients ask most. Still unsure? Reach out and we'll help."
      />

      {/*
        <Accordion> is a client island (Base UI). The section itself stays a Server
        Component — only static content is passed in, so `/` stays prerendered.
      */}
      <Accordion defaultValue={["faq-0"]} className="mx-auto mt-10 max-w-3xl">
        {faqs.map(({ question, answer }, index) => (
          <AccordionItem key={question} value={`faq-${index}`}>
            <AccordionTrigger className="py-4 text-base">{question}</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  )
}
