import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/image";
import type { BlockContent } from "@/sanity/types";

type PortableTextValue = React.ComponentProps<typeof PortableText>["value"];

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="leading-relaxed text-muted-foreground">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-3 font-heading text-2xl font-semibold tracking-tight text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-2 font-heading text-xl font-semibold tracking-tight text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 font-heading text-lg font-medium tracking-tight text-foreground">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-primary pl-4 text-foreground/80 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 ml-5 flex list-disc flex-col gap-2 text-muted-foreground marker:text-primary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 ml-5 flex list-decimal flex-col gap-2 text-muted-foreground marker:text-primary">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href = (value as { href?: string } | undefined)?.href ?? "#";
      const isExternal = /^https?:\/\//i.test(href);
      const className =
        "font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80";
      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={className}>
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const img = value as
        | { asset?: unknown; alt?: string; caption?: string }
        | undefined;
      if (!img?.asset) return null;
      const url = urlFor(img as Parameters<typeof urlFor>[0])
        .width(1600)
        .fit("max")
        .url();
      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={img.alt ?? ""}
            width={1600}
            height={900}
            sizes="(max-width: 768px) 100vw, 768px"
            className="h-auto w-full rounded-xl ring-1 ring-foreground/10"
          />
          {img.caption ? (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {img.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

/** Renders Sanity Portable Text with the shared, brand-styled components. */
export function PortableTextBody({
  value,
}: {
  value: BlockContent | null | undefined;
}) {
  if (!value || value.length === 0) return null;
  return (
    <div className="flex flex-col text-base">
      <PortableText value={value as PortableTextValue} components={components} />
    </div>
  );
}
