"use client";

import { useState } from "react";

type ServiceDef = {
  id: string;
  title: string;
  subtitle: string;
  capacity: string;
  priceRange: string;
  description: string;
  image: string;
};

const SERVICES: ServiceDef[] = [
  {
    id: "private-dining",
    title: "Private Dining",
    subtitle: "Intimate & tailored",
    capacity: "Up to 28 guests",
    priceRange: "₹4,500 – ₹12,000 / person (est.)",
    description:
      "A secluded room with bespoke menu options and dedicated service. Perfect for small celebrations and private tastings.",
    image: "https://www.luxuryrestaurantguide.com/app/uploads/2017/11/pdr-2-1.jpg",
  },
  {
    id: "catering-offsite",
    title: "Offsite Catering",
    subtitle: "Catering for any occasion",
    capacity: "20 – 500+ guests",
    priceRange: "Custom pricing",
    description:
      "Full-service offsite catering with staff, bar setup, and equipment. We work with you to design an unforgettable menu for your location.",
    image: "https://falcoscatering.com/wp-content/uploads/2018/09/IMG_2088-e1537203318181-scaled.jpg",
  },
  {
    id: "chef-table",
    title: "Chef’s Table Experience",
    subtitle: "An immersive evening",
    capacity: "8 seats",
    priceRange: "₹10,000 per seat (est.)",
    description:
      "Close-up service at the chef's pass with an evolving multi-course menu and direct conversation with the kitchen team.",
    image: "https://www.fourseasons.com/alt/img-opt/~70.1530.0,0000-156,2500-3000,0000-1687,5000/publish/content/dam/fourseasons/images/web/KOH/KOH_433_original.jpg",
  },
  {
    id: "tasting-menu",
    title: "Tasting Menus",
    subtitle: "Seasonal multi-course menus",
    capacity: "Per person pricing",
    priceRange: "₹3,000 – ₹7,500 / person",
    description:
      "Curated seasonal tasting menus with optional beverage pairings. Great for special nights and culinary exploration.",
    image: "https://cdn.pixabay.com/photo/2015/12/12/21/12/dining-table-1090128_960_720.jpg",
  },
];

export default function ServicesPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "private-dining",
    date: "",
    headcount: "",
    budget: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  async function submitInquiry(e: React.FormEvent) {
    e.preventDefault();
    setToast(null);

    if (!form.name || !form.email || !form.service) {
      setToast({ type: "error", text: "Please provide name, email and a service type." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/services/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to send inquiry");
      }
      setToast({ type: "ok", text: "Inquiry sent — our events team will contact you within 24 hours." });
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "private-dining",
        date: "",
        headcount: "",
        budget: "",
        message: "",
      });
    } catch (err: any) {
      setToast({ type: "error", text: err.message || "Failed to send inquiry" });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 5000);
    }
  }

  return (
    <div className="relative px-4 sm:px-6 md:px-10 pb-24 max-w-6xl mx-auto">

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-80px] top-[-60px] h-[240px] w-[240px] rounded-full bg-blue-600/18 blur-3xl" />
        <div className="absolute right-[-80px] bottom-[-20px] h-[200px] w-[200px] rounded-full bg-emerald-500/12 blur-3xl" />
      </div>

      <header className="text-center pt-12 pb-6">
        <p className="text-xs text-emerald-300 tracking-wider uppercase">Services</p>
        <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Events, Private Dining & Catering
        </h1>
        <p className="mt-3 max-w-3xl mx-auto text-neutral-300">
          Bespoke experiences designed to highlight seasonal ingredients, thoughtful hospitality, and brilliant
          service. Tell us the occasion and we’ll design the rest.
        </p>
      </header>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        {SERVICES.map((s) => (
          <article
            key={s.id}
            className="group relative rounded-2xl overflow-hidden border border-white/8 bg-black/30 backdrop-blur-md hover:shadow-[0_16px_80px_rgba(10,102,255,0.06)] transition"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              <div className="md:col-span-1 h-44 md:h-full w-full overflow-hidden">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>

              <div className="md:col-span-2 p-5 sm:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                    <p className="text-xs text-emerald-300 uppercase tracking-wide mt-1">{s.subtitle}</p>
                  </div>
                  <div className="text-right text-sm">
                    <div className="text-sm text-neutral-300">{s.capacity}</div>
                    <div className="text-sm text-emerald-300 mt-1">{s.priceRange}</div>
                  </div>
                </div>

                <p className="mt-3 text-neutral-300 leading-relaxed">{s.description}</p>

                <div className="mt-4 flex items-center gap-3">
                  <a href="#inquire" onClick={(e) => { e.preventDefault(); document.getElementById("inquire")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-block rounded-full bg-gradient-to-r from-blue-600 to-emerald-400 px-4 py-2 text-black font-semibold">
                    Inquire
                  </a>
                  <a href="/events" className="inline-block rounded-full border border-white/8 px-4 py-2 text-sm text-white/90 hover:border-emerald-300">
                    Sample Menu
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-2xl border border-white/8 bg-black/30 p-6">
        <h3 className="text-xl font-semibold text-white">Sample — Private Dining Package</h3>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          <div>
            <h4 className="text-sm text-emerald-300 uppercase">What's included</h4>
            <ul className="mt-2 text-sm text-neutral-300 space-y-1">
              <li>Welcome canapés & amuse-bouche</li>
              <li>5-course prix-fixe menu (seasonal)</li>
              <li>Dedicated server & sommelier pairing (optional)</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm text-emerald-300 uppercase">Sample timeline</h4>
            <ol className="mt-2 text-sm text-neutral-300 space-y-1">
              <li>18:00 — Arrival & welcome drink</li>
              <li>18:30 — First course</li>
              <li>19:30 — Main & dessert</li>
            </ol>
          </div>
          <div>
            <h4 className="text-sm text-emerald-300 uppercase">Deposit & policy</h4>
            <p className="mt-2 text-sm text-neutral-300">A refundable deposit or card hold may be required for large parties. Cancellation policy: 72 hours for full refund.</p>
          </div>
        </div>
      </section>

      <section id="inquire" className="mt-10 grid gap-8 md:grid-cols-2 items-start">
        <div className="rounded-2xl border border-white/8 bg-black/30 p-6">
          <h3 className="text-lg font-semibold text-white">Request a quote</h3>
          <p className="text-sm text-neutral-300 mt-1">Tell us a bit about your event and we’ll follow up within 24 hours.</p>

          <form onSubmit={submitInquiry} className="mt-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input required value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} placeholder="Your name" className="w-full rounded-md bg-black/20 border border-white/8 px-3 py-2 text-white" />
              <input required type="email" value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} placeholder="Email" className="w-full rounded-md bg-black/20 border border-white/8 px-3 py-2 text-white" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input value={form.phone} onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))} placeholder="Phone (optional)" className="w-full rounded-md bg-black/20 border border-white/8 px-3 py-2 text-white" />
              <select value={form.service} onChange={(e) => setForm((s) => ({ ...s, service: e.target.value }))} className="w-full rounded-md bg-black/20 border border-white/8 px-3 py-2 text-white">
                {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input value={form.date} onChange={(e) => setForm((s) => ({ ...s, date: e.target.value }))} type="date" className="w-full rounded-md bg-black/20 border border-white/8 px-3 py-2 text-white" />
              <input value={form.headcount} onChange={(e) => setForm((s) => ({ ...s, headcount: e.target.value }))} placeholder="Headcount (est.)" className="w-full rounded-md bg-black/20 border border-white/8 px-3 py-2 text-white" />
            </div>

            <input value={form.budget} onChange={(e) => setForm((s) => ({ ...s, budget: e.target.value }))} placeholder="Budget (optional)" className="w-full rounded-md bg-black/20 border border-white/8 px-3 py-2 text-white" />

            <textarea value={form.message} onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))} placeholder="Tell us about your event (venue, vibe, special requests)" className="w-full rounded-md bg-black/20 border border-white/8 px-3 py-2 text-white min-h-[120px]" />

            <div className="flex items-center justify-between gap-3">
              <button type="submit" disabled={loading} className="rounded-full bg-gradient-to-r from-blue-600 to-emerald-400 px-4 py-2 text-black font-semibold">
                {loading ? "Sending…" : "Send inquiry"}
              </button>
              <div className="text-sm text-neutral-400">We typically respond within 24 hours</div>
            </div>
          </form>
        </div>

        <aside>
          <div className="rounded-2xl border border-white/8 bg-black/30 p-6 mb-6">
            <h4 className="text-sm text-emerald-300 font-semibold">Why Carolina</h4>
            <p className="mt-2 text-neutral-300 text-sm">Personalized menus, meticulous service, and local sourcing make events at Carolina memorable.</p>

            <div className="mt-4">
              <div className="text-sm text-neutral-300">Contact the events team:</div>
              <a href="mailto:events@carolina-lounge.com" className="block mt-2 text-emerald-300">events@carolina-lounge.com</a>
              <div className="mt-1 text-neutral-300">+1 (919) 555-0470</div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-black/30 p-6 mb-6">
            <h4 className="text-sm text-emerald-300 font-semibold">Testimonials</h4>
            <blockquote className="mt-3 text-neutral-300 italic">"Our company retreat was flawless — food and service were exceptional." — Acme Corp</blockquote>
            <blockquote className="mt-3 text-neutral-300 italic">"The chef's table was the highlight of our wedding weekend." — S & R</blockquote>
          </div>

          <div className="rounded-2xl border border-white/8 bg-black/30 p-6">
            <h4 className="text-sm text-emerald-300 font-semibold">FAQ</h4>
            <div className="mt-2 text-sm text-neutral-300 space-y-2">
              <div><strong>Booking lead time:</strong> 2–8 weeks depending on size.</div>
              <div><strong>Dietary needs:</strong> We can accommodate most allergies with notice.</div>
              <div><strong>Outdoor events:</strong> Depends on venue & permits — we can advise.</div>
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-12 text-center">
        <a href="/reservations" className="inline-block rounded-full bg-gradient-to-r from-blue-600 to-emerald-400 px-6 py-2 text-black font-semibold">Reserve a Table</a>
      </section>

      {toast && (
        <div role="status" className={`fixed right-6 bottom-6 z-50 rounded-md px-4 py-3 text-sm ${toast.type === "ok" ? "bg-black/80 border border-emerald-400 text-emerald-200" : "bg-black/80 border border-red-400 text-red-300"}`}>
          <div className="flex items-center gap-3">
            <span>{toast.type === "ok" ? "✓" : "⚠"}</span>
            <div>{toast.text}</div>
          </div>
        </div>
      )}
    </div>
  );
}
