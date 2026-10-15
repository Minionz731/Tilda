"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { Roll } from "@/components/ui/Button";
import { LIVE_ORIGIN, nav } from "@/data/site";

// Routes whose hero sits on the dark brand field, so the header starts in light-on-dark.
const DARK_HERO = new Set(["/"]);

export function Header() {
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const darkHero = DARK_HERO.has(pathname);

  // Scroll state is applied as data attributes so scrolling never re-renders React.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let last = window.scrollY;
    let ticking = false;
    const apply = () => {
      ticking = false;
      const y = window.scrollY;
      el.dataset.solid = y > 24 ? "true" : "false";
      el.dataset.hidden = y > 160 && y > last + 4 ? "true" : y < last - 4 || y <= 160 ? "false" : el.dataset.hidden;
      last = y;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        ref={ref}
        data-dark={darkHero ? "true" : "false"}
        data-solid="false"
        data-hidden="false"
        className="group/h fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[transform,background-color,border-color,color] duration-500 ease-lux data-[hidden=true]:-translate-y-full data-[solid=true]:border-stone-300 data-[solid=true]:bg-ivory-50 data-[dark=true]:data-[solid=false]:text-ivory-50"
      >
        <div className="container-lux flex h-[var(--header-h)] items-center justify-between gap-6">
          <div className="hidden group-data-[dark=true]/h:group-data-[solid=false]/h:block">
            <Logo tone="light" />
          </div>
          <div className="group-data-[dark=true]/h:group-data-[solid=false]/h:hidden">
            <Logo />
          </div>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group relative flex h-11 items-center text-[0.8125rem] font-medium tracking-[0.04em]"
                  >
                    <Roll>{item.label}</Roll>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 bottom-2 h-px origin-left bg-current transition-transform duration-500 ease-lux ${
                        isActive(item.href) ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-5">
            <a href={`${LIVE_ORIGIN}/login`} className="hidden h-11 items-center text-[0.8125rem] font-medium tracking-[0.04em] opacity-80 transition-opacity hover:opacity-100 lg:flex">
              Sign In
            </a>
            <Link
              href="/apartments"
              className="group hidden h-11 items-center rounded-ctl border border-current px-5 text-[0.75rem] font-semibold tracking-[0.12em] uppercase transition-colors duration-300 hover:bg-forest-950 hover:text-ivory-50 hover:border-forest-950 group-data-[dark=true]/h:group-data-[solid=false]/h:hover:bg-gold-400 group-data-[dark=true]/h:group-data-[solid=false]/h:hover:text-forest-950 group-data-[dark=true]/h:group-data-[solid=false]/h:hover:border-gold-400 sm:flex"
            >
              <Roll>Book Now</Roll>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-11 items-center border-b border-current/40 px-1 text-[0.75rem] font-semibold tracking-[0.18em] uppercase lg:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={close} pathname={pathname} />
    </>
  );
}
