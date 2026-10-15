"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { Lightbox } from "@/components/gallery/Lightbox";
import type { Photo } from "@/lib/images";

/** Lead photograph with a mosaic of supporting shots; any image opens the viewer. */
export function ApartmentGallery({ photos, name }: { photos: Photo[]; name: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const [lead, ...rest] = photos;
  const side = rest.slice(0, 2);
  const more = photos.length - 1 - side.length;

  const tile = (p: Photo, i: number, className: string, sizes: string, priority = false) => (
    <button key={p.src} type="button" onClick={() => setOpen(i)} className={`group relative block overflow-hidden bg-ivory-200 ${className}`} aria-label={`Open photo ${i + 1} of ${photos.length}: ${p.alt}`}>
      <Image
        src={p.src}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        placeholder={p.blurDataURL ? "blur" : "empty"}
        blurDataURL={p.blurDataURL}
        className="img-zoom object-cover"
        style={{ objectPosition: p.focus }}
      />
    </button>
  );

  return (
    <>
      <div className="grid gap-2 md:grid-cols-3 md:grid-rows-2 md:gap-3">
        {tile(lead, 0, "aspect-[3/2] md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[34rem]", "(min-width: 768px) 66vw, 100vw", true)}
        {side.map((p, i) => tile(p, i + 1, "hidden aspect-[3/2] md:block", "33vw"))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm text-stone-600">
          {photos.length} photos of the {name}
        </p>
        <button
          type="button"
          onClick={() => setOpen(0)}
          className="neu-raised flex min-h-10 items-center gap-2 rounded-full px-4 text-[0.8125rem] font-medium text-forest-950 transition-shadow duration-300 active:shadow-[var(--neu-inset)]"
        >
          <Icon name="expand" size={14} />
          {more > 0 ? `View all ${photos.length} photos` : "View photos"}
        </button>
      </div>
      {open !== null && <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={close} label={`${name} photos`} />}
    </>
  );
}
