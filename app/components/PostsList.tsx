"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Post, PageSize, SortField, SortOrder } from "@/lib/types";
import { useDebounce } from "@/lib/useDebounce";
import PostModal from "./PostModal";
import { Search, ChevronRight, ChevronLeft, ArrowUp, ArrowDown, } from "lucide-react";
import Link from "next/link";

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

  const debouncedSearch = useDebounce(searchInput, 300);

  const processedPosts = useMemo(() => {
    let result = posts;

    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter((post) =>
        post.title.toLowerCase().includes(query)
      );
    }

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
    setCurrentPage(1);
  };

  const handleSortChange = (field: SortField) => {
    if (field === sortField) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div>
          {processedPosts.length === 0 ? (
            <div className="bg-white rounded-lg border border-indigo-200 p-12 text-center">
              <p className="text-slate-600">
                No se encontraron libros que coincidan con{" "}
                <span className="font-medium">
                  &quot;{debouncedSearch}&quot;
                </span>
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-30">
                {paginatedPosts.map((post) => (
                  <article
                    key={post.id}
                    className="relative bg-gradient-to-b from-transparent to-slate-100 rounded-2xl px-4 pb-5 pt-28 mb-18 flex flex-col items-center text-center transition-all hover:-translate-y-2 hover:shadow-xl duration-300"
                  >
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-50 drop-shadow-2xl z-10">
                      <Image
                        src="/img/libro.webp"
                        alt={`Portada de ${post.title}`}
                        fill
                        className="object-cover rounded-md"
                        sizes="200px"
                      />
                      <span className="absolute -top-2 -right-2 inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-full text-[10px] font-bold bg-white text-slate-800 shadow-md">
                        #{post.id}
                      </span>
                    </div>

                    <h2 className="text-sm font-bold text-slate-800 mb-1 line-clamp-1 capitalize w-full">
                      {post.title}
                    </h2>

                    <p className="text-xs text-slate-600 mb-3 line-clamp-2 w-full">
                      {post.body.slice(0, 50)}
                      {post.body.length > 50 && "..."}
                    </p>

                    <Link
                      href={`/posts/${post.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors mt-auto bg-white hover:bg-slate-50 border border-slate-300 px-3 py-1.5 rounded-full"
                    >
                      Ver más
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </article>
                ))}
              </div>

              {totalPages > 1 && (
                <nav className="flex items-center justify-center gap-2 mt-8 flex-wrap">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Ant
                  </button>

                  {(() => {
                    const pages: (number | "ellipsis-start" | "ellipsis-end")[] = [];

                    if (totalPages <= 3) {
                      for (let i = 1; i <= totalPages; i++) pages.push(i);
                    } else if (currentPage <= 2) {
                      pages.push(1, 2, 3, "ellipsis-end", totalPages);
                    } else if (currentPage >= totalPages - 1) {
                      pages.push(1, "ellipsis-start", totalPages - 2, totalPages - 1, totalPages);
                    } else {
                      pages.push(
                        1,
                        "ellipsis-start",
                        currentPage,
                        "ellipsis-end",
                        totalPages
                      );
                    }

                    return pages.map((item, idx) => {
                      if (item === "ellipsis-start" || item === "ellipsis-end") {
                        return (
                          <span
                            key={`${item}-${idx}`}
                            className="px-2 py-1.5 text-sm text-slate-400 select-none"
                          >
                            •••
                          </span>
                        );
                      }

                      return (
                        <button
                          key={item}
                          onClick={() => setCurrentPage(item)}
                          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                            currentPage === item
                              ? "bg-indigo-600 text-white"
                              : "text-slate-700 bg-white border border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          {item}
                        </button>
                      );
                    });
                  })()}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Sig
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </nav>
              )}
            </>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Buscar
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por título..."
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Ordenar por
            </h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleSortChange("id")}
                className={`w-full inline-flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                  sortField === "id"
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span>ID</span>
                {sortField === "id" &&
                  (sortOrder === "asc" ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  ))}
              </button>
              <button
                onClick={() => handleSortChange("title")}
                className={`w-full inline-flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                  sortField === "title"
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span>Título</span>
                {sortField === "title" &&
                  (sortOrder === "asc" ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  ))}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Cantidad por página
            </h3>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) =>
                handlePageSizeChange(Number(e.target.value) as PageSize)
              }
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value={10}>10 libros</option>
              <option value={20}>20 libros</option>
              <option value={50}>50 libros</option>
            </select>
          </div>

          <div className="bg-slate-50 rounded-lg border border-slate-200 p-5">
            <p className="text-sm text-slate-600">
              {processedPosts.length === 0
                ? "Sin resultados"
                : `Mostrando ${(currentPage - 1) * pageSize + 1}–${Math.min(
                    currentPage * pageSize,
                    processedPosts.length
                  )} de ${processedPosts.length}`}
            </p>
          </div>
        </aside>
      </div>

      {/* <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} /> */}
    </>
  );
}