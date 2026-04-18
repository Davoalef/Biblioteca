import { getPost } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  let post;
  try {
    post = await getPost(id);
  } catch (error) {
    // Si la API devuelve 404, redirigir a la página de not-found
    notFound();
  }

  // JSONPlaceholder devuelve un objeto vacío {} para ids inválidos
  // en vez de un 404 real. Verificamos que el post tenga id válido.
  if (!post || !post.id) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Botón volver */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors mb-6"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver al catálogo
        </Link>

        {/* Card principal */}
        <article className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Imagen de cabecera */}
          <div className="relative w-full h-72 bg-slate-100">
            <Image
              src="/img/libro.webp"
              alt={`Portada de ${post.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>

          {/* Contenido */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                #{post.id}
              </span>
              <span className="text-sm text-slate-500">
                Usuario {post.userId}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mb-6 capitalize">
              {post.title}
            </h1>

            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {post.body}
              </p>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

// Metadata dinámica para el SEO y el título de la pestaña
export async function generateMetadata({ params }: PostPageProps) {
  const { id } = await params;
  try {
    const post = await getPost(id);
    return {
      title: `${post.title} | Biblioteca Pública`,
      description: post.body.slice(0, 160),
    };
  } catch {
    return { title: "Libro no encontrado | Biblioteca Pública" };
  }
}