/**
 * Single rAF loop for every scroll-driven effect on the site.
 * Listens to native scroll, smooths the position with a time-based lerp (same on 60/120 Hz)
 * and feeds the same smoothed value to every subscriber.
 * The loop stops itself once the position converges and wakes on the next scroll/resize.
 */

type Listener = (smoothY: number) => void;

const listeners = new Set<Listener>();
const SMOOTHING = 0.12; // fraction of the path covered per frame at 60 fps

let target = 0;
let current = 0;
let rafId = 0;
let lastTime = 0;
let attached = false;

function frame(now: number) {
  const dt = lastTime ? Math.min(64, now - lastTime) : 16.667;
  lastTime = now;

  const k = 1 - Math.pow(1 - SMOOTHING, dt / 16.667);
  current += (target - current) * k;
  if (Math.abs(target - current) < 0.3) current = target;

  listeners.forEach((listener) => listener(current));

  if (current !== target) {
    rafId = requestAnimationFrame(frame);
  } else {
    rafId = 0;
    lastTime = 0;
  }
}

function kick() {
  if (!rafId) {
    lastTime = 0;
    rafId = requestAnimationFrame(frame);
  }
}

function onScroll() {
  target = window.scrollY;
  kick();
}

export function subscribeScroll(listener: Listener): () => void {
  listeners.add(listener);

  if (!attached) {
    attached = true;
    target = current = window.scrollY; // no catch-up glide when restoring the position
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }

  listener(current);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && attached) {
      attached = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      lastTime = 0;
    }
  };
}

/** Re-render every subscriber (e.g. after a resize). */
export function refreshScroll() {
  if (!attached) return;
  target = window.scrollY;
  kick();
}
