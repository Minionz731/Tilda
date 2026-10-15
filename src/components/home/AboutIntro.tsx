import { Reveal, RevealImage, RevealLines } from "@/components/motion/Reveal";
import { ArrowLink, ButtonLink, Eyebrow } from "@/components/ui/Button";
import { home } from "@/data/site";
import { KEY, photo } from "@/lib/images";

export function AboutIntro() {
  const c = home.about;
  return (
    <section aria-labelledby="about-title" className="section-y bg-ivory-100">
      <div className="container-lux grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-6">
          <RevealImage photo={photo(KEY.commonRoom)} parallax sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]" />
          <p className="t-label absolute bottom-4 left-4 bg-ivory-50 px-3 py-2 text-forest-950">Bodija, Ibadan</p>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <Eyebrow>{c.eyebrow}</Eyebrow>
          </Reveal>
          <RevealLines id="about-title" lines={[c.title]} className="t-h2 mt-5" />
          <Reveal index={1}>
            <p className="t-lead mt-6 text-stone-600">{c.body}</p>
          </Reveal>

          <ol className="mt-10 border-t border-stone-300">
            {c.points.map((p, i) => (
              <Reveal as="li" key={p.title} index={2 + i} className="grid grid-cols-[3rem_1fr] gap-x-2 border-b border-stone-300 py-6">
                <span className="font-display text-xl text-bronze-700">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-[1.375rem] leading-tight">{p.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-stone-600">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal index={4} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href="/about" arrow>
              Read Our Story
            </ButtonLink>
            <ArrowLink href="/apartments">Explore Apartments</ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
