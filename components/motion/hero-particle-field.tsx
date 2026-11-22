"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-reactive particle field for the hero (zero dependencies, canvas 2D).
 *
 * The canvas is `pointer-events-none` + `aria-hidden`, so links/buttons stay
 * fully clickable and it's invisible to assistive tech. Pointer tracking listens
 * on `window` and is scoped to the canvas rect, so the parent <HeroSection />
 * can stay a Server Component.
 *
 * Guardrails: high-DPI via ResizeObserver + capped DPR; the rAF loop pauses when
 * the hero scrolls off-screen (IntersectionObserver) or the tab is hidden; fewer
 * particles and no pointer tracking on touch devices; and a single static frame
 * (no loop) when the user prefers reduced motion. All listeners/observers/rAF are
 * torn down on unmount.
 */
export function HeroParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const maybeCtx = canvasEl.getContext("2d");
    if (!maybeCtx) return;
    // Non-null typed aliases so the nested render/resize closures keep the narrowing.
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = maybeCtx;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    // Ambient slate-blue; brightens toward brand blue (#148cdc) near the cursor.
    const AMBIENT: [number, number, number] = [148, 163, 184];
    const BRIGHT: [number, number, number] = [20, 140, 220];
    const INTERACT_R = coarse ? 120 : 165;

    type Particle = {
      bx: number;
      by: number;
      dx: number;
      dy: number;
      vx: number;
      vy: number;
      size: number;
      dash: boolean;
      angle: number;
      phase: number;
      bright: number;
    };

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let looping = false;
    let onScreen = true;

    const pointer = { x: -9999, y: -9999 };
    const target = { x: -9999, y: -9999 };
    let active = false;
    let flowAngle = -Math.PI / 2;
    let bounds = canvas.getBoundingClientRect();

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const mix = (a: number, b: number, t: number) => a + (b - a) * t;

    function build() {
      const area = width * height;
      const divisor = coarse ? 20000 : 11000;
      const cap = coarse ? 60 : 150;
      const count = Math.max(20, Math.min(Math.round(area / divisor), cap));
      particles = [];
      for (let i = 0; i < count; i++) {
        const bx = Math.random() * width;
        const by = Math.random() * height;
        particles.push({
          bx,
          by,
          dx: 0,
          dy: 0,
          vx: rand(-0.1, 0.1),
          vy: rand(-0.16, -0.03), // gentle upward "antigravity" drift
          size: rand(0.8, 2.1),
          dash: Math.random() < 0.22,
          angle: rand(0, Math.PI * 2),
          phase: rand(0, Math.PI * 2),
          bright: 0,
        });
      }
    }

    // Fade particles out behind the headline/CTA block so they frame the type.
    function density(x: number, y: number) {
      const cx = width * 0.5;
      const cy = height * 0.47;
      const rx = width * 0.46;
      const ry = height * 0.46;
      const nx = (x - cx) / rx;
      const ny = (y - cy) / ry;
      const d = Math.sqrt(nx * nx + ny * ny);
      // 0 inside the protected ellipse, ramping to 1 outside it.
      return Math.min(1, Math.max(0, (d - 0.38) / 0.5));
    }

    function color([r, g, b]: [number, number, number], alpha: number) {
      return `rgba(${r | 0},${g | 0},${b | 0},${alpha})`;
    }

    function paint(time: number) {
      ctx.clearRect(0, 0, width, height);

      // Lerp the display pointer toward the raw target for smooth motion.
      pointer.x += (target.x - pointer.x) * 0.14;
      pointer.y += (target.y - pointer.y) * 0.14;
      const fdx = target.x - pointer.x;
      const fdy = target.y - pointer.y;
      if (fdx * fdx + fdy * fdy > 0.4) flowAngle = Math.atan2(fdy, fdx);

      for (const p of particles) {
        // Ambient drift with wrap-around.
        p.bx += p.vx;
        p.by += p.vy;
        if (p.by < -6) p.by = height + 6;
        if (p.bx < -6) p.bx = width + 6;
        else if (p.bx > width + 6) p.bx = -6;

        let desX = 0;
        let desY = 0;
        let targetBright = 0;
        let targetAngle = Math.atan2(p.vy, p.vx);

        if (active) {
          const ddx = p.bx - pointer.x;
          const ddy = p.by - pointer.y;
          const dist = Math.hypot(ddx, ddy);
          if (dist < INTERACT_R) {
            const t = 1 - dist / INTERACT_R;
            const e = t * t * (3 - 2 * t); // smoothstep
            const nx = ddx / (dist || 1);
            const ny = ddy / (dist || 1);
            // Magnetic breathing halo: push out + gentle wave.
            const breathe = Math.sin(time * 0.003 + p.phase) * 2;
            const push = e * (coarse ? 10 : 17) + e * breathe;
            desX = nx * push;
            desY = ny * push;
            targetBright = e;
            targetAngle = flowAngle; // orient along the cursor's flow
          }
        }

        // Spring the offset + brightness toward their targets (calm return).
        p.dx += (desX - p.dx) * 0.12;
        p.dy += (desY - p.dy) * 0.12;
        p.bright += (targetBright - p.bright) * 0.12;

        let da = targetAngle - p.angle;
        da = Math.atan2(Math.sin(da), Math.cos(da));
        p.angle += da * (0.06 + 0.18 * p.bright);

        const px = p.bx + p.dx;
        const py = p.by + p.dy;
        const alpha = density(px, py) * (0.22 + p.bright * 0.55);
        if (alpha <= 0.015) continue;

        const r = mix(AMBIENT[0], BRIGHT[0], p.bright);
        const g = mix(AMBIENT[1], BRIGHT[1], p.bright);
        const b = mix(AMBIENT[2], BRIGHT[2], p.bright);
        const fill = color([r, g, b], alpha);

        if (p.dash) {
          const len = p.size * 3.2 * (1 + p.bright * 0.7);
          const ca = Math.cos(p.angle) * (len / 2);
          const sa = Math.sin(p.angle) * (len / 2);
          ctx.strokeStyle = fill;
          ctx.lineWidth = p.size * 0.9;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(px - ca, py - sa);
          ctx.lineTo(px + ca, py + sa);
          ctx.stroke();
        } else {
          ctx.fillStyle = fill;
          ctx.beginPath();
          ctx.arc(px, py, p.size * (1 + p.bright * 0.5), 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function loop() {
      paint(performance.now());
      if (looping) raf = requestAnimationFrame(loop);
    }

    function start() {
      if (looping || reduceMotion) return;
      if (!onScreen || document.hidden) return;
      looping = true;
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      looping = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    function resize() {
      bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (reduceMotion) paint(0); // single static frame
    }

    function onMove(event: PointerEvent) {
      target.x = event.clientX - bounds.left;
      target.y = event.clientY - bounds.top;
      const inside =
        target.x >= -40 &&
        target.x <= width + 40 &&
        target.y >= -40 &&
        target.y <= height + 40;
      if (inside) {
        if (!active) {
          // Avoid a jump the first time the cursor enters.
          pointer.x = target.x;
          pointer.y = target.y;
        }
        active = true;
      } else {
        active = false;
      }
    }

    function updateBounds() {
      bounds = canvas.getBoundingClientRect();
    }

    resize();

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? true;
        if (onScreen) start();
        else stop();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    if (!coarse && !reduceMotion) {
      window.addEventListener("pointermove", onMove, { passive: true });
    }
    window.addEventListener("scroll", updateBounds, { passive: true });

    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", updateBounds);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
