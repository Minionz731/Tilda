import type { Metadata } from "next";
import Link from "next/link";
import { AvailabilityForm } from "@/components/booking/AvailabilityForm";
import { ApartmentRow } from "@/components/apartments/ApartmentRow";
import { PageHero } from "@/components/layout/PageHero";
import { Icon } from "@/components/icons/Icon";
import { apartmentTypes } from "@/data/site";
import { TYPE_BY_LABEL, getApartments, getAvailable } from "@/lib/apartments";
import { formatDate, isISODate } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Our Apartments",
  description:
    "Take your pick from our five spaces: Tilda Classic, Tilda Deluxe, Super Deluxe, Suite, or Private Suite. Fully furnished apartments in Bodija, Ibadan.",
};

type Search = Promise<Record<string, string | string[] | undefined>>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ApartmentsPage({ searchParams }: { searchParams: Search }) {
  const sp = await searchParams;

  // Validate everything coming from the URL before it reaches the API.
  const checkInRaw = one(sp.check_in);
  const checkOutRaw = one(sp.check_out);
  const datesValid = isISODate(checkInRaw) && isISODate(checkOutRaw) && checkOutRaw > checkInRaw;
  const checkIn = datesValid ? checkInRaw : undefined;
  const checkOut = datesValid ? checkOutRaw : undefined;
  const guestsNum = Number(one(sp.guests));
  const guests = Number.isInteger(guestsNum) && guestsNum >= 1 && guestsNum <= 6 ? guestsNum : 1;
  const typeRaw = one(sp.type);
  const type = typeRaw && typeRaw in TYPE_BY_LABEL ? typeRaw : undefined;

  const all = await getApartments();
  const available = checkIn && checkOut ? await getAvailable({ checkIn, checkOut, guests }) : null;
  const availabilityUnknown = Boolean(checkIn && checkOut && available === null);

  let list = available ?? all;
  if (type) list = list.filter((a) => a.apartment_type === TYPE_BY_LABEL[type]);
  if (guests > 1) list = list.filter((a) => a.max_guests >= guests);

  const keep = (overrides: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    const merged = { check_in: checkIn, check_out: checkOut, guests: guests > 1 ? String(guests) : undefined, type, ...overrides };
    for (const [k, v] of Object.entries(merged)) if (v) p.set(k, v);
    const s = p.toString();
    return `/apartments${s ? `?${s}` : ""}#results`;
  };
  const stayQuery = checkIn && checkOut ? `?check_in=${checkIn}&check_out=${checkOut}${guests > 1 ? `&guests=${guests}` : ""}` : "";

  return (
    <>
      <PageHero
        eyebrow="Apartments"
        title="Our Apartments"
        intro="Take your pick from our five spaces: Tilda Classic, Tilda Deluxe, Super Deluxe, Suite, or Private Suite. Every single one is fully furnished, spotless, and ready for your stay in Ibadan."
      >
        <div className="mt-10 md:mt-12">
          <AvailabilityForm compact initial={{ checkIn, checkOut, guests, type: type ?? "All Types" }} />
        </div>
      </PageHero>

      <section id="results" aria-labelledby="results-title" className="container-lux scroll-mt-24 pb-[var(--section)] pt-12 md:pt-16">
        <div className="flex flex-col gap-6 border-b border-stone-300 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Filter by apartment type" className="-mx-1 flex gap-2 overflow-x-auto px-1 py-1" data-lenis-prevent>
            {apartmentTypes.map((t) => {
              const value = t === "All Types" ? undefined : t;
              const active = value === type;
              return (
                <Link
                  key={t}
                  href={keep({ type: value })}
                  aria-current={active ? "true" : undefined}
                  scroll={false}
                  className={`flex min-h-10 shrink-0 items-center rounded-full px-4 text-[0.8125rem] font-medium transition-shadow duration-300 ${
                    active ? "neu-inset text-forest-950" : "neu-raised text-stone-600 hover:text-ink-900"
                  }`}
                >
                  {t}
                </Link>
              );
            })}
          </nav>
          <div id="results-title" role="status" className="text-sm text-stone-600">
            <span className="font-semibold text-ink-900">
              Showing {list.length} {list.length === 1 ? "apartment" : "apartments"}
            </span>
            {checkIn && checkOut && (
              <span>
                {available ? " available from " : " for "}
                {formatDate(checkIn)} to {formatDate(checkOut)}
              </span>
            )}
            {guests > 1 && <span> for {guests} guests</span>}
            {(checkIn || type || guests > 1) && (
              <Link href="/apartments#results" className="ml-3 underline underline-offset-4 hover:text-ink-900">
                Clear
              </Link>
            )}
          </div>
        </div>

        {availabilityUnknown && (
          <p className="mt-6 flex items-start gap-3 bg-ivory-100 p-4 text-sm text-stone-600">
            <Icon name="clock-three" size={16} className="mt-0.5 shrink-0 text-bronze-700" />
            We couldn&rsquo;t confirm live availability for those dates just now. All apartments are shown; availability is confirmed when you book.
          </p>
        )}

        {list.length === 0 ? (
          <div className="py-20 text-center">
            <p className="t-h3">No apartments match those dates and guests.</p>
            <p className="mx-auto mt-4 max-w-md text-stone-600">Try different dates or fewer guests, or contact us and we&rsquo;ll help you find a fit.</p>
            <div className="mt-8 flex justify-center gap-6">
              <Link href="/apartments" className="underline underline-offset-4">
                See all apartments
              </Link>
              <Link href="/contact" className="underline underline-offset-4">
                Contact us
              </Link>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-stone-300">
            {list.map((a, i) => (
              <ApartmentRow key={a.slug} apartment={a} flip={i % 2 === 1} href={`/apartments/${a.slug}${stayQuery}`} priority={i === 0} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
