'use client';

import type { Page } from "@/types";

interface FooterProps {
  page: Page;
  setPage: (page: Page) => void;
}

export default function Footer({ page, setPage }: FooterProps) {
  function scrollTo(href: string) {
    if (page !== "home") {
      setPage("home");
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 120);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400&display=swap');
        .footer-root { font-family: 'DM Sans', sans-serif; }
        .footer-logo { font-family: 'Cormorant Garamond', serif; }
        .footer-link {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #8a7055;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
          padding: 0;
        }
        .footer-link:hover { color: #2c1f0e; }
        .footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 40px 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        .footer-nav {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .footer-copy {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: #b8a88a;
          margin: 0;
        }
        @media (max-width: 640px) {
          .footer-inner {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 36px 24px;
            gap: 24px;
          }
          .footer-nav { gap: 20px; }
        }
      `}</style>

      <footer className="footer-root" style={{ background: '#ede7db', borderTop: '1px solid #d6c9b4' }}>
        <div className="footer-inner">
          <button
            onClick={() => { setPage("home"); window.scrollTo(0, 0); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
          >
            <div className="footer-logo" style={{ fontSize: '1.2rem', fontWeight: 300, color: '#2c1f0e', lineHeight: 1 }}>Aikonic</div>
            <div style={{ fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#b8936a', marginTop: '2px' }}>Journey</div>
          </button>

          <div className="footer-nav">
            <button className="footer-link" onClick={() => scrollTo("#work")}>Moments</button>
            <button className="footer-link" onClick={() => scrollTo("#about")}>About</button>
            <button className="footer-link" onClick={() => { setPage("contact"); window.scrollTo(0, 0); }}>Contact</button>
          </div>

          <p className="footer-copy">© 2026 Aikonics Journey</p>
        </div>
      </footer>
    </>
  );
}