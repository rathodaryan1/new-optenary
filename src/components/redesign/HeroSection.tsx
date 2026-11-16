import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Terminal, Activity, Layers } from 'lucide-react';
import HeroInteractiveCanvas from './HeroInteractiveCanvas';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden pt-24 pb-16 px-6 md:px-12 bg-[#030612]"
    >
      {/* Background Animated Gradient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-blue/10 blur-[170px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] rounded-full bg-brand-cyan/10 blur-[140px] pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] rounded-full bg-brand-purple/10 blur-[150px] pointer-events-none" />

      {/* Grid Pattern with subtle radial mask */}
      <div className="absolute inset-0 tech-grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Original Interactive Node Network Canvas */}
      <HeroInteractiveCanvas />

      {/* Interactive Canvas Prompt Pill */}
      <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-card/80 border border-navy-border text-[11px] font-mono text-navy-muted backdrop-blur-md pointer-events-none z-20">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
        <span>Move cursor to interact · Click to pulse network</span>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 flex flex-col justify-center items-center">
        
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-navy-card/90 border border-navy-border/80 text-xs font-mono text-navy-muted mb-8 backdrop-blur-md shadow-glow-blue"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan" />
          </span>
          <span className="text-white font-medium tracking-wider uppercase text-[11px]">
            OPTENARY // WHERE TECHNOLOGY EVOLVES
          </span>
          <span className="hidden sm:inline text-navy-muted">·</span>
          <span className="hidden sm:inline text-brand-cyan font-medium text-[11px]">NOW BOOKING Q3/Q4</span>
        </motion.div>

        {/* Primary Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 max-w-5xl font-sans"
        >
          We design and build <br className="hidden sm:inline" />
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple font-black">
            digital experiences
          </span>{' '}
          that <br className="hidden md:inline" />
          move businesses forward.
        </motion.h1>

        {/* Supporting Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-navy-muted font-normal max-w-3xl mx-auto leading-relaxed mb-10"
        >
          From websites and mobile applications to intelligent software and AI-powered solutions,
          we turn ambitious ideas into technology that works.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto z-20"
        >
          <a
            href="#work"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-blue-600 hover:to-cyan-500 text-white font-bold uppercase tracking-wider text-xs transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-glow-cyan"
          >
            <span>Explore Our Work</span>
            <ArrowRight size={14} />
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-navy-card/90 hover:bg-navy-cardHover border border-navy-border hover:border-brand-blue/50 text-white font-bold uppercase tracking-wider text-xs transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <Sparkles size={14} className="text-brand-cyan" />
            <span>Start a Project</span>
          </a>
        </motion.div>

        {/* Verified Capability & Performance Badges */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-16 pt-8 border-t border-navy-border/60 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-4xl text-left"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-navy-card border border-navy-border flex items-center justify-center text-brand-cyan shrink-0">
              <Activity size={16} />
            </div>
            <div>
              <div className="text-white font-mono font-bold text-lg md:text-xl">1.1s</div>
              <div className="text-xs text-navy-muted">Avg. Load Speed (Mehta Dairy)</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-navy-card border border-navy-border flex items-center justify-center text-brand-blue shrink-0">
              <Terminal size={16} />
            </div>
            <div>
              <div className="text-white font-mono font-bold text-lg md:text-xl">100%</div>
              <div className="text-xs text-navy-muted">Bespoke Engineering (Zero Bloat)</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-navy-card border border-navy-border flex items-center justify-center text-brand-purple shrink-0">
              <Layers size={16} />
            </div>
            <div>
              <div className="text-white font-mono font-bold text-lg md:text-xl">99.9%</div>
              <div className="text-xs text-navy-muted">Production Architecture Uptime</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-navy-card border border-navy-border flex items-center justify-center text-brand-cyan shrink-0">
              <Sparkles size={16} />
            </div>
            <div>
              <div className="text-white font-mono font-bold text-lg md:text-xl">Autonomous</div>
              <div className="text-xs text-navy-muted">AI Agents & Workflow Systems</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

