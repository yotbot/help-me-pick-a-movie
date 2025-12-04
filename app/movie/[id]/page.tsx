export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/details?id=${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return <div className="text-red-500">Failed to load movie details.</div>;
  }

  const movie = await res.json();

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

      <pre className="bg-neutral-900 p-4 rounded-lg text-sm overflow-x-auto">
        {JSON.stringify(movie, null, 2)}
      </pre>
    </div>
  );
}
