import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";

import { PortableTextBody } from "@/components/sanity/portable-text";
import { JsonLdScript } from "@/components/seo/json-ld";
import { formatDate } from "@/lib/format";
import { getBlogPost } from "@/sanity/data";
import { urlFor } from "@/sanity/image";

const SITE_URL = "https://rizeonenterprises.com";

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post not found" };

  const ogImage = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.metaDescription,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  // Dynamic data behind <Suspense> so Cache Components renders a static shell
  // and the route works with zero published posts.
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <BlogArticle params={props.params} />
    </Suspense>
  );
}

async function BlogArticle({ params }: { params: PageProps<"/blog/[slug]">["params"] }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const { author } = post;
  const imageUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1600).height(900).fit("crop").url()
    : null;
  const avatarUrl = author?.image?.asset
    ? urlFor(author.image).width(96).height(96).fit("crop").url()
    : null;
  const ogImage = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).fit("crop").url()
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    image: ogImage ? [ogImage] : undefined,
    author: author?.name ? { "@type": "Person", name: author.name } : undefined,
    publisher: {
      "@type": "Organization",
      name: "Rizeon Enterprises",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
  };

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-14 md:py-20">
      <JsonLdScript data={jsonLd} />

      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to blog
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
        {post.publishedAt ? (
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        ) : null}
        {author?.name ? (
          <>
            <span aria-hidden>·</span>
            <span>{author.name}</span>
          </>
        ) : null}
      </div>

      <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-4 text-lg text-pretty text-muted-foreground">{post.metaDescription}</p>

      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={post.mainImage.alt ?? post.title}
          width={1600}
          height={900}
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="mt-8 h-auto w-full rounded-xl ring-1 ring-foreground/10"
        />
      ) : null}

      <div className="mt-10">
        <PortableTextBody value={post.body} />
      </div>

      {author?.name ? (
        <aside className="mt-12 flex items-start gap-4 rounded-xl bg-muted/40 p-6 ring-1 ring-foreground/10">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={author.name}
              width={56}
              height={56}
              className="size-14 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-lg font-semibold text-primary">
              {author.name.charAt(0)}
            </span>
          )}
          <div className="flex flex-col gap-1">
            <span className="font-heading text-base font-medium tracking-tight">{author.name}</span>
            {author.role ? (
              <span className="text-sm text-muted-foreground">{author.role}</span>
            ) : null}
            {author.bio ? (
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{author.bio}</p>
            ) : null}
          </div>
        </aside>
      ) : null}
    </article>
  );
}

function ArticleSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-14 md:py-20">
      <div className="h-5 w-28 animate-pulse rounded bg-muted" />
      <div className="mt-6 h-4 w-40 animate-pulse rounded bg-muted" />
      <div className="mt-3 h-10 w-3/4 animate-pulse rounded bg-muted" />
      <div className="mt-8 aspect-video w-full animate-pulse rounded-xl bg-muted" />
    </div>
  );
}
