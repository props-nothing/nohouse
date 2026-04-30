import { NextResponse } from "next/server";
import { getDonationsSnapshot } from "@/lib/donations";

// Cache for 60s on the edge; clients also poll every 60s.
export const revalidate = 60;

export async function GET() {
  const snapshot = await getDonationsSnapshot();
  return NextResponse.json(snapshot, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
