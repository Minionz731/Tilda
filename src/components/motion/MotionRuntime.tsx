"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// One runtime for the whole site: Lenis smooth scroll, a shared reveal observer and
// a capped parallax loop. Everything writes classes or CSS variables directly, so
// scrolling never triggers React renders.

let lenis: Lenis | null = null;

/** Pause smooth scroll while an overlay (menu, lightbox) owns the page. */
export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export function scrollToTarget(target: string | number) {
  if (lenis) lenis.scrollTo(target, { offset: -80 });
  else if (typeof target === "number") window.scrollTo({ top: target });
  else document.querySelector(target)?.scrollIntoView();
}

export function MotionRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    // --- Smooth scroll -------------------------------------------------------
    if (!reduced) {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: { offset: -80 }, autoRaf: true });
      cleanups.push(() => {
        lenis?.destroy();
        lenis = null;
      });
    }

    // --- Reveals -------------------------------------------------------------
    const reveal = (el: Element) => el.classList.add("is-in");
    const revealAll = () => document.querySelectorAll("[data-reveal]").forEach(reveal);
    let io: IntersectionObserver | null = null;
    if (reduced || !("IntersectionObserver" in window)) {
      revealAll();
    } else {
      // Fail-safe: the observer reports every target on its first frame. If that never
      // happens (rendering throttled or blocked), show everything rather than hide content.
      let alive = false;
      const failsafe = window.setTimeout(() => {
        if (!alive) {
          io?.disconnect();
          io = null;
          revealAll();
        }
      }, 1500);
      cleanups.push(() => window.clearTimeout(failsafe));
      io = new IntersectionObserver(
        (entries) => {
          alive = true;
          for (const e of entries) {
            if (e.isIntersecting) {
              reveal(e.target);
              io?.unobserve(e.target);
            }
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
    }
    const scan = () => document.querySelectorAll("[data-reveal]:not(.is-in):not([data-observed])").forEach((el) => {
      el.setAttribute("data-observed", "");
      if (io) io.observe(el);
      else reveal(el);
    });
    scan();
    let scanQueued = false;
    const mo = new MutationObserver(() => {
      if (scanQueued) return;
      scanQueued = true;
      requestAnimationFrame(() => {
        scanQueued = false;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });
    cleanups.push(() => {
      mo.disconnect();
      io?.disconnect();
    });

    // --- Parallax ------------------------------------------------------------
    const desktop = window.matchMedia("(min-width: 768px)");
    let ticking = false;
    const update = () => {
      ticking = false;
      if (reduced || !desktop.matches) return;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((frame) => {
        const r = frame.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const media = frame.querySelector<HTMLElement>(".parallax-media");
        if (!media) return;
        const progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // -1..1
        const travel = r.height * 0.045; // stays inside the 1.1 scale overscan
        media.style.setProperty("--p", (progress * -travel).toFixed(1));
      });
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  // Keep Lenis in step with Next's own scroll handling on navigation.
  useEffect(() => {
    if (!lenis) return;
    const id = requestAnimationFrame(() => {
      lenis?.resize();
      lenis?.scrollTo(window.scrollY, { immediate: true, force: true });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
