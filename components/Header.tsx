'use client';

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import type { Page } from "@/types";

interface HeaderProps {
  page: Page;
  setPage: (page: Page) => void;
}

export default function Header({ page, setPage }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[rgba(2,6,23,0.92)] backdrop-blur-xl border-b border-slate-800 w-full">
      <div className="flex items-center justify-between px-10 py-5">
        <Logo onClick={() => { setPage("home"); window.scrollTo(0, 0); }} />
        <nav>
          <NavLinks page={page} setPage={setPage} />
        </nav>
      </div>
    </header>
  );
}