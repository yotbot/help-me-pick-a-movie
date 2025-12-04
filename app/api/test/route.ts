import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function GET() {
  // --- Test TMDB ---
  const tmdbRes = await fetch("https://api.themoviedb.org/3/movie/popular", {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  });
  const tmdbData = await tmdbRes.json();

  // --- Test Groq ---
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const groqRes = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: "Say hello!" }],
  });

  return NextResponse.json({
    tmdbWorking: Array.isArray(tmdbData.results),
    groqWorking: groqRes.choices[0]?.message?.content,
  });
}
