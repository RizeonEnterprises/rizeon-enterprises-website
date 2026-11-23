import Image from "next/image";
import {
  Database,
  Globe,
  ImageIcon,
  LayoutTemplate,
  MonitorCog,
  ShoppingCart,
} from "lucide-react";

import { urlFor } from "@/sanity/image";
import type { PortfolioImage } from "@/lib/portfolio";

function CategoryIcon({ category, className }: { category: string | null; className?: string }) {
  const c = (category ?? "").toLowerCase();
  if (c.includes("commerce") || c.includes("shopify"))
    return <ShoppingCart className={className} aria-hidden />;
  if (c.includes("seo") || c.includes("website") || c.includes("web"))
    return <Globe className={className} aria-hidden />;
  if (c.includes("corporate")) return <LayoutTemplate className={className} aria-hidden />;
  if (c.includes("crm") || c.includes("reporting"))
    return <Database className={className} aria-hidden />;
  if (c.includes("desktop") || c.includes("software"))
    return <MonitorCog className={className} aria-hidden />;
  return <ImageIcon className={className} aria-hidden />;
}

function hostOf(url: string | null): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/**
 * 16:10 image frame for a portfolio card/detail. Renders a Sanity image, a local
 * screenshot, or — when no file is available — a clean branded mockup (browser
 * title bar + category icon + brand gradient) so there are never broken images.
 */
export function PortfolioImageFrame({
  image,
  title,
  category,
  liveUrl,
  large = false,
  priority = false,
}: {
  image: PortfolioImage;
  title: string;
  category: string | null;
  liveUrl: string | null;
  large?: boolean;
  priority?: boolean;
}) {
  const sizes = large
    ? "(max-width: 768px) 100vw, 768px"
    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px";
  const imgClass =
    "object-cover transition-transform duration-300 group-hover:scale-105";

  let node: React.ReactNode;
  if (image.kind === "sanity") {
    const url = urlFor(image.image as Parameters<typeof urlFor>[0])
      .width(large ? 1400 : 800)
      .height(large ? 875 : 500)
      .fit("crop")
      .url();
    node = <Image src={url} alt={image.alt} fill sizes={sizes} priority={priority} className={imgClass} />;
  } else if (image.kind === "local") {
    node = (
      <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className={imgClass} />
    );
  } else {
    const label = hostOf(liveUrl) ?? title;
    node = (
      <div className="flex h-full w-full flex-col bg-gradient-to-br from-primary/15 via-background to-primary/5 transition-transform duration-300 group-hover:scale-[1.03]">
        <div className="flex items-center gap-1.5 border-b border-border/60 bg-background/70 px-3 py-2">
          <span className="size-2 rounded-full bg-foreground/15" />
          <span className="size-2 rounded-full bg-foreground/15" />
          <span className="size-2 rounded-full bg-foreground/15" />
          <span className="ml-2 max-w-[70%] truncate rounded bg-background px-2 py-0.5 text-[10px] text-muted-foreground ring-1 ring-border">
            {label}
          </span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-2 p-4 text-center">
          <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
            <CategoryIcon category={category} className="size-6" />
          </span>
          {category ? (
            <span className="text-xs font-medium text-muted-foreground">{category}</span>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">{node}</div>
  );
}
