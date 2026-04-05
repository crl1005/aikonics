'use client';

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/components/HomePage";
import GalleryPage from "@/components/GalleryPage";
import ContactPage from "@/components/ContactPage";
import type { Page } from "@/types";

export default function ClientHome() {
  const [page, setPage]       = useState<Page>("home");
  const [scrollY, setScrollY] = useState(0);

  const navigate = useCallback((p: Page) => {
    if (p === "gallery") setScrollY(window.scrollY);
    setPage(p);
    window.scrollTo(0, 0);
  }, []);

  const goHome = useCallback((y = 0) => {
    setPage("home");
    setTimeout(() => window.scrollTo({ top: y, behavior: "instant" }), 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#080603] text-amber-50">
      <Header page={page} setPage={navigate} />
      {page === "home"    && <HomePage    setPage={navigate} />}
      {page === "gallery" && <GalleryPage setPage={goHome as any} scrollY={scrollY} />}
      {page === "contact" && <ContactPage setPage={navigate} />}
      <Footer page={page} setPage={navigate} />
    </main>
  );
}