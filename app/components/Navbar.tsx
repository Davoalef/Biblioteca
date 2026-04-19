"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CreatePostModal from "./CreatePostModal";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 transition-transform group-hover:scale-110">
                <Image
                  src="/img/libro.png"
                  alt="Biblioteca Pública"
                  fill
                  className="object-contain"
                  sizes="32px"
                />
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#1a2638]">
                BIBLIO
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-10">
              <Link
                href="/"
                className="text-[15px] font-medium text-[#1a2638] hover:text-[#3bc6a5] transition-colors"
              >
                Inicio
              </Link>
              <Link
                href="/#catalogo"
                className="text-[15px] font-medium text-slate-600 hover:text-[#3bc6a5] transition-colors"
              >
                Catálogo
              </Link>
              <Link
                href="#"
                className="text-[15px] font-medium text-slate-600 hover:text-[#3bc6a5] transition-colors"
              >
                Autores
              </Link>
              <Link
                href="#"
                className="text-[15px] font-medium text-slate-600 hover:text-[#3bc6a5] transition-colors"
              >
                Categorías
              </Link>
              <Link
                href="#"
                className="text-[15px] font-medium text-slate-600 hover:text-[#3bc6a5] transition-colors"
              >
                Sobre nosotros
              </Link>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#3bc6a5] rounded-md hover:bg-[#2fa88a] transition-colors"
            >
              Agregar libro
            </button>
          </div>
        </nav>
      </header>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

        