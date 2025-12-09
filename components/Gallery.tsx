"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

type Item = { id: string; caption: string; url: string };

export default function CarolinaGallery() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [items, setItems] = useState<Item[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  useEffect(() => {
    // fetch the generated JSON file from public/
    fetch("/decoration-images.json")
      .then((r) => {
        if (!r.ok) throw new Error("decoration json not found");
        return r.json();
      })
      .then((data: Item[]) => setItems(data))
      .catch(() => {
        // fallback: if JSON not generated, you can optionally hardcode a few paths
        setItems([
          // fallback examples (if you prefer)
          { id: "fallback-1", caption: "Rooftop", url: "/decoration/fallback-1.jpg" },
        ]);
      });
  }, []);

  const scrollByAmount = (amount: number) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="border-b border-white/5 bg-black px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl relative">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.5em] text-neon-teal sm:text-xs">
          Gallery
        </p>
        <h2 className="mb-8 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
          Inside the Carolina Experience
        </h2>

        {canScrollLeft && (
          <button
            onClick={() => scrollByAmount(-280)}
            className="absolute left-2 top-[50%] -translate-y-1/2 z-20 flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full bg-gradient-to-b from-black/60 to-black/40 border border-white/20 hover:border-neon-teal/40 hover:bg-black/80 transition shadow-[0_0_12px_rgba(0,255,255,0.4)]"
          >
            <span className="text-white text-lg md:text-xl leading-none">←</span>
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scrollByAmount(280)}
            className="absolute right-2 top-[50%] -translate-y-1/2 z-20 flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full bg-gradient-to-b from-black/60 to-black/40 border border-white/20 hover:border-neon-teal/40 hover:bg-black/80 transition shadow-[0_0_12px_rgba(0,255,255,0.4)]"
          >
            <span className="text-white text-lg md:text-xl leading-none">→</span>
          </button>
        )}

        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 sm:gap-6 scrollbar-hide scroll-smooth">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative flex-shrink-0 w-56 sm:w-72 md:w-80 overflow-hidden rounded-lg border border-neon-teal/20 transition-all hover:border-neon-teal/50 hover:shadow-[0_0_20px_rgba(75,225,255,0.12)]"
            >
              <div className="relative h-56 w-56 sm:h-72 sm:w-72 md:h-80 md:w-80">
                <Image
                  src={item.url}
                  alt={item.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 224px, 288px, 320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link className="inline-block text-sm font-semibold uppercase tracking-[0.3em] text-neon-teal transition hover:text-white sm:text-base" href="/gallery">
            View Gallery →
          </Link>
        </div>
      </div>
    </section>
  );
}
