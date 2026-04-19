import { getPosts } from "@/lib/api";
import PostsList from "./components/PostsList";
import Banner from "./components/Banner";
import FeaturesBar from "./components/FeaturesBar";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen">
      <Banner />

      <div
        id="catalogo"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Catálogo de libros
          </h2>
          <p className="text-slate-600 mt-1">
            Explora los {posts.length} libros disponibles
          </p>
        </header>

        <FeaturesBar />

        <PostsList posts={posts} />
      </div>
    </main>
  );
}