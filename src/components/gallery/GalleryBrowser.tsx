"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { Lightbox } from "./Lightbox";
import { Icon } from "@/components/icons/Icon";
import type { Photo } from "@/lib/images";

export type GalleryGroup = { id: string; label: string; photos: Photo[] };

// Repeating rhythm so the mosaic never reads as a uniform grid of identical tiles.
const PATTERN = ["col-span-2 row-span-2", "", "row-span-2", "", "", "col-span-2", "", "row-span-2"];
const PAGE = 18;

export function GalleryBrowser({ groups }: { groups: GalleryGroup[] }) {
  const [filter, setFilter] = useState("all");
  const [limit, setLimit] = useState(PAGE);
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const all = useMemo(() => groups.flatMap((g) => g.photos), [groups]);
  const shown = filter === "all" ? all : (groups.find((g) => g.id === filter)?.photos ?? all);
  const visible = shown.slice(0, limit);

  const chips = [{ id: "all", label: "All", count: all.length }, ...groups.map((g) => ({ id: g.id, label: g.label, count: g.photos.length }))];

  return (
    <>
      <div role="group" aria-label="Filter photos by area" className="-mx-1 flex gap-2 overflow-x-auto px-1 py-1 md:flex-wrap" data-lenis-prevent>
        {chips.map((c) => {
          const active = c.id === filter;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setFilter(c.id);
                setLimit(PAGE);
              }}
              className={`flex min-h-10 shrink-0 items-center gap-2 rounded-full px-4 text-[0.8125rem] font-medium transition-shadow duration-300 ${
                active ? "neu-inset text-forest-950" : "neu-raised text-stone-600 hover:text-ink-900"
              }`}
            >
              {c.label}
              <span className={`tabular-nums ${active ? "text-bronze-700" : "text-stone-600/80"}`}>({c.count})</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status">
        Showing {shown.length} photos
      </p>

      <ul key={filter} className="mt-10 grid auto-rows-[9.5rem] grid-flow-dense grid-cols-2 gap-2 sm:auto-rows-[13rem] sm:gap-3 md:auto-rows-[16rem] md:grid-cols-4">
        {visible.map((p, i) => (
          <li key={p.src} className={`${PATTERN[i % PATTERN.length]} animate-[fadein_700ms_var(--ease-lux)_both]`} style={{ animationDelay: `${Math.min(i, 12) * 40}ms` }}>
            <button type="button" onClick={() => setOpen(i)} className="group relative block h-full w-full overflow-hidden bg-ivory-200">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 50vw, (min-width: 640px) 50vw, 100vw"
                loading={i < 4 ? "eager" : "lazy"}
                placeholder={p.blurDataURL ? "blur" : "empty"}
                blurDataURL={p.blurDataURL}
                className="img-zoom object-cover"
                style={{ objectPosition: p.focus }}
              />
              <span className="sr-only">Open larger view</span>
            </button>
          </li>
        ))}
      </ul>

      {shown.length > visible.length && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE)}
            className="neu-raised flex min-h-12 items-center gap-2 rounded-full px-6 text-[0.8125rem] font-semibold text-forest-950 transition-shadow duration-300 active:shadow-[var(--neu-inset)]"
          >
            <Icon name="plus-small" size={16} />
            Show more photos ({shown.length - visible.length} more)
          </button>
        </div>
      )}

      {open !== null && <Lightbox photos={shown} index={open} onIndex={setOpen} onClose={close} label="Gallery" />}
    </>
  );
}
