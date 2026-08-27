import { motion } from 'framer-motion';
import { MessageSquare, Star, Zap, Target } from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      title: "Engineering-First Mindset",
      desc: "We build digital products with strict architectural integrity, treating clean code, maintainability, and security as non-negotiable fundamentals.",
      icon: Star
    },
    {
      title: "Obsessive Focus on Performance",
      desc: "Speed directly drives retention. We optimize database queries, network latency, and asset delivery to ensure sub-second interaction speeds.",
      icon: Zap
    },
    {
      title: "Transparent & Linear Execution",
      desc: "No black boxes. We leverage structured sprints, shared boards, and direct updates so you maintain full visibility into the development pipeline.",
      icon: MessageSquare
    },
    {
      title: "Built for Absolute Scale",
      desc: "Whether launching a pre-seed prototype or scaling a high-throughput enterprise API, we design database layers and infrastructure to grow.",
      icon: Target
    }
  ];

  return (
    <section id="scale-with-speed" className="bg-[#0b0d0e] py-24 px-6 md:px-12 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-orange text-xs font-bold uppercase tracking-widest block mb-4"
          >
            Why Choose Us
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-4"
          >
            Why Brands <span className="text-brand-orange">Partner with Optenary</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-muted max-w-2xl mx-auto text-base md:text-lg"
          >
            We merge design precision with software craftsmanship to deploy products that scale.
          </motion.p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Core Trust Copy & Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <p className="text-base md:text-lg text-dark-muted leading-relaxed mb-8">
              We replace generic agency templates with specialized engineering talent. Our process guarantees clean code release, rigorous security benchmarks, and long-term support.
            </p>

            <div className="grid gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ x: 4 }}
                    className="flex gap-4 p-4 rounded-xl bg-dark-card/30 border border-dark-border/40 hover:border-brand-orange/20 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm md:text-base mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-xs md:text-sm text-dark-muted leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <p className="text-sm text-dark-muted leading-relaxed mt-8 border-t border-dark-border/40 pt-6">
              Our engineering values ensure your code remains a functional asset, not technical debt, through every expansion phase.
            </p>
          </motion.div>

          {/* Right Column: Code Editor & Product Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <div className="w-full max-w-[450px] aspect-[4/3] rounded-2xl bg-dark-card border border-dark-border shadow-glow overflow-hidden relative font-mono text-[10px] select-none">
              {/* Tab Header / Editor Top Bar */}
              <div className="flex items-center justify-between border-b border-dark-border/60 bg-dark-bg/60 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-dark-card border-x border-t border-dark-border/60 rounded-t-lg -mb-3 text-[9px] text-white">
                  <span className="text-brand-cyan font-bold">TS</span>
                  <span className="font-semibold text-white/90">Optenary.ts</span>
                </div>
                <div className="w-12"></div> {/* spacer */}
              </div>

              {/* Code Workspace with Line Numbers */}
              <div className="p-4 flex gap-4 text-[10px] leading-relaxed pt-6">
                {/* Line numbers column */}
                <div className="text-dark-muted/30 text-right select-none flex flex-col gap-1.5 pr-3 border-r border-dark-border/30 min-w-[20px]">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                  <span>8</span>
                  <span>9</span>
                  <span>10</span>
                  <span>11</span>
                </div>

                {/* Code body */}
                <div className="space-y-1.5 text-white/80 font-mono w-full">
                  <p><span className="text-brand-purple">import</span> &#123; <span className="text-brand-cyan">launch</span> &#125; <span className="text-brand-purple">from</span> <span className="text-brand-emerald">"@optenary/core"</span>;</p>
                  <p><span className="text-brand-purple">const</span> <span className="text-brand-cyan">projectPlan</span> = &#123;</p>
                  <p className="pl-4"><span className="text-brand-cyan">client</span>: <span className="text-brand-emerald">"NextGen Startup"</span>,</p>
                  <p className="pl-4"><span className="text-brand-cyan">milestones</span>: [</p>
                  <p className="pl-8"><span className="text-brand-emerald">"1. Discovery & Scope"</span>,</p>
                  <p className="pl-8"><span className="text-brand-emerald">"2. Premium Design"</span>,</p>
                  <p className="pl-8"><span className="text-brand-emerald">"3. Scalable Assembly"</span>,</p>
                  <p className="pl-8"><span className="text-brand-emerald">"4. Launch & Scale"</span></p>
                  <p className="pl-4">],</p>
                  <p className="pl-4"><span className="text-brand-cyan">onTimeDelivery</span>: <span className="text-brand-purple">true</span>,</p>
                  <p className="pl-4"><span className="text-brand-cyan">successRate</span>: <span className="text-brand-emerald">"100%"</span></p>
                  <p>&#125;;</p>
                </div>
              </div>

              {/* Progress Panel */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-dark-card/80 border border-dark-border flex flex-col gap-2 font-sans">
                <div className="flex justify-between items-center text-white font-bold text-xs">
                  <span>Build Success Rate</span>
                  <span className="text-brand-orange">100%</span>
                </div>
                <div className="w-full h-1.5 bg-dark-bg rounded-full overflow-hidden">
                  <div className="w-full h-full bg-brand-orange" />
                </div>
                <div className="flex justify-between items-center text-[9px] text-dark-muted mt-1">
                  <span>Compilation: Done</span>
                  <span>Responsive checks: Pass</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
