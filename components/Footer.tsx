import Link from "next/link";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/private-hire", label: "Services" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

const socialIcons = ["IG", "TT", "YT"];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-black/30 bg-[#050505] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(79,209,197,0.15), transparent 45%), radial-gradient(circle at 80% 0%, rgba(255,75,255,0.12), transparent 40%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.08), transparent 35%)",
        }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
        <div className="h-0.5 w-full rounded-full bg-gradient-to-r from-neon-teal via-neon-blue to-neon-pink shadow-[0_0_25px_rgba(95,125,255,0.6)]" />

        <div className="grid gap-10 text-sm md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-4">
            <p className="text-4xl font-semibold italic tracking-tight text-neon-teal drop-shadow-[0_0_20px_rgba(75,225,255,0.7)]">
              Carolina
            </p>
            <p className="text-sm uppercase tracking-[0.4em] text-white/70">The Luminary Lounge</p>
            <div className="space-y-1 text-sm text-white/70">
              <p>123 Aurora Lane, Neon District, NC</p>
              <p>reservations@carolina-lounge.com</p>
              <p>+1 (919) 555-0470</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.5em] text-amber-300 drop-shadow-[0_0_15px_rgba(255,193,7,0.6)]">
              Explore
            </p>
            <ul className="mt-4 space-y-3 text-base font-semibold uppercase tracking-[0.4em] text-neon-teal">
              {exploreLinks.map((link) => (
                <li className="flex items-center gap-2" key={link.label}>
                  <span className="h-1.5 w-1.5 rounded-full bg-neon-teal shadow-[0_0_10px_rgba(75,225,255,0.7)]" />
                  <Link className="hover:text-white" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.5em] text-white/80">Follow Us</p>
            <div className="flex gap-4">
              {socialIcons.map((icon) => (
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neon-teal/70 text-xs font-semibold uppercase tracking-[0.2em] text-neon-teal shadow-[0_0_20px_rgba(75,225,255,0.5)]"
                  key={icon}
                >
                  {icon}
                </span>
              ))}
            </div>
            <p className="text-sm text-white/70">
              Exclusive mixes, behind-the-scenes, and late-night drops from Carolina’s creative
              collective.
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-4 text-xs text-white/60">
          © {new Date().getFullYear()} Carolina, The Luminary Lounge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

