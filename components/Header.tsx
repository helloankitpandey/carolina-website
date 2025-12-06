"use client";

import { useState } from "react";
import Link from "next/link";

const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Events" },
  { href: "/reservations", label: "Reservations" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-40 border-b border-white/10 bg-black/90 backdrop-blur-xl">
      {/* DESKTOP HEADER (unchanged) */}
      <div className="mx-auto hidden max-w-7xl items-center justify-between px-6 py-6 lg:flex">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.38em] text-neon-teal drop-shadow-[0_0_6px_rgba(0,255,255,0.4)]"
        >
          Carolina · The Luminary Lounge
        </Link>

        <nav className="flex items-center gap-8 text-sm font-medium text-neutral-100/80">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-neon-teal hover:drop-shadow-[0_0_8px_rgba(75,225,255,0.6)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
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
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-[0.35em] text-neon-teal drop-shadow-[0_0_6px_rgba(0,255,255,0.4)]"
        >
          CAROLINA
        </Link>
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
                  className="text-white text-base tracking-wide"
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
