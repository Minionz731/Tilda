import snapshot from "@/data/apartments-snapshot.json";

// Server-side access to the live public apartments API, with a bundled snapshot
// so pages still render if the API is unreachable.
const API = `${process.env.LIVE_ORIGIN ?? "https://tildabelshaven.com.ng"}/api/v1/apartments/`;

export type Apartment = {
  id: string;
  slug: string;
  apartment_type: string;
  apartment_type_display: string;
  name: string;
  description: string;
  price: string;
  weekend_price: string | null;
  max_guests: number;
  available_units: number;
  amenities_names: string[];
  images: string[];
  featured_image: string;
  is_featured: boolean;
};

type ListResponse = { success: boolean; data: Apartment[] };
type DetailResponse = { success: boolean; data: Apartment };

const SNAPSHOT = snapshot as Apartment[];
const byPrice = (a: Apartment, b: Apartment) => Number(a.price) - Number(b.price);

async function getJson<T>(url: string, init: RequestInit & { next?: { revalidate: number } }): Promise<T | null> {
  try {
    const res = await fetch(url, { ...init, signal: AbortSignal.timeout(6000), headers: { Accept: "application/json" } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getApartments(): Promise<Apartment[]> {
  const json = await getJson<ListResponse>(API, { next: { revalidate: 300 } });
  const list = json?.success && Array.isArray(json.data) && json.data.length ? json.data : SNAPSHOT;
  return [...list].sort(byPrice);
}

export async function getApartment(slug: string): Promise<Apartment | null> {
  if (!/^[a-z0-9-]{1,80}$/.test(slug)) return null;
  const json = await getJson<DetailResponse>(`${API}${slug}/`, { next: { revalidate: 300 } });
  if (json?.success && json.data) return json.data;
  return SNAPSHOT.find((a) => a.slug === slug) ?? null;
}

export type AvailabilityQuery = { checkIn: string; checkOut: string; guests?: number };

/** Live availability for a date range. Returns null when the API can't answer. */
export async function getAvailable(q: AvailabilityQuery): Promise<Apartment[] | null> {
  const params = new URLSearchParams({ check_in: q.checkIn, check_out: q.checkOut });
  if (q.guests && q.guests > 1) params.set("guests", String(q.guests));
  const json = await getJson<ListResponse>(`${API}?${params}`, { cache: "no-store" });
  return json?.success && Array.isArray(json.data) ? [...json.data].sort(byPrice) : null;
}

/** "•⁠  ⁠A bedroom en suite\n•⁠  ⁠Ideal for a couple" -> ["A bedroom en suite", "Ideal for a couple"] */
export function descriptionPoints(description: string): string[] {
  return description
    .replace(/[⁠​]/g, "")
    .split(/\n|•/)
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1));
}

export function formatNaira(value: string | number): string {
  return `₦${Number(value).toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;
}

export function guestsLabel(n: number) {
  return `Up to ${n} ${n === 1 ? "Guest" : "Guests"}`;
}

/** Search form labels ("Super Deluxe") -> apartment_type values used by the API. */
export const TYPE_BY_LABEL: Record<string, string> = {
  "Tilda Classic": "classic",
  "Tilda Deluxe": "deluxe",
  "Super Deluxe": "super_deluxe",
  Suite: "suite",
  "Private Suite": "private_suite",
};
