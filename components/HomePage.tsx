'use client';

import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { uploadMedia } from "@/lib/uploadMedia";
import type { Page } from "@/types";

interface Moment {
  id: number;
  title: string;
  url: string;
  type: "photo" | "video";
  created_at: string;
}

interface HomePageProps {
  setPage: (page: Page) => void;
}

export default function HomePage({ setPage }: HomePageProps) {
  const [moments, setMoments]           = useState<Moment[]>([]);
  const [showModal, setShowModal]       = useState(false);
  const [dragOver, setDragOver]         = useState(false);
  const [preview, setPreview]           = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileType, setFileType]         = useState<"photo" | "video" | null>(null);
  const [title, setTitle]               = useState("");
  const [uploading, setUploading]       = useState(false);
  const [progress, setProgress]         = useState(0);
  const [error, setError]               = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMoments();
    const channel = supabase
      .channel("moments-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "moments" }, fetchMoments)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  async function fetchMoments() {
    const { data } = await supabase.from("moments").select("*").order("created_at", { ascending: false });
    if (data) setMoments(data as Moment[]);
  }

  function handleFile(file: File) {
    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");
    if (!isVideo && !isImage) { setError("Only image and video files are supported."); return; }
    setError(null);
    setSelectedFile(file);
    setFileType(isVideo ? "video" : "photo");
    setPreview(URL.createObjectURL(file));
  }

  async function handleUpload() {
    if (!selectedFile || !title.trim()) return;
    setUploading(true); setProgress(0); setError(null);
    try {
      await uploadMedia(selectedFile, title.trim(), setProgress);
      closeModal();
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  function closeModal() {
    if (uploading) return;
    setShowModal(false); setPreview(null); setSelectedFile(null);
    setTitle(""); setFileType(null); setProgress(0); setError(null);
  }

  return (
    <>
      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-end overflow-hidden bg-[#080603]">
        <div className="absolute inset-0">
          <img src="/images/aiko.png" alt="" className="w-full h-full object-cover object-right-top opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080603] via-[#080603]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080603] via-transparent to-[#080603]/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-28 pt-40 w-full">
          <div className="max-w-2xl">
            <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700 mb-8">A personal archive</p>
            <h1 className="font-serif text-7xl md:text-8xl lg:text-[7rem] font-light leading-[0.9] text-amber-50 mb-8">
              Every<br /><em className="not-italic text-amber-400">moment</em><br />matters.
            </h1>
            <p className="text-sm leading-8 text-stone-400 max-w-sm mb-12">
              Life is built from small, meaningful moments. I capture them, polish them, and keep them alive so they remain with us.
            </p>
            <a href="#work" className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-amber-200 border border-amber-800/60 rounded-full px-7 py-3.5 hover:border-amber-500 hover:text-amber-100 transition-all duration-300">
              See the moments
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25">
          <div className="w-px h-10 bg-amber-400 animate-pulse" />
        </div>
      </section>

      {/* ── INTRO ── */}
      <section id="intro" className="bg-[#080603] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700 mb-6">Why I do this</p>
            <blockquote className="font-serif text-2xl md:text-3xl font-light text-amber-100 leading-relaxed border-l-2 border-amber-700 pl-8">
              "I don't want to look back one day and realize I forgot what it felt like."
            </blockquote>
          </div>
          <p className="text-sm leading-8 text-stone-400">
            Life moves fast. People change, places fade, and feelings dim. Capturing moments isn't about professional perfection — it's a personal promise to remember what matters. Every frame is a letter to my future self.
          </p>
        </div>
      </section>

      {/* ── MEANING ── */}
      <section className="bg-[#0d0a06] py-0 border-y border-amber-900/20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-px bg-amber-900/20">
          {[
            { word: "aiko", pos: "noun", desc: (<>Japanese origin — meaning <em className="text-amber-400 not-italic">love</em> and <em className="text-amber-400 not-italic">child</em>. Aikonics is intimacy in motion.</>), sub: "Japanese · 愛子" },
            { word: "journey", pos: "noun", desc: "The act of traveling through places, time, and emotion — a slow unfolding of life held close.", sub: "Old French · journée" },
          ].map(({ word, pos, desc, sub }) => (
            <div key={word} className="bg-[#0d0a06] px-10 md:px-16 py-16">
              <h3 className="font-serif text-6xl md:text-7xl font-light text-amber-50 mb-3">{word}</h3>
              <p className="text-[10px] tracking-[0.25em] uppercase text-amber-700 mb-5">{pos}</p>
              <p className="text-sm leading-8 text-stone-400 mb-6">{desc}</p>
              <span className="text-[10px] tracking-[0.3em] uppercase text-stone-600">{sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── MOMENTS ── */}
      <section id="work" className="bg-[#080603] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700 mb-3">Archive</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-amber-50">Captured Moments</h2>
            </div>
            <div className="flex items-center gap-5">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-amber-400 border border-amber-800/50 rounded-full px-5 py-2.5 hover:border-amber-500 hover:bg-amber-500/5 transition-all duration-200"
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                Add
              </button>
              <button onClick={() => { setPage("gallery"); window.scrollTo(0, 0); }} className="text-[10px] tracking-[0.2em] uppercase text-stone-500 hover:text-amber-400 transition-colors">
                View all →
              </button>
            </div>
          </div>

          {moments.length === 0 ? (
            <div className="border border-dashed border-amber-900/30 rounded-2xl py-24 flex flex-col items-center gap-4">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-amber-900/60">
                <rect x="4" y="8" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="14" cy="18" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M4 28l8-7 6 5 6-5 12 9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              <p className="text-stone-600 text-sm">No moments yet</p>
              <button onClick={() => setShowModal(true)} className="text-[11px] tracking-[0.2em] uppercase text-amber-700 hover:text-amber-500 transition-colors">+ Add your first moment</button>
            </div>
          ) : (
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {moments.slice(0, 6).map((item, i) => (
                <div key={item.id} className={`group relative overflow-hidden bg-stone-950 cursor-pointer ${i === 0 ? "sm:col-span-2 aspect-[16/9]" : "aspect-video"}`} style={{ borderRadius: "3px" }}>
                  {item.type === "video" ? (
                    <video src={item.url} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-700" muted loop
                      onMouseEnter={e => (e.target as HTMLVideoElement).play()}
                      onMouseLeave={e => (e.target as HTMLVideoElement).pause()}
                    />
                  ) : (
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-700" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-sm font-light text-amber-50 truncate">{item.title}</p>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-amber-600">{item.type}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="bg-[#0d0a06] border-t border-amber-900/20 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700 mb-6">About</p>
            <h2 className="font-serif text-5xl md:text-6xl font-light text-amber-50 leading-tight">
              Just someone<br />who loves<br /><em className="not-italic text-amber-400">being present.</em>
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-sm leading-8 text-stone-400">
              I'm not a professional filmmaker. I pick up a camera because I am afraid of forgetting the light, the smell, the feeling. Aikonics Journey is my personal archive.
            </p>
            <p className="text-sm leading-8 text-stone-400">
              Moments are easier to remember when they are shared. This site is a daily reminder to keep showing up for the small things.
            </p>
            <button
              onClick={() => { setPage("contact"); window.scrollTo(0, 0); }}
              className="w-max inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-amber-400 border border-amber-800/50 rounded-full px-7 py-3.5 hover:border-amber-500 hover:bg-amber-500/5 transition-all duration-300"
            >
              Get in touch
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── UPLOAD MODAL ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm px-4" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="w-full max-w-md bg-[#100d08] border border-amber-900/30 rounded-2xl p-7 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-light text-amber-100">Add a moment</h3>
              <button onClick={closeModal} disabled={uploading} className="text-stone-600 hover:text-stone-300 transition-colors disabled:opacity-30">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div
              onClick={() => !uploading && fileRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
              className={`relative rounded-xl border-2 border-dashed overflow-hidden transition-all duration-200 ${uploading ? "opacity-50 cursor-not-allowed" : dragOver ? "border-amber-500 bg-amber-500/5 cursor-pointer" : "border-stone-800 hover:border-amber-800/60 cursor-pointer"}`}
              style={{ minHeight: "180px" }}
            >
              {preview ? (
                fileType === "video"
                  ? <video src={preview} className="w-full object-cover" style={{ maxHeight: "220px" }} muted autoPlay loop />
                  : <img src={preview} alt="Preview" className="w-full object-cover" style={{ maxHeight: "220px" }} />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-stone-700">
                    <path d="M14 4v16M6 10l8-8 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 24h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <p className="text-sm text-stone-600 text-center">Drop a photo or video<br/><span className="text-[11px] text-stone-700">or click to browse</span></p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} disabled={uploading} />
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[0.2em] uppercase text-stone-600">Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Name this moment…" disabled={uploading}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-3 text-sm text-amber-100 placeholder-stone-700 outline-none focus:border-amber-700 transition-colors disabled:opacity-50" />
            </div>
            {uploading && (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[10px] text-stone-600"><span>Uploading…</span><span>{progress}%</span></div>
                <div className="w-full h-px bg-stone-800"><div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${progress}%` }} /></div>
              </div>
            )}
            {error && <p className="text-[11px] text-red-400">{error}</p>}
            <div className="flex gap-3 pt-1">
              <button onClick={closeModal} disabled={uploading} className="flex-1 rounded-full border border-stone-800 py-3 text-[10px] tracking-[0.2em] uppercase text-stone-500 hover:text-stone-300 hover:border-stone-600 transition-colors disabled:opacity-30">Cancel</button>
              <button onClick={handleUpload} disabled={!selectedFile || !title.trim() || uploading}
                className="flex-1 rounded-full border border-amber-800/60 bg-amber-500/5 py-3 text-[10px] tracking-[0.2em] uppercase text-amber-400 hover:bg-amber-500/10 hover:border-amber-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                {uploading ? `${progress}%` : "Upload moment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}