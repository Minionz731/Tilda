// Business details and shared copy, transcribed from tildabelshaven.com.ng.
export const LIVE_ORIGIN = process.env.NEXT_PUBLIC_LIVE_ORIGIN ?? "https://tildabelshaven.com.ng";

export const contact = {
  name: "Tilda Bel's Haven",
  legalName: "Tilda Bel's Haven Apartments",
  phone: "+234 903 483 5431",
  phoneHref: "tel:+2349034835431",
  email: "info@tildabelshaven.com.ng",
  address: "12 Olapeju Osunkoya Close, Bodija, Ibadan, Oyo State, Nigeria",
  hours: "Mon - Sun: 8:00 AM - 8:00 PM",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3956.338937999631!2d3.9208720750013657!3d7.427692992582965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwMjUnMzkuNyJOIDPCsDU1JzI0LjQiRQ!5e0!3m2!1sen!2sng!4v1790899011891!5m2!1sen!2sng",
  tourVideoId: "odAhyVTzKqs",
  tourVideoTitle: "Tilda Bel's Haven Apartments Ibadan | Rooms & Facilities Tour",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/apartments", label: "Apartments" },
  { href: "/amenities", label: "Amenities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const footer = {
  blurb:
    "Tilda Bel's Haven offers premium apartments with top-notch amenities, excellent service and a home-like experience.",
  quickLinks: [
    { href: "/", label: "Home" },
    { href: "/apartments", label: "Apartments" },
    { href: "/amenities", label: "Amenities" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/faq", label: "FAQ" },
    { href: "/house-rules", label: "House Rules" },
  ],
  policies: [
    { href: "/house-rules", label: "House Rules" },
    { href: "/refund-policy", label: "Cancellation & Refund Policy" },
    { href: "/faq", label: "FAQ" },
  ],
  poweredBy: { label: "julisam.tech", href: "https://julisam.tech" },
};

export const tour = {
  eyebrow: "See it for yourself",
  title: "Take a Virtual Tour",
  body: "Walk through our facilities and amenities before you arrive.",
};

export const home = {
  hero: {
    eyebrow: "Welcome to",
    title: ["Tilda Bel's", "Haven"],
    tagline: "Your Comfort. Our Priority.",
    body: "Looking for a comfortable place to stay in Ibadan? We have well-furnished apartments for short stays, work trips, weekends, or longer visits. Take your pick from our Classic, Deluxe, Super Deluxe, Suite, or Private Suite, depending on what works best for you.",
    stats: [
      { value: "5 Options", label: "To Choose From" },
      { value: "Secure", label: "Environment" },
      { value: "Always", label: "Available" },
    ],
  },
  apartments: {
    eyebrow: "Our Apartments",
    title: ["Find a Space", "That Suits You"],
    body: "We offer five comfortable layouts to match your visit: Tilda Classic, Tilda Deluxe, Super Deluxe, Suite, and Private Suite. Find the perfect fit for your schedule and budget.",
    optionsTitle: "5 Apartment Options",
    optionsBody: "Classic, Deluxe, Super Deluxe, Suite, or Private Suite. Pick the option that best suits your stay.",
  },
  about: {
    eyebrow: "About Tilda Bel's Haven",
    title: "A Proper Place to Stay in Ibadan",
    body: "Tilda Bel's Haven is a quiet, well-kept retreat in Bodija, Ibadan. We offer five distinct apartment styles: Classic, Deluxe, Super Deluxe, Suite, and Private Suite, making it easy to choose the ideal balance of space, comfort, and budget.",
    points: [
      {
        title: "Safe & Secure",
        body: "The property has security in place around the clock, so you and your belongings are looked after throughout your stay.",
      },
      {
        title: "We're Available",
        body: "We handle check-in and any questions during your stay. Cleaning is available on request — we respect your privacy and won't enter unless you ask. If you need tips about the area, just ask.",
      },
    ],
  },
  why: {
    eyebrow: "Why Choose Us",
    title: "Why Stay With Us",
    points: [
      {
        title: "Furnished & Ready",
        body: "Every apartment comes fully furnished with everything you need for a comfortable stay, whether you're here for a night or a few weeks.",
      },
      {
        title: "Bodija, Ibadan",
        body: "We're in Bodija, one of Ibadan's well-known residential areas. Close to shops, eateries, and easy to get around from.",
      },
      {
        title: "Safe & Secure",
        body: "The property has security measures in place to keep guests and their belongings safe throughout their stay.",
      },
      {
        title: "We're Available",
        body: "We handle check-in and any questions or concerns during your stay. Cleaning is available on request — your privacy is always respected.",
      },
    ],
  },
};

export const apartmentTypes = ["All Types", "Tilda Classic", "Tilda Deluxe", "Super Deluxe", "Suite", "Private Suite"] as const;

export const faq = [
  { q: "What are check-in and check-out times?", a: "Check-in is 2:00 PM and check-out is 11:00 AM." },
  { q: "Is parking available?", a: "Yes, we offer complimentary secure parking with 24/7 surveillance." },
  { q: "Is WiFi included?", a: "Yes, high-speed WiFi is complimentary throughout the property." },
  {
    q: "What is your cancellation policy?",
    a: "Refunds depend on how far in advance you cancel. Cancellations 7+ days before check-in receive an 80% refund; 3–6 days receive 50%; within 72 hours or same-day, no refund applies.",
    link: { href: "/refund-policy", label: "Read the full Cancellation & Refund Policy" },
  },
];
