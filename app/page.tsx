import SearchClient from "./components/SearchClient";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Movie Search 🎬</h1>
      <SearchClient />
    </main>
  );
}
