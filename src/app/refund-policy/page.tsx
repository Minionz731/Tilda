import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/Button";
import { refundPolicy } from "@/data/policies";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy",
  description: "Cancellation 7 days or more before check-in: 80% refund. 3–6 days: 50%. Within 72 hours, same-day or no-show: no refund.",
};

export default function RefundPolicyPage() {
  const r = refundPolicy;
  return (
    <>
      <PageHero eyebrow={r.eyebrow} title={r.title} intro={r.intro} />
      <section className="container-lux pb-[var(--section)] pt-12 lg:pt-16">
        <div className="max-w-3xl lg:ml-[calc(100%/12*4)]">
          {r.sections.map((s, i) => (
            <Reveal key={s.title} className="grid gap-4 border-t border-stone-300 py-10 sm:grid-cols-[4rem_1fr]">
              <span className="font-display text-[2rem] leading-none text-bronze-700">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="t-h3">{s.title}</h2>
                <ul className="mt-5 space-y-3 text-stone-600">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-bronze-700" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-stone-300 pt-10">
            <p className="text-stone-600">{r.outro}</p>
            <ArrowLink href="/contact" className="mt-3">
              Contact us
            </ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}
