import manifest from "@/data/image-manifest.json";
import { altFor } from "@/data/gallery";

export type Photo = {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
  alt: string;
  /** CSS object-position keeping the subject in frame when cropped. */
  focus: string;
};

const MANIFEST = manifest as Record<string, { src: string; width: number; height: number; blurDataURL: string }>;
const LIVE = process.env.NEXT_PUBLIC_LIVE_ORIGIN ?? "https://tildabelshaven.com.ng";

// Art-directed focal points for frames that get cropped hard (portrait or panoramic).
const FOCUS: Record<string, string> = {
  "/images/outside/outside-1.jpg": "42% 55%",
  "/images/outside/outside-2.png": "55% 60%",
  "/images/outside/outside-3.png": "50% 55%",
  "/images/lobby/balcony-1.png": "62% 55%",
  "/images/reception/reception-3.jpg": "52% 60%",
  "/images/common-room/common-room-5.png": "40% 60%",
  "/images/tilda-private-suite/tilda-private-suite-1.png": "38% 55%",
  "/images/tilda-suite/tilda-suite-11.png": "45% 50%",
};

/** Map an image path from the live site or API onto the optimised local master. */
export function photo(path: string, alt?: string): Photo {
  const local = MANIFEST[path];
  const base = local ?? { src: path.startsWith("http") ? path : `${LIVE}${path}`, width: 1445, height: 1088 };
  return { ...base, alt: alt ?? altFor(path), focus: FOCUS[path] ?? "50% 50%" };
}

export const KEY = {
  exterior: "/images/outside/outside-1.jpg",
  courtyard: "/images/outside/outside-2.png",
  lounge: "/images/outside/outside-3.png",
  balcony: "/images/lobby/balcony-1.png",
  lobby: "/images/lobby/lobby-2.png",
  arrival: "/images/reception/reception-3.jpg",
  reception: "/images/reception/reception-4.png",
  commonRoom: "/images/common-room/common-room-5.png",
  kitchen: "/images/common-room/common-room-2.png",
  suiteBath: "/images/tilda-suite/tilda-suite-8.png",
  privateBalcony: "/images/tilda-private-suite/tilda-private-suite-1.png",
  privateLiving: "/images/tilda-private-suite/tilda-private-suite-2.png",
} as const;
