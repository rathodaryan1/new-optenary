import { Building2, ShoppingBag, ShieldAlert, Film, Store } from 'lucide-react';

export default function Partners() {
  const projects = [
    { name: "Mehta Dairy", icon: Store },
    { name: "PG Management", icon: Building2 },
    { name: "Vishal Masala", icon: ShoppingBag },
    { name: "Shree Enterprise", icon: ShieldAlert },
    { name: "Laalo Movie Site", icon: Film },
  ];

  // Repeat the projects array to ensure there are enough items for a smooth marquee animation
  const marqueeItems = [...projects, ...projects, ...projects];

  return (
    <section className="relative w-full overflow-hidden bg-dark-bg/60 border-y border-dark-border py-10">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-dark-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-dark-bg to-transparent z-10 pointer-events-none" />
      
      <div className="flex w-max select-none">
        {/* First track */}
        <div className="animate-marquee-forward flex items-center gap-16 pr-16 text-dark-muted font-bold text-sm uppercase tracking-widest">
          {marqueeItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-3.5 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 rounded-lg bg-dark-card border border-dark-border/40 flex items-center justify-center text-brand-orange">
                  <Icon size={16} />
                </div>
                <span className="font-bold text-base text-white tracking-wide">{item.name}</span>
              </div>
            );
          })}
        </div>

        {/* Second track for seamless loop */}
        <div className="animate-marquee-forward flex items-center gap-16 pr-16 text-dark-muted font-bold text-sm uppercase tracking-widest" aria-hidden="true">
          {marqueeItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={`dup-${i}`} className="flex items-center gap-3.5 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 rounded-lg bg-dark-card border border-dark-border/40 flex items-center justify-center text-brand-orange">
                  <Icon size={16} />
                </div>
                <span className="font-bold text-base text-white tracking-wide">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
