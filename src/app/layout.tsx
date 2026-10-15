import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionRuntime } from "@/components/motion/MotionRuntime";
import { ThirdParty } from "@/components/layout/ThirdParty";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tildabelshaven.com.ng"),
  title: {
    default: "Tilda Bel's Haven | Apartments in Ibadan",
    template: "%s | Tilda Bel's Haven",
  },
  description:
    "Well-furnished apartments in Bodija, Ibadan for short stays, work trips, weekends or longer visits. Choose from Classic, Deluxe, Super Deluxe, Suite or Private Suite.",
  icons: { icon: "/logo.png" },
  openGraph: {
    type: "website",
    siteName: "Tilda Bel's Haven",
    images: ["/images/outside/outside-1.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b2418",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables reveal styles only when JS runs, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[70] bg-forest-950 px-4 py-3 text-sm text-ivory-50 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MotionRuntime />
        <ThirdParty />
      </body>
    </html>
  );
}
