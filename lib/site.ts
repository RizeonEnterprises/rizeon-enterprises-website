/**
 * Single source of truth for brand + contact details and navigation.
 * Edit here to update the whole site (Navbar, Footer, Contact, Hero, WhatsApp links).
 */
export const site = {
  name: "Rizeon Enterprises",
  tagline: "Your Vision, Our Code",
  phoneDisplay: "+91 88105 00571",
  phoneTel: "+918810500571",
  whatsappNumber: "918810500571",
  email: "rizeonenterprises@gmail.com",
  location: "Najafgarh, New Delhi – 110075",
  locationLine: "Headquartered in Najafgarh, New Delhi – 110075, India (Serving India & Worldwide)",
  hours: "Monday – Saturday, 10:00 AM – 7:00 PM IST (UTC+5:30)",
} as const

/** Build a wa.me link, encoding an optional prefilled message. */
export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

export type NavItem = { label: string; href: string }

// Hrefs are absolute (`/#section`, not `#section`) so the links work from any
// route — e.g. clicking "About" on /portfolio returns to the homepage section.
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Products", href: "/#products" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Contact", href: "/#contact" },
]
