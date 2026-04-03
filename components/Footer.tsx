'use client';

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import type { Page } from "@/types";

interface FooterProps {
  page: Page;
  setPage: (page: Page) => void;
}

export default function Footer({ page, setPage }: FooterProps) {
  return (
    <footer id="contact" className="border-t border-slate-800 bg-[rgba(15,23,42,0.9)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-10 py-4">
        <Logo onClick={() => { setPage("home"); window.scrollTo(0, 0); }} />
        <nav>
          <NavLinks page={page} setPage={setPage} />
        </nav>
        <p className="text-[11px] tracking-widest text-slate-500 m-0">
          © 2026 Aikonics Journey
        </p>
      </div>
    </footer>
  );
}
