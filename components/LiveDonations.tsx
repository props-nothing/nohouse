"use client";

import { useEffect, useRef, useState } from "react";
import type { DonationsSnapshot } from "@/lib/donations";

type Props = {
  initial: DonationsSnapshot;
};

const solFmt = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 4,
});
const usdFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatRelative(iso: string, now: number): string {
  const diff = Math.max(0, now - new Date(iso).getTime());
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default function LiveDonations({ initial }: Props) {
  const [data, setData] = useState<DonationsSnapshot>(initial);
  const [pulse, setPulse] = useState(false);
  const [now, setNow] = useState<number>(() => Date.now());
  const lastTotal = useRef(initial.totalSol);

  useEffect(() => {
    let cancelled = false;
    async function poll() {
      try {
        const res = await fetch("/api/donations", { cache: "no-store" });
        if (!res.ok) return;
        const next: DonationsSnapshot = await res.json();
        if (cancelled) return;
        if (next.totalSol !== lastTotal.current) {
          setPulse(true);
          window.setTimeout(() => setPulse(false), 1500);
          lastTotal.current = next.totalSol;
        }
        setData(next);
      } catch {
        // silently ignore network blips
      }
    }
    const id = window.setInterval(poll, 60_000);
    const tick = window.setInterval(() => setNow(Date.now()), 1000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
      window.clearInterval(tick);
    };
  }, []);

  return (
    <div className="relative">
      {/* Header card */}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-coral" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
              Live donations (soon: donate.gg API)
            </span>
          </div>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            Real SOL. Real shelters. Updated every minute.
          </h2>
          <p className="mt-5 max-w-xl text-ink-soft">
            Trading rewards from $nohouse on pump.fun are split{" "}
            <span className="font-semibold text-ink">20% each</span> to five
            charities via donate.gg. Below is the running total —
            auto-refreshing.
          </p>
        </div>

        <div
          className={`relative overflow-hidden rounded-3xl border border-ink/10 bg-white/80 p-7 backdrop-blur transition ${
            pulse ? "ring-2 ring-coral/60" : ""
          }`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-coral/30 blur-2xl"
          />
          <div className="relative">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
              Total donated
            </div>
            <div className="mt-3 flex items-baseline gap-3">
              <div className="text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
                {solFmt.format(data.totalSol)}
              </div>
              <div className="text-lg font-semibold text-ember">SOL</div>
            </div>
            <div className="mt-2 text-lg font-medium text-ink-soft">
              ≈ {usdFmt.format(data.totalUsd)}
            </div>
            <div className="mt-5 flex items-center gap-2 text-xs text-ink-soft">
              <DotIcon />
              Updated {formatRelative(data.updatedAt, now)} · auto-refresh 60s
            </div>
          </div>
        </div>
      </div>

      {/* Charity rows */}
      <ul className="mt-10 grid gap-3">
        {data.charities.map((c, i) => (
          <li
            key={c.id}
            className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-white/70 p-5 backdrop-blur transition hover:bg-white sm:p-6"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex min-w-0 flex-1 items-start gap-4">
                <span
                  aria-hidden
                  className="grid size-11 flex-none place-items-center rounded-xl bg-ink text-cream"
                >
                  <HeartIcon />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate text-base font-semibold text-ink hover:underline sm:text-lg"
                    >
                      {c.name}
                    </a>
                    <span className="inline-flex items-center gap-1 rounded-full bg-coral/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-ember">
                      Charity
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-ink-soft">{c.location}</div>

                  {/* Allocation progress bar */}
                  <div className="mt-3 flex items-center gap-3">
                    <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-coral to-ember"
                        style={{ width: `${c.percent}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-ink-soft">
                      {c.percent}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:justify-center sm:text-right">
                <div>
                  <div className="font-mono text-lg font-semibold tracking-tight text-ink tabular-nums sm:text-xl">
                    {solFmt.format(c.donatedSol)} SOL
                  </div>
                  <div className="text-xs text-ink-soft tabular-nums">
                    ≈ {usdFmt.format(c.donatedUsd)}
                  </div>
                </div>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center justify-center rounded-full border border-ink/15 bg-white px-4 text-xs font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-cream"
                >
                  View
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="h-5 w-5"
    >
      <path d="M12 21s-7.5-4.5-9.5-9.5C1.2 8.2 3.4 5 6.5 5c1.9 0 3.5 1 4.5 2.4l1 1.3 1-1.3C14 6 15.6 5 17.5 5 20.6 5 22.8 8.2 21.5 11.5 19.5 16.5 12 21 12 21Z" />
    </svg>
  );
}

function DotIcon() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-70" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-coral" />
    </span>
  );
}
