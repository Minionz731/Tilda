import Link from "next/link";
import { Logo } from "./Logo";
import { Icon } from "@/components/icons/Icon";
import { RevealLines } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { contact, footer } from "@/data/site";
import { getApartments } from "@/lib/apartments";

function Column({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="t-label mb-5 text-gold-400">{title}</h2>
      <ul className="space-y-1">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="inline-flex min-h-9 items-center text-sm text-mist-300 transition-colors duration-300 hover:text-ivory-50">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function Footer() {
  const featured = (await getApartments()).filter((a) => a.is_featured);

  return (
    <footer className="on-dark bg-forest-950 text-ivory-50">
      <div className="container-lux border-b border-gold-400/20 py-20 md:py-28">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <RevealLines as="p" lines={["Your Comfort.", <em key="i" className="text-gold-400">Our Priority.</em>]} className="t-display max-w-4xl" />
          <ButtonLink href="/apartments" variant="gold" arrow className="self-start md:self-auto">
            Book Now
          </ButtonLink>
        </div>
      </div>

      <div className="container-lux grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist-300">{footer.blurb}</p>
        </div>
        <div className="lg:col-span-2">
          <Column title="Quick Links" links={footer.quickLinks} />
        </div>
        <div className="lg:col-span-2">
          <Column title="Policies" links={footer.policies} />
          <div className="mt-10">
            <Column title="Featured Apartments" links={featured.map((a) => ({ href: `/apartments/${a.slug}`, label: a.name }))} />
          </div>
        </div>
        <div className="sm:col-span-2 lg:col-span-4">
          <h2 className="t-label mb-5 text-gold-400">Get In Touch</h2>
          <ul className="space-y-3 text-sm text-mist-300">
            <li>
              <a href={`mailto:${contact.email}`} className="flex min-h-9 items-center gap-3 transition-colors hover:text-ivory-50">
                <Icon name="envelope" size={16} className="shrink-0 text-gold-400" />
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.phoneHref} className="flex min-h-9 items-center gap-3 transition-colors hover:text-ivory-50">
                <Icon name="phone-call" size={16} className="shrink-0 text-gold-400" />
                {contact.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="marker" size={16} className="mt-1 shrink-0 text-gold-400" />
              <address className="not-italic">{contact.address}</address>
            </li>
            <li className="flex items-center gap-3">
              <Icon name="clock-three" size={16} className="shrink-0 text-gold-400" />
              {contact.hours}
            </li>
          </ul>
          <h2 className="t-label mb-4 mt-10 text-gold-400">Our Location</h2>
          <div className="relative aspect-[16/9] overflow-hidden bg-forest-900">
            <iframe
              title="Tilda Bel's Haven Location"
              src={contact.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale-[0.6] contrast-[0.95]"
            />
          </div>
        </div>
      </div>

      <div className="container-lux flex flex-col gap-3 border-t border-gold-400/20 py-8 text-xs text-mist-300 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {contact.legalName}. All Rights Reserved.</p>
        <p className="flex flex-wrap gap-x-6 gap-y-2">
          <span>
            Icons by{" "}
            <a href="https://www.flaticon.com/uicons" className="underline decoration-gold-400/40 underline-offset-4 hover:text-ivory-50" rel="noopener" target="_blank">
              Flaticon
            </a>
          </span>
          <span>
            Powered by{" "}
            <a href={footer.poweredBy.href} className="underline decoration-gold-400/40 underline-offset-4 hover:text-ivory-50" rel="noopener" target="_blank">
              {footer.poweredBy.label}
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
