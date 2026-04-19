import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative text-slate-300 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/img/footer-bg.png"
          alt=""
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8">
                <Image
                  src="/img/libro.png"
                  alt="Biblioteca Pública"
                  fill
                  className="object-contain"
                  sizes="32px"
                />
              </div>
              <span className="text-lg font-bold text-white">Biblioteca</span>
            </Link>
            <p className="text-sm text-slate-300 max-w-md leading-relaxed">
              Una biblioteca pública digital para explorar, consultar y
              descubrir libros. Acceso libre y gratuito, disponible las 24
              horas.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Navegación
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/#catalogo"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Agregar libro
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Recursos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://jsonplaceholder.typicode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  JSONPlaceholder
                </Link>
              </li>
              <li>
                <Link
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Next.js
                </Link>
              </li>
              <li>
                <Link
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Tailwind CSS
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-300 text-center sm:text-left">
            © {currentYear} Biblioteca Pública. Desarrollado por{" "}
            <span className="text-white font-medium">
              David Alejandro Obando
            </span>
            .
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-slate-300 hover:text-white transition-colors"
            >
              <FaGithub className="w-5 h-5" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate-300 hover:text-white transition-colors"
            >
              <FaLinkedin className="w-5 h-5" />
            </Link>
            <Link
              href="mailto:ceo@orussystem.com"
              aria-label="Email"
              className="text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}