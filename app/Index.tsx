import type { Video, NavLink } from "@/types";

/**
 * VIDEOS
 * ------
 * To use local images, place your files in /public/media/images/
 * and update the `img` field to e.g. "/media/images/golden-hour.jpg"
 *
 * To attach a video, place your .mp4 in /public/media/videos/
 * and add a `videoSrc` field e.g. "/media/videos/golden-hour.mp4"
 */
export const VIDEOS: Video[] = [
  {
    slug: "golden-hour-mountains",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    title: "Golden Hour in the Mountains",
    tag: "Nature",
    // videoSrc: "/media/videos/golden-hour-mountains.mp4",
  },
  {
    slug: "city-lights-midnight",
    img: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80",
    title: "City Lights at Midnight",
    tag: "Urban",
  },
  {
    slug: "moments-friends",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    title: "Moments Between Friends",
    tag: "People",
  },
  {
    slug: "roads-less-traveled",
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
    title: "Roads Less Traveled",
    tag: "Travel",
  },
  {
    slug: "quiet-sunday-morning",
    img: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80",
    title: "Quiet Sunday Morning",
    tag: "Life",
  },
  {
    slug: "chasing-horizon",
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
    title: "Chasing the Horizon",
    tag: "Travel",
  },
  {
    slug: "misty-forest-dawn",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    title: "Misty Forest at Dawn",
    tag: "Nature",
  },
  {
    slug: "urban-reflections",
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    title: "Urban Reflections",
    tag: "Urban",
  },
  {
    slug: "laughing-together",
    img: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=800&q=80",
    title: "Laughing Together",
    tag: "People",
  },
  {
    slug: "mountain-road",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    title: "Mountain Road",
    tag: "Travel",
  },
  {
    slug: "morning-coffee-ritual",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    title: "Morning Coffee Ritual",
    tag: "Life",
  },
  {
    slug: "ocean-horizon",
    img: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
    title: "Ocean Horizon",
    tag: "Nature",
  },
];

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "Moments", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export type Page = "home" | "gallery";

export interface Video {
  slug: string;
  img: string;
  title: string;
  tag: string;
  /** Optional: local path to a video file in /public/media/videos/ */
  videoSrc?: string;
}

export interface NavLink {
  label: string;
  href: string;
}
