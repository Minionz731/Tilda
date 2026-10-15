import { AboutIntro } from "@/components/home/AboutIntro";
import { FeaturedApartments } from "@/components/home/FeaturedApartments";
import { Hero } from "@/components/home/Hero";
import { Tour } from "@/components/home/Tour";
import { WhyUs } from "@/components/home/WhyUs";
import { getApartments } from "@/lib/apartments";
import { KEY, photo } from "@/lib/images";

// Section order mirrors the live homepage: hero + search, apartments, about, tour, why us.
export default async function HomePage() {
  const apartments = await getApartments();
  return (
    <>
      <Hero />
      <FeaturedApartments apartments={apartments} />
      <AboutIntro />
      <Tour poster={photo(KEY.arrival)} />
      <WhyUs />
    </>
  );
}
