import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Icon } from "@/components/icons/Icon";
import type { IconName } from "@/components/icons/paths";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealImage } from "@/components/motion/Reveal";
import { contact } from "@/data/site";
import { KEY, photo } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with Tilda Bel's Haven, Bodija, Ibadan. Call ${contact.phone} or email ${contact.email}.`,
};

const details: { icon: IconName; label: string; value: string; href?: string }[] = [
  { icon: "phone-call", label: "Phone", value: contact.phone, href: contact.phoneHref },
  { icon: "envelope", label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { icon: "marker", label: "Address", value: contact.address },
  { icon: "clock-three", label: "Office Hours", value: contact.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Contact Us" intro="We'd love to hear from you. Get in touch with our team." />

      <section className="container-lux grid gap-16 pb-[var(--section)] pt-14 lg:grid-cols-12 lg:gap-10 lg:pt-20">
        <div className="lg:col-span-6">
          <Reveal>
            <h2 className="t-h3">Send us a Message</h2>
          </Reveal>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <h2 className="t-h3">Get in Touch</h2>
          </Reveal>
          <ul className="mt-8 border-t border-stone-300">
            {details.map((d, i) => (
              <Reveal as="li" key={d.label} index={i} className="flex gap-5 border-b border-stone-300 py-5">
                <span className="neu-raised flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-bronze-700">
                  <Icon name={d.icon} size={16} />
                </span>
                <div className="min-w-0">
                  <p className="t-label text-stone-600">{d.label}</p>
                  {d.href ? (
                    <a href={d.href} className="mt-1 block break-words text-[1.0625rem] underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-ink-900">
                      {d.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-[1.0625rem]">{d.value}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>
          <RevealImage photo={photo(KEY.reception)} sizes="(min-width: 1024px) 40vw, 100vw" className="mt-10 aspect-[3/2]" />
        </div>
      </section>

      <section aria-labelledby="find-title" className="bg-ivory-100 pb-[var(--section)] pt-16">
        <div className="container-lux">
          <h2 id="find-title" className="t-h2">
            Find Us
          </h2>
          <p className="mt-3 text-stone-600">{contact.address}</p>
          <div className="relative mt-10 aspect-[4/3] overflow-hidden bg-ivory-200 sm:aspect-[21/9]">
            <iframe title="Tilda Bel's Haven Location" src={contact.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" />
          </div>
        </div>
      </section>
    </>
  );
}
