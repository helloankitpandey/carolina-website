import MenuItem from "@/components/MenuItem";
import { menuItems } from "@/lib/data";

export default function MenuPage() {
  const imageMap: Record<string, string> = {
    "midnight-mocha":
      "https://heybairtender.s3.amazonaws.com/recipes/midnight-mocha-madness2105.png",

    "luminary-tonic":
      "https://th.bing.com/th/id/OIP.f75Wt_75RVr97o7LnGPy8AHaFj?w=234&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",

    "stargazer-tart":
      "https://cdnnew.igp.com/f_auto,q_auto,t_pnopt12prodlp/products/p-chocolate-heart-truffle-cake-360903-m.jpg",

    "greek-salad":
      "https://bing.com/th?id=OSK.951fe7a0d0737dcdf4309f9b5fcb2fa7",

    "lasagne":
      "https://bing.com/th?id=OSK.f5873d89f968cc2d480b0f930e95ae4f",

    "butternut-pumpkin":
      "https://img.taste.com.au/fnofGqX3/taste/2016/11/middle-eastern-stuffed-butternut-pumpkin-102270-1.jpeg",

    default: "https://source.unsplash.com/800x600/?restaurant,food,neon",
  };

  return (
    <div className="relative space-y-12 pb-20 px-4 sm:px-6 md:px-10">

      <div className="pointer-events-none absolute inset-0 mx-auto opacity-30 blur-[120px]">
        <div className="mx-auto h-[200px] w-[200px] rounded-full bg-blue-600/30" />
      </div>

      <div className="relative text-center space-y-2 pt-10">
        <h1 className="text-4xl sm:text-4xl md:text-6xl font-semibold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent tracking-wide">
          Our Menu
        </h1>

        <p className="text-neutral-300 text-sm md:text-base max-w-xl mx-auto px-4">
          Explore our signature beverages, desserts, and crafted cocktails —
          curated to elevate your evening with Carolina.
        </p>

        <div className="mx-auto mt-3 h-[2px] w-20 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full shadow-[0_0_12px_rgba(0,255,255,0.4)]" />
      </div>

      <div className="space-y-6">

        <div className="relative grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">

          <div className="absolute -top-5 -left-5 h-32 w-32 rounded-full bg-emerald-500/20 blur-2xl" />
          <div className="absolute -bottom-5 -right-5 h-32 w-32 rounded-full bg-blue-500/20 blur-2xl" />

          {menuItems.map((item) => {
            const imgSrc = imageMap[item.id] ?? imageMap.default;

            return (
              <article
                key={item.id}
                className="
                  group relative flex flex-col sm:flex-row items-stretch gap-4
                  rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-4
                  transition-all duration-300 hover:border-blue-400/40
                  hover:shadow-[0_0_25px_rgba(0,150,255,0.25)]
                "
              >
                <div className="flex-shrink-0 w-full sm:w-40 md:w-44 h-40 overflow-hidden rounded-xl border border-white/10">
                  <img
                    src={imgSrc}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transform transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <MenuItem item={item} />
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="text-center pt-10">
        <a
          href="#"
          className="
            inline-flex items-center gap-3 rounded-full 
            bg-gradient-to-r from-blue-600 to-emerald-500 px-8 py-3 text-black font-semibold
            shadow-[0_0_20px_rgba(0,255,200,0.4)] transition-transform 
            hover:scale-105 hover:shadow-[0_0_35px_rgba(0,255,200,0.6)]
          "
        >
          View Full Menu
        </a>
      </div>
    </div>
  );
}

