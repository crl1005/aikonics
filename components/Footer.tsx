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
    <footer className="border-t border-amber-900/20 bg-[#080603]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <button onClick={() => { setPage("home"); window.scrollTo(0, 0); }} className="flex flex-col items-start leading-none group">
          <span className="font-serif text-lg text-amber-100 group-hover:text-amber-300 transition-colors duration-300">Aikonics</span>
          <span className="text-[9px] tracking-[0.35em] uppercase text-amber-800 group-hover:text-amber-600 transition-colors duration-300">Journey</span>
        </button>
        <div className="flex items-center gap-8">
          <button onClick={() => scrollTo("#work")} className="text-[10px] tracking-[0.2em] uppercase text-stone-500 hover:text-amber-400 transition-colors">Moments</button>
          <button onClick={() => scrollTo("#about")} className="text-[10px] tracking-[0.2em] uppercase text-stone-500 hover:text-amber-400 transition-colors">About</button>
          <button onClick={() => { setPage("contact"); window.scrollTo(0, 0); }} className="text-[10px] tracking-[0.2em] uppercase text-stone-500 hover:text-amber-400 transition-colors">Contact</button>
        </div>
        <p className="text-[10px] tracking-widest text-stone-700 m-0">© 2026 Aikonics Journey</p>
      </div>
    </footer>
  );
}