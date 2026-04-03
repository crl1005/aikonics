'use client';

import VideoCard from "@/components/VideoCard";
import { VIDEOS } from "@/data";
import type { Page } from "@/types";

interface HomePageProps {
  setPage: (page: Page) => void;
}

export default function HomePage({ setPage }: HomePageProps) {
  return (
    <>
      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen md:min-h-[80vh] flex flex-col md:grid md:grid-cols-2">
        <div className="relative z-10 flex flex-col gap-6 bg-slate-950/80 md:bg-slate-950 px-8 md:px-12 py-20">
          <span className="text-[11px] tracking-[0.2em] uppercase text-slate-500">
            A personal archive
          </span>
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-light leading-tight text-slate-100 m-0">
            Every<br />moment<br />
            <em className="text-sky-300 not-italic">matters.</em>
          </h1>
          <p className="max-w-sm text-sm leading-7 text-slate-300 m-0">
            Life is built from small, meaningful moments. I capture them, polish them,
            and keep them alive so they remain with us.
          </p>
          <a href="#work" className="w-max rounded-full border border-slate-500 px-6 py-3 text-[11px] tracking-[0.15em] uppercase text-slate-100 transition-all duration-200 hover:border-sky-300 hover:text-sky-300">
            See the moments
          </a>
        </div>
        <div className="absolute inset-0 md:relative md:inset-auto overflow-hidden">
          <img
            src="/images/aiko.png"
            alt="A captured moment"
            className="w-full h-full object-cover opacity-60 md:opacity-80 transition-opacity duration-1000 hover:opacity-100"
            style={{ objectPosition: 'right top' }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent" />
        </div>
      </section>

      {/* ── INTRO ── */}
      <section id="intro" className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="mb-8 text-[11px] tracking-[0.2em] uppercase text-slate-500">
          Why I do this
        </div>
        <blockquote className="border-l-4 border-sky-500 pl-4 text-xl md:text-2xl italic text-slate-100 m-0 mb-8">
          "I don't want to look back one day and realize I forgot what it felt like."
        </blockquote>
        <p className="max-w-3xl text-sm leading-7 text-slate-300">
          Life moves fast. People change, places fade, and feelings dim. Capturing moments
          isn't professional perfection — it's a personal promise to remember what matters.
        </p>
      </section>

      {/* ── MEANING ── */}
      <section id="meaning" className="bg-slate-900/70 py-16 md:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-10">
          {[
            {
              word: "aiko",
              pos: "noun",
              desc: (
                <>
                  Japanese origin — meaning{" "}
                  <em className="text-sky-300">love</em> and{" "}
                  <em className="text-sky-300">child</em>. Aikonics is intimacy in motion.
                </>
              ),
              sub: "Japanese · 愛子",
            },
            {
              word: "journey",
              pos: "noun",
              desc: "The act of traveling through places, time, and emotion — a slow unfolding of life held close.",
              sub: "Old French · journée",
            },
          ].map(({ word, pos, desc, sub }) => (
            <div key={word} className="rounded-2xl border border-slate-800 p-6 md:p-8">
              <h3 className="font-serif text-5xl md:text-6xl font-light text-slate-100 m-0">{word}</h3>
              <p className="mt-2 text-[11px] tracking-[0.15em] uppercase text-slate-400">{pos}</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">{desc}</p>
              <span className="text-[11px] tracking-[0.2em] uppercase text-slate-500">{sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── WORK ── */}
      <section id="work" className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-slate-100 m-0">Captured Moments</h2>
          
           <a href="#"
            onClick={e => { e.preventDefault(); setPage("gallery"); window.scrollTo(0, 0); }}
            className="text-[11px] tracking-[0.15em] uppercase text-slate-400 no-underline transition-colors duration-200 hover:text-sky-300"
          >
            View all
          </a>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.slice(0, 6).map(v => (
            <VideoCard key={v.slug} v={v} />
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <span className="text-[11px] tracking-[0.2em] uppercase text-slate-500">About</span>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl font-light text-slate-100 leading-tight">
              Just someone<br />who loves<br />
              <em className="text-sky-300 not-italic">being present.</em>
            </h2>
          </div>
          <div className="flex flex-col gap-4 text-sm leading-7 text-slate-300">
            <p className="m-0">
              I'm not a professional filmmaker. I pick up a camera because I am afraid of
              forgetting the light, the smell, the feeling. Aikonics Journey is my personal archive.
            </p>
            <p className="m-0">
              Moments are easier to remember when they are shared. This site is a daily reminder
              to keep showing up for the small things.
            </p>
            <a href="#" className="w-max inline-flex items-center gap-3 rounded-full border border-slate-600 px-6 py-3 text-[11px] tracking-[0.15em] uppercase text-sky-300 no-underline transition-colors duration-200 hover:bg-sky-500/15">
              Get in touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}