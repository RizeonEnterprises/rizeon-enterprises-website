import type { Metadata } from "next";
import Link from "next/link";
import { Newspaper } from "lucide-react";

import { BlogCard } from "@/components/sanity/blog-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getBlogPosts } from "@/sanity/data";
import { cn } from "cn";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on custom software, web development, e-commerce, SEO, and IT hardware from the Rizeon Enterprises team in New Delhi.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-16 md:py-24">
      <header className="flex max-w-2xl flex-col gap-4">
        <Badge
          variant="secondary"
          className="w-fit rounded-full px-3 py-1 text-xs font-medium tracking-wide"
        >
          Blog
        </Badge>
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Insights
        </h1>
        <p className="text-lg text-pretty text-muted-foreground">
          Practical guidance on custom software, websites, e-commerce, SEO, and IT hardware—from the
          people who build and ship it.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-4 rounded-xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
          <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
            <Newspaper className="size-6" aria-hidden />
          </span>
          <h2 className="font-heading text-xl font-medium tracking-tight">No articles yet</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            We&rsquo;re working on our first posts. Have a question you&rsquo;d like us to cover?
            Reach out and we&rsquo;ll help directly.
          </p>
          <Link href="/#contact" className={cn(buttonVariants(), "mt-2 rounded-xl")}>
            Ask us anything
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
