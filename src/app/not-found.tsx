import { ArrowLink, ButtonLink, Eyebrow } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-lux flex min-h-[80svh] flex-col justify-center pb-24 pt-[calc(var(--header-h)+4rem)]">
      <Eyebrow>Page not found</Eyebrow>
      <h1 className="t-h1 mt-6 max-w-3xl">We couldn&rsquo;t find that page.</h1>
      <p className="mt-6 max-w-xl text-stone-600">The link may be out of date. Browse our apartments or get in touch and we&rsquo;ll help you find what you need.</p>
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <ButtonLink href="/apartments" arrow>
          View Apartments
        </ButtonLink>
        <ArrowLink href="/contact">Contact Us</ArrowLink>
      </div>
    </section>
  );
}
