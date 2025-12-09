"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NeonButton from "@/components/NeonButton";
import CarolinaGallery from "@/components/Gallery";
import Atmosphere from "@/components/atmosphere";
import Location from "@/components/location";

const HERO_IMAGE = "/hero-image.png";

const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reservations", label: "Reservations" },
  { href: "/contact", label: "Contact" },
];

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-black text-neutral-100">
      <section className="relative w-full overflow-hidden bg-black">
        {/* Shared Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-100"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          aria-hidden
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/95" />

        {/* ---------------------------
            MOBILE / TABLET TOP NAV (keeps responsive behavior)
            visible on small screens (sm:hidden for mobile hamburger)
           --------------------------- */}
        <header className="relative z-30 px-4 py-3 sm:px-6 lg:px-16">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            {/* <Link href="/" className="flex items-center gap-3 lg:hidden">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-emerald-300 shadow-[0_8px_30px_rgba(10,102,255,0.12)]" />
              <span className="hidden font-semibold text-white sm:block">Carolina</span>
            </Link> */}

            <div className="mb-4 block md:hidden">
                <div className="relative select-none text-left">
                  <span
                    className="neon-flicker text-2xl font-bold tracking-[0.12em] uppercase text-white"
                    style={{
                      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                      textShadow: "0 0 8px rgba(10,102,255,0.8), 0 0 18px rgba(0,255,243,0.6)",
                    }}
                  >
                    CAROLINA
                  </span>
                  <div className="mt-0 text-[8px] tracking-[0.18em] uppercase text-green-400" style={{ textShadow: "0 0 4px rgba(74,222,128,0.5)" }}>
                    LUMINARY LOUNGE
                  </div>
                </div>
              </div>

            {/* Desktop nav kept hidden here (we will render the original laptop header below for lg) */}
            <nav className="hidden items-center gap-6 text-xs sm:flex sm:text-sm text-neutral-100/80 lg:hidden">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-2 transition-colors hover:text-neon-teal hover:drop-shadow-[0_0_8px_rgba(75,225,255,0.6)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right: reserve button + hamburger on mobile */}
            <div className="flex items-center gap-3">
              <Link
                href="/reservations"
                className="hidden rounded-full bg-gradient-to-r from-blue-600 to-emerald-400 px-3 py-1 text-black text-sm font-semibold sm:inline-flex lg:hidden"
              >
                Reserve
              </Link>

              {/* hamburger */}
              <button
                aria-label="Open menu"
                aria-expanded={drawerOpen}
                onClick={() => setDrawerOpen((s) => !s)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-black/20 border border-white/6 sm:hidden"
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* ---------------------------
            LAPTOP HEADER (original style) — show only on lg (desktop)
            This is the navigation you supplied; visible for large screens only
           --------------------------- */}
        <header className="hidden lg:flex relative z-20 flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-16">
          <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-neon-teal drop-shadow-[0_0_8px_rgba(75,225,255,0.5)]">
            CAROLINA · THE LUMINARY LOUNGE
          </span>
          <nav className="flex flex-col gap-3 sm:flex-row sm:gap-6 md:gap-8 text-xs sm:text-sm font-medium text-neutral-100/80">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                className="py-2 transition-colors hover:text-neon-teal hover:drop-shadow-[0_0_8px_rgba(75,225,255,0.6)] sm:py-0"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        {/* Drawer overlay (mobile) */}
        <div
          className={`fixed inset-0 z-40 transition-opacity ${drawerOpen ? "pointer-events-auto" : "pointer-events-none"}`}
          aria-hidden={!drawerOpen}
        >
          <div
            className={`absolute inset-0 bg-black/60 transition-opacity ${drawerOpen ? "opacity-100" : "opacity-0"}`}
            onClick={() => setDrawerOpen(false)}
          />
          <aside
            className={`absolute left-0 top-0 h-full w-72 transform bg-black/95 backdrop-blur-md border-r border-white/8 transition-transform ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
            role="dialog"
            aria-modal="true"
          >
            <div className="p-4">
              <div className="mb-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2" onClick={() => setDrawerOpen(false)}>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-emerald-300" />
                  <span className="font-semibold text-white">Carolina</span>
                </Link>
                <button onClick={() => setDrawerOpen(false)} aria-label="Close menu" className="text-neutral-300">✕</button>
              </div>

              <ul className="space-y-3">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      className="block rounded-md px-2 py-2 text-sm text-neutral-100 hover:bg-white/5"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Link
                  href="/reservations"
                  onClick={() => setDrawerOpen(false)}
                  className="block w-full rounded-full bg-gradient-to-r from-blue-600 to-emerald-400 px-4 py-2 text-black font-semibold text-center"
                >
                  Reserve a table
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* ===========================
            HERO - Mobile/Tablet Variant (shown on lg:hidden)
            =========================== */}
        <div className="lg:hidden relative z-20 flex min-h-[calc(100vh-64px)] flex-col justify-between px-4 pb-12 pt-6 sm:pb-20 sm:pt-8 md:px-8 lg:px-16">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 sm:gap-8 md:flex-row md:items-start">
            <div className="w-full pb-10 max-w-xl pt-8 sm:pt-6 md:pt-10 lg:pt-14">
              {/* <div className="mb-4 block md:hidden">
                <div className="relative select-none text-left">
                  <span
                    className="neon-flicker text-2xl font-bold tracking-[0.12em] uppercase text-white"
                    style={{
                      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                      textShadow: "0 0 8px rgba(10,102,255,0.8), 0 0 18px rgba(0,255,243,0.6)",
                    }}
                  >
                    CAROLINA
                  </span>
                  <div className="mt-0 text-[8px] tracking-[0.18em] uppercase text-green-400" style={{ textShadow: "0 0 4px rgba(74,222,128,0.5)" }}>
                    LUMINARY LOUNGE
                  </div>
                </div>
              </div> */}

              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.45em] text-green-500 mb-2 sm:mb-3">
                The most
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold leading-tight mb-3 sm:mb-4">
                <span style={{ color: "#fff", textShadow: "0 0 10px rgba(75,225,255,0.75), 0 0 25px rgba(255,75,255,0.18)" }}>
                  Carolina Luminary Lounge
                </span>
              </h1>

              {/* <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.36em] text-neon-teal mb-3 sm:mb-4">
                NEON Luminary Lounge
              </p> */}

              <p className="max-w-2xl text-sm sm:text-base md:text-lg text-neutral-100/90 mb-4 sm:mb-6">
                An immersive black-label experience with cyan laser lights, bespoke cocktails, and curated
                performances that glow long after midnight.
              </p>

              {/* <div className="flex w-full flex-col pb-4 pt-20 gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <NeonButton
                  className="w-full border border-neon-pink/80 bg-black/40 px-6 py-3 text-sm sm:text-base font-semibold uppercase tracking-[0.32em] text-neon-pink shadow-[0_0_25px_rgba(255,75,255,0.22)] transition hover:border-neon-pink hover:bg-neon-pink/15 hover:text-white sm:w-auto"
                  href="/menu"
                >
                  View Menu
                </NeonButton>

                <NeonButton
                  className="w-full border border-neon-teal/80 bg-black/40 px-6 py-3 text-sm sm:text-base font-semibold uppercase tracking-[0.32em] text-neon-teal shadow-[0_0_25px_rgba(75,225,255,0.22)] transition hover:border-neon-teal hover:bg-neon-teal/15 hover:text-white sm:w-auto"
                  href="/reservations"
                >
                  Reserve Table
                </NeonButton>
              </div> */}
            </div>
          </div>

          <div className="flex w-full flex-col mt-20 pt-20 gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <NeonButton
              className="w-full
                              border border-green-500
                              bg-black/40
                              px-8 py-3
                              text-sm sm:text-base
                              font-semibold uppercase
                              tracking-[0.4em]
                              text-green-400
                              shadow-[0_0_25px_rgba(92,255,181,0.25)]
                              transition
                              hover:border-green-400
                              hover:bg-green-400/10
                              hover:text-white
                              hover:shadow-[0_0_35px_rgba(92,255,181,0.45)]
                              sm:w-auto"
              href="/menu"
            >
              View Menu
            </NeonButton>

            <NeonButton
              className="w-full border border-neon-teal/80 bg-black/40 px-6 py-3 text-sm sm:text-base font-semibold uppercase tracking-[0.32em] text-neon-teal shadow-[0_0_25px_rgba(75,225,255,0.22)] transition hover:border-neon-teal hover:bg-neon-teal/15 hover:text-white sm:w-auto"
              href="/reservations"
            >
              Reserve Table
            </NeonButton>
          </div>

          <div className="mt-8 flex justify-center pb-4 sm:mt-6 sm:pb-0">
            <div className="flex flex-col items-center gap-2 text-sm text-neutral-100/70">
              <span className="text-lg uppercase tracking-[0.28em]">Details</span>
              <div className="h-8 w-px bg-gradient-to-b from-neon-teal/60 to-transparent animate-pulse" />
            </div>
          </div>
        </div>

        {/* ===========================
            HERO - Laptop/Desktop Variant (original layout + original laptop nav preserved)
            shown only at lg and up
            =========================== */}
        <div className="hidden lg:block">
          <div className="relative z-20 flex min-h-[calc(100vh-120px)] flex-col justify-between px-4 pb-16 pt-4 sm:px-6 sm:pb-20 md:px-8 lg:px-16 lg:pt-2">
            <div className="flex flex-1 flex-col gap-6 sm:gap-8 md:flex-row md:items-start">
              <div className="max-w-xl pl-6 pt-4 sm:pt-6 md:pt-10 lg:pt-16">
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.5em] text-green-500 mb-3 sm:mb-4">
                  The most
                </p>

                <h1 className="retro-neon-flicker text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-3 sm:mb-4">
                  <span
                    style={{
                      color: "#ffffff",
                      textShadow:
                        "0 0 10px rgba(75, 225, 255, 0.8), 0 0 20px rgba(75, 225, 255, 0.6), 0 0 30px rgba(95, 125, 255, 0.5), 0 0 40px rgba(255, 75, 255, 0.3)",
                    }}
                  >
                    Carolina Luminary Lounge
                  </span>
                </h1>

                {/* <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.4em] text-neon-teal mb-4 sm:mb-6">
                  NEON Luminary Lounge
                </p> */}

                <p className="max-w-2xl text-sm sm:text-base md:text-lg text-neutral-100/90 mb-6 sm:mb-8">
                  An immersive black-label experience with cyan laser lights, bespoke cocktails, and
                  curated performances that glow long after midnight.
                </p>

                <div className="flex flex-col gap-3 pb-4 pt-20 sm:flex-row sm:flex-wrap sm:gap-4">
                  <NeonButton
                    className="w-full
                              border border-green-500
                              bg-black/40
                              px-8 py-3
                              text-sm sm:text-base
                              font-semibold uppercase
                              tracking-[0.4em]
                              text-green-400
                              shadow-[0_0_25px_rgba(92,255,181,0.25)]
                              transition
                              hover:border-green-400
                              hover:bg-green-400/10
                              hover:text-white
                              hover:shadow-[0_0_35px_rgba(92,255,181,0.45)]
                              sm:w-auto "
                    href="/menu"
                  >
                    View Menu
                  </NeonButton>
                  <NeonButton
                    className="w-full border border-neon-teal/80 bg-black/40 px-8 py-3 text-sm sm:text-base font-semibold uppercase tracking-[0.4em] text-neon-teal shadow-[0_0_25px_rgba(75,225,255,0.3)] transition hover:border-neon-teal hover:bg-neon-teal/15 hover:text-white sm:w-auto"
                    href="/reservations"
                  >
                    Reserve Table
                  </NeonButton>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center pb-4 sm:mt-6 sm:pb-0">
            <div className="flex flex-col items-center gap-2 text-sm text-neutral-100/70">
              <span className="text-lg uppercase tracking-[0.28em]">Details</span>
              <div className="h-8 w-px bg-gradient-to-b from-neon-teal/60 to-transparent animate-pulse" />
            </div>
          </div>

            {/* Desktop neon overlay / decorative element — replicates original absolute overlay */}
            <div className="lg:hidden pointer-events-none absolute top-[20.8%] right-[23%] hidden md:block z-10 rotate-[-8deg]">
              <div className="relative select-none text-right">
                <span
                  className="neon-flicker text-3xl font-bold tracking-[0.15em] uppercase text-white sm:text-4xl lg:text-3xl"
                  style={{
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                    textShadow:
                      "0 0 8px rgba(10,102,255,0.8), 0 0 18px rgba(0,255,243,0.6), 0 0 35px rgba(10,102,255,0.7)",
                  }}
                >
                  CAROLINA
                </span>

                <div
                  className="mt-0 text-[8px] absolute right-[5%] tracking-[0.2em] uppercase text-green-400"
                  style={{
                    textShadow: "0 0 4px rgba(74, 222, 128, 0.6), 0 0 8px rgba(74, 222, 128, 0.4)",
                  }}
                >
                  LUMINARY LOUNGE
                </div>

                <div className="pointer-events-none absolute -bottom-2 left-0 right-0">
                  {/* decorative sparks (kept commented/disabled for perf) */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Cards */}
      {/* <section className="border-b border-white/5 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.5em] text-neon-teal sm:text-xs">
            Our Philosophy
          </p>
          <h2 className="mb-8 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
            Experience Carolina
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Signature Neon Cocktails",
                desc: "Expertly crafted mixology with luminescent twists",
                image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80",
              },
              {
                title: "Rooftop City Views",
                desc: "Panoramic Jaipur skyline from our elevated deck",
                image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
              },
              {
                title: "Live DJ & Performances",
                desc: "Curated beats and kinetic soundscapes nightly",
                image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
              },
              {
                title: "Private Cabanas & Events",
                desc: "Exclusive spaces for intimate gatherings",
                image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group fade-up overflow-hidden rounded-lg border border-neon-teal/30 bg-black/40 transition-all hover:scale-[1.03] hover:border-neon-teal/60 hover:shadow-[0_0_25px_rgba(75,225,255,0.18)]"
              >
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-base font-semibold text-white sm:text-lg">{item.title}</h3>
                  <p className="text-sm text-neutral-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Featured Dishes */}
      <section className="border-b border-white/5 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.5em] text-green-400 sm:text-xs">
            Featured Dishes
          </p>
          <h2 className="mb-8 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">Signature Offerings</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Midnight Mocha",
                desc: "Espresso, dark chocolate, smoked vanilla cream",
                price: "From ₹450",
                image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80",
              },
              {
                name: "Luminary Tonic",
                desc: "Botanical gin, yuzu cordial, tonic mist",
                price: "From ₹650",
                image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80",
              },
              {
                name: "Stargazer Tart",
                desc: "Citrus curd, candied hibiscus, sable crust",
                price: "From ₹550",
                image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80",
              },
              {
                name: "Neon Negroni",
                desc: "Classic with a luminescent twist",
                price: "From ₹600",
                image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
              },
              {
                name: "Rooftop Risotto",
                desc: "Saffron-infused with seasonal vegetables",
                price: "From ₹750",
                image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
              },
              {
                name: "Lounge Charcuterie",
                desc: "Artisanal selection with neon accompaniments",
                price: "From ₹950",
                image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group fade-up overflow-hidden rounded-lg border border-green-500 bg-black/40 transition-all hover:scale-[1.02] hover:border-green-400
    hover:bg-green-400/10
    hover:text-white
    hover:shadow-[0_0_35px_rgba(92,255,181,0.45)]"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>
                <div className="p-4">
                  <div className="mb-1 flex items-start justify-between">
                    <h3 className="text-base font-semibold text-green-400 sm:text-lg">{item.name}</h3>
                    <span className="text-xs text-neutral-500">{item.price}</span>
                  </div>
                  <p className="text-sm text-neutral-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link className="inline-block text-sm font-semibold uppercase tracking-[0.3em] text-green-400 transition hover:text-white sm:text-base" href="/menu">
              View Full Menu →
            </Link>
          </div>
        </div>
      </section>


      <CarolinaGallery />


      {/* Events & Private Gatherings */}
      <section className="border-b border-white/5 text-left px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto text-left grid max-w-5xl gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-2 text-left text-[10px] font-semibold uppercase tracking-[0.5em] text-green-400 sm:text-xs">Events</p>
            <h2 className="mb-4 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">Events & Private Gatherings</h2>
            <p className="mb-6 text-sm text-neutral-300 sm:text-base">Transform Carolina into your private venue. From intimate birthday celebrations to corporate gatherings and exclusive takeovers, our rooftop space adapts to your vision with bespoke service and curated experiences.</p>
            <Link className="inline-block text-sm font-semibold uppercase tracking-[0.3em] text-green-400 transition hover:text-white sm:text-base" href="/events">Host an Event →</Link>
          </div>

          <div className="relative h-48 overflow-hidden rounded-lg border border-neon-pink/20 bg-gradient-to-br from-neon-pink/5 via-transparent to-neon-teal/5 sm:h-64">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <img
                    src="/decoration/Carolina Evening Dining Reservation.webp"
                    alt="Carolina Private Events"
                    className="h-full w-full object-cover opacity-80"
                  />

                  {/* Dark overlay for neon look */}
                  <div className="absolute inset-0 bg-black/40" />

                  {/* Text overlay (optional, can remove if you want ONLY image) */}
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white drop-shadow-[0_0_6px_rgba(255,75,255,0.6)]">
                      Private Events
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      

      

      {/* Reviews */}
      <section className="border-b border-white/5 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.5em] text-neon-green sm:text-xs">Reviews</p>
          <h2 className="mb-4 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">Loved by guests across Jaipur</h2>

          <div className="mb-8 grid gap-6 sm:grid-cols-3">
            {[
              { name: "Priya M.", review: "The neon ambiance and rooftop views are absolutely stunning. Best cocktails in Jaipur!", rating: 5 },
              { name: "Rahul K.", review: "Perfect spot for a date night. The DJ sets and private cabanas made our evening unforgettable.", rating: 5 },
              { name: "Anjali S.", review: "Carolina exceeded all expectations. The food, drinks, and service are top-tier. Will definitely return!", rating: 5 },
            ].map((item, idx) => (
              <div key={idx} className="fade-up rounded-lg border border-green-400/20 bg-black/40 p-6 transition-all hover:border-green-400/40 hover:shadow-[0_0_15px_rgba(74,222,128,0.16)]">
                <div className="mb-3 flex gap-1">{[...Array(item.rating)].map((_, i) => (<span key={i} className="text-green-400">★</span>))}</div>
                <p className="mb-4 text-sm text-neutral-300 sm:text-base">"{item.review}"</p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-400 sm:text-sm">{item.name}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-500 sm:text-sm">
            <span>Featured in</span>
            <span className="px-3 py-1 border border-white/10 rounded">Times Food</span>
            <span className="px-3 py-1 border border-white/10 rounded">Zomato</span>
            <span className="px-3 py-1 border border-white/10 rounded">Jaipur Times</span>
          </div>
        </div>
      </section>


      {/* Visual Experience - Horizontal Gallery Strip
      <section className="border-b border-white/5 bg-black px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.5em] text-neon-teal sm:text-xs">Visual Experience</p>
          <h2 className="mb-8 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">The Carolina Atmosphere</h2>

          <div className="flex gap-4 overflow-x-auto pb-4 sm:gap-6 scrollbar-hide">
            {[
              { caption: "Rooftop Deck", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80" },
              { caption: "Neon Bar", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80" },
              { caption: "Lounge Seating", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80" },
              { caption: "City Views", image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80" },
              { caption: "Evening Ambiance", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80" },
              { caption: "Signature Cocktails", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80" },
              { caption: "Live Performances", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80" },
            ].map((item, idx) => (
              <div key={idx} className="group relative flex-shrink-0 w-64 sm:w-80 overflow-hidden rounded-lg border border-neon-teal/20 transition-all hover:border-neon-teal/50 hover:shadow-[0_0_20px_rgba(75,225,255,0.12)]">
                <div className="relative h-64 w-64 sm:h-80 sm:w-80">
                  <Image src={item.image} alt={item.caption} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 640px) 256px, 320px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 text-center transition-transform group-hover:translate-y-0">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">{item.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <Atmosphere />

      {/* About Us */}
      <section className="border-t border-white/5 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.5em] text-amber-300 mb-2">
            About Us
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4">
            Carolina, The Luminary Lounge
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed mb-4">
            Carolina's lounge flows from espresso-lit mornings into late-night neon frequencies. Our team curates
            chef residencies, kinetic soundscapes, and a service ritual infused with hospitality for creatives,
            families, and the late-night crowd alike.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.28em]">
            <Link className="text-neon-teal transition hover:text-white" href="/about">
              Discover Our Story →
            </Link>
            <Link className="text-green-400 transition hover:text-white" href="/reservations">
              Plan a Visit →
            </Link>
          </div>
        </div>
      </section>


      {/* Promo band */}
      <section className="px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_0_40px_rgba(0,200,255,0.06)] px-6 py-8">
          <div className="relative flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.6em] text-emerald-300">Seasonal Highlight</p>
              <p className="mt-2 text-sm sm:text-base md:text-lg text-white/90">This Month at Carolina: Exclusive DJ residency with curated tasting menus</p>
            </div>

            <a href="/events" className="inline-flex items-center justify-center rounded-full border border-emerald-400/50 bg-black/30 px-6 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300 hover:border-emerald-400 hover:bg-emerald-400/10 transition shadow-[0_0_12px_rgba(0,255,180,0.2)]">
              View Events →
            </a>
          </div>
        </div>
      </section>

      {/* Location */}
      {/* <section className="border-b border-white/5 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.5em] text-neon-teal sm:text-xs">Location</p>
              <h2 className="mb-6 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">Find Carolina</h2>
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
                <a className="rounded-full border border-neon-teal/60 bg-black/40 px-6 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.3em] text-neon-teal transition hover:border-neon-teal hover:bg-neon-teal/10 sm:text-sm" href="https://maps.google.com/?q=Carolina+Luminary+Lounge+Jaipur" target="_blank" rel="noopener noreferrer">Open in Maps</a>
                <a className="rounded-full border border-green-500 bg-black/40 px-6 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.3em] text-green-400 shadow-[0_0_25px_rgba(92,255,181,0.25)]
                              transition
                              hover:border-green-400
                              hover:bg-green-400/10
                              hover:text-white
                              hover:shadow-[0_0_35px_rgba(92,255,181,0.45)]  sm:text-sm" href="tel:+911234567890">Call Us</a>
              </div>         
            </div>

            <div className="flex items-center justify-center">
              <div className="relative h-[220px] w-[220px] sm:h-[300px] sm:w-[300px]">
                <div className="relative h-full w-full rounded-full border-2 border-neon-teal/40" style={{ background: "radial-gradient(circle, rgba(5,5,5,0.9) 0%, rgba(0,0,0,1) 100%)", boxShadow: "inset 0 0 30px rgba(75,225,255,0.06), 0 0 30px rgba(75,225,255,0.12)" }}>
                  <div className="radar-sweep absolute inset-0 rounded-full" style={{ background: "conic-gradient(from 0deg, transparent 0deg, rgba(75,225,255,0.06) 40deg, transparent 80deg)" }} />
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 260 260" aria-hidden>
                    <line x1="130" y1="20" x2="130" y2="240" stroke="rgba(75,225,255,0.18)" strokeWidth="1.3" />
                    <line x1="20" y1="130" x2="240" y2="130" stroke="rgba(75,225,255,0.18)" strokeWidth="1.3" />
                    <line x1="50" y1="50" x2="210" y2="210" stroke="rgba(75,225,255,0.12)" strokeWidth="0.9" />
                    <line x1="210" y1="50" x2="50" y2="210" stroke="rgba(75,225,255,0.12)" strokeWidth="0.9" />
                  </svg>

                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="h-4 w-4 rounded-full bg-neon-teal" style={{ boxShadow: "0 0 10px rgba(75,225,255,0.8), 0 0 20px rgba(75,225,255,0.4)" }} />
                    <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" style={{ boxShadow: "0 0 6px rgba(255,255,255,0.8)" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section> */}

      <Location />

      {/* CTA Footer */}
      <section className="border-t border-neon-teal/20 bg-black px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">Ready for your night at Carolina?</h2>
          <p className="mb-8 text-sm text-neutral-400 sm:text-base">Reserve your table and experience Jaipur's most luminous rooftop lounge.</p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <NeonButton className="w-full rounded-full border border-neon-teal/60 bg-black/40 px-10 py-3 text-center text-sm font-semibold uppercase tracking-[0.32em] text-neon-teal transition hover:border-neon-teal hover:bg-neon-teal/10 hover:text-white sm:w-auto" href="/reservations">
              Reserve a Table
            </NeonButton>

            <Link className=" w-full rounded-full
    border border-green-500
    bg-black/40
    px-8 py-3
    text-sm sm:text-base
    font-semibold uppercase
    tracking-[0.4em]
    text-green-400
    shadow-[0_0_25px_rgba(92,255,181,0.25)]
    transition
    hover:border-green-400
    hover:bg-green-400/10
    hover:text-white
    hover:shadow-[0_0_35px_rgba(92,255,181,0.45)]
    sm:w-auto" href="/menu">
              View Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

