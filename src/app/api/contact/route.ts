import { NextResponse } from "next/server";

// Thin server-side relay for the contact form. The live site posts the same JSON body
// to /api/v1/settings/contact/; relaying from the server avoids browser CORS limits
// and keeps validation at this boundary.
const UPSTREAM = `${process.env.LIVE_ORIGIN ?? "https://tildabelshaven.com.ng"}/api/v1/settings/contact/`;

const LIMITS = { first_name: 80, last_name: 80, email: 254, message: 5000 } as const;
type Field = keyof typeof LIMITS;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const clean = {} as Record<Field, string>;
  const errors: Partial<Record<Field, string[]>> = {};

  for (const field of Object.keys(LIMITS) as Field[]) {
    const raw = input[field];
    const value = typeof raw === "string" ? raw.trim() : "";
    if (!value) errors[field] = ["This field is required."];
    else if (value.length > LIMITS[field]) errors[field] = [`Please keep this under ${LIMITS[field]} characters.`];
    clean[field] = value;
  }
  if (clean.email && !errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) {
    errors.email = ["Please enter a valid email address."];
  }
  if (Object.keys(errors).length) {
    return NextResponse.json({ success: false, message: "Please check the highlighted fields.", errors }, { status: 400 });
  }

  try {
    const res = await fetch(UPSTREAM, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(clean),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ success: false, message: "We couldn't send your message just now. Please call or email us instead." }, { status: 502 });
  }
}
