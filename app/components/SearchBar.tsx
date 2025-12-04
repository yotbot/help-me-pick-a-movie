"use client";

import { useState } from "react";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (q: string) => void;
}) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="flex-1 px-4 py-2 rounded-lg bg-neutral-800 text-neutral-200 outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 rounded-lg text-white"
      >
        Search
      </button>
    </form>
  );
}
