import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { RevealImage } from "@/components/motion/Reveal";
import { type Apartment, formatNaira, guestsLabel } from "@/lib/apartments";
import { photo } from "@/lib/images";

/** Photograph-led listing: image first, quiet metadata underneath (no boxed card). */
export function ApartmentCard({
  apartment: a,
  ratio = "aspect-[4/5]",
  sizes,
  headingLevel = 3,
  delay = 0,
}: {
  apartment: Apartment;
  ratio?: string;
  sizes: string;
  headingLevel?: 2 | 3;
  delay?: number;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="group relative">
      <RevealImage photo={photo(a.featured_image, `${a.name}: ${photo(a.featured_image).alt}`)} sizes={sizes} className={ratio} zoom delay={delay} />
      <div className="mt-5 flex items-start justify-between gap-6 border-b border-stone-300 pb-5">
        <div>
          <p className="t-label text-bronze-700">{a.apartment_type_display}</p>
          <H className="t-h3 mt-2">
            <Link href={`/apartments/${a.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {a.name}
            </Link>
          </H>
          <p className="mt-2 flex flex-wrap items-center gap-x-3 text-sm text-stone-600">
            <span className="inline-flex items-center gap-2">
              <Icon name="users" size={14} className="text-bronze-700" />
              {guestsLabel(a.max_guests)}
            </span>
            <span aria-hidden="true" className="h-3 w-px bg-stone-300" />
            <span>
              <span className="font-semibold text-ink-900">{formatNaira(a.price)}</span> / night
            </span>
          </p>
        </div>
        <span className="mt-1 inline-flex shrink-0 items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.06em]">
          <span className="hidden sm:inline">View &amp; Book</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/20 transition-colors duration-500 ease-lux group-hover:border-forest-950 group-hover:bg-forest-950 group-hover:text-ivory-50">
            <Icon name="arrow-up-right" size={14} />
          </span>
        </span>
      </div>
    </article>
  );
}
