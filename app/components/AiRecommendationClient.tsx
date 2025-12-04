"use client";

import { useState } from "react";
import MovieCard from "./MovieCard";

export default function AiRecommendationClient() {
  const [mood, setMood] = useState("");
  const [likedMovies, setLikedMovies] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleRecommend() {
    if (!mood.trim()) return;

    setLoading(true);

    const res = await fetch("/api/ai/recommend/full", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mood,
        likedMovies: likedMovies
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
      }),
    });

    const data = await res.json();
    setResults(data.movies || []);
    setLoading(false);
  }

  return (
    <div className="w-full max-w-xl space-y-4">
      <div>
        <label>Mood</label>
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="e.g., dark sci-fi but emotional"
          className="w-full px-3 py-2 bg-neutral-800 rounded"
        />
      </div>

      <div>
        <label>Movies you like (comma separated)</label>
        <input
          type="text"
          value={likedMovies}
          onChange={(e) => setLikedMovies(e.target.value)}
          placeholder="Interstellar, Ex Machina"
          className="w-full px-3 py-2 bg-neutral-800 rounded"
        />
      </div>

      <button
        onClick={handleRecommend}
        className="px-4 py-2 bg-blue-600 rounded"
      >
        Recommend Movies
      </button>

      {loading && <p className="opacity-60">Generating recommendations…</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
