import LiveDonations from "@/components/LiveDonations";
import { getDonationsSnapshot } from "@/lib/donations";

const PUMPFUN_URL =
  "https://pump.fun/coin/4QVHxosURyMsrNGDWBZX6V3nKrRhp5a5uW9vMirjpump";
const DONATE_GG_URL = "https://www.donate.gg/";
const TOKEN_MINT = "4QVHxosURyMsrNGDWBZX6V3nKrRhp5a5uW9vMirjpump";

const charities = [
  {
    name: "Shelter, Inc.",
    location: "Concord, California",
    blurb:
      "Preventing and ending homelessness for low-income families across the Bay Area through housing, services and dignity.",
    url: "https://shelterinc.org/",
    accent: "from-rose to-coral",
  },
  {
    name: "Brisben Center",
    location: "Fredericksburg, Virginia",
    blurb:
      "An emergency shelter providing safe housing, meals and a path to self-sufficiency for individuals and families.",
    url: "https://brisbencenter.org/",
    accent: "from-peach to-rose",
  },
  {
    name: "Yankton Pathways",
    location: "Yankton, South Dakota",
    blurb:
      "Pathways to Hope: emergency shelter, transitional housing and supportive services for families experiencing homelessness.",
    url: "https://www.yanktonpathways.org/",
    accent: "from-mint to-sky",
  },
  {
    name: "Good Neighbor Settlement House",
    location: "Brownsville, Texas",
    blurb:
      "Feeding the hungry, sheltering the unhoused and walking with neighbors toward stability — every single day.",
    url: "https://goodneighborshelter.org/",
    accent: "from-sky to-rose",
  },
  {
    name: "St. John's Homeless Shelter",
    location: "Green Bay, Wisconsin",
    blurb:
      "An overnight shelter and day resource center offering warmth, safety and hope through the long Wisconsin winters.",
    url: "https://stjohnsgreenbay.org/",
    accent: "from-coral to-peach",
  },
];

const steps = [
  {
    n: "01",
    title: "Trade $nohouse on pump.fun",
    body: "Every buy and sell generates creator rewards on Solana. Liquidity stays open, transparent and on-chain.",
  },
  {
    n: "02",
    title: "100% of rewards collected",
    body: "All trading rewards earned by the $nohouse creator wallet are pooled into a public charity treasury.",
  },
  {
    n: "03",
    title: "Routed through donate.gg",
    body: "Funds are distributed to vetted, registered shelters via donate.gg — receipts on-chain, impact off-chain.",
  },
];

export default async function Home() {
  const snapshot = await getDonationsSnapshot();
  return (
    <div className="relative w-full overflow-hidden bg-aurora">
      <div className="grain absolute inset-0" aria-hidden />

      {/* Floating decorative blobs */}
      <div
        aria-hidden
        className="float-slower absolute -top-32 -left-24 h-96 w-96 rounded-full bg-coral/30 blur-3xl"
      />
      <div
        aria-hidden
        className="float-slow absolute top-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-rose/40 blur-3xl"
      />
      <div
        aria-hidden
        className="float-slower absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-peach/40 blur-3xl"
      />

      <div className="relative z-10">
        {/* Nav */}
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
          <a
            href="#top"
            className="flex items-center gap-2 font-semibold tracking-tight"
          >
            <span
              aria-hidden
              className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-cream shadow-sm"
            >
              <HouseIcon className="h-5 w-5" />
            </span>
            <span className="text-lg">
              <span className="text-coral">$</span>nohouse
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-ink-soft md:flex">
            <a href="#mission" className="hover:text-ink">
              Mission
            </a>
            <a href="#donations" className="hover:text-ink">
              Donations
            </a>
            <a href="#how" className="hover:text-ink">
              How it works
            </a>
            <a href="#projects" className="hover:text-ink">
              Projects
            </a>
            <a href="#token" className="hover:text-ink">
              Token
            </a>
          </nav>
          <a
            href={PUMPFUN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pulse-glow inline-flex h-10 items-center justify-center rounded-full bg-ink px-4 text-sm font-semibold text-cream transition hover:bg-ember"
          >
            Buy $nohouse
          </a>
        </header>

        {/* Hero */}
        <section
          id="top"
          className="mx-auto flex w-full max-w-7xl flex-col items-center px-6 pb-16 pt-10 text-center sm:px-10 sm:pt-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-ink-soft backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-coral" />
            A charity memecoin on Solana
          </span>

          <h1 className="mt-7 max-w-5xl text-balance text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-7xl lg:text-[5.5rem]">
            Everyone deserves
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">a roof.</span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-1 -z-0 h-4 -skew-y-1 bg-coral/40 sm:bottom-2 sm:h-5"
              />
            </span>{" "}
            <span className="text-coral">$nohouse</span> builds them.
          </h1>

          <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-ink-soft sm:text-xl">
            100% of trading rewards from{" "}
            <span className="font-semibold text-ink">$nohouse</span> on pump.fun
            are routed through{" "}
            <a
              href={DONATE_GG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ember underline decoration-coral/40 underline-offset-4 hover:decoration-coral"
            >
              donate.gg
            </a>{" "}
            to shelters fighting homelessness — transparent, on-chain, every
            trade.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={PUMPFUN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-base font-semibold text-cream shadow-lg shadow-ink/10 transition hover:-translate-y-0.5 hover:bg-ember"
            >
              Buy on pump.fun
              <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white/70 px-7 py-3.5 text-base font-semibold text-ink backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
            >
              See the shelters
            </a>
          </div>

          {/* Stats strip */}
          <div className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: "100%", v: "of rewards donated" },
              { k: "5", v: "vetted shelters" },
              { k: "0%", v: "team allocation" },
              { k: "On-chain", v: "transparency" },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-2xl border border-ink/10 bg-white/60 px-5 py-5 text-left backdrop-blur"
              >
                <div className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {s.k}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-ink-soft">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ticker */}
        <div className="relative mt-4 overflow-hidden border-y border-ink/10 bg-ink py-5 text-cream">
          <div className="ticker flex w-max gap-12 whitespace-nowrap text-2xl font-semibold tracking-tight sm:text-3xl">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-12 pr-12">
                {[
                  "A roof for everyone",
                  "★",
                  "Trade. Donate. Repeat.",
                  "★",
                  "100% of rewards → shelters",
                  "★",
                  "Built on Solana",
                  "★",
                  "Powered by donate.gg",
                  "★",
                ].map((t, j) => (
                  <span key={`${i}-${j}`} className="opacity-90">
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Live donations */}
        <section
          id="donations"
          className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-10"
        >
          <LiveDonations initial={snapshot} />
        </section>

        {/* Mission */}
        <section
          id="mission"
          className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 sm:px-10 lg:grid-cols-2"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
              The mission
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              A memecoin with a doormat,
              <br /> not a moonshot.
            </h2>
            <p className="mt-6 text-lg leading-8 text-ink-soft">
              On any given night, more than half a million people in the US
              sleep without a home. $nohouse turns the chaotic energy of
              memecoin trading into something quietly good: warm beds, hot meals
              and open doors.
            </p>
            <p className="mt-4 text-lg leading-8 text-ink-soft">
              No promises of price. No team bag. Just a transparent loop where
              every trade feeds a charity treasury — and that treasury feeds
              people.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-ink/10 bg-white/70 p-8 shadow-xl shadow-ink/5 backdrop-blur sm:p-10">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-coral text-cream">
                  <HeartIcon className="h-5 w-5" />
                </span>
                <h3 className="text-xl font-semibold tracking-tight">
                  Where the money goes
                </h3>
              </div>
              <ul className="mt-6 space-y-4 text-ink-soft">
                {[
                  "Emergency shelter beds for families and individuals.",
                  "Hot meals, hygiene kits and warm clothing for winter nights.",
                  "Transitional housing programs and case management.",
                  "Day centers, mental health support and job pathways.",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <CheckIcon className="mt-1 h-5 w-5 flex-none text-ember" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <a
                href={DONATE_GG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ember hover:text-coral"
              >
                Funds routed via donate.gg
                <ArrowIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how"
          className="relative mx-auto w-full max-w-7xl px-6 py-20 sm:px-10"
        >
          <div className="flex flex-col items-center text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
              How it works
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              Trade a memecoin. Build a shelter.
            </h2>
          </div>

          <ol className="mt-14 grid gap-6 sm:grid-cols-3">
            {steps.map((s) => (
              <li
                key={s.n}
                className="group relative overflow-hidden rounded-3xl border border-ink/10 bg-white/70 p-8 backdrop-blur transition hover:-translate-y-1 hover:bg-white"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-coral/15 blur-2xl transition group-hover:bg-coral/30" />
                <span className="text-5xl font-semibold tracking-tight text-coral">
                  {s.n}
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-ink-soft">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-10"
        >
          <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
                Projects we&apos;re funding
              </p>
              <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
                Five shelters. One token. Real beds.
              </h2>
            </div>
            <p className="max-w-md text-ink-soft">
              These are the partners receiving $nohouse rewards. Independently
              run, deeply local, and doing the work every day.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {charities.map((c, i) => (
              <a
                key={c.name}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white/80 p-7 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10 ${
                  i === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gradient-to-br ${c.accent} opacity-50 blur-2xl transition group-hover:opacity-80`}
                />
                <div className="relative flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-cream">
                    <HouseIcon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-ink-soft">
                    {c.location}
                  </span>
                </div>
                <h3 className="relative mt-5 text-2xl font-semibold leading-tight tracking-tight text-ink">
                  {c.name}
                </h3>
                <p className="relative mt-3 flex-1 text-ink-soft">{c.blurb}</p>
                <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ember group-hover:text-coral">
                  Visit charity
                  <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Token / CTA */}
        <section
          id="token"
          className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-ink p-10 text-cream shadow-2xl shadow-ink/20 sm:p-16">
            <div
              aria-hidden
              className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-coral/40 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-rose/30 blur-3xl"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
                  The token
                </p>
                <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                  $nohouse — a roof, on-chain.
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-cream/80">
                  Live on Solana via pump.fun. Trading rewards flow into a
                  public charity treasury distributed through donate.gg. Audit
                  any wallet, any time.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={PUMPFUN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-coral px-7 py-3.5 text-base font-semibold text-ink shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-cream"
                  >
                    Buy on pump.fun
                    <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href={DONATE_GG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/20 px-7 py-3.5 text-base font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-cream/10"
                  >
                    Visit donate.gg
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-cream/10 bg-cream/[0.04] p-6 backdrop-blur">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
                  Token mint
                </div>
                <div className="mt-3 break-all font-mono text-sm leading-6 text-cream/90">
                  {TOKEN_MINT}
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-cream/[0.04] px-4 py-3">
                    <div className="text-cream/60">Network</div>
                    <div className="mt-1 font-semibold">Solana</div>
                  </div>
                  <div className="rounded-xl bg-cream/[0.04] px-4 py-3">
                    <div className="text-cream/60">Launchpad</div>
                    <div className="mt-1 font-semibold">pump.fun</div>
                  </div>
                  <div className="rounded-xl bg-cream/[0.04] px-4 py-3">
                    <div className="text-cream/60">Rewards</div>
                    <div className="mt-1 font-semibold">100% donated</div>
                  </div>
                  <div className="rounded-xl bg-cream/[0.04] px-4 py-3">
                    <div className="text-cream/60">Routed via</div>
                    <div className="mt-1 font-semibold">donate.gg</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mx-auto w-full max-w-7xl px-6 pb-12 pt-6 sm:px-10">
          <div className="flex flex-col items-start justify-between gap-6 border-t border-ink/10 pt-8 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-cream">
                <HouseIcon className="h-4 w-4" />
              </span>
              <span>
                <span className="text-coral">$</span>nohouse
              </span>
              <span className="ml-3 text-sm font-normal text-ink-soft">
                A roof for everyone.
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
              <a
                href={PUMPFUN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink"
              >
                pump.fun
              </a>
              <a
                href={DONATE_GG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink"
              >
                donate.gg
              </a>
              <span>
                © {new Date().getFullYear()} $nohouse — not financial advice,
                just kindness.
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function HouseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-8.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 21s-7.5-4.5-9.5-9.5C1.2 8.2 3.4 5 6.5 5c1.9 0 3.5 1 4.5 2.4l1 1.3 1-1.3C14 6 15.6 5 17.5 5 20.6 5 22.8 8.2 21.5 11.5 19.5 16.5 12 21 12 21Z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="m5 12 4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M5 12h14m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
