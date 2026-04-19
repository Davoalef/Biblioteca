import Link from "next/link";
import Image from "next/image";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <Image
          src="/img/wallpaper.png"
          alt=""
          fill
          className="object-contain object-right"
          priority
          sizes="100vw"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1a2638] leading-[1.05] tracking-tight mb-6">
              La forma más
              <br />
              inteligente de
              <br />
              descubrir libros
            </h1>

            <p className="text-lg text-slate-500 max-w-md mb-10 leading-relaxed">
              Explora nuestra colección de libros cuidadosamente seleccionados
              y encuentra tu próxima gran lectura.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="#catalogo"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-[#3bc6a5] rounded-md hover:bg-[#2fa88a] transition-colors shadow-[0_10px_25px_-10px_rgba(59,198,165,0.7)]"
              >
                Ver catálogo
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-[#1a2638] rounded-md hover:bg-[#0f1824] transition-colors"
              >
                Saber más
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <div className="relative w-full h-100">
                <Image
                  src="/img/banner.png"
                  alt="Libros de la biblioteca"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 1024px) 100vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}