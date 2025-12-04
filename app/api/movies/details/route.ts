import { NextResponse } from "next/server";
import { tmdb } from "@/lib/tmdb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "No id provided" }, { status: 400 });
  }

  // Fetch movie details
  const data = await tmdb(`/movie/${id}`);

  return NextResponse.json(data);
}
