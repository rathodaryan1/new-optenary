import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, Sparkles, Terminal, Code2 } from 'lucide-react';

export default function FounderSection() {
  const profileDetails = [
    { label: "Role", value: "Founder & CEO" },
    { label: "Core Competency", value: "SaaS & AI Architect" },
    { label: "Experience", value: "1+ Years" },
    { label: "Commitment", value: "High-end Quality" }
  ];

  const focusAreas = [
    { name: "SaaS Engineering", icon: Code2, color: "text-brand-emerald bg-brand-emerald/20 border-brand-emerald/20" },
    { name: "AI Orchestration", icon: Sparkles, color: "text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20" },
    { name: "Transparent Delivery", icon: Terminal, color: "text-brand-purple bg-brand-purple/10 border-brand-purple/20" }
  ];

  return (
    <section className="bg-dark-bg py-24 px-6 md:px-12 relative overflow-hidden border-t border-dark-border/40">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-semibold uppercase tracking-wider shadow-glow"
          >
            Behind the Studio
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-4"
          >
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald via-brand-cyan to-brand-purple font-black">Founder</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-muted max-w-xl mx-auto text-sm md:text-base"
          >
            Optenary was founded by Aryan Rathod with a simple goal: build software that is clean, transparent, and built to scale.
          </motion.p>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Holographic Glass Profile Card */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <div className="relative group w-full max-w-[360px]">
              
              {/* Back Card Glow border */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-brand-emerald via-brand-cyan to-brand-purple opacity-20 group-hover:opacity-45 blur-lg transition duration-700" />
              
              {/* Profile Card Container */}
              <div className="relative w-full rounded-3xl bg-dark-card border border-dark-border p-6 shadow-glow overflow-hidden flex flex-col items-center">
                
                {/* Profile Pic Placeholder Wrapper */}
                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-brand-emerald via-brand-cyan to-brand-purple mb-6 shadow-lg">
                  <div className="w-full h-full rounded-full bg-dark-bg overflow-hidden flex items-center justify-center relative">
                    <img 
                      src="/images/aryan.webp" 
                      alt="Aryan Rathod" 
                      className="w-full h-full object-cover"
                      loading="lazy" decoding="async"
                      onError={(e) => {
                        // Fallback in case the image fails
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const initialSpan = document.createElement('span');
                          initialSpan.className = 'text-white text-3xl font-black tracking-widest';
                          initialSpan.innerText = 'AR';
                          parent.appendChild(initialSpan);
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Name & Title */}
                <h3 className="text-white font-extrabold text-xl mb-1">Aryan Rathod</h3>
                <span className="text-brand-emerald text-xs font-semibold uppercase tracking-wider mb-6">Founder & CEO</span>

                {/* Profile details grid */}
                <div className="w-full grid grid-cols-2 gap-3 border-t border-dark-border/60 pt-6 mb-6">
                  {profileDetails.map((detail, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider text-dark-muted font-mono">{detail.label}</span>
                      <span className="text-white text-xs font-bold mt-0.5">{detail.value}</span>
                    </div>
                  ))}
                </div>

                {/* Social Connects */}
                <div className="flex gap-4">
                  {[
                    { href: "https://www.linkedin.com/in/rathodaryan/", icon: Linkedin },
                    { href: "https://github.com/rathodaryan1", icon: Github },
                    { href: "mailto:aryan@optenary.in", icon: Mail }
                  ].map((soc, idx) => {
                    const Icon = soc.icon;
                    return (
                      <a 
                        key={idx}
                        href={soc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-dark-bg/60 border border-dark-border flex items-center justify-center text-dark-muted hover:text-white hover:border-brand-purple/40 transition-all"
                      >
                        <Icon size={14} />
                      </a>
                    );
                  })}
                </div>

              </div>
            </div>
          </motion.div>

          {/* Right Column: Statement & Expertise Focus */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col justify-center gap-6 text-left"
          >
            <h3 className="text-white font-extrabold text-2xl tracking-tight leading-snug">
              "We run on ownership, quality, and complete transparency."
            </h3>
            
            <p className="text-sm md:text-base text-dark-muted leading-relaxed">
              At Optenary, we bypass typical agency bureaucracy. As your engineering partner, you interact directly with senior developers who take full ownership of your product architecture. We focus on building type-safe, optimized SaaS applications and intelligent AI flows that make your operations autonomous.
            </p>

            {/* Core Values list */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {focusAreas.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index}
                    className="p-4 rounded-2xl bg-dark-card/45 border border-dark-border flex flex-col gap-3"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${item.color}`}>
                      <Icon size={16} />
                    </div>
                    <span className="text-white font-bold text-xs">{item.name}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
