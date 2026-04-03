/**
 * VIDEOS
 * ------
 * To use local images, place your files in /public/media/images/
 * and update the `img` field to e.g. "/media/images/golden-hour.jpg"
 *
 * To attach a video, place your .mp4 in /public/media/videos/
 * and add a `videoSrc` field e.g. "/media/videos/golden-hour.mp4"
 */

export interface Video {
  slug: string;
  img: string;
  title: string;
  tag: string;
  videoSrc?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export type Page = "home" | "gallery";

export const VIDEOS: Video[] = [
  // ... keep all your videos the same
];

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "Moments", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]; 