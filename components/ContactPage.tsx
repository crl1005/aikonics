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

  // Load EmailJS script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.async = true;
    script.onload = () => {
      (window as any).emailjs.init("qEU-0DmLXKuNoME6V");
    };
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus("sending");
    try {
      await (window as any).emailjs.send(
        "service_90wrkcq",
        "template_iij258t",
        { from_name: name, from_email: email, message, to_email: "aiko.esguerra@gmail.com" }
      );
      setStatus("success");
      setName(""); setEmail(""); setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-[#080603] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="mb-20">
          <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700 mb-4">Get in touch</p>
          <h1 className="font-serif text-6xl md:text-7xl font-light text-amber-50 leading-tight">
            Let's talk<br /><em className="not-italic text-amber-400">about moments.</em>
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* Left — info */}
          <div className="flex flex-col gap-12">
            <p className="text-sm leading-8 text-stone-400">
              Whether you want to share a memory, collaborate, or just say hello — I'd love to hear from you.
              Every conversation starts with a moment.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700">Email</p>
                <a href="mailto:aiko.esguerra@gmail.com" className="text-sm text-stone-300 hover:text-amber-300 transition-colors">
                  aiko.esguerra@gmail.com
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700">Based in</p>
                <p className="text-sm text-stone-400">Philippines</p>
              </div>
            </div>

            <div className="border-t border-amber-900/20 pt-8">
              <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700 mb-4">Response time</p>
              <p className="text-sm text-stone-500">Usually within 24–48 hours.</p>
            </div>
          </div>

          {/* Right — form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[0.3em] uppercase text-stone-600">Your name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="What should I call you?"
                required
                disabled={status === "sending"}
                className="w-full bg-transparent border-b border-stone-800 py-3 text-sm text-amber-100 placeholder-stone-700 outline-none focus:border-amber-700 transition-colors disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[0.3em] uppercase text-stone-600">Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === "sending"}
                className="w-full bg-transparent border-b border-stone-800 py-3 text-sm text-amber-100 placeholder-stone-700 outline-none focus:border-amber-700 transition-colors disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[0.3em] uppercase text-stone-600">Message</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Tell me about a moment…"
                required
                rows={5}
                disabled={status === "sending"}
                className="w-full bg-transparent border-b border-stone-800 py-3 text-sm text-amber-100 placeholder-stone-700 outline-none focus:border-amber-700 transition-colors resize-none disabled:opacity-50"
              />
            </div>

            {/* Status messages */}
            {status === "success" && (
              <div className="flex items-center gap-3 text-sm text-emerald-400 border border-emerald-800/40 rounded-xl px-4 py-3 bg-emerald-500/5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Message sent! I'll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-3 text-sm text-red-400 border border-red-800/40 rounded-xl px-4 py-3 bg-red-500/5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 5v4M8 11v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/></svg>
                Something went wrong. Please try emailing directly.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending" || !name.trim() || !email.trim() || !message.trim()}
              className="w-max inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-amber-400 border border-amber-800/60 rounded-full px-8 py-4 hover:border-amber-500 hover:bg-amber-500/5 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
            >
              {status === "sending" ? (
                <>
                  <svg className="animate-spin" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6"/>
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}