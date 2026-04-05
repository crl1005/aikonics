'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Page } from "@/types";

interface GalleryPageProps {
  setPage: (page: Page) => void;
  scrollY?: number;
}

interface Moment {
  id: number;
  title: string;
  url: string;
  type: "photo" | "video";
  created_at: string;
}

export default function GalleryPage({ setPage, scrollY = 0 }: GalleryPageProps) {
  const [moments, setMoments]   = useState<Moment[]>([]);
  const [lightbox, setLightbox] = useState<Moment | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => { fetchMoments(); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function fetchMoments() {
    const { data } = await supabase.from("moments").select("*").order("created_at", { ascending: false });
    if (data) setMoments(data as Moment[]);
  }

  async function handleDelete(e: React.MouseEvent, id: number) {
    e.stopPropagation();
    if (!confirm("Delete this moment?")) return;
    setDeleting(id);
    await supabase.from("moments").delete().eq("id", id);
    setMoments(prev => prev.filter(m => m.id !== id));
    if (lightbox?.id === id) setLightbox(null);
    setDeleting(null);
  }

  function handleBack(e: React.MouseEvent) {
    e.preventDefault();
    setPage("home");
    setTimeout(() => window.scrollTo({ top: scrollY, behavior: "instant" }), 0);
  }

  return (
    <>
      <div className="min-h-screen bg-[#080603] pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Header */}
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700 mb-3">Complete archive</p>
              <h1 className="font-serif text-5xl md:text-6xl font-light text-amber-50">All Moments</h1>
            </div>
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-stone-400 border border-stone-800 rounded-full px-6 py-3 hover:border-amber-700 hover:text-amber-300 transition-all duration-200"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M11 6H1M5 10l-4-4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Back
            </button>
          </div>

          {moments.length === 0 ? (
            <div className="border border-dashed border-amber-900/30 rounded-2xl py-32 flex flex-col items-center gap-4">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-amber-900/50">
                <rect x="4" y="8" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="14" cy="18" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M4 28l8-7 6 5 6-5 12 9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              <p className="text-stone-600 text-sm">No moments yet</p>
            </div>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {moments.map((item, i) => (
                <div
                  key={item.id}
                  onClick={() => setLightbox(item)}
                  className={`group relative overflow-hidden bg-stone-950 cursor-pointer ${i % 7 === 0 ? "sm:col-span-2 aspect-[16/9]" : "aspect-video"}`}
                  style={{ borderRadius: "3px" }}
                >
                  {item.type === "video" ? (
                    <video src={item.url} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-700" muted loop
                      onMouseEnter={e => (e.target as HTMLVideoElement).play()}
                      onMouseLeave={e => (e.target as HTMLVideoElement).pause()}
                    />
                  ) : (
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-700" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Delete */}
                  <button
                    onClick={e => handleDelete(e, item.id)}
                    disabled={deleting === item.id}
                    className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-8 h-8 rounded-full bg-black/60 border border-red-500/40 hover:bg-red-500/20 flex items-center justify-center backdrop-blur-sm"
                  >
                    {deleting === item.id ? (
                      <svg className="animate-spin" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="4" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6 6"/>
                      </svg>
                    ) : (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1 1L9 9M9 1L1 9" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    )}
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm font-light text-amber-50 truncate">{item.title}</p>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-amber-600">{item.type}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md px-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-5xl w-full flex flex-col gap-4" onClick={e => e.stopPropagation()}>
            {/* Close */}
            <div className="flex items-center justify-between px-1">
              <div>
                <p className="font-serif text-lg font-light text-amber-100">{lightbox.title}</p>
                <span className="text-[9px] tracking-[0.25em] uppercase text-amber-700">{lightbox.type}</span>
              </div>
              <div className="flex items-center gap-3">
                {lightbox.id !== -1 && (
                  <button
                    onClick={e => handleDelete(e, lightbox.id)}
                    disabled={deleting === lightbox.id}
                    className="flex items-center gap-2 rounded-full border border-red-500/30 px-4 py-2 text-[10px] tracking-[0.15em] uppercase text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-40"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    Delete
                  </button>
                )}
                <button onClick={() => setLightbox(null)} className="w-9 h-9 rounded-full border border-stone-700 hover:border-stone-500 flex items-center justify-center text-stone-400 hover:text-white transition-colors">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>

            {/* Media */}
            <div className="w-full overflow-hidden bg-stone-950" style={{ borderRadius: "4px" }}>
              {lightbox.type === "video" ? (
                <video src={lightbox.url} className="w-full max-h-[78vh] object-contain" controls autoPlay />
              ) : (
                <img src={lightbox.url} alt={lightbox.title} className="w-full max-h-[78vh] object-contain" />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}