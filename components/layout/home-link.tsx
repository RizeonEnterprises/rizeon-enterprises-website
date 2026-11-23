"use client";

import Link from "next/link";
import * as React from "react";

/**
 * Brand/Home link. Always points to `/`.
 *
 * - On any other route: a normal <Link href="/"> navigation to the top of home.
 * - When already on `/` (even scrolled down or at /#services): don't reload —
 *   clear the URL hash and smooth-scroll to the very top.
 *
 * The "am I on home?" check reads `window.location.pathname` in the click
 * handler rather than `usePathname()` at render time. That keeps this a purely
 * interactive client island with no dynamic render-time hook, so the layout
 * chrome (and `/`) still prerenders statically under Cache Components.
 */
export function HomeLink({
  className,
  children,
  ariaLabel,
  onNavigate,
}: {
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
  onNavigate?: () => void;
}) {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    // Let modified clicks (open in new tab/window) behave normally.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    if (window.location.pathname === "/") {
      event.preventDefault();
      window.history.replaceState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    onNavigate?.();
  }

  return (
    <Link href="/" scroll onClick={handleClick} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
