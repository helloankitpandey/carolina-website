import Image from "next/image";
import Link from "next/link";
import NeonButton from "@/components/NeonButton";

const HERO_IMAGE = "/hero-image2.png";

const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Events" },
  { href: "/reservations", label: "Reservations" },
  { href: "/contact", label: "Contact" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col bg-black text-neutral-100">
      <section className="relative min-h-screen w-full overflow-y-auto bg-black">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

        {/* Absolute Carolina neon overlay for DESKTOP/TABLET */}
        <div className="pointer-events-none absolute top-[20.8%] right-[23%] hidden md:block z-10 rotate-[-8deg]">
          <div className="relative select-none text-right">
            {/* Neon "Carolina" text */}
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

            {/* Small sub-label below */}
            <div
              className="mt-0 text-[8px] absolute right-[5%] tracking-[0.2em] uppercase text-green-400"
              style={{
                textShadow: "0 0 4px rgba(74, 222, 128, 0.6), 0 0 8px rgba(74, 222, 128, 0.4)",
              }}
            >
              LUMINARY LOUNGE
            </div>

            {/* Sparks dropping from the logo - varied positions */}
            <div className="pointer-events-none absolute -bottom-2 left-0 right-0">
              {/* Left side sparks */}
              {/* <span className="neon-spark absolute left-[5%] h-1.5 w-1.5 rounded-full bg-amber-300/90" />
              <span className="neon-spark absolute left-[15%] h-1 w-1 rounded-full bg-yellow-200/90" />
              <span className="neon-spark absolute left-[25%] h-1.5 w-1.5 rounded-full bg-white/90" /> */}
              
              {/* Center sparks */}
              {/* <span className="neon-spark absolute left-[40%] h-1 w-1 rounded-full bg-amber-200/90" />
              <span className="neon-spark absolute left-[50%] h-2 w-2 -translate-x-1/2 rounded-full bg-yellow-300/90" /> */}
              
              {/* Right side sparks */}
              {/* <span className="neon-spark absolute right-[30%] h-1 w-1 rounded-full bg-white/90" />
              <span className="neon-spark absolute right-[15%] h-1.5 w-1.5 rounded-full bg-amber-300/90" />
              <span className="neon-spark absolute right-[5%] h-1 w-1 rounded-full bg-yellow-200/90" /> */}
            </div>
          </div>
        </div>

        {/* Top navigation bar */}
        <header className="relative z-20 flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-16">
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

        {/* Main hero content */}
        <div className="relative z-20 flex min-h-[calc(100vh-120px)] flex-col justify-between px-4 pb-16 pt-4 sm:px-6 sm:pb-20 md:px-8 lg:px-16 lg:pt-2">
          <div className="flex flex-1 flex-col gap-6 sm:gap-8 md:flex-row md:items-start">
            {/* Left: hook text */}
            <div className="max-w-xl pt-4 sm:pt-6 md:pt-10 lg:pt-16">
              {/* Mobile Carolina logo - simple, non-rotated */}
              <div className="mb-4 block md:hidden">
                <div className="relative select-none text-left">
                  <span
                    className="neon-flicker text-2xl font-bold tracking-[0.15em] uppercase text-white"
                    style={{
                      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                      textShadow:
                        "0 0 8px rgba(10,102,255,0.8), 0 0 18px rgba(0,255,243,0.6), 0 0 35px rgba(10,102,255,0.7)",
                    }}
                  >
                    CAROLINA
                  </span>
                  <div
                    className="mt-0 text-[7px] tracking-[0.2em] uppercase text-green-400"
                    style={{
                      textShadow: "0 0 4px rgba(74, 222, 128, 0.6), 0 0 8px rgba(74, 222, 128, 0.4)",
                    }}
                  >
                    LUMINARY LOUNGE
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.5em] text-neon-teal mb-3 sm:mb-4">
                The most
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white mb-3 sm:mb-4">
                Carolina Luminary Lounge
              </h1>
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.4em] text-neon-teal mb-4 sm:mb-6">
                NEON Luminary Lounge
              </p>
              <p className="max-w-2xl text-sm sm:text-base md:text-lg text-neutral-100/90 mb-6 sm:mb-8">
                An immersive black-label experience with cyan laser lights, bespoke cocktails, and
                curated performances that glow long after midnight.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <NeonButton
                  className="w-full border border-neon-pink/80 bg-black/40 px-8 py-3 text-sm sm:text-base font-semibold uppercase tracking-[0.4em] text-neon-pink shadow-[0_0_25px_rgba(255,75,255,0.3)] transition hover:border-neon-pink hover:bg-neon-pink/15 hover:text-white sm:w-auto"
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

          {/* Bottom: details scroll teaser bar */}
          <div className="mt-8 flex justify-center pb-4 sm:mt-6 sm:pb-0 lg:justify-start">
            <div className="flex flex-col items-center gap-2 text-sm text-neutral-100/70">
              <span className="text-xs uppercase tracking-[0.3em]">Details</span>
              <div className="h-8 w-px bg-gradient-to-b from-neon-teal/60 to-transparent animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:gap-6 text-left">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.5em] text-amber-300">
            About Us
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
            Carolina, The Luminary Lounge
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed">
            Carolina's lounge flows from espresso-lit mornings into late night neon frequencies.
            Our team curates chef residencies, kinetic soundscapes, and a service ritual infused
            with hospitality for creatives, families, and the late-night crowd alike.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em]">
            <Link className="text-neon-teal transition hover:text-white" href="/about">
              Discover Our Story →
            </Link>
            <Link className="text-neon-pink transition hover:text-white" href="/reservations">
              Plan a Visit →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
