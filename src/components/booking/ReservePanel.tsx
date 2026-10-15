"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { LIVE_ORIGIN, contact } from "@/data/site";
import { addDays, nightsBetween, todayISO } from "@/lib/dates";

const field =
  "neu-inset h-12 w-full rounded-ctl pl-11 pr-3 text-[0.9375rem] text-ink-900 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-800";

const naira = (n: number) => `₦${n.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;

/**
 * Lets guests choose dates and see the total, then continues to the existing secure
 * booking page (guest details and Paystack payment run on the live system).
 */
export function ReservePanel({
  slug,
  price,
  maxGuests,
  initial,
}: {
  slug: string;
  price: number;
  maxGuests: number;
  initial: { checkIn?: string; checkOut?: string; guests?: number };
}) {
  const id = useId();
  const today = todayISO();
  const [checkIn, setCheckIn] = useState(initial.checkIn ?? "");
  const [checkOut, setCheckOut] = useState(initial.checkOut ?? "");
  const [guests, setGuests] = useState(Math.min(initial.guests ?? 1, maxGuests));
  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const ready = nights > 0;

  const params = new URLSearchParams();
  if (checkIn) params.set("check_in", checkIn);
  if (checkOut) params.set("check_out", checkOut);
  params.set("guests", String(guests));
  const bookingHref = `${LIVE_ORIGIN}/apartments/${slug}?${params.toString()}`;

  return (
    <div className="neu-surface p-6 text-ink-900 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-stone-300 pb-5">
        <p className="whitespace-nowrap">
          <span className="font-display text-[2rem] leading-none">{naira(price)}</span>
          <span className="text-sm text-stone-600"> / night</span>
        </p>
        <p className="t-label text-bronze-700">Reserve online</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
        <div>
          <label htmlFor={`${id}-in`} className="t-label mb-2 block text-stone-600">
            Check-in
          </label>
          <div className="relative">
            <Icon name="calendar" size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-bronze-700" />
            <input
              id={`${id}-in`}
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (checkOut && e.target.value >= checkOut) setCheckOut(addDays(e.target.value, 1));
              }}
              className={field}
            />
          </div>
        </div>
        <div>
          <label htmlFor={`${id}-out`} className="t-label mb-2 block text-stone-600">
            Check-out
          </label>
          <div className="relative">
            <Icon name="calendar" size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-bronze-700" />
            <input id={`${id}-out`} type="date" min={checkIn ? addDays(checkIn, 1) : addDays(today, 1)} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={field} />
          </div>
        </div>
        <div className="min-[420px]:col-span-2">
          <label htmlFor={`${id}-g`} className="t-label mb-2 block text-stone-600">
            Guests
          </label>
          <div className="relative">
            <Icon name="users" size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-bronze-700" />
            <select id={`${id}-g`} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={`${field} appearance-none`}>
              {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
            <Icon name="angle-small-down" size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-600" />
          </div>
        </div>
      </div>

      <dl className="mt-6 space-y-3 text-sm" aria-live="polite">
        <div className="flex justify-between gap-4 text-stone-600">
          <dt>
            {naira(price)} × {ready ? nights : 1} {ready && nights > 1 ? "nights" : "night"}
          </dt>
          <dd>{naira(price * (ready ? nights : 1))}</dd>
        </div>
        <div className="flex justify-between gap-4 text-stone-600">
          <dt>Taxes &amp; Service</dt>
          <dd>Included</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-stone-300 pt-3 text-base font-semibold">
          <dt>Total</dt>
          <dd>{naira(price * (ready ? nights : 1))}</dd>
        </div>
      </dl>

      <a
        href={bookingHref}
        aria-disabled={!ready}
        onClick={(e) => !ready && e.preventDefault()}
        className={`group mt-6 flex min-h-12 w-full items-center justify-center gap-3 rounded-ctl text-[0.8125rem] font-semibold tracking-[0.06em] transition-colors duration-300 ${
          ready ? "bg-forest-950 text-ivory-50 hover:bg-forest-800" : "cursor-not-allowed bg-stone-300 text-stone-600"
        }`}
      >
        {ready ? "Continue to secure booking" : "Select your dates"}
        {ready && <Icon name="arrow-up-right" size={14} className="transition-transform duration-500 ease-lux group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
      </a>
      <p className="mt-3 text-xs leading-relaxed text-stone-600">
        Guest details and payment are completed on our secure booking page, with instant confirmation.
      </p>

      <div className="mt-6 border-t border-stone-300 pt-5 text-sm">
        <p className="text-stone-600">Prefer to speak to us first?</p>
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
          <a href={contact.phoneHref} className="inline-flex min-h-10 items-center gap-2 font-medium">
            <Icon name="phone-call" size={14} className="text-bronze-700" /> {contact.phone}
          </a>
          <a href={`mailto:${contact.email}`} className="inline-flex min-h-10 items-center gap-2 font-medium">
            <Icon name="envelope" size={14} className="text-bronze-700" /> Email us
          </a>
        </div>
      </div>
    </div>
  );
}
