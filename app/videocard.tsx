import type { Video } from "@/types";

interface VideoCardProps {
  v: Video;
}

export default function VideoCard({ v }: VideoCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-[0_16px_40px_-14px_rgba(14,165,233,0.8)]">
      <div className="relative overflow-hidden" style={{ paddingTop: "75%" }}>
        <img
          src={v.img}
          alt={v.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
      </div>
      <div className="p-4">
        <p className="text-[11px] tracking-[0.15em] uppercase text-slate-500 m-0">{v.tag}</p>
        <h3 className="mt-1 text-xl font-serif font-light text-slate-100">{v.title}</h3>
      </div>
    </article>
  );
}