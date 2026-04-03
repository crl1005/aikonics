'use client';

import { useState } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import type { Page } from "@/types";

interface HeaderProps {
  page: Page;
  setPage: (page: Page) => void;
}

export default function Header({ page, setPage }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[rgba(2,6,23,0.92)] backdrop-blur-xl border-b border-slate-800 w-full">
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        <Logo onClick={() => { setPage("home"); window.scrollTo(0, 0); }} />
        {/* Desktop nav */}
        <nav className="hidden md:block">
          <NavLinks page={page} setPage={setPage} />
        </nav>
        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-400 hover:text-slate-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="text-2xl">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 border-t border-slate-800">
          <NavLinks page={page} setPage={(p) => { setPage(p); setMenuOpen(false); }} />
        </div>
      )}
    </header>
  );
}