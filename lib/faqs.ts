export type Faq = { question: string; answer: string };

/**
 * Single source of truth for the FAQs — rendered by <FaqSection /> and emitted
 * as FAQPage JSON-LD by <JsonLd /> so the two never drift.
 */
export const faqs: Faq[] = [
  {
    question: "Do you work with clients outside Delhi or internationally?",
    answer:
      "Yes. We build custom software, CRMs, websites, Shopify stores, and SEO campaigns remotely for clients across India and worldwide—with milestone previews, flexible timezone calls, and transparent pricing. We also ship certified refurbished laptops, accessories, and bulk office orders across India.",
  },
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
];
