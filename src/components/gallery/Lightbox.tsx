"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Icon } from "@/components/icons/Icon";
import { lockScroll } from "@/components/motion/MotionRuntime";
import type { Photo } from "@/lib/images";

const ctl =
  "flex h-12 w-12 items-center justify-center rounded-full bg-ivory-50/95 text-forest-950 shadow-[var(--neu-dark-raised)] transition-transform duration-300 ease-lux hover:scale-105 active:scale-95";

/** Full-screen viewer with keyboard support (Esc, arrow keys) and a focus trap. */
export function Lightbox({
  photos,
  index,
  onClose,
  onIndex,
  label = "Photo viewer",
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
  label?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const count = photos.length;
  const go = (d: number) => onIndex((index + d + count) % count);
  const goRef = useRef(go);
  useEffect(() => {
    goRef.current = go;
  });

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    lockScroll(true);
    close.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") goRef.current(1);
      else if (e.key === "ArrowLeft") goRef.current(-1);
      else if (e.key === "Tab" && root.current) {
        const items = root.current.querySelectorAll<HTMLElement>("button");
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
  }, [onClose]);

  const p = photos[index];
  return (
    <div ref={root} role="dialog" aria-modal="true" aria-label={label} className="on-dark fixed inset-0 z-[80] flex flex-col bg-forest-950/[0.97] text-ivory-50">
      <div className="container-lux flex h-20 shrink-0 items-center justify-between">
        <p className="t-label text-mist-300" aria-live="polite">
          {index + 1} / {count}
        </p>
        <button ref={close} type="button" onClick={onClose} className="flex h-11 items-center gap-2 text-[0.75rem] font-semibold tracking-[0.18em] uppercase">
          Close <Icon name="cross-small" size={18} />
        </button>
      </div>
      <div className="relative min-h-0 flex-1">
        <Image key={p.src} src={p.src} alt={p.alt} fill sizes="100vw" className="object-contain px-4 md:px-24" placeholder={p.blurDataURL ? "blur" : "empty"} blurDataURL={p.blurDataURL} />
        {count > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={`${ctl} absolute left-3 top-1/2 -translate-y-1/2 md:left-8`}>
              <Icon name="angle-left" size={18} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className={`${ctl} absolute right-3 top-1/2 -translate-y-1/2 md:right-8`}>
              <Icon name="angle-right" size={18} />
            </button>
          </>
        )}
      </div>
      <p className="container-lux shrink-0 py-6 text-center text-sm text-mist-300">{p.alt}</p>
    </div>
  );
}
