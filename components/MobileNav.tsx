"use client";

import { useEffect, useState } from "react";

type Link = { href: string; label: string; external?: boolean };

const SECTIONS: Link[] = [
  { href: "#mission", label: "Mission" },
  { href: "#donations", label: "Donations" },
  { href: "#how", label: "How it works" },
  { href: "#projects", label: "Projects" },
  { href: "#token", label: "Token" },
];

export default function MobileNav({
  pumpfunUrl,
  xAccountUrl,
  xCommunityUrl,
}: {
  pumpfunUrl: string;
  xAccountUrl: string;
  xCommunityUrl: string;
}) {
  const [open, setOpen] = useState(false);

  // Close on Escape; lock scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white/70 text-ink backdrop-blur transition hover:bg-white md:hidden"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
          <path
            d="M4 7h16M4 12h16M4 17h16"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Overlay */}
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm transition-opacity md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-cream shadow-2xl shadow-ink/30 transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="text-lg font-semibold tracking-tight">
            <span className="text-coral">$</span>nohouse
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white/70 text-ink transition hover:bg-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              aria-hidden
            >
              <path
                d="M6 6l12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-4 pb-2">
          {SECTIONS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-lg font-semibold text-ink transition hover:bg-white/60"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t border-ink/10 px-6 pb-8 pt-6">
          <a
            href={pumpfunUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-5 text-base font-semibold text-cream shadow-lg shadow-ink/10 transition hover:bg-ember"
          >
            Buy $nohouse
          </a>
          <div className="flex gap-3">
            <a
              href={xAccountUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-ink/15 bg-white/70 text-base font-semibold text-ink transition hover:bg-white"
            >
              <XSvg className="h-4 w-4" />
              @nohousecoin
            </a>
            <a
              href={xCommunityUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-ink/15 bg-white/70 text-base font-semibold text-ink transition hover:bg-white"
            >
              <XSvg className="h-4 w-4" />
              Community
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function XSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.84l-5.36-6.83L4.6 22H1.34l8.04-9.18L1 2h7.02l4.84 6.23L18.244 2Zm-1.2 18h1.86L7.04 4H5.06l11.984 16Z" />
    </svg>
  );
}
