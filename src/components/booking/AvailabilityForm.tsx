"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { Icon } from "@/components/icons/Icon";
import { Button } from "@/components/ui/Button";
import { apartmentTypes } from "@/data/site";
import { addDays, todayISO } from "@/lib/dates";

type Initial = { checkIn?: string; checkOut?: string; guests?: number; type?: string };

const fieldBase =
  "neu-inset h-12 w-full rounded-ctl pl-11 pr-3 text-[0.9375rem] text-ink-900 outline-none transition-shadow duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-800";

/**
 * Same behaviour as the live search: navigates to
 * /apartments?check_in=&check_out=&guests=&type= (guests only when > 1, type only when chosen).
 */
export function AvailabilityForm({ initial = {}, compact = false }: { initial?: Initial; compact?: boolean }) {
  const router = useRouter();
  const id = useId();
  const [checkIn, setCheckIn] = useState(initial.checkIn ?? "");
  const [checkOut, setCheckOut] = useState(initial.checkOut ?? "");
  const [guests, setGuests] = useState(initial.guests ?? 1);
  const [type, setType] = useState(initial.type ?? "All Types");
  const today = todayISO();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkIn) params.append("check_in", checkIn);
    if (checkOut) params.append("check_out", checkOut);
    if (guests > 1) params.append("guests", String(guests));
    if (type !== "All Types") params.append("type", type);
    router.push(`/apartments?${params.toString()}#results`);
  };

  return (
    <form onSubmit={onSubmit} aria-label="Check availability" className="neu-surface rounded-ctl p-5 text-ink-900 sm:p-6 lg:p-7">
      {!compact && (
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h2 className="font-display text-[1.5rem] leading-none text-forest-950">Check availability</h2>
          <p className="t-label hidden text-stone-600 sm:block">Live rates &amp; availability</p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.9fr_1.1fr_auto] lg:items-end">
        <div>
          <label htmlFor={`${id}-in`} className="t-label mb-2 block text-stone-600">
            Check-in
          </label>
          <div className="relative">
            <Icon name="calendar" size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-bronze-700" />
            <input
              id={`${id}-in`}
              type="date"
              required
              min={today}
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (checkOut && e.target.value >= checkOut) setCheckOut(addDays(e.target.value, 1));
              }}
              className={fieldBase}
            />
          </div>
        </div>
        <div>
          <label htmlFor={`${id}-out`} className="t-label mb-2 block text-stone-600">
            Check-out
          </label>
          <div className="relative">
            <Icon name="calendar" size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-bronze-700" />
            <input
              id={`${id}-out`}
              type="date"
              required
              min={checkIn ? addDays(checkIn, 1) : addDays(today, 1)}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className={fieldBase}
            />
          </div>
        </div>
        <div>
          <span id={`${id}-g`} className="t-label mb-2 block text-stone-600">
            Guests
          </span>
          <div role="group" aria-labelledby={`${id}-g`} className="neu-inset flex h-12 items-center justify-between rounded-ctl px-1.5">
            <button
              type="button"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              disabled={guests <= 1}
              aria-label="Fewer guests"
              className="neu-raised flex h-9 w-9 items-center justify-center rounded-full text-forest-950 transition-shadow duration-300 active:shadow-[var(--neu-inset)] disabled:opacity-40"
            >
              <Icon name="minus-small" size={16} />
            </button>
            <output aria-live="polite" className="text-[0.9375rem] tabular-nums">
              {guests} {guests === 1 ? "Guest" : "Guests"}
            </output>
            <button
              type="button"
              onClick={() => setGuests((g) => Math.min(6, g + 1))}
              disabled={guests >= 6}
              aria-label="More guests"
              className="neu-raised flex h-9 w-9 items-center justify-center rounded-full text-forest-950 transition-shadow duration-300 active:shadow-[var(--neu-inset)] disabled:opacity-40"
            >
              <Icon name="plus-small" size={16} />
            </button>
          </div>
        </div>
        <div>
          <label htmlFor={`${id}-type`} className="t-label mb-2 block text-stone-600">
            Apartment type
          </label>
          <div className="relative">
            <Icon name="bed-alt" size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-bronze-700" />
            <select id={`${id}-type`} value={type} onChange={(e) => setType(e.target.value)} className={`${fieldBase} appearance-none pr-10`}>
              {apartmentTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <Icon name="angle-small-down" size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-600" />
          </div>
        </div>
        <Button type="submit" arrow className="w-full sm:col-span-2 lg:col-span-1 lg:w-auto">
          Search
        </Button>
      </div>
    </form>
  );
}
