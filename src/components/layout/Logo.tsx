import Image from "next/image";
import Link from "next/link";

export function Logo({ tone = "dark", onClick }: { tone?: "dark" | "light"; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="group flex items-center gap-3" aria-label="Tilda Bel's Haven, home">
      <Image src="/logo.png" alt="" width={488} height={393} priority className="h-10 w-auto sm:h-11" />
      <span className={`font-display leading-[1.05] ${tone === "light" ? "text-ivory-50" : "text-forest-950"}`}>
        <span className="block text-[1.05rem] tracking-[0.04em]">Tilda Bel&rsquo;s</span>
        <span className={`t-label block text-[0.6rem] tracking-[0.32em] ${tone === "light" ? "text-gold-400" : "text-bronze-700"}`}>Haven</span>
      </span>
    </Link>
  );
}
