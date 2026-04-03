import VideoCard from "@/components/VideoCard";
import { VIDEOS } from "@/data";
import type { Page } from "@/types";

interface GalleryPageProps {
  setPage: (page: Page) => void;
}

export default function GalleryPage({ setPage }: GalleryPageProps) {
  return (
    <section className="max-w-6xl mx-auto px-10 py-20">
      <div className="flex items-center justify-between mb-12">
        <div>
          <span className="text-[11px] tracking-[0.2em] uppercase text-slate-500">
            Complete archive
          </span>
          <h1 className="mt-2 font-serif text-5xl font-light text-slate-100 leading-tight">
            All Moments
          </h1>
        </div>
        <a
          href="#"
          onClick={e => { e.preventDefault(); setPage("home"); window.scrollTo(0, 0); }}
          className="rounded-full border border-slate-500 px-6 py-3 text-[11px] tracking-[0.15em] uppercase text-slate-100 no-underline transition-all duration-200 hover:border-sky-300 hover:text-sky-300"
        >
          ← Back
        </a>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {VIDEOS.map(v => (
          <VideoCard key={v.slug} v={v} />
        ))}
      </div>
    </section>
  );
}