"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard";

export default function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Read the query from the URL
  const queryFromUrl = searchParams.get("query") ?? "";

  async function performSearch(query: string) {
    if (!query.trim()) return;

    setLoading(true);

    const res = await fetch(
      `/api/movies/search?query=${encodeURIComponent(query)}`
    );
    const data = await res.json();

    setResults(data.results || []);
    setLoading(false);
  }

  // When user submits search
  function handleSearch(query: string) {
    // Update the URL
    const params = new URLSearchParams(window.location.search);
    params.set("query", query);

    router.push(`/?${params.toString()}`);
    performSearch(query);
  }

  // Run automatically when URL changes (e.g. reload)
  useEffect(() => {
    if (queryFromUrl) {
      performSearch(queryFromUrl);
    }
  }, [queryFromUrl]);

  return (
    <div className="flex flex-col items-center w-full">
      <SearchBar onSearch={handleSearch} />

      {loading && <p className="mt-4 opacity-50">Searching…</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
