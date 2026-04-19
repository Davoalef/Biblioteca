"use client";

import { useRef, useState, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Post } from "@/lib/types";

interface RelatedPostsProps {
  posts: Post[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  if (posts.length === 0) return null;

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
    if (Math.abs(walk) > 5) setHasDragged(true);
  };

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (hasDragged) {
      e.preventDefault();
    }
  };

  return (
    <section className="mt-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">
            Libros relacionados
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Otros títulos que podrían interesarte
          </p>
        </div>
        <Link
          href="/"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors"
        >
          Ver todos
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-6 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pt-16 pb-6 scrollbar-hide select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {posts.map((post) => (
          <article
            key={post.id}
            className="relative shrink-0 w-[260px] sm:w-[280px] bg-gradient-to-b from-transparent to-slate-100 rounded-2xl px-4 pb-5 pt-28 flex flex-col items-center text-center transition-all hover:-translate-y-2 hover:shadow-xl duration-300"
          >
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-44 drop-shadow-2xl z-10 pointer-events-none">
              <Image
                src="/img/libro.webp"
                alt={`Portada de ${post.title}`}
                fill
                className="object-cover rounded-md"
                sizes="128px"
                draggable={false}
              />
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-full text-[10px] font-bold bg-white text-slate-800 shadow-md">
                #{post.id}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-800 mb-1 line-clamp-1 capitalize w-full">
              {post.title}
            </h3>

            <p className="text-xs text-slate-600 mb-4 line-clamp-2 w-full">
              {post.body.slice(0, 60)}
              {post.body.length > 60 && "..."}
            </p>

            <Link
              href={`/posts/${post.id}`}
              onClick={handleLinkClick}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors mt-auto bg-white hover:bg-slate-50 border border-slate-300 px-3 py-1.5 rounded-full"
            >
              Ver más
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}