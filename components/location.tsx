// components/location.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

const MAP_IMAGE = "/map-blue.png";
const MAP_LINK = "https://maps.app.goo.gl/vW3wwN5AYYPfJE296";

export default function Location(): JSX.Element {
  return (
    <section className="border-b border-white/5 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          {/* LEFT: address + hours + actions */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.5em] text-neon-teal sm:text-xs">
              Location
            </p>

            <h2 className="mb-6 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
              Find Carolina
            </h2>

            <div className="mb-6 space-y-2 text-sm text-neutral-300 sm:text-base">
              <p className="font-medium text-white">Carolina – The Luminary Lounge</p>
              <p>123 Rooftop Avenue</p>
              <p>Jaipur, Rajasthan 302001</p>
              <p>India</p>
            </div>

            <div className="mb-6 space-y-2 text-sm text-neutral-300 sm:text-base">
              <p className="font-semibold uppercase tracking-[0.2em] text-neon-teal">Hours</p>
              <p>Monday – Thursday: 6:00 PM – 2:00 AM</p>
              <p>Friday – Saturday: 5:00 PM – 3:00 AM</p>
              <p>Sunday: 6:00 PM – 1:00 AM</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                className="rounded-full border border-neon-teal/60 bg-black/40 px-6 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.3em] text-neon-teal transition hover:border-neon-teal hover:bg-neon-teal/10 sm:text-sm"
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Carolina in Google Maps"
              >
                Open in Maps
              </a>

              <a
                className="rounded-full border border-green-500 bg-black/40 px-6 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.3em] text-green-400 shadow-[0_0_25px_rgba(92,255,181,0.25)] transition hover:border-green-400 hover:bg-green-400/10 hover:text-white hover:shadow-[0_0_35px_rgba(92,255,181,0.45)] sm:text-sm"
                href="tel:+911234567890"
                aria-label="Call Carolina"
              >
                Call Us
              </a>
            </div>
          </div>

          {/* RIGHT: circular clickable neon map */}
          <div className="flex items-center justify-center">
            <Link href={MAP_LINK} target="_blank" rel="noopener noreferrer" aria-label="Open Carolina location in Google Maps">
              <div
                className="relative flex items-center justify-center cursor-pointer"
                style={{ width: "100%", maxWidth: 300 }}
              >
                {/* circular container */}
                <div
                  className="
                    relative
                    h-[220px] w-[220px] sm:h-[300px] sm:w-[300px]
                    rounded-full overflow-hidden
                    border-2 border-neon-teal/30
                    bg-black/10
                    shadow-[0_10px_40px_rgba(75,225,255,0.06)]
                    transition-transform transform-gpu hover:scale-[1.03]
                  "
                >
                  {/* map image fills the circle */}
                  <Image
                    src={MAP_IMAGE}
                    alt="Carolina location map (click to open in Google Maps)"
                    fill
                    sizes="(max-width: 640px) 220px, 300px"
                    className="object-cover object-center transition-transform duration-500"
                    priority={false}
                  />

                  {/* subtle neon overlay for glow */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    aria-hidden
                    style={{
                      background:
                        "radial-gradient(circle at 25% 25%, rgba(75,225,255,0.06), transparent 15%), radial-gradient(circle at 80% 80%, rgba(255,75,200,0.03), transparent 12%)",
                      mixBlendMode: "overlay",
                    }}
                  />

                  {/* center pin */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <span
                      className="block rounded-full bg-neon-teal"
                      style={{
                        width: 18,
                        height: 18,
                        boxShadow: "0 0 10px rgba(75,225,255,0.9), 0 0 18px rgba(75,225,255,0.45)",
                      }}
                      aria-hidden
                    />
                    <span
                      className="absolute block rounded-full bg-white"
                      style={{
                        width: 8,
                        height: 8,
                        boxShadow: "0 0 6px rgba(255,255,255,0.85)",
                      }}
                    />
                  </div>

                  {/* circular neon outline for stronger glow effect */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      boxShadow: "0 0 40px rgba(75,225,255,0.06) inset, 0 0 30px rgba(75,225,255,0.04)",
                      borderRadius: "9999px",
                    }}
                  />

                  {/* small caption under the circle (inside container) */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-xs text-neutral-100 backdrop-blur">
                    View on Google Maps
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
