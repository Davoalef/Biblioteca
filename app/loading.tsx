export default function Loading() {
  const skeletonCards = Array.from({ length: 6 });

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Skeleton del header */}
        <header className="mb-8">
          <div className="h-9 w-64 bg-slate-200 rounded animate-pulse mb-2" />
          <div className="h-5 w-80 bg-slate-200 rounded animate-pulse" />
        </header>

        {/* Skeleton de la barra de controles */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1 h-10 bg-slate-200 rounded-md animate-pulse" />
            <div className="flex items-center gap-2">
              <div className="h-5 w-24 bg-slate-200 rounded animate-pulse" />
              <div className="h-9 w-16 bg-slate-200 rounded-md animate-pulse" />
              <div className="h-9 w-20 bg-slate-200 rounded-md animate-pulse" />
            </div>
          </div>
        </div>

        {/* Skeleton del selector + contador */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="h-5 w-16 bg-slate-200 rounded animate-pulse" />
            <div className="h-8 w-20 bg-slate-200 rounded-md animate-pulse" />
          </div>
          <div className="h-5 w-40 bg-slate-200 rounded animate-pulse" />
        </div>

        {/* Skeleton del grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skeletonCards.map((_, index) => (
            <article
              key={index}
              className="bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col overflow-hidden"
            >
              <div className="w-full h-48 bg-slate-200 animate-pulse" />

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-5 w-12 bg-slate-200 rounded-full animate-pulse" />
                  <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
                </div>

                <div className="h-6 w-3/4 bg-slate-200 rounded animate-pulse mb-3" />

                <div className="space-y-2 mb-4 flex-1">
                  <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse" />
                </div>

                <div className="h-5 w-24 bg-slate-200 rounded animate-pulse mt-auto" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}