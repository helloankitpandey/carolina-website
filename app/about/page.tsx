"use client";

import { useState } from "react";

const GALLERY = [
  "https://b.zmtcdn.com/data/pictures/9/21244629/c302f88c254c97d508227512be728ffc.jpeg",
  "https://b.zmtcdn.com/data/pictures/9/21244629/2fd56b0654d7ed67eaf38657d9c1faff.jpeg",
  "https://tse3.mm.bing.net/th/id/OIP.-KjsKYIobtEGTMahh3NPYgHaEh?rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://tse4.mm.bing.net/th/id/OIP.2L5YcnzZTI9tZyNGF0BM-QHaEE?rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://tse1.mm.bing.net/th/id/OIP.ctGm3PBiIZilO_ZsfrnJJgHaEE?rs=1&pid=ImgDetMain&o=7&rm=3",
];

export default function AboutPage() {
  const [index, setIndex] = useState(0);

  function prev() {
    setIndex((i) => (i - 1 + GALLERY.length) % GALLERY.length);
  }
  function next() {
    setIndex((i) => (i + 1) % GALLERY.length);
  }

  return (
    <main className="relative px-4 sm:px-6 md:px-10 pb-20 max-w-6xl mx-auto">

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 h-[260px] w-[260px] rounded-full bg-blue-600/18 blur-3xl" />
        <div className="absolute -right-24 bottom-6 h-[220px] w-[220px] rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <section className="pt-12 text-center">
        <p className="text-xs text-emerald-300 tracking-wider uppercase">About</p>
        <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Carolina — The Luminary Lounge
        </h1>
        <p className="mt-3 max-w-3xl mx-auto text-neutral-300">
          A house of seasonal flavors, considered hospitality, and a creative team inspired by local growers.
          We blend bold techniques with quiet respect for ingredients.
        </p>
      </section>

      <section className="mt-10 grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-white">Our Philosophy</h2>
          <p className="mt-3 text-neutral-300 leading-relaxed">
            At Carolina we design menus that change with the seasons, highlight local producers, and reward
            curiosity. Every dish is a conversation between technique, terroir, and hospitality — served with
            warmth and precision.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-neutral-300">
            <li className="flex items-start gap-3">
              <span className="text-emerald-300">●</span>
              <span><strong>Seasonal sourcing</strong> — menus rotate to match the harvest.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-300">●</span>
              <span><strong>Thoughtful hospitality</strong> — detail and comfort guide service.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-300">●</span>
              <span><strong>Community partnerships</strong> — we work with growers and artisans.</span>
            </li>
          </ul>

          <div className="mt-6">
            <a
              href="/reservations"
              className="inline-block rounded-full bg-gradient-to-r from-blue-600 to-emerald-400 px-6 py-2 text-black font-semibold shadow-[0_8px_30px_rgba(10,102,255,0.12)]"
            >
              Reserve a Table
            </a>
            <a
              href="/events"
              className="ml-4 inline-block rounded-full border border-white/10 px-5 py-2 text-sm text-white/90 hover:border-emerald-300"
            >
              Plan an Event
            </a>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/8 bg-black/30 backdrop-blur-md p-0">
          <img
            src="https://media.istockphoto.com/photos/indian-chefs-cooking-in-a-professional-kitchen-of-a-gourmet-picture-id1131395624?k=20&m=1131395624&s=612x612&w=0&h=JIv_Rh6HYK2tYcElnagUHkImVPm636xT7eOaUMhc-eU="
            alt="Head chef portrait"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-3 items-start">
        <div className="md:col-span-2 rounded-2xl border border-white/8 bg-black/30 p-6 backdrop-blur-md">
          <h3 className="text-xl font-semibold text-white">Meet the Chef — Asha Navarro</h3>
          <p className="text-neutral-300 mt-2 leading-relaxed">
            Chef Asha’s cuisine is rooted in local ingredients and global technique. Trained in Barcelona and Tokyo,
            Asha returned to the region to build a kitchen that celebrates farmers, sea, and seasonality. Her menu
            balances clarity, texture, and boldness.
          </p>

          <blockquote className="mt-4 border-l-2 border-emerald-300 pl-4 text-neutral-200 italic">
            "Food is a story — our job is to make it unforgettable."
          </blockquote>

          <div className="mt-5 flex items-center gap-4">
            <a className="text-sm text-emerald-300" href="#" aria-label="Chef Instagram">IG</a>
            <a className="text-sm text-blue-300" href="#" aria-label="Chef Twitter">TT</a>
            <a className="text-sm text-pink-300" href="#" aria-label="Chef YouTube">YT</a>
          </div>
        </div>

        <aside className="rounded-2xl border border-white/8 bg-black/30 p-4 backdrop-blur-md">
          <h4 className="text-sm text-emerald-300 font-semibold">Quick Facts</h4>
          <ul className="mt-3 text-sm text-neutral-300 space-y-2">
            <li><strong>Founded</strong> — 2019</li>
            <li><strong>Seating</strong> — 60 indoor • 28 private</li>
            <li><strong>Style</strong> — Seasonal Tasting & À la carte</li>
          </ul>
        </aside>
      </section>

      <section className="mt-12">
        <h3 className="text-xl font-semibold text-white">Sourcing & Sustainability</h3>
        <p className="text-neutral-300 mt-2 max-w-3xl leading-relaxed">
          We prioritize suppliers who practice regenerative agriculture, humane animal husbandry, and responsible
          fishing. Our relationships with growers ensure freshness and foster fair pricing for producers.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">

          {[
            {
              name: "Kisan Farms",
              note: "Seasonal vegetables & herbs",
              img: "https://th.bing.com/th/id/R.e32f7c996e99c1707c44321dd81d4ac1?rik=51fdW8HMqCqDAg&riu=http%3a%2f%2fmedia3.popsugar-assets.com%2ffiles%2f2015%2f01%2f23%2f103%2fn%2f4852708%2fab2f2391a35850cc_shutterstock_145891655pUDqYU.xxxlarge_2x%2fi%2fSeasonal-Vegetables.jpg&ehk=M%2bvIu2lg773SRJ3v5zIr9S1hWZq%2b6UW1cazd5FdgwnI%3d&risl=&pid=ImgRaw&r=0",
            },
            {
              name: "Organic Harvest Farm",
              note: "Freshly sourced organic greens",
              img: "https://i0.wp.com/valleybusinessreport.com/wp-content/uploads/2018/01/Organic_Harvest.jpg?w=3000&ssl=1",
            },
            {
              name: "Hearth Bakery",
              note: "House-made breads & pastries",
              img: "https://c8.alamy.com/comp/2F77N16/france-paris-bakery-house-marques-pastries-and-breads-2F77N16.jpg",
            },
          ].map((farm) => (
            <div key={farm.name} className="rounded-xl overflow-hidden border border-white/6 bg-black/20">
              <div className="h-40 w-full overflow-hidden">
                <img src={farm.img} alt={farm.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-white">{farm.name}</h4>
                <p className="text-sm text-neutral-300 mt-1">{farm.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h3 className="text-xl font-semibold text-white">Milestones</h3>
        <ol className="mt-4 border-l border-white/8 pl-4 space-y-6 text-neutral-300">
          <li>
            <div className="text-sm text-emerald-300">2019</div>
            <div className="mt-1 text-sm">Carolina opened its doors with a seasonal 5-course menu and neighborhood support.</div>
          </li>
          <li>
            <div className="text-sm text-emerald-300">2021</div>
            <div className="mt-1 text-sm">Launched private dining experiences and Chef's Table seatings.</div>
          </li>
          <li>
            <div className="text-sm text-emerald-300">2023</div>
            <div className="mt-1 text-sm">Recognized in regional press for sustainable sourcing.</div>
          </li>
        </ol>
      </section>

      <section className="mt-12">
        <h3 className="text-xl font-semibold text-white">Awards & Press</h3>
        <div className="mt-4 flex items-center gap-6 flex-wrap">
          {[
            "/assets/images/press-1.png",
            "/assets/images/press-2.png",
            "/assets/images/press-3.png",
          ].map((logo, i) => (
            <div key={i} className="h-12 w-32 flex items-center justify-center border border-white/6 rounded-md bg-black/20">
              <img src={logo} alt={`Press ${i + 1}`} className="max-h-8 object-contain opacity-90" onError={(e) => ((e.target as HTMLImageElement).style.opacity = "0.4")} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h3 className="text-xl font-semibold text-white">A Glimpse Inside</h3>

        <div className="mt-4 relative rounded-xl overflow-hidden border border-white/8 bg-black/20">
          <div className="h-64 sm:h-80 md:h-96 w-full bg-neutral-900">
            <img
              src={GALLERY[index]}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-auto">
              <button aria-label="Previous photo" onClick={prev} className="rounded-full bg-black/40 p-2 border border-white/8">
                ‹
              </button>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-auto">
              <button aria-label="Next photo" onClick={next} className="rounded-full bg-black/40 p-2 border border-white/8">
                ›
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 text-center">
        <h3 className="text-lg font-semibold text-white">Ready to experience Carolina?</h3>
        <p className="text-neutral-300 mt-2">Reserve a table or plan an event — we’ll take care of the rest.</p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <a className="inline-block rounded-full bg-gradient-to-r from-blue-600 to-emerald-400 px-6 py-2 text-black font-semibold" href="/reservations">Reserve</a>
          <a className="inline-block rounded-full border border-white/8 px-5 py-2 text-white/90" href="/events">Events</a>
        </div>
      </section>
    </main>
  );
}
