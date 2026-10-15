import type { Metadata } from "next";
import { GalleryBrowser } from "@/components/gallery/GalleryBrowser";
import { PageHero } from "@/components/layout/PageHero";
import { galleryCategories } from "@/data/gallery";
import { photo } from "@/lib/images";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Have a look at our apartments, rooms and shared spaces to get a feel for what Tilda Bel’s Haven is like before your stay.",
};

export default function GalleryPage() {
  const groups = galleryCategories.map((c) => ({ id: c.id, label: c.label, photos: c.images.map((p) => photo(p)) }));
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Take a Look Around"
        intro="Have a look at our apartments, rooms and shared spaces to get a feel for what Tilda Bel’s Haven is like before your stay."
      />
      <section aria-label="Photos" className="container-lux pb-[var(--section)] pt-10 md:pt-12">
        <GalleryBrowser groups={groups} />
      </section>
    </>
  );
}
