import type { ReactNode } from "react";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Button";

/** Ivory editorial page opener: eyebrow, line-revealed title, intro on the right. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string | string[];
  intro?: string;
  children?: ReactNode;
}) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <section className="pt-[calc(var(--header-h)+3.5rem)] md:pt-[calc(var(--header-h)+5rem)]">
      <div className="container-lux">
        <div className="grid gap-8 border-b border-stone-300 pb-12 md:pb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            {eyebrow && (
              <Reveal>
                <Eyebrow>{eyebrow}</Eyebrow>
              </Reveal>
            )}
            <RevealLines as="h1" lines={lines} className={`t-h1 ${eyebrow ? "mt-6" : ""}`} />
          </div>
          {intro && (
            <Reveal index={2} className="lg:col-span-4">
              <p className="text-stone-600 lg:pb-2">{intro}</p>
            </Reveal>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
