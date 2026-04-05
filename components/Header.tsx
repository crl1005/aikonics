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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-[#080603]/95 backdrop-blur-xl border-b border-amber-900/20 py-3" : "bg-transparent py-6"
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10">
        <button onClick={() => goTo("home")} className="flex flex-col items-start leading-none group">
          <span className="font-serif text-xl text-amber-100 group-hover:text-amber-300 transition-colors duration-300">Aikonics</span>
          <span className="text-[9px] tracking-[0.35em] uppercase text-amber-700 group-hover:text-amber-500 transition-colors duration-300">Journey</span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo("#work")} className="text-[11px] tracking-[0.2em] uppercase text-stone-400 hover:text-amber-200 transition-colors">Moments</button>
          <button onClick={() => scrollTo("#about")} className="text-[11px] tracking-[0.2em] uppercase text-stone-400 hover:text-amber-200 transition-colors">About</button>
          <button onClick={() => goTo("contact")} className={`text-[11px] tracking-[0.2em] uppercase transition-colors ${page === "contact" ? "text-amber-400" : "text-stone-400 hover:text-amber-200"}`}>Contact</button>
        </nav>

        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-5 h-px bg-amber-200 transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-5 h-px bg-amber-200 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-amber-200 transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#080603]/98 backdrop-blur-xl border-t border-amber-900/20 px-6 py-6 flex flex-col gap-5">
          <button onClick={() => scrollTo("#work")} className="text-left text-[12px] tracking-[0.25em] uppercase text-stone-300 hover:text-amber-300 transition-colors">Moments</button>
          <button onClick={() => scrollTo("#about")} className="text-left text-[12px] tracking-[0.25em] uppercase text-stone-300 hover:text-amber-300 transition-colors">About</button>
          <button onClick={() => goTo("contact")} className="text-left text-[12px] tracking-[0.25em] uppercase text-stone-300 hover:text-amber-300 transition-colors">Contact</button>
        </div>
      )}
    </header>
  );
}