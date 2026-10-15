"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { Logo } from "./Logo";
import { Icon } from "@/components/icons/Icon";
import { lockScroll } from "@/components/motion/MotionRuntime";
import { LIVE_ORIGIN, contact, nav } from "@/data/site";

export function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    lockScroll(true);
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const items = panel.current.querySelectorAll<HTMLElement>("a, button");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
      opener?.focus();
    };
  }, [open, onClose]);

  // Close when the route changes underneath (link tapped).
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  return (
    <div
      id="mobile-menu"
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      data-open={open}
      className="on-dark group/m fixed inset-0 z-[60] flex flex-col bg-forest-950 text-ivory-50 opacity-0 transition-opacity duration-500 ease-lux data-[open=true]:opacity-100 data-[open=false]:pointer-events-none lg:hidden"
    >
      <div className="container-lux flex h-[var(--header-h)] items-center justify-between">
        <Logo tone="light" onClick={onClose} />
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          className="flex h-11 items-center gap-2 text-[0.75rem] font-semibold tracking-[0.18em] uppercase"
        >
          Close
          <Icon name="cross-small" size={18} />
        </button>
      </div>

      <nav aria-label="Mobile" className="container-lux flex-1 overflow-y-auto pt-8" data-lenis-prevent>
        <ul className="border-t border-gold-400/20">
          {nav.map((item, i) => (
            <li key={item.href} className="overflow-clip border-b border-gold-400/20">
              <Link
                href={item.href}
                onClick={onClose}
                aria-current={pathname === item.href ? "page" : undefined}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" } as CSSProperties}
                className="flex translate-y-full items-baseline justify-between py-4 font-display text-[2.25rem] leading-none transition-transform duration-700 ease-lux group-data-[open=true]/m:translate-y-0 aria-[current=page]:text-gold-400"
              >
                {item.label}
                <span className="t-label text-mist-300">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex gap-6 text-sm">
          <a href={`${LIVE_ORIGIN}/login`} className="flex h-11 items-center underline decoration-gold-400/50 underline-offset-4">
            Sign In
          </a>
          <a href={`${LIVE_ORIGIN}/register`} className="flex h-11 items-center underline decoration-gold-400/50 underline-offset-4">
            Sign Up
          </a>
        </div>
      </nav>

      <div className="container-lux grid gap-3 pb-8 pt-6 text-sm text-mist-300">
        <a href={contact.phoneHref} className="flex min-h-11 items-center gap-3">
          <Icon name="phone-call" size={16} className="text-gold-400" /> {contact.phone}
        </a>
        <a href={`mailto:${contact.email}`} className="flex min-h-11 items-center gap-3 break-all">
          <Icon name="envelope" size={16} className="shrink-0 text-gold-400" /> {contact.email}
        </a>
        <Link
          href="/apartments"
          onClick={onClose}
          className="mt-3 flex min-h-12 items-center justify-center rounded-ctl bg-gold-400 text-[0.8125rem] font-semibold tracking-[0.06em] text-forest-950"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
