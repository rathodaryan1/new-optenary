import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Map, Paintbrush, Code, Rocket, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function Process() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      num: "01",
      title: "Discovery & Strategy",
      desc: "We analyze workflows, map core technical scopes, and design architectural strategies before build initialization.",
      icon: Search
    },
    {
      num: "02",
      title: "Interface Design",
      desc: "We craft interactive prototypes, premium UI design systems, and responsive user experience paths.",
      icon: Paintbrush
    },
    {
      num: "03",
      title: "Engineering Development",
      desc: "We write clean, production-grade source code, modular APIs, and scalable database schemas.",
      icon: Code
    },
    {
      num: "04",
      title: "System Testing",
      desc: "We execute end-to-end integration tests, load tests, security audits, and cross-platform verification.",
      icon: Map
    },
    {
      num: "05",
      title: "Deployment & Launch",
      desc: "We orchestrate production server configuration, continuous delivery pipelines, and live release protocols.",
      icon: Rocket
    },
    {
      num: "06",
      title: "Growth & Optimization",
      desc: "We integrate analytics setups, optimize performance monitors, and release scaling feature updates.",
      icon: Activity
    }
  ];

  return (
    <section id="how-we-work" className="bg-[#050607] py-28 px-6 md:px-12 relative overflow-hidden">
      {/* CSS keyframes inline for animated paths */}
      <style>{`
        @keyframes drawPath {
          0% { stroke-dashoffset: 1500; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-path-flow {
          stroke-dasharray: 60 1440;
          animation: drawPath 18s linear infinite;
        }
        .animate-path-active {
          stroke-dasharray: 40 100;
          animation: drawPath 5s linear infinite;
        }
      `}</style>

      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-orange/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-orange text-xs font-bold uppercase tracking-widest block mb-4"
          >
            Our Process
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-4"
          >
            How <span className="text-brand-orange">We Work</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-muted max-w-2xl mx-auto text-base md:text-lg"
          >
            Our structured engineering lifecycle transforms complex product visions into production-ready systems.
          </motion.p>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP LAYOUT (Zig-Zag Diamond & Checkerboard Text Flow) */}
        {/* ======================================================== */}
        <div className="relative hidden lg:block h-[480px] w-full z-10 select-none">
          
          {/* Circuit Connection SVG Paths Overlay */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-0" 
            viewBox="0 0 1200 480" 
            preserveAspectRatio="none"
          >
            {/* Segment 1: Step 1 -> 2 */}
            <path 
              d="M 100,120 L 300,360" 
              stroke={activeStep === 0 || activeStep === 1 ? "#10b981" : "#1e2329"} 
              strokeWidth={activeStep === 0 || activeStep === 1 ? "2.5" : "1.5"}
              fill="none" 
              className={activeStep === 0 || activeStep === 1 ? "animate-path-active opacity-100 transition-all duration-300" : "animate-path-flow opacity-30 transition-all duration-300"}
              style={{ filter: activeStep === 0 || activeStep === 1 ? 'drop-shadow(0 0 4px #10b981)' : 'none' }}
            />
            {/* Segment 2: Step 2 -> 3 */}
            <path 
              d="M 300,360 L 500,120" 
              stroke={activeStep === 1 || activeStep === 2 ? "#10b981" : "#1e2329"} 
              strokeWidth={activeStep === 1 || activeStep === 2 ? "2.5" : "1.5"}
              fill="none" 
              className={activeStep === 1 || activeStep === 2 ? "animate-path-active opacity-100 transition-all duration-300" : "animate-path-flow opacity-30 transition-all duration-300"}
              style={{ filter: activeStep === 1 || activeStep === 2 ? 'drop-shadow(0 0 4px #10b981)' : 'none' }}
            />
            {/* Segment 3: Step 3 -> 4 */}
            <path 
              d="M 500,120 L 700,360" 
              stroke={activeStep === 2 || activeStep === 3 ? "#10b981" : "#1e2329"} 
              strokeWidth={activeStep === 2 || activeStep === 3 ? "2.5" : "1.5"}
              fill="none" 
              className={activeStep === 2 || activeStep === 3 ? "animate-path-active opacity-100 transition-all duration-300" : "animate-path-flow opacity-30 transition-all duration-300"}
              style={{ filter: activeStep === 2 || activeStep === 3 ? 'drop-shadow(0 0 4px #10b981)' : 'none' }}
            />
            {/* Segment 4: Step 4 -> 5 */}
            <path 
              d="M 700,360 L 900,120" 
              stroke={activeStep === 3 || activeStep === 4 ? "#10b981" : "#1e2329"} 
              strokeWidth={activeStep === 3 || activeStep === 4 ? "2.5" : "1.5"}
              fill="none" 
              className={activeStep === 3 || activeStep === 4 ? "animate-path-active opacity-100 transition-all duration-300" : "animate-path-flow opacity-30 transition-all duration-300"}
              style={{ filter: activeStep === 3 || activeStep === 4 ? 'drop-shadow(0 0 4px #10b981)' : 'none' }}
            />
            {/* Segment 5: Step 5 -> 6 */}
            <path 
              d="M 900,120 L 1100,360" 
              stroke={activeStep === 4 || activeStep === 5 ? "#10b981" : "#1e2329"} 
              strokeWidth={activeStep === 4 || activeStep === 5 ? "2.5" : "1.5"}
              fill="none" 
              className={activeStep === 4 || activeStep === 5 ? "animate-path-active opacity-100 transition-all duration-300" : "animate-path-flow opacity-30 transition-all duration-300"}
              style={{ filter: activeStep === 4 || activeStep === 5 ? 'drop-shadow(0 0 4px #10b981)' : 'none' }}
            />
          </svg>

          {/* Symmetrical grid layout: 6 columns */}
          <div className="grid grid-cols-6 h-full relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isOdd = index % 2 === 0;
              const isActive = activeStep === index;

              return (
                <div 
                  key={index} 
                  className="relative h-[480px] w-full"
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {isOdd ? (
                    <>
                      {/* Top Position: Diamond Node (centered at Y = 120px) */}
                      <motion.div 
                        whileHover={{ scale: 1.06 }}
                        transition={{ type: "spring", stiffness: 400, damping: 18 }}
                        className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[144px] h-[144px] flex items-center justify-center cursor-pointer"
                      >
                        {/* Dashed outer border diamond */}
                        <div className={`absolute inset-0 border border-dashed rounded-3xl rotate-45 scale-110 transition-all duration-500 ${isActive ? 'border-brand-orange/60 shadow-glow' : 'border-dark-border/40'}`} />
                        
                        {/* Solid inner filled diamond */}
                        <div className={`absolute inset-0 border rounded-2xl transition-all duration-500 rotate-45 ${isActive ? 'border-brand-orange/60 bg-brand-orange/10' : 'border-dark-border bg-dark-card/50'}`} />

                        {/* Contents (not rotated) */}
                        <div className="relative z-10 flex flex-col items-center justify-center p-4">
                          <span className={`text-[10px] font-bold tracking-wider mb-1 transition-colors ${isActive ? 'text-brand-orange' : 'text-dark-muted'}`}>
                            {step.num}
                          </span>
                          <Icon className={`mb-2 transition-colors ${isActive ? 'text-brand-orange' : 'text-white'}`} size={20} />
                          <span className="text-[11px] font-extrabold tracking-tight text-white text-center leading-tight max-w-[100px]">
                            {step.title}
                          </span>
                        </div>
                      </motion.div>

                      {/* Bottom Position: Description text block (centered at Y = 360px) */}
                      <div 
                        className={`absolute bottom-[20px] left-1/2 -translate-x-1/2 w-full max-w-[170px] h-[160px] flex flex-col items-center justify-center p-4 rounded-2xl border bg-dark-card/10 text-center transition-all duration-500 ${isActive ? 'border-brand-orange/30 bg-brand-orange/5 shadow-glow' : 'border-dark-border/30'}`}
                      >
                        <h4 className={`text-xs font-bold mb-1.5 transition-colors ${isActive ? 'text-brand-orange' : 'text-white'}`}>
                          {step.title}
                        </h4>
                        <p className="text-[10px] text-dark-muted leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Top Position: Description text block (centered at Y = 120px) */}
                      <div 
                        className={`absolute top-[20px] left-1/2 -translate-x-1/2 w-full max-w-[170px] h-[160px] flex flex-col items-center justify-center p-4 rounded-2xl border bg-dark-card/10 text-center transition-all duration-500 ${isActive ? 'border-brand-orange/30 bg-brand-orange/5 shadow-glow' : 'border-dark-border/30'}`}
                      >
                        <h4 className={`text-xs font-bold mb-1.5 transition-colors ${isActive ? 'text-brand-orange' : 'text-white'}`}>
                          {step.title}
                        </h4>
                        <p className="text-[10px] text-dark-muted leading-relaxed">
                          {step.desc}
                        </p>
                      </div>

                      {/* Bottom Position: Diamond Node (centered at Y = 360px) */}
                      <motion.div 
                        whileHover={{ scale: 1.06 }}
                        transition={{ type: "spring", stiffness: 400, damping: 18 }}
                        className="absolute bottom-[18px] left-1/2 -translate-x-1/2 w-[144px] h-[144px] flex items-center justify-center cursor-pointer"
                      >
                        {/* Dashed outer border diamond */}
                        <div className={`absolute inset-0 border border-dashed rounded-3xl rotate-45 scale-110 transition-all duration-500 ${isActive ? 'border-brand-orange/60 shadow-glow' : 'border-dark-border/40'}`} />
                        
                        {/* Solid inner filled diamond */}
                        <div className={`absolute inset-0 border rounded-2xl transition-all duration-500 rotate-45 ${isActive ? 'border-brand-orange/60 bg-brand-orange/10' : 'border-dark-border bg-dark-card/50'}`} />

                        {/* Contents (not rotated) */}
                        <div className="relative z-10 flex flex-col items-center justify-center p-4">
                          <span className={`text-[10px] font-bold tracking-wider mb-1 transition-colors ${isActive ? 'text-brand-orange' : 'text-dark-muted'}`}>
                            {step.num}
                          </span>
                          <Icon className={`mb-2 transition-colors ${isActive ? 'text-brand-orange' : 'text-white'}`} size={20} />
                          <span className="text-[11px] font-extrabold tracking-tight text-white text-center leading-tight max-w-[100px]">
                            {step.title}
                          </span>
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Absolute Floating Arrow Icons between columns */}
          {/* Arrow 1-2 (down-right) */}
          <div className="absolute left-[16.66%] top-[240px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center w-8 h-8 rounded-full bg-dark-bg border border-dark-border shadow-glow">
            <ArrowDownRight className={`w-4 h-4 transition-colors duration-300 ${activeStep === 0 || activeStep === 1 ? 'text-brand-orange animate-pulse' : 'text-dark-muted'}`} />
          </div>
          {/* Arrow 2-3 (up-right) */}
          <div className="absolute left-[33.33%] top-[240px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center w-8 h-8 rounded-full bg-dark-bg border border-dark-border shadow-glow">
            <ArrowUpRight className={`w-4 h-4 transition-colors duration-300 ${activeStep === 1 || activeStep === 2 ? 'text-brand-orange animate-pulse' : 'text-dark-muted'}`} />
          </div>
          {/* Arrow 3-4 (down-right) */}
          <div className="absolute left-[50%] top-[240px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center w-8 h-8 rounded-full bg-dark-bg border border-dark-border shadow-glow">
            <ArrowDownRight className={`w-4 h-4 transition-colors duration-300 ${activeStep === 2 || activeStep === 3 ? 'text-brand-orange animate-pulse' : 'text-dark-muted'}`} />
          </div>
          {/* Arrow 4-5 (up-right) */}
          <div className="absolute left-[66.66%] top-[240px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center w-8 h-8 rounded-full bg-dark-bg border border-dark-border shadow-glow">
            <ArrowUpRight className={`w-4 h-4 transition-colors duration-300 ${activeStep === 3 || activeStep === 4 ? 'text-brand-orange animate-pulse' : 'text-dark-muted'}`} />
          </div>
          {/* Arrow 5-6 (down-right) */}
          <div className="absolute left-[83.33%] top-[240px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center w-8 h-8 rounded-full bg-dark-bg border border-dark-border shadow-glow">
            <ArrowDownRight className={`w-4 h-4 transition-colors duration-300 ${activeStep === 4 || activeStep === 5 ? 'text-brand-orange animate-pulse' : 'text-dark-muted'}`} />
          </div>

        </div>

        {/* ======================================================== */}
        {/* MOBILE & TABLET LAYOUT (Sleek Vertical Timeline Flow)    */}
        {/* ======================================================== */}
        <div className="relative block lg:hidden pl-8 md:pl-16 z-10">
          
          {/* Vertical line connector */}
          <div className="absolute left-[28px] md:left-[36px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-brand-orange/40 via-dark-border to-brand-orange/10 z-0" />
          
          <div className="flex flex-col gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex gap-6 md:gap-10 items-start z-10"
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  
                  {/* Left Diamond Badge centered on line */}
                  <div className="relative w-12 h-12 flex items-center justify-center shrink-0 mt-1 cursor-pointer">
                    {/* Rotated borders */}
                    <div className={`absolute inset-0 border border-dashed rounded-lg rotate-45 scale-105 transition-all duration-300 ${isActive ? 'border-brand-orange' : 'border-dark-border'}`} />
                    <div className={`absolute inset-0 border rounded-lg rotate-45 transition-all duration-300 ${isActive ? 'border-brand-orange/40 bg-brand-orange/10 shadow-glow' : 'border-dark-border bg-dark-card'}`} />
                    
                    {/* Content (not rotated) */}
                    <div className="relative z-10 flex items-center justify-center text-white">
                      <Icon size={16} className={isActive ? 'text-brand-orange' : 'text-white'} />
                    </div>
                  </div>

                  {/* Right Description Text Card */}
                  <div className={`flex-grow p-5 md:p-6 rounded-2xl border bg-dark-card/30 backdrop-blur-sm transition-all duration-500 ${isActive ? 'border-brand-orange/30 shadow-glow bg-brand-orange/5' : 'border-dark-border/60 hover:border-brand-orange/20'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-brand-orange tracking-wider">
                        Step {step.num}
                      </span>
                    </div>
                    
                    <h3 className="text-base md:text-lg font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    
                    <p className="text-xs md:text-sm text-dark-muted leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
