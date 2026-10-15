"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { Eyebrow } from "@/components/ui/Button";
import { contact, tour } from "@/data/site";

const embedSrc = (autoplay: boolean) =>
  `https://www.youtube.com/embed/${contact.tourVideoId}?` +
  new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: "1",
    controls: "1",
    rel: "0",
    modestbranding: "1",
    enablejsapi: "1",
    playsinline: "1",
  }).toString();

/**
 * Virtual tour, behaving like the live site: a muted preview that starts playing when it
 * scrolls into view, pauses when it leaves, and an Unmute control for sound.
 * Autoplay is skipped for visitors who prefer reduced motion.
 */
export function Tour() {
  const wrap = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const started = useRef(false);
  const [src, setSrc] = useState(() => embedSrc(false));
  const [muted, setMuted] = useState(true);

  const command = (func: string) => {
    frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), "https://www.youtube.com");
  };

  useEffect(() => {
    const el = wrap.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (started.current) command("playVideo");
          else {
            started.current = true;
            setSrc(embedSrc(true));
          }
        } else if (started.current) {
          command("pauseVideo");
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    command(next ? "mute" : "unMute");
  };

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

        {/* The reveal wipe sits on an outer wrapper so the observed element is never clipped. */}
        <div className="mt-12 md:mt-16" data-reveal="fade">
        <div ref={wrap} className="group relative aspect-video overflow-hidden bg-forest-900">
          <iframe
            ref={frame}
            src={src}
            title={contact.tourVideoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Unmute video" : "Mute video"}
            aria-pressed={!muted}
            className="absolute bottom-4 right-4 z-10 flex min-h-11 items-center gap-2 rounded-full bg-ivory-50 px-4 text-[0.8125rem] font-semibold text-forest-950 shadow-[var(--neu-dark-raised)] transition-opacity duration-300 ease-lux focus-visible:opacity-100 sm:bottom-6 sm:right-6 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100"
          >
            <Icon name={muted ? "volume-mute" : "volume"} size={16} />
            {muted ? "Unmute" : "Mute"}
          </button>
        </div>
        </div>
        <p className="mt-5 text-center text-xs text-mist-300">
          Hover over the video and click <span className="font-semibold text-ivory-50">Unmute</span> to turn on sound.
        </p>
      </div>
    </section>
  );
}
