"use client";

import { useEffect, useRef } from "react";

/** One canvas pixel is this many screen pixels. Small enough to read as a fine pixel grid. */
const SCREEN_PIXEL = 3;
/** Smooth enough to feel premium, still cheap at this resolution. */
const FPS = 24;

type Palette = { sky: string; sun: string; far: string; near: string; cloud: string; ink: string };

/** Colours come from the site's tokens, so the brand switcher and dark mode recolour the scene. */
function readPalette(): Palette {
  const css = getComputedStyle(document.documentElement);
  const token = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
  return {
    sky: token("--background", "#ffffff"),
    sun: token("--primary", "#2563eb"),
    far: token("--muted", "#f5f5f5"),
    near: token("--border", "#e5e5e5"),
    cloud: token("--muted", "#f5f5f5"),
    ink: token("--muted-foreground", "#6c6c6c"),
  };
}

// Clouds are blocks in canvas pixels, relative to the cloud's own corner. `y` is a fraction of the height.
// `x` is the starting position as a fraction of the width, so the clouds do not begin stacked together.
const CLOUDS = [
  { x: 0.12, y: 0.16, speed: 1.2, parts: [[0, 2, 10, 3], [3, 0, 5, 3], [9, 1, 6, 4]] },
  { x: 0.48, y: 0.34, speed: 0.7, parts: [[0, 1, 7, 3], [4, 0, 5, 2]] },
  { x: 0.8, y: 0.1, speed: 1.8, parts: [[0, 1, 5, 2], [2, 0, 3, 2]] },
];

const BIRDS = [0, 1, 2];

function draw(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, p: Palette) {
  ctx.fillStyle = p.sky;
  ctx.fillRect(0, 0, w, h);

  // Sun, gently breathing, with a faint halo. It sits at the right edge and stays small, so the headline keeps a clear background.
  const r = Math.max(3, Math.round(h * (0.07 + Math.sin(t * 0.6) * 0.003)));
  const sx = Math.round(w * 0.92);
  const sy = Math.round(h * 0.2);
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = p.sun;
  ctx.beginPath();
  ctx.arc(sx, sy, Math.round(r * 2.1), 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.fillStyle = p.sun;
  ctx.beginPath();
  ctx.arc(sx, sy, r, 0, Math.PI * 2);
  ctx.fill();

  // Clouds drift left at different speeds, and wrap around.
  const span = w + 40;
  for (const c of CLOUDS) {
    const x0 = (((c.x * w - t * c.speed) % span) + span) % span - 20;
    const top = Math.round(c.y * h);
    ctx.fillStyle = p.cloud;
    for (const [dx, dy, bw, bh] of c.parts) ctx.fillRect(Math.round(x0 + dx), top + dy, bw, bh);
    // A one-pixel underside keeps the cloud readable on a white sky.
    ctx.fillStyle = p.near;
    for (const [dx, dy, bw, bh] of c.parts) ctx.fillRect(Math.round(x0 + dx), top + dy + bh, bw, 1);
  }

  // Two hill ridges, the far one lighter, with a shift that makes them drift.
  const ridge = (x: number, base: number, amp: number, phase: number) =>
    Math.round(base + Math.sin(x * 0.05 + phase + t * 0.08) * amp + Math.sin(x * 0.13 + phase * 2) * amp * 0.5);

  ctx.fillStyle = p.far;
  for (let x = 0; x < w; x++) {
    const top = ridge(x, h * 0.6, h * 0.05, 1.7);
    ctx.fillRect(x, top, 1, h - top);
  }

  // A middle ridge in the near colour at half strength, then the near ridge, so the hills have depth.
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = p.near;
  for (let x = 0; x < w; x++) {
    const top = ridge(x, h * 0.7, h * 0.04, 0.9);
    ctx.fillRect(x, top, 1, h - top);
  }
  ctx.globalAlpha = 1;

  ctx.fillStyle = p.near;
  for (let x = 0; x < w; x++) {
    const top = ridge(x, h * 0.8, h * 0.03, 0.4);
    ctx.fillRect(x, top, 1, h - top);
  }

  // Small pixel pines on the near ridge.
  ctx.fillStyle = p.ink;
  ctx.globalAlpha = 0.35;
  for (let x = 4; x < w - 4; x += 15) {
    const top = ridge(x, h * 0.8, h * 0.03, 0.4);
    ctx.fillRect(x, top - 4, 1, 1);
    ctx.fillRect(x - 1, top - 3, 3, 1);
    ctx.fillRect(x - 2, top - 2, 5, 2);
  }
  ctx.globalAlpha = 1;

  // Birds crossing the sky, flapping by alternating frames.
  ctx.fillStyle = p.ink;
  for (const i of BIRDS) {
    const bx = Math.round(w - (((t * 3 + i * 53) % (w + 30)) + w * 0.02));
    const by = Math.round(h * (0.18 + i * 0.07) + Math.sin(t + i) * 1.5);
    const up = Math.floor(t * 4 + i) % 2 === 0;
    ctx.fillRect(bx - 2, by + (up ? -1 : 0), 1, 1);
    ctx.fillRect(bx - 1, by + (up ? 0 : -1), 1, 1);
    ctx.fillRect(bx, by + (up ? -1 : 0), 1, 1);
  }
}

/**
 * A pixel-art landscape for the hero: sun, drifting clouds, two hill ridges, pines and birds.
 * It is decoration only. It draws at low resolution and scales up, runs at 12 frames a second,
 * stops when it is off screen or the tab is hidden, and shows one still frame under reduced motion.
 */
export function PixelScene({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = host.current;
    const cv = canvas.current;
    if (!box || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const start = performance.now();
    let raf = 0;
    let last = 0;
    let onScreen = true;

    const paint = (t: number) => draw(ctx, cv.width, cv.height, t, readPalette());

    const resize = () => {
      const r = box.getBoundingClientRect();
      cv.width = Math.max(1, Math.round(r.width / SCREEN_PIXEL));
      cv.height = Math.max(1, Math.round(r.height / SCREEN_PIXEL));
      paint((performance.now() - start) / 1000);
    };

    const running = () => onScreen && !document.hidden && !still.matches;

    const tick = (now: number) => {
      raf = 0;
      if (!running()) return;
      if (now - last >= 1000 / FPS) {
        last = now;
        paint((now - start) / 1000);
      }
      raf = requestAnimationFrame(tick);
    };

    const play = () => {
      if (!raf && running()) raf = requestAnimationFrame(tick);
    };

    // Theme and brand changes repaint the still frame too, so reduced-motion users see the new colours.
    // The brand switcher writes its styles into <head>, so that is watched as well as the <html> classes.
    const recolour = () => {
      if (!running()) paint((performance.now() - start) / 1000);
    };

    const resizer = new ResizeObserver(resize);
    resizer.observe(box);
    const seen = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      play();
    });
    seen.observe(box);
    const theme = new MutationObserver(recolour);
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
    theme.observe(document.head, { childList: true, subtree: true, characterData: true });
    document.addEventListener("visibilitychange", play);
    still.addEventListener("change", play);

    resize();
    play();

    return () => {
      cancelAnimationFrame(raf);
      resizer.disconnect();
      seen.disconnect();
      theme.disconnect();
      document.removeEventListener("visibilitychange", play);
      still.removeEventListener("change", play);
    };
  }, []);

  return (
    <div ref={host} aria-hidden className={className}>
      <canvas ref={canvas} className="block h-full w-full" style={{ imageRendering: "pixelated" }} />
    </div>
  );
}
