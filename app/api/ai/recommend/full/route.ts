import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";
import { tmdb } from "@/lib/tmdb";

export async function POST(req: Request) {
  const { mood, likedMovies = [] } = await req.json();

  // Step 1: Ask your existing AI route for titles
  const prompt = `
You are a movie recommendation engine.
Recommend 5 movies based on:

Mood: ${mood}
Movies the user likes: ${likedMovies.join(", ")}

Return ONLY a JSON array of movie titles, like:
["Movie 1", "Movie 2", "Movie 3"]
`;

  const ai = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  let titles: string[] = [];
  try {
    titles = JSON.parse(ai.choices[0].message?.content || "[]");
  } catch {
    console.warn("AI returned non-JSON:", ai.choices[0].message?.content);
  }

  // Step 2: Convert titles → TMDB movie objects
  const movies = [];

  for (const title of titles) {
    const search = await tmdb(
      `/search/movie?query=${encodeURIComponent(title)}`
    );

    const movie = search.results?.[0];
    if (movie) movies.push(movie);
  }

  // Step 3: Return full movies
  return NextResponse.json({ titles, movies });
}

export function GET() {
  return Response.json({ ok: true, method: "GET" });
}
