import fs from "node:fs";
import path from "node:path";

export type BuiltInProject = {
  slug: string;
  title: string;
  category: string;
  challenge: string;
  solution: string;
  result: string;
  badge?: string;
  liveUrl?: string;
  image: string;
  /** Whether the screenshot exists in /public at build time (else a mockup card is shown). */
  imageAvailable: boolean;
};

function imageExists(rel: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", rel.replace(/^\/+/, "")));
  } catch {
    return false;
  }
}

const projects: Omit<BuiltInProject, "imageAvailable">[] = [
  {
    slug: "trims-in-shopify-design-studio",
    title: "Trims.in — Custom Shopify Store & Design Studio",
    category: "E-Commerce & Custom Web App",
    liveUrl: "https://trims.in",
    badge: "Shopify • Custom Studio",
    image: "/portfolio/trims-studio.png",
    challenge:
      "Off-the-shelf Shopify customization apps lacked layout flexibility, slowed product pages, and imposed recurring per-order SaaS fees.",
    solution:
      "Engineered a complete Shopify e-commerce storefront integrated with a bespoke, browser-based Design Studio built from scratch (Canva-style interactive canvas editing) so customers can customize designs directly inside the store.",
    result:
      "Delivered a self-serve design-to-checkout experience with full ownership of the studio codebase and zero third-party design-editor fees.",
  },
  {
    slug: "spn-cabinets-manchester-website-seo",
    title: "SPN Cabinets — Bespoke Cabinetry Website & Regional SEO",
    category: "Website & SEO • Manchester, UK",
    liveUrl: "https://spncabinets.com",
    badge: "International Client • UK",
    image: "/portfolio/spn-cabinets.png",
    challenge:
      "A family-run Manchester cabinetry specialist (15+ years experience) needed a modern digital presence to showcase bespoke kitchens, fitted bedrooms, media walls, and custom storage while winning regional quote enquiries.",
    solution:
      "Designed and developed a conversion-focused website with categorized service pages, installation portfolio, verified client reviews, direct WhatsApp/phone quote funnels, and regional SEO targeting Greater Manchester and surrounding North West England areas.",
    result:
      "Elevated brand credibility across a 70-mile UK service radius with streamlined lead capture and stronger local search visibility.",
  },
  {
    slug: "rv-labels-corporate-website",
    title: "RV Labels — Corporate & Product Information Website",
    category: "Corporate Website",
    liveUrl: "https://rvlabels.com",
    badge: "Web Development",
    image: "/portfolio/rv-labels.png",
    challenge:
      "Customers lacked a centralized online reference to explore RV Labels' offerings and initiate product enquiries efficiently.",
    solution:
      "Built a fast, responsive informational website presenting RV Labels' capabilities and customer touchpoints with clean navigation across desktop and mobile devices.",
    result:
      "Established an accessible, professional digital storefront that builds buyer confidence and simplifies customer enquiries.",
  },
  {
    slug: "ccrt-ministry-of-culture-management-suite",
    title: "CCRT (Ministry of Culture, Govt. of India) — IT Cell Management Software Suite",
    category: "Enterprise Desktop Software",
    badge: "Python • CustomTkinter • PyInstaller",
    image: "/portfolio/ccrt-software.png",
    challenge:
      "Fragmented manual tracking across IT assets, consumables, and staff attendance slowed daily IT Cell administration at CCRT (Dwarka, New Delhi).",
    solution:
      "Designed, developed, and packaged four standalone Windows desktop applications using Python, CustomTkinter, and PyInstaller: (1) Computers Management System, (2) Printers & Scanners Management System, (3) Toners Management System, and (4) Biometric Attendance Management System for Permanent & Contractual Staff.",
    result:
      "All four custom applications were successfully deployed and placed into active daily use by CCRT's IT Cell.",
  },
  {
    slug: "bharat-consultant-cms-portal",
    title: "Bharat Consultant — Client Management System (CMS) Portal",
    category: "Custom CRM & Reporting Software",
    badge: "Desktop Software • Reporting",
    image: "/portfolio/bharat-consultant.png",
    challenge:
      "Managing client records manually across scattered documents increased lookup time, errors, and reporting effort.",
    solution:
      "Built a personalized desktop Client Data Management portal with structured client profiles, fast search/filtering, centralized record management, and automated report generation.",
    result:
      "Streamlined daily consultancy operations with a reliable single system of record and one-click reporting.",
  },
];

export const builtInProjects: BuiltInProject[] = projects.map((p) => ({
  ...p,
  imageAvailable: imageExists(p.image),
}));
