import { faqs } from "@/lib/faqs";
import { site } from "@/lib/site";

const SITE_URL = "https://rizeonenterprises.com";
const PHONE = "+91-88105-00571";

/** Escape `<` so the JSON can never break out of the <script> element. */
function serialize(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Render one or more JSON-LD nodes in a single script tag. */
export function JsonLdScript({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Serialized data only (no user-controlled HTML); `<` is escaped above.
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}

/** Organization + LocalBusiness + FAQPage structured data for the homepage. */
export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rizeon Enterprises",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    email: site.email,
    telephone: PHONE,
    areaServed: ["India", "Worldwide"],
    slogan: site.tagline,
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Rizeon Enterprises",
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    email: site.email,
    telephone: PHONE,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Najafgarh",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110075",
      addressCountry: "IN",
    },
    areaServed: ["India", "Worldwide"],
    openingHours: "Mo-Sa 10:00-19:00",
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return <JsonLdScript data={[organization, localBusiness, faqPage]} />;
}
