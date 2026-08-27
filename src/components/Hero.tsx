
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden py-24 px-6 md:px-12 bg-dark-bg">
      
      {/* Background Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-emerald/5 blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-[140px] pointer-events-none" />

      {/* Grid Pattern with dynamic radial mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141418_1px,transparent_1px),linear-gradient(to_bottom,#141418_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_80%,transparent_100%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10 flex-grow flex flex-col justify-center items-center">
        
        {/* Eyebrow Badge */}
        <div 
          className="inline-flex items-center gap-2 text-brand-emerald text-xs font-bold uppercase tracking-widest mb-8"
        >
          <Sparkles size={12} className="animate-pulse" />
          <span>Optenary — Where Technology Evolves</span>
        </div>

        {/* Heading */}
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 max-w-4xl font-sans"
        >
          We build the digital infrastructure <br className="hidden md:inline"/>for scaling businesses & <br/>
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald via-brand-cyan to-brand-purple font-black">
            AI-powered SaaS
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          className="text-base md:text-lg text-dark-muted font-medium max-w-3xl mx-auto leading-relaxed mb-10"
        >
          Optenary is a premium product engineering studio. We partner with ambitious brands to construct secure cloud architectures, high-performance web applications, native mobile apps, and custom automation systems.
        </p>

        {/* Call to Actions */}
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
        >
          <a 
            href="#contact-us" 
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-emerald hover:bg-brand-emeraldDark text-dark-bg font-bold uppercase tracking-wider text-xs transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-glow"
          >
            <span>Let's Build Something Extraordinary</span>
            <ArrowRight size={14} />
          </a>
          <a 
            href="#services" 
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-dark-card hover:bg-dark-light border border-dark-border hover:border-brand-emerald/30 text-white font-bold uppercase tracking-wider text-xs transition-all transform hover:-translate-y-0.5 flex items-center justify-center"
          >
            Explore Services
          </a>
        </div>

      </div>

    </section>
  );
}
