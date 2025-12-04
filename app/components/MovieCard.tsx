"use client";

import Link from "next/link";

export default function MovieCard({ movie }: { movie: any }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";

  const overview =
    movie.overview?.length > 140
      ? movie.overview.slice(0, 140) + "..."
      : movie.overview;

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="
        block bg-neutral-900 hover:bg-neutral-800 
        rounded-xl overflow-hidden
        border border-neutral-800
        transition-colors p-3
      "
    >
      {posterUrl && (
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-72 object-cover rounded-lg"
        />
      )}

      <div className="mt-3 space-y-2">
        <h2 className="text-lg font-semibold">
          {movie.title}{" "}
          {year !== "N/A" && <span className="opacity-70">({year})</span>}
        </h2>

        <p className="text-sm text-neutral-300 leading-relaxed">
          {overview || "No description available."}
        </p>

        <div className="text-sm text-neutral-400">
          ⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}
        </div>
      </div>
    </Link>
  );
}
