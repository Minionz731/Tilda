import type { Metadata } from "next";
import { Icon } from "@/components/icons/Icon";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealImage, RevealLines } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { amenities, amenitiesPage } from "@/data/amenities";
import { KEY, photo } from "@/lib/images";

export const metadata: Metadata = {
  title: "Amenities",
  description: amenitiesPage.body,
};

function Grid({ items, offset }: { items: typeof amenities; offset: number }) {
  return (
    <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((a, i) => (
        <Reveal as="li" key={a.title} index={i % 3} className="border-t border-stone-300 py-10">
          <div className="flex items-start justify-between gap-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-bronze-700/30 text-bronze-700">
              <Icon name={a.icon} size={20} />
            </span>
            <span className="t-label text-stone-600">{String(offset + i + 1).padStart(2, "0")}</span>
          </div>
          <h2 className="mt-6 font-display text-[1.5rem] leading-tight">{a.title}</h2>
          <p className="mt-3 text-[0.9375rem] text-stone-600">{a.body}</p>
        </Reveal>
      ))}
    </ul>
  );
}

export default function AmenitiesPage() {
  const first = amenities.slice(0, 6);
  const second = amenities.slice(6);

  return (
    <>
      <PageHero eyebrow="Amenities" title={amenitiesPage.title} intro={amenitiesPage.body}>
        <div className="mt-12 grid gap-3 md:grid-cols-12">
          <RevealImage photo={photo(KEY.lobby)} priority reveal={false} sizes="(min-width: 768px) 58vw, 100vw" className="aspect-[3/2] md:col-span-7" />
          <RevealImage photo={photo(KEY.lounge)} sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[3/2] md:col-span-5 md:aspect-auto" delay={150} />
        </div>
      </PageHero>

      <section aria-label="Amenities" className="container-lux section-y">
        <Grid items={first} offset={0} />
        <RevealImage photo={photo(KEY.privateBalcony)} parallax sizes="100vw" className="my-16 aspect-[4/3] sm:aspect-[21/9] md:my-24" />
        <Grid items={second} offset={6} />
      </section>

      <section className="on-dark bg-forest-950 text-ivory-50">
        <div className="container-lux flex flex-col gap-8 py-20 md:flex-row md:items-end md:justify-between md:py-28">
          <div className="max-w-2xl">
            <RevealLines as="h2" lines={[amenitiesPage.cta.title]} className="t-h2" />
            <Reveal index={1}>
              <p className="mt-5 text-mist-300">{amenitiesPage.cta.body}</p>
            </Reveal>
          </div>
          <Reveal index={2} className="flex flex-wrap gap-4">
            <ButtonLink href="/apartments" variant="gold" arrow>
              Browse Apartments
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline-light">
              Contact Us
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
