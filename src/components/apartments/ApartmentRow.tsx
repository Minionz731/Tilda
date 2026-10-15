import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { Reveal, RevealImage } from "@/components/motion/Reveal";
import { type Apartment, descriptionPoints, formatNaira, guestsLabel } from "@/lib/apartments";
import { photo } from "@/lib/images";

/** Alternating editorial row for the apartments listing. */
export function ApartmentRow({ apartment: a, flip, href, priority }: { apartment: Apartment; flip: boolean; href: string; priority?: boolean }) {
  const points = descriptionPoints(a.description);
  return (
    <article className="group relative grid gap-8 py-12 md:grid-cols-12 md:items-center md:gap-10 md:py-16">
      <div className={`md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}>
        <RevealImage photo={photo(a.featured_image, `${a.name}: ${photo(a.featured_image).alt}`)} sizes="(min-width: 768px) 58vw, 100vw" className="aspect-[3/2]" zoom priority={priority} reveal={!priority} />
      </div>
      <Reveal className={`md:col-span-5 ${flip ? "md:order-1 md:col-start-1 md:pr-6" : "md:pl-6"}`}>
        <p className="t-label flex items-center gap-3 text-bronze-700">
          {a.apartment_type_display}
          {a.is_featured && (
            <>
              <span aria-hidden="true" className="h-px w-5 bg-current opacity-50" />
              Featured
            </>
          )}
        </p>
        <h2 className="t-h2 mt-4">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {a.name}
          </Link>
        </h2>
        {points.length > 0 && (
          <ul className="mt-6 space-y-2 text-[0.9375rem] text-stone-600">
            {points.map((p) => (
              <li key={p} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-bronze-700" />
                {p}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-stone-300 pt-6">
          <div>
            <p className="flex items-center gap-2 text-sm text-stone-600">
              <Icon name="users" size={14} className="text-bronze-700" />
              {guestsLabel(a.max_guests)}
            </p>
            <p className="mt-2">
              <span className="font-display text-[1.75rem] leading-none">{formatNaira(a.price)}</span>
              <span className="text-sm text-stone-600"> / night</span>
            </p>
          </div>
          <span className="relative z-10 inline-flex items-center gap-3 text-[0.8125rem] font-semibold tracking-[0.06em]">
            View &amp; Book
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/20 transition-colors duration-500 ease-lux group-hover:border-forest-950 group-hover:bg-forest-950 group-hover:text-ivory-50">
              <Icon name="arrow-right" size={16} />
            </span>
          </span>
        </div>
      </Reveal>
    </article>
  );
}
