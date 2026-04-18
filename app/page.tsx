import { getPosts } from "@/lib/api";
import PostsList from "./components/PostsList";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Biblioteca Pública
          </h1>
          <p className="text-slate-600 mt-1">
            {posts.length} libros disponibles en el catálogo
          </p>
        </header>

        <PostsList posts={posts} />
      </div>
    </main>
  );
}