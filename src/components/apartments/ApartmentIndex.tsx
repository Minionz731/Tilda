"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Icon } from "@/components/icons/Icon";
import type { Photo } from "@/lib/images";

export type IndexRow = { slug: string; name: string; type: string; guests: string; price: string; photo: Photo };

/**
 * Editorial index of every apartment type. On pointer devices a thumbnail follows the
 * cursor; position is written straight to the element so moving never re-renders.
 */
export function ApartmentIndex({ rows }: { rows: IndexRow[] }) {
  const [active, setActive] = useState<number | null>(null);
  const float = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || !float.current || !list.current) return;
    const r = list.current.getBoundingClientRect();
    float.current.style.transform = `translate3d(${e.clientX - r.left + 28}px, ${e.clientY - r.top - 110}px, 0)`;
  };

  return (
    <div className="relative">
      <ul ref={list} onPointerMove={onMove} onPointerLeave={() => setActive(null)} className="border-t border-stone-300">
        {rows.map((row, i) => (
          <li key={row.slug} data-reveal="fade" style={{ "--i": i } as CSSProperties} className="border-b border-stone-300">
            <Link
              href={`/apartments/${row.slug}`}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              onFocus={() => setActive(null)}
              className="group grid grid-cols-[2.25rem_1fr_auto] items-center gap-x-4 gap-y-1 py-6 transition-[padding] duration-500 ease-lux md:grid-cols-[3rem_1.4fr_1fr_1fr_auto] md:py-7 md:hover:pl-3"
            >
              <span className="t-label text-stone-600">0{i + 1}</span>
              <span className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-none">{row.name}</span>
              <span className="col-start-2 text-sm text-stone-600 md:col-start-auto">{row.guests}</span>
              <span className="col-start-2 text-sm md:col-start-auto">
                <span className="font-semibold">{row.price}</span> <span className="text-stone-600">/ night</span>
              </span>
              <span className="col-start-3 row-span-3 row-start-1 flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/20 transition-colors duration-500 ease-lux group-hover:border-forest-950 group-hover:bg-forest-950 group-hover:text-ivory-50 md:col-start-auto md:row-span-1 md:row-start-auto">
                <Icon name="arrow-right" size={16} />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        ref={float}
        aria-hidden="true"
        className={`pointer-events-none absolute left-0 top-0 z-10 hidden h-[220px] w-[176px] overflow-hidden transition-opacity duration-300 ease-lux md:block ${
          active === null ? "opacity-0" : "opacity-100"
        }`}
      >
        {rows.map((row, i) => (
          <Image
            key={row.slug}
            src={row.photo.src}
            alt=""
            fill
            sizes="176px"
            className={`object-cover transition-[opacity,transform] duration-500 ease-lux ${active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
            style={{ objectPosition: row.photo.focus }}
          />
        ))}
      </div>
    </div>
  );
}
