// Gallery categories (same as the live site) and alt text for every photograph.
// Keys are the image paths used by the live site and API.
export type GalleryCategory = { id: string; label: string; images: string[] };

const alts: Record<string, string> = {
  "/images/common-room/common-room-1.png": "Shared common room with dark leather sofas, a patterned rug and a wall-mounted smart TV",
  "/images/common-room/common-room-2.png": "Common room lounge opening onto a white fitted kitchen with a small dining table",
  "/images/common-room/common-room-3.png": "White fitted kitchen with black stone worktops and a striped window blind",
  "/images/common-room/common-room-4.png": "Common room seating facing the kitchen and a workspace with an office chair",
  "/images/common-room/common-room-5.png": "Leather sofas around a smoked-glass coffee table beneath an abstract gold and black painting",
  "/images/lobby/balcony-1.png": "Covered balcony with a high table and bar stools overlooking Bodija rooftops and palm trees",
  "/images/lobby/lobby-1.png": "Bright lobby corridor with a sofa, artwork and the door to apartment 10",
  "/images/lobby/lobby-2.png": "Taupe sofa with patterned cushions under a large gold and black abstract painting in the lobby",
  "/images/lobby/lobby-3.png": "Lobby seating corner with a sofa, side table and framed abstract artwork",
  "/images/outside/outside-1.jpg": "Exterior of Tilda Bel's Haven: a two-storey grey building behind a black gate with the brand plaque",
  "/images/outside/outside-2.png": "Paved courtyard and guest parking beside the building, with palm trees and blue sky",
  "/images/outside/outside-3.png": "Thatched outdoor lounge with a table tennis table in the courtyard",
  "/images/reception/reception-1.jpg": "Reception desk with staff, a drinks fridge and a pair of black lounge chairs",
  "/images/reception/reception-2.png": "Reception area with a white front desk, potted plants and the Tilda Bel's Haven sign",
  "/images/reception/reception-3.jpg": "Guest checking in at reception with luggage while another guest waits in the lounge",
  "/images/reception/reception-4.png": "Front desk staff member at reception beneath the gold Tilda Bel's Haven Apartments sign",
  "/images/tilda-classic/tilda-classic-1.png": "Tilda Classic bedroom with a double bed, work desk and wall-mounted air conditioning",
  "/images/tilda-classic/tilda-classic-2.png": "Tilda Classic double bed with white linen, a charcoal throw and a black wardrobe",
  "/images/tilda-classic/tilda-classic-3.png": "Tilda Classic en suite bathroom with a glass shower and white marble-effect tiles",
  "/images/tilda-deluxe/tilda-deluxe-1.png": "Tilda Deluxe bedroom with a double bed, wall TV and dark wood wardrobe",
  "/images/tilda-deluxe/tilda-deluxe-2.png": "Tilda Deluxe double bed with patterned cushions and folded towels beside a bedside lamp",
  "/images/tilda-deluxe/tilda-deluxe-3.png": "Tilda Deluxe bed with crisp white linen, a black headboard and grey throw",
  "/images/tilda-deluxe/tilda-deluxe-4.png": "Tilda Deluxe room with a striped blind, wardrobe and en suite door",
  "/images/tilda-deluxe/tilda-deluxe-5.png": "Tilda Deluxe bedroom with a mini fridge and bedside tables either side of the bed",
  "/images/tilda-private-suite/tilda-private-suite-1.png": "Private Suite balcony with a steel railing and views over neighbouring rooftops",
  "/images/tilda-private-suite/tilda-private-suite-2.png": "Private Suite living room with woven lounge chairs, an oval coffee table and a landscape painting",
  "/images/tilda-private-suite/tilda-private-suite-3.png": "Private Suite hallway with a desk, a potted plant and gold abstract artwork",
  "/images/tilda-private-suite/tilda-private-suite-4.png": "Private Suite sitting area with a wall TV and woven armchairs",
  "/images/tilda-private-suite/tilda-private-suite-5.png": "Private Suite bedroom with a double bed beside a large window and air conditioning",
  "/images/tilda-private-suite/tilda-private-suite-6.png": "Private Suite bed with white linen, a charcoal throw and rolled towels",
  "/images/tilda-suite/tilda-suite-1.png": "Tilda Suite hallway leading to the bedrooms, with a mini fridge and storage",
  "/images/tilda-suite/tilda-suite-2.png": "Tilda Suite bedroom with a double bed and a corner work desk",
  "/images/tilda-suite/tilda-suite-3.png": "Tilda Suite double bed facing a wall-mounted TV and work desk",
  "/images/tilda-suite/tilda-suite-4.png": "Tilda Suite second bedroom with a double bed, bedside lamp and striped feature wall",
  "/images/tilda-suite/tilda-suite-5.png": "Tilda Suite bed with patterned cushions and towels beneath a framed print",
  "/images/tilda-suite/tilda-suite-6.png": "Tilda Suite bedroom with a striped blind, air conditioning and double bed",
  "/images/tilda-suite/tilda-suite-7.png": "Tilda Suite bedroom with two windows, a work desk and a double bed",
  "/images/tilda-suite/tilda-suite-8.png": "Tilda Suite en suite with a glass shower enclosure, water heater and toilet",
  "/images/tilda-suite/tilda-suite-9.png": "Tilda Suite bathroom with a pedestal basin and glass shower",
  "/images/tilda-suite/tilda-suite-10.png": "Tilda Suite room with a frosted glass door, dark wood wardrobe and luggage rack",
  "/images/tilda-suite/tilda-suite-11.png": "Tilda Suite entrance hallway with doors to the bedrooms and a mini fridge",
  "/images/tilda-super-deluxe/tilda-super-deluxe-1.png": "Tilda Super Deluxe bedroom with a double bed, wardrobe and wall TV",
  "/images/tilda-super-deluxe/tilda-super-deluxe-2.png": "Tilda Super Deluxe double bed beneath two framed prints, beside a tall wardrobe",
  "/images/tilda-super-deluxe/tilda-super-deluxe-3.png": "Tilda Super Deluxe room seen from the bed towards the door and desk",
  "/images/tilda-super-deluxe/tilda-super-deluxe-4.png": "Tilda Super Deluxe kitchenette with a sink, microwave, kettle and mini fridge",
  "/images/tilda-super-deluxe/tilda-super-deluxe-5.png": "Tilda Super Deluxe bedroom with a work desk under the window and a double bed",
  "/images/tilda-super-deluxe/tilda-super-deluxe-6.png": "Tilda Super Deluxe double bed with patterned cushions between two bedside lamps",
};

export function altFor(path: string, fallback = "Tilda Bel's Haven Apartments, Bodija, Ibadan") {
  return alts[path] ?? fallback;
}

const inDir = (dir: string) => Object.keys(alts).filter((k) => k.startsWith(`/images/${dir}/`));

export const galleryCategories: GalleryCategory[] = [
  { id: "common-room", label: "Common Room", images: inDir("common-room") },
  { id: "lobby", label: "Lobby", images: inDir("lobby") },
  { id: "outside", label: "Outside", images: inDir("outside") },
  { id: "reception", label: "Reception", images: inDir("reception") },
  { id: "classic", label: "Classic", images: inDir("tilda-classic") },
  { id: "deluxe", label: "Deluxe", images: inDir("tilda-deluxe") },
  { id: "private-suite", label: "Private Suite", images: inDir("tilda-private-suite") },
  { id: "suite", label: "Suite", images: inDir("tilda-suite") },
  { id: "super-deluxe", label: "Super Deluxe", images: inDir("tilda-super-deluxe") },
];
