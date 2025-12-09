import type { Event } from "@/types/event";
import type { MenuItem } from "@/types/menuItem";
import type { Product } from "@/types/product";
import type { FAQItem, GalleryItem, JournalPost } from "@/types";

export const events: Event[] = [
  {
    slug: "midnight-jazz-session",
    title: "Midnight Jazz Session",
    date: "2025-02-14",
    time: "10:00 PM",
    location: "Atrium Stage",
    description: "Live improv jazz curated for late-night guests.",
  },
  {
    slug: "neon-chef-table",
    title: "Neon Chef's Table",
    date: "2025-03-01",
    time: "08:00 PM",
    location: "Chef's Counter",
    description: "Five-course tasting experience with limited seating.",
  },
];

export const menuItems: MenuItem[] = [
  {
    id: "midnight-mocha",
    name: "Midnight Mocha",
    category: "Beverages",
    description: "Espresso, dark chocolate, smoked vanilla cream.",
    price: "$12",
  },
  {
    id: "luminary-tonic",
    name: "Luminary Tonic",
    category: "Signatures",
    description: "Botanical gin, yuzu cordial, tonic mist.",
    price: "$18",
  },
  {
    id: "stargazer-tart",
    name: "Stargazer Tart",
    category: "Desserts",
    description: "Citrus curd, candied hibiscus, sable crust.",
    price: "$14",
  },
  {
    id: "greek-salad",
    name: "Greek Salad",
    category: "Starters",
    description:
      "Tomatoes, green bell pepper, sliced cucumber onion, olives, and feta cheese.",
    price: "$25.50",
  },
  {
    id: "lasagne",
    name: "Lasagne",
    category: "Main Course",
    description:
      "Vegetables, cheeses, ground meats, tomato sauce, seasonings and spices.",
    price: "$40.00",
  },
  {
    id: "butternut-pumpkin",
    name: "Butternut Pumpkin",
    category: "Starters",
    description:
      "Typesetting industry lorem Lorem Ipsum is simply dummy text of the priand.",
    price: "$10.00",
  },
];

export const products: Product[] = [
  {
    slug: "luminary-roast",
    name: "Luminary Roast Beans",
    description: "House espresso blend roasted weekly.",
    price: "$28",
    status: "available",
  },
  {
    slug: "lounge-glassware",
    name: "Lounge Glassware Set",
    description: "Pair of etched coupe glasses.",
    price: "$46",
    status: "available",
  },
];

export const journalPosts: JournalPost[] = [
  {
    slug: "behind-the-lumens",
    title: "Behind the Lumens",
    date: "2025-01-05",
    author: "Carolina Team",
    excerpt: "Design inspiration for the lounge's neon architecture.",
  },
  {
    slug: "chef-collaboration-series",
    title: "Chef Collaboration Series",
    date: "2025-01-21",
    author: "Guest Chef Lira",
    excerpt: "A look at upcoming chef residencies at Carolina.",
  },
];

export const faqs: FAQItem[] = [
  {
    id: "dress-code",
    question: "Is there a dress code?",
    answer: "Smart casual attire is encouraged to match the lounge ambiance.",
  },
  {
    id: "reservation-window",
    question: "How far in advance can I book?",
    answer: "Reservations open 30 days prior to the desired date.",
  },
];

export const galleryImages: GalleryItem[] = [
  {
    id: "lounge-panorama",
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
    alt: "Panoramic view of the lounge seating.",
    caption: "Elevated views of the Luminary Lounge interior.",
    width: 1200,
    height: 800,
  },
  {
    id: "signature-cocktail",
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    alt: "Signature cocktail with neon garnish.",
    caption: "Experiments from the mixology lab.",
    width: 1200,
    height: 800,
  },
  {
    id: "lounge-panorama",
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
    alt: "Panoramic view of the lounge seating.",
    caption: "Elevated views of the Luminary Lounge interior.",
    width: 1200,
    height: 800,
  },
  {
    id: "signature-cocktail",
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    alt: "Signature cocktail with neon garnish.",
    caption: "Experiments from the mixology lab.",
    width: 1200,
    height: 800,
  },
  {
    id: "lounge-panorama",
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
    alt: "Panoramic view of the lounge seating.",
    caption: "Elevated views of the Luminary Lounge interior.",
    width: 1200,
    height: 800,
  },
  {
    id: "signature-cocktail",
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    alt: "Signature cocktail with neon garnish.",
    caption: "Experiments from the mixology lab.",
    width: 1200,
    height: 800,
  },
  {
    id: "lounge-panorama",
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
    alt: "Panoramic view of the lounge seating.",
    caption: "Elevated views of the Luminary Lounge interior.",
    width: 1200,
    height: 800,
  },
  {
    id: "signature-cocktail",
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    alt: "Signature cocktail with neon garnish.",
    caption: "Experiments from the mixology lab.",
    width: 1200,
    height: 800,
  },
];

export const getEventBySlug = (slug: string) =>
  events.find((event) => event.slug === slug);

export const getPostBySlug = (slug: string) =>
  journalPosts.find((post) => post.slug === slug);

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);

