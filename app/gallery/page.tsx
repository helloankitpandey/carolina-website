// app/gallery/page.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

type Item = {
  id: string;
  caption?: string;
  url: string;
  category?: string;
};

export default function GalleryPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Fetch JSON produced by your script at /public/decoration-images.json
  useEffect(() => {
    fetch("/decoration-images.json")
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data: Item[]) => {
        setItems(data);
      })
      .catch(() => {
        // fallback: try reading images directly from /public/decoration (if you didn't generate JSON)
        // Optionally populate with a small set if needed.
        console.warn("decoration-images.json missing — show fallback placeholder");
        setItems([]);
      });
  }, []);

  // categories derived from items
  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add("All");
    items.forEach((i) => {
      if (i.category) set.add(i.category);
    });
    return Array.from(set);
  }, [items]);

  const filtered = useMemo(() => {
    if (filter === "All") return items;
    return items.filter((it) => it.category === filter);
  }, [items, filter]);

  // Lightbox handlers
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, currentIndex, filtered]);

  function openAt(index: number) {
    setCurrentIndex(index);
    setIsOpen(true);
    // disable body scroll (simple)
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    setIsOpen(false);
    document.body.style.overflow = "";
  }

  function prev() {
    setCurrentIndex((c) => (c - 1 + filtered.length) % Math.max(1, filtered.length));
  }

  function next() {
    setCurrentIndex((c) => (c + 1) % Math.max(1, filtered.length));
  }

  // For touch swipe (basic)
  const touchStartX = useRef<number | null>(null);
  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 40) prev();
    else if (dx < -40) next();
    touchStartX.current = null;
  }

  return (
    <div className="min-h-screen bg-black text-neutral-100">
      <section className="pt-8 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.5em] text-neon-teal sm:text-xs">
            Gallery
          </p>
          <h1 className="mb-6 text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
            Carolina — Visual Archive
          </h1>

          {/* Filter bar */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="flex gap-2 flex-wrap">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                    filter === c
                      ? "bg-gradient-to-r from-blue-600 to-emerald-400 text-black shadow-[0_0_18px_rgba(0,255,200,0.12)]"
                      : "bg-black/40 border border-white/6 text-neutral-200 hover:bg-black/50"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="ml-auto text-sm text-neutral-400">
              {filtered.length} item{filtered.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Gallery grid (masonry-like using CSS columns) */}
          <div
            ref={containerRef}
            className="gallery-columns -mx-2"
            style={
              {
                // smaller screens: 1 column; medium: 2; lg:3; xl:4 (CSS columns used)
              } as React.CSSProperties
            }
          >
            {/* CSS columns approach gives masonry-ish layout with variable heights */}
            <style jsx>{`
              .gallery-columns {
                column-gap: 1rem;
                /* column-count controlled via media queries */
                column-count: 1;
              }
              @media (min-width: 640px) {
                .gallery-columns {
                  column-count: 2;
                }
              }
              @media (min-width: 1024px) {
                .gallery-columns {
                  column-count: 3;
                }
              }
              @media (min-width: 1280px) {
                .gallery-columns {
                  column-count: 4;
                }
              }
              .gallery-columns .item {
                display: inline-block; /* required for column layout */
                width: 100%;
                margin: 0 0 1rem;
              }
            `}</style>

            {filtered.map((it, idx) => (
              <div
                key={it.id}
                className="item px-2"
                // open at index of filtered array
                onClick={() => openAt(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") openAt(idx);
                }}
              >
                <div className="relative overflow-hidden rounded-lg border border-neon-teal/20 bg-black/20 hover:shadow-[0_0_30px_rgba(75,225,255,0.06)] transition-transform transform hover:-translate-y-1">
                  <div className="relative w-full" style={{ paddingBottom: "70%" /* aspect ratio placeholder */ }}>
                    <Image
                      src={it.url}
                      alt={it.caption ?? "Carolina image"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                  </div>
                  {/* <div className="p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-white truncate">
                          {it.caption ?? "Carolina Image"}
                        </div>
                        <div className="text-xs text-neutral-400">{it.category ?? ""}</div>
                      </div>
                      <div className="text-xs text-neutral-500">View</div>
                    </div>
                  </div> */}
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="mt-12 text-center text-neutral-400">
              No images found for <strong>{filter}</strong>.
            </div>
          )}

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block rounded-full px-6 py-3 bg-black/40 border border-neon-teal/30 text-sm font-semibold text-neon-teal hover:bg-black/60 transition"
            >
              Return Home
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {isOpen && filtered.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          aria-modal="true"
          role="dialog"
        >
          <div className="absolute inset-0" onClick={closeLightbox} />

          <div className="relative mx-4 max-w-[1100px] w-full">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-neutral-300">
                {currentIndex + 1} / {filtered.length} — {filtered[currentIndex]?.caption}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={filtered[currentIndex].url}
                  download
                  className="rounded-full bg-black/40 px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-neon-teal hover:bg-black/60"
                >
                  Download
                </a>
                <button
                  onClick={closeLightbox}
                  className="rounded-full bg-black/40 px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-neutral-200 hover:bg-black/60"
                  aria-label="Close lightbox"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Main image area */}
            <div className="relative bg-black rounded-lg overflow-hidden" style={{ minHeight: 320 }}>
              <Image
                src={filtered[currentIndex].url}
                alt={filtered[currentIndex].caption ?? "Carolina image"}
                width={1600}
                height={900}
                className="object-contain max-h-[75vh] mx-auto"
                sizes="(max-width: 640px) 100vw, 900px"
              />

              {/* Left / Right arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 border border-white/10 hover:bg-black/60"
                aria-label="Previous image"
              >
                ←
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 border border-white/10 hover:bg-black/60"
                aria-label="Next image"
              >
                →
              </button>
            </div>

            {/* caption */}
            {/* {filtered[currentIndex]?.caption && (
              <div className="mt-3 text-sm text-neutral-300">{filtered[currentIndex]?.caption}</div>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
}
