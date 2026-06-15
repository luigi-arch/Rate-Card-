"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

const LINKS = [
  { href: "#approach", label: "Approach" },
  { href: "#headaches", label: "Find your fix" },
  { href: "#formats", label: "Formats" },
  { href: "#pricing", label: "Pricing" },
  { href: "#work", label: "Work" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-ink text-white transition-shadow duration-300 ${
        scrolled ? "border-b border-white/10 shadow-lg" : "border-b border-white/5"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label="SideStreet home">
          <Logo size={30} />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-gold px-5 py-2 text-sm font-bold text-black transition-transform hover:scale-[1.03]"
          >
            Start a project
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-white transition-transform ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-white transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-white transition-transform ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-ink px-5 pb-6 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-semibold text-white/70 hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gold px-5 py-3 text-center text-sm font-bold text-black"
            >
              Start a project
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
