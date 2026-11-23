"use client";

import { useEffect, useRef } from "react";

/**
 * Antigravity-style radial dash-ring swarm for the hero (zero deps, canvas 2D).
 *
 * ~320 micro-dashes form a toroidal band with a hollow center. Each dash points
 * radially outward, breathes via layered sine waves, and is colored by its angle
 * (a chromatic sweep from brand blues through indigo/violet into coral/amber).
 * On desktop the ring center springs elastically toward the cursor (and glides
 * back to the hero center when the cursor leaves); on touch/mobile it stays a
 * lighter, centered ambient ring.
 *
 * The canvas is `pointer-events-none` + `aria-hidden`, so CTAs stay clickable and
 * it's invisible to assistive tech, and pointer tracking listens on `window`
 * (scoped to the canvas rect) so <HeroSection /> can stay a Server Component.
 * Guardrails: high-DPI capped at 2, rAF paused off-screen / on hidden tabs,
 * fewer particles on mobile, and a single static frame for reduced motion.
 */
export function HeroParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const maybeCtx = canvasEl.getContext("2d");
    if (!maybeCtx) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = maybeCtx;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    // ── Chromatic sweep: color by angle around the ring ──────────────────────
    const STOPS: { p: number; c: [number, number, number] }[] = [
      { p: 0.0, c: [15, 111, 191] }, // #0f6fbf brand blue
      { p: 0.12, c: [20, 140, 220] }, // #148cdc
      { p: 0.26, c: [37, 99, 235] }, // #2563eb
      { p: 0.4, c: [79, 70, 229] }, // #4f46e5 indigo
      { p: 0.52, c: [124, 58, 237] }, // #7c3aed violet
      { p: 0.64, c: [236, 72, 153] }, // #ec4899 pink
      { p: 0.76, c: [249, 115, 22] }, // #f97316 orange
      { p: 0.88, c: [234, 179, 8] }, // #eab308 amber
      { p: 1.0, c: [15, 111, 191] }, // wrap back to blue
    ];
    const LUT_N = 180;
    const lut: [number, number, number][] = [];
    for (let i = 0; i < LUT_N; i++) {
      const t = i / LUT_N;
      let s = 0;
      while (s < STOPS.length - 2 && t > STOPS[s + 1].p) s++;
      const a = STOPS[s];
      const b = STOPS[s + 1];
      const k = (t - a.p) / (b.p - a.p || 1);
      lut.push([
        a.c[0] + (b.c[0] - a.c[0]) * k,
        a.c[1] + (b.c[1] - a.c[1]) * k,
        a.c[2] + (b.c[2] - a.c[2]) * k,
      ]);
    }
    const colorAt = (angle: number) => {
      let t = angle / (Math.PI * 2);
      t -= Math.floor(t);
      return lut[Math.min(LUT_N - 1, Math.floor(t * LUT_N))];
    };

    const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
    const smoothstep = (e0: number, e1: number, x: number) => {
      const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0 || 1)));
      return t * t * (3 - 2 * t);
    };

    type P = {
      a: number;
      baseR: number;
      w1: number;
      w2: number;
      amp1: number;
      amp2: number;
      ph: number;
      len: number;
      width: number;
    };

    let width = 0;
    let height = 0;
    let mobile = false;
    let innerR = 150;
    let outerR = 380;
    let particles: P[] = [];
    let raf = 0;
    let looping = false;
    let onScreen = true;

    const center = { x: 0, y: 0 };
    const rest = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let velAngle = 0;
    let bounds = canvas.getBoundingClientRect();

    function build() {
      mobile = width < 768;
      rest.x = width * 0.5;
      rest.y = height * 0.42;
      const maxDim = Math.min(width, height) || 1;
      innerR = mobile ? Math.max(68, maxDim * 0.18) : Math.max(150, Math.min(170, maxDim * 0.24));
      outerR = mobile
        ? innerR + Math.min(150, maxDim * 0.34)
        : Math.max(340, Math.min(420, maxDim * 0.52));
      outerR = Math.min(outerR, innerR + 90 + Math.min(width, height) * 0.5);

      const count = mobile ? 150 : 320;
      particles = [];
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + rand(-0.12, 0.12);
        particles.push({
          a,
          baseR: innerR + (outerR - innerR) * Math.random(),
          w1: rand(0.0008, 0.0016),
          w2: rand(0.0016, 0.0028),
          amp1: rand(5, 12),
          amp2: rand(3, 7),
          ph: rand(0, Math.PI * 2),
          len: rand(3, 7),
          width: rand(1.6, 2.2),
        });
      }
    }

    // Dim particles over the central text column so the headline stays readable.
    function readability(x: number, y: number) {
      const nx = (x - width * 0.5) / (width * 0.34);
      const ny = (y - height * 0.5) / (height * 0.42);
      const d = Math.sqrt(nx * nx + ny * ny);
      return 0.32 + 0.68 * smoothstep(0.45, 0.95, d);
    }

    function paint(time: number) {
      // Elastic spring of the ring center toward the target (cursor or rest).
      center.x += (target.x - center.x) * 0.08;
      center.y += (target.y - center.y) * 0.08;
      const dxc = target.x - center.x;
      const dyc = target.y - center.y;
      const speed = Math.min(Math.hypot(dxc, dyc), 300);
      if (speed > 2) velAngle = Math.atan2(dyc, dxc);
      const globalBreath = Math.sin(time * 0.0006) * 8;

      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";

      for (const p of particles) {
        const aj = p.a + Math.sin(time * 0.001 + p.ph) * 0.04; // slight angular jitter
        const breath =
          Math.sin(time * p.w1 + p.ph) * p.amp1 +
          Math.sin(time * p.w2 + p.ph * 1.7) * p.amp2 +
          globalBreath;
        const ripple = Math.sin(aj * 3 - time * 0.004) * Math.min(speed * 0.18, 26);
        const r = p.baseR + breath + ripple;

        const px = center.x + Math.cos(aj) * r;
        const py = center.y + Math.sin(aj) * r;

        const inner = smoothstep(innerR - 20, innerR + 40, r);
        const outer = 1 - smoothstep(outerR - 70, outerR + 10, r);
        let alpha = inner * outer;
        if (alpha <= 0.01) continue;
        alpha *= readability(px, py) * (mobile ? 0.42 : 0.64);
        if (alpha <= 0.01) continue;

        // Elongate dashes on the leading edge as the cursor moves fast.
        const lead = Math.max(0, Math.cos(aj - velAngle));
        const len = p.len * (1 + Math.min(speed * 0.012, 1.1) * (0.4 + 0.6 * lead));
        const c = colorAt(aj);

        const ca = Math.cos(aj) * (len / 2);
        const sa = Math.sin(aj) * (len / 2);
        ctx.strokeStyle = `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${alpha})`;
        ctx.lineWidth = p.width;
        ctx.beginPath();
        ctx.moveTo(px - ca, py - sa);
        ctx.lineTo(px + ca, py + sa);
        ctx.stroke();
      }
    }

    function loop() {
      paint(performance.now());
      if (looping) raf = requestAnimationFrame(loop);
    }
    function start() {
      if (looping || reduceMotion || !onScreen || document.hidden) return;
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
      center.x = rest.x;
      center.y = rest.y;
      target.x = rest.x;
      target.y = rest.y;
      if (reduceMotion) paint(0); // single static frame
    }

    function onMove(event: PointerEvent) {
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const inside = x >= -80 && x <= width + 80 && y >= -80 && y <= height + 80;
      target.x = inside ? x : rest.x;
      target.y = inside ? y : rest.y;
    }
    function onLeave() {
      target.x = rest.x;
      target.y = rest.y;
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
    window.addEventListener("scroll", updateBounds, { passive: true });
    if (finePointer && !reduceMotion) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("mouseleave", onLeave);
    }

    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", updateBounds);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
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
