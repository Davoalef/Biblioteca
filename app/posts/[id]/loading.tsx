export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Skeleton del botón volver */}
        <div className="h-5 w-40 bg-slate-200 rounded animate-pulse mb-6" />

        {/* Skeleton de la card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Skeleton de imagen */}
          <div className="w-full h-72 bg-slate-200 animate-pulse" />

          <div className="p-8">
            {/* Skeleton de meta */}
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 w-16 bg-slate-200 rounded-full animate-pulse" />
              <div className="h-5 w-24 bg-slate-200 rounded animate-pulse" />
            </div>

            {/* Skeleton de título */}
            <div className="space-y-3 mb-6">
              <div className="h-8 w-3/4 bg-slate-200 rounded animate-pulse" />
              <div className="h-8 w-1/2 bg-slate-200 rounded animate-pulse" />
            </div>

            {/* Skeleton de body */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-4/6 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}