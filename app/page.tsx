"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";

export default function HomePage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(query: string) {
    setLoading(true);

    const res = await fetch(
      `/api/movies/search?query=${encodeURIComponent(query)}`
    );
    const data = await res.json();

    setResults(data.results || []);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Movie Search 🎬</h1>

      <SearchBar onSearch={handleSearch} />

      {loading && <p className="mt-4 opacity-50">Searching…</p>}

      <ul className="mt-6 w-full max-w-xl space-y-3">
        {results.map((movie) => (
          <li key={movie.id} className="p-4 bg-neutral-900 rounded-lg">
            <h2 className="text-lg font-semibold">{movie.title}</h2>
            {movie.release_date && (
              <p className="text-neutral-400 text-sm">
                ({movie.release_date.slice(0, 4)})
              </p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
