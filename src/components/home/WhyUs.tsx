import { Reveal, RevealImage, RevealLines } from "@/components/motion/Reveal";
import { ArrowLink, Eyebrow } from "@/components/ui/Button";
import { home } from "@/data/site";
import { KEY, photo } from "@/lib/images";

export function WhyUs() {
  const c = home.why;
  return (
    <section aria-labelledby="why-title" className="section-y">
      <div className="container-lux">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <Eyebrow>{c.eyebrow}</Eyebrow>
            </Reveal>
            <RevealLines id="why-title" lines={[c.title]} className="t-h2 mt-5" />
          </div>
          <Reveal index={1}>
            <ArrowLink href="/about">Learn More About Us</ArrowLink>
          </Reveal>
        </div>

        <RevealImage photo={photo(KEY.courtyard)} parallax sizes="100vw" className="mt-12 aspect-[4/3] sm:aspect-[21/9] md:mt-16" />

        <ol className="mt-12 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {c.points.map((p, i) => (
            <Reveal as="li" key={p.title} index={i} className="border-t border-stone-300 py-8">
              <span className="t-label text-bronze-700">0{i + 1}</span>
              <h3 className="mt-4 font-display text-[1.5rem] leading-tight">{p.title}</h3>
              <p className="mt-3 text-[0.9375rem] text-stone-600">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
