"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type EventItem = {
  id: string;
  title: string;
  dateLabel: string; // preformatted friendly date/time label
  excerpt: string;
  fullDescription?: string;
  venue?: string;
  tag?: string;
  image?: string;
};

const EVENTS: EventItem[] = [
  {
    id: "dj-residency-01",
    title: "Luminary DJ Residency",
    dateLabel: "Fri • 10:00 PM — 2:00 AM",
    excerpt: "Weekly rooftop residency — neon beats, immersive lights and signature cocktails.",
    fullDescription:
      "Luminary DJs spin progressive house and electronic sets with immersive lighting and curated cocktails. Perfect for nightlife lovers seeking high-energy rooftop vibes.",
    venue: "Rooftop Deck",
    tag: "Nightlife",
    image: "https://media.timeout.com/images/105347841/image.jpg",
  },
  {
    id: "neon-glow-party",
    title: "Neon Glow Party",
    dateLabel: "Sat • 10:00 PM — Late",
    excerpt: "Glow-in-the-dark paint, pop-up performances, and bottle service options.",
    fullDescription:
      "A neon-themed celebration with face-paint stations, interactive moments, and party popups. Dress bright — we provide the glow.",
    venue: "Main Lounge",
    tag: "Party",
    image: "https://th.bing.com/th/id/R.99e2925719ca3517ef3c54639f9074e8?rik=T1sjFWu5GWrNGQ&riu=http%3a%2f%2f2.bp.blogspot.com%2f-KYwQbB5Ah0k%2fVYigqPh7C6I%2fAAAAAAAACOQ%2f2eJpY1JZgMQ%2fs1600%2fglow-in-the-dark-neon-party-ideas-frostedeventscom-kids-birthday-party-teen-party-00322.jpg&ehk=y%2fFzGbaYCwPBRf2VxpSf4T%2bjFI5HKvZv51rVoLq4woY%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: "city-beats-afterhours",
    title: "City Beats — After Hours",
    dateLabel: "Sun • 11:00 PM — 2:00 AM",
    excerpt: "Intimate late-night sessions with select DJs and chill city views.",
    fullDescription:
      "An intimate after-hours crowd with deep-house sets, select cocktails, and a relaxed rooftop atmosphere.",
    venue: "Rooftop Bar",
    tag: "After Hours",
    image: "https://cdn.5280.com/2022/11/Ophelias_Electric_Soapbox_concert_Sam-Silkworth-1536x1024.jpg",
  },
];

const GOOGLE_FORM_PREFILL_BASE = ""; // <-- paste your Google Form 'prefill' link OR the plain form viewform URL here

export default function EventsPage() {
  const [selected, setSelected] = useState<EventItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  function openEvent(ev: EventItem) {
    setSelected(ev);
    // lock scroll while modal open
    document.body.style.overflow = "hidden";
  }
  function closeEventModal() {
    setSelected(null);
    document.body.style.overflow = "";
  }

  function openHostForm(prefillData?: Record<string, string>) {
    // If the site owner supplies a prefill link you can optionally append query params.
    // For simplicity here we open the base form URL or the prefilled link.
    if (!GOOGLE_FORM_PREFILL_BASE) {
      setToast("Host form not configured. Please set GOOGLE_FORM_PREFILL_BASE.");
      return;
    }

    try {
      // If prefillData provided and base is a prefilling URL with query params, try to append
      const url = new URL(GOOGLE_FORM_PREFILL_BASE);
      if (prefillData) {
        Object.entries(prefillData).forEach(([k, v]) => {
          // append values — many Google prefill links use entry.<id> keys already
          url.searchParams.set(k, v);
        });
      }
      window.open(url.toString(), "_blank", "noopener,noreferrer");
      setToast("Opening form…");
    } catch (err) {
      // fallback: open raw link
      window.open(GOOGLE_FORM_PREFILL_BASE, "_blank", "noopener,noreferrer");
      setToast("Opening form…");
    }
  }

  return (
    <div className="min-h-screen bg-black text-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs text-neon-teal uppercase tracking-[0.32em] font-semibold">Events</p>
          <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            DJ Nights & Parties
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-neutral-300">
            Neon-lit rooftop nights, curated DJs and weekend parties — see what’s coming to Carolina.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((ev) => (
            <article
              key={ev.id}
              className="group overflow-hidden rounded-2xl border border-white/8 bg-black/30 backdrop-blur-md transition hover:shadow-[0_12px_40px_rgba(10,102,255,0.06)]"
            >
              <div className="relative h-44 sm:h-48">
                {ev.image ? (
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="w-full h-full object-cover brightness-90 group-hover:brightness-95 transition"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-900/40" />
                )}
                <div className="absolute top-3 left-3 rounded-md bg-black/50 px-3 py-1 text-xs text-neutral-100 backdrop-blur">
                  {ev.dateLabel}
                </div>
                {ev.tag && (
                  <div className="absolute top-3 right-3 rounded-full bg-black/50 px-2 py-1 text-xs text-neutral-100 backdrop-blur">
                    {ev.tag}
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="text-lg font-semibold text-blue-500">{ev.title}</h3>
                <p className="text-sm text-neutral-300 mt-2 line-clamp-3">{ev.excerpt}</p>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="text-sm text-neutral-400">{ev.venue ?? ""}</div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEvent(ev)}
                      className="px-3 py-1 rounded-full border text-black font-semibold border-teal-400 text-sm bg-gradient-to-r from-blue-600 to-emerald-400 transition"
                      aria-label={`View details for ${ev.title}`}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Host an Event CTA (bottom) */}
        <div className="mt-10 rounded-3xl border border-white/8 bg-black/30 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Host your event at Carolina</h3>
              <p className="text-sm text-neutral-300 mt-1">
                Private cabanas, curated menus and production support — fill the short form and we'll follow up with options.
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <button
                onClick={() => openHostForm()}
                className="rounded-full bg-gradient-to-r from-blue-600 to-emerald-400 px-5 py-2 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(10,102,255,0.08)]"
              >
                Host an Event
              </button>

              <Link
                href="/events/packages"
                className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-neutral-200 hover:bg-black/20"
              >
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Read-only Modal for event details */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeEventModal}
          />

          <div className="relative z-10 max-w-3xl w-full rounded-2xl overflow-hidden border border-white/8 bg-black/40 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <div className="md:flex">
              <div className="md:w-1/2 h-56 md:h-auto relative">
                {selected.image ? (
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-900/30" />
                )}
              </div>

              <div className="md:w-1/2 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">{selected.title}</h2>
                    <p className="text-sm text-neutral-300 mt-1">{selected.dateLabel}</p>
                    <p className="text-xs text-neutral-400 mt-1">{selected.venue}</p>
                  </div>
                  <button
                    aria-label="Close details"
                    onClick={closeEventModal}
                    className="text-neutral-300 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <p className="mt-4 text-neutral-300 text-sm leading-relaxed">{selected.fullDescription}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {/* optional actions — read-only so these are share / calendar */}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      // lightweight "add to calendar" fallback — could be improved
                      setToast("Use your calendar app to add this event.");
                    }}
                    className="rounded-full px-3 py-2 bg-black/30 border border-white/8 text-sm text-neutral-200 hover:bg-black/40"
                  >
                    Add to Calendar
                  </a>

                  <button
                    onClick={() => {
                      // open host form prefilled with this event info — helpful CTA
                      const prefill = {
                        // if your GOOGLE_FORM_PREFILL_BASE uses entry keys like entry.12345,
                        // you should pass those keys here; otherwise base will be opened as-is.
                        // we're passing a basic `event` param to the URL — adjust if your form expects specific entry.* keys
                        event: selected.title,
                      } as Record<string, string>;
                      openHostForm(prefill);
                    }}
                    className="rounded-full bg-gradient-to-r from-blue-600 to-emerald-400 px-4 py-2 text-sm font-semibold text-black"
                  >
                    Host Similar Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Small toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-60 rounded-md bg-black/80 border border-white/6 px-4 py-3 text-sm text-white shadow-[0_6px_30px_rgba(10,102,255,0.12)]">
          {toast}
          <button onClick={() => setToast(null)} className="ml-3 text-neutral-400">✕</button>
        </div>
      )}
    </div>
  );
}
