"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { Eyebrow } from "@/components/ui/Button";
import { contact, tour } from "@/data/site";
import type { Photo } from "@/lib/images";

/**
 * Virtual tour. Shows a real photograph as the poster and only loads the YouTube player
 * when the guest asks for it, so no third-party script runs on page load. Because playback
 * starts from a click, it can play with sound; no separate unmute step is needed.
 */
export function Tour({ poster }: { poster: Photo }) {
  const [playing, setPlaying] = useState(false);

  return (
    <section aria-labelledby="tour-title" className="on-dark section-y bg-forest-950 text-ivory-50">
      <div className="container-lux">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7" data-reveal="fade">
            <Eyebrow tone="light">{tour.eyebrow}</Eyebrow>
            <h2 id="tour-title" className="t-h2 mt-5">
              {tour.title}
            </h2>
          </div>
          <p className="text-mist-300 md:col-span-4 md:col-start-9" data-reveal="fade">
            {tour.body}
          </p>
        </div>

        <div className="relative mt-12 aspect-video overflow-hidden bg-forest-900 md:mt-16" data-reveal="image">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${contact.tourVideoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={contact.tourVideoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 block w-full text-left">
              <span className="ri-media absolute inset-0">
                <Image
                  src={poster.src}
                  alt=""
                  fill
                  sizes="(min-width: 1440px) 1344px, 100vw"
                  placeholder={poster.blurDataURL ? "blur" : "empty"}
                  blurDataURL={poster.blurDataURL}
                  className="img-zoom object-cover"
                  style={{ objectPosition: poster.focus }}
                />
              </span>
              <span className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-forest-950/10 to-transparent" />
              <span className="absolute bottom-6 left-6 flex items-center gap-5 sm:bottom-10 sm:left-10">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ivory-50 text-forest-950 shadow-[var(--neu-dark-raised)] transition-transform duration-500 ease-lux group-hover:scale-105 sm:h-20 sm:w-20">
                  <Icon name="play" size={22} className="translate-x-0.5" />
                </span>
                <span>
                  <span className="block font-display text-xl sm:text-2xl">Play the tour</span>
                  <span className="t-label mt-1 block text-mist-300">Rooms &amp; facilities · with sound</span>
                </span>
              </span>
              <span className="sr-only">Play video: {contact.tourVideoTitle}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
