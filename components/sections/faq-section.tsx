import { FadeIn } from "@/components/motion/reveal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/lib/faqs"
import { Section, SectionHeading } from "./section"

export function FaqSection() {
  return (
    <Section id="faq" className="scroll-mt-20 bg-muted/30">
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Quick answers to what clients ask most. Still unsure? Reach out and we'll help."
      />

      {/*
        <Accordion> is a client island (Base UI); FadeIn is a client reveal wrapper.
        This section stays a Server Component — only static content is passed in, so
        `/` stays prerendered.
      */}
      <FadeIn className="mx-auto mt-10 max-w-3xl">
        <Accordion defaultValue={["faq-0"]}>
          {faqs.map(({ question, answer }, index) => (
            <AccordionItem key={question} value={`faq-${index}`}>
              <AccordionTrigger className="py-4 text-base">{question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FadeIn>
    </Section>
  )
}
