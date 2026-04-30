// Single source of truth for the live-donations widget.
//
// pump.fun shows charity allocations on the coin page client-side via an
// undocumented endpoint, so we keep the canonical values here and update them
// from a cron / webhook / on-chain reader. The /api/donations route reads from
// `getDonationsSnapshot()` so the data source can be swapped without touching
// the UI.

export type CharityAllocation = {
  id: string;
  name: string;
  shortName: string;
  url: string;
  location: string;
  percent: number; // 0–100
};

export const TOKEN_MINT = "4QVHxosURyMsrNGDWBZX6V3nKrRhp5a5uW9vMirjpump";
export const PUMPFUN_URL = `https://pump.fun/coin/${TOKEN_MINT}`;
export const DONATE_GG_URL = "https://www.donate.gg/";

export const CHARITIES: CharityAllocation[] = [
  {
    id: "shelter-inc",
    name: "SHELTER, Inc.",
    shortName: "Shelter, Inc.",
    url: "https://shelterinc.org/",
    location: "Concord, California",
    percent: 20,
  },
  {
    id: "brisben",
    name: "Thurman Brisben Homeless Shelter Inc",
    shortName: "Brisben Center",
    url: "https://brisbencenter.org/",
    location: "Fredericksburg, Virginia",
    percent: 20,
  },
  {
    id: "pathways",
    name: "Pathways Shelter for the Homeless",
    shortName: "Yankton Pathways",
    url: "https://www.yanktonpathways.org/",
    location: "Yankton, South Dakota",
    percent: 20,
  },
  {
    id: "good-neighbor",
    name: "Good Neighbor Homeless Shelter",
    shortName: "Good Neighbor Settlement House",
    url: "https://goodneighborshelter.org/",
    location: "Brownsville, Texas",
    percent: 20,
  },
  {
    id: "st-johns",
    name: "St John The Evangelist Homeless Shelter Inc",
    shortName: "St. John's Homeless Shelter",
    url: "https://stjohnsgreenbay.org/",
    location: "Green Bay, Wisconsin",
    percent: 20,
  },
];

// ---- Snapshot values (update via cron/webhook) -----------------------------
// `donatedSolPerCharity` × 5 = total creator-reward SOL distributed.
// `solPriceUsd` is used to render a USD figure. Both should be refreshed
// regularly. When pump.fun (or an on-chain reader) is wired in, replace the
// body of `getDonationsSnapshot()` with a real fetch.
const SNAPSHOT_DONATED_SOL_PER_CHARITY = 27.0799;
const SNAPSHOT_SOL_PRICE_USD = 83.0;
const SNAPSHOT_UPDATED_AT = "2026-04-30T00:00:00.000Z";

export type DonationsSnapshot = {
  updatedAt: string;
  solPriceUsd: number;
  totalSol: number;
  totalUsd: number;
  charities: Array<
    CharityAllocation & {
      donatedSol: number;
      donatedUsd: number;
    }
  >;
};

export function buildSnapshot(
  donatedSolPerCharity: number,
  solPriceUsd: number,
  updatedAt: string,
): DonationsSnapshot {
  const charities = CHARITIES.map((c) => {
    const donatedSol = donatedSolPerCharity * (c.percent / 20); // assumes equal split
    return {
      ...c,
      donatedSol,
      donatedUsd: donatedSol * solPriceUsd,
    };
  });
  const totalSol = charities.reduce((s, c) => s + c.donatedSol, 0);
  return {
    updatedAt,
    solPriceUsd,
    totalSol,
    totalUsd: totalSol * solPriceUsd,
    charities,
  };
}

// ---- Live-source options (researched 2026-04-30) ---------------------------
// Donations actually flow through donate.gg's on-chain Donation Relay program
// on Solana: `RLAYHr9TRFcKB2ubYQhspcnXiaGpaVzNQvHytt47RZu`. Every donation is
// keyed by a 32-byte `config_id` that pins the 5-charity beneficiary list to
// $nohouse. Three real-time-capable approaches, ranked best → worst:
//
// (A) [RECOMMENDED] donate.gg Developer API — `GET /api/v1/configs/{configId}`.
//     Returns aggregate `stats.usdDonatedE6`, `donationCount`, per-channel
//     atomic volume, last-donation timestamp. Closed beta: email
//     support@donate.gg with project description to get an API key. Server-
//     side only (key must not ship to browser). Cache 60–300s in this route.
//     Docs: https://docs.donate.gg/developer/donation-configs
//
// (B) Solana RPC, no API key. The relay program stores per-(config_id, mint)
//     running totals in a `debouncer_v1` PDA (seeds: ["debouncer_v1",
//     config_id, mint]) and emits `DonationMadeV1Event` on every donation.
//     Read the PDA with @solana/web3.js + the on-chain IDL:
//       https://explorer.solana.com/address/RLAYHr9TRFcKB2ubYQhspcnXiaGpaVzNQvHytt47RZu/idl
//     Per-charity split is deterministic from the config weights (20% × 5).
//     One-time discovery needed: find $nohouse's `config_id` by inspecting any
//     historical donate-tx instruction data, or `getProgramAccounts` filtered
//     on the WSOL mint.
//
// (C) Manual snapshot (current). Bump the constants below and redeploy.
//     Zero infra; fine for low-traffic launches.
//
// Path (A) is the cleanest swap-in: replace the `buildSnapshot(...)` call
// below with a fetch to donate.gg, parse `usdDonatedE6` + per-channel SOL
// volume, and convert once. Path (B) is the fallback if API access is denied.
// ---------------------------------------------------------------------------

export async function getDonationsSnapshot(): Promise<DonationsSnapshot> {
  return buildSnapshot(
    SNAPSHOT_DONATED_SOL_PER_CHARITY,
    SNAPSHOT_SOL_PRICE_USD,
    SNAPSHOT_UPDATED_AT,
  );
}
