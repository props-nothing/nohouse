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

export async function getDonationsSnapshot(): Promise<DonationsSnapshot> {
  // TODO: Replace with a live source — options:
  //  1. Server-side scrape pump.fun coin page (Playwright in a cron route).
  //  2. Solana RPC: sum SOL transfers from the creator-reward wallet to each
  //     charity wallet and convert to USD via Jupiter/Pyth.
  //  3. donate.gg webhook → KV store, read here.
  return buildSnapshot(
    SNAPSHOT_DONATED_SOL_PER_CHARITY,
    SNAPSHOT_SOL_PRICE_USD,
    SNAPSHOT_UPDATED_AT,
  );
}
