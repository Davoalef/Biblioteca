"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Post, PageSize, SortField, SortOrder } from "@/lib/types";
import { useDebounce } from "@/lib/useDebounce";
import PostModal from "./PostModal";

interface PostsListProps {
  posts: Post[];
}

export default function PostsList({ posts }: PostsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSize>(10);
  const [searchInput, setSearchInput] = useState("");
  const [sortField, setSortField] = useState<SortField>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Aplica debounce de 300ms al texto de búsqueda
  const debouncedSearch = useDebounce(searchInput, 300);

  // Filtrar + ordenar
  const processedPosts = useMemo(() => {
    let result = posts;

    // Filtro por title
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter((post) =>
        post.title.toLowerCase().includes(query)
      );
    }

    // Ordenamiento
    result = [...result].sort((a, b) => {
      let comparison = 0;
      if (sortField === "id") {
        comparison = a.id - b.id;
      } else {
        comparison = a.title.localeCompare(b.title);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [posts, debouncedSearch, sortField, sortOrder]);

  // Paginar sobre el resultado filtrado/ordenado
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedPosts.slice(start, start + pageSize);
  }, [processedPosts, currentPage, pageSize]);

  const totalPages = Math.ceil(processedPosts.length / pageSize);

  const handlePageSizeChange = (newSize: PageSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setCurrentPage(1); // Volver a la primera página al buscar
  };

  const handleSortChange = (field: SortField) => {
    if (field === sortField) {
      // Si ya está ordenando por este campo, invertir dirección
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  return (
    <>
      {/* Barra de controles: búsqueda + ordenamiento */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Búsqueda */}
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Buscar por título..."
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-sm border border-slate-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Ordenamiento */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-700">Ordenar por:</span>
            <button
              onClick={() => handleSortChange("id")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md border transition-colors ${
                sortField === "id"
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              ID {sortField === "id" && (sortOrder === "asc" ? "↑" : "↓")}
            </button>
            <button
              onClick={() => handleSortChange("title")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md border transition-colors ${
                sortField === "title"
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              Título{" "}
              {sortField === "title" && (sortOrder === "asc" ? "↑" : "↓")}
            </button>
          </div>
        </div>
      </div>

      {/* Selector de cantidad + contador */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label htmlFor="pageSize" className="text-sm text-slate-700">
            Mostrar:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) =>
              handlePageSizeChange(Number(e.target.value) as PageSize)
            }
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-slate-600">por página</span>
        </div>

        <p className="text-sm text-slate-600">
          {processedPosts.length === 0
            ? "Sin resultados"
            : `Mostrando ${(currentPage - 1) * pageSize + 1}–${Math.min(
                currentPage * pageSize,
                processedPosts.length
              )} de ${processedPosts.length}`}
        </p>
      </div>

      {/* Estado vacío */}
      {processedPosts.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <p className="text-slate-600">
            No se encontraron libros que coincidan con{" "}
            <span className="font-medium">&quot;{debouncedSearch}&quot;</span>
          </p>
        </div>
      ) : (
        <>
          {/* Grid de cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col overflow-hidden"
              >
                <div className="relative w-full h-48 bg-slate-100">
                  <Image
                    src="/img/libro.webp"
                    alt={`Portada de ${post.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      #{post.id}
                    </span>
                    <span className="text-xs text-slate-500">
                      Usuario {post.userId}
                    </span>
                  </div>

                  <h2 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-1 capitalize">
                    {post.title}
                  </h2>

                  <p className="text-sm text-slate-600 mb-4 flex-1">
                    {post.body.slice(0, 50)}
                    {post.body.length > 50 && "..."}
                  </p>

                  <button
                    onClick={() => setSelectedPost(post)}
                    className="inline-flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors mt-auto"
                  >
                    Ver detalle
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Paginador */}
          {totalPages > 1 && (
            <nav className="flex items-center justify-center gap-2 mt-8 flex-wrap">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Anterior
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      currentPage === page
                        ? "bg-indigo-600 text-white"
                        : "text-slate-700 bg-white border border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Siguiente
              </button>
            </nav>
          )}
        </>
      )}
      <PostModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </>
  );
}