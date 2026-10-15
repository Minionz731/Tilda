import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Tour } from "@/components/home/Tour";
import { Reveal, RevealImage, RevealLines } from "@/components/motion/Reveal";
import { ArrowLink, ButtonLink, Eyebrow } from "@/components/ui/Button";
import { about } from "@/data/about";
import { KEY, photo } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us",
  description: about.hero.body,
};

function SectionHead({ eyebrow, title, body, id }: { eyebrow: string; title: string; body?: string; id: string }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <RevealLines id={id} lines={[title]} className="t-h2 mt-5" />
      </div>
      {body && (
        <Reveal index={1} className="lg:col-span-4 lg:col-start-9">
          <p className="text-stone-600">{body}</p>
        </Reveal>
      )}
    </div>
  );
}

export default function AboutPage() {
  const a = about;
  return (
    <>
      <PageHero eyebrow="About Us" title={a.hero.title} intro={a.hero.body}>
        <div className="relative mt-12">
          <RevealImage photo={photo(KEY.balcony)} priority reveal={false} parallax sizes="100vw" className="aspect-[4/3] sm:aspect-[21/9]" />
          <Reveal className="bg-forest-950 p-6 text-ivory-50 sm:absolute sm:bottom-0 sm:right-0 sm:max-w-sm sm:p-8">
            <p className="t-label text-gold-400">{a.est.label}</p>
            <p className="mt-3 font-display text-xl leading-snug">{a.est.body}</p>
          </Reveal>
        </div>
      </PageHero>

      {/* Story */}
      <section aria-labelledby="story-title" className="container-lux section-y grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow>{a.story.eyebrow}</Eyebrow>
            </Reveal>
            <RevealLines id="story-title" lines={[a.story.title]} className="t-h2 mt-5" />
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          {a.story.paragraphs.map((p, i) => (
            <Reveal key={i} index={i}>
              <p className={`${i === 0 ? "t-lead text-ink-900" : "text-stone-600"} ${i > 0 ? "mt-6" : ""}`}>{p}</p>
            </Reveal>
          ))}
          <ul className="mt-10 grid border-t border-stone-300 sm:grid-cols-2">
            {a.story.features.map((f, i) => (
              <Reveal as="li" key={f} index={i} className={`border-b border-stone-300 py-5 font-display text-xl ${i > 0 ? "sm:border-l sm:pl-6" : ""}`}>
                {f}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Tour />

      {/* Stats */}
      <section aria-label="At a glance" className="container-lux py-16 md:py-20">
        <dl className="grid grid-cols-2 border-y border-stone-300 lg:grid-cols-4">
          {a.stats.map((s, i) => (
            <Reveal key={s.label} index={i} className={`py-8 ${i % 2 === 1 ? "border-l border-stone-300 pl-6" : ""} ${i === 2 ? "border-t border-stone-300 lg:border-l lg:border-t-0 lg:pl-6" : ""} ${i === 3 ? "border-t lg:border-t-0" : ""}`}>
              <dt className="t-label text-stone-600">{s.label}</dt>
              <dd className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-none">{s.value}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Vision and mission */}
      <section aria-label="Vision and mission" className="bg-ivory-100 section-y">
        <div className="container-lux grid gap-16 md:grid-cols-2 md:gap-12">
          {[a.vision, a.mission].map((v, i) => (
            <Reveal key={v.title} index={i}>
              <Eyebrow>{v.eyebrow}</Eyebrow>
              <h2 className="sr-only">{v.title}</h2>
              <p className="mt-6 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.25]">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Advantage */}
      <section aria-labelledby="adv-title" className="container-lux section-y grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <RevealImage photo={photo(KEY.exterior)} parallax sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5]" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <Eyebrow>{a.advantage.eyebrow}</Eyebrow>
          </Reveal>
          <RevealLines id="adv-title" lines={[a.advantage.title]} className="t-h2 mt-5" />
          <Reveal index={1}>
            <p className="mt-5 text-stone-600">{a.advantage.body}</p>
          </Reveal>
          <ol className="mt-10 border-t border-stone-300">
            {a.advantage.items.map((x, i) => (
              <Reveal as="li" key={x.title} index={2 + i} className="grid grid-cols-[3rem_1fr] border-b border-stone-300 py-6">
                <span className="font-display text-xl text-bronze-700">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-[1.375rem] leading-tight">{x.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-stone-600">{x.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Pillars */}
      <section aria-labelledby="pillars-title" className="border-t border-stone-300 section-y">
        <div className="container-lux">
          <SectionHead id="pillars-title" eyebrow={a.pillars.eyebrow} title={a.pillars.title} body={a.pillars.body} />
          <ul className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {a.pillars.items.map((x, i) => (
              <Reveal as="li" key={x.title} index={i} className="border-t border-ink-900 pt-6 pb-8">
                <h3 className="font-display text-[1.5rem] leading-tight">{x.title}</h3>
                <p className="mt-3 text-[0.9375rem] text-stone-600">{x.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Guests */}
      <section aria-labelledby="guests-title" className="bg-ivory-100 section-y">
        <div className="container-lux">
          <SectionHead id="guests-title" eyebrow={a.guests.eyebrow} title={a.guests.title} body={a.guests.body} />
          <ol className="mt-14 grid gap-x-12 md:grid-cols-2">
            {a.guests.items.map((x, i) => (
              <Reveal as="li" key={x.title} index={i % 2} className="grid grid-cols-[3rem_1fr] border-t border-stone-300 py-7">
                <span className="t-label pt-2 text-bronze-700">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-[1.5rem] leading-tight">{x.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-stone-600">{x.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Commitment */}
      <section aria-labelledby="commit-title" className="container-lux section-y grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow>{a.commitment.eyebrow}</Eyebrow>
          </Reveal>
          <RevealLines id="commit-title" lines={[a.commitment.title]} className="t-h2 mt-5" />
          <Reveal index={1}>
            <p className="t-lead mt-6 text-stone-600">{a.commitment.body}</p>
          </Reveal>
        </div>
        <dl className="grid grid-cols-3 self-end border-t border-stone-300 lg:col-span-5 lg:col-start-8">
          {a.commitment.stats.map((s, i) => (
            <Reveal key={s.label} index={i} className={`flex flex-col-reverse justify-end pt-6 ${i > 0 ? "border-l border-stone-300 pl-4 sm:pl-6" : ""}`}>
              <dt className="t-label mt-3 text-stone-600">{s.label}</dt>
              <dd className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-none">{s.value}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* CTA */}
      <section aria-labelledby="cta-title" className="border-t border-stone-300 bg-ivory-100">
        <div className="container-lux grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{a.cta.eyebrow}</Eyebrow>
            </Reveal>
            <RevealLines id="cta-title" lines={[a.cta.title]} className="t-h2 mt-5" />
            <Reveal index={1}>
              <p className="mt-6 text-stone-600">{a.cta.body}</p>
            </Reveal>
          </div>
          <Reveal index={2} className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:col-span-4 lg:col-start-9 lg:justify-end">
            <ButtonLink href="/apartments" arrow>
              Browse Available Apartments
            </ButtonLink>
            <ArrowLink href="/contact">Contact Us</ArrowLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
