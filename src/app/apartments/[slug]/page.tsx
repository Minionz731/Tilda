import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import snapshot from "@/data/apartments-snapshot.json";
import { ApartmentCard } from "@/components/apartments/ApartmentCard";
import { ApartmentGallery } from "@/components/apartments/ApartmentGallery";
import { ReservePanel } from "@/components/booking/ReservePanel";
import { Icon } from "@/components/icons/Icon";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/Button";
import { amenities } from "@/data/amenities";
import { descriptionPoints, formatNaira, getApartment, getApartments, guestsLabel } from "@/lib/apartments";
import { isISODate } from "@/lib/dates";
import { photo } from "@/lib/images";

type Params = Promise<{ slug: string }>;
type Search = Promise<Record<string, string | string[] | undefined>>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export function generateStaticParams() {
  return (snapshot as { slug: string }[]).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const a = await getApartment((await params).slug);
  if (!a) return { title: "Apartment not found" };
  return {
    title: a.name,
    description: `${a.name} at Tilda Bel's Haven, Bodija, Ibadan. ${guestsLabel(a.max_guests)}, ${formatNaira(a.price)} per night. ${descriptionPoints(a.description).join(". ")}.`,
    openGraph: { images: [photo(a.featured_image).src] },
  };
}

// Property-wide amenities from the Amenities page, shown when the API lists none for a unit.
const PROPERTY_AMENITIES = ["High-Speed Wi-Fi", "Smart TVs", "Air Conditioning", "24-Hour Security", "Secure Parking", "Clean, Modern Bathrooms"];

export default async function ApartmentPage({ params, searchParams }: { params: Params; searchParams: Search }) {
  const { slug } = await params;
  const [a, all, sp] = await Promise.all([getApartment(slug), getApartments(), searchParams]);
  if (!a) notFound();

  const checkIn = one(sp.check_in);
  const checkOut = one(sp.check_out);
  const guests = Number(one(sp.guests));
  const initial = {
    checkIn: isISODate(checkIn) ? checkIn : undefined,
    checkOut: isISODate(checkOut) && isISODate(checkIn) && checkOut > checkIn ? checkOut : undefined,
    guests: Number.isInteger(guests) && guests > 0 ? guests : undefined,
  };

  // Lead with the apartment's own featured image, then the rest of its photos in API order.
  const ordered = [...new Set([a.featured_image, ...a.images].filter(Boolean))];
  const photos = ordered.map((p) => photo(p, `${a.name}: ${photo(p).alt}`));
  const points = descriptionPoints(a.description);
  const listed = a.amenities_names.length ? a.amenities_names : null;
  const shown = listed ? listed.map((title) => ({ title, icon: amenities.find((x) => x.title === title)?.icon })) : amenities.filter((x) => PROPERTY_AMENITIES.includes(x.title));
  const others = all.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <section className="pt-[calc(var(--header-h)+2rem)] md:pt-[calc(var(--header-h)+3rem)]">
        <div className="container-lux">
          <nav aria-label="Breadcrumb" className="text-sm text-stone-600">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-ink-900">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/apartments" className="hover:text-ink-900">
                  Apartments
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink-900">
                {a.name}
              </li>
            </ol>
          </nav>

          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="t-label text-bronze-700">Tilda Bel&rsquo;s Haven, Bodija, Ibadan</p>
              <RevealLines as="h1" lines={[a.name]} className="t-h1 mt-4" />
            </div>
            <p className="md:pb-2">
              <span className="font-display text-[2rem] leading-none">{formatNaira(a.price)}</span>
              <span className="text-stone-600"> / night</span>
            </p>
          </div>

          <div className="mt-10">
            <ApartmentGallery photos={photos} name={a.name} />
          </div>
        </div>
      </section>

      <section className="container-lux grid gap-14 pb-[var(--section)] pt-14 lg:grid-cols-12 lg:gap-10 lg:pt-20">
        <div className="lg:col-span-7">
          <dl className="grid grid-cols-1 border-y border-stone-300 sm:grid-cols-3">
            {[
              { label: "Apartment Type", value: a.apartment_type_display, icon: "bed-alt" as const },
              { label: "Capacity", value: guestsLabel(a.max_guests), icon: "users" as const },
              { label: "Location", value: "Bodija, Ibadan", icon: "marker" as const },
            ].map((f, i) => (
              <div key={f.label} className={`flex items-center gap-4 py-5 ${i > 0 ? "border-t border-stone-300 sm:border-l sm:border-t-0 sm:pl-6" : ""}`}>
                <Icon name={f.icon} size={20} className="text-bronze-700" />
                <div>
                  <dt className="t-label text-stone-600">{f.label}</dt>
                  <dd className="mt-1 font-medium">{f.value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <Reveal className="mt-14">
            <h2 className="t-h3">About This Space</h2>
            <ul className="mt-6 space-y-3 text-[1.0625rem]">
              {points.map((p) => (
                <li key={p} className="flex gap-4">
                  <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-bronze-700" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-14">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="t-h3">{listed ? "Featured Amenities" : "At the Property"}</h2>
              <ArrowLink href="/amenities">All amenities</ArrowLink>
            </div>
            <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
              {shown.map((x) => (
                <li key={x.title} className="flex items-center gap-4 border-b border-stone-300 py-4">
                  {x.icon && <Icon name={x.icon} size={20} className="text-bronze-700" />}
                  {x.title}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-14 bg-ivory-100 p-6 text-sm text-stone-600 sm:p-8">
            <h2 className="font-display text-xl text-ink-900">Good to know</h2>
            <p className="mt-3">Check-in is 2:00 PM and check-out is 11:00 AM. Cleaning is available on request, and our team handles check-in and any questions during your stay.</p>
            <div className="mt-4 flex flex-wrap gap-x-6">
              <ArrowLink href="/house-rules">House Rules</ArrowLink>
              <ArrowLink href="/refund-policy">Cancellation &amp; Refund Policy</ArrowLink>
            </div>
          </Reveal>
        </div>

        <aside id="reserve" className="scroll-mt-24 lg:col-span-5 lg:col-start-8" aria-label="Reserve this apartment">
          <div className="lg:sticky lg:top-28">
            <ReservePanel slug={a.slug} price={Number(a.price)} maxGuests={a.max_guests} initial={initial} />
          </div>
        </aside>
      </section>

      {/* Mobile: keep the reservation one tap away while reading. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-300 bg-ivory-50/95 pb-[env(safe-area-inset-bottom)] lg:hidden">
        <div className="container-lux flex h-16 items-center justify-between gap-4">
          <p className="whitespace-nowrap">
            <span className="font-display text-xl">{formatNaira(a.price)}</span>
            <span className="text-sm text-stone-600"> / night</span>
          </p>
          <a href="#reserve" className="flex min-h-11 items-center rounded-ctl bg-forest-950 px-5 text-[0.8125rem] font-semibold tracking-[0.06em] text-ivory-50">
            Check dates
          </a>
        </div>
      </div>

      {others.length > 0 && (
        <section aria-labelledby="others-title" className="border-t border-stone-300 bg-ivory-100 section-y">
          <div className="container-lux">
            <div className="flex items-end justify-between gap-6">
              <RevealLines id="others-title" lines={["Other Apartments"]} className="t-h2" />
              <ArrowLink href="/apartments">View All Apartments</ArrowLink>
            </div>
            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {others.map((o, i) => (
                <ApartmentCard key={o.slug} apartment={o} sizes="(min-width: 768px) 33vw, 100vw" delay={i * 100} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
