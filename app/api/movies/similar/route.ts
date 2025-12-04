import { NextResponse } from "next/server";
import { tmdb } from "@/lib/tmdb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing movie ID" }, { status: 400 });
  }

  // Fetch similar movies from TMDB
  const data = await tmdb(`/movie/${id}/similar`);

  return NextResponse.json(data.results || []);
}
