"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";

export default function SearchClient() {
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
    <div className="flex flex-col items-center w-full">
      <SearchBar onSearch={handleSearch} />

      {loading && <p className="mt-4 opacity-50">Searching…</p>}

      <ul className="mt-6 w-full max-w-xl space-y-3">
        {results.map((movie) => (
          <li key={movie.id} className="p-4 bg-neutral-900 rounded-lg">
            <a href={`/movie/${movie.id}`} className="underline">
              {movie.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
