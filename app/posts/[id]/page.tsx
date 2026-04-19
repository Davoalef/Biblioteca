import { getPost, getPosts } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, Minus, Plus, BookOpen, ShoppingCart, Heart, Check } from "lucide-react";
import RelatedPosts from "@/app/components/RelatedPosts";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

function getRandomPosts(allPosts: any[], currentId: number, count: number) {
  const filtered = allPosts.filter((p) => p.id !== currentId);
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  let post;
  try {
    post = await getPost(id);
  } catch (error) {
    notFound();
  }

  if (!post || !post.id) {
    notFound();
  }

  const allPosts = await getPosts();
  const relatedPosts = getRandomPosts(allPosts, post.id, 8);

  const thumbnails = [1, 2, 3, 4, 5];

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <div className="bg-slate-100 rounded-2xl border border-slate-200 p-8 mb-4">
              <div className="relative w-full aspect-[3/4] max-w-sm mx-auto">
                <Image
                  src="/img/libro.webp"
                  alt={`Portada de ${post.title}`}
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 1024px) 100vw, 512px"
                  priority
                />
              </div>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  className={`relative aspect-square rounded-lg border-2 overflow-hidden bg-slate-100 transition-colors ${
                    idx === thumbnails.length - 1
                      ? "border-teal-600"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Image
                    src="/img/libro.webp"
                    alt={`Vista ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-start justify-between gap-4 mb-3">
              <h1 className="text-3xl lg:text-4xl font-bold text-teal-900 capitalize">
                {post.title}
              </h1>
              <span className="shrink-0 text-sm font-semibold text-emerald-600 pt-2">
                Stock disponible.
              </span>
            </div>

            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center">
                {[1, 2, 3, 4].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 fill-amber-400 text-amber-400"
                  />
                ))}
                <Star className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-sm text-slate-600">
                (1 reseña de cliente)
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              {post.body}
            </p>

            <p className="text-2xl font-bold text-orange-500 mb-6">$16.00</p>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="inline-flex items-center border border-slate-300 rounded-full overflow-hidden">
                <button
                  aria-label="Disminuir cantidad"
                  className="w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-semibold text-slate-900">
                  1
                </span>
                <button
                  aria-label="Aumentar cantidad"
                  className="w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button className="inline-flex items-center gap-2 px-5 h-10 text-sm font-semibold text-teal-700 bg-white border border-teal-700 rounded-full hover:bg-teal-50 transition-colors">
                <BookOpen className="w-4 h-4" />
                Leer un poco
              </button>

              <button className="inline-flex items-center gap-2 px-5 h-10 text-sm font-semibold text-white bg-teal-700 rounded-full hover:bg-teal-800 transition-colors">
                <ShoppingCart className="w-4 h-4" />
                Agregar al carrito
              </button>

              <button
                aria-label="Favorito"
                className="w-10 h-10 flex items-center justify-center text-white bg-teal-700 rounded-full hover:bg-teal-800 transition-colors"
              >
                <Heart className="w-4 h-4" />
              </button>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 mb-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-bold text-slate-900 mb-1">SKU:</p>
                  <p className="text-slate-600">
                    FTC{String(post.id).padStart(4, "0")}B{post.userId}D
                  </p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 mb-1">Etiquetas:</p>
                  <p className="text-slate-600">Diseño, Ficción</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 mb-1">Páginas:</p>
                  <p className="text-slate-600">330</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 mb-1">Publicado:</p>
                  <p className="text-slate-600">2021</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 mb-1">Categoría:</p>
                  <p className="text-slate-600">Infantil</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 mb-1">Formato:</p>
                  <p className="text-slate-600">Tapa dura</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 mb-1">Idioma:</p>
                  <p className="text-slate-600">Español</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 mb-1">Autor:</p>
                  <p className="text-slate-600">Usuario {post.userId}</p>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-700 shrink-0" />
                  <span className="text-slate-700">
                    Envío gratis desde $150
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-700 shrink-0" />
                  <span className="text-slate-700">
                    Descuento flash: 30% OFF
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-700 shrink-0" />
                  <span className="text-slate-700">
                    30 días de cambio y devolución
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-700 shrink-0" />
                  <span className="text-slate-700">
                    Compra segura en línea
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RelatedPosts posts={relatedPosts} />
      </div>
    </main>
  );
}

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