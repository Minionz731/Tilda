import Image from "next/image";
import type { CSSProperties, ElementType, ReactNode } from "react";
import type { Photo } from "@/lib/images";

type Tag = "h1" | "h2" | "h3" | "p" | "div" | "span";

/** Heading revealed line by line, each line sliding up inside its own mask. */
export function RevealLines({
  as: Tag = "h2",
  lines,
  className,
  delay = 0,
  id,
}: {
  as?: Tag;
  lines: (string | ReactNode)[];
  className?: string;
  delay?: number;
  id?: string;
}) {
  return (
    <Tag id={id} className={className} data-reveal="lines" style={{ "--d": `${delay}ms` } as CSSProperties}>
      {lines.map((line, i) => (
        <span key={i} className="rl-line">
          <span className="rl-inner" style={{ "--l": i } as CSSProperties}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Fade-and-rise for body copy, links and grid items. `index` staggers siblings. */
export function Reveal({
  as: Tag = "div",
  children,
  className,
  index = 0,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <Tag className={className} data-reveal="fade" style={{ "--i": index } as CSSProperties}>
      {children}
    </Tag>
  );
}

/**
 * Photograph in a fixed-ratio frame, revealed with a clip-path wipe. With `parallax`
 * the image drifts gently inside the frame as the page scrolls (desktop only).
 */
export function RevealImage({
  photo,
  className = "",
  sizes,
  priority = false,
  parallax = false,
  zoom = false,
  delay = 0,
  reveal = true,
}: {
  photo: Photo;
  className?: string;
  sizes: string;
  priority?: boolean;
  parallax?: boolean;
  zoom?: boolean;
  delay?: number;
  reveal?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-ivory-200 ${className}`}
      data-reveal={reveal ? "image" : undefined}
      data-parallax={parallax ? "" : undefined}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      <div className="ri-media absolute inset-0">
        <div className={`absolute inset-0 ${parallax ? "parallax-media" : ""}`}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={sizes}
            priority={priority}
            placeholder={photo.blurDataURL ? "blur" : "empty"}
            blurDataURL={photo.blurDataURL}
            className={`object-cover ${zoom ? "img-zoom" : ""}`}
            style={{ objectPosition: photo.focus }}
          />
        </div>
      </div>
    </div>
  );
}
