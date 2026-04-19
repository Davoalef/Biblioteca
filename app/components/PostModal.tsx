// Elimine este modal, me parece redundante

"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/types";

interface PostModalProps {
  post: Post | null;
  onClose: () => void;
}

export default function PostModal({ post, onClose }: PostModalProps) {
  // Cerrar con tecla ESC
  useEffect(() => {
    if (!post) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);

    // Bloquear scroll del body mientras el modal está abierto
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [post, onClose]);

  if (!post) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-56 bg-slate-100 shrink-0">
          <Image
            src="/img/libro.webp"
            alt={`Portada de ${post.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              #{post.id}
            </span>
            <span className="text-xs text-slate-500">
              Usuario {post.userId}
            </span>
          </div>

          <h2
            id="modal-title"
            className="text-2xl font-bold text-slate-900 mb-4 capitalize"
          >
            {post.title}
          </h2>

          <p className="text-slate-700 leading-relaxed whitespace-pre-line">
            {post.body}
          </p>
        </div>

        <div className="border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row gap-3 justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
          >
            Cerrar
          </button>
          <Link
            href={`/posts/${post.id}`}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors text-center"
          >
            Abrir en página completa
          </Link>
        </div>
      </div>
    </div>
  );
}