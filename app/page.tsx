'use client';

import { useState } from "react";

const VIDEOS = [
  { slug: "golden-hour-mountains", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", title: "Golden Hour in the Mountains", tag: "Nature" },
  { slug: "city-lights-midnight", img: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80", title: "City Lights at Midnight", tag: "Urban" },
  { slug: "moments-friends", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80", title: "Moments Between Friends", tag: "People" },
  { slug: "roads-less-traveled", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80", title: "Roads Less Traveled", tag: "Travel" },
  { slug: "quiet-sunday-morning", img: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80", title: "Quiet Sunday Morning", tag: "Life" },
  { slug: "chasing-horizon", img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80", title: "Chasing the Horizon", tag: "Travel" },
  { slug: "misty-forest-dawn", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80", title: "Misty Forest at Dawn", tag: "Nature" },
  { slug: "urban-reflections", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80", title: "Urban Reflections", tag: "Urban" },
  { slug: "laughing-together", img: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=800&q=80", title: "Laughing Together", tag: "People" },
  { slug: "mountain-road", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80", title: "Mountain Road", tag: "Travel" },
  { slug: "morning-coffee-ritual", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80", title: "Morning Coffee Ritual", tag: "Life" },
  { slug: "ocean-horizon", img: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80", title: "Ocean Horizon", tag: "Nature" },
];

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Moments", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Logo({ onClick }) {
  return (
    <a
      href="#"
      onClick={e => { e.preventDefault(); onClick?.(); }}
      style={{ textDecoration: "none", color: "#f1f5f9", display: "flex", flexDirection: "column" }}
    >
      <span style={{ fontSize: 24, letterSpacing: "0.05em" }}>Aikonics</span>
      <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#94a3b8" }}>Journey</span>
    </a>
  );
}

function NavLinks({ page, setPage }) {
  return (
    <ul style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 }}>
      {NAV_LINKS.map((link) => (
        <li key={link.label}>
          <a
            href={page === "home" ? link.href : "#"}
            onClick={page !== "home" ? (e) => { e.preventDefault(); setPage("home"); window.scrollTo(0, 0); } : undefined}
            style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#f1f5f9"}
            onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Header({ page, setPage }) {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(2,6,23,0.92)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid #1e293b"
    }}>
      <div style={{
        maxWidth: 1152, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 40px"
      }}>
        <Logo onClick={() => { setPage("home"); window.scrollTo(0, 0); }} />
        <nav><NavLinks page={page} setPage={setPage} /></nav>
      </div>
    </header>
  );
}

function Footer({ page, setPage }) {
  return (
    <footer id="contact" style={{ borderTop: "1px solid #1e293b", background: "rgba(15,23,42,0.9)" }}>
      <div style={{
        maxWidth: 1152, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 40px"
      }}>
        <Logo onClick={() => { setPage("home"); window.scrollTo(0, 0); }} />
        <nav><NavLinks page={page} setPage={setPage} /></nav>
        <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "#64748b", margin: 0 }}>© 2026 Aikonics Journey</p>
      </div>
    </footer>
  );
}

function VideoCard({ v }) {
  return (
    <article
      style={{
        overflow: "hidden", borderRadius: 16,
        border: "1px solid #1e293b", background: "#0f172a",
        transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 16px 40px -14px rgba(14,165,233,0.8)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ position: "relative", paddingTop: "75%", overflow: "hidden" }}>
        <img
          src={v.img}
          alt={v.title}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s" }}
          onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}
        />
        <div style={{ pointerEvents: "none", position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,6,23,0.8) 0%, transparent 50%)" }} />
      </div>
      <div style={{ padding: 16 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#64748b", margin: 0 }}>{v.tag}</p>
        <h3 style={{ marginTop: 4, fontSize: 20, fontWeight: 400, color: "#f1f5f9" }}>{v.title}</h3>
      </div>
    </article>
  );
}

function HomePage({ setPage }) {
  return (
    <>
      {/* HERO */}
      <section id="hero" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "80vh" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, background: "#020617", padding: "80px 48px" }}>
          <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#64748b" }}>A personal archive</span>
          <h1 style={{ fontSize: 72, fontWeight: 300, lineHeight: 1.1, margin: 0, color: "#f1f5f9" }}>
            Every<br />moment<br />
            <em style={{ color: "#7dd3fc", fontStyle: "italic" }}>matters.</em>
          </h1>
          <p style={{ maxWidth: 400, fontSize: 14, lineHeight: 1.8, color: "#cbd5e1", margin: 0 }}>
            Life is built from small, meaningful moments. I capture them, polish them, and keep them alive so they remain with us.
          </p>
          <a
            href="#work"
            style={{ width: "max-content", borderRadius: 9999, border: "1px solid #64748b", padding: "12px 24px", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#f1f5f9", textDecoration: "none", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#7dd3fc"; e.currentTarget.style.color = "#7dd3fc"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#64748b"; e.currentTarget.style.color = "#f1f5f9"; }}
          >
            See the moments
          </a>
        </div>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85"
            alt="A captured moment"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.7, transition: "opacity 1s" }}
            onMouseEnter={e => e.target.style.opacity = 1}
            onMouseLeave={e => e.target.style.opacity = 0.7}
          />
          <div style={{ pointerEvents: "none", position: "absolute", inset: 0, background: "linear-gradient(to right, #020617 0%, rgba(2,6,23,0.4) 50%, transparent 100%)" }} />
          <div style={{ pointerEvents: "none", position: "absolute", inset: 0, background: "linear-gradient(to top, #020617 0%, rgba(2,6,23,0.3) 40%, transparent 100%)" }} />
        </div>
      </section>

      {/* INTRO */}
      <section id="intro" style={{ maxWidth: 1152, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ marginBottom: 32, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#64748b" }}>Why I do this</div>
        <blockquote style={{ borderLeft: "4px solid #0ea5e9", paddingLeft: 16, fontSize: 22, fontStyle: "italic", color: "#f1f5f9", margin: "0 0 32px 0" }}>
          "I don't want to look back one day and realize I forgot what it felt like."
        </blockquote>
        <p style={{ maxWidth: 768, fontSize: 14, lineHeight: 1.8, color: "#cbd5e1" }}>
          Life moves fast. People change, places fade, and feelings dim. Capturing moments isn't professional perfection — it's a personal promise to remember what matters.
        </p>
      </section>

      {/* MEANING */}
      <section id="meaning" style={{ background: "rgba(15,23,42,0.7)", padding: "80px 0" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {[
            { word: "aiko", pos: "noun", desc: <>Japanese origin — meaning <em style={{ color: "#7dd3fc" }}>love</em> and <em style={{ color: "#7dd3fc" }}>child</em>. Aikonics is intimacy in motion.</>, sub: "Japanese · 愛子" },
            { word: "journey", pos: "noun", desc: "The act of traveling through places, time, and emotion — a slow unfolding of life held close.", sub: "Old French · journée" },
          ].map(({ word, pos, desc, sub }) => (
            <div key={word} style={{ borderRadius: 16, border: "1px solid #1e293b", padding: 32 }}>
              <h3 style={{ fontSize: 64, fontWeight: 300, color: "#f1f5f9", margin: 0 }}>{word}</h3>
              <p style={{ marginTop: 8, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#94a3b8" }}>{pos}</p>
              <p style={{ marginTop: 16, fontSize: 14, lineHeight: 1.8, color: "#cbd5e1" }}>{desc}</p>
              <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#64748b" }}>{sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" style={{ maxWidth: 1152, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: 40, fontWeight: 300, color: "#f1f5f9", margin: 0 }}>Captured Moments</h2>
          <a
            href="#"
            onClick={e => { e.preventDefault(); setPage("gallery"); window.scrollTo(0, 0); }}
            style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#7dd3fc"}
            onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}
          >
            View all
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {VIDEOS.slice(0, 6).map(v => <VideoCard key={v.slug} v={v} />)}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ maxWidth: 1152, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div>
            <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#64748b" }}>About</span>
            <h2 style={{ marginTop: 16, fontSize: 48, fontWeight: 300, color: "#f1f5f9", lineHeight: 1.2 }}>
              Just someone<br />who loves<br />
              <em style={{ color: "#7dd3fc" }}>being present.</em>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 14, lineHeight: 1.8, color: "#cbd5e1" }}>
            <p style={{ margin: 0 }}>I'm not a professional filmmaker. I pick up a camera because I am afraid of forgetting the light, the smell, the feeling. Aikonics Journey is my personal archive.</p>
            <p style={{ margin: 0 }}>Moments are easier to remember when they are shared. This site is a daily reminder to keep showing up for the small things.</p>
            <a
              href="#"
              style={{ width: "max-content", display: "inline-flex", alignItems: "center", gap: 12, borderRadius: 9999, border: "1px solid #475569", padding: "12px 24px", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7dd3fc", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(14,165,233,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function GalleryPage({ setPage }) {
  return (
    <section style={{ maxWidth: 1152, margin: "0 auto", padding: "80px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 48 }}>
        <div>
          <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#64748b" }}>Complete archive</span>
          <h1 style={{ fontSize: 56, fontWeight: 300, color: "#f1f5f9", marginTop: 8, lineHeight: 1.1 }}>All Moments</h1>
        </div>
        <a
          href="#"
          onClick={e => { e.preventDefault(); setPage("home"); window.scrollTo(0, 0); }}
          style={{ borderRadius: 9999, border: "1px solid #64748b", padding: "12px 24px", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#f1f5f9", textDecoration: "none", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#7dd3fc"; e.currentTarget.style.color = "#7dd3fc"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#64748b"; e.currentTarget.style.color = "#f1f5f9"; }}
        >
          ← Back
        </a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {VIDEOS.map(v => <VideoCard key={v.slug} v={v} />)}
      </div>
    </section>
  );
}

export default function Home() {
  const [page, setPage] = useState("home");

  return (
    <main style={{ minHeight: "100vh", background: "#020617", color: "#f1f5f9", fontFamily: "Georgia, serif" }}>
      <Header page={page} setPage={setPage} />
      {page === "home" ? <HomePage setPage={setPage} /> : <GalleryPage setPage={setPage} />}
      <Footer page={page} setPage={setPage} />
    </main>
  );
}