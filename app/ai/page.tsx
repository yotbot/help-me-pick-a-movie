import AiRecommendationClient from "../components/AiRecommendationClient";

export default function AiPage() {
  return (
    <main className="min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">AI Movie Recommendations</h1>
      <AiRecommendationClient />
    </main>
  );
}
