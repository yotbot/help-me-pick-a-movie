import MovieCard from "@/app/components/MovieCard";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/movies/details?id=${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="text-red-500 p-6">Failed to load movie details.</div>
    );
  }

  const similarRes = await fetch(`${baseUrl}/api/movies/similar?id=${id}`, {
    cache: "no-store",
  });

  const similar = await similarRes.json();

  const movie = await res.json();

  const year = movie.release_date?.slice(0, 4);
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const cast = movie.credits?.cast?.slice(0, 5) || [];

  return (
    <div className="p-6 text-white space-y-4">
      <h1 className="text-3xl font-bold">
        {movie.title} {year && <span>({year})</span>}
      </h1>

      {posterUrl && (
        <img src={posterUrl} alt={movie.title} className="w-56 rounded" />
      )}

      <div>
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <p className="text-neutral-300">{movie.overview}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Runtime</h2>
        <p>{movie.runtime} minutes</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Genres</h2>
        <ul className="list-disc list-inside">
          {movie.genres?.map((g: any) => (
            <li key={g.id}>{g.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Top Cast</h2>
        <ul className="list-disc list-inside">
          {cast.map((actor: any) => (
            <li key={actor.id}>
              {actor.name} as <span className="italic">{actor.character}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">More Like This</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {similar.map((m: any) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </div>
    </div>
  );
}
