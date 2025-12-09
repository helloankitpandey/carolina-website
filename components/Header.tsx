"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";

const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reservations", label: "Reservations" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [invert, setInvert] = useState(false);

  const neonBlue = "#00B8FF";
  const neonGreen = "#2EDC0F";
  const blueShadow = "0 0 5px #00B8FF, 0 0 15px #00B8FF, 0 0 30px #00B8FF";
  const greenShadow = "0 0 5px #2EDC0F, 0 0 15px #2EDC0F, 0 0 30px #2EDC0F";

  const navFg = invert ? neonBlue : neonGreen;
  const navHover = invert ? neonGreen : neonBlue;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--neon-green", invert ? neonBlue : neonGreen);
    root.style.setProperty("--neon-blue", invert ? neonGreen : neonBlue);
    root.style.setProperty("--neon-hover", invert ? neonGreen : neonBlue);
    root.style.setProperty("--neon-shadow-color", invert ? "rgba(0,229,255,0.65)" : "rgba(57,255,20,0.65)");
    root.style.setProperty("--neon-shadow-green", invert ? "rgba(0,229,255,0.65)" : "rgba(57,255,20,0.65)");
    root.style.setProperty("--neon-shadow-blue", invert ? "rgba(57,255,20,0.65)" : "rgba(0,229,255,0.65)");
    root.style.setProperty("--neon-text-shadow-blue", blueShadow);
    root.style.setProperty("--neon-text-shadow-green", greenShadow);
  }, [invert, neonBlue, neonGreen, blueShadow, greenShadow]);

  return (
    <header
      className="relative z-40 border-b border-white/10 bg-black/90 backdrop-blur-xl"
      style={{
        ["--nav-fg" as string]: navFg,
        ["--nav-hover" as string]: navHover,
      }}
    >
      {/* DESKTOP HEADER (unchanged) */}
      <div className="mx-auto hidden max-w-7xl items-center justify-between px-6 py-6 lg:flex">
        <Link href="/" className="flex items-center pt-2" aria-label="Carolina home">
          <div className="relative h-10 w-[195px] overflow-hidden sm:h-11 sm:w-[260px] md:h-16 md:w-[300px]">
            <Image
              src="/carolina%20logo%20.png"
              alt="Carolina · The Luminary Lounge"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 195px, (max-width: 1024px) 260px, 300px"
              priority
            />
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-8 text-sm font-medium text-neutral-100/80">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[var(--nav-hover)]"
                style={{ color: "var(--nav-fg)" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setInvert((v) => !v)}
            className="group relative overflow-hidden rounded-full border border-white/15 bg-black/40 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:border-[var(--nav-hover)] hover:text-[var(--nav-hover)]"
            style={{ color: "var(--nav-fg)", boxShadow: "0 0 12px rgba(0,0,0,0.45)" }}
            aria-label="Invert neon colors"
          >
            <span className="absolute inset-0 opacity-70 blur-md transition duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,255,200,0.15), transparent 60%)" }} />
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="h-4 w-4 drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]" />
              Invert
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE HEADER */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:hidden">
        {/* Hamburger LEFT */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open Menu"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-black/40"
        >
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* CAROLINA (right) */}
        <Link href="/" className="flex items-center pt-2" aria-label="Carolina home">
          <div className="relative h-9 w-[170px] overflow-hidden sm:h-10 sm:w-[190px]">
            <Image
              src="/carolina%20logo%20.png"
              alt="Carolina · The Luminary Lounge"
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 170px, 190px"
              priority
            />
          </div>
        </Link>
        <button
          type="button"
          onClick={() => setInvert((v) => !v)}
          className="ml-3 group relative overflow-hidden rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:border-[var(--nav-hover)] hover:text-[var(--nav-hover)]"
          style={{ color: "var(--nav-fg)", boxShadow: "0 0 10px rgba(0,0,0,0.4)" }}
          aria-label="Invert neon colors"
        >
          <span className="absolute inset-0 opacity-70 blur-md transition duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,255,200,0.15), transparent 60%)" }} />
          <span className="relative z-10 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]" />
            Invert
          </span>
        </button>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 z-50 transition ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* BACKDROP */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* SIDEBAR PANEL */}
        <aside
          className={`
            absolute left-0 top-0 h-full w-72 transform transition-transform
            ${open ? "translate-x-0" : "-translate-x-full"} 
            bg-gradient-to-b from-black via-[#001a33] to-black
            border-r border-white/10
            shadow-[0_0_30px_rgba(0,140,255,0.3)]
            backdrop-blur-xl
            flex flex-col justify-between
             bg-black/70 
          `}
        >
          {/* TOP Section */}
          <div className=" bg-black/90 ">
            {/* Header Row */}
            <div className="flex items-center justify-between p-4">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                Menu
              </span>

              <button
                onClick={() => setOpen(false)}
                className="text-neutral-300 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="mt-4 flex flex-col gap-4 px-6  bg-black/90 ">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-base tracking-wide transition-colors hover:text-[var(--nav-hover)]"
                  style={{ color: "var(--nav-fg)" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* BOTTOM CTA BUTTON */}
          <div className="p-6  bg-black/90">
            <Link
              href="/reservations"
              onClick={() => setOpen(false)}
              className="
                block w-full rounded-full 
                bg-gradient-to-r from-blue-600 to-emerald-400
                text-black text-center font-semibold py-3
                shadow-[0_0_20px_rgba(0,255,200,0.2)]
                active:scale-95 transition
              "
            >
              Reserve a table
            </Link>
          </div>
        </aside>
      </div>
    </header>
  );
}
