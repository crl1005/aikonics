import { Video, NavLink } from "@/types";

export const VIDEOS: Video[] = [
  {
    slug: "golden-hour-mountains",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    title: "Golden Hour in the Mountains",
    tag: "Nature",
  },
  // ... add all your other videos here
];

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "Moments", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];