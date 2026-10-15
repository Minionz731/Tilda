import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { contact } from "@/data/site";
import { houseRules } from "@/data/policies";

export const metadata: Metadata = {
  title: "House Rules",
  description: houseRules.intro,
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function HouseRulesPage() {
  const h = houseRules;
  return (
    <>
      <PageHero eyebrow={h.eyebrow} title={h.title} intro={h.intro} />

      <section className="container-lux grid gap-12 pb-[var(--section)] pt-12 lg:grid-cols-12 lg:pt-16">
        <aside className="hidden lg:col-span-3 lg:block">
          <nav aria-label="House rules sections" className="sticky top-32">
            <p className="t-label text-stone-600">Contents</p>
            <ol className="mt-4 space-y-0.5 text-sm">
              {h.rules.map((r, i) => (
                <li key={r.title}>
                  <a href={`#${slug(r.title)}`} className="flex min-h-9 items-center gap-3 text-stone-600 transition-colors hover:text-ink-900">
                    <span className="w-5 text-xs tabular-nums text-bronze-700">{i + 1}</span>
                    {r.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="lg:col-span-8 lg:col-start-5">
          <Reveal className="bg-ivory-100 p-6 sm:p-8">
            <h2 className="font-display text-2xl">{h.note.title}</h2>
            <p className="mt-3 text-stone-600">{h.note.body}</p>
          </Reveal>

          <ol className="mt-12">
            {h.rules.map((r, i) => (
              <li key={r.title} id={slug(r.title)} className="scroll-mt-28 border-t border-stone-300 py-10">
                <Reveal className="grid gap-4 sm:grid-cols-[4rem_1fr]">
                  <span className="font-display text-[2rem] leading-none text-bronze-700">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h2 className="t-h3">{r.title}</h2>
                    <p className="mt-3 text-stone-600">{r.body}</p>
                    {r.points.length > 0 && (
                      <ul className="mt-5 space-y-2 text-[0.9375rem]">
                        {r.points.map((p) => (
                          <li key={p} className="flex gap-3">
                            <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-bronze-700" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal className="on-dark mt-6 bg-forest-950 p-8 text-ivory-50 sm:p-10">
            <p className="t-label text-gold-400">{h.help.eyebrow}</p>
            <h2 className="t-h2 mt-4">{h.help.title}</h2>
            <p className="mt-4 max-w-xl text-mist-300">{h.help.body}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/contact" variant="gold" arrow>
                Contact Us
              </ButtonLink>
              <ButtonLink href={contact.phoneHref} variant="outline-light">
                Call 24/7 Front Desk
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
