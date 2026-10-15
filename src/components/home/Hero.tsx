import { AvailabilityForm } from "@/components/booking/AvailabilityForm";
import { Reveal, RevealImage, RevealLines } from "@/components/motion/Reveal";
import { ArrowLink, ButtonLink, Eyebrow } from "@/components/ui/Button";
import { home } from "@/data/site";
import { KEY, photo } from "@/lib/images";

export function Hero() {
  const h = home.hero;
  return (
    <section aria-labelledby="hero-title" className="on-dark relative bg-forest-950 text-ivory-50">
      <div className="container-lux grid gap-12 pb-12 pt-[calc(var(--header-h)+2.5rem)] lg:min-h-[100svh] lg:grid-cols-12 lg:gap-8 lg:pb-40 lg:pt-[calc(var(--header-h)+3rem)]">
        {/* Copy */}
        <div className="flex flex-col justify-center lg:col-span-6 lg:pr-6">
          <Reveal>
            <Eyebrow tone="light">{h.eyebrow}</Eyebrow>
          </Reveal>
          <RevealLines as="h1" id="hero-title" lines={h.title} className="t-display mt-6" delay={100} />
          <RevealLines as="p" lines={[h.tagline]} className="mt-6 font-display text-[clamp(1.375rem,2.4vw,2rem)] italic leading-tight text-gold-400" delay={350} />
          {/* Not animated: this is usually the LCP element, so it paints immediately. */}
          <p className="measure t-lead mt-8 text-mist-300">{h.body}</p>
          <Reveal index={5} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href="/apartments" variant="gold" arrow>
              View Apartments
            </ButtonLink>
            <ArrowLink href="/about" tone="light">
              Learn More
            </ArrowLink>
          </Reveal>

          <dl className="mt-14 grid grid-cols-3 border-t border-gold-400/25">
            {h.stats.map((s, i) => (
              <Reveal key={s.label} index={6 + i} className={`pt-5 ${i > 0 ? "border-l border-gold-400/25 pl-4 sm:pl-6" : ""}`}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-[clamp(1.25rem,2vw,1.625rem)] leading-tight">{s.value}</span>
                  <span className="t-label mt-1 block text-mist-300">{s.label}</span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* Imagery: the real building, with the balcony as an inset */}
        <div className="relative lg:col-span-6 lg:-mr-[var(--gutter)]">
          <RevealImage
            photo={photo(KEY.exterior)}
            priority
            parallax
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/5] sm:aspect-[4/3] lg:absolute lg:inset-0 lg:aspect-auto"
          />
          <div className="absolute -bottom-8 left-4 hidden w-[34%] border-[6px] border-forest-950 sm:block lg:-left-24 lg:bottom-10 lg:w-[30%]">
            <RevealImage photo={photo(KEY.balcony)} sizes="(min-width: 1024px) 16vw, 34vw" className="aspect-[4/5]" delay={450} />
          </div>
        </div>
      </div>

      {/* Availability panel straddling the hero edge */}
      <div className="container-lux relative z-10 pb-10 sm:pt-6 lg:absolute lg:inset-x-0 lg:bottom-0 lg:translate-y-1/2 lg:pb-0 lg:pt-0">
        <div className="lg:mx-auto lg:max-w-6xl">
          <AvailabilityForm />
        </div>
      </div>
    </section>
  );
}
