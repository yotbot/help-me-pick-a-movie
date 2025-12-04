import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";

export async function POST(req: Request) {
  const { mood, likedMovies = [] } = await req.json();

  const prompt = `
You are a movie recommendation engine.
Recommend 5 movies based on:

// Mood: ${mood}
// Movies the user likes: ${likedMovies.join(", ")}

Return ONLY a JSON array of movie titles, like:
["Movie 1", "Movie 2", "Movie 3"]
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const text = completion.choices[0].message?.content || "[]";

  let titles = [];
  try {
    titles = JSON.parse(text);
  } catch (e) {
    console.warn("AI did not return valid JSON:", text);
  }

  return NextResponse.json({ titles });
}

export function GET() {
  return Response.json({ ok: true, method: "GET" });
}
