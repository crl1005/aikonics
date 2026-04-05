'use client';

import { useState, useEffect } from "react";
import type { Page } from "@/types";

interface HeaderProps {
  page: Page;
  setPage: (page: Page) => void;
}

export default function Header({ page, setPage }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(href: string) {
    setMenuOpen(false);
    if (page !== "home") {
      setPage("home");
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 120);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function goTo(p: Page) {
    setMenuOpen(false);
    setPage(p);
    window.scrollTo(0, 0);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400&display=swap');
        .header-root { font-family: 'DM Sans', sans-serif; }
        .header-logo-text { font-family: 'Cormorant Garamond', serif; }
        .nav-btn {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #6b5a45;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 0;
          transition: color 0.2s;
          position: relative;
        }
        .nav-btn::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 1px;
          background: #b8936a;
          transform: scaleX(0);
          transition: transform 0.25s ease;
          transform-origin: left;
        }
        .nav-btn:hover { color: #2c1f0e; }
        .nav-btn:hover::after { transform: scaleX(1); }
        .nav-btn.active { color: #b8936a; }
        .nav-btn.active::after { transform: scaleX(1); }
        .header-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .desktop-nav { display: flex; align-items: center; gap: 36px; }
        .hamburger { display: none !important; }
        .mobile-menu-nav .nav-btn { font-size: 13px; }

        @media (max-width: 768px) {
          .header-inner { padding: 0 24px; }
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; flex-direction: column; gap: 5px; }
        }
      `}</style>

      <header
        className="header-root"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
          transition: 'all 0.4s ease',
          background: scrolled ? 'rgba(245,240,232,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,185,154,0.4)' : '1px solid transparent',
          padding: scrolled ? '14px 0' : '24px 0',
        }}
      >
        <div className="header-inner">
          {/* Logo */}
          <button onClick={() => goTo("home")} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
            <div className="header-logo-text" style={{ fontSize: '1.35rem', fontWeight: 300, color: '#2c1f0e', lineHeight: 1, letterSpacing: '0.01em' }}>Aikonic</div>
            <div style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#b8936a', marginTop: '2px' }}>Journey</div>
          </button>

          {/* Desktop nav */}
          <nav className="desktop-nav">
            <button className="nav-btn" onClick={() => scrollTo("#work")}>Moments</button>
            <button className="nav-btn" onClick={() => scrollTo("#about")}>About</button>
            <button className={`nav-btn ${page === 'contact' ? 'active' : ''}`} onClick={() => goTo("contact")}>Contact</button>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            <span style={{ display: 'block', width: '22px', height: '1px', background: '#2c1f0e', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '1px', background: '#2c1f0e', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '22px', height: '1px', background: '#2c1f0e', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu-nav" style={{
            background: 'rgba(245,240,232,0.98)', backdropFilter: 'blur(16px)',
            borderTop: '1px solid rgba(201,185,154,0.4)',
            padding: '28px 24px',
            display: 'flex', flexDirection: 'column', gap: '24px',
          }}>
            <button className="nav-btn" onClick={() => scrollTo("#work")}>Moments</button>
            <button className="nav-btn" onClick={() => scrollTo("#about")}>About</button>
            <button className="nav-btn" onClick={() => goTo("contact")}>Contact</button>
          </div>
        )}
      </header>
    </>
  );
}