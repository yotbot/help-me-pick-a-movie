const TMDB_BASE = "https://api.themoviedb.org/3";

export async function tmdb(path: string) {
  const res = await fetch(`${TMDB_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  });

  if (!res.ok) {
    console.error("TMDB Error:", await res.text());
    throw new Error("TMDB request failed");
  }

  return res.json();
}
