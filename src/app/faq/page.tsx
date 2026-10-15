import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/Button";
import { contact, faq } from "@/data/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Everything you need to know about your stay at Tilda Bel's Haven: check-in times, parking, WiFi and cancellations.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="FAQ" intro="Everything you need to know about your stay" />
      <section className="container-lux grid gap-12 pb-[var(--section)] pt-12 lg:grid-cols-12 lg:pt-16">
        <div className="lg:col-span-8">
          {faq.map((item, i) => (
            <Reveal key={item.q} index={i}>
              <details className="group border-b border-stone-300" open={i === 0}>
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-7 [&::-webkit-details-marker]:hidden">
                  <h2 className="font-display text-[clamp(1.25rem,2vw,1.625rem)] leading-snug">{item.q}</h2>
                  <span className="neu-raised flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-forest-950 transition-[transform,box-shadow] duration-500 ease-lux group-open:rotate-45 group-open:shadow-[var(--neu-inset)]">
                    <Icon name="plus-small" size={18} />
                  </span>
                </summary>
                <div className="max-w-2xl pb-8 text-stone-600">
                  <p>{item.a}</p>
                  {item.link && (
                    <ArrowLink href={item.link.href} className="mt-3">
                      {item.link.label}
                    </ArrowLink>
                  )}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
        <aside className="lg:col-span-3 lg:col-start-10">
          <div className="bg-ivory-100 p-6 lg:sticky lg:top-32">
            <h2 className="font-display text-xl">Still have a question?</h2>
            <p className="mt-3 text-sm text-stone-600">Our team is happy to help with anything not covered here.</p>
            <ul className="mt-5 space-y-1 text-sm">
              <li>
                <a href={contact.phoneHref} className="flex min-h-10 items-center gap-3">
                  <Icon name="phone-call" size={14} className="text-bronze-700" /> {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex min-h-10 items-center gap-3 break-all">
                  <Icon name="envelope" size={14} className="shrink-0 text-bronze-700" /> {contact.email}
                </a>
              </li>
              <li>
                <Link href="/contact" className="flex min-h-10 items-center underline underline-offset-4">
                  Send us a message
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
