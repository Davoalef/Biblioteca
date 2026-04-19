import { BookOpen, Sparkles, Headphones, Zap, LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: BookOpen,
    title: "Acceso libre",
    description: "Catálogo completo 24/7",
  },
  {
    icon: Sparkles,
    title: "Curaduría",
    description: "Libros seleccionados",
  },
  {
    icon: Headphones,
    title: "Soporte",
    description: "Siempre disponibles",
  },
  {
    icon: Zap,
    title: "Actualizado",
    description: "Nuevos títulos cada semana",
  },
];

export default function FeaturesBar() {
  return (
    <div className="bg-indigo-50 rounded-xl p-5 md:p-6 mb-8">
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none -mx-5 sm:mx-0 px-5 sm:px-0 scrollbar-hide">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-4 shrink-0 w-[85%] sm:w-auto snap-start"
            >
              <div className="shrink-0 w-14 h-14 flex items-center justify-center bg-indigo-500 text-white rounded-xl shadow-sm">
                <Icon className="w-6 h-6" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-slate-900 truncate">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 truncate">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}