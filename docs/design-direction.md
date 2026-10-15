# Tilda Bel's Haven: Visual Direction

Front-end rebuild of tildabelshaven.com.ng. The original Next.js source was not available, so this
project rebuilds the front end in place of it, using the live site's real copy, its real photography
and its live public API. Payment, accounts and the guest dashboard stay on the live backend.

## 1. What the business actually is

A serviced-apartment short-let in Bodija, Ibadan: five room types (Classic, Deluxe, Super Deluxe,
Private Suite, Suite), nightly rates from ₦60,000 to ₦130,000, guest checkout with Paystack.
The references are luxury *real estate sales* sites. We borrow their art direction, not their
business model: no "investment", "brochure", "schedule a viewing" or team sections are invented.
"Viewing request" maps to the things this business really offers: availability checks, the
virtual tour, the gallery, the contact form, phone and email.

## 2. Reference analysis (what was inspected)

All four references were inspected. The Dribbble shots were studied from their full-resolution
images; Kononenko Group was inspected live (DOM, computed styles, transitions, scroll library).

### Primary: Luxury Real Estate Homepage (Samiul Anik, Dribbble 27122374)
1. **Full-height architectural hero** with the building as the subject and a large serif headline
   set low-left. → Hero is built on the real exterior photograph, with the headline on a
   brand-green field beside it rather than over a darkened sky.
2. **Deep, single-hue luxury palette** (near-black teal with one dark accent). → The brand's own
   forest green `#0B2418` becomes the anchoring dark, with gold used sparingly.
3. **Serif display / clean sans body pairing**, headline weight carries the page. → Playfair
   Display (already the brand's heading face) paired with Inter (both already the brand fonts on the live site).
4. **Categorised collections, then listings in clean three-up grids** with restrained metadata.
   → Featured apartments, then an index of all five types with guests and nightly rate.
5. **A dark full-width "about" band and a closing CTA over photography.** → The virtual tour sits
   in a full-bleed green band; the footer opens with a large closing statement and Book Now.

### Supporting 1: W-40 Apartments (Muhammad Ibrahim, Dribbble 27659062)
1. **Availability bar overlapping the hero's bottom edge** ("Check Availability" panel). → The
   existing search form becomes exactly this: an ivory panel straddling the hero edge.
2. **Rental-appropriate structure**: apartments, location, experience, CTA. Closest match to
   Tilda's actual business. → Confirms the section order already on the live site.
3. **Warm neutral surfaces with one dark brown band** for the apartments list. → One dark band
   per page, not alternating dark/light stripes.
4. **Uppercase micro-labels with wide tracking** for navigation and captions. → 11px Inter
   eyebrow labels throughout.
5. **Text "Menu" control and an outlined Book Now** instead of a pill. → Same header pattern.

### Supporting 2: Solenne (Naila Fitriani, Dribbble 27812959)
1. **Asymmetric split hero**: text on a calm field, photography carrying the right side. → Our
   hero composition.
2. **"Find your residence" as an expandable text index** rather than cards. → The five apartment
   types are presented as an editorial index with a hover thumbnail.
3. **Ivory and stone palette, thin hairlines, generous whitespace.** → `#F8F5EF` base with
   `#D9D2C5` hairlines; sections separated by space and rules, not boxes.
4. **Mixed-ratio gallery mosaic** with a category list as filter. → Gallery page layout.
5. **Light serif at large sizes, small sans captions.** → Display set at weight 400, never bold.

### Motion: Kononenko Group (inspected live)
1. **Lenis smooth scroll** (no GSAP). Motion is CSS transforms on one easing curve,
   `cubic-bezier(0.17, 0.84, 0.44, 1)`. → We use Lenis and the same easing as our `--ease` token.
2. **Line-masked text reveals**: each line sits in an `overflow: clip` mask and slides up.
   → `RevealText` splits headings into lines and staggers them by 90ms.
3. **Image blocks rise into place** (translateY about 140px to 0) and images drift slightly
   inside their frame (scale 1.02, about 30px). → `RevealImage` plus a capped parallax.
4. **Roll-over navigation labels** (text swaps vertically inside a clip mask on hover).
   → Header links and text buttons.
5. **Tiered durations**: 0.3s colour/opacity, 0.5 to 0.6s UI transforms, about 1.1s reveals.
   → `--dur-fast / --dur-base / --dur-slow` tokens.

Not adopted: Kononenko's counting preloader (it delays content for a booking site) and its
`mix-blend-mode` header (fails contrast on these bright interiors).

## 3. Homepage: current section to redesigned equivalent

Order and purpose of every live section is preserved.

| # | Live section | Redesigned equivalent |
|---|---|---|
| 1 | Header: logo, Home, Apartments, Amenities, Gallery, About, Contact, Book Now, Sign In, Sign Up | Logo left, roll-over nav centre, Sign In text link and outlined Book Now right. Hides on scroll down, returns on scroll up with an ivory solid state. Mobile: "Menu" opens a full-screen green panel with staggered serif links, Sign Up, phone and email. |
| 2 | Hero: "Welcome to Tilda Bel's Haven", "Your Comfort. Our Priority.", intro, View Apartments, Learn More, three stat chips | Split editorial hero: green field with line-revealed display headline and tagline, the exterior photo full height on the right with the balcony as an inset. The three stats become a hairline-divided row. |
| 3 | Search: check-in, check-out, guests, apartment type, Search | "Check availability" panel overlapping the hero edge, with neumorphic inset fields. Same fields, same `/apartments?check_in&check_out&guests&type` URL. |
| 4 | Our Apartments: "Find a Space That Suits You", three featured cards, "5 Apartment Options" | Asymmetric featured trio (one large, two offset) with metadata under the image, then the five-type editorial index (name, guests, rate, arrow, hover thumbnail). Live API data. |
| 5 | About: "A Proper Place to Stay in Ibadan", Safe & Secure, We're Available, two CTAs | Split: common-room photograph with parallax, text column with numbered points 01 and 02. |
| 6 | Virtual tour (YouTube) | Full-bleed green band, large 16:9 frame with a real poster image. The YouTube player loads only on click, so no YouTube JS on page load. |
| 7 | Why Stay With Us: four points | Panoramic courtyard image, then four numbered columns with hairlines. |
| 8 | Footer: blurb, Quick Links, Policies, Featured Apartments, Get In Touch, map, copyright, julisam.tech | Closing statement with Book Now, then the same five column groups, lazy-loaded map, copyright, "Powered by julisam.tech", Flaticon credit. |

All other routes are kept with their content: `/apartments`, `/apartments/[slug]`, `/amenities`,
`/gallery`, `/about`, `/contact`, `/faq`, `/house-rules`, `/refund-policy`. `/login`, `/register`
and `/dashboard` redirect to the live site, where accounts actually work.

## 4. Design system

### Colour
| Token | Value | Use |
|---|---|---|
| `--forest-950` | `#0B2418` | Brand dark. Hero field, tour band, footer, primary button |
| `--forest-800` | `#0D3B2E` | Hover state of dark surfaces |
| `--gold-400` | `#C8A96A` | Brand gold. Text and rules **on dark only** (7.3:1). Never text on ivory (2.07:1) |
| `--bronze-700` | `#7A5E28` | Accent text on light surfaces (5.6:1) |
| `--ivory-50` | `#F8F5EF` | Page background (brand cream) |
| `--ivory-100` | `#F1ECE2` | Secondary surface; neumorphic base |
| `--stone-300` | `#D9D2C5` | Hairlines |
| `--stone-600` | `#6B655A` | Muted text (5.3:1) |
| `--ink-900` | `#1B1B1B` | Body text (15.8:1) |
| `--mist-300` | `#B9C2BC` | Muted text on green (9:1) |

### Typography
- Display and headings: **Playfair Display** 400 and 400 italic (brand continuity), tracking -0.02em.
- Body, UI, labels: **Inter** 400 / 500 / 600 (the live site's body font).
- Both self-hosted through `next/font`, so nothing render-blocking comes from a third party.

| Role | Size | Line height |
|---|---|---|
| Display | `clamp(3rem, 8vw, 7.25rem)` | 0.95 |
| H1 (page) | `clamp(2.5rem, 5.5vw, 5rem)` | 1.0 |
| H2 | `clamp(2rem, 4vw, 3.5rem)` | 1.05 |
| H3 | `clamp(1.375rem, 2vw, 1.75rem)` | 1.2 |
| Lead | 1.125rem | 1.6 |
| Body | 1rem | 1.65 |
| Label | 0.6875rem, uppercase, 0.18em tracking, 600 | 1.4 |

### Space and layout
- 4px base. Section padding `clamp(5rem, 10vw, 9rem)`. Gutter `clamp(1rem, 4vw, 3rem)` (16px minimum on phones).
- Container 1440px; content 1280px; reading measure 38rem. 12-column grid from 1024px.
- Breakpoints: 640 / 768 / 1024 / 1280 / 1536 (Tailwind defaults).

### Borders, radius, shadow
- Photography is square-cornered: architectural, and it avoids the "rounded card" look.
- Controls 2px radius. 1px hairlines in `--stone-300` (light) or `rgba(200,169,106,.25)` (dark).
- No drop shadows on content. Depth is reserved for the neumorphic controls below.

### Restrained neumorphism (controls only, on `--ivory-100`)
- Raised: `5px 5px 12px rgb(122 104 74 / .16), -5px -5px 12px rgb(255 255 255 / .9)`
- Inset: `inset 2px 2px 5px rgb(122 104 74 / .18), inset -2px -2px 5px rgb(255 255 255 / .95)`
- Applied to: availability fields (inset), guest stepper and carousel arrows (raised, inset when
  pressed), gallery filter and apartment filter chips (selected = inset), FAQ toggles, the tour
  play control. Every one keeps a visible label, a 1px edge for low-vision users, and a 2px
  forest focus ring.

### Buttons
- Primary: forest fill, ivory text, 2px radius, roll-over label. On dark: gold fill, forest text.
- Secondary: 1px outline. Tertiary: text link with Flaticon arrow that shifts 4px on hover.

### Image aspect ratios
Portrait 4:5 (featured cards), landscape 3:2 (feature images), 16:9 (tour), panoramic 21:9 (interludes), 1:1 (thumbnails).

### Motion tokens
`--ease: cubic-bezier(0.17, 0.84, 0.44, 1)`, `--dur-fast: 300ms`, `--dur-base: 600ms`,
`--dur-slow: 1100ms`, line stagger 90ms, grid stagger 70ms.

### Icons
Flaticon **UIcons, Regular Straight**, extracted from the official `@flaticon/flaticon-uicons`
package into inline SVG paths (`scripts/extract-icons.mjs`), 33 icons, about 15 KB. Free under the
Flaticon License with attribution, credited in the footer. Icons appear only where they aid
scanning (amenities, contact details, form fields, controls), never beside every heading.
"Menu" is a text label.

## 5. Image strategy

Audit of all 47 live photos: authentic, sharp, well-lit, high-key wide-angle shots of the real
property. White walls, black furniture, charcoal throws, dark-wood and gold-framed art. **The
photography is not the problem; the presentation is.** Every image is shown at 4:3 in small
rounded cards on cream, with no hierarchy, no alt text, and as raw 1.5 to 6.8 MB PNGs.

- **No replacements, no stock.** Stock or generated imagery would misrepresent the property.
  All 47 originals are kept.
- **Hierarchy through scale and crop.** Strongest frames lead: the exterior with signage (hero),
  the balcony with palms (inset, interludes), the reception with arriving guests (tour poster),
  the courtyard (panorama). Per-image focal points (`object-position`) keep crops on the subject.
- **A gentle, uniform grade** at optimisation time: slightly lifted contrast and softened
  clipped whites (`linear 0.97`), saturation 0.97. No dark overlays on interiors.
- **Performance.** Originals are resized to at most 2400px and stored as high-quality JPEG;
  `next/image` serves AVIF/WebP at responsive widths with explicit dimensions and blur
  placeholders. Below-the-fold images lazy-load. Expected weight per image: about 1.5 to 6.8 MB
  down to roughly 60 to 250 KB.
- **Descriptive alt text** for all 47 images (currently none).
- **Limitation flagged:** most sources are 1445px wide, so full-bleed 21:9 crops are slightly
  soft on 2x displays. The 2336px Deluxe and Suite images are used for the widest placements.

## 6. Animation strategy

- **Lenis** smooth scroll: `lerp 0.1`, native touch scrolling on mobile, `anchors` enabled for
  hash links, stopped while the mobile menu or lightbox is open, destroyed on unmount, scroll
  reset on route change. Disabled entirely under `prefers-reduced-motion`.
- **Reveals** via one shared IntersectionObserver: line-masked headings, fade-rise paragraphs,
  clip-path image reveals (`inset(100% 0 0 0)` to `inset(0)`) with the image settling from
  scale 1.12 to 1. Each element animates once.
- **Parallax** capped at 8% travel inside an `overflow: hidden` frame, driven by Lenis's scroll
  callback writing a CSS variable in `requestAnimationFrame` (no React re-renders). Off below
  768px and under reduced motion.
- **Header** hide/show and solid state are toggled with a class, not state on every frame.
- **Hover**: image scale 1.04 over 1.1s, roll-over labels, arrows shifting 4px. Touch devices get
  the information without hover (metadata always visible, arrows always shown).
- **Fail-safe**: reveal styles only apply after an inline script adds `.js` to `<html>`, so the
  site is fully visible without JavaScript; reduced motion shows everything immediately.

## 7. Functionality boundaries

| Feature | Rebuild behaviour |
|---|---|
| Apartment data | Live public API (`/api/v1/apartments/`), revalidated every 5 minutes, with a bundled snapshot fallback |
| Availability search | Live public API with `check_in`, `check_out`, `guests`; same query URL as today |
| Contact form | Same payload to `/api/v1/settings/contact/`, sent through a thin server route to avoid CORS |
| Booking and payment (Paystack, bank transfer) | **Handed off** to the live apartment page with dates and guests carried over. Not rebuilt: needs the backend source and payment keys |
| Sign In, Sign Up, Dashboard | Existing routes kept; they redirect to the live site. No new account features |
| Chat widget (Martha), Google Analytics | Supported, but off unless `NEXT_PUBLIC_ENABLE_THIRD_PARTY=1`, so local testing doesn't pollute production analytics or chat |
