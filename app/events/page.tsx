"use client";

import React, { useState } from "react";
import Image from "next/image";

type EventItem = {
  id: string;
  title: string;
  slug?: string;
  startAt: string;
  excerpt: string;
  fullDescription?: string;
  capacity?: number;
  price?: string;
  image: string;
  ticketed?: boolean;
  venue?: string;
};

const EVENTS: EventItem[] = [
  {
    id: "winter-tasting",
    title: "Winter Tasting: Seasonal Roots",
    startAt: "2026-01-18T19:30:00Z",
    excerpt: "A 7-course tasting menu celebrating winter produce. Limited seats.",
    fullDescription:
      "Our Winter Tasting is a 7-course journey through root vegetables and winter greens. Each course is paired with a curated beverage pairing by our sommelier.",
    capacity: 28,
    price: "₹7,500",
    ticketed: true,
    venue: "Main Dining Room",
    image:
      "https://img.freepik.com/premium-photo/winter-decoration-luxury-restaurant-inspiration-ideas_1044173-386.jpg",
  },
  {
    id: "chef-table",
    title: "Chef's Table Experience",
    startAt: "2026-02-05T20:00:00Z",
    excerpt: "Intimate chef's table with exclusive off-menu courses (8 seats).",
    fullDescription:
      "Reserve the chef's table for a close-up of our plating and cooking techniques. Limited to 8 guests per seating. Includes beverage pairing.",
    capacity: 8,
    price: "₹12,000",
    ticketed: false,
    venue: "Chef's Table",
    image: "https://www.fourseasons.com/alt/img-opt/~70.1530.0,0000-156,2500-3000,0000-1687,5000/publish/content/dam/fourseasons/images/web/KOH/KOH_433_original.jpg",
  },
  {
    id: "supper-club",
    title: "Supper Club: Farmers x Flame",
    startAt: "2026-03-12T19:00:00Z",
    excerpt: "Outdoor supper celebrating our local growers with fire-cooked dishes.",
    fullDescription:
      "A long-table supper highlighting local farmers. Expect rustic shared plates, live music, and warm atmosphere.",
    capacity: 60,
    price: "₹3,500",
    ticketed: true,
    venue: "Courtyard",
    image: "https://captivatist.com/wp-content/uploads/2021/03/roundfiretable.jpg",
  },
];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  if (!message) return null;
  return (
    <div
      role="status"
      className="fixed bottom-6 right-6 z-[200] rounded-md bg-black/80 border border-white/6 px-4 py-3 text-sm text-white shadow-[0_6px_30px_rgba(10,102,255,0.12)]"
    >
      <div className="flex items-center gap-3">
        <span className="text-emerald-300">●</span>
        <span>{message}</span>
        <button
          aria-label="close toast"
          onClick={onClose}
          className="ml-4 text-sm text-neutral-400 hover:text-neutral-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [selected, setSelected] = useState<EventItem | null>(null);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    datePreferred: "",
    headcount: "",
    message: "",
  });

  async function submitInquiry(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    setLoading(true);
    try {
      const body = {
        eventId: selected.id,
        name: form.name,
        email: form.email,
        phone: form.phone,
        datePreferred: form.datePreferred || null,
        headcount: form.headcount ? parseInt(form.headcount, 10) : null,
        message: form.message,
      };
      const res = await fetch("/api/events/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to submit inquiry");
      }
      setToast("Thanks — our events team will contact you within 24 hours.");
      setForm({ name: "", email: "", phone: "", datePreferred: "", headcount: "", message: "" });
      setSelected(null);
    } catch (err: any) {
      setToast(err?.message || "Failed to send inquiry.");
    } finally {
      setLoading(false);
      setTimeout(() => setToast(""), 5000);
    }
  }

  return (
    <div className="relative px-4 sm:px-6 md:px-10 pb-28">
      <div className="max-w-4xl mx-auto text-center pt-10 pb-6">
        <p className="text-sm text-emerald-300 uppercase tracking-wider">Events</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Events & Private Dining
        </h1>
        <p className="max-w-2xl mx-auto mt-3 text-neutral-300">
          Celebrate with thoughtful menus and curated service. From intimate chef's tables to fully
          catered events.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {EVENTS.map((ev) => (
          <article
            key={ev.id}
            className="group relative rounded-2xl overflow-hidden border border-white/8 bg-black/30 backdrop-blur-md shadow-sm transition hover:shadow-[0_8px_40px_rgba(10,102,255,0.06)]"
          >
            <div className="relative h-44 sm:h-48 md:h-40 lg:h-44 w-full">
              <img
                src={ev.image}
                alt={ev.title}
                className="w-full h-full object-cover brightness-90 group-hover:brightness-95 transition"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 rounded-md bg-black/50 px-3 py-1 text-xs text-neutral-100 backdrop-blur">
                {formatDate(ev.startAt)}
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <h3 className="text-lg font-semibold text-white">{ev.title}</h3>
              <p className="text-sm text-neutral-300 mt-2 line-clamp-3">{ev.excerpt}</p>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-emerald-300 font-medium">{ev.price}</span>
                  <span className="text-xs text-neutral-400">· {ev.venue}</span>
                </div>

                <div className="flex items-center gap-2">
                  {ev.ticketed ? (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setToast("Ticket checkout is not configured yet.");
                        setTimeout(() => setToast(""), 3000);
                      }}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-emerald-400 text-black font-semibold text-sm shadow-[0_6px_30px_rgba(10,102,255,0.12)]"
                    >
                      Buy Ticket
                    </a>
                  ) : (
                    <button
                      onClick={() => setSelected(ev)}
                      className="px-3 py-1 rounded-full border border-white/8 text-sm text-white/90 hover:border-emerald-300 transition"
                    >
                      Inquire
                    </button>
                  )}

                  <button
                    onClick={() => setSelected(ev)}
                    aria-label={`View details for ${ev.title}`}
                    className="ml-2 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/30 border border-white/6 hover:bg-black/40"
                  >
                    ➜
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />
          <div className="relative z-60 max-w-3xl w-full rounded-2xl overflow-hidden border border-white/8 bg-black/40 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <div className="md:flex">
              <div className="md:w-1/2 h-56 md:h-auto relative">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="md:w-1/2 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">{selected.title}</h2>
                    <p className="text-sm text-neutral-300 mt-1">{formatDate(selected.startAt)}</p>
                    <p className="text-xs text-neutral-400 mt-1">{selected.venue}</p>
                  </div>
                  <button
                    aria-label="Close details"
                    onClick={() => setSelected(null)}
                    className="text-neutral-300 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <p className="mt-4 text-neutral-300 text-sm leading-relaxed">
                  {selected.fullDescription}
                </p>

                <div className="mt-6">
                  <h3 className="text-sm text-emerald-300 font-medium">Plan an event / Inquiry</h3>

                  <form onSubmit={submitInquiry} className="mt-3 space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                        className="w-full rounded-md border border-white/8 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-neutral-400"
                      />
                      <input
                        required
                        placeholder="Email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                        className="w-full rounded-md border border-white/8 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-neutral-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        placeholder="Phone"
                        value={form.phone}
                        onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                        className="w-full rounded-md border border-white/8 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-neutral-400"
                      />
                      <input
                        placeholder="Preferred date (optional)"
                        value={form.datePreferred}
                        onChange={(e) => setForm((s) => ({ ...s, datePreferred: e.target.value }))}
                        className="w-full rounded-md border border-white/8 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-neutral-400"
                      />
                    </div>

                    <textarea
                      placeholder="Guest count, budget, or message"
                      value={form.message}
                      onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                      className="w-full rounded-md border border-white/8 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-neutral-400 min-h-[88px]"
                    />

                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-emerald-400 px-4 py-2 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(10,102,255,0.12)]"
                      >
                        {loading ? "Sending…" : "Send Inquiry"}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSelected(null);
                        }}
                        className="text-sm text-neutral-400 underline"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}
