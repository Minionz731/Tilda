import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon } from "@/components/icons/Icon";

type Variant = "primary" | "gold" | "outline" | "outline-light";

const variants: Record<Variant, string> = {
  primary: "bg-forest-950 text-ivory-50 hover:bg-forest-800",
  gold: "bg-gold-400 text-forest-950 hover:bg-gold-300",
  outline: "border border-ink-900/80 text-ink-900 hover:bg-ink-900 hover:text-ivory-50",
  "outline-light": "border border-ivory-50/60 text-ivory-50 hover:bg-ivory-50 hover:text-forest-950",
};

const base =
  "group inline-flex min-h-12 items-center justify-center gap-3 rounded-ctl px-7 text-[0.8125rem] font-semibold tracking-[0.06em] transition-colors duration-300 ease-lux disabled:cursor-not-allowed disabled:opacity-50";

/** Label that rolls up and is replaced on hover. */
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

type ButtonLinkProps = { href: string; variant?: Variant; children: string; arrow?: boolean; className?: string } & Omit<
  ComponentProps<typeof Link>,
  "href" | "children" | "className"
>;

export function ButtonLink({ href, variant = "primary", children, arrow = false, className = "", ...rest }: ButtonLinkProps) {
  const external = /^(https?:|tel:|mailto:)/.test(href);
  const inner = (
    <>
      <Roll>{children}</Roll>
      {arrow && <Icon name="arrow-small-right" size={18} className="transition-transform duration-500 ease-lux group-hover:translate-x-1" />}
    </>
  );
  if (external) {
    return (
      <a href={href} className={`${base} ${variants[variant]} ${className}`}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {inner}
    </Link>
  );
}

export function Button({
  variant = "primary",
  children,
  className = "",
  arrow = false,
  ...rest
}: { variant?: Variant; children: string; arrow?: boolean } & Omit<ComponentProps<"button">, "children">) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Roll>{children}</Roll>
      {arrow && <Icon name="arrow-small-right" size={18} className="transition-transform duration-500 ease-lux group-hover:translate-x-1" />}
    </button>
  );
}

/** Quiet text link with an arrow that steps forward on hover. */
export function ArrowLink({
  href,
  children,
  className = "",
  tone = "dark",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  const color = tone === "light" ? "text-ivory-50 decoration-gold-400/60" : "text-ink-900 decoration-ink-900/30";
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-2.5 text-[0.8125rem] font-semibold tracking-[0.06em] underline underline-offset-[6px] transition-[text-decoration-color] duration-300 hover:decoration-current ${color} ${className}`}
    >
      {children}
      <Icon name="arrow-small-right" size={18} className="transition-transform duration-500 ease-lux group-hover:translate-x-1" />
    </Link>
  );
}

export function Eyebrow({ children, tone = "dark", className = "" }: { children: ReactNode; tone?: "dark" | "light"; className?: string }) {
  return (
    <p className={`t-label flex items-center gap-3 ${tone === "light" ? "text-gold-400" : "text-bronze-700"} ${className}`}>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  );
}
