'use client';

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/components/HomePage";
import GalleryPage from "@/components/GalleryPage";
import type { Page } from "@/types";

export default function Home() {
  const [page, setPage] = useState<Page>("home");

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Header page={page} setPage={setPage} />
      {page === "home"
        ? <HomePage setPage={setPage} />
        : <GalleryPage setPage={setPage} />
      }
      <Footer page={page} setPage={setPage} />
    </main>
  );
}
