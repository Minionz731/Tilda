import type { IconName } from "@/components/icons/paths";

// Amenities copy, transcribed from tildabelshaven.com.ng/amenities.
export const amenitiesPage = {
  title: "Everything You Need, All in One Place",
  body: "From fully furnished interiors to 24-hour security and backup power, every amenity at Tilda Bel's Haven is thoughtfully curated for your comfort, convenience, and peace of mind.",
  cta: {
    title: "Ready to Experience Tilda Bel's Haven?",
    body: "Book your stay today and enjoy all of these premium amenities and more.",
  },
};

export const amenities: { icon: IconName; title: string; body: string }[] = [
  { icon: "sofa", title: "Fully Furnished Apartments", body: "Every apartment is equipped with comfortable seating, soft bedding, and quality finishes so you can unpack and feel right at home from day one." },
  { icon: "wifi", title: "High-Speed Wi-Fi", body: "Stay connected with complimentary, unlimited high-speed fiber internet throughout every apartment and all common areas." },
  { icon: "tv-music", title: "Smart TVs", body: "Enjoy your favourite shows and movies on large smart TVs with built-in streaming apps, cable channels, and screen-mirroring support." },
  { icon: "snowflake", title: "Air Conditioning", body: "Stay comfortable year-round with individual climate control and inverter air conditioning units in every room." },
  { icon: "shield-check", title: "24-Hour Security", body: "Round-the-clock security personnel, smart access control, and full HD CCTV coverage keep every guest and their belongings safe." },
  { icon: "washer", title: "Laundry Service", body: "Take advantage of in-apartment laundry facilities or our professional laundry and dry-cleaning service for fresh linens and garments on demand." },
  { icon: "shower", title: "Clean, Modern Bathrooms", body: "Clean bathrooms with hot water showers, fresh towels, and basic toiletries provided for your stay." },
  { icon: "parking", title: "Secure Parking", body: "Complimentary, monitored on-site parking with 24/7 CCTV surveillance and controlled access for your peace of mind." },
  { icon: "tree", title: "Landscaped Outdoor Spaces", body: "Step outside into our serene balcony and lounge spaces, ideal for catching fresh air or winding down in the evening." },
  { icon: "headset", title: "Guest Support", body: "We're available to help with check-in and any questions during your stay. Cleaning is available on request — we respect your privacy." },
  { icon: "bell-concierge", title: "24/7 Front Desk", body: "Our reception team is available around the clock to handle enquiries, requests, and any support you may need during your stay." },
  { icon: "vacuum", title: "Routine Housekeeping", body: "Our trained housekeeping team helps keep your apartment clean and comfortable, with routine cleaning, fresh linens, and towel changes available on request." },
];
