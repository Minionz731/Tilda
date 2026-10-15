import { ApartmentCard } from "@/components/apartments/ApartmentCard";
import { ApartmentIndex } from "@/components/apartments/ApartmentIndex";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { ArrowLink, Eyebrow } from "@/components/ui/Button";
import { home } from "@/data/site";
import { type Apartment, formatNaira, guestsLabel } from "@/lib/apartments";
import { photo } from "@/lib/images";

export function FeaturedApartments({ apartments }: { apartments: Apartment[] }) {
  const c = home.apartments;
  const featured = apartments.filter((a) => a.is_featured);
  // Lead with the most generous featured space; the others sit offset beside it.
  const lead = [...featured].sort((a, b) => b.max_guests - a.max_guests || Number(b.price) - Number(a.price))[0];
  const rest = featured.filter((a) => a !== lead);

  return (
    <section aria-labelledby="apartments-title" className="section-y lg:pt-[calc(var(--section)+7rem)]">
      <div className="container-lux">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{c.eyebrow}</Eyebrow>
            </Reveal>
            <RevealLines id="apartments-title" lines={c.title} className="t-h2 mt-5" />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" index={2}>
            <p className="text-stone-600">{c.body}</p>
            <ArrowLink href="/apartments" className="mt-5">
              View All Apartments
            </ArrowLink>
          </Reveal>
        </div>

        {lead && (
          <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-12 lg:mt-20">
            <div className="md:col-span-7">
              <ApartmentCard apartment={lead} ratio="aspect-[4/5] md:aspect-[5/6]" sizes="(min-width: 768px) 58vw, 100vw" />
            </div>
            <div className="grid content-start gap-14 md:col-span-5 md:pt-24">
              {rest.map((a, i) => (
                <ApartmentCard key={a.slug} apartment={a} ratio="aspect-[3/2]" sizes="(min-width: 768px) 40vw, 100vw" delay={i * 120} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-24 grid gap-10 lg:mt-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <RevealLines as="h3" lines={[c.optionsTitle]} className="t-h3" />
            <Reveal index={1}>
              <p className="mt-4 max-w-xs text-stone-600">{c.optionsBody}</p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <ApartmentIndex
              rows={apartments.map((a) => ({
                slug: a.slug,
                name: a.name,
                type: a.apartment_type_display,
                guests: guestsLabel(a.max_guests),
                price: formatNaira(a.price),
                photo: photo(a.featured_image),
              }))}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
