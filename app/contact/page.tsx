"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setToast(null);

    if (!form.name || !form.email || !form.message) {
      setToast({ type: "error", text: "Please fill your name, email and message." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.message || "Failed to send message");
      }
      setToast({ type: "ok", text: "Thanks — your message has been sent." });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: any) {
      setToast({ type: "error", text: err.message || "Unable to send message." });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 5000);
    }
  }

  return (
    <div className="relative px-4 sm:px-6 md:px-10 pb-20 max-w-6xl mx-auto">

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-16 h-[240px] w-[240px] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -right-24 bottom-8 h-[200px] w-[200px] rounded-full bg-emerald-500/12 blur-3xl" />
      </div>

      <header className="text-center pt-12 pb-6">
        <p className="text-xs text-emerald-300 tracking-wide uppercase">Contact</p>
        <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Get in touch with Carolina
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-neutral-300">
          For events, private dining, press, or general inquiries — send us a message and our team will reach
          out within 24 hours.
        </p>
      </header>

      <main className="grid gap-8 lg:gap-12 md:grid-cols-2 items-start">

        <section aria-labelledby="contact-form-heading" className="order-2 md:order-1">
          <div className="rounded-2xl border border-white/8 bg-black/30 backdrop-blur-md p-5 sm:p-8">
            <h2 id="contact-form-heading" className="text-lg font-semibold text-white">
              Send us a message
            </h2>
            <p className="text-sm text-neutral-400 mt-1">We’ll respond as soon as we can.</p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs text-neutral-300">Name *</span>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                    className="mt-1 block w-full rounded-md bg-black/20 border border-white/8 px-3 py-2 text-white placeholder:text-neutral-400"
                    placeholder="Your name"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-xs text-neutral-300">Email *</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    className="mt-1 block w-full rounded-md bg-black/20 border border-white/8 px-3 py-2 text-white placeholder:text-neutral-400"
                    placeholder="you@example.com"
                    required
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs text-neutral-300">Phone</span>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                    className="mt-1 block w-full rounded-md bg-black/20 border border-white/8 px-3 py-2 text-white placeholder:text-neutral-400"
                    placeholder="+91 98765 43210"
                  />
                </label>

                <label className="block">
                  <span className="text-xs text-neutral-300">Subject</span>
                  <input
                    value={form.subject}
                    onChange={(e) => setForm((s) => ({ ...s, subject: e.target.value }))}
                    className="mt-1 block w-full rounded-md bg-black/20 border border-white/8 px-3 py-2 text-white placeholder:text-neutral-400"
                    placeholder="e.g. Event inquiry"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-xs text-neutral-300">Message *</span>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                  className="mt-1 block w-full rounded-md bg-black/20 border border-white/8 px-3 py-3 text-white placeholder:text-neutral-400 min-h-[120px]"
                  placeholder="How can we help?"
                  required
                />
              </label>

              <div className="flex items-center gap-3 justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-emerald-400 px-5 py-2 text-black font-semibold shadow-[0_8px_30px_rgba(10,102,255,0.12)] hover:scale-[1.02] transition"
                >
                  {loading ? "Sending…" : "Send Message"}
                </button>

                <div className="text-sm text-neutral-400">
                  <span className="block">Response typically within 24 hours</span>
                </div>
              </div>
            </form>
          </div>

          <div className="mt-4 space-y-3">
            <details className="group rounded-lg border border-white/6 bg-black/20 p-3">
              <summary className="cursor-pointer flex items-center justify-between text-sm text-neutral-200">
                When should I arrive for my reservation?
                <span className="text-neutral-400 text-xs">Read</span>
              </summary>
              <div className="mt-2 text-sm text-neutral-400">
                Please arrive 5–10 minutes before your reservation time to allow for seating and welcome drinks.
              </div>
            </details>

            <details className="group rounded-lg border border-white/6 bg-black/20 p-3">
              <summary className="cursor-pointer flex items-center justify-between text-sm text-neutral-200">
                Do you accommodate dietary restrictions?
                <span className="text-neutral-400 text-xs">Read</span>
              </summary>
              <div className="mt-2 text-sm text-neutral-400">
                Yes — please include allergies or special diet requests in your message and our team will confirm.
              </div>
            </details>
          </div>
        </section>

        <aside className="order-1 md:order-2">
          <div className="rounded-2xl border border-white/8 bg-black/20 backdrop-blur-md p-5 sm:p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">Visit & Contact</h3>

            <div className="text-sm text-neutral-300">
              <p className="font-semibold text-emerald-300">Carolina · The Luminary Lounge</p>
              <p className="mt-1">123 Aurora Lane, Neon District, NC</p>
              <p className="mt-1">reservations@carolina-lounge.com</p>
              <p className="mt-1">+1 (919) 555-0470</p>
            </div>

            <div className="border-t border-white/6 pt-4">
              <h4 className="text-xs tracking-wide text-neutral-300 uppercase">Hours</h4>
              <ul className="mt-2 text-sm text-neutral-300">
                <li>Mon–Fri: 12:00 PM — 11:00 PM</li>
                <li>Sat: 10:00 AM — 12:00 AM</li>
                <li>Sun: 10:00 AM — 10:00 PM</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/6">
              <h4 className="text-xs tracking-wide text-neutral-300 uppercase">Private Dining</h4>
              <p className="mt-2 text-sm text-neutral-300">
                Private room seats up to 28. Email us to request sample menus and pricing.
              </p>
              <a
                href="/events"
                className="inline-block mt-3 rounded-full bg-black/30 px-4 py-2 text-sm border border-white/8 hover:border-emerald-300"
              >
                Plan an event
              </a>
            </div>
          </div>

          <div className="mt-6 rounded-2xl overflow-hidden border border-white/8">
            <iframe
              title="Carolina location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0196080281587!2d-122.4194152846812!3d37.77492927975978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7e0a4febc0af%3A0x6b0f7d6b65b8f1b4!2sSome%20Restaurant!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
              className="w-full h-56 md:h-64"
              loading="lazy"
            />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-black/30 border border-white/8 flex items-center justify-center text-emerald-300 hover:shadow-[0_6px_30px_rgba(0,255,150,0.06)]"
            >
              IG
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="w-10 h-10 rounded-full bg-black/30 border border-white/8 flex items-center justify-center text-blue-300 hover:shadow-[0_6px_30px_rgba(0,150,255,0.06)]"
            >
              TT
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="w-10 h-10 rounded-full bg-black/30 border border-white/8 flex items-center justify-center text-pink-300 hover:shadow-[0_6px_30px_rgba(255,80,180,0.06)]"
            >
              YT
            </a>
          </div>
        </aside>
      </main>

      <div className="max-w-4xl mx-auto mt-10">
        <div className="rounded-full border border-white/8 bg-black/20 p-3 px-4 flex items-center gap-3">
          <input
            className="flex-1 rounded-full bg-black/10 px-4 py-2 placeholder:text-neutral-400 text-white"
            placeholder="Join the newsletter"
            aria-label="Join the newsletter"
          />
          <button className="rounded-full bg-gradient-to-r from-blue-600 to-emerald-400 px-4 py-2 text-black font-semibold">
            Subscribe
          </button>
        </div>
      </div>

      {toast && (
        <div
          role="status"
          className={`fixed right-6 bottom-6 z-50 rounded-md px-4 py-3 text-sm ${
            toast.type === "ok" ? "bg-black/80 border border-emerald-400 text-emerald-200" : "bg-black/80 border border-red-400 text-red-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <span>{toast.type === "ok" ? "✓" : "⚠"}</span>
            <div>{toast.text}</div>
          </div>
        </div>
      )}
    </div>
  );
}
