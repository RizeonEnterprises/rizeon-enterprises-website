"use client"

import * as React from "react"
import { MotionConfig, motion, type Variants } from "motion/react"

/**
 * Motion primitives. These are the ONLY client components in the render tree for
 * animation: section files stay Server Components and pass their server-rendered
 * markup in as `children`, so `/` still statically prerenders.
 *
 * Reveal animations use `whileInView` with `once: true`, so each element animates
 * a single time when scrolled into view and then stays put.
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const VIEWPORT = { once: true, amount: "some" } as const

/**
 * Wrap the app once (in layout) so every animation respects the user's
 * "reduce motion" OS setting. `reducedMotion="user"` keeps opacity fades but
 * drops movement for those users.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}

/** Subtle upward fade for a single block (headings, text, banners, tables). */
export function FadeIn({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={fadeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  )
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}

/**
 * Parent for a grid/list. Children wrapped in <StaggerItem> fade in one after
 * another. The container itself has no visual style beyond `className`.
 */
export function StaggerContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  )
}

/** A single staggered child. Inherits the reveal timing from its container. */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}
