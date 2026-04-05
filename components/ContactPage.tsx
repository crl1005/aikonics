'use client';

import { useState, useEffect } from "react";
import type { Page } from "@/types";

interface ContactPageProps {
  setPage: (page: Page) => void;
}

type Status = "idle" | "sending" | "success" | "error";

export default function ContactPage({ setPage }: ContactPageProps) {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus]   = useState<Status>("idle");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.async = true;
    script.onload = () => { (window as any).emailjs.init("qEU-0DmLXKuNoME6V"); };
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus("sending");
    try {
      await (window as any).emailjs.send(
        "service_90wrkcq", "template_iij258t",
        { from_name: name, from_email: email, message, to_email: "aiko.esguerra@gmail.com" }
      );
      setStatus("success");
      setName(""); setEmail(""); setMessage("");
    } catch { setStatus("error"); }
  }

  const baseInput: React.CSSProperties = {
    width: '100%', background: 'transparent', border: 'none',
    borderBottom: '1px solid #c9b99a', padding: '12px 0',
    fontSize: '0.875rem', color: '#2c1f0e', outline: 'none',
    fontFamily: 'DM Sans, sans-serif', transition: 'border-color 0.2s',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Sans:wght@300;400&display=swap');
        .c-serif { font-family: 'Cormorant Garamond', serif; }
        .c-root  { font-family: 'DM Sans', sans-serif; }
        .c-field::placeholder { color: #c9b99a; }
        .c-field:focus { border-bottom-color: #b8936a !important; }
        .c-btn {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
          color: #2c1f0e; border: 1px solid #2c1f0e; border-radius: 999px;
          padding: 14px 28px; background: transparent; cursor: pointer;
          transition: all 0.3s; font-family: 'DM Sans', sans-serif;
        }
        .c-btn:hover:not(:disabled) { background: #2c1f0e; color: #f5f0e8; }
        .c-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }

        .contact-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 56px;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .contact-inner { padding: 0 24px; }
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
      `}</style>

      <div className="c-root" style={{ minHeight: '100vh', background: '#f5f0e8', paddingTop: '128px', paddingBottom: '96px' }}>
        <div className="contact-inner">
          <div style={{ marginBottom: '64px' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#b8936a', marginBottom: '16px' }}>Get in touch</p>
            <h1 className="c-serif" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 300, color: '#2c1f0e', lineHeight: 0.95, margin: 0 }}>
              Let's talk<br /><em style={{ color: '#b8936a' }}>about moments.</em>
            </h1>
          </div>

          <div className="contact-grid">
            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.9, color: '#7a6650', margin: 0 }}>
                Whether you want to share a memory, collaborate, or just say hello — I'd love to hear from you. Every conversation starts with a moment.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <p style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8936a', marginBottom: '6px' }}>Email</p>
                  <a href="mailto:aiko.esguerra@gmail.com" style={{ fontSize: '0.875rem', color: '#2c1f0e', textDecoration: 'none' }}>aiko.esguerra@gmail.com</a>
                </div>
                <div>
                  <p style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8936a', marginBottom: '6px' }}>Based in</p>
                  <p style={{ fontSize: '0.875rem', color: '#7a6650', margin: 0 }}>Philippines</p>
                </div>
              </div>
              <div style={{ borderTop: '1px solid #d6c9b4', paddingTop: '28px' }}>
                <p style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8936a', marginBottom: '8px' }}>Response time</p>
                <p style={{ fontSize: '0.875rem', color: '#b8a88a', margin: 0 }}>Usually within 24–48 hours.</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {[
                { label: 'Your name', type: 'text', val: name, set: setName, ph: 'What should I call you?' },
                { label: 'Email address', type: 'email', val: email, set: setEmail, ph: 'your@email.com' },
              ].map(({ label, type, val, set, ph }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8a88a' }}>{label}</label>
                  <input type={type} value={val} onChange={e => set(e.target.value)} placeholder={ph} required
                    disabled={status === "sending"} className="c-field" style={baseInput} />
                </div>
              ))}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8a88a' }}>Message</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell me about a moment…"
                  required rows={5} disabled={status === "sending"} className="c-field"
                  style={{ ...baseInput, resize: 'none' }} />
              </div>

              {status === "success" && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: '#5a8a6a', border: '1px solid #a8c9b4', borderRadius: '10px', padding: '12px 16px', background: 'rgba(168,201,180,0.12)' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Message sent! I'll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: '#c0392b', border: '1px solid #e8b4a8', borderRadius: '10px', padding: '12px 16px', background: 'rgba(192,57,43,0.06)' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 5v4M8 11v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/></svg>
                  Something went wrong. Please try emailing directly.
                </div>
              )}

              <button type="submit" className="c-btn" disabled={status === "sending" || !name.trim() || !email.trim() || !message.trim()}>
                {status === "sending" ? (
                  <><svg className="spin" width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6"/></svg>Sending…</>
                ) : (
                  <>Send message<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}