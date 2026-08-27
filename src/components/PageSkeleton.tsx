export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[#050607] overflow-hidden animate-pulse">
      {/* Header skeleton */}
      <div className="w-full h-[70px] bg-dark-card border-b border-dark-border flex items-center px-6 md:px-12 gap-8">
        <div className="w-32 h-5 rounded-lg bg-dark-border" />
        <div className="hidden md:flex gap-6 flex-1">
          {[1,2,3,4].map(i => <div key={i} className="w-16 h-3 rounded bg-dark-border" />)}
        </div>
        <div className="w-24 h-8 rounded-full bg-dark-border ml-auto" />
      </div>

      {/* Hero skeleton */}
      <div className="px-6 md:px-12 pt-24 pb-20 max-w-4xl mx-auto flex flex-col items-center gap-6">
        <div className="w-32 h-6 rounded-full bg-dark-card" />
        <div className="w-full max-w-2xl h-12 rounded-xl bg-dark-card" />
        <div className="w-4/5 h-8 rounded-xl bg-dark-card" />
        <div className="w-3/4 h-4 rounded-lg bg-dark-card" />
        <div className="w-2/3 h-4 rounded-lg bg-dark-card" />
        <div className="flex gap-4 mt-4">
          <div className="w-36 h-12 rounded-xl bg-dark-card" />
          <div className="w-36 h-12 rounded-xl bg-dark-card" />
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="px-6 md:px-12 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="p-6 rounded-2xl bg-dark-card border border-dark-border flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-dark-border" />
              <div className="w-3/4 h-4 rounded-lg bg-dark-border" />
              <div className="w-full h-3 rounded-lg bg-dark-border" />
              <div className="w-5/6 h-3 rounded-lg bg-dark-border" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
