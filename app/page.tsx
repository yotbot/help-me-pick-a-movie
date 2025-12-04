export default function HomePage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-neutral-950 via-neutral-800 to-neutral-950 text-neutral-100 flex items-center justify-center">
      <div className="rounded-2xl border border-neutral-800 px-6 py-4 shadow-lg">
        <h1 className="text-4xl font-semibold mb-2">🎬 Movie Recommender</h1>
        <p className="text-neutral-400">
          Next.js + TypeScript + Tailwind + Framer Motion + Sanity + Groq
        </p>
      </div>
    </main>
  );
}
