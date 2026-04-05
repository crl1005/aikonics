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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .home-root { font-family: 'DM Sans', sans-serif; }
        .font-serif-custom { font-family: 'Cormorant Garamond', serif; }

        .grain::after {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 999; opacity: 0.35;
        }

        .hero-img { object-position: center top; object-fit: cover; }
        .moment-card:hover .moment-overlay { opacity: 1; }
        .moment-card:hover img,
        .moment-card:hover video { transform: scale(1.04); }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-1 { animation: fadeSlideUp 0.9s 0.1s both; }
        .anim-2 { animation: fadeSlideUp 0.9s 0.3s both; }
        .anim-3 { animation: fadeSlideUp 0.9s 0.5s both; }
        .anim-4 { animation: fadeSlideUp 0.9s 0.7s both; }

        .tag-pill {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
          padding: 5px 14px; border-radius: 999px;
          border: 1px solid #c9b99a; color: #8a7055;
          background: rgba(201,185,154,0.12);
        }

        .divider-ornament {
          display: flex; align-items: center; gap: 16px; color: #c9b99a;
        }
        .divider-ornament::before, .divider-ornament::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, #c9b99a80, transparent);
        }

        /* ── LAYOUT CLASSES ── */
        .section-px { padding-left: 56px; padding-right: 56px; }

        .intro-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .meaning-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .meaning-cell-left {
          padding: 64px 56px;
          border-right: 1px solid #d6c9b4;
        }

        .meaning-cell-right {
          padding: 64px 56px;
        }

        .moments-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 56px;
        }

        .moments-grid {
          display: grid;
          gap: 3px;
          grid-template-columns: repeat(3, 1fr);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .section-px { padding-left: 32px; padding-right: 32px; }
          .intro-grid { gap: 48px; }
          .meaning-cell-left { padding: 48px 32px; }
          .meaning-cell-right { padding: 48px 32px; }
          .about-grid { gap: 48px; }
        }

        @media (max-width: 768px) {
          .section-px { padding-left: 24px; padding-right: 24px; }

          .intro-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .meaning-grid {
            grid-template-columns: 1fr;
          }

          .meaning-cell-left {
            padding: 40px 24px;
            border-right: none;
            border-bottom: 1px solid #d6c9b4;
          }

          .meaning-cell-right {
            padding: 40px 24px;
          }

          .moments-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            margin-bottom: 32px;
          }

          .moments-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .about-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        @media (max-width: 480px) {
          .moments-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div className="home-root grain">

        {/* ── HERO ── */}
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#f5f0e8]">
          <div className="absolute inset-0">
            <img
              src="/images/aiko.png"
              alt="Aiko"
              className="hero-img w-full h-full"
              style={{
                objectFit: 'cover',
                objectPosition: 'center top',
                filter: 'brightness(0.92) contrast(1.04) saturate(0.95)',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(100deg, rgba(245,240,232,0.92) 0%, rgba(245,240,232,0.6) 50%, rgba(245,240,232,0.0) 75%)',
            }} />
          </div>

          <div className="relative z-10 w-full py-32 section-px" style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ maxWidth: '460px' }}>
              <div className="tag-pill anim-1 mb-8" style={{ width: 'fit-content' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#b8936a', display: 'inline-block' }} />
                A personal archive
              </div>

              <h1 className="font-serif-custom anim-2" style={{
                fontSize: 'clamp(3.2rem, 8vw, 7rem)',
                fontWeight: 300,
                lineHeight: 0.92,
                color: '#2c1f0e',
                marginBottom: '2rem',
                letterSpacing: '-0.01em',
              }}>
                Every<br />
                <em style={{ color: '#b8936a', fontStyle: 'italic' }}>moment</em><br />
                matters.
              </h1>

              <p className="anim-3" style={{
                fontSize: '0.875rem',
                lineHeight: 1.9,
                color: '#6b5a45',
                maxWidth: '320px',
                marginBottom: '2.5rem',
              }}>
                Life is built from small, meaningful moments. I capture them, hold them close, and keep them alive.
              </p>

              <a href="#work" className="anim-4" style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase',
                color: '#2c1f0e', border: '1px solid #2c1f0e', borderRadius: '999px',
                padding: '14px 28px', textDecoration: 'none', transition: 'all 0.3s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#2c1f0e'; (e.currentTarget as HTMLElement).style.color = '#f5f0e8'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#2c1f0e'; }}
              >
                See the moments
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>

          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px',
            background: 'linear-gradient(to top, #f5f0e8, transparent)',
            pointerEvents: 'none',
          }} />
        </section>

        {/* ── INTRO QUOTE ── */}
        <section id="intro" style={{ background: '#f5f0e8', padding: '96px 0' }}>
          <div className="section-px" style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div className="divider-ornament" style={{ marginBottom: '64px', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8936a' }}>
              Why I do this
            </div>
            <div className="intro-grid">
              <blockquote className="font-serif-custom" style={{
                fontSize: 'clamp(1.4rem, 3vw, 2.4rem)',
                fontWeight: 300, color: '#2c1f0e', lineHeight: 1.45,
                fontStyle: 'italic', margin: 0,
                borderLeft: '2px solid #b8936a', paddingLeft: '28px',
              }}>
                "I don't want to look back one day and realize I forgot what it felt like."
              </blockquote>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.9, color: '#7a6650', margin: 0 }}>
                Life moves fast. People change, places fade, and feelings dim. Capturing moments isn't about professional perfection — it's a personal promise to remember what matters. Every frame is a letter to my future self.
              </p>
            </div>
          </div>
        </section>

        {/* ── MEANING CARDS ── */}
        <section style={{ background: '#ede7db', borderTop: '1px solid #d6c9b4', borderBottom: '1px solid #d6c9b4' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div className="meaning-grid">
              {[
                { word: 'aiko', pos: 'noun', desc: 'Japanese origin — meaning love and child. Aikonics is intimacy in motion.', sub: 'Japanese · 愛子', left: true },
                { word: 'journey', pos: 'noun', desc: 'The act of traveling through places, time, and emotion — a slow unfolding of life held close.', sub: 'Old French · journée', left: false },
              ].map(({ word, pos, desc, sub, left }) => (
                <div key={word} className={left ? 'meaning-cell-left' : 'meaning-cell-right'}>
                  <h3 className="font-serif-custom" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 300, color: '#2c1f0e', marginBottom: '8px', lineHeight: 1 }}>{word}</h3>
                  <p style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8936a', marginBottom: '20px' }}>{pos}</p>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.8, color: '#7a6650', marginBottom: '20px' }}>{desc}</p>
                  <span style={{ fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#b8a88a' }}>{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MOMENTS GRID ── */}
        <section id="work" style={{ background: '#f5f0e8', padding: '96px 0' }}>
          <div className="section-px" style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div className="moments-header">
              <div>
                <p style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#b8936a', marginBottom: '12px' }}>Archive</p>
                <h2 className="font-serif-custom" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', fontWeight: 300, color: '#2c1f0e', lineHeight: 1.1 }}>Captured Moments</h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <button
                  onClick={() => setShowModal(true)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: '#2c1f0e', border: '1px solid #b8936a', borderRadius: '999px',
                    padding: '10px 20px', background: 'transparent', cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  Add
                </button>
                <button
                  onClick={() => { setPage("gallery"); window.scrollTo(0, 0); }}
                  style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b8936a', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  View all →
                </button>
              </div>
            </div>

            {moments.length === 0 ? (
              <div style={{
                border: '1px dashed #c9b99a', borderRadius: '16px', padding: '80px 0',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
              }}>
                <svg width="36" height="36" viewBox="0 0 40 40" fill="none" style={{ color: '#c9b99a' }}>
                  <rect x="4" y="8" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="14" cy="18" r="4" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M4 28l8-7 6 5 6-5 12 9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
                <p style={{ fontSize: '0.875rem', color: '#b8a88a' }}>No moments yet</p>
                <button onClick={() => setShowModal(true)} style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b8936a', background: 'none', border: 'none', cursor: 'pointer' }}>
                  + Add your first moment
                </button>
              </div>
            ) : (
              <div className="moments-grid">
                {moments.slice(0, 6).map((item, i) => (
                  <div
                    key={item.id}
                    className="moment-card"
                    style={{
                      position: 'relative', overflow: 'hidden', borderRadius: '4px',
                      gridColumn: i === 0 ? 'span 2' : 'span 1',
                      aspectRatio: i === 0 ? '16/9' : '4/3',
                      cursor: 'pointer', background: '#e8e0d4',
                    }}
                  >
                    {item.type === "video" ? (
                      <video src={item.url} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }} muted loop
                        onMouseEnter={e => (e.target as HTMLVideoElement).play()}
                        onMouseLeave={e => (e.target as HTMLVideoElement).pause()}
                      />
                    ) : (
                      <img src={item.url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease', display: 'block' }} />
                    )}
                    <div className="moment-overlay" style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(44,31,14,0.65) 0%, transparent 55%)',
                      opacity: 0, transition: 'opacity 0.4s',
                    }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px' }}>
                      <p style={{ fontSize: '0.8rem', color: '#f5f0e8', margin: 0, fontWeight: 300 }}>{item.title}</p>
                      <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9b99a' }}>{item.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" style={{ background: '#ede7db', borderTop: '1px solid #d6c9b4', padding: '96px 0' }}>
          <div className="section-px about-grid" style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div>
              <p style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#b8936a', marginBottom: '20px' }}>About</p>
              <h2 className="font-serif-custom" style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 300, color: '#2c1f0e', lineHeight: 1.1, marginBottom: '0' }}>
                Just someone<br />who loves<br /><em style={{ color: '#b8936a' }}>being present.</em>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.9, color: '#7a6650', margin: 0 }}>
                I'm not a professional filmmaker. I pick up a camera because I am afraid of forgetting the light, the smell, the feeling. Aikonics Journey is my personal archive.
              </p>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.9, color: '#7a6650', margin: 0 }}>
                Moments are easier to remember when they are shared. This site is a daily reminder to keep showing up for the small things.
              </p>
              <button
                onClick={() => { setPage("contact"); window.scrollTo(0, 0); }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px', width: 'fit-content',
                  fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: '#2c1f0e', border: '1px solid #2c1f0e', borderRadius: '999px',
                  padding: '14px 28px', background: 'transparent', cursor: 'pointer',
                  transition: 'all 0.3s', marginTop: '12px',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#2c1f0e'; (e.currentTarget as HTMLElement).style.color = '#f5f0e8'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#2c1f0e'; }}
              >
                Get in touch
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </section>

        {/* ── UPLOAD MODAL ── */}
        {showModal && (
          <div
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(44,31,14,0.5)', backdropFilter: 'blur(6px)', padding: '16px',
            }}
            onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
          >
            <div style={{
              width: '100%', maxWidth: '440px',
              background: '#f5f0e8', border: '1px solid #d6c9b4',
              borderRadius: '16px', padding: '28px',
              display: 'flex', flexDirection: 'column', gap: '20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 className="font-serif-custom" style={{ fontSize: '1.4rem', fontWeight: 300, color: '#2c1f0e', margin: 0 }}>Add a moment</h3>
                <button onClick={closeModal} disabled={uploading} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#b8a88a', padding: '4px' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              </div>

              <div
                onClick={() => !uploading && fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
                style={{
                  minHeight: '180px', borderRadius: '10px',
                  border: `2px dashed ${dragOver ? '#b8936a' : '#c9b99a'}`,
                  background: dragOver ? 'rgba(184,147,106,0.06)' : '#ede7db',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  position: 'relative', overflow: 'hidden', transition: 'all 0.2s',
                }}
              >
                {preview ? (
                  fileType === "video"
                    ? <video src={preview} style={{ width: '100%', maxHeight: '220px', objectFit: 'cover' }} muted autoPlay loop />
                    : <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '220px', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ color: '#c9b99a' }}>
                      <path d="M14 4v16M6 10l8-8 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 24h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <p style={{ fontSize: '0.8rem', color: '#b8a88a', textAlign: 'center', margin: 0 }}>
                      Drop a photo or video<br/><span style={{ fontSize: '11px', color: '#c9b99a' }}>or click to browse</span>
                    </p>
                  </div>
                )}
              </div>

              <input ref={fileRef} type="file" accept="image/*,video/*" style={{ display: 'none' }}
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} disabled={uploading} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8a88a' }}>Title</label>
                <input
                  type="text" value={title} onChange={e => setTitle(e.target.value)}
                  placeholder="Name this moment…" disabled={uploading}
                  style={{
                    background: '#ede7db', border: '1px solid #c9b99a', borderRadius: '8px',
                    padding: '12px 16px', fontSize: '0.875rem', color: '#2c1f0e',
                    outline: 'none', transition: 'border-color 0.2s', fontFamily: 'DM Sans, sans-serif',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#b8936a')}
                  onBlur={e => (e.target.style.borderColor = '#c9b99a')}
                />
              </div>

              {uploading && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#b8a88a' }}>
                    <span>Uploading…</span><span>{progress}%</span>
                  </div>
                  <div style={{ width: '100%', height: '2px', background: '#d6c9b4', borderRadius: '999px' }}>
                    <div style={{ height: '100%', background: '#b8936a', borderRadius: '999px', transition: 'width 0.3s', width: `${progress}%` }} />
                  </div>
                </div>
              )}

              {error && <p style={{ fontSize: '11px', color: '#c0392b', margin: 0 }}>{error}</p>}

              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={closeModal} disabled={uploading} style={{
                  flex: 1, borderRadius: '999px', border: '1px solid #c9b99a',
                  padding: '12px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: '#8a7055', background: 'transparent', cursor: 'pointer',
                }}>Cancel</button>
                <button onClick={handleUpload} disabled={!selectedFile || !title.trim() || uploading} style={{
                  flex: 1, borderRadius: '999px', border: '1px solid #b8936a',
                  padding: '12px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: '#2c1f0e', background: 'rgba(184,147,106,0.12)', cursor: 'pointer',
                  opacity: (!selectedFile || !title.trim() || uploading) ? 0.4 : 1,
                }}>
                  {uploading ? `${progress}%` : "Upload"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}