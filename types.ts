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

export type Page = "home" | "gallery" | "contact";